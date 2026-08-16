import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import ParkingArea from "../models/parkingArea.model.js";
import Slot from "../models/slot.model.js";

dotenv.config();

const seedSlots = async () => {
  try {
    await connectDB();

    // --------------------------------------------------
    // 1. Create / find Parking Area A
    // --------------------------------------------------

    let parkingArea = await ParkingArea.findOne({
      parkingCode: "A",
    });

    if (!parkingArea) {
      parkingArea = await ParkingArea.create({
        parkingName: "Spark Parking - Area A",
        parkingCode: "A",
        address: "Main Parking Area",
        totalSlots: 20,
        status: "ACTIVE",
        operatingHours: {
          open: "08:00",
          close: "23:00",
        },
      });

      console.log("Parking Area A created.");
    } else {
      console.log("Parking Area A already exists.");
    }

    // --------------------------------------------------
    // 2. Create slots
    // --------------------------------------------------

    for (let i = 1; i <= 20; i++) {
      const slotNumber = `A-${String(i).padStart(2, "0")}`;

      const existingSlot = await Slot.findOne({
        parkingAreaId: parkingArea._id,
        slotNumber,
      });

      if (!existingSlot) {
        await Slot.create({
          slotNumber,
          parkingAreaId: parkingArea._id,
          status: "AVAILABLE",
        });

        console.log(`Created ${slotNumber}`);
      } else {
        console.log(`${slotNumber} already exists.`);
      }
    }

    // --------------------------------------------------
    // 3. Update total slot count
    // --------------------------------------------------

    const totalSlots = await Slot.countDocuments({
      parkingAreaId: parkingArea._id,
    });

    await ParkingArea.findByIdAndUpdate(parkingArea._id, {
      totalSlots,
    });

    console.log(`\nParking Area A has ${totalSlots} slots.`);

    console.log("Slot seeding completed successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Slot seeding failed:", error);

    process.exit(1);
  }
};

seedSlots();
