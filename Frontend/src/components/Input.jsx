import { motion } from "framer-motion";

export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
}) {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      whileFocus={{ scale: 1.02 }}
      className="w-full mb-3 px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}
