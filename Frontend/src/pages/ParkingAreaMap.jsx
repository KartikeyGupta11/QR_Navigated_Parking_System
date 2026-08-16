import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";

import { getAllParkingAreas } from "../api/parking.api";
import ParkingAreaCard from "../components/parkingArea/parkingAreaCard";
import Skeleton from "../components/Skeleton";

export default function ParkingAreaMap() {
  const [parkingAreas, setParkingAreas] = useState(null);

  const fetchParkingAreas = async () => {
    try {
      const data = await getAllParkingAreas();

      setParkingAreas(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load parking areas",
      );
    }
  };

  useEffect(() => {
    fetchParkingAreas();
  }, []);

  const handleSelectParking = (parkingArea) => {
    window.location.href = `/entry?parkingCode=${encodeURIComponent(
      parkingArea.parkingCode,
    )}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="text-center">
          <div
            className="
              inline-flex items-center justify-center
              p-3 mb-4
              rounded-2xl
              bg-blue-500/10
              text-blue-500
            "
          >
            <MapPin size={28} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Find Your Parking
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Select a parking location to find an available slot and start your
            parking session.
          </p>
        </div>
      </div>

      {/* Parking Areas */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {!parkingAreas ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-80 w-full rounded-3xl" />
            ))}
          </div>
        ) : parkingAreas.length === 0 ? (
          <div className="text-center py-20">
            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />

            <h2 className="text-xl font-semibold">No Parking Areas Found</h2>

            <p className="mt-2 text-gray-500">
              There are currently no parking locations available.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
            "
          >
            {parkingAreas.map((parkingArea) => (
              <ParkingAreaCard
                key={parkingArea._id}
                parkingArea={parkingArea}
                onSelect={handleSelectParking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
