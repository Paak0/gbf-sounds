$(function () {
	const slider = $('.images-wrapper');
	let isDown = false;
	let startX = 0;
	let scrollLeft;

	slider.on("mousedown", (e) => {
		isDown = true;
		slider.addClass('active');
		startX = e.pageX - slider.offset().left;
		
		scrollLeft = slider.scrollLeft();
	});
	slider.on("mouseleave", () => {
		isDown = false;
		slider.removeClass('active');
	});
	slider.on("mouseup", () => {
		isDown = false;
		slider.removeClass('active');
	});
	slider.on("mousemove", (e) => {
		if (!isDown) return;
		e.preventDefault();

		const x = e.pageX - slider.offset().left;
		const walk = (x - startX) * 2;
		slider.scrollLeft(scrollLeft - walk);
	});

	$(".item").click(async function () {
		let item = $(this);
		$(".image.active").removeClass("active");
		item.find(".image").addClass("active");

		let id = item.data("id");
		//let imgIndex = id.toString().length < 12 ? 2 : 3;

		$("head").append("<style>.container::after{ background: url(\"http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/npc/zoom/" + parseInt(id) + "_0" + 2 + ".png\") no-repeat 50% 50px fixed; }</style>");

		$("#optional").val("");
		$("input").each(function () { $(this).val(0); });
		$(".flex").each(function () { $(this).hide(); });
		$("button").each(function () { $(this).css("background-color", ""); });
		$(".link").each(function () { $(this).attr("onclick", ""); });

		chara = {};

		const res = await fetch(`../../api/v1/characters/id/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).catch(err => {
			return console.log('Error');
		});

		if (!res) return;
		const data = await res.json();

		chara.id = data.id;
		chara.sounds = data.sounds;

		if (chara.sounds.length > 0) {
			chara.sounds.forEach(elem => { $("#" + elem + "Box").css("display", "flex"); });
		}
		else {
			showAllSounds();
		}
	});
	
	$("#showall").click(() => {
		showAllSounds();
	});

	$(".letters span").click(function(){
		scrollToLetter($(this));
	});

	function scrollToLetter(letter) {
		let item = $(".item[data-name^='" + letter.text() + "']:not(.hidden)")[0];
		if (item) $('.images-wrapper').scrollLeft($(item).offset().left + slider.scrollLeft() - slider.offset().left);
		else scrollToLetter(letter.next());
	}

	$("#btnFilter").click(() => {
		$(".filter").toggleClass("hidden");
	});

	$("#btnApplyFilter").click(() => {
		let items = $(".item");
		items.removeClass("hidden");

		let elements = $("#divElement").find("input:checked").map(function () { return "[data-element=" + this.name + "]" }).toArray().join(",");
		let styles = $("#divStyle").find("input:checked").map(function () { return "[data-style=" + this.name + "]" }).toArray().join(",");
		let types = $("#divType").find("input:checked").map(function () { return "[data-type=" + this.name + "]" }).toArray().join(",");
		let genders = $("#divGender").find("input:checked").map(function () { return "[data-gender=" + this.name + "]" }).toArray().join(",");

		if (elements.length > 0) items = $(".item:not(.hidden)").not(elements).addClass("hidden");
		if (styles.length > 0) items = $(".item:not(.hidden)").not(styles).addClass("hidden");
		if (types.length > 0) items = $(".item:not(.hidden)").not(types).addClass("hidden");
		if (genders.length > 0) items = $(".item:not(.hidden)").not(genders).addClass("hidden");

		//$(".item").filter(function () {
		//	return $("#divElement").find("input:checked").map(function () { return this.name; }).toArray().includes($(this).data("element"));
		//}).addClass("hidden");

	});
});


let currentData = "ssr";
let chara;

const soundNames = [
	'them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 'win',
	'lose', 'turn_start', 'turnend', 'attack', 'kill', 'ready', 'mortal',
	'damage', 'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution',
	'formation', 'archive', 'to_player', 'healed', 'helaled', 'hp_down',
	'power_down', 'player_gauge', '_v'
];
const adds = ['', 'a', 'b', 'c', '_a', '_b', '_c', '_mix'];

function prev(id, btnId) {
	if (!chara.id || $('#' + id).val() < 2) return;
	$('#' + id).val($('#' + id).val() - 1);
	getSound(id, btnId);
}

function next(id, btnId) {
	if (!chara.id) return;
	$('#' + id).val(parseInt($('#' + id).val()) + 1);
	getSound(id, btnId);
}

function getSound(name, btnId) {
	let index = $('#' + name).val();

	if (parseInt(index) > 0) {
		$("#button" + btnId).css("background-color", "#52529E"); //blue
		if (name == 'v_' && index.toString().length < 3) index = ('000' + index).slice(-3);
		if (name == 'turnend' || name == 'player_gauge') index = "";

		let link = 'http://game-a5.granbluefantasy.jp/assets/sound/voice/' + chara.id + '_' + name + index + $("#optional").val() + '.mp3';
		let sound = new Audio(link);
		chara[name] = sound;
		$("#link" + btnId).attr("onclick", "window.open(" + "'" + link + "'" + ")");

		sound.onloadedmetadata = function () {
			$("#button" + btnId).css("background-color", "#63bc64"); //greenish
			chara[name].play();
		};
		sound.onerror = function () {
			$("#button" + btnId).css("background-color", "#d26464"); //redish
			if ($('#' + name).val().length == 1) {
				$('#' + name).val(('00' + $('#' + name).val()).slice(-2));
				getSound(name, btnId);
			}
		}
	}
}

function playSound(name) {
	if (!chara[name] || isNaN(chara[name].duration)) return;
	chara[name].play();
}

function showAllSounds() {
	$(".flex").each(function () { if ($(this).attr('id') != "thisFineBox") $(this).css("display", "flex"); });
}