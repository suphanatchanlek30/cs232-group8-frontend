interface DashboardFiltersProps {
  statusFilters: string[];
  extraFilters: string[];
  activeStatusIndex?: number;
}

export function DashboardFilters({
  statusFilters,
  extraFilters,
  activeStatusIndex = 0,
}: DashboardFiltersProps) {
  return (
    <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <span className="font-semibold text-sm text-neutral-800 tracking-wide uppercase mr-2">Filter</span>

      {statusFilters.map((filter, idx) => (
        <button
          key={filter}
          type="button"
          className={`px-4 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
            idx === activeStatusIndex 
              ? 'bg-neutral-800 text-white font-medium shadow-sm' 
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          {filter}
        </button>
      ))}

      <div className="h-6 w-px bg-neutral-200 mx-1" />

      {extraFilters.map((filter) => (
        <button key={filter} type="button" className="px-4 py-1.5 rounded-full text-sm bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200 whitespace-nowrap transition-colors">
          {filter}
        </button>
      ))}
    </div>
  );
}
