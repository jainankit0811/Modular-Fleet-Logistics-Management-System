import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

// Log fuel expense
export const createFuelLog = asyncHandler(async (req, res) => {
    const { liters, cost, vehicleId } = req.body;

    const fuelLog = await prisma.fuelLog.create({
        data: {
            liters: parseFloat(liters),
            cost: parseFloat(cost),
            vehicleId: parseInt(vehicleId)
        },
    });

    res.status(201).json({ message: "Fuel expense logged successfully", fuelLog });
});

export const getFuelLogs = asyncHandler(async (req, res) => {
    const logs = await prisma.fuelLog.findMany({
        include: { vehicle: true },
        orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(logs);
});
