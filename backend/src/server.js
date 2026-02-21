// Server setup
import express from "express";
import cors from "cors";
import pkg from "@prisma/client";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import dotenv from "dotenv";

dotenv.config();

const { PrismaClient } = pkg; // ✅ destructure from default
const prisma = new PrismaClient(); // ✅ create instance

export { prisma }; // optional if routes need it

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
