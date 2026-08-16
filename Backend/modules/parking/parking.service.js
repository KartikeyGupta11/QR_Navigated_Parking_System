import Slot from "../../models/slot.model.js";
import ParkingSession from "./parking.model.js";
import { generateSessionId } from "../../utils/generateSessionId.js";
import { calculateAmount } from "../../utils/calculateAmount.js";
import { generateQR } from "../../utils/generateQR.js";
import { sendEmail } from "../../utils/sendEmail.js";
import {
  generateReceiptHTML,
  generateEntryHTML,
} from "../../utils/emailTemplate.js";
import ParkingArea from "../../models/parkingArea.model.js";

const BASE_URL = process.env.FRONTEND_URL || "http://localhost:5000";

export const checkAvailabilityService = async () => {
  const slot = await Slot.findOne({
    status: "AVAILABLE",
  }).lean();

  return !!slot;
};

export const getAvailableSlotCountService = async () => {
  const count = await Slot.countDocuments({
    status: "AVAILABLE",
  });

  return count;
};

export const createEntryService = async ({
  carNumber,
  phone,
  email,
  parkingCode,
}) => {
  const existing = await ParkingSession.findOne({
    carNumber,
    status: "ACTIVE",
  });

  if (existing) {
    throw new Error("Car already inside");
  }

  console.log("Parking Code:", parkingCode);
  const parkingArea = await ParkingArea.findOne({
    parkingCode,
    status: "ACTIVE",
  });

  if (!parkingArea) {
    throw new Error("Invalid parking location");
  }

  const slot = await Slot.findOneAndUpdate(
    {
      parkingAreaId: parkingArea._id,
      status: "AVAILABLE",
    },
    {
      status: "OCCUPIED",
    },
    {
      returnDocument: "after",
    },
  );

  if (!slot) {
    throw new Error("No Slots Available");
  }

  const session = await ParkingSession.create({
    sessionId: generateSessionId(),
    carNumber,
    phone,
    email,
    parkingAreaId: parkingArea._id,
    slotId: slot._id,
  });

  if (email) {
    const html = generateEntryHTML({
      carNumber,
      slot: slot.slotNumber,
    });

    await sendEmail({
      to: email,
      subject: "Parking Slot Confirmed...",
      text: `Welcome! Your parking slot is ${slot.slotNumber}`,
      html,
    });
  }

  return { session, slot };
};

export const findActiveSessionService = async ({
  carNumber,
  phone,
  parkingCode,
}) => {
  // 1. Find parking area
  const parkingArea = await ParkingArea.findOne({
    parkingCode,
    status: "ACTIVE",
  });

  if (!parkingArea) {
    throw new Error("Parking area not found");
  }

  // 2. Find active session in this parking area
  const session = await ParkingSession.findOne({
    carNumber,
    phone,
    parkingAreaId: parkingArea._id,
    status: "ACTIVE",
  }).populate("slotId");

  if (!session) {
    throw new Error("No Active Parking Found");
  }

  const { duration, amount } = calculateAmount(session.entryTime);

  return {
    session,
    duration,
    amount,
  };
};

