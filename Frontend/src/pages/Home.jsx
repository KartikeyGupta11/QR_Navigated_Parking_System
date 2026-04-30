import { useEffect, useState } from "react";
import { getEntryQR, getExitQR } from "../api/parking.api";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

export default function Home() {
  const [entryQR, setEntryQR] = useState("");
  const [exitQR, setExitQR] = useState("");

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const entry = await getEntryQR();
        const exit = await getExitQR();

        setEntryQR(entry.qr);
        setExitQR(exit.qr);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchQR();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white p-6 rounded-xl shadow-md w-350px text-center">
        <h1 className="text-2xl font-bold mb-2">Spark Parking System</h1>

        <p className="text-gray-500 mb-6 text-sm">Scan QR to Enter or Exit</p>

        <div className="grid gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="font-semibold mb-2">🚗 Entry</p>
            {entryQR ? (
              <img src={entryQR} alt="Entry QR" className="mx-auto" />
            ) : (
              <p className="text-sm text-gray-400">Loading...</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="font-semibold mb-2">🚪 Exit</p>
            {exitQR ? (
              <img src={exitQR} alt="Exit QR" className="mx-auto" />
            ) : (
              <p className="text-sm text-gray-400">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
