import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PeakHoursChart({ data }) {
  return (
    <div
      className="bg-white dark:bg-gray-900
                 border dark:border-gray-800
                 rounded-2xl p-5 shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-5">Peak Parking Hours</h2>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="hour" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="vehicles" fill="#16a34a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
