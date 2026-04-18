"use client";

import React from 'react';
import { ShieldCheck, Info, Zap, Layers } from 'lucide-react';

interface FusionExplanation {
  matchRules: Record<string, boolean | number | null>;
  mergedReports: number;
  explanationText: string;
}

interface ScoringExplanation {
  incidentType: string;
  severity: string;
  severityReason: string;
  confidence: string;
  confidenceFactors: { factor: string; score: number }[];
}

export function IntelligencePanel({ 
  fusion, 
  scoring 
}: { 
  fusion: FusionExplanation | null; 
  scoring: ScoringExplanation | null;
}) {
  if (!fusion && !scoring) return null;

  return (
    <div className="space-y-6">
      {/* Scoring/Intelligence Card */}
      {scoring && (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase">AI Scoring Intelligence</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Severity Assessment</label>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${
                    scoring.severity === 'HIGH' ? 'text-red-600' : 
                    scoring.severity === 'MEDIUM' ? 'text-amber-500' : 'text-blue-600'
                  }`}>
                    {scoring.severity}
                  </span>
                  <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                    Confidence: {scoring.confidence}
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed italic border-l-2 border-neutral-100 pl-4">
                  &quot;{scoring.severityReason}&quot;
                </p>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-3">Confidence Factors</label>
              <div className="space-y-3">
                {scoring.confidenceFactors.map((factor, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-700">{factor.factor}</span>
                      <span className="font-semibold text-neutral-900">{factor.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-1000" 
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fusion/Merging Card */}
      {fusion && (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase">Spatial-Temporal Fusion</h3>
          </div>

          <div className="bg-neutral-50 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-800 mb-1">Incident Cluster Explanation</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {fusion.explanationText}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">Fusion Matching Rules Applied</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(fusion.matchRules || {}).map(([rule, active]) => (
                <div 
                  key={rule} 
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] font-medium transition-colors ${
                    active 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                      : 'bg-neutral-50 border-neutral-100 text-neutral-400 opacity-60'
                  }`}
                >
                  <ShieldCheck className={`w-3.5 h-3.5 ${active ? 'text-emerald-500' : 'text-neutral-300'}`} />
                  {rule.replace(/_/g, ' ').toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
