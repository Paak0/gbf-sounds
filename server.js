const characters = require('./data/characters.json');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/site'));
app.use(express.json());

app.get('/', (req, res) => res.render('index'));

app.post('/load', (req, res) => {
	let {type} = req.body;
	let obj = {};
	let keys = Object.keys(characters[type]);
	
	keys.forEach( key => {
		obj[key] = characters[type][key].map( chara => {
			return chara.name;
		});
	});
	
	res.json({ 
		charas: obj,
		fn: `function(rarity){
				for(let key in rarity){
					let group = $('<optgroup label="' + key.toUpperCase() + '"/>');
					for(let i = 0; i< rarity[key].length; i++){
						$('<option value="' + i + '"/>').html(rarity[key][i]).appendTo(group);
					}
					group.appendTo($('#charaSelect'));
				}
			}`
	});
});

app.post('/search', (req, res) => {
	let {type, group, index} = req.body;
	let character = characters[type][group][index];
	res.json(character);
});

app.listen(port, () => {
	console.log('app is up.');
});
