import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import ParkingArea from "../models/parkingArea.model.js";
import Slot from "../models/slot.model.js";
import ParkingSession from "../modules/parking/parking.model.js";

dotenv.config();

const migrateParkingData = async () => {
  try {
    await connectDB();

    console.log("Starting parking data migration...");

    // --------------------------------------------------
    // 1. Create / find the existing Parking Area
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
    // 2. Get existing slots
    // --------------------------------------------------

    const slots = await Slot.find();

    console.log(`Found ${slots.length} existing slots.`);

    // --------------------------------------------------
    // 3. Attach existing slots to Parking Area A
    //    and make them AVAILABLE initially
    // --------------------------------------------------

    for (const slot of slots) {
      await Slot.findByIdAndUpdate(slot._id, {
        parkingAreaId: parkingArea._id,
        status: "AVAILABLE",
      });

      console.log(`Updated slot ${slot.slotNumber} → AVAILABLE`);
    }

    // --------------------------------------------------
    // 4. Find all ACTIVE parking sessions
    // --------------------------------------------------

    const activeSessions = await ParkingSession.find({
      status: "ACTIVE",
    }).select("slotId sessionId carNumber");

    console.log(`Found ${activeSessions.length} active parking sessions.`);

    // --------------------------------------------------
    // 5. Mark their slots as OCCUPIED
    // --------------------------------------------------

    for (const session of activeSessions) {
      if (!session.slotId) {
        console.warn(`Session ${session.sessionId} has no slotId.`);
        continue;
      }

      const slot = await Slot.findByIdAndUpdate(
        session.slotId,
        {
          parkingAreaId: parkingArea._id,
          status: "OCCUPIED",
        },
        {
          new: true,
        },
      );

      if (!slot) {
        console.warn(`Slot not found for session ${session.sessionId}`);
        continue;
      }

      console.log(`Slot ${slot.slotNumber} → OCCUPIED (${session.carNumber})`);
    }

    // --------------------------------------------------
    // 6. Make sure totalSlots is correct
    // --------------------------------------------------

    const totalSlots = await Slot.countDocuments({
      parkingAreaId: parkingArea._id,
    });

    await ParkingArea.findByIdAndUpdate(parkingArea._id, {
      totalSlots,
    });

    console.log(`Parking Area A now has ${totalSlots} slots.`);

    console.log("\nMigration completed successfully.");

    process.exit(0);
  } catch (error) {
    console.error("\nMigration failed:");
    console.error(error);

    process.exit(1);
  }
};

migrateParkingData();
