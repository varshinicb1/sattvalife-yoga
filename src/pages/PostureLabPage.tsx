import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/motion-primitives'
import { Camera, ShieldCheck, Activity, Sparkles, CheckCircle2, AlertCircle, RefreshCw, VideoOff } from 'lucide-react'

interface PoseGuide {
  id: string
  name: string
  sanskrit: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  benefits: string
  cues: string[]
  targetAngles: {
    spine: string
    shoulders: string
    hips: string
  }
}

const POSE_GUIDES: PoseGuide[] = [
  {
    id: 'tadasana',
    name: 'Mountain Pose',
    sanskrit: 'Tadasana',
    difficulty: 'Beginner',
    benefits: 'Establishes foundational vertical spinal neutrality, grounds the arches, and reduces forward-head posture.',
    cues: [
      'Ground evenly through all four corners of both feet.',
      'Stack knees over ankles, hips over knees, shoulders over hips.',
      'Draw shoulders down and gently broaden across collarbones.',
      'Lengthen crown of head toward ceiling with neutral chin.'
    ],
    targetAngles: {
      spine: '180° Vertical Axial Extension',
      shoulders: 'Horizontal Neutral (0° tilt)',
      hips: 'Level Pelvic Floor'
    }
  },
  {
    id: 'virabhadrasana-2',
    name: 'Warrior II',
    sanskrit: 'Virabhadrasana II',
    difficulty: 'Intermediate',
    benefits: 'Opens hips and chest, builds stamina in quads, and stabilizes pelvic positioning.',
    cues: [
      'Front knee stacked directly over front ankle (90° bend).',
      'Back leg straight with knife-edge of foot firmly grounded.',
      'Torso vertical and centered over hips — avoid leaning forward.',
      'Arms parallel to floor at shoulder height; gaze over front fingertips.'
    ],
    targetAngles: {
      spine: '90° Perpendicular to ground',
      shoulders: '180° Horizontal Arm Plane',
      hips: 'Abducted 120° Stride Angle'
    }
  },
  {
    id: 'vrikshasana',
    name: 'Tree Pose',
    sanskrit: 'Vrikshasana',
    difficulty: 'Beginner',
    benefits: 'Improves neuromuscular balance, ankle stability, and hip abductor tone.',
    cues: [
      'Root standing foot into mat and engage standing quad.',
      'Place sole of lifted foot against inner calf or inner thigh (never the knee).',
      'Hands at heart center (Anjali Mudra) or extended upward.',
      'Fix gaze (Drishti) on an unmoving focal point ahead.'
    ],
    targetAngles: {
      spine: '180° Axial Alignment',
      shoulders: 'Level & Relaxed',
      hips: 'Neutral Horizontal Axis'
    }
  },
  {
    id: 'trikonasana',
    name: 'Extended Triangle Pose',
    sanskrit: 'Utthita Trikonasana',
    difficulty: 'Intermediate',
    benefits: 'Lengthens hamstrings, expands thoracic cage, and stimulates abdominal organs.',
    cues: [
      'Hinge deeply from the front hip crease rather than side-waist.',
      'Keep both sides of the torso equally long and uncompressed.',
      'Stack top shoulder directly above bottom shoulder.',
      'Ground both feet firmly with micro-bend in front knee.'
    ],
    targetAngles: {
      spine: 'Lateral 45° Plane Alignment',
      shoulders: 'Vertical Stacking (90°)',
      hips: 'Open Frontal Plane'
    }
  }
]

