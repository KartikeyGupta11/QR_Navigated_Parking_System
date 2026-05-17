import express from "express";
import {
  getAllSessions,
  getAllSlots,
  getAnalytics,
  getDashboardStats,
} from "./admin.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/sessions", getAllSessions);
router.get("/slots", getAllSlots);
router.get("/analytics", getAnalytics);
export default router;
