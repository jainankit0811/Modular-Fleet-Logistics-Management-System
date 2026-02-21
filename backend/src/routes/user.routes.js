// User routes
import express from "express";
import { createUser, getCurrentUser, getUsers } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.get("/users", getUsers);
router.post("/users", createUser);

export default router;