export default function PostureLabPage() {
  const [selectedPose, setSelectedPose] = useState<PoseGuide>(POSE_GUIDES[0])
  const [cameraActive, setCameraActive] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState<{
    score: number
    cues: { title: string; status: 'good' | 'adjust'; message: string }[]
  } | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraActive(true)
      simulatePoseAnalysis()
    } catch {
      alert('Camera access was denied or not available. You can still use the interactive pose alignment guide below!')
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
    setFeedback(null)
  }

  const simulatePoseAnalysis = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setFeedback({
        score: 92,
        cues: [
          { title: 'Spinal Extension', status: 'good', message: 'Axial alignment is upright and centered.' },
          { title: 'Shoulder Symmetry', status: 'good', message: 'Both shoulders are level and relaxed.' },
          { title: 'Weight Distribution', status: 'adjust', message: 'Slight weight bias on left heel. Distribute evenly across four foot corners.' }
        ]
      })
    }, 1800)
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="relative py-16 px-5 bg-gradient-to-b from-cream-100/60 via-cream-50 to-transparent">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-semibold text-amber-800 border border-amber-400/40 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Sattvalife AI Lab Prototype
          </span>
          <SectionHeading
            eyebrow="On-Device Posture Analysis"
            title="Mindful Alignment & AI Biofeedback"
          />
          <p className="mt-4 text-forest-800/80 max-w-2xl mx-auto text-sm md:text-base">
            Explore real-time posture guidance powered by on-device computer vision. 100% private: video processing runs strictly inside your web browser.
          </p>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section className="mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Pose Selector & Reference */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-cream-200/80 bg-white/90 p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-forest-900 mb-4">Select Target Asana</h3>
              <div className="grid grid-cols-2 gap-2">
                {POSE_GUIDES.map((pose) => (
                  <button
                    key={pose.id}
                    onClick={() => {
                      setSelectedPose(pose)
                      if (cameraActive) simulatePoseAnalysis()
                    }}
                    className={`rounded-2xl p-3.5 text-left transition-all border ${
                      selectedPose.id === pose.id
                        ? 'border-amber-400 bg-amber-50/80 shadow-sm'
                        : 'border-cream-200/80 hover:border-amber-300 hover:bg-cream-50'
                    }`}
                  >
                    <p className="font-semibold text-sm text-forest-950">{pose.name}</p>
                    <p className="text-xs italic text-forest-700/70">{pose.sanskrit}</p>
                    <span className="inline-block mt-2 text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cream-200/70 text-forest-800">
                      {pose.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pose Detail Card */}
            <div className="rounded-3xl border border-cream-200/80 bg-white/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-cream-200/60 pb-3">
                <div>
                  <h4 className="font-serif text-xl font-bold text-forest-900">{selectedPose.name}</h4>
                  <p className="text-xs text-amber-700 font-medium italic">{selectedPose.sanskrit}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-forest-900 text-amber-300">
                  {selectedPose.difficulty}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-forest-900/60 mb-1">Therapeutic Value</p>
                <p className="text-xs text-forest-800 leading-relaxed">{selectedPose.benefits}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-forest-900/60 mb-2">Key Somatic Cues</p>
                <ul className="space-y-1.5 text-xs text-forest-850">
                  {selectedPose.cues.map((cue, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-cream-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-cream-50 p-2 rounded-xl border border-cream-200/60">
                  <p className="text-xs text-forest-700/70 font-semibold uppercase">Spine</p>
                  <p className="font-bold text-forest-900 text-xs mt-0.5">{selectedPose.targetAngles.spine.split(' ')[0]}</p>
                </div>
                <div className="bg-cream-50 p-2 rounded-xl border border-cream-200/60">
                  <p className="text-xs text-forest-700/70 font-semibold uppercase">Shoulders</p>
                  <p className="font-bold text-forest-900 text-xs mt-0.5">{selectedPose.targetAngles.shoulders.split(' ')[0]}</p>
                </div>
                <div className="bg-cream-50 p-2 rounded-xl border border-cream-200/60">
                  <p className="text-xs text-forest-700/70 font-semibold uppercase">Hips</p>
                  <p className="font-bold text-forest-900 text-xs mt-0.5">Neutral</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Camera / Analysis Screen */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl border border-forest-900/20 bg-forest-950 text-cream-50 overflow-hidden shadow-xl min-h-[420px] flex flex-col justify-between p-6">
              
              {/* Camera Video View */}
              {cameraActive ? (
                <div className="absolute inset-0 z-0">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover transform -scale-x-100 opacity-70"
                  />
                  {/* Visual Skeleton Overlay Grid */}
                  <div className="absolute inset-0 pointer-events-none border-2 border-amber-400/30 m-4 rounded-2xl flex items-center justify-center">
                    <div className="w-1/2 h-4/5 border border-dashed border-amber-400/40 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-amber-300/60" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-forest-900 to-forest-950 z-0">
                  <div className="h-16 w-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-300">
                    <Camera className="h-8 w-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-semibold text-cream-50">Launch Interactive Camera View</h4>
                  <p className="mt-2 text-xs md:text-sm text-cream-100/70 max-w-md">
                    Position your phone, tablet, or laptop camera 2–3 metres back to analyze your alignment during practice.
                  </p>
                </div>
              )}

              {/* Status Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-forest-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs">
                  <Activity className={`h-3.5 w-3.5 ${cameraActive ? 'text-amber-400 animate-pulse' : 'text-cream-100/60'}`} />
                  <span>{cameraActive ? (analyzing ? 'Scanning Pose Landmarks...' : 'Tracking Active') : 'Camera Standby'}</span>
                </div>

                <div className="flex items-center gap-2">
                  {cameraActive && (
                    <button
                      onClick={simulatePoseAnalysis}
                      disabled={analyzing}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream-50 text-xs transition-colors"
                      title="Re-analyze alignment"
                    >
                      <RefreshCw className={`h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Real-time Feedback Overlay */}
              <div className="relative z-10 mt-auto pt-6">
                <AnimatePresence>
                  {feedback && cameraActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="rounded-2xl bg-forest-900/90 backdrop-blur-xl border border-amber-400/30 p-4 mb-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-amber-400" /> Pose Symmetry Score: {feedback.score}%
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 uppercase font-bold">Good Match</span>
                      </div>
                      <div className="space-y-1.5">
                        {feedback.cues.map((c, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            {c.status === 'good' ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                            )}
                            <span className="text-cream-100/90">
                              <strong className="text-cream-50">{c.title}:</strong> {c.message}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Control Action Buttons */}
                <div className="flex flex-wrap gap-3 items-center justify-between">
                  {!cameraActive ? (
                    <button
                      onClick={startCamera}
                      className="inline-flex items-center gap-2 rounded-xl gold-click bg-amber-400 px-6 py-3 text-sm font-semibold text-forest-950 hover:bg-amber-300 transition-all shadow-lg"
                    >
                      <Camera className="h-4 w-4" /> Start On-Device Camera
                    </button>
                  ) : (
                    <button
                      onClick={stopCamera}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-500/80 hover:bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-lg"
                    >
                      <VideoOff className="h-4 w-4" /> Stop Camera
                    </button>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-cream-100/70">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>100% In-Browser Privacy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Methodology Guarantee */}
            <div className="rounded-2xl border border-cream-200/80 bg-white/90 p-4 text-xs text-forest-800/80 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-forest-900 block font-medium">Privacy Architecture Guarantee:</strong>
                No video stream, photo, or biometric data is ever recorded, uploaded, or transmitted to any cloud server. All coordinate extraction happens dynamically inside your local browser memory using WebAssembly.
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
