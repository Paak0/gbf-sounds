
chara = {
	name: 'xxx',
	id: null,
	selectIndex: null,
	them: null,
	us: null,
	ability_them: null,
	ability_us: null,
	ready: null,
	win: null,
	lose: null,
	dying: null,
	attack: null,
	cutin: null,
	turnend: null,
	v_: null,
	mortal: null
}

// id_them# 		|x|
// id_us# 			|x|
// id_ability_them# |x|
// id_ability_us#	|x|
// id_win#			|x|
// id_lose#			|x|
// id_attack#		|x|	
// id_dying#		|x|	
// id_cutin#		||
// id_ready#		|x|
// id_turnend		|x|
// id_v_###			|x|	###a || ###b ||
// id_mortal#		||

changeChara = function(){
	chara.them = chara.us = chara.ability_them = chara.ability_us = 
	chara.win = chara.lose = chara.attack = chara.dying = chara.cutin = 
	chara.ready = chara.turnend = chara.v_ = chara.mortal = null;
	$("input").each(function(){
		$(this).val(0);
	});
	for(let i = 1; i < 12; i++){
		$("#button"+i).css("background-color", "");
	}
	selectIndex = $('#charaSelect').prop('selectedIndex');
	chara.id = data.characters[selectIndex - 1].id;
}

prev = function(id, btnId){
	$('#'+id).val($('#'+id).val() - 1);
	getSound(id, btnId);
}

next = function(id, btnId){
	$('#'+id).val(parseInt($('#'+id).val()) + 1);
	getSound(id, btnId);
}

getSound = function(name, btnId){
	let index = $('#'+name).val();
	if(name == 'v_') index = ('000' + index).slice(-3);
	if(name == 'turnend') index = '';
	let link = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ chara.id +'_'+ name + index +'.mp3';
	let sound = new Audio(link);
	sound.onloadedmetadata = function(){
		$("#"+btnId).css("background-color", "#75e052"); //greenish
		this.play();
	};
	sound.onerror = function(){
		$("#"+btnId).css("background-color", "#e05252"); //redish
	}
	chara[name] = sound;
}

playSound = function(name){
	if(!isNaN(chara[name].duration)) chara[name].play();
}

loadCharacters = function(){
	for(let i = 0; i < data.characters.length; i++){
		$('#charaSelect').append($('<option>', {
			value: 1,
			text: data.characters[i].name
		}));
	}
}

