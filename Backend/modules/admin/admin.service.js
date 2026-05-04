import Slot from "../../models/slot.model.js";
import ParkingSession from "../../modules/parking/parking.model.js";

export const getDashboardStatsService = async () => {
  const totalSlots = await Slot.countDocuments();
  const occupied = await Slot.countDocuments({ isOccupied: true });

  const activeSessions = await ParkingSession.countDocuments({
    status: "ACTIVE",
  });

  return {
    totalSlots,
    occupied,
    available: totalSlots - occupied,
    activeSessions,
  };
};

export const getAllSessionService = async () => {
  const sessions = await ParkingSession.find()
    .populate("slotId")
    .sort({ createdAt: -1 });

  return sessions.map((s) => ({
    carNumber: s.carNumber,
    slot: s.slotId?.slotNumber || "-",
    entryTime: s.entryTime,
    exitTime: s.exitTime || null,
    phone: s.phone,
    status: s.status,
  }));
};

export const getAllSlotsService = async () => {
  const slots = await Slot.find();

  const result = [];

  for (const slot of slots) {
    let activeSession = null;

    if (slot.isOccupied) {
      activeSession = await ParkingSession.findOne({
        slotId: slot._id,
        status: "ACTIVE",
      });
    }

    result.push({
      id: slot._id,
      slotNumber: slot.slotNumber,
      isOccupied: slot.isOccupied,
      session: activeSession
        ? {
            carNumber: activeSession.carNumber,
            entryTime: activeSession.entryTime,
            status: activeSession.status,
            sessionId: activeSession.sessionId,
          }
        : null,
    });
  }

  return result;
};
