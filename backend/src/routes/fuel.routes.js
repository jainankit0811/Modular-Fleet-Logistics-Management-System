import express from "express";
import { createFuelLog, getFuelLogs } from "../controllers/fuel.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getFuelLogs);
router.post("/", createFuelLog);

export default router;
