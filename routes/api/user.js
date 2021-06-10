const router = require("express").Router();
const userController = require("../../controllers/userController");
const uploadController = require("../../controllers/upload");


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

router
    .route('/friends/:id')
    .put(userController.addFriend)
    .get(userController.findFriends)

    
router.post("/upload", uploadController.uploadFile);

router.post('/login',userController.login)
module.exports = router;