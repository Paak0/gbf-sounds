class Character{
	constructor(){
		this.id = 0;
		this.sounds = [];
	}
}

let showAll = false;
let chara = new Character();

let soundNames = [
	'them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 'win', 
	'lose', 'turn_start', 'turnend', 'attack', 'kill', 'ready', 'mortal', 
	'damage', 'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution', 
	'formation', 'archive', 'to_player', 'healed', 'helaled', 'hp_down', 
	'power_down', 'player_gauge'
];
let adds = ['', 'a', 'b', '_a', '_b', '_mix'];

function changeChara(){
	$("#optional").val("");
	$("input").each( function(){ $(this).val(0); });
	$(".flex").each( function(){ $(this).hide(); });
	$("button").each(function(){ $(this).css("background-color", ""); });
	$(".link").each( function(){ $(this).attr("onclick", "" ); });
	
	chara = new Character();
	chara.id = data.characters[$("#charaSelect").prop("selectedIndex") - 1].id;
	chara.sounds = data.characters[$("#charaSelect").prop("selectedIndex") - 1].sounds;
	
	chara.sounds.forEach( elem => { $("#"+elem+"Box").css("display", "flex"); });
	let picID = Number.isInteger(chara.id) ? 2 : 3;
	$("head").append("<style>.container::after{ background: url(\"http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/npc/zoom/" + parseInt(chara.id) + "_0" + picID + ".png\") no-repeat 50% 150px fixed; }</style>");
	
}

function prev(id, btnId){
	if(!chara.id || $('#'+id).val() < 2) return;
	$('#'+id).val($('#'+id).val() - 1);
	getSound(id, btnId);
}

function next(id, btnId){
	if(!chara.id) return;
	$('#'+id).val(parseInt($('#'+id).val()) + 1);
	getSound(id, btnId);
}

function getSound(name, btnId){
	let index = $('#'+name).val();
	if(parseInt(index) < 1) return;
	
	if(name == 'v_') index = ('000' + index).slice(-3);
	if(name == 'turnend' || name == 'player_gauge') index = "";
	
	let link = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ chara.id +'_'+ name + index + $("#optional").val() +'.mp3';
	let sound = new Audio(link);
	
	$("#link"+btnId).attr("onclick", "window.open("+"'"+link+"'"+")" );
	
	sound.onloadedmetadata = function(){
		$("#button"+btnId).css("background-color", "#75e052"); //greenish
		this.play();
	};
	sound.onerror = function(){
		if((chara.id == '3040001000_03' || chara.id == '3040012000_03' || chara.id == 3040101000 || chara.id == 3040178000 || parseInt(chara.id) >= 3040180000) && $('#'+name).val().length == 1 ){
			$('#'+name).val( ('00' + $('#'+name).val()).slice(-2) );
			getSound(name, btnId);
		}
		$("#button"+btnId).css("background-color", "#e05252"); //redish
	}
	chara[name] = sound;
}

function playSound(name){
	$("audio").each( function(){ this.pause(); } );
	if(!chara[name]) return;
	if(!isNaN(chara[name].duration)) chara[name].play();
}

function loadCharacters(){
	data.characters.forEach( chara => $('#charaSelect').append($('<option>', { value: 1, text: chara.name })) );
}

function showAllSounds(){
	showAll = !showAll;
	$(".flex").each( function(){ if($(this).attr('id') != "thisFineBox") $(this).css("display", "flex"); });
}

function updateData(){
	// $.getJSON('https://api.myjson.com/bins/1ci0r4', function(result){
	$.getJSON('data/characters.json', function(result){
		data = result;
		count = data.characters.length;
		localStorage.setItem('gbfCharacters', JSON.stringify(data));
		loadCharacters();
	});
}