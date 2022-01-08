const config = require('../../configs');
const request = require('request');

//delete later
const characters = require('../services/characters/characters.json');
const charas = require('../services/characters/charas.json');

const characterService = require('../services/characters');

function index(req, res, type, name){
	let data = characters[type];
	let data2 = characterService.getCharactersJSON(type);
	//----
	res.render('characters', { data: data, data2: data2 });
}

function index2(req, res, type, name){
	console.log(name);
	res.render('characters', { name: name });
}

/*async function index3(req, res, type, name){
	let data = await request(config.hostname+'/api/v1/characters/'+type).catch( err => { return; });
	res.render('characters', { data: data });
}*/

module.exports = {
	index: index
};
