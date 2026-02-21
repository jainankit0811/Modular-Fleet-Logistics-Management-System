import express from "express";
import {
    createDriver,
    deleteDriver,
    getDrivers,
    updateDriver,
} from "../controllers/driver.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("Manager", "Dispatcher"), getDrivers);
router.post("/", authorize("Manager"), createDriver);
router.put("/:id", authorize("Manager"), updateDriver);
router.delete("/:id", authorize("Manager"), deleteDriver);

export default router;
