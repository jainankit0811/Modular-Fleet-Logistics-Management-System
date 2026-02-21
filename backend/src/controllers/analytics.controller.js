const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/prisma");

// Get active fleet count
exports.getActiveFleetCount = asyncHandler(async (req, res) => {
  const count = await prisma.vehicle.count({
    where: { status: "AVAILABLE" },
  });
  res.status(200).json({ activeFleetCount: count });
});

// Get maintenance alerts
exports.getMaintenanceAlerts = asyncHandler(async (req, res) => {
  const vehiclesInShop = await prisma.vehicle.findMany({
    where: { status: "IN_SHOP" },
  });
  res.status(200).json({ maintenanceAlerts: vehiclesInShop });
});

// Get utilization rate
exports.getUtilizationRate = asyncHandler(async (req, res) => {
  const totalVehicles = await prisma.vehicle.count();
  const onTripVehicles = await prisma.vehicle.count({
    where: { status: "ON_TRIP" },
  });
  const utilizationRate = (onTripVehicles / totalVehicles) * 100;
  res.status(200).json({ utilizationRate: `${utilizationRate.toFixed(2)}%` });
});

// Get fuel efficiency
exports.getFuelEfficiency = asyncHandler(async (req, res) => {
  const fuelLogs = await prisma.fuelLog.groupBy({
    by: ["vehicleId"],
    _sum: { liters: true },
    _count: { id: true },
  });

  const efficiency = fuelLogs.map((log) => ({
    vehicleId: log.vehicleId,
    fuelEfficiency: log._count.id / log._sum.liters,
  }));

  res.status(200).json({ fuelEfficiency: efficiency });
});

// Get ROI
exports.getROI = asyncHandler(async (req, res) => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      fuelLogs: true,
      maintenance: true,
    },
  });

  const roi = vehicles.map((vehicle) => {
    const fuelCost = vehicle.fuelLogs.reduce((sum, log) => sum + log.cost, 0);
    const maintenanceCost = vehicle.maintenance.reduce(
      (sum, log) => sum + log.cost,
      0,
    );
    const totalCost = fuelCost + maintenanceCost;
    return { vehicleId: vehicle.id, roi: 1 / totalCost }; // Placeholder formula
  });

  res.status(200).json({ roi });
});
