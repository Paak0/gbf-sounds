const characters = require('./characters.json');

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
	let {type, group, name} = req.params;
	let arr = characters[type][group];
	let character = arr.find( elem => {
		return elem.name === name;
	});
	res.json(character);
}

module.exports = {
	getCharacters: getCharacters,
	getCharacter: getCharacter
};