import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Buttons";
import { createEntry } from "../api/parking.api";
import toast from "react-hot-toast";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

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
      <div className="flex justify-center items-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-360px"
        >
          <div className="text-center mb-5">
            <div className="flex justify-center items-center gap-2 mb-2">
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Car className="text-blue-600 w-6 h-6" />
              </motion.div>

              <h2 className="text-xl font-bold">Parking Entry</h2>
            </div>

            <p className="text-sm text-gray-500">Enter your vehicle details</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Car Number</label>
              <Input
                placeholder="e.g. UP32AB1234"
                value={form.carNumber}
                onChange={(e) =>
                  setForm({ ...form, carNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="XXXXXXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email (optional)</label>
              <Input
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-5">
            <Button
              text="Enter Parking"
              loading={loading}
              onClick={handleSubmit}
            />
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm"
            >
              Slot Assigned: <b>{result.slotNumber}</b>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
