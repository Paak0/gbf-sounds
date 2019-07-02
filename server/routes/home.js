const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();

router.get('/', homeController.index);

// router.get('/', function (req, res) {
	// res.render('index');
// });

module.exports = router;