import express from "express";
import { createMaintenance, getMaintenanceLogs, resolveMaintenance } from "../controllers/maintenance.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMaintenanceLogs);
router.post("/", authorize("Manager"), createMaintenance);
router.put("/:vehicleId/resolve", authorize("Manager"), resolveMaintenance);

export default router;
