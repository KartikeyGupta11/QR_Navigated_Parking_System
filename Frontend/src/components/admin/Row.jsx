import { useEffect, useState } from "react";

export default function Row({ session }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!session?.entryTime) return;

      const start = new Date(session.entryTime);
      const end = session.exitTime ? new Date(session.exitTime) : new Date();

      const diff = Math.floor((end - start) / 1000);

      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);

      setDuration(`${hrs}h ${mins}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  return (
    <tr
      className={`border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
        session.status === "ACTIVE" ? "bg-green-200 dark:bg-green-900/20" : ""
      }`}
    >
      <td className="p-3 font-medium">{session.carNumber}</td>

      <td className="p-3">{session.slot}</td>

      <td className="p-3 text-sm">{session.phone}</td>

      <td className="p-3 text-sm text-gray-500">
        {new Date(session.entryTime).toLocaleString()}
      </td>

      <td className="p-3 text-sm text-gray-500">
        {session.exitTime ? new Date(session.exitTime).toLocaleString() : "-"}
      </td>

      <td className="p-3">{duration}</td>

      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            session.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {session.status}
        </span>
      </td>
    </tr>
  );
}
