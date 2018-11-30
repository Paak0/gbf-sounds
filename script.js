class Character{
	constructor(name, id){
		this.name = name;
		this.id = id;
	}
}

let showAll = false;
let chara;

//  id_them# 		 |x|
//  id_us# 			 |x|
//@ id_ability_them# |x|		#_a #_b	(metera fire)	||	#a #b (sarasa)	||
//@ id_ability_us# 	 |x|
//  id_win#			 |x|		#a #b (therese)	#_mix (agielba)	||
//  id_lose#		 |x|
//  id_attack#		 |x|		##	||	(monika)
//  id_dying#		 |x|		##	||
//@ id_cutin#		 |x|
//  id_ready#		 |x|		##	||
//  id_turnend		 |x|		metera sarunan
//  id_v_###		 |x|		###a || ###b ||		###_a ###_b (metera fire)	||
//  id_mortal#		 |x|		id_mortal#_b (lennah)	||
//  id_zenith_up#	 |x|		
//  id_formation#	 |x|		##
//  id_to_player#	 |x|
//  id_damage#		 |x|		##	||
//  id_player_gauge	 |x|		orchid forte veight eustace lilele naru percy saru(d) chatnoir sara 
//  id_turn_start#	 |x|		lennah
//  id_kill##		 |x|		(cucuru)
//  id_runk_up#		 |x|		alex
//@ id_mypage#		 |x|		#a #b
//  id_evolution##	 |x|			#	||	#_mix (Pretty Cure)
//  id_introduce#	 |x|
//  id_archive##	 |x|		monika	#grea(summer)
//  id_healed##		 |x|			#
//  id_power_down##	 |x|			#
//  id_hp_down##	 |x|			#


//@@@@@@@@@@@@@@@@@@@@@@@@

//fix aquors, dirt vas
//fix turnstart , turnend , emp skill up
//check id when dead & cutin     old

//@@@@@@@@@@@@@@@@@@@@@@@@@@


changeChara = function(){
	
	$("#thisFine").hide();
	$("#optional").val("");
	$("input").each( function(){ $(this).val(0); });
	$("button").each(function(){ $(this).css("background-color", ""); });
	
	let id = data.characters[$("#charaSelect").prop("selectedIndex") - 1].id;
	chara = new Character("", id);
	
	$(".flex").each(function(){ $(this).show(); });
	
	$(".skills").show();
	
	$(".ferry").hide();
	
	$("#turnstartBox, #turnendBox, #playergaugeBox, #empupBox, #emprankBox, #toplayerBox, #healedBox, #archiveBox").hide();
	$("#introduceBox, .debuff, #formationBox, #uncap, #damageBox, #killBox, #atackBox, #readyBox, #dyingBox, #mortalBox").hide();
	
	if(parseInt(id) >= 3040138000) $("#introduceBox, .debuff, #formationBox, #uncap, #damageBox, #killBox, #atackBox, #readyBox, #dyingBox, #mortalBox, #healedBox").show();		//yuel(water)
	if(parseInt(id) >= 3040140000) $("#empupBox, #emprankBox").show();		//lencelot(wind)
	if(parseInt(id) >= 3040176000) $("#toplayerBox").show();				//rosetta(summer)
	if(parseInt(id) >= 3040177000) $("#archiveBox").show();					//ilsa(summer)
	
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
			
		case "3040027000_03":
		case 3040019000:
			$("#healedBox, .debuff, #formationBox, #uncap, #damageBox, #killBox, #atackBox, #readyBox, #dyingBox, #mortalBox, #empupBox, #emprankBox").show();
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
			$("#playergaugeBox").show();
			break;
		
		case 3040012000:	//metera
		case 3040008000:	//sarunan
			$("#turnendBox").show();
			break;
		
		case "3040021000_03":	//lennah
			$("#turnstartBox").show();
	}
}

prev = function(id, btnId){
	if($('#'+id).val() > 1){
		$('#'+id).val($('#'+id).val() - 1);
		getSound(id, btnId);
	}
}

next = function(id, btnId){
	//if(!chara.gettingSound){
		$('#'+id).val(parseInt($('#'+id).val()) + 1);
		//chara.counter = chara.temp = parseInt($('#'+id).val());
		getSound(id, btnId);
	//}
}

getSound = function(name, btnId){
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
		if(chara.id == 3040178000 || parseInt(chara.id) >= 3040180000 && $('#'+name).val().length == 1 ){
			
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

playSound = function(name){
	if(!chara[name]) return;
	if(!isNaN(chara[name].duration)) chara[name].play();
}

loadCharacters = function(){
	data.characters.forEach(chara => $('#charaSelect').append($('<option>', {
			value: 1,
			text: chara.name
		}))
	);
}

showAllSounds = function(){
	showAll = !showAll;
	//changeChara();
	$(".flex").each(  function(){ $(this).show(); });
}