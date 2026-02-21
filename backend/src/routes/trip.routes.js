import express from "express";
import {
  createTrip,
  getTrips,
  updateTripStatus,
} from "../controllers/trip.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getTrips);
router.post("/", authorize("Manager", "Dispatcher"), createTrip);
router.put("/:id/status", authorize("Manager", "Dispatcher"), updateTripStatus);

export default router;
