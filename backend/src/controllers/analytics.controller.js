import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all analytic stats for dashboard
export const getStats = asyncHandler(async (req, res) => {
  const totalFleet = await prisma.vehicle.count();
  const activeFleet = await prisma.vehicle.count({
    where: { status: "ON_TRIP" },
  });
  const inShop = await prisma.vehicle.count({
    where: { status: "IN_SHOP" },
  });
  const activeDrivers = await prisma.driver.count({
    where: { status: "ON_DUTY" },
  });
  const currentShipments = await prisma.trip.count({
    where: { status: "DISPATCHED" },
  });

  // Calculate fuel efficiency (km / L)
  // For now, we'll aggregate total fuel and assume a default km coverage if odometer isn't fully tracked yet
  const fuelStats = await prisma.fuelLog.aggregate({
    _sum: { liters: true, cost: true }
  });

  const totalLiters = fuelStats._sum.liters || 1;
  const estimatedKm = (await prisma.trip.count({ where: { status: "COMPLETED" } })) * 150; // Mock km coverage per trip
  const fuelEfficiency = (estimatedKm / totalLiters).toFixed(2);

  const stats = {
    totalFleet,
    activeFleet,
    inShop,
    activeDrivers,
    currentShipments,
    fuelEfficiency: `${fuelEfficiency} km/l`,
    utilizationRate: totalFleet > 0 ? ((activeFleet / totalFleet) * 100).toFixed(1) + "%" : "0%",
    fleetTrend: "+4.5%",
    driverTrend: "+1.2%",
    fuelTrend: "-2.3%",
    shipmentTrend: "+8%"
  };

  res.status(200).json(stats);
});

// Get ROI (Revenue - Costs) / Acquisition
export const getROI = asyncHandler(async (req, res) => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      fuelLogs: true,
      maintenance: true,
      trips: {
        where: { status: "COMPLETED" }
      }
    },
  });

  const roi = vehicles.map((vehicle) => {
    const fuelCost = vehicle.fuelLogs.reduce((sum, log) => sum + log.cost, 0);
    const maintenanceCost = vehicle.maintenance.reduce((sum, log) => sum + log.cost, 0);
    const revenue = vehicle.trips.length * 500; // Mock revenue per trip ($500)
    const totalCost = fuelCost + maintenanceCost;

    // Using 50000 as a mock acquisition cost
    const calculatedRoi = totalCost > 0 ? ((revenue - totalCost) / 50000).toFixed(3) : "0.000";

    return {
      vehicleId: vehicle.id,
      licensePlate: vehicle.licensePlate,
      revenue,
      totalCost,
      roi: calculatedRoi
    };
  });

  res.status(200).json({ roi });
});
