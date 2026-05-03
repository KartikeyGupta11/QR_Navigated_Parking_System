import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Buttons";
import { exitParking, findSession, makePayment } from "../api/parking.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import Skeleton from "../components/Skeleton";
import {
  formatCarNumber,
  isValidPhone,
  isValidCarNumber,
  isValidEmail,
} from "../utils/format";

export default function Exit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    carNumber: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const handleFind = async () => {
    if (!form.carNumber || !form.phone) {
      return toast.error("Car number & phone required");
    }

    if (!isValidCarNumber(form.carNumber)) {
      return toast.error("Invalid car number (e.g. UP32 GH 1234)");
    }

    if (!isValidPhone(form.phone)) {
      return toast.error("Enter valid 10-digit phone number");
    }

    if (form.email && !isValidEmail(form.email)) {
      return toast.error("Enter valid email");
    }

    try {
      setLoading(true);
      const data = await findSession(form);

      setSessionId(data.sessionId);
      setAmount(data.amount);

      toast.success("Session Found ✅");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        sessionId,
        amount,
        carNumber: form.carNumber,
      },
    });
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
          className="bg-white dark:bg-gray-800 
                   text-black dark:text-white
                   p-8 rounded-2xl shadow-lg w-[360px] transition"
        >
          <div className="text-center mb-5">
            <div className="flex justify-center items-center gap-2 mb-2">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Car className="text-red-500 dark:text-red-400 w-6 h-6" />
              </motion.div>

              <h2 className="text-xl font-bold">Parking Exit</h2>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Complete payment to exit
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
          </div>

          {loading ? (
            <Skeleton className="w-full h-16 mt-5 rounded-lg" />
          ) : amount === null ? (
            <div className="mt-5">
              <Button
                text="Check Details"
                loading={loading}
                onClick={handleFind}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="mt-5 p-4 
                            bg-yellow-100 dark:bg-yellow-900/40 
                            rounded-lg text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Amount Payable
                </p>
                <p
                  className="text-xl font-bold 
                            text-yellow-700 dark:text-yellow-300"
                >
                  ₹{amount}
                </p>
              </div>

              <div className="mt-4">
                <Button
                  text="Proceed to Payment"
                  onClick={handleProceed}
                  color="green"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
