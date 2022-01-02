window.onload = () => {
	$(".menu-show").click(() => $("header nav").addClass("visible"));
	$("nav, div.menu-close").click(() => $("header nav").removeClass("visible"));
};