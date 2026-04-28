import Slot from "../../models/slot.model.js";
import ParkingSession from "./parking.model.js";
import { generateSessionId } from "../../utils/generateSessionId.js";
import { calculateAmount } from "../../utils/calculateAmount.js";

export const checkAvailabilityService = async () => {
  const slot = await Slot.findOne({ isOccupied: false }).lean();
  return !!slot;
};

export const getAvailableSlotCountService = async () => {
  const count = await Slot.countDocuments({ isOccupied: false });
  return count;
};

export const createEntryService = async ({ carNumber, phone }) => {
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
      new: true,
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

  return { session, slot };
};

export const findSessionService = async ({ carNumber, phone, email }) => {
  const session = await ParkingSession.findOne({
    carNumber,
    phone,
    email,
    status: "ACTIVE",
  }).populate("slotId");

  if (!session) {
    throw new Error("No Active Parking Found");
  }

  const { duration, amount } = calculateAmount(session.entryTime);
  return { session, duration, amount };
};

export const exitService = async ({ sessionId }) => {
  const session = await ParkingSession.findOne({ sessionId });

  if (!session || session.status !== "ACTIVE") {
    throw new Error("Invalid Session");
  }

  session.exitTime = new Date();
  session.status = "COMPLETED";
  session.paymentStatus = "PAID";

  await session.save();

  await Slot.findByIdAndUpdate(session.slotId, {
    isOccupied: false,
  });

  return session;
};
