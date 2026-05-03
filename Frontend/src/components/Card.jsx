import { motion } from "framer-motion";

export default function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="
        bg-white dark:bg-gray-800
        text-black dark:text-white
        p-6 rounded-2xl
        shadow-md hover:shadow-xl
        w-[360px]
        transition-all duration-300 ease-in-out
      "
    >
      {children}
    </motion.div>
  );
}
