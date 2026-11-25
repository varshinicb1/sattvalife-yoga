import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import * as tf from '@tensorflow/tfjs'
import * as poseDetection from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-backend-webgl'

import PageHero from '@/components/PageHero'
import { CameraView } from '@/components/posture-lab/camera-view'
import { ASANA_LIBRARY, analyzePosture, type PostureAnalysisResult } from '@/components/posture-lab/pose-analysis'
import { drawSkeleton } from '@/components/posture-lab/skeleton-renderer'
import {
  Camera,
  CameraOff,
  Sparkles,
  CheckCircle2,
  Shield,
  Timer,
  Award,
  Volume2,
  VolumeX,
  ArrowRight,
  Activity,
  AlertCircle
} from 'lucide-react'

export default function PostureLabPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const isProcessingRef = useRef<boolean>(false)
  const isRunningRef = useRef<boolean>(false)
  const lastDetectionTimeRef = useRef<number>(0)
  const lastStateUpdateTimeRef = useRef<number>(0)
  const analysisRef = useRef<PostureAnalysisResult | null>(null)

  const [cameraActive, setCameraActive] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const [modelStatus, setModelStatus] = useState<string>('')
  const [cameraError, setCameraError] = useState<string | null>(null)

  const [selectedAsanaId, setSelectedAsanaId] = useState<string>('vrikshasana')
  const [uiAnalysis, setUiAnalysis] = useState<PostureAnalysisResult | null>(null)

  const [holdTimer, setHoldTimer] = useState(0)
  const targetHold = 15
  const [posesCompleted, setPosesCompleted] = useState<string[]>([])
  const [voiceGuidance, setVoiceGuidance] = useState(false)

  const lastSpokenRef = useRef<string>('')
  const lastSpokenTimeRef = useRef<number>(0)
  const selectedAsanaIdRef = useRef(selectedAsanaId)

  // Switching pose resets the hold timer. Done in the event handler rather
  // than an effect so React doesn't render twice.
  const selectAsana = useCallback((id: string) => {
    selectedAsanaIdRef.current = id
    setSelectedAsanaId(id)
    setHoldTimer(0)
  }, [])

  // Voice Cue Assistant with strict 5s debounce
  const speakCue = useCallback((cue: string) => {
    if (!voiceGuidance || typeof window === 'undefined' || !window.speechSynthesis) return
    const now = Date.now()
    if (now - lastSpokenTimeRef.current > 5000 && cue !== lastSpokenRef.current) {
      try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(cue)
        utterance.rate = 1.0
        utterance.pitch = 1.05
        window.speechSynthesis.speak(utterance)
        lastSpokenRef.current = cue
        lastSpokenTimeRef.current = now
      } catch {
        // Ignore speech synthesis failures
      }
    }
  }, [voiceGuidance])

  // Stable 1-second interval for hold timer (Zero React churn)
  useEffect(() => {
    if (!cameraActive) return
    const interval = setInterval(() => {
      const current = analysisRef.current
      if (current && current.score >= 0.8 && current.inFrame) {
        setHoldTimer(prev => {
          const next = prev + 1
          if (next === targetHold) {
            const poseName = current.detectedPose || 'Asana'
            speakCue(`Masterful! You held ${poseName} for ${targetHold} seconds.`)
            setPosesCompleted(completed => completed.includes(poseName) ? completed : [...completed, poseName])
          }
          return next
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [cameraActive, targetHold, speakCue])

  // Start Camera & Pose Detector
  const startSession = async () => {
    setCameraError(null)
    setModelStatus('Accessing webcam...')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280, max: 1280 },
          height: { ideal: 720, max: 720 }
        },
        audio: false
      })
      streamRef.current = stream

      const video = videoRef.current
      if (video) {
        video.srcObject = stream
        await new Promise<void>((resolve) => {
          const onPlay = () => resolve()
          if (video.readyState >= 2) {
            video.play().then(onPlay).catch(onPlay)
          } else {
            video.onloadedmetadata = () => {
              video.play().then(onPlay).catch(onPlay)
            }
            setTimeout(onPlay, 1000)
          }
        })
      }

      setCameraActive(true)
      isRunningRef.current = true
      setModelLoading(true)
      setModelStatus('Initializing neural model...')

      // Lazy load MoveNet detector once
      if (!detectorRef.current) {
        try {
          await tf.setBackend('webgl').catch(() => tf.setBackend('cpu'))
          await tf.ready()
          detectorRef.current = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
          )
        } catch (tfErr) {
          console.warn('MoveNet load warning:', tfErr)
        }
      }

      setModelLoading(false)
      setModelStatus('Live Neural Tracking')

      // Start optimized detection loop
      startOptimizedLoop()
    } catch (err) {
      console.error('Failed to start session:', err)
      const errObj = err as Error
      setCameraError(
        errObj.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera permissions in your browser and click retry.'
          : errObj.name === 'NotFoundError'
          ? 'No camera found on this device. Please connect a webcam.'
          : `Camera error: ${errObj.message || 'Unable to access video device.'}`
      )
      setCameraActive(false)
      setModelLoading(false)
      isRunningRef.current = false
    }
  }

  // Optimized Loop: Throttled inference (15 FPS) + Throttled React State (3 Hz) + Smooth Canvas (60 FPS)
  const startOptimizedLoop = () => {
    const loop = async () => {
      if (!isRunningRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const detector = detectorRef.current
      const now = performance.now()

      // Throttle neural inference to ~15 FPS (every 65ms) to keep CPU under 15%
      const shouldRunInference = now - lastDetectionTimeRef.current >= 65

      if (video && video.readyState >= 2 && detector && shouldRunInference && !isProcessingRef.current) {
        isProcessingRef.current = true
        lastDetectionTimeRef.current = now

        try {
          const poses = await detector.estimatePoses(video, { maxPoses: 1, flipHorizontal: false })
          if (poses.length > 0 && isRunningRef.current) {
            const pose = poses[0]
            const currentTarget = selectedAsanaIdRef.current
            const result = analyzePosture(pose.keypoints, currentTarget)
            analysisRef.current = result

            // Draw skeleton directly on canvas (Zero React re-render)
            if (canvas) {
              drawSkeleton(canvas, video, pose.keypoints, result.jointStatus, result.jointAngles)
            }

            // Throttle React state update to 3 Hz (every 300ms) to eliminate UI freezing
            if (now - lastStateUpdateTimeRef.current >= 300) {
              setUiAnalysis(result)
              lastStateUpdateTimeRef.current = now

              if (result.cues && result.cues.length > 0) {
                speakCue(result.cues[0])
              }
            }
          } else if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
          }
        } catch {
          // Skip frame error
        } finally {
          isProcessingRef.current = false
        }
      }

      if (isRunningRef.current) {
        animFrameRef.current = requestAnimationFrame(loop)
      }
    }

    animFrameRef.current = requestAnimationFrame(loop)
  }

  // Stop Session
  const stopSession = () => {
    isRunningRef.current = false
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    setCameraActive(false)
    setUiAnalysis(null)
    analysisRef.current = null
    setHoldTimer(0)
    setModelLoading(false)
    setModelStatus('')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isRunningRef.current = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
      if (detectorRef.current) detectorRef.current.dispose()
    }
  }, [])

  const selectedAsana = ASANA_LIBRARY.find(a => a.id === selectedAsanaId) || ASANA_LIBRARY[0]
  const scorePercent = uiAnalysis ? Math.round(uiAnalysis.score * 100) : 0

  return (
    <div className="bg-cream-50 text-ink-900 min-h-screen">
      <PageHero
        eyebrow="Practice aid · runs on your device"
        title="AI Posture Analysis Lab"
        intro="Hold a pose in front of your camera and get gentle, real-time cues on your alignment. A helpful companion to class, not a replacement for a teacher or medical advice."
      />

      <section className="container-page py-10 md:py-14">
        
        {/* Top Session Stats Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-forest-900/10 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/60">Practice Session</p>
              <h3 className="text-base font-serif font-bold text-forest-950">
                {selectedAsanaId === 'auto' ? 'Auto-Detect Mode' : `${selectedAsana.name} (${selectedAsana.sanskritName})`}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-cream-100/70 px-3.5 py-2">
              <Timer className="h-4 w-4 text-amber-700" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-900/60 block">Hold</span>
                <span className="font-mono text-sm font-bold text-forest-950">{holdTimer}s / {targetHold}s</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-cream-100/70 px-3.5 py-2">
              <Award className="h-4 w-4 text-amber-700" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-900/60 block">Completed</span>
                <span className="font-mono text-sm font-bold text-forest-950">{posesCompleted.length} Poses</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVoiceGuidance(!voiceGuidance)}
              className={`flex items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                voiceGuidance
                  ? 'border-amber-600/40 bg-amber-500/10 text-amber-800 ring-1 ring-amber-600/20'
                  : 'border-forest-900/10 bg-cream-100/50 text-forest-900/70 hover:bg-cream-100'
              }`}
              title={voiceGuidance ? 'Mute AI Voice Coach' : 'Enable AI Voice Coach'}
            >
              {voiceGuidance ? <Volume2 className="h-4 w-4 text-amber-600" /> : <VolumeX className="h-4 w-4 opacity-60" />}
              <span className="hidden sm:inline">Voice Coach</span>
            </button>
          </div>
        </div>

        {/* Main Workstation Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Main Visual Studio Canvas View (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-forest-900/20 bg-forest-950 shadow-2xl">
              
              {/* Permanent Camera & Canvas Layer */}
              <CameraView videoRef={videoRef} canvasRef={canvasRef} />

              {/* Status Header Badge when active */}
              {cameraActive && (
                <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-forest-950/80 px-3.5 py-1.5 text-xs font-medium text-cream-50 backdrop-blur-md border border-cream-50/10">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{modelStatus || 'Live Neural Vision'}</span>
                </div>
              )}

              {cameraActive && (
                <div className="pointer-events-none absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-forest-950/80 px-3.5 py-1.5 text-xs text-cream-100/80 backdrop-blur-md border border-cream-50/10">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Private On-Device</span>
                </div>
              )}

              {/* Loading AI Spinner */}
              {modelLoading && (
                <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-forest-950/75 p-6 text-center text-cream-50 backdrop-blur-sm">
                  <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
                    <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-lg text-cream-50">{modelStatus}</h4>
                  <p className="mt-1 text-xs text-cream-100/70">Warming up MoveNet neural model...</p>
                </div>
              )}

              {/* Camera Activation Cover when inactive */}
              {!cameraActive && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-forest-950/95 p-6 text-center text-cream-50">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
                    <Camera className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-cream-50 font-bold">Launch AI Posture Studio</h3>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-cream-100/70">
                    Position your device 6–8 feet away so your full body is visible in frame. Everything is worked out on your device. No video leaves your phone or computer.
                  </p>

                  {cameraError && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-xs text-red-200 border border-red-500/30 max-w-md">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{cameraError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={startSession}
                    className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3.5 text-sm font-semibold text-forest-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Camera className="h-4 w-4" /> Start Camera Session
                  </button>
                </div>
              )}

              {/* Live HUD Feedback Card at Bottom */}
              {cameraActive && (
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-cream-50/15 bg-forest-900/90 p-4 text-cream-50 backdrop-blur-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                      {selectedAsanaId === 'auto'
                        ? (uiAnalysis?.detectedPose || 'Detecting...')
                        : selectedAsana.name}
                    </span>
                    <span className={`text-sm font-bold ${
                      scorePercent >= 80
                        ? 'text-emerald-400'
                        : scorePercent > 30
                        ? 'text-amber-400'
                        : 'text-amber-200/80'
                    }`}>
                      {scorePercent > 20
                        ? `${scorePercent}% Alignment`
                        : uiAnalysis?.inFrame === false
                        ? 'Body Not In Frame'
                        : 'Calibrating Position...'}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-cream-100/90 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      {uiAnalysis?.cues && uiAnalysis.cues.length > 0
                        ? uiAnalysis.cues[0]
                        : 'Position your device so your entire body from head to feet is visible inside the frame.'}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            {cameraActive && (
              <div className="flex items-center justify-between rounded-2xl border border-forest-900/10 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Timer className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-semibold uppercase text-forest-900/60">Hold Target:</span>
                  <span className="font-mono text-sm font-bold text-forest-950">{holdTimer}s / {targetHold}s</span>
                </div>

                <button
                  type="button"
                  onClick={stopSession}
                  className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  <CameraOff className="h-3.5 w-3.5" /> Stop Session
                </button>
              </div>
            )}

            {/* Privacy Guarantee Note */}
            <div className="flex items-center gap-3 rounded-2xl border border-forest-900/[0.08] bg-cream-100/60 p-4 text-xs text-forest-900/80">
              <Shield className="h-5 w-5 shrink-0 text-forest-800" />
              <span>
                <strong>100% Private &amp; Secure:</strong> Video frames are analyzed locally in browser memory using WebGL neural acceleration. Zero images or video feeds ever touch external servers.
              </span>
            </div>
          </div>

          {/* Asana Selector & Alignment Guidelines (5 Cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <h2 className="text-xl font-serif text-forest-900 font-bold">Select Practice Asana</h2>
              <p className="mt-1 text-sm text-forest-900/70">
                Choose an asana to calibrate geometric landmark tracking, or pick Auto-Detect.
              </p>
            </div>

            {/* Pose Selector Tabs */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
              <button
                type="button"
                onClick={() => selectAsana('auto')}
                className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                  selectedAsanaId === 'auto'
                    ? 'border-amber-600 bg-amber-50/90 shadow-md ring-1 ring-amber-600/30'
                    : 'border-forest-900/10 bg-white hover:border-forest-900/20 hover:bg-cream-100/50'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-serif text-sm font-bold text-forest-950">Auto-Detect</span>
                  {selectedAsanaId === 'auto' && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
                </div>
                <span className="text-[0.68rem] text-forest-900/60 mt-1">Automatic Pose Recognition</span>
              </button>

              {ASANA_LIBRARY.slice(0, 7).map(p => {
                const isSelected = p.id === selectedAsanaId
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectAsana(p.id)}
                    className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/90 shadow-md ring-1 ring-amber-600/30'
                        : 'border-forest-900/10 bg-white hover:border-forest-900/20 hover:bg-cream-100/50'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-serif text-sm font-bold text-forest-950">{p.name}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
                    </div>
                    <span className="text-[0.68rem] italic text-forest-900/60">{p.sanskritName}</span>
                    <span className="mt-1.5 rounded-full bg-forest-900/5 px-2 py-0.5 text-[0.65rem] font-medium text-forest-900/70">
                      {p.category}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Selected Asana Details Card */}
            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 shadow-sm">
              <div className="border-b border-forest-900/10 pb-4">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">{selectedAsana.category}</span>
                <h3 className="font-serif text-2xl text-forest-950 mt-1 font-bold">{selectedAsana.name}</h3>
                <p className="text-xs text-forest-900/60 italic">{selectedAsana.sanskritName} • {selectedAsana.difficulty}</p>
                <p className="mt-3 text-xs sm:text-sm text-forest-900/80 leading-relaxed">{selectedAsana.description}</p>
              </div>

              {/* Key Alignment Rules */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900/70 mb-2.5">Key Alignment Cues</h4>
                <ul className="space-y-1.5 text-xs text-forest-900/80">
                  {selectedAsana.keyAlignmentRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Muscles */}
              <div className="mt-4 pt-4 border-t border-forest-900/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900/70 mb-2">Target Muscle Activation</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAsana.targetMuscles.map(m => (
                    <span key={m} className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[0.7rem] font-medium text-amber-800">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Studio Offer */}
            <div className="rounded-3xl border border-amber-600/30 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 p-6 text-cream-50 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Award className="h-4 w-4" /> Practise with a teacher
              </div>
              <h3 className="font-serif text-xl text-cream-50 mt-2 font-bold">Bring your alignment to class</h3>
              <p className="mt-2 text-xs leading-relaxed text-cream-100/70">
                The Posture Lab is a free practice aid. For hands-on corrections and a sequence built around your body, join the Tuesday class in Oadby or book a private session.
              </p>
              <Link
                to="/checkout"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-forest-950 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
              >
                Book a class <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
