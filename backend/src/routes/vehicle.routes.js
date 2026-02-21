import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} from "../controllers/vehicle.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("Manager", "Dispatcher"), getVehicles);
router.post("/", authorize("Manager"), createVehicle);
router.put("/:id", authorize("Manager"), updateVehicle);
router.delete("/:id", authorize("Manager"), deleteVehicle);

export default router;
