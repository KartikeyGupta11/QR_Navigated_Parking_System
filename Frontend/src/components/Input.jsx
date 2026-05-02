// export default function Input({ placeholder, value, onChange }) {
//   return (
//     <input
//       className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus-ring-blue-400"
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//     />
//   );
// }

import { motion } from "framer-motion";

export default function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      whileFocus={{ scale: 1.02 }}
      className="w-full mb-3 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  );
}
