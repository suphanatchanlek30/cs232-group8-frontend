"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DataPoint {
  incidentType: string;
  count: number;
}

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

const formatLabel = (label: string) => {
  return label.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export function DistributionChart({ data }: { data: DataPoint[] }) {
  const formattedData = data.map(d => ({
    name: formatLabel(d.incidentType),
    count: d.count
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 h-[400px]">
      <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-6">Incident Type Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={formattedData} layout="vertical" margin={{ left: 40, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#737373', fontSize: 12 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
