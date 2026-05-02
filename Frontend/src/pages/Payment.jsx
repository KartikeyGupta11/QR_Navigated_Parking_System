import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { exitParking, makePayment } from "../api/parking.api";
import toast from "react-hot-toast";
import Button from "../components/Buttons.jsx";
import { motion } from "framer-motion";
import { CreditCard, Car } from "lucide-react";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <MainLayout>
        <div className="text-center mt-10">No Parking Session found...</div>
      </MainLayout>
    );
  }

  const { sessionId, amount, carNumber } = state;

  const handlePayment = async () => {
    try {
      setLoading(true);
      await makePayment({ sessionId });
      await exitParking({ sessionId });

      toast.success("Payment Successful & Exit Completed");
      navigate("/success", {
        state: {
          carNumber,
          amount,
        },
      });
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
          className="bg-white p-8 rounded-2xl shadow-lg w-[360px]"
        >
          {/* 💳 Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 mb-2">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <CreditCard className="text-green-600 w-6 h-6" />
              </motion.div>

              <h2 className="text-xl font-bold">Confirm Payment</h2>
            </div>

            <p className="text-sm text-gray-500">
              Review details before exiting
            </p>
          </div>

          {/* 🚗 Details Card */}
          <div className="bg-gray-100 p-4 rounded-lg mb-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Car Number</span>
              <span className="font-medium">{carNumber}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Parking Fee</span>
              <span className="font-bold text-green-700">₹{amount}</span>
            </div>
          </div>

          {/* ⚠️ Note */}
          <p className="text-xs text-gray-500 text-center mb-4">
            Once payment is completed, your exit will be recorded automatically
          </p>

          {/* 🔘 Button */}
          <Button
            text="Pay & Exit"
            loading={loading}
            onClick={handlePayment}
            color="green"
          />
        </motion.div>
      </div>
    </MainLayout>
  );
}
