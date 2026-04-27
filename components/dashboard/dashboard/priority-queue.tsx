import type { PriorityIncident } from './types';

interface PriorityQueueProps {
  items: PriorityIncident[];
}

export function PriorityQueue({ items }: PriorityQueueProps) {
  return (
    <div className="col-span-12 bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 self-start lg:col-span-3">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase">PRIORITY QUEUE</h3>
        <span className="text-[10px] text-neutral-400 font-medium">High severity only</span>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-4">No high severity incidents</p>
        ) : items.map((item, idx) => (
          <div
            key={item.id}
            className={`group flex justify-between items-start ${idx < items.length - 1 ? 'border-b border-neutral-100 pb-4' : ''}`}
          >
            <div>
              <p className="text-[10px] text-neutral-400 font-bold tracking-wider">{item.id}</p>
              <p className="text-sm font-semibold text-neutral-800 mt-1 group-hover:text-neutral-600 transition-colors cursor-pointer">{item.title}</p>
              <p className="text-[11px] text-neutral-500 mt-1">{item.details}</p>
            </div>

            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 mt-1">
              {item.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
