export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white outline-none cursor-pointer"
    >
      <option value="LATEST">Latest First</option>
      <option value="OLDEST">Oldest First</option>
    </select>
  );
}
