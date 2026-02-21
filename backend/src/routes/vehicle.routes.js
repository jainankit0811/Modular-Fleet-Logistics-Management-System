const express = require("express");
const {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

const router = express.Router();

router.use(protect);

router.get("/", authorize("Manager", "Dispatcher"), getVehicles);
router.post("/", authorize("Manager"), createVehicle);
router.put("/:id", authorize("Manager"), updateVehicle);
router.delete("/:id", authorize("Manager"), deleteVehicle);

module.exports = router;
