// Server setup
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import authRoutes from "./routes/auth.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import fuelRoutes from "./routes/fuel.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", (req, res) => res.json({ status: "ok", message: "Backend is reachable" }));
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel", fuelRoutes);

// Global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
