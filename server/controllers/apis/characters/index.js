const express = require('express');
const characterService = require('../../../services/characters');

let router = express.Router();

router.get('/:type', characterService.getCharacters);
router.get('/:type/:group/:name', characterService.getCharacter);

module.exports = router;