export const exitService = async ({ sessionId, parkingCode }) => {
  // 1. Find parking area
  const parkingArea = await ParkingArea.findOne({
    parkingCode,
    status: "ACTIVE",
  });

  if (!parkingArea) {
    throw new Error("Parking area not found");
  }

  // 2. Find active session
  const session = await ParkingSession.findOne({
    sessionId,
    status: "ACTIVE",
  }).populate("slotId");

  if (!session) {
    throw new Error("Invalid Session");
  }

  // 3. Verify session belongs to this parking area
  if (session.parkingAreaId.toString() !== parkingArea._id.toString()) {
    throw new Error("Session does not belong to this parking area");
  }

  // 4. Payment validation
  if (session.paymentStatus !== "PAID") {
    throw new Error("Payment required before exit");
  }

  // 5. Complete session
  session.exitTime = new Date();
  session.status = "COMPLETED";

  await session.save();

  // 6. Free slot
  await Slot.findByIdAndUpdate(session.slotId._id, {
    status: "AVAILABLE",
  });

  // 7. Send receipt
  if (session.email) {
    const html = generateReceiptHTML({
      carNumber: session.carNumber,
      slot: session.slotId.slotNumber,
      entryTime: session.entryTime,
      exitTime: session.exitTime,
      amount: session.amount,
    });

    await sendEmail({
      to: session.email,
      subject: "Parking Exit Successful...",
      text: `Thank you for visiting.\n\nCar: ${session.carNumber}\nAmount Paid: ₹${session.amount}`,
      html,
    });
  }

  return session;
};

export const paymentService = async ({ sessionId }) => {
  const session = await ParkingSession.findOne({
    sessionId,
  });

  if (!session || session.status !== "ACTIVE") {
    throw new Error("Invalid Session");
  }

  if (session.paymentStatus === "PAID") {
    throw new Error("Payment Already Done");
  }

  const { amount } = calculateAmount(session.entryTime);

  session.amount = amount;
  session.paymentStatus = "PAID";

  const now = new Date();
  session.paymentTime = now;

  await session.save();

  return session;
};

export const getEntryQRService = async ({ parkingCode }) => {
  const parkingArea = await ParkingArea.findOne({
    parkingCode,
    status: "ACTIVE",
  });

  if (!parkingArea) {
    throw new Error("Parking area not found...");
  }

  const url = `${BASE_URL}/entry?parkingCode=${parkingArea.parkingCode}`;

  return await generateQR(url);
};

export const getExitQRService = async ({ parkingCode }) => {
  const parkingArea = await ParkingArea.findOne({
    parkingCode,
    status: "ACTIVE",
  });

  if (!parkingArea) {
    throw new Error("Parking area not found");
  }

  const url = `${BASE_URL}/exit?parkingCode=${parkingArea.parkingCode}`;

  return await generateQR(url);
};

export const getAllParkingAreasService = async () => {
  const parkingAreas = await ParkingArea.find({
    status: "ACTIVE",
  })
    .sort({ createdAt: -1 })
    .lean();

  const result = await Promise.all(
    parkingAreas.map(async (area) => {
      const [
        totalSlots,
        availableSlots,
        occupiedSlots,
        reservedSlots,
        maintenanceSlots,
        revenueResult,
      ] = await Promise.all([
        Slot.countDocuments({
          parkingAreaId: area._id,
        }),

        Slot.countDocuments({
          parkingAreaId: area._id,
          status: "AVAILABLE",
        }),

        Slot.countDocuments({
          parkingAreaId: area._id,
          status: "OCCUPIED",
        }),

        Slot.countDocuments({
          parkingAreaId: area._id,
          status: "RESERVED",
        }),

        Slot.countDocuments({
          parkingAreaId: area._id,
          status: "MAINTENANCE",
        }),

        ParkingSession.aggregate([
          {
            $match: {
              parkingAreaId: area._id,
              paymentStatus: "PAID",
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$amount",
              },
            },
          },
        ]),
      ]);

      const totalRevenue = revenueResult[0]?.totalRevenue || 0;

      const occupancyRate =
        totalSlots === 0 ? 0 : Math.round((occupiedSlots / totalSlots) * 100);

      return {
        id: area._id,
        parkingName: area.parkingName,
        parkingCode: area.parkingCode,
        address: area.address,
        status: area.status,
        operatingHours: area.operatingHours,

        totalSlots,
        availableSlots,
        occupiedSlots,
        reservedSlots,
        maintenanceSlots,

        occupancyRate,
        totalRevenue,

        createdAt: area.createdAt,
        updatedAt: area.updatedAt,
      };
    }),
  );

  return result;
};
