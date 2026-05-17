export default function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white outline-none cursor-pointer"
    >
      <option value="ALL">All Sessions</option>
      <option value="ACTIVE">Active</option>
      <option value="COMPLETED">Completed</option>
    </select>
  );
}
