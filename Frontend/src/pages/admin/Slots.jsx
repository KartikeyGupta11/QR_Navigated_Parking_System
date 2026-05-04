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
        <h1 className="text-2xl font-bold mb-6">Parking Slots</h1>

        {!slots ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
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
