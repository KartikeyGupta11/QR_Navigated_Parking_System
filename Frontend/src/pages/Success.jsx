import MainLayout from "../layouts/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <MainLayout>
        <div className="text-center mt-10 text-black dark:text-white">
          Invalid Access
        </div>
      </MainLayout>
    );
  }

  const { carNumber, amount } = state;

  return (
    <MainLayout>
      <div
        className="flex justify-center items-center min-h-[80vh] 
                    bg-gray-100 dark:bg-gray-900 transition"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 
                   text-black dark:text-white
                   p-8 rounded-2xl shadow-lg w-360px text-center transition"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, dampin: 10 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle className="text-green-500 dark:text-green-400 w-16 h-16" />
          </motion.div>

          <h2 className="text-xl font-bold mb-2">Payment Successful</h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You have successfully exited the parking
          </p>

          <div
            className="bg-gray-100 dark:bg-gray-700 
                        p-4 rounded-lg text-left mb-5"
          >
            <p>
              <strong>Car:</strong> {carNumber}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹{amount}
            </p>
          </div>

          <Button text="Go to Home" onClick={() => navigate("/")} />
        </motion.div>
      </div>
    </MainLayout>
  );
}
