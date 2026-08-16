import { motion } from "framer-motion";
import { MapPin, Car, ArrowRight } from "lucide-react";

export default function ParkingAreaCard({ parkingArea, onSelect }) {
  const {
    parkingName,
    parkingCode,
    address,
    totalSlots,
    availableSlots,
    occupiedSlots,
    status,
  } = parkingArea;

  const inactive = status === "INACTIVE";

  return (
    <motion.div
      whileHover={
        !inactive
          ? {
              y: -8,
              scale: 1.02,
            }
          : {}
      }
      transition={{ duration: 0.2 }}
      onClick={() => !inactive && onSelect(parkingArea)}
      className={`
        relative overflow-hidden
        rounded-3xl border
        p-6
        transition-all duration-300
        backdrop-blur-md
        ${
          inactive
            ? "cursor-not-allowed opacity-60 bg-gray-500/10 border-gray-400/20"
            : "cursor-pointer bg-white/70 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 hover:shadow-2xl"
        }
      `}
    >
      {/* Parking Code */}
      <div className="absolute top-4 right-4">
        <div
          className="
            flex items-center justify-center
            w-10 h-10
            rounded-xl
            bg-blue-500/10
            text-blue-500
            font-bold
          "
        >
          {parkingCode}
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="
            p-3 rounded-2xl
            bg-blue-500/10
            text-blue-500
          "
        >
          <MapPin size={24} />
        </div>

        <div className="pr-10">
          <h2 className="text-xl font-bold">{parkingName}</h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {address}
          </p>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Parking Availability
          </span>

          <span className="text-sm font-semibold">
            {availableSlots ?? totalSlots} / {totalSlots}
          </span>
        </div>

        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{
              width: `${
                totalSlots
                  ? ((availableSlots ?? totalSlots) / totalSlots) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-gray-500/5 p-3 text-center">
          <p className="text-lg font-bold">{totalSlots}</p>

          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
        </div>

        <div className="rounded-xl bg-green-500/10 p-3 text-center">
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {availableSlots ?? totalSlots}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
        </div>

        <div className="rounded-xl bg-red-500/10 p-3 text-center">
          <p className="text-lg font-bold text-red-600 dark:text-red-400">
            {occupiedSlots ?? 0}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">Occupied</p>
        </div>
      </div>

      {/* Select */}
      <div
        className="
          flex items-center justify-between
          rounded-xl
          bg-blue-500/10
          px-4 py-3
          text-blue-600 dark:text-blue-400
          font-medium
        "
      >
        <div className="flex items-center gap-2">
          <Car size={17} />

          <span>{inactive ? "Currently Unavailable" : "Park Here"}</span>
        </div>

        {!inactive && <ArrowRight size={18} />}
      </div>
    </motion.div>
  );
}
