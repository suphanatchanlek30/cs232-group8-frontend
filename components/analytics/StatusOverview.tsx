"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StatusData {
  status: string;
  count: number;
}

const STATUS_COLORS: Record<string, string> = {
  'NEW': '#3B82F6',
  'IN_REVIEW': '#F59E0B',
  'IN_PROGRESS': '#7C3AED',
  'RESOLVED': '#10B981',
  'LINKED_TO_INCIDENT': '#6366F1'
};

const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    'NEW': 'New',
    'IN_REVIEW': 'Under Review',
    'IN_PROGRESS': 'In Progress',
    'RESOLVED': 'Resolved',
    'LINKED_TO_INCIDENT': 'Merged'
  };
  return map[status] || status;
};

export function StatusOverview({ data }: { data: StatusData[] }) {
  const formattedData = data.map(d => ({
    name: formatStatus(d.status),
    value: d.count,
    color: STATUS_COLORS[d.status] || '#CBD5E1'
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 h-[400px] flex flex-col">
      <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-2">Status Overview</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
