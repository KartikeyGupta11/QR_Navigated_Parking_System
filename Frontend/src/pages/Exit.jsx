import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Buttons";
import { exitParking, findSession, makePayment } from "../api/parking.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[360px]">
        <h2 className="text-xl font-bold text-center mb-1">Parking Exit</h2>
        <p className="text-sm text-gray-500 text-center mb-5">
          Complete payment to exit
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

        {amount === null ? (
          <div className="mt-4">
            <Button
              text={loading ? "Checking..." : "Check Details"}
              onClick={handleFind}
              disabled={loading}
            />
          </div>
        ) : (
          <>
            <div className="mt-5 p-4 bg-yellow-100 text-center rounded-lg">
              <p className="text-sm text-gray-600">Amount Payable</p>
              <p className="text-lg font-bold">₹{amount}</p>
            </div>

            <div className="mt-4">
              <Button
                text="Proceed to Payment"
                onClick={handleProceed}
                color="green"
              />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
