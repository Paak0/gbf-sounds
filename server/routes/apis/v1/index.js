const express = require('express');
const charactersController = require('../../../controllers/apis/characters');

let router = express.Router();

router.use('/characters', charactersController);

module.exports = router;