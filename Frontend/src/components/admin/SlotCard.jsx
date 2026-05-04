import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function SlotCard({ slot, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-xl text-center font-semibold cursor-pointer transition ${slot.isOccupied ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"} `}
      onClick={() => onSelect(slot)}
    >
      <p className="text-lg">{slot.slotNumber}</p>

      {slot.isOccupied && <Car className="mx-auto mt-1" size={16} />}

      <p className="text-xs mt-1">
        {slot.isOccupied ? "Occupied" : "Available"}
      </p>
    </motion.div>
  );
}
