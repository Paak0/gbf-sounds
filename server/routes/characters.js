const express = require('express');
const charactersController = require('../controllers/characters');
const router = express.Router();

router.get('/', function (req, res) {
	return res.redirect('/characters/ssr');
});

router.get('/:type', function(req, res){
	let {type} = req.params;
	console.log(type);
	charactersController.index(req, res, type);
});

router.get('/:type/:name', function(req, res){
	let {type = 'ssr', name = ''} = req.params;
	charactersController.index(req, res, type, name);
});

/*router.get('/:id', function (req, res) {
	let { id } = req.params;
	charactersController.index(req, res, "", "", id);
});*/

module.exports = router;