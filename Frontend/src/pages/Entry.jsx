import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Buttons";
import { createEntry } from "../api/parking.api";
import toast from "react-hot-toast";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import {
  formatCarNumber,
  isValidPhone,
  isValidCarNumber,
  isValidEmail,
} from "../utils/format";
import Skeleton from "../components/Skeleton.jsx";
import { useNavigate } from "react-router-dom";

export default function Entry() {
  const [form, setForm] = useState({
    carNumber: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const isFormValid = form.carNumber.length >= 8 && isValidPhone(form.phone);

  const handleSubmit = async () => {
    if (!form.carNumber || !form.phone) {
      return toast.error("Car number & phone required");
    }

    try {
      setLoading(true);
      const data = await createEntry(form);

      if (!isValidCarNumber(form.carNumber)) {
        return toast.error("Invalid car number (e.g. UP32 GH 1234)");
      }

      if (!isValidPhone(form.phone)) {
        return toast.error("Enter valid 10-digit phone number");
      }

      if (form.email && !isValidEmail(form.email)) {
        return toast.error("Enter valid email");
      }

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
      <div
        className="flex justify-center items-center min-h-[80vh] 
                    bg-gray-100 dark:bg-gray-900 transition"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 
                   text-black dark:text-white
                   p-8 rounded-2xl shadow-lg w-[360px] transition"
        >
          <div className="text-center mb-5">
            <div className="flex justify-center items-center gap-2 mb-2">
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Car className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </motion.div>

              <h2 className="text-xl font-bold">Parking Entry</h2>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your vehicle details
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label
                className="text-sm font-medium 
                              text-gray-700 dark:text-gray-300"
              >
                Car Number
              </label>
              <Input
                placeholder="e.g. UP32 AB 1234"
                value={form.carNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    carNumber: formatCarNumber(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label
                className="text-sm font-medium 
                              text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <Input
                placeholder="XXXXXXXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
                }
              />
            </div>

            <div>
              <label
                className="text-sm font-medium 
                              text-gray-700 dark:text-gray-300"
              >
                Email (optional)
              </label>
              <Input
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Button
              text="Enter Parking"
              loading={loading}
              onClick={handleSubmit}
              disabled={!isFormValid}
            />

            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition font-medium shadow-sm cursor-pointer"
            >
              Go to Home
            </motion.button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 p-3 
                       bg-green-100 dark:bg-green-900/40 
                       text-green-700 dark:text-green-300 
                       rounded-lg text-center text-sm"
            >
              Slot Assigned: <b>{result.slotNumber}</b>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
