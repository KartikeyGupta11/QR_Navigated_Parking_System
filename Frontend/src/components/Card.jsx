import { motion } from "framer-motion";

export default function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-md w-80"
    >
      {children}
    </motion.div>
  );
}
