import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllSlots } from "../../api/admin.api";
import toast from "react-hot-toast";
import Skeleton from "../../components/Skeleton";
import SlotCard from "../../components/admin/SlotCard";
import SlotModal from "../../components/admin/SlotModal";

export default function Slots() {
  const [slots, setSlots] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchSlots = async () => {
    try {
      const data = await getAllSlots();
      setSlots(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSlots();

    const interval = setInterval(fetchSlots, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Smart Parking Slots</h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Real-time parking occupancy monitoring
          </p>
        </div>

        {!slots ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            {slots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <SlotModal slot={selected} onClose={() => setSelected(null)} />
      )}
    </AdminLayout>
  );
}
