import {
  getAllSessionService,
  getAllSlotsService,
  getDashboardStatsService,
  getAnalyticsService,
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

export const getAnalytics = async (req, res, next) => {
  try {
    const data = await getAnalyticsService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
