import { useEffect, useState } from "react";
import { getEntryQR, getExitQR } from "../api/parking.api";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { QrCode, Car } from "lucide-react";
import Skeleton from "../components/Skeleton";

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
      <div
        className="flex justify-center items-center min-h-[80vh] 
                    bg-gray-100 dark:bg-gray-900 transition"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white dark:bg-gray-800 
                   text-black dark:text-white
                   p-6 rounded-2xl shadow-lg w-360px text-center transition"
        >
          <div className="mb-6">
            <div className="flex justify-center items-center gap-2 mb-2">
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Car className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </motion.div>

              <h1 className="text-2xl font-bold">Spark Parking System</h1>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Scan QR to Enter or Exit
            </p>
          </div>

          <div className="grid gap-5">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="bg-gray-50 dark:bg-gray-700 
                       p-4 rounded-xl transition"
            >
              <div className="flex justify-center mb-2">
                <QrCode className="text-green-600" />
              </div>

              <p className="font-semibold mb-2">Entry</p>

              {entryQR ? (
                <img src={entryQR} alt="Entry QR" className="mx-auto" />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-40 h-40 rounded-xl" />
                  <Skeleton className="w-28 h-3" />
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Scan to start parking
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="bg-gray-50 dark:bg-gray-700 
                       p-4 rounded-xl transition"
            >
              <div className="flex justify-center mb-2">
                <QrCode className="text-red-500" />
              </div>

              <p className="font-semibold mb-2">Exit</p>

              {exitQR ? (
                <img src={exitQR} alt="Exit QR" className="mx-auto" />
              ) : (
                <div className="flex justify-center">
                  <Skeleton className="w-40 h-40" />
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Scan to complete payment & exit
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
