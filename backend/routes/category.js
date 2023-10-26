const categoryController = require('../controllers/categoryController.js');
const router = require('express').Router();

router.get('/',categoryController.getCategories);

module.exports = router;