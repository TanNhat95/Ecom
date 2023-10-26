const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = require('express').Router();

router.post('/auth', userController.authUser)
router.post('/', userController.registerUser)
router.post('/logout', userController.logoutUser)
router.get('/profile', protect, userController.getUserProfile)
router.put('/profile', protect, userController.updateUserProfile)

module.exports = router;