import {
  Car,
  CircleDollarSign,
  CheckCircle,
  ParkingCircle,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  return (
    <div
      className="
        grid grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-5
      "
    >
      <StatCard
        title="Total Sessions"
        value={stats.totalSlots}
        icon={<Car className="text-white" />}
        color="bg-blue-500"
      />

      <StatCard
        title="Active Vehicles"
        value={stats.activeSessions}
        icon={<ParkingCircle className="text-white" />}
        color="bg-green-500"
      />

      <StatCard
        title="Completed Sessions"
        value={stats.completedSessions}
        icon={<CheckCircle className="text-white" />}
        color="bg-purple-500"
      />

      <StatCard
        title="Total Revenue"
        value={`₹${stats.totalRevenue}`}
        icon={<CircleDollarSign className="text-white" />}
        color="bg-yellow-500"
      />

      <StatCard
        title="Occupied Slots"
        value={stats.occupied}
        icon={<ParkingCircle className="text-white" />}
        color="bg-red-500"
      />

      <StatCard
        title="Available Slots"
        value={stats.available}
        icon={<ParkingCircle className="text-white" />}
        color="bg-teal-500"
      />
    </div>
  );
}
