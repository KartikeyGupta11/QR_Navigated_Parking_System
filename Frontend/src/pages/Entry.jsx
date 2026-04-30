import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Buttons";
import { createEntry } from "../api/parking.api";
import toast from "react-hot-toast";

export default function Entry() {
  const [form, setForm] = useState({
    carNumber: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!form.carNumber || !form.phone) {
      return toast.error("Car number & phone required");
    }

    try {
      setLoading(true);
      const data = await createEntry(form);

      setResult(data);
      toast.success("Entry Successful 🚗");

      setForm({ carNumber: "", phone: "", email: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[360px]">
        <h2 className="text-xl font-bold mb-1 text-center">Parking Entry</h2>
        <p className="text-sm text-gray-500 text-center mb-5">
          Enter your vehicle details
        </p>

        <label className="text-sm font-medium">Car Number</label>
        <Input
          value={form.carNumber}
          onChange={(e) => setForm({ ...form, carNumber: e.target.value })}
        />

        <label className="text-sm font-medium">Phone Number</label>
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label className="text-sm font-medium">Email (optional)</label>
        <Input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="mt-4">
          <Button
            text={loading ? "Processing..." : "Enter Parking"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>

        {result && (
          <div className="mt-5 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm">
            ✅ Slot Assigned: <b>{result.slot}</b>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
