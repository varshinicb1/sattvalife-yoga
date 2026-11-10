'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

import { CameraView } from '@/components/posture-lab/camera-view';
import { PoseFeedback } from '@/components/posture-lab/pose-feedback';
import { analyzePosture, ASANA_LIBRARY, PostureAnalysisResult } from '@/components/posture-lab/pose-analysis';
import { drawSkeleton } from '@/components/posture-lab/skeleton-renderer';
import { Flame, Trophy, Award, Timer, Sparkles, RefreshCw, Volume2, ShieldCheck, Heart } from 'lucide-react';

export default function PostureLabPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loadingMsg, setLoadingMsg] = useState('Initializing AI Posture Lab...');
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PostureAnalysisResult | null>(null);
  const [targetPoseId, setTargetPoseId] = useState<string>('auto');

  // Stats & Gamification state
  const [holdSeconds, setHoldSeconds] = useState(0);
  const [targetHoldSeconds] = useState(15);
  const [posesCompleted, setPosesCompleted] = useState<string[]>([]);
  const [totalPracticeTime, setTotalPracticeTime] = useState(0); // in seconds
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const lastSpokenCueRef = useRef<string>('');
  const lastSpokenTimeRef = useRef<number>(0);

  // Target Pose Reference for RAF
  const targetPoseIdRef = useRef(targetPoseId);
  useEffect(() => {
    targetPoseIdRef.current = targetPoseId;
    setHoldSeconds(0);
  }, [targetPoseId]);

  // Voice synthesis helper
  const speakCue = useCallback((cue: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    const now = Date.now();
    // Debounce speech to once every 4 seconds
    if (now - lastSpokenTimeRef.current > 4000 && cue !== lastSpokenCueRef.current) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cue);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
      lastSpokenCueRef.current = cue;
      lastSpokenTimeRef.current = now;
    }
  }, [voiceEnabled]);

  // Practice Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalPracticeTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hold Timer increment when score >= 80%
  useEffect(() => {
    if (!analysis || analysis.score < 0.80 || !analysis.inFrame) {
      return;
    }

    const interval = setInterval(() => {
      setHoldSeconds(prev => {
        const next = prev + 1;
        if (next === targetHoldSeconds) {
          speakCue(`Masterful! You completed ${analysis.detectedPose}.`);
          setPosesCompleted(completed => {
            if (!completed.includes(analysis.detectedPose)) {
              return [...completed, analysis.detectedPose];
            }
            return completed;
          });
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [analysis, targetHoldSeconds, speakCue]);

  useEffect(() => {
    let detector: poseDetection.PoseDetector | null = null;
    let animationFrameId: number;
    let lastVideoTime = -1;
    let isMounted = true;
    let stream: MediaStream | null = null;

    const waitForVideoRef = (): Promise<HTMLVideoElement> =>
      new Promise((resolve, reject) => {
        let tries = 0;
        const check = () => {
          if (videoRef.current) return resolve(videoRef.current);
          if (tries++ > 50) return reject(new Error('Video element not mounted after timeout.'));
          setTimeout(check, 100);
        };
        check();
      });

    const init = async () => {
      try {
        if (!isMounted) return;

        // Step 1 — WebGL backend
        setLoadingMsg('Configuring WebGL Neural Engine (15%)...');
        try {
          await tf.setBackend('webgl');
          await tf.ready();
        } catch {
          // Fall back to CPU if WebGL not available
          await tf.setBackend('cpu');
          await tf.ready();
        }

        if (!isMounted) return;

        // Step 2 — Load model (Lightning = fast load, good accuracy)
        setLoadingMsg('Loading MoveNet AI Model (55%)...');
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
        );

        if (!isMounted) return;

        // Step 3 — Camera permission
        setLoadingMsg('Requesting camera permission (80%)...');
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
        } catch (camErr: any) {
          const msg =
            camErr.name === 'NotAllowedError'
              ? 'Camera permission denied. Please allow camera access and reload.'
              : camErr.name === 'NotFoundError'
              ? 'No camera found on this device.'
              : `Camera error: ${camErr.message}`;
          throw new Error(msg);
        }

        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        // Step 4 — Attach stream to video element
        setLoadingMsg('Connecting camera stream (90%)...');
        const video = await waitForVideoRef();
        video.srcObject = stream;

        await new Promise<void>((resolve) => {
          let resolved = false;
          const onReady = () => {
            if (resolved) return;
            resolved = true;
            video.play().catch(() => {}).finally(() => resolve());
          };

          if (video.readyState >= 2) {
            onReady();
          } else {
            video.onloadeddata = onReady;
            video.onloadedmetadata = onReady;
            // Failsafe timeout in case event already fired
            setTimeout(onReady, 2500);
          }
        });

        if (!isMounted) return;
        setLoadingMsg('');
        detectPose();
      } catch (err: any) {
        console.error('[PostureLab]', err);
        if (isMounted) {
          setError(err.message || 'Failed to start AI Posture Lab. Please try refreshing.');
          setLoadingMsg('');
        }
      }
    };

    const detectPose = () => {
      if (!isMounted || !videoRef.current || !canvasRef.current || !detector) return;

      const video = videoRef.current;
      const runDetection = async () => {
        if (!isMounted) return;
        if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime;
          try {
            const poses = await detector!.estimatePoses(video, { maxPoses: 1, flipHorizontal: false });
            if (poses.length > 0 && isMounted) {
              const pose = poses[0];
              const currentTarget = targetPoseIdRef.current;
              const result = analyzePosture(pose.keypoints, currentTarget);
              setAnalysis(result);
              if (canvasRef.current) {
                drawSkeleton(canvasRef.current, video, pose.keypoints, result.jointStatus, result.jointAngles);
              }
              if (result.cues?.length > 0) speakCue(result.cues[0]);
            }
          } catch (e) {
            // silently skip bad frames
          }
        }
        if (isMounted) animationFrameId = requestAnimationFrame(runDetection);
      };
      animationFrameId = requestAnimationFrame(runDetection);
    };

    init();

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (detector) detector.dispose();
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [speakCue]);


  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Sattvalife Bio-AI System
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-semibold text-text-primary">
              AI Posture Lab &amp; Real-Time Biomechanics
            </h1>
            <p className="text-text-secondary mt-1 text-sm max-w-2xl">
              100% private, on-device pose estimation providing instant alignment feedback, angle tracking, and posture coaching.
            </p>
          </div>

          {/* Session Stats Chips */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-xl">
              <Timer className="w-4 h-4 text-primary" />
              <div className="text-left">
                <span className="text-[10px] uppercase text-text-secondary block font-bold">Session</span>
                <span className="text-sm font-bold text-text-primary font-mono">{formatTime(totalPracticeTime)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-xl">
              <Trophy className="w-4 h-4 text-amber-500" />
              <div className="text-left">
                <span className="text-[10px] uppercase text-text-secondary block font-bold">Mastered</span>
                <span className="text-sm font-bold text-text-primary font-mono">{posesCompleted.length} Poses</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-xl">
              <Flame className="w-4 h-4 text-rose-500" />
              <div className="text-left">
                <span className="text-[10px] uppercase text-text-secondary block font-bold">Hold</span>
                <span className="text-sm font-bold text-text-primary font-mono">{holdSeconds}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Viewport: Video & Skeleton Canvas */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative bg-black rounded-3xl overflow-hidden shadow-xl border border-border aspect-[16/9] w-full">
              <CameraView videoRef={videoRef} canvasRef={canvasRef} />

              {/* Overlaid HUD Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live 30 FPS Tracker</span>
              </div>

              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
                <span>Private On-Device</span>
              </div>

              {/* Loading Overlay */}
              {loadingMsg && !error && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xs">
                      AI
                    </div>
                  </div>
                  <p className="text-lg font-display font-semibold animate-pulse">{loadingMsg}</p>
                  <p className="text-xs text-white/70 mt-2">All neural vision processing runs locally in your browser.</p>
                </div>
              )}

              {/* Error Overlay */}
              {error && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 text-center">
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-2xl max-w-md shadow-lg">
                    <h2 className="text-base font-bold mb-2">Camera / AI Setup Notice</h2>
                    <p className="text-xs mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-5 py-2 bg-rose-600 text-white font-medium rounded-xl text-xs hover:bg-rose-700 transition"
                    >
                      Retry Connection
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Asana Carousel / Quick Bar */}
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                Quick Select Asana
              </h4>
              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => setTargetPoseId('auto')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    targetPoseId === 'auto'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary hover:bg-secondary/80 text-text-primary'
                  }`}
                >
                  ⚡ Auto-Detect
                </button>
                {ASANA_LIBRARY.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setTargetPoseId(a.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      targetPoseId === a.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary hover:bg-secondary/80 text-text-primary'
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Biometrics & Coaching Feedback */}
          <div className="lg:col-span-4">
            <PoseFeedback
              analysis={analysis}
              targetPoseId={targetPoseId}
              onSelectTargetPose={setTargetPoseId}
              holdSeconds={holdSeconds}
              targetHoldSeconds={targetHoldSeconds}
              voiceEnabled={voiceEnabled}
              onToggleVoice={() => setVoiceEnabled(v => !v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

