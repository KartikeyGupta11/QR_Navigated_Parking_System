import express from "express";
import {
  checkAvailability,
  getAvailableSlotCount,
  createEntry,
  findSession,
  exitParking,
  makePayment,
  getEntryQR,
  getExitQR,
  getAllParkingAreas,
} from "./parking.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  entryValidation,
  sessionValidation,
  paymentValidation,
  exitValidation,
} from "./parking.validation.js";

const router = express.Router();

router.get("/check-availability", checkAvailability);
router.get("/get-available-slotCount", getAvailableSlotCount);
router.post("/entry", validate(entryValidation), createEntry);
router.post("/find-active-session", validate(sessionValidation), findSession);
router.post("/exit", validate(exitValidation), exitParking);
router.post("/make-payment", validate(paymentValidation), makePayment);
router.get("/qr/entry", getEntryQR);
router.get("/qr/exit", getExitQR);
router.get("/parking-areas", getAllParkingAreas);

export default router;
