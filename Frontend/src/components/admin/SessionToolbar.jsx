import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";

export default function SessionToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 mb-6 justify-between">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="flex gap-3">
        <FilterDropdown
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        <SortDropdown
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        />
      </div>
    </div>
  );
}
