import useTheme from "../hooks/useTheme.js";
import { Moon, Sun } from "lucide-react";

export default function MainLayout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full 
                   bg-gray-200 dark:bg-gray-700 
                   hover:scale-110 transition cursor-pointer"
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      {children}
    </div>
  );
}
