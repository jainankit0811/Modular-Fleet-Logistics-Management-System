import express from "express";
import { getROI, getStats } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/stats", getStats);
router.get("/roi", getROI);

export default router;
