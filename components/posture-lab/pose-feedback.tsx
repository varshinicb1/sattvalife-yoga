'use client';

import React from 'react';
import { ASANA_LIBRARY, PostureAnalysisResult } from './pose-analysis';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, Volume2, VolumeX, Flame, Timer, Activity } from 'lucide-react';

interface PoseFeedbackProps {
  analysis: PostureAnalysisResult | null;
  targetPoseId: string;
  onSelectTargetPose: (id: string) => void;
  holdSeconds: number;
  targetHoldSeconds: number;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export function PoseFeedback({
  analysis,
  targetPoseId,
  onSelectTargetPose,
  holdSeconds,
  targetHoldSeconds,
  voiceEnabled,
  onToggleVoice
}: PoseFeedbackProps) {
  const selectedAsana = ASANA_LIBRARY.find(a => a.id === targetPoseId);

  const getScoreColor = (score: number) => {
    if (score >= 0.85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 0.70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const holdProgress = Math.min(100, Math.round((holdSeconds / targetHoldSeconds) * 100));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col gap-6">
      {/* 1. Target Asana Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
            Target Asana Practice
          </label>
          <button
            onClick={onToggleVoice}
            className={`p-1.5 rounded-full transition-colors ${
              voiceEnabled ? 'bg-brand-50 text-brand-600' : 'bg-secondary text-text-secondary'
            }`}
            title={voiceEnabled ? 'Mute AI Voice Coach' : 'Enable AI Voice Coach'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
        <select
          value={targetPoseId}
          onChange={(e) => onSelectTargetPose(e.target.value)}
          className="w-full bg-secondary/60 border border-border rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="auto">⚡ Auto-Detect Asana</option>
          {ASANA_LIBRARY.map((asana) => (
            <option key={asana.id} value={asana.id}>
              {asana.name} ({asana.sanskritName})
            </option>
          ))}
        </select>
        {selectedAsana && targetPoseId !== 'auto' && (
          <p className="text-xs text-text-secondary mt-1.5 line-clamp-2">
            {selectedAsana.description}
          </p>
        )}
      </div>

      {/* 2. Detected Pose & Score Badge */}
      <div className="bg-secondary/40 rounded-2xl p-4 border border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-text-secondary uppercase">
              {analysis?.isTargetMatch ? 'Aligned Asana' : 'Current Posture'}
            </span>
            <h3 className="text-xl font-display font-semibold text-text-primary">
              {analysis?.detectedPose || 'Positioning...'}
            </h3>
            {analysis?.sanskritName && (
              <p className="text-xs italic text-brand-600 font-serif">
                {analysis.sanskritName}
              </p>
            )}
          </div>
          {analysis && analysis.score > 0 && (
            <div className={`px-3 py-1.5 rounded-full border text-sm font-bold flex items-center gap-1 ${getScoreColor(analysis.score)}`}>
              <Activity className="w-3.5 h-3.5" />
              {Math.round(analysis.score * 100)}%
            </div>
          )}
        </div>

        {/* Hold Progress Bar */}
        <div className="mt-4 pt-3 border-t border-border/40">
          <div className="flex items-center justify-between text-xs font-medium mb-1">
            <span className="flex items-center gap-1 text-text-secondary">
              <Timer className="w-3.5 h-3.5 text-brand-500" /> Hold Steady
            </span>
            <span className="text-text-primary font-semibold">
              {holdSeconds}s / {targetHoldSeconds}s
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-400 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${holdProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. AI Coaching Cues */}
      <div className="bg-brand-50/50 rounded-2xl p-4 border border-brand-100">
        <h4 className="text-xs font-bold text-brand-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-brand-500" /> AI Alignment Coaching
        </h4>
        {analysis?.cues && analysis.cues.length > 0 ? (
          <ul className="space-y-1.5">
            {analysis.cues.map((cue, idx) => (
              <li key={idx} className="text-xs font-medium text-brand-950 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-text-secondary italic">
            Step fully into view with your whole body visible.
          </p>
        )}
      </div>

      {/* 4. Joint Biometrics List */}
      <div>
        <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
          Joint Biometrics
        </h4>
        <div className="space-y-2">
          {analysis?.jointFeedbacks && analysis.jointFeedbacks.length > 0 ? (
            analysis.jointFeedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/30 border border-border/40 text-xs"
              >
                <div className="flex items-center gap-2">
                  {fb.status === 'good' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : fb.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                  <span className="font-semibold text-text-primary">{fb.joint}</span>
                </div>
                <span className="text-text-secondary font-mono">{fb.message}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-text-secondary italic">Awaiting pose telemetry...</p>
          )}
        </div>
      </div>
    </div>
  );
}

