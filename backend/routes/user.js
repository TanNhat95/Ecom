const userController = require('../controllers/middlewareController.js');
const router = require('express').Router();
const middlewareController = require('../controllers/middlewareController.js');


// router.get('/getall',middlewareController.verifyToken,userController.getAllUser);
// router.delete('/:id',middlewareController.verifyTokeAndAdmin,userController.deleteUser)

module.exports = router;