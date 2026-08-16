import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Slot from "../models/slot.model.js";
import ParkingArea from "../models/parkingArea.model.js";

dotenv.config();

const migrateSlots = async () => {
  try {
    await connectDB();

    const parkingAreas = await ParkingArea.find({
      status: "ACTIVE",
    });

    for (const area of parkingAreas) {
      console.log(`Processing ${area.parkingName} (${area.parkingCode})...`);

      for (let i = 1; i <= area.totalSlots; i++) {
        const slotNumber = `${area.parkingCode}-${String(i).padStart(2, "0")}`;

        const slot = await Slot.findOne({
          slotNumber,
        });

        if (slot) {
          slot.parkingAreaId = area._id;

          await slot.save();

          console.log(`Updated ${slotNumber} → ${area._id}`);
        } else {
          await Slot.create({
            slotNumber,
            parkingAreaId: area._id,
            status: "AVAILABLE",
          });

          console.log(`Created ${slotNumber} → ${area._id}`);
        }
      }
    }

    console.log("Slot migration completed successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrateSlots();
