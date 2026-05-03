import { motion } from "framer-motion";

export default function Button({
  text,
  onClick,
  color = "blue",
  loading = false,
  disabled = false,
}) {
  const base =
    "w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition duration-200 cursor-pointer";

  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
    green:
      "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg",
    gray: "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      className={`${base} ${colors[color]} ${
        loading || disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}

      {loading ? (
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Processing...
        </div>
      ) : (
        text
      )}
    </motion.button>
  );
}
