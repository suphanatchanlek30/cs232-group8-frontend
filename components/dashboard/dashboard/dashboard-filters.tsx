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
    <div className="flex items-center gap-2 mb-6 bg-white p-2 rounded-full border shadow-sm overflow-x-auto">
      <span className="px-4 font-bold border-r pr-4 text-sm text-gray-900 uppercase">Filter</span>

      {statusFilters.map((filter, idx) => (
        <button
          key={filter}
          type="button"
          className={`px-4 py-1 rounded-full text-sm hover:bg-gray-100 border ${
            idx === activeStatusIndex ? 'bg-gray-100 font-medium' : ''
          }`}
        >
          {filter}
        </button>
      ))}

      <div className="h-6 w-px bg-gray-300 mx-2" />

      {extraFilters.map((filter) => (
        <button key={filter} type="button" className="px-4 py-1 rounded-full text-sm hover:bg-gray-100 border">
          {filter}
        </button>
      ))}
    </div>
  );
}
