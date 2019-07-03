const config = require('../../configs');
const request = require('request');

//delete later
const characters = require('../services/characters/characters.json');


function index(req, res, type, name){
	let data = characters[type];
	//----
	res.render('characters', { data: data });
}

function index2(req, res, type, name){
	console.log(name);
	res.render('characters', { name: name });
}

async function index3(req, res, type, name){
	let data = await request(config.hostname+'/api/v1/characters/'+type).catch( err => { return; });
	res.render('characters', { data: data });
}

module.exports = {
	index: index
};
