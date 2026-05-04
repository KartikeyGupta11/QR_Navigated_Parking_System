import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Layers } from "lucide-react";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-2 p-3 rounded-lg cursor-pointer transition";

  const activeClass = "bg-blue-600 text-white";

  const inactiveClass =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div
      className=" w-60 min-h-screen p-4
      bg-white dark:bg-gray-900
      border-r dark:border-gray-700"
    >
      <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>

      <div className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/sessions"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Car size={18} />
          Sessions
        </NavLink>

        <NavLink
          to="/admin/slots"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Layers size={18} />
          Slots
        </NavLink>
      </div>
    </div>
  );
}
