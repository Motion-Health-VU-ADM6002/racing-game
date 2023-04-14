//
//	MODULE: MASTHEAD UX
//

var mouseLeftGameArea = false;
var viewStatus = 'init';
var keyboardControlInstructions = false;

$muteBtn
var mouseHoverPause = true;
//	FOR DEBUGGING
//viewStatus = 'play';


function mastheadUX() {

	//  CREATE ELEMENTS ARRAY
	var $el = {};

	var init = function() {

		cacheEl();

		changeView("collapse");

		$el.cta.skipTutorialBtn.on("click", function(){
			Enabler.counter("Skipped Motion Tutorial");
			playGame();
		});

		$el.cta.playBtn.on("click", function(){
			playGame();
		});

		$mainPanel.mouseleave(function (){
			mouseLeftGameArea = true;
			triggerGamePause();
		});

		$mainPanel.mouseenter(function (){
			mouseLeftGameArea = false;
		});

		$el.cta.options.on("click", function(){
			if (!gamePaused) {
				Enabler.counter("Paused Game");
				playTimerStop();
				siteCore.apps.viewAnimations.animateGameOptionsIn();
			} else {
				startCamera();
				Enabler.counter("Un-Paused Game");
				siteCore.apps.viewAnimations.animateGameOptionsOut();
			}
		});

		$el.cta.restart.on("click", function() {
			Enabler.counter("Restarted Game");
			siteCore.apps.viewAnimations.animateRestart();
			if (viewStatus != 'end-game') {
				viewStatus = 'play';
			};
		});

		$el.cta.endGame.on("click", function() {
			gameSound.active = false;
			gameSound.stopCar();
			stopCamera();
			Enabler.counter("Navigated to End Game Screen");
			siteCore.apps.viewAnimations.animateEndGame();
		});

		$el.cta.muteSound.on("click", function() {
			gameSound.muteSound('toggle');
		});
		
	};

	var changeView = function ($viewName) {
		siteCore.apps.debugConsole.debugConsole("Changing View: " + $viewName);

		if ($viewName == "collapse") {
			//	IF FIRST START INIT STARTUP
			if(viewStatus == 'init') {
				siteCore.apps.viewAnimations.animateStartUp();
				viewStatus = 'instructions';
				//	IF EXPANDED
			} else {
				siteCore.apps.viewAnimations.animateCollapse();
			};

		} else if ($viewName == "expand") {
			siteCore.apps.viewAnimations.animateExpand();
			siteCore.apps.debugConsole.debugConsole("Expanding");

		} else if ($viewName == "expand-complete") {
			if (viewStatus == 'instructions') {
				if (cameraAvailable) {
					Enabler.counter("Navigated to Allow Camera Instructions - camera found");
					siteCore.apps.viewAnimations.animateInstructions('#allow-camera');
					checkCameraStatus();
				} else {
					Enabler.counter("Navigated to Keyboard Instructions - no camera");
					siteCore.apps.viewAnimations.animateInstructions('#how-to-play-keyboard');

				};

			} else if (viewStatus == 'play') {
				siteCore.apps.viewAnimations.animateGameOptionsIn();
			} else if (viewStatus == 'end-game') {
				siteCore.apps.viewAnimations.animateEndGame();
			};

			siteCore.apps.debugConsole.debugConsole("Expand-complete");
		};
	};

	var playGame = function () {
		viewStatus = "play";
		siteCore.apps.viewAnimations.animateGameStart();
	};

	var triggerGamePause = function () {
		if (mouseHoverPause && !gamePaused && panelExpanded && viewStatus != "instructions" && viewStatus != "end-game") {
			Enabler.counter("Paused Game - Mouse left game area");
			playTimerStop();
			siteCore.apps.viewAnimations.animateGameOptionsIn();
		};
	};

	//  CACHE ELEMENTS
	var cacheEl = function() {
		$el.cta = {};
		$el.cta.skipTutorialBtn = $('.cta-skip-tutorial');
		$el.cta.playBtn = $("#cta-ready-keyboard, #cta-ready-camera");
		$el.cta.options = $("#hud-options, #resume");
		$el.cta.restart = $("#restart, #end-game-restart");
		$el.cta.endGame = $("#end-game");
		$el.cta.muteSound = $(".hud-sound");
	};


	//  INITIALIZE
	init();

	//  EXTERNAL FUNCTIONS
	return {
		changeView: function($viewName) {
			changeView($viewName);
		},

		triggerGamePause: function () {
			triggerGamePause();
		}
	};
};