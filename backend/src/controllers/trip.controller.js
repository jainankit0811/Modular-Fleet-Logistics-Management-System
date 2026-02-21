const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/prisma");

// Create a new trip
exports.createTrip = asyncHandler(async (req, res) => {
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

  if (cargoWeight > vehicle.maxCapacity) {
    return res
      .status(400)
      .json({ message: "Cargo weight exceeds vehicle capacity" });
  }

  const trip = await prisma.trip.create({
    data: { cargoWeight, vehicleId, driverId, status: "DRAFT" },
  });

  res.status(201).json({ message: "Trip created successfully", trip });
});

// Update trip status
exports.updateTripStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const trip = await prisma.trip.update({
    where: { id: parseInt(id) },
    data: { status },
  });

  res.status(200).json({ message: "Trip status updated successfully", trip });
});
