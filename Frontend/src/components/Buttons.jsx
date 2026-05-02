// export default function Button({ text, onClick, color = "blue" }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full text-white p-2 rounded-md ${
//         color === "blue"
//           ? "bg-blue-500 hover:bg-blue-600"
//           : "bg-green-500 hover:bg-green-600"
//       }`}
//     >
//       {text}
//     </button>
//   );
// }

import { motion } from "framer-motion";

export default function Button({
  text,
  onClick,
  color = "blue",
  loading = false,
}) {
  const base = "w-full py-2 rounded-lg font-semibold text-white transition";

  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${base} ${colors[color]} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Processing..." : text}
    </motion.button>
  );
}
