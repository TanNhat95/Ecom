const colorController = require('../controllers/colorController');
const router = require('express').Router();

router.get('/', colorController.getColors);

module.exports = router;