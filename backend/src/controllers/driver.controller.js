import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all drivers
export const getDrivers = asyncHandler(async (req, res) => {
    const drivers = await prisma.driver.findMany();
    res.status(200).json(drivers);
});

// Create a new driver
export const createDriver = asyncHandler(async (req, res) => {
    const { name, licenseNumber, licenseExpiry, safetyScore, status } = req.body;

    const driver = await prisma.driver.create({
        data: {
            name,
            licenseNumber,
            licenseExpiry: new Date(licenseExpiry),
            safetyScore: parseFloat(safetyScore),
            status
        },
    });

    res.status(201).json({ message: "Driver created successfully", driver });
});

// Update driver
export const updateDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, licenseNumber, licenseExpiry, safetyScore, status } = req.body;

    const driver = await prisma.driver.update({
        where: { id: parseInt(id) },
        data: {
            name,
            licenseNumber,
            licenseExpiry: licenseExpiry ? new Date(licenseExpiry) : undefined,
            safetyScore: safetyScore ? parseFloat(safetyScore) : undefined,
            status
        },
    });

    res.status(200).json({ message: "Driver updated successfully", driver });
});

// Delete driver
export const deleteDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.driver.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Driver deleted successfully" });
});
