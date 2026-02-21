const asyncHandler = require("../utils/asyncHandler");

// Middleware to check user role
exports.authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  });
};
