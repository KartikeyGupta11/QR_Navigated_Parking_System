import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";
import SlotFilterDropdown from "./SlotFilterDropdown";

export default function SessionToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
  slotFilter,
  setSlotFilter,
  sessions,
}) {
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setSortOrder("LATEST");
    setSlotFilter("ALL");
  };

  return (
    <div
      className="
        relative overflow-hidden

        flex flex-col xl:flex-row
        xl:items-center
        justify-between

        gap-5 mb-6

        rounded-3xl
        border border-gray-200/70
        dark:border-gray-700/60

        bg-white/90 dark:bg-gray-900/80
        backdrop-blur-xl

        p-5
        shadow-lg shadow-gray-200/40
        dark:shadow-black/20
      "
    >
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-r
          from-blue-500/5
          via-transparent
          to-purple-500/5
        "
      />

      <div className="relative flex items-center gap-3">
        <div
          className="
            w-11 h-11 rounded-2xl
            flex items-center justify-center

            bg-blue-100 dark:bg-blue-900/30
            text-blue-600 dark:text-blue-400
          "
        >
          <SlidersHorizontal size={20} />
        </div>
      </div>

      <div className="relative flex-1 max-w-2xl">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="relative flex flex-wrap items-center gap-3">
        <FilterDropdown
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        <SlotFilterDropdown
          value={slotFilter}
          onChange={(e) => setSlotFilter(e.target.value)}
          sessions={sessions}
        />

        <SortDropdown
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        />

        <button
          onClick={resetFilters}
          className="
            group

            flex items-center gap-2

            px-4 py-2.5 rounded-2xl

            bg-gradient-to-r
            from-red-500 to-red-600

            hover:from-red-600
            hover:to-red-700

            text-white text-sm font-medium

            shadow-lg shadow-red-500/20

            transition-all duration-300
            cursor-pointer
          "
        >
          <RotateCcw
            size={16}
            className="group-hover:rotate-180 transition duration-500"
          />
          Reset
        </button>
      </div>
    </div>
  );
}
