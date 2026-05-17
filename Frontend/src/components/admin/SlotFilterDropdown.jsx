export default function SlotFilterDropdown({ value, onChange, sessions = [] }) {
  const uniqueSlots = [
    "ALL",
    ...Array.from(new Set(sessions?.map((s) => s.slot)?.filter(Boolean))).sort(
      (a, b) => {
        const aNum = parseInt(a.split("-")[1]);
        const bNum = parseInt(b.split("-")[1]);

        return aNum - bNum;
      },
    ),
  ];

  return (
    <select
      value={value}
      onChange={onChange}
      className="
        px-4 py-2 rounded-xl
        border border-gray-200
        dark:border-gray-700
        bg-white dark:bg-gray-800
        text-sm outline-none
        cursor-pointer
      "
    >
      {uniqueSlots.map((slot, index) => (
        <option key={index} value={slot}>
          {slot === "ALL" ? "All Slots" : slot}
        </option>
      ))}
    </select>
  );
}
