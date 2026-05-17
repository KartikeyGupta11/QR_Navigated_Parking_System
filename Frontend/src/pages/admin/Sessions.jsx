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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Parking Sessions
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor all parking activity in real time
          </p>
        </div>

        {!sessions ? (
          <Skeleton className="w-full h-[400px]" />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="
                rounded-2xl p-5
                bg-white dark:bg-gray-800
                shadow-sm border
                dark:border-gray-700
              "
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Sessions
                </p>

                <h2 className="text-3xl font-bold mt-2">{sessions.length}</h2>
              </div>

              <div
                className="
                rounded-2xl p-5
                bg-white dark:bg-gray-800
                shadow-sm border
                dark:border-gray-700
              "
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Vehicles
                </p>

                <h2 className="text-3xl font-bold mt-2 text-green-600">
                  {sessions.filter((s) => s.status === "ACTIVE").length}
                </h2>
              </div>

              <div
                className="
                rounded-2xl p-5
                bg-white dark:bg-gray-800
                shadow-sm border
                dark:border-gray-700
              "
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed Sessions
                </p>

                <h2 className="text-3xl font-bold mt-2 text-blue-600">
                  {sessions.filter((s) => s.status === "COMPLETED").length}
                </h2>
              </div>
            </div>

            <SessionToolbar
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            <div
              className="
              rounded-2xl overflow-hidden
              border border-gray-200
              dark:border-gray-700
              bg-white dark:bg-gray-800
              shadow-sm
            "
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className="
                    sticky top-0 z-10
                    bg-gray-100 dark:bg-gray-700
                  "
                  >
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold">
                        Car
                      </th>

                      <th className="p-4 text-left text-sm font-semibold">
                        Slot
                      </th>

                      <th className="p-4 text-left text-sm font-semibold">
                        Phone
                      </th>

                      <th className="p-4 text-left text-sm font-semibold">
                        Entry Time
                      </th>

                      <th className="p-4 text-left text-sm font-semibold">
                        Exit Time
                      </th>

                      <th className="p-4 text-left text-sm font-semibold">
                        Duration
                      </th>

                      <th className="p-4 text-left text-sm font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSessions.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="
                          text-center py-10
                          text-gray-500 dark:text-gray-400
                        "
                        >
                          No sessions found 🚗
                        </td>
                      </tr>
                    ) : (
                      filteredSessions.map((s, i) => (
                        <Row key={i} session={s} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
