import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import StatsGrid from "../../components/admin/StatsGrid";

import { getDashboardStats } from "../../api/admin.api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Analytics</h1>

        {!stats ? <p>Loading...</p> : <StatsGrid stats={stats} />}
      </div>
    </AdminLayout>
  );
}
