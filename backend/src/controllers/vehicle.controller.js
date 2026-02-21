import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all vehicles
export const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.status(200).json(vehicles);
});

// Create a new vehicle
export const createVehicle = asyncHandler(async (req, res) => {
  const { licensePlate, model, maxCapacity, status } = req.body;

  const vehicle = await prisma.vehicle.create({
    data: { licensePlate, model, maxCapacity, status },
  });

  res.status(201).json({ message: "Vehicle created successfully", vehicle });
});

// Update vehicle
export const updateVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { licensePlate, model, maxCapacity, status } = req.body;

  const vehicle = await prisma.vehicle.update({
    where: { id: parseInt(id) },
    data: { licensePlate, model, maxCapacity, status },
  });

  res.status(200).json({ message: "Vehicle updated successfully", vehicle });
});

// Delete vehicle
export const deleteVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.vehicle.delete({ where: { id: parseInt(id) } });

  res.status(200).json({ message: "Vehicle deleted successfully" });
});
