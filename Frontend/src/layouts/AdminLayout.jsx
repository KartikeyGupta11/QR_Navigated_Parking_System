import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
