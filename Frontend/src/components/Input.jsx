export default function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus-ring-blue-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
