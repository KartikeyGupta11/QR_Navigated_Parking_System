import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { exitParking, makePayment } from "../api/parking.api";
import toast from "react-hot-toast";
import Button from "../components/Buttons.jsx";

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
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>

        <div className="bg-gray-100 p-4 rounded mb-4 text-left">
          <p>
            <strong>Car:</strong> {carNumber}
          </p>
          <p>
            <strong>Amount:</strong> ₹{amount}
          </p>
        </div>

        <Button
          text={loading ? "Processing..." : "Pay & Exit"}
          onClick={handlePayment}
          color="green"
        />
      </div>
    </MainLayout>
  );
}
