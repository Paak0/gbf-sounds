class Character{
	constructor(){
		this.id = 0;
		this.sounds = [];
	}
}

let showAll = false;
let chara;

let soundNames = [
	'them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 'win', 
	'lose', 'turn_start', 'turnend', 'attack', 'kill', 'ready', 'mortal', 
	'damage', 'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution', 
	'formation', 'archive', 'to_player', 'healed', 'helaled', 'hp_down', 
	'power_down', 'player_gauge'
];
let adds = ['', 'a', 'b', '_a', '_b', '_mix'];

// id_them# 		 |x| ferry only
// id_us# 			 |x| ferry only
// id_ability_them#  |x| everyone		#_a #_b	(metera fire)	#a #b (sarasa)
// id_ability_us# 	 |x| everyone
// id_mypage#		 |x| everyone #a #b
// id_cutin#		 |x| ? -gandalf -altair -dlf -io(summer) -lily -birdman -sarunan
// id_win#			 |x| everyone		#a #b (therese)	#_mix (agielba)
// id_lose#		 	 |x| ? -gandalf -blackknight -cagloli -box -dlf	aliza _a _b dokkan(light) _a _b drang _a _b korwa a lance(wind) _a _b
// id_turn_start#	 |x| lennah(ONLY)
// id_turnend		 |x| metera sarunan(ONLY)
// id_attack#		 |x| ##(monika)
// id_kill##		 |x| (cucuru)
// id_ready#		 |x| ##
// id_mortal#		 |x| id_mortal#_b (lennah)
// id_damage#		 |x| ##
// id_dying#		 |x| ##
// id_zenith_up#	 |x| 
// id_runk_up#		 |x| ? alex
// id_introduce#	 |x| 
// id_evolution##	 |x| #	||	#_mix (Pretty Cure)
// id_formation#	 |x| ##
// id_archive##	 	 |x| monika	#grea(summer)
// id_to_player#	 |x| 
// id_healed##		 |x| #
// id_power_down##	 |x| #
// id_hp_down##	 	 |x| #
// id_v_###		 	 |x| ###a ###b	 ###_a ###_b (metera fire)
// id_player_gauge	 |x| orchid forte veight eustace lilele naru percy saru(d) chatnoir sara feower fif


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
	$("head").append("<style>.container::after{ background: url(\"http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/npc/zoom/" + parseInt(chara.id) + "_0" + picID + ".png\") no-repeat 50% 40% scroll; }</style>");
	
}

function prev(id, btnId){
	if($('#'+id).val() > 1){
		$('#'+id).val($('#'+id).val() - 1);
		getSound(id, btnId);
	}
}

function next(id, btnId){
	//if(!chara.gettingSound){
		$('#'+id).val(parseInt($('#'+id).val()) + 1);
		//chara.counter = chara.temp = parseInt($('#'+id).val());
		getSound(id, btnId);
	//}
}

function getSound(name, btnId){
	//chara.gettingSound = true;
	let index = $('#'+name).val();
	if(parseInt(index) < 1) return;
	
	if(name == 'v_') index = ('000' + index).slice(-3);
	if(name == 'turnend' || name == 'player_gauge') index = "";
	
	let link = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ chara.id +'_'+ name + index + $("#optional").val() +'.mp3';
	let sound = new Audio(link);
	
	$("#link"+btnId).attr("onclick", "window.open("+"'"+link+"'"+")" );
	
	sound.onloadedmetadata = function(){
		$("#button"+btnId).css("background-color", "#75e052"); //greenish
		//chara.gettingSound = false;
		this.play();
	};
	sound.onerror = function(){
		if((chara.id == '3040001000_03' || chara.id == '3040012000_03' || chara.id == 3040101000 || chara.id == 3040178000 || parseInt(chara.id) >= 3040180000) && $('#'+name).val().length == 1 ){
			$('#'+name).val( ('00' + $('#'+name).val()).slice(-2) );
			getSound(name, btnId);
		}
		$("#button"+btnId).css("background-color", "#e05252"); //redish
		//if(chara.counter < chara.temp + 9){
			//$('#'+name).val(parseInt($('#'+name).val()) + 1);
			//getSound(name, btnId);
			//chara.counter++;
		//}else{
			//chara.gettingSound = false;
		//}
	}
	chara[name] = sound;
}

function playSound(name){
	if(!chara[name]) return;
	if(!isNaN(chara[name].duration)) chara[name].play();
}

function loadCharacters(){
	data.characters.forEach( chara => $('#charaSelect').append($('<option>', { value: 1, text: chara.name })) );
}

function showAllSounds(){
	showAll = !showAll;
	//changeChara();
	$(".flex").each(  function(){ $(this).css("display", "flex"); });
}

function updateData(){
	// $.getJSON('https://api.myjson.com/bins/9zvio', function(result){
	$.getJSON('characters.json', function(result){
		data = result;
		count = data.characters.length;
		localStorage.setItem('gbfCharacters', JSON.stringify(data));
		loadCharacters();
	});
}