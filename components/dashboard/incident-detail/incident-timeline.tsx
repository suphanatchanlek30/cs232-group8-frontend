"use client";

import React from 'react';
import { Circle, User, Bot, CheckCircle2 } from 'lucide-react';

interface TimelineEntry {
  actionType: string;
  actorType: string;
  actorName: string | null;
  description: string;
  changedAt: string;
}

export function IncidentTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'SYSTEM': return <Bot className="w-4 h-4" />;
      case 'STAFF': return <User className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100">
      <h3 className="font-semibold mb-8 text-neutral-800 text-sm tracking-wide uppercase">ACTIVITY TIMELINE</h3>

      <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-neutral-100">
        {timeline.map((entry, idx) => (
          <div key={idx} className="relative pl-10 flex gap-4">
            <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white z-10 ${
              entry.actorType === 'SYSTEM' ? 'bg-indigo-500 text-white' : 'bg-neutral-100 text-neutral-500'
            }`}>
              {getIcon(entry.actorType)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-neutral-800">{entry.actionType.replace(/_/g, ' ')}</span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {new Date(entry.changedAt).toLocaleString('th-TH', { 
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{entry.description}</p>
              {entry.actorName && (
                <span className="text-[11px] text-neutral-400 mt-1 block font-medium uppercase tracking-tight">BY: {entry.actorName}</span>
              )}
            </div>
          </div>
        ))}
        
        {/* End of timeline indicator */}
        <div className="relative pl-10">
          <div className="absolute left-[2px] w-4 h-4 rounded-full bg-emerald-50 border-2 border-white z-10 flex items-center justify-center">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
          </div>
          <span className="text-[11px] text-emerald-600 font-bold tracking-widest uppercase ml-1">Timeline End</span>
        </div>
      </div>
    </div>
  );
}
