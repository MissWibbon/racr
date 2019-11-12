const router = require("express").Router();
const raceController = require("../../controllers/raceController");

// Matches with "/api/races"
router.route("/")
    .get(raceController.findAll)
    .post(raceController.create);

// Matches with "/api/users/:id"
router
    .route("/:id")
    .get(raceController.findById)
    .put(raceController.update)
    .delete(raceController.remove);

module.exports = router;