const express = require("express");
const {
  createTrip,
  updateTripStatus,
} = require("../controllers/trip.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

const router = express.Router();

router.use(protect);

router.post("/", authorize("Dispatcher"), createTrip);
router.put("/:id/status", authorize("Dispatcher"), updateTripStatus);

module.exports = router;
