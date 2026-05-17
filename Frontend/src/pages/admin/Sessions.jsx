import { useEffect, useState } from "react";
import { getAllSessions } from "../../api/admin.api";
import toast from "react-hot-toast";
import Skeleton from "../../components/Skeleton";
import Row from "../../components/admin/Row";
import AdminLayout from "../../layouts/AdminLayout";
import SessionToolbar from "../../components/admin/SessionToolbar";
import { CarFront, CheckCircle2, Clock3 } from "lucide-react";

export default function Sessions() {
  const [sessions, setSessions] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LATEST");
  const [slotFilter, setSlotFilter] = useState("ALL");

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

      const matchesSlot = slotFilter === "ALL" || s.slot === slotFilter;

      return matchesSearch && matchesStatus && matchesSlot;
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Parking Sessions
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Monitor all parking activity in real time
            </p>
          </div>

          <div
            className="
              flex items-center gap-2
              px-4 py-2 rounded-2xl

              bg-green-100 dark:bg-green-900/30
              text-green-700 dark:text-green-300

              w-fit
            "
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

            <p className="text-sm font-medium">Live Updates Active</p>
          </div>
        </div>

        {!sessions ? (
          <Skeleton className="w-full h-[500px]" />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="
                  relative overflow-hidden

                  rounded-3xl p-6

                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700

                  shadow-sm
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Sessions
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-gray-800 dark:text-white">
                      {sessions.length}
                    </h2>
                  </div>

                  <div
                    className="
                      w-14 h-14 rounded-2xl

                      flex items-center justify-center

                      bg-blue-100 dark:bg-blue-900/30
                      text-blue-600 dark:text-blue-400
                    "
                  >
                    <CarFront size={26} />
                  </div>
                </div>
              </div>

              <div
                className="
                  relative overflow-hidden

                  rounded-3xl p-6

                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700

                  shadow-sm
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Active Vehicles
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-green-600">
                      {sessions.filter((s) => s.status === "ACTIVE").length}
                    </h2>
                  </div>

                  <div
                    className="
                      w-14 h-14 rounded-2xl

                      flex items-center justify-center

                      bg-green-100 dark:bg-green-900/30
                      text-green-600 dark:text-green-400
                    "
                  >
                    <Clock3 size={26} />
                  </div>
                </div>
              </div>

              <div
                className="
                  relative overflow-hidden

                  rounded-3xl p-6

                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700

                  shadow-sm
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completed Sessions
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-blue-600">
                      {sessions.filter((s) => s.status === "COMPLETED").length}
                    </h2>
                  </div>

                  <div
                    className="
                      w-14 h-14 rounded-2xl

                      flex items-center justify-center

                      bg-blue-100 dark:bg-blue-900/30
                      text-blue-600 dark:text-blue-400
                    "
                  >
                    <CheckCircle2 size={26} />
                  </div>
                </div>
              </div>
            </div>

            <SessionToolbar
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              slotFilter={slotFilter}
              setSlotFilter={setSlotFilter}
              sessions={sessions || []}
            />

            <div
              className="
                overflow-hidden rounded-3xl

                border border-gray-200
                dark:border-gray-700

                bg-white dark:bg-gray-800

                shadow-sm
              "
            >
              <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full">
                  <thead
                    className="
                      bg-gray-100/80 dark:bg-gray-700/60
                      backdrop-blur-xl
                    "
                  >
                    <tr>
                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
                        Car
                      </th>

                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
                        Slot
                      </th>

                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
                        Phone
                      </th>

                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
                        Entry Time
                      </th>

                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
                        Exit Time
                      </th>

                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
                        Duration
                      </th>

                      <th className="p-5 text-left text-xs uppercase tracking-wider text-gray-500">
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
                            py-16 text-center
                            text-gray-500 dark:text-gray-400
                          "
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div
                              className="
                                w-16 h-16 rounded-2xl

                                flex items-center justify-center

                                bg-gray-100 dark:bg-gray-700
                              "
                            >
                              <CarFront size={30} />
                            </div>

                            <div>
                              <h3 className="font-semibold text-lg">
                                No sessions found
                              </h3>

                              <p className="text-sm mt-1">
                                Try changing filters or search query
                              </p>
                            </div>
                          </div>
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
