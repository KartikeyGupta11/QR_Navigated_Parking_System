import { motion } from "framer-motion";
import { Car, Clock3, CheckCircle2, CircleDot, Wrench } from "lucide-react";

export default function SlotCard({ slot, onSelect }) {
  const status = slot.slotStatus;

  const occupied = status === "OCCUPIED";
  const available = status === "AVAILABLE";
  const reserved = status === "RESERVED";
  const maintenance = status === "MAINTENANCE";

  const duration = () => {
    if (!slot.session?.entryTime) return null;

    const start = new Date(slot.session.entryTime);
    const now = new Date();

    const diff = Math.floor((now - start) / 1000);

    const hrs = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);

    return `${hrs}h ${mins}m`;
  };

  const getStatusText = () => {
    if (occupied) return "Occupied";
    if (reserved) return "Reserved";
    if (maintenance) return "Maintenance";
    return "Available";
  };

  const getStatusStyles = () => {
    if (occupied) {
      return {
        card: `
          bg-gradient-to-br
          from-red-500/10 to-red-600/20
          border-red-400/30
          dark:border-red-500/30
        `,
        icon: "bg-red-500/20 text-red-500",
        dot: "text-red-500",
      };
    }

    if (reserved) {
      return {
        card: `
          bg-gradient-to-br
          from-yellow-500/10 to-yellow-600/20
          border-yellow-400/30
          dark:border-yellow-500/30
        `,
        icon: "bg-yellow-500/20 text-yellow-500",
        dot: "text-yellow-500",
      };
    }

    if (maintenance) {
      return {
        card: `
          bg-gradient-to-br
          from-gray-500/10 to-gray-600/20
          border-gray-400/30
          dark:border-gray-500/30
        `,
        icon: "bg-gray-500/20 text-gray-500",
        dot: "text-gray-500",
      };
    }

    return {
      card: `
        bg-gradient-to-br
        from-green-500/10 to-green-600/20
        border-green-400/30
        dark:border-green-500/30
      `,
      icon: "bg-green-500/20 text-green-500",
      dot: "text-green-500",
    };
  };

  const styles = getStatusStyles();

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

        ${styles.card}

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
            ${styles.icon}
          `}
        >
          {occupied && <Car size={18} />}
          {available && <CheckCircle2 size={18} />}
          {reserved && <Clock3 size={18} />}
          {maintenance && <Wrench size={18} />}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CircleDot size={14} className={styles.dot} />

          <span className="font-medium">{getStatusText()}</span>
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

        {reserved && (
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            Reserved for upcoming booking
          </div>
        )}

        {maintenance && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Currently unavailable
          </div>
        )}
      </div>
    </motion.div>
  );
}
