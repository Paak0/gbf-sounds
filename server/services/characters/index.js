const characters = require('./characters.json');
const charas = require('./charas.json');

function getCharacters(req, res){
	let {type} = req.params;
	let obj = {};
	let keys = Object.keys(characters[type]);
	
	keys.forEach( key => {
		obj[key] = characters[type][key].map( chara => {
			return chara.name;
		});
	});
	
    res.json(obj);
}

function getCharacter(req, res){
	let { type, group, name } = req.params;

	let character = characters[type][group].find( elem => {
		let lower = elem.name.toLowerCase();
		return lower === name.toLowerCase();
	});

	res.json(character);
}

function getCharacterByID(req, res) {
	let { id } = req.params;
	let rarity = "ssr";

	switch (id[2]) {
		case '4':
			rarity = "ssr";
			break;
		case '3':
			rarity = "sr";
			break;
		case '2':
			rarity = "r";
			break;
		default:
	}

	let character = charas[rarity].find(elem => {
		return elem.id == id;
	});

	res.json(character);
}

function getCharactersJSON(type) {
	return charas[type];
}

module.exports = {
	getCharacters: getCharacters,
	getCharacter: getCharacter,
	getCharacterByID: getCharacterByID,
	getCharactersJSON: getCharactersJSON
};