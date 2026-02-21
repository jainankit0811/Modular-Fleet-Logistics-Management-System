const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/prisma");

// Get all vehicles
exports.getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.status(200).json(vehicles);
});

// Create a new vehicle
exports.createVehicle = asyncHandler(async (req, res) => {
  const { licensePlate, model, maxCapacity, status } = req.body;

  const vehicle = await prisma.vehicle.create({
    data: { licensePlate, model, maxCapacity, status },
  });

  res.status(201).json({ message: "Vehicle created successfully", vehicle });
});

// Update vehicle
exports.updateVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { licensePlate, model, maxCapacity, status } = req.body;

  const vehicle = await prisma.vehicle.update({
    where: { id: parseInt(id) },
    data: { licensePlate, model, maxCapacity, status },
  });

  res.status(200).json({ message: "Vehicle updated successfully", vehicle });
});

// Delete vehicle
exports.deleteVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.vehicle.delete({ where: { id: parseInt(id) } });

  res.status(200).json({ message: "Vehicle deleted successfully" });
});
