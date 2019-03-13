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
let adds = ['', 'a', 'b', 'c', '_a', '_b', '_c', '_mix'];

function changeChara(){
	$("#optional").val("");
	$("input").each( function(){ $(this).val(0); });
	$(".flex").each( function(){ $(this).hide(); });
	$("button").each(function(){ $(this).css("background-color", ""); });
	$(".link").each( function(){ $(this).attr("onclick", "" ); });
	
	chara = new Character();
	chara.id = $("#charaSelect").val();
	chara.sounds = data[currentData][$("#charaSelect").prop("selectedIndex") - 1].sounds;
	
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
	$("#button"+btnId).css("background-color", "#5252e0"); //blue
	let index = $('#'+name).val();
	if(parseInt(index) < 1) return;
	
	if(name == 'v_' && index.toString().length < 3) index = ('000' + index).slice(-3);
	if(name == 'turnend' || name == 'player_gauge') index = "";
	
	let link = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ chara.id +'_'+ name + index + $("#optional").val() +'.mp3';
	let sound = new Audio(link);
	chara[name] = sound;
	$("#link"+btnId).attr("onclick", "window.open("+"'"+link+"'"+")" );
	
	sound.onloadedmetadata = function(){
		$("#button"+btnId).css("background-color", "#75e052"); //greenish
		chara[name].play();
	};
	sound.onerror = function(){
		if( $('#'+name).val().length == 1 ){
			$('#'+name).val( ('00' + $('#'+name).val()).slice(-2) );
			getSound(name, btnId);
		}
		$("#button"+btnId).css("background-color", "#e05252"); //redish
	}
	
}

function playSound(name){
	if(!chara[name] || isNaN(chara[name].duration)) return;
	chara[name].play();
}

function loadCharacters(x){
	data[x].forEach( ch => $('#charaSelect').append($('<option>', { value: ch.id, text: ch.name })) );
}

function showAllSounds(){
	showAll = !showAll;
	$(".flex").each( function(){ if($(this).attr('id') != "thisFineBox") $(this).css("display", "flex"); });
}

function updateData(){
	$("#charaSelect").children('option:not(:first)').remove();
	$.getJSON('data/characters.json', function(res){
		data = res;
		count = data.ssr.length + data.sr.length + data.r.length;
		localStorage.setItem('gbfCharacters', JSON.stringify(data));
	});
}
