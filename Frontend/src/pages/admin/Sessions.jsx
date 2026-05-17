import { useEffect, useState } from "react";
import { getAllSessions } from "../../api/admin.api";
import toast from "react-hot-toast";
import Skeleton from "../../components/Skeleton";
import Row from "../../components/admin/Row";
import AdminLayout from "../../layouts/AdminLayout";
import SessionToolbar from "../../components/admin/SessionToolbar";

export default function Sessions() {
  const [sessions, setSessions] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LATEST");

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

  const filteredSessions = sessions
    ?.filter((s) => {
      const matchesSearch =
        s.carNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search);

      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    ?.sort((a, b) => {
      if (sortOrder === "LATEST") {
        return new Date(b.entryTime) - new Date(a.entryTime);
      }

      return new Date(a.entryTime) - new Date(b.entryTime);
    });

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>
        {!sessions ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <div className="overflow-x-auto">
            <SessionToolbar
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
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
                  filteredSessions.map((s, i) => <Row key={i} session={s} />)
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
