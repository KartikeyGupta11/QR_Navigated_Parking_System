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
      className={`
      border-t border-gray-100
      dark:border-gray-700
      transition-all duration-200

      hover:bg-gray-50
      dark:hover:bg-gray-700/40

      ${
        session.status === "ACTIVE" ? "bg-green-50/60 dark:bg-green-900/10" : ""
      }
    `}
    >
      <td className="p-4 font-semibold whitespace-nowrap">
        {session.carNumber}
      </td>

      <td className="p-4">
        <span
          className="
          px-3 py-1 rounded-full
          bg-blue-100 text-blue-700
          dark:bg-blue-900/30
          dark:text-blue-300
          text-xs font-semibold
        "
        >
          {session.slot}
        </span>
      </td>

      <td className="p-4 text-sm">{session.phone}</td>

      <td
        className="
        p-4 text-sm
        text-gray-600 dark:text-gray-300
        whitespace-nowrap
      "
      >
        {new Date(session.entryTime).toLocaleString()}
      </td>

      <td
        className="
        p-4 text-sm
        text-gray-600 dark:text-gray-300
        whitespace-nowrap
      "
      >
        {session.exitTime ? new Date(session.exitTime).toLocaleString() : "-"}
      </td>

      <td className="p-4 font-medium whitespace-nowrap">{duration}</td>

      <td className="p-4">
        <span
          className={`
          px-3 py-1 rounded-full
          text-xs font-bold

          ${
            session.status === "ACTIVE"
              ? `
                bg-green-100 text-green-700
                dark:bg-green-900/30
                dark:text-green-300
              `
              : `
                bg-gray-200 text-gray-700
                dark:bg-gray-700
                dark:text-gray-300
              `
          }
        `}
        >
          {session.status}
        </span>
      </td>
    </tr>
  );
}
