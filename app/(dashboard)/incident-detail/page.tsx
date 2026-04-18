"use client";

import React from 'react';
import Link from 'next/link';
import { Search, AlertCircle, ArrowRight } from 'lucide-react';

export default function IncidentDetailPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] p-6 text-center">
      <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 border border-neutral-100 shadow-sm">
        <Search className="w-10 h-10 text-neutral-300" />
      </div>
      
      <h1 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">No Incident Selected</h1>
      <p className="text-neutral-500 max-w-md mx-auto mb-10 leading-relaxed">
        Please select an incident from the main dashboard to view its detailed intelligence, AI scoring, and activity timeline.
      </p>
      
      <Link 
        href="/dashboard"
        className="flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-neutral-900/10 hover:bg-black transition-all group"
      >
        Go to Incident Dashboard
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm text-left">
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
            <AlertCircle size={18} />
          </div>
          <h4 className="text-sm font-bold text-neutral-800 mb-2">AI Analysis</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">Real-time fusion and scoring of multiple reports into actionable incidents.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm text-left">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
            <AlertCircle size={18} />
          </div>
          <h4 className="text-sm font-bold text-neutral-800 mb-2">Status Control</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">Manage incident lifecycle, assign units, and track resolution progress.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm text-left">
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 mb-4">
            <AlertCircle size={18} />
          </div>
          <h4 className="text-sm font-bold text-neutral-800 mb-2">Timeline History</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">Full audit trail of every system event and staff action taken.</p>
        </div>
      </div>
    </div>
  );
}