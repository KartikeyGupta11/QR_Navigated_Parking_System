import {
  checkAvailabilityService,
  getAvailableSlotCountService,
  createEntryService,
  findSessionService,
  exitService,
} from "./parking.service.js";

export const checkAvailability = async (req, res) => {
  const available = await checkAvailabilityService();
  res.json({ available });
};

export const getAvailableSlotCount = async (req, res) => {
  const slotCount = await getAvailableSlotCountService();
  res.json({ slotCount });
};

export const createEntry = async (req, res) => {
  const { session, slot } = await createEntryService();
  res.json({
    message: "Entry Successfull",
    sessionId: session.sessionId,
    slot: slot.slotNumber,
  });
};

export const findSession = async (req, res) => {
  const { session, duration, amount } = await findSessionService(req.body);
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
