import { motion } from "framer-motion";
import { Car, Clock3, CheckCircle2, CircleDot } from "lucide-react";

export default function SlotCard({ slot, onSelect }) {
  const occupied = slot.isOccupied;

  const duration = () => {
    if (!slot.session?.entryTime) return null;

    const start = new Date(slot.session.entryTime);
    const now = new Date();

    const diff = Math.floor((now - start) / 1000);

    const hrs = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);

    return `${hrs}h ${mins}m`;
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(slot)}
      className={`
        relative overflow-hidden cursor-pointer
        rounded-2xl border p-4 transition-all duration-300
        shadow-sm hover:shadow-xl

        ${
          occupied
            ? `
              bg-gradient-to-br
              from-red-500/10 to-red-600/20
              border-red-400/30
              dark:border-red-500/30
            `
            : `
              bg-gradient-to-br
              from-green-500/10 to-green-600/20
              border-green-400/30
              dark:border-green-500/30
            `
        }

        backdrop-blur-md
      `}
    >
      {occupied && (
        <div className="absolute top-2 right-2">
          <span className="relative flex h-3 w-3">
            <span
              className="
                animate-ping absolute inline-flex
                h-full w-full rounded-full
                bg-red-400 opacity-75
              "
            />

            <span
              className="
                relative inline-flex rounded-full
                h-3 w-3 bg-red-500
              "
            />
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{slot.slotNumber}</h2>

        <div
          className={`
            p-2 rounded-xl
            ${
              occupied
                ? "bg-red-500/20 text-red-500"
                : "bg-green-500/20 text-green-500"
            }
          `}
        >
          {occupied ? <Car size={18} /> : <CheckCircle2 size={18} />}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CircleDot
            size={14}
            className={occupied ? "text-red-500" : "text-green-500"}
          />

          <span className="font-medium">
            {occupied ? "Occupied" : "Available"}
          </span>
        </div>

        {occupied && (
          <>
            <div className="text-sm font-medium truncate">
              {slot.session?.carNumber}
            </div>

            <div
              className="
                flex items-center gap-2
                text-xs text-gray-500
                dark:text-gray-400
              "
            >
              <Clock3 size={13} />

              <span>{duration()}</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
