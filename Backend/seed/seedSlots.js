import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Slot from "../models/slot.model.js";

dotenv.config();

const seedSlots = async () => {
  try {
    await connectDB();
    await Slot.deleteMany();

    const slots = [];
    for (let i = 1; i <= 20; i++) {
      slots.push({
        slotNumber: `A-${i}`,
      });
    }

    await Slot.insertMany(slots);

    console.log("Slot seeding done successfully...");
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedSlots();
