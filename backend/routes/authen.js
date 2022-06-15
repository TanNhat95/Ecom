const authenController = require("../controllers/authenController.js");
const userController = require("../controllers/userController.js");
const middlewareController = require("../controllers/middlewareController.js");

const router = require('express').Router();

router.post("/register",authenController.registerUser)
router.post("/user95",authenController.loginUser)
router.post("/refresh",authenController.refreshToken)
router.post("/logout",middlewareController.verifyToken,authenController.userLogout)
router.delete('/:id',middlewareController.verifyTokeAndAdmin,userController.deleteUser)
module.exports = router;    