import {
  getAllSessionService,
  getAllSlotsService,
  getDashboardStatsService,
} from "./admin.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await getDashboardStatsService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllSessions = async (req, res, next) => {
  try {
    const data = await getAllSessionService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllSlots = async (req, res, next) => {
  try {
    const data = await getAllSlotsService();
    res.json(data);
  } catch (error) {
    next(erro);
  }
};
