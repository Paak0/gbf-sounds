class Character{
	constructor(name, id){
		this.name = name;
		this.id = id;
	}
}

let showAll = false;
let chara;

let testArr = [];
let soundNames = ['them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 
				  'win', 'lose', 'attack', 'kill', 'ready', 'mortal', 'damage', 
				  'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution', 'formation', 
				  'archive', 'to_player', 'healed', 'hp_down', 'power_down'];
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


//@@@@@@@@@@@@@@@@@@@@@@@@

//dirt vas
//check id when dead, healed ,helaled     

//@@@@@@@@@@@@@@@@@@@@@@@@@@


function changeChara(){
	
	$("#thisFine").hide();
	$("#optional").val("");
	$("input").each( function(){ $(this).val(0); });
	$("button").each(function(){ $(this).css("background-color", ""); });
	
	let id = data.characters[$("#charaSelect").prop("selectedIndex") - 1].id;
	chara = new Character("", id);
	
	$(".flex").each(function(){ $(this).show(); });
	
	$(".skills").show();
	
	$(".ferry").hide();
	
	$("#turnstartBox, #turnendBox, #atackBox, #killBox, #readyBox, #mortalBox, #damageBox, #dyingBox, #empupBox, #emprankBox").hide();
	$("#introduceBox, #uncap, #formationBox, #archiveBox, #toplayerBox, #healedBox, .debuff, #playergaugeBox").hide();
	
	if(parseInt(id) >= 3040138000) $("#atackBox, #killBox, #readyBox, #mortalBox, #damageBox, #dyingBox, #introduceBox, #uncap, #formationBox, #healedBox, .debuff").show();		//yuel(water)
	if(parseInt(id) >= 3040141000) $("#empupBox").show();		//vira(light)
	if(parseInt(id) >= 3040176000) $("#toplayerBox").show();	//rosetta(summer)
	if(parseInt(id) >= 3040177000) $("#archiveBox").show();		//ilsa(summer)
	
	switch(id){
		case 3040125000:	//yugu
		case 3040152000:	//tiamat
			$(".flex").each(function(){ $(this).hide(); });
			$("#other").show().children().show();
			$("#thisFine").show();
			break;
		
		case 3040073000: 	//ferry
			$(".ferry").show();
			$(".skills").hide();
			break;
			
		case "3040027000_03":	//sheep 5*
		case "3040063000_03":	//naru 5*
		case 3040019000:		//arulumaya
			$("#uncap").show();
		case "3040008000_03":	//sarunan 5*
			$("#formationBox, #atackBox, #killBox, #readyBox, #mortalBox, #damageBox, #dyingBox, #empupBox, #emprankBox, #healedBox, .debuff").show();
			break;
			
		case "3040001000_03":	//altair 5*
			$("#atackBox, #killBox, #readyBox, #mortalBox, #damageBox, #dyingBox, #uncap, #formationBox").show();
			$("#other").hide();
			break;
		
		case "3040012000_03":	//metera 5*
			$("#atackBox, #killBox, #readyBox, #mortalBox, #damageBox, #dyingBox, #uncap, #formationBox, #toplayerBox, .debuff").show();
			break;
			
		case "3040021000_03":	//lennah
			$("#turnstartBox, #atackBox, #killBox, #readyBox, #damageBox, #dyingBox, #formationBox, #toplayerBox, #healedBox, .debuff").show();
			break;
			
		case 3040101000:		//lecia
			$("#atackBox, #killBox, #readyBox, #mortalBox, #dyingBox, #uncap, #formationBox").show();
			break;
			
		case 3040111000:	//orchid
		case 3040094000:	//veight
		case 3040093000:	//chatnoir
		case 3040086000:	//forte
		case 3040069000:	//eustace
		case 3040066000:	//lilele
		case 3040063000:	//naru
		case 3040050000:	//percy
		case 3040048000: 	//saru(d)
		case 3040041000:	//sara
		case 3040036000:	//siete
			$("#playergaugeBox").show();
			break;
			
		case 3040008000:	//sarunan
			$("#turnendBox").show();
		case 3040002000:	//gandalf
		case 3040001000:	//altair
		case 3040004000:	//dlf
		case 3040015000:	//io(summer)
		case 3040007000:	//lily
		case 3040003000:	//birdman
			$("#cutinBox").hide();
			break;
		
		case 3040012000:	//metera
			$("#turnendBox").show();
	}
	
	if(id <= 3040175000 && id >= 3040141000) $("#emprankBox").show();
	
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
	if(chara.id == 3040178000 || parseInt(chara.id) >= 3040177000){
		//index = ('00' + index).slice(-2);
		if(name == 'helaled') name = 'healed';
	}
	
	//if(chara.id == '3040001000_03') index = ('00' + index).slice(-2);
	
	if(chara.id == 3040185000 || chara.id == 3040183000 || chara.id == 3040184000) index = parseInt(index);
	if(name == 'turnend' || name == 'player_gauge') index = "";
	let link = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ chara.id +'_'+ name + index + $("#optional").val() +'.mp3';
	
	if(name == 'healed') name = 'helaled';
	// $("#link"+btnId)[0].onclick = null;
	// $("#link"+btnId).on("click", function(){ console.log(link); });
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
	$(".flex").each(  function(){ $(this).show(); });
}

function updateData(){
	//$.getJSON('https://api.myjson.com/bins/mtpo2', function(result){
	$.getJSON('characters.json', function(result){
		data = result;
		count = data.characters.length;
		localStorage.setItem('gbfCharacters', JSON.stringify(data));
		loadCharacters();
	});
}

function testSounds(name){
	for(let i = 0; i < data.characters.length; i++){
		let idd = data.characters[i].id;
		let lnk = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ idd +'_'+name+'.mp3';
		let snd = new Audio(lnk);
		testArr[i] = "";//data.characters[i].name;
		snd.onloadedmetadata = function(){
			testArr[i] = /*"";*/data.characters[i].name;
		};
	}
}

function testChara(nb){
	for(let i = 0; i < soundNames.length; i++){
		data.characters[nb].sounds = [];
		for(let j = 1; j < 3; j++){
			for(let k = 0; k < adds.length; k++){
				let lnk = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ data.characters[nb].id +'_'+soundNames[i]+j+adds[k]+'.mp3';
				let snd = new Audio(lnk);
				snd.onloadedmetadata = function(){
					data.characters[nb].sounds[i] = soundNames[i];
				};
			}
			let lnk = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ data.characters[nb].id +'_'+soundNames[i]+'0'+j+'.mp3';
			let snd = new Audio(lnk);
			snd.onloadedmetadata = function(){
				data.characters[nb].sounds[i] = soundNames[i];
			};
			
		}
	}
}
