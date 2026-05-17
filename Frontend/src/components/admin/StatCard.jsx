import { motion } from "framer-motion";

export default function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        p-5 rounded-2xl shadow-md
        bg-white dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

          <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>

        <div
          className={`
            w-12 h-12 rounded-xl
            flex items-center justify-center
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
