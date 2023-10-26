const sizeController = require('../controllers/sizeController');
const router = require('express').Router();

router.get('/', sizeController.getSizes);

module.exports = router;