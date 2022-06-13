const authenController = require("../controllers/authenController.js");

const router = require('express').Router();
const middlewareController = require("../controllers/middlewareController.js");

router.post("/register",authenController.registerUser)
router.post("/user95",authenController.loginUser)
router.post("/refresh",authenController.refreshToken)
router.post("/logout",middlewareController.verifyToken,authenController.userLogout)
module.exports = router;    