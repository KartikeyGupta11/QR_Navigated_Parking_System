import { useEffect, useState } from "react";
import { getAllSessions } from "../../api/admin.api";
import toast from "react-hot-toast";
import Skeleton from "../../components/Skeleton";
import Row from "../../components/admin/Row";
import AdminLayout from "../../layouts/AdminLayout";

export default function Sessions() {
  const [sessions, setSessions] = useState(null);

  const fetchSessions = async () => {
    try {
      const data = await getAllSessions();
      setSessions(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSessions();

    const interval = setInterval(fetchSessions, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>
        {!sessions ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Car</th>
                  <th className="p-3 text-left">Slot</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Entry Time</th>
                  <th className="p-3 text-left">Exit Time</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500 dark:text-gray-400"
                    >
                      No sessions yet 🚗
                    </td>
                  </tr>
                ) : (
                  sessions.map((s, i) => <Row key={i} session={s} />)
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
