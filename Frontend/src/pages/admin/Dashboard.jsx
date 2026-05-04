import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import Skeleton from "../../components/Skeleton";
import { getDashboardStats } from "../../api/admin.api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {!stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Slots" value={stats.totalSlots} />
            <StatCard title="Occupied" value={stats.occupied} />
            <StatCard title="Available" value={stats.available} />
            <StatCard title="Active Sessions" value={stats.activeSessions} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
