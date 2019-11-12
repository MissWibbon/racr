const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router.route("/")
    .get(userController.findAll)
    .post(userController.create);

// Matches with "/api/users/:id"
router
    .route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

<<<<<<< HEAD
=======
router.post('/login',userController.login)
>>>>>>> 7c43ded95dc23f833c5ee41f50e8298146be180a
module.exports = router;