export default function Button({ text, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-white p-2 rounded-md ${
        color === "blue"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {text}
    </button>
  );
}
