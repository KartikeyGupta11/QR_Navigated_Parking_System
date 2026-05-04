import { motion } from "framer-motion";

export default function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center transition"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </motion.div>
  );
}
