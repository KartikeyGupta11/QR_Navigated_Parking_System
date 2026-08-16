import mongoose from "mongoose";
import dotenv from "dotenv";
import ParkingArea from "../models/parkingArea.model.js";

dotenv.config();

const parkingAreas = [
  {
    parkingName: "Parking Area A",
    parkingCode: "A",
    address: "Location A",
    totalSlots: 20,
    status: "ACTIVE",
    operatingHours: {
      open: "06:00",
      close: "23:00",
    },
  },
  {
    parkingName: "Parking Area B",
    parkingCode: "B",
    address: "Location B",
    totalSlots: 20,
    status: "ACTIVE",
    operatingHours: {
      open: "06:00",
      close: "23:00",
    },
  },
  {
    parkingName: "Parking Area C",
    parkingCode: "C",
    address: "Location C",
    totalSlots: 20,
    status: "ACTIVE",
    operatingHours: {
      open: "06:00",
      close: "23:00",
    },
  },
  {
    parkingName: "Parking Area D",
    parkingCode: "D",
    address: "Location D",
    totalSlots: 20,
    status: "ACTIVE",
    operatingHours: {
      open: "06:00",
      close: "23:00",
    },
  },
];

const seedParkingAreas = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Prevent duplicate parking areas
    await ParkingArea.deleteMany({});

    await ParkingArea.insertMany(parkingAreas);

    console.log("Parking areas seeded successfully");

    console.table(
      parkingAreas.map((area) => ({
        name: area.parkingName,
        code: area.parkingCode,
        slots: area.totalSlots,
        status: area.status,
      })),
    );

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
    process.exit(0);
  } catch (error) {
    console.error("Parking area seeding failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedParkingAreas();
