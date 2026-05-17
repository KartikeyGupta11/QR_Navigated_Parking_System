import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import { getAnalytics } from "../../api/admin.api";

import AnalyticsCards from "../../components/admin/AnalyticsCards";
import RevenueChart from "../../components/admin/RevenueChart";
import PeakHoursChart from "../../components/admin/PeakHoursChart";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();

      setAnalytics(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    const interval = setInterval(fetchAnalytics, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Analytics</h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Live parking insights & revenue analytics
          </p>
        </div>

        <AnalyticsCards stats={analytics.cards} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RevenueChart data={analytics.revenueChart} />

          <PeakHoursChart data={analytics.peakHours} />
        </div>
      </div>
    </AdminLayout>
  );
}
