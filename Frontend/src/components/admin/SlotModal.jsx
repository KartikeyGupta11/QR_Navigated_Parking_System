import { motion } from "framer-motion";

export default function SlotModal({ slot, onClose }) {
  if (!slot) return null;

  const status = slot.slotStatus;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[350px]"
      >
        <h2 className="text-lg font-bold mb-4 text-center">
          Slot {slot.slotNumber}
        </h2>

        {status === "OCCUPIED" && (
          <div className="space-y-2 text-sm">
            <p>
              <strong>Car:</strong> {slot.session?.carNumber || "-"}
            </p>

            <p>
              <strong>Entry:</strong>{" "}
              {slot.session?.entryTime
                ? new Date(slot.session.entryTime).toLocaleString()
                : "-"}
            </p>

            <p>
              <strong>Status:</strong> {slot.session?.status || "ACTIVE"}
            </p>
          </div>
        )}

        {status === "AVAILABLE" && (
          <p className="text-center text-green-500">Slot is available</p>
        )}

        {status === "RESERVED" && (
          <div className="text-center space-y-2">
            <p className="text-yellow-500 font-medium">Slot is reserved</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reserved for an upcoming booking.
            </p>
          </div>
        )}

        {status === "MAINTENANCE" && (
          <div className="text-center space-y-2">
            <p className="text-gray-500 font-medium">
              Slot is under maintenance
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              This slot is currently unavailable.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
