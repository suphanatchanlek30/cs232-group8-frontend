import type { PriorityIncident } from './types';

interface PriorityQueueProps {
  items: PriorityIncident[];
}

export function PriorityQueue({ items }: PriorityQueueProps) {
  return (
    <div className="col-span-12 bg-white p-4 rounded-xl shadow-sm border self-start lg:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">PRIORITY QUEUE</h3>
        <span className="text-[10px] text-gray-400 font-medium">High severity only</span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={idx < items.length - 1 ? 'border-b border-gray-100 pb-4' : ''}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-gray-500 font-bold">{item.id}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{item.title}</p>
                <p className="text-[10px] text-gray-500 mt-1">{item.details}</p>
              </div>

              <p className="text-[10px] text-red-600 font-bold uppercase pt-1">{item.severity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
