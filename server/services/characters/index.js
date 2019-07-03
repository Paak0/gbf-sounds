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
	let character = characters[type][group].find( elem => {
		let lower = elem.name.toLowerCase();
		return lower === name.toLowerCase();
	});
	res.json(character);
}

module.exports = {
	getCharacters: getCharacters,
	getCharacter: getCharacter
};