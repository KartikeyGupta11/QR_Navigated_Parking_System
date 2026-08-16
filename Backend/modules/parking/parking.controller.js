import {
  checkAvailabilityService,
  getAvailableSlotCountService,
  createEntryService,
  findActiveSessionService,
  exitService,
  paymentService,
  getEntryQRService,
  getExitQRService,
  getAllParkingAreasService,
} from "./parking.service.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const checkAvailability = async (req, res) => {
  const available = await checkAvailabilityService();
  res.json({ available });
};

export const getAvailableSlotCount = async (req, res) => {
  const availableslotCount = await getAvailableSlotCountService();
  res.json({ availableslotCount });
};

export const createEntry = asyncHandler(async (req, res) => {
  const { session, slot } = await createEntryService(req.body);
  res.json({
    message: "Entry Successfull",
    sessionId: session.sessionId,
    slotNumber: slot.slotNumber,
  });
});

export const findSession = asyncHandler(async (req, res) => {
  const { session, duration, amount } = await findActiveSessionService(
    req.body,
  );
  res.json({
    sessionId: session.sessionId,
    slot: session.slotId.slotNumber,
    entryTime: session.entryTime,
    duration,
    amount,
  });
});

export const exitParking = asyncHandler(async (req, res) => {
  await exitService(req.body);
  res.json({ message: "Exit Successfull" });
});

export const makePayment = asyncHandler(async (req, res) => {
  const session = await paymentService(req.body);

  res.json({
    message: "Payment Successfull...",
    amount: session.amount,
    sessionId: session.sessionId,
  });
});

export const getEntryQR = async (req, res) => {
  const qr = await getEntryQRService();
  res.json({ qr });
};

export const getExitQR = async (req, res) => {
  const qr = await getExitQRService();
  res.json({ qr });
};

export const getAllParkingAreas = async (req, res) => {
  try {
    const parkingAreas = await getAllParkingAreasService();

    res.status(200).json(parkingAreas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
