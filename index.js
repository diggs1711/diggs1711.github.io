(function() {
	'use strict';

	var tabs,
		displayDiv,
		world,
		aboutText,
		home;

	function start() {
		init();
	}
	
	function init() {
		tabs = document.getElementsByClassName('tabs');
		displayDiv = document.getElementsByClassName('container');
		world = document.getElementsByClassName('center');
		home = displayDiv[0].innerHTML;
		aboutText = document.createTextNode("I am recent BEng in Electronic and Engineering graduate currently working as a Technology Consultant.");

		tabs[0].addEventListener('click', function(e) {
			if(e.target.innerText === "About"){
				world[0].style.visibility = "hidden";
				displayDiv[0].appendChild(aboutText);
			}
			if(e.target.innerText === "Home"){
				world[0].style.visibility = "visible";
				aboutText.parentNode.removeChild(aboutText);
			}
		})
	}
	
	start();
})();;