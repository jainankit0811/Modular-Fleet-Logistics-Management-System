import express from "express";
import {
  createTrip,
  updateTripStatus,
} from "../controllers/trip.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("Dispatcher"), createTrip);
router.put("/:id/status", authorize("Dispatcher"), updateTripStatus);

export default router;
