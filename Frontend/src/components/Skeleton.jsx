import { motion } from "framer-motion";

export default function Skeleton({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={`bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
    />
  );
}
