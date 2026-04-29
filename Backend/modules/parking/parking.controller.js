import {
  checkAvailabilityService,
  getAvailableSlotCountService,
  createEntryService,
  findActiveSessionService,
  exitService,
  paymentService,
} from "./parking.service.js";

export const checkAvailability = async (req, res) => {
  const available = await checkAvailabilityService();
  res.json({ available });
};

export const getAvailableSlotCount = async (req, res) => {
  const availableslotCount = await getAvailableSlotCountService();
  res.json({ availableslotCount });
};

export const createEntry = async (req, res) => {
  const { session, slot } = await createEntryService(req.body);
  res.json({
    message: "Entry Successfull",
    sessionId: session.sessionId,
    slot: slot.slotNumber,
  });
};

export const findSession = async (req, res) => {
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
};

export const exitParking = async (req, res) => {
  await exitService(req.body);
  res.json({ message: "Exit Successfull" });
};

export const makePayment = async (req, res) => {
  const session = await paymentService(req.body);

  res.json({
    message: "Payment Successfull...",
    amount: session.amount,
    sessionId: session.sessionId,
  });
};
