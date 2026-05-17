export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by car number..."
      value={value}
      onChange={onChange}
      className="w-full md:w-72 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  );
}
