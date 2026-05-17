import Slot from "../../models/slot.model.js";
import ParkingSession from "../../modules/parking/parking.model.js";

export const getDashboardStatsService = async () => {
  const totalSlots = await Slot.countDocuments();
  const occupied = await Slot.countDocuments({ isOccupied: true });

  const activeSessions = await ParkingSession.countDocuments({
    status: "ACTIVE",
  });

  const completedSessions = await ParkingSession.countDocuments({
    status: "COMPLETED",
  });

  const occupiedSlots = await Slot.countDocuments({
    isOccupied: true,
  });

  const availableSlots = await Slot.countDocuments({
    isOccupied: false,
  });

  const revenueResult = await ParkingSession.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalRevenue = revenueResult[0]?.total || 0;

  return {
    totalSlots,
    activeSessions,
    completedSessions,
    occupied,
    available: totalSlots - occupied,
    totalRevenue,
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

export const getAnalyticsService = async () => {
  const totalSlots = await Slot.countDocuments();

  const occupiedSlots = await Slot.countDocuments({
    isOccupied: true,
  });

  const availableSlots = totalSlots - occupiedSlots;

  const activeVehicles = await ParkingSession.countDocuments({
    status: "ACTIVE",
  });

  const completedSessions = await ParkingSession.countDocuments({
    status: "COMPLETED",
  });

  const occupancyRate =
    totalSlots === 0 ? 0 : Math.round((occupiedSlots / totalSlots) * 100);

  const revenueResult = await ParkingSession.aggregate([
    {
      $match: {
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
  ]);

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  const revenueByDay = await ParkingSession.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
      },
    },
    {
      $group: {
        _id: {
          day: {
            $dayOfMonth: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        revenue: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);

  const peakHours = await ParkingSession.aggregate([
    {
      $group: {
        _id: {
          hour: {
            $hour: "$entryTime",
          },
        },
        totalVehicles: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalVehicles: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  const paymentStatus = await ParkingSession.aggregate([
    {
      $group: {
        _id: "$paymentStatus",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  return {
    cards: {
      totalRevenue,
      totalSlots,
      occupiedSlots,
      availableSlots,
      activeVehicles,
      completedSessions,
      occupancyRate,
    },

    revenueChart: revenueByDay.map((r) => ({
      label: `${r._id.day}/${r._id.month}`,
      revenue: r.revenue,
    })),

    peakHours: peakHours.map((p) => ({
      hour: `${p._id.hour}:00`,
      vehicles: p.totalVehicles,
    })),

    paymentStatus,
  };
};
