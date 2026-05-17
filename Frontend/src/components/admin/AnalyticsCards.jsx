import {
  DollarSign,
  Car,
  ParkingCircle,
  CheckCircle,
} from "lucide-react";

const cards = [
  {
    key: "totalRevenue",
    title: "Revenue",
    icon: DollarSign,
    color: "text-green-600",
    prefix: "₹",
  },
  {
    key: "activeVehicles",
    title: "Active Vehicles",
    icon: Car,
    color: "text-blue-600",
  },
  {
    key: "occupiedSlots",
    title: "Occupied Slots",
    icon: ParkingCircle,
    color: "text-red-500",
  },
  {
    key: "completedSessions",
    title: "Completed",
    icon: CheckCircle,
    color: "text-purple-500",
  },
];

export default function AnalyticsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="bg-white dark:bg-gray-900
                       border dark:border-gray-800
                       rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.prefix}
                  {stats[card.key]}
                </h2>
              </div>

              <div
                className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${card.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}