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

const BASE_URL = process.env.FRONTEND_URL || "http://localhost:5000";

export const checkAvailabilityService = async () => {
  const slot = await Slot.findOne({ isOccupied: false }).lean();
  return !!slot;
};

export const getAvailableSlotCountService = async () => {
  const count = await Slot.countDocuments({ isOccupied: false });
  return count;
};

export const createEntryService = async ({ carNumber, phone, email }) => {
  const existing = await ParkingSession.findOne({
    carNumber,
    status: "ACTIVE",
  });

  if (existing) {
    throw new Error("Car already inside");
  }

  const slot = await Slot.findOneAndUpdate(
    {
      isOccupied: false,
    },
    {
      isOccupied: true,
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

export const findActiveSessionService = async ({ carNumber, phone }) => {
  const session = await ParkingSession.findOne({
    carNumber,
    phone,
    status: "ACTIVE",
  }).populate("slotId");

  if (!session) {
    throw new Error("No Active Parking Found");
  }

  const { duration, amount } = calculateAmount(session.entryTime);
  return { session, duration, amount };
};

export const exitService = async ({ sessionId }) => {
  const session = await ParkingSession.findOne({ sessionId }).populate(
    "slotId",
  );

  if (!session || session.status !== "ACTIVE") {
    throw new Error("Invalid Session");
  }

  if (session.paymentStatus !== "PAID") {
    throw new Error("Payment required before exit");
  }

  session.exitTime = new Date();
  session.status = "COMPLETED";

  await session.save();

  await Slot.findByIdAndUpdate(session.slotId, {
    isOccupied: false,
  });

  console.log(session.slotId.slotNumber);
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
      subject: "Parking Exit Successfull...",
      text: `Thankyou for visiting.\n\nCar: ${session.carNumber}\nAmount Paid: ₹${session.amount}`,
      html,
    });
  }

  return session;
};

export const paymentService = async ({ sessionId }) => {
  const session = await ParkingSession.findOne({ sessionId });

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

export const getEntryQRService = async () => {
  const url = `${BASE_URL}/entry`;
  return await generateQR(url);
};

export const getExitQRService = async () => {
  const url = `${BASE_URL}/exit`;
  return await generateQR(url);
};
