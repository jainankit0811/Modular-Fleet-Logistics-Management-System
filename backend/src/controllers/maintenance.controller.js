import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

// Add maintenance record and set vehicle to IN_SHOP
export const createMaintenance = asyncHandler(async (req, res) => {
    const { description, cost, vehicleId } = req.body;

    const maintenance = await prisma.$transaction(async (tx) => {
        const log = await tx.maintenance.create({
            data: { description, cost: parseFloat(cost), vehicleId: parseInt(vehicleId) },
        });

        await tx.vehicle.update({
            where: { id: parseInt(vehicleId) },
            data: { status: "IN_SHOP" },
        });

        return log;
    });

    res.status(201).json({ message: "Maintenance logged and vehicle moved to shop", maintenance });
});

// Resolve maintenance and set vehicle to AVAILABLE
export const resolveMaintenance = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    await prisma.vehicle.update({
        where: { id: parseInt(vehicleId) },
        data: { status: "AVAILABLE" },
    });

    res.status(200).json({ message: "Vehicle maintenance resolved and ready for dispatch" });
});

export const getMaintenanceLogs = asyncHandler(async (req, res) => {
    const logs = await prisma.maintenance.findMany({
        include: { vehicle: true },
        orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(logs);
});
