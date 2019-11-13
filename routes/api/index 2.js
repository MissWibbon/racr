const router = require("express").Router();
const userRoutes = require("./user");
const raceRoutes = require("./race");

// User routes
router.use("/users", userRoutes);

// Race routes
router.use("/races", raceRoutes);

module.exports = router;