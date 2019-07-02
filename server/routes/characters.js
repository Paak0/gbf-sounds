const express = require('express');
const charactersController = require('../controllers/characters');
const router = express.Router();

router.get('/', charactersController.index);

router.get('/:name', function(req, res, next){
	let name = req.params.name;
	console.log(name);
	next();
}, charactersController.index);

module.exports = router;