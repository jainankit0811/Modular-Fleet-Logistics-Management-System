import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new trip
export const createTrip = asyncHandler(async (req, res) => {
  const { cargoWeight, vehicleId, driverId } = req.body;

  const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle || vehicle.status !== "AVAILABLE") {
    return res
      .status(400)
      .json({ message: "Vehicle not available for dispatch" });
  }

  const driver = await prisma.driver.findUnique({ where: { id: driverId } });
  if (!driver || driver.status !== "ON_DUTY") {
    return res
      .status(400)
      .json({ message: "Driver not available for dispatch" });
  }

  // Compliance: License Expiry Check
  if (new Date(driver.licenseExpiry) < new Date()) {
    return res.status(400).json({ message: "Driver license has expired" });
  }

  // Weight capacity check
  if (cargoWeight > vehicle.maxCapacity) {
    return res
      .status(400)
      .json({ message: "Cargo weight exceeds vehicle capacity" });
  }

  // Transaction to create trip and update statuses
  const trip = await prisma.$transaction(async (tx) => {
    const t = await tx.trip.create({
      data: { cargoWeight, vehicleId, driverId, status: "DISPATCHED" },
    });

    await tx.vehicle.update({
      where: { id: vehicleId },
      data: { status: "ON_TRIP" },
    });

    // Driver stays ON_DUTY but implicitly occupied by trip
    return t;
  });

  res.status(201).json({ message: "Trip dispatched successfully", trip });
});

// Update trip status (and handle completion logic)
export const updateTripStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // DRAFT, DISPATCHED, COMPLETED, CANCELLED

  const currentTrip = await prisma.trip.findUnique({ where: { id: parseInt(id) } });
  if (!currentTrip) return res.status(404).json({ message: "Trip not found" });

  const updatedTrip = await prisma.$transaction(async (tx) => {
    const t = await tx.trip.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    // If trip is COMPLETED or CANCELLED, release the vehicle
    if (status === "COMPLETED" || status === "CANCELLED") {
      await tx.vehicle.update({
        where: { id: currentTrip.vehicleId },
        data: { status: "AVAILABLE" },
      });
    }

    return t;
  });

  res.status(200).json({ message: `Trip status updated to ${status}`, trip: updatedTrip });
});
