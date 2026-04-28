import express from "express";
import {
  checkAvailability,
  getAvailableSlotCount,
  createEntry,
  findSession,
  exitParking,
} from "./parking.controller.js";

const router = express.Router();

router.get("/check-availability", checkAvailability);
router.get("/get-slotCount", getAvailableSlotCount);
router.post("/entry", createEntry);
router.post("/find-session", findSession);
router.post("/exit", exitParking);
