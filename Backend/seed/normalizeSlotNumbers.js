import "dotenv/config";

import { connectDB } from "../config/db.js";
import Slot from "../models/slot.model.js";

const normalizeSlotNumbers = async () => {
  try {
    await connectDB();

    const slots = await Slot.find();

    for (const slot of slots) {
      const match = slot.slotNumber.match(/^([A-Za-z]+)-(\d+)$/);

      if (!match) {
        console.warn(`Skipping invalid slot number: ${slot.slotNumber}`);
        continue;
      }

      const prefix = match[1];
      const number = Number(match[2]);

      const normalizedNumber = `${prefix}-${String(number).padStart(2, "0")}`;

      if (slot.slotNumber !== normalizedNumber) {
        await Slot.findByIdAndUpdate(slot._id, {
          slotNumber: normalizedNumber,
        });

        console.log(`${slot.slotNumber} → ${normalizedNumber}`);
      }
    }

    console.log("Slot number normalization completed.");

    process.exit(0);
  } catch (error) {
    console.error("Slot number normalization failed:", error);
    process.exit(1);
  }
};

normalizeSlotNumbers();
