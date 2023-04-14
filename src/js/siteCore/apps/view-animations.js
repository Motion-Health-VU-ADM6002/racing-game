//
//	MODULE: MASTHEAD UX
//

function viewAnimations() {

	//  CREATE ELEMENTS ARRAY
	var $el = {};

	var timeLine = new TimelineLite();

	var timeLineHeadLeft = new TimelineLite({
		onComplete: function() {
			this.restart();
		}
	});

	var timeLineHeadRight = new TimelineLite({
		onComplete: function() {
			this.restart();
		}
	});

	var init = function() {
		cacheEl();

		setMotionInstructionsAnimation();
	};

	var setMotionInstructionsAnimation = function () {

		timeLineHeadLeft.to(
			$el.expanded.instructions.bodyLeft,
			anim_fast_x2,
			{
				rotation: -20
			}
		);

		timeLineHeadLeft.to(
			$el.expanded.instructions.bodyLeft,
			anim_fast_x2,
			{
				rotation: 0
			}
		);

		timeLineHeadRight.to(
			$el.expanded.instructions.bodyRight,
			anim_fast_x2,
			{
				rotation: 20
			}
		);

		timeLineHeadRight.to(
			$el.expanded.instructions.bodyRight,
			anim_fast_x2,
			{
				rotation: 0
			}
		);
	}

	//  CACHE ELEMENTS
	var cacheEl = function() {
		$el.collapsed = {};
		$el.collapsed.panel = $('#collapsed-panel');
		$el.collapsed.tagLine = $('#tag-line');
		$el.collapsed.description = $('#description');
		$el.collapsed.button = $('#ctaExpand_dc');

		$el.expanded = {};
		$el.expanded.panel = $('#expanded-panel');
		$el.expanded.game = $('#view-game');
		$el.expanded.gameHUD = $('#game-hud');

		$el.expanded.gameHUDelements = $('.hud-item');
		$el.expanded.gameHUDlapCounter = $('.hud-lap');
		$el.expanded.gameHUDlap1 = $('#hud-lap-1');
		$el.expanded.gameHUDlap2 = $('#hud-lap-2');
		$el.expanded.gameHUDlap3 = $('#hud-lap-3');
		$el.expanded.gameHUDtime = $('#hud-lap-time');

		$el.expanded.gameHUDniceDriving = $('#nice-driving');

		$el.expanded.gameHUDmedals = $('#gold, #silver, #bronze');


		$el.expanded.instructions = {};
		$el.expanded.instructions.view = $('#view-instructions');
		$el.expanded.instructions.header = $('#how-to-play');
		$el.expanded.instructions.instruction = $('.instructions');
		$el.expanded.instructions.cars = $('.car');
		$el.expanded.instructions.carStraight = $('#car-straight');
		$el.expanded.instructions.carLeft = $('#car-left');
		$el.expanded.instructions.carRight = $('#car-right');
		$el.expanded.instructions.allowCamera = $('#allow-camera');
		$el.expanded.instructions.gameOptionsHeader = $('#options-header');
		$el.expanded.instructions.gameOptions = $('#options-screen');
		$el.expanded.instructions.gameOptionsCta = $('.options-cta');
		$el.expanded.instructions.bodyLeft = $("#move-left-head");
		$el.expanded.instructions.bodyRight = $("#move-right-head");

		$el.expanded.instructions.bodyLeftBase = $("#move-left .move-body");
		$el.expanded.instructions.bodyRightBase = $("#move-right .move-body");

		$el.expanded.instructions.rightComplete = $("#move-right-complete");
		$el.expanded.instructions.leftComplete = $("#move-left-complete");

		$el.expanded.endGame = {};
		$el.expanded.endGame.view = $('#view-end-game');
		$el.expanded.endGame.bg = $('#end-game-bg');
		$el.expanded.endGame.header = $('#end-game-header');
		$el.expanded.endGame.logo = $('#end-game-logo');
		$el.expanded.endGame.cta = $('#end-game-cta');
		$el.expanded.endGame.restart = $('#end-game-restart');

		$el.game = {};
		$el.game.allRaceStarter = $('.race-starter');
		$el.game.ready1 = $('#ready-1');
		$el.game.ready2 = $('#ready-2');
		$el.game.ready3 = $('#ready-3');
		$el.game.go = $('#go');

		$el.abarthLogo = $('#abarth-logo');
		$el.mainPanel = $('#main-panel');

		$el.motionControllerVideo = $('#outputVideo, #motion-track-overlay');



		$el.soundFX = {};
		$el.soundFX.beep = $('.beep');
	};


	//////////////////////
	//	SETUP STATES	//
	//////////////////////


	//	SETUP
	//	SET UP ELEMENTS FOR COLLAPSED PANEL IN
	var setupCollapse = function () {
		$el.collapsed.panel.css({display: "block"});
		$el.expanded.panel.css({display: "none"});
		$el.collapsed.panel.css({opacity: 0});
		$el.collapsed.tagLine.css({opacity: 0});
		$el.collapsed.description.css({opacity: 0});
		$el.collapsed.button.css({opacity: 0});
		$el.abarthLogo.css({opacity: 0});
		$el.motionControllerVideo.css({opacity: 0});
	};

	//	SETUP
	//	SET UP ELEMENTS FOR EXPANDED PANEL IN
	var setupExpanded = function () {
		$el.collapsed.panel.css({display: "none"});
		$el.expanded.panel.css({display: "block", opacity: 1});
		$el.expanded.gameHUDelements.css({display: 'none', opacity: 0});
		$el.expanded.gameHUD.css({opacity: 0});
		$el.expanded.instructions.view.css({display: "block", opacity: 1});
		$el.expanded.instructions.header.css({opacity: 0});
		$el.expanded.instructions.instruction.css({display: "none", opacity: 0});
		$el.expanded.instructions.cars.css({opacity: 0});
		$el.expanded.gameHUDlapCounter.css({opacity: 0});
		$el.expanded.gameHUDniceDriving.css({opacity: 0});
		$el.expanded.gameHUDtime.css({opacity: 0});
		$el.expanded.instructions.rightComplete.css({opacity: 0});
		$el.expanded.instructions.leftComplete.css({opacity: 0});

	};

	//	SETUP
	//	SET UP ELEMENTS FOR GAME START
	var setupGame = function () {
		timeLineHeadLeft.stop();
		timeLineHeadRight.stop();
		motionInstructionsLeft = false;
		instructionsFinished = true;
		motionInstructionsActive = false;
		$el.expanded.gameHUDmedals.css({opacity: 0});
		$el.expanded.instructions.carStraight.css({display: 'none'});
		$el.expanded.instructions.carLeft.css({display: 'none'});
		$el.expanded.instructions.carRight.css({display: 'none'});
		$el.game.allRaceStarter.css({opacity: 0});
		$el.expanded.gameHUDniceDriving.css({opacity: 0});
		$el.expanded.gameHUDmedals.css({opacity: 0, display: 'none'});
		$el.expanded.gameHUDlapCounter.css({opacity: 0});
		$el.expanded.gameHUDlap1.css({opacity: 0, left: -190});
		$el.expanded.gameHUDtime.css({opacity: 0, left: -190});
		renderCar = true;
	};

	//	SETUP
	//	SET UP ELEMENTS FOR GAME OPTIONS IN
	var setupGameOptionsIn = function () {
		$el.expanded.instructions.instruction.css({display: "none", opacity: 0});
		$el.expanded.instructions.view.css({display: 'block'});
		$el.expanded.game.css({display: "block", opacity: 1});
		$el.expanded.instructions.gameOptionsCta.css({opacity: 0});
	};

	//	SETUP
	//	SET UP ELEMENTS FOR GAME OPTIONS OUT
	var setupGameOptionsOut = function () {
		$el.game.allRaceStarter.css({opacity: 0});

	};


	//	SETUP MOTION INSTRUCTIONS
	var setUpMotionInstructions = function () {
		setMotionInstructionsAnimation();
		$el.expanded.instructions.bodyLeft.css({opacity: 1});
		$el.expanded.instructions.bodyRight.css({opacity: 1});
		$el.expanded.instructions.bodyLeftBase.css({opacity: 1});
		$el.expanded.instructions.bodyRightBase.css({opacity: 1});
		$el.expanded.instructions.rightComplete.css({opacity: 0});
		$el.expanded.instructions.leftComplete.css({opacity: 0});

	};

	//	SETUP
	//	SET UP ELEMENTS FOR GAME END
	var setupEndGame = function () {
		$el.expanded.endGame.view.css({display: 'block', opacity: 1});
		$el.expanded.endGame.bg.css({opacity: 0});
		$el.expanded.endGame.header.css({opacity: 0});
		$el.expanded.endGame.cta.css({opacity: 0});
		$el.expanded.endGame.restart.css({opacity: 0});
/*		htracker.stopStream(); 
		document.removeEventListener("facetrackingEvent", headTrackMotion);*/
	};

	//////////////////////////
	//	ANIMATION OF STATES	//
	//////////////////////////

	//	ANIMATION
	//	COLLAPSED PANEL OUT
	var animateExpand = function () {

		timeLine.clear();

		timeLine.to($el.collapsed.tagLine, anim_fast, {
			opacity: 0,
			scale: 1.1
		});

		timeLine.to($el.collapsed.description, anim_fast, {
			opacity: 0,
			scale: 1.1
		});

		timeLine.to($el.collapsed.button, anim_fast, {
			opacity: 0,
			scale: 1.1
		});

		timeLine.to($el.abarthLogo, anim_fast, {
			opacity: 0,
			scale: 1.1
		});

		timeLine.to($el.collapsed.panel, anim_fast_x2, {
			opacity: 0
		});

		timeLine.to($el.mainPanel, anim_fast_x2, {
			height: 498,
			onComplete: function () {
				setupExpanded();
				siteCore.apps.mastheadUX.changeView("expand-complete");
			}
		});


	};


	//	ANIMATION
	//	INSTRUCTIONS IN - WITH CAMERA


	var animateInstructions = function ($element) {


		if ($element == "#move-left") {
			instructionsAnimatedIn = false;
			motionInstructionsActive = false;
			instructionsFinished = true;
			motionInstructionsLeft = true;
			setUpMotionInstructions();
		};


		timeLine.clear();

		timeLine.to($el.expanded.instructions.instruction, anim_fast, {
			opacity: 0
		});
		$el.expanded.game.css({display: 'block'});

		var instructionContent = $($element);

		instructionContent.css({display: 'block'});

		if ($element == "#how-to-play-keyboard") {
			timeLine.to($el.expanded.instructions.allowCamera, anim_fast, {
				opacity: 0
			});
		}

		timeLine.fromTo($el.expanded.game, anim_med_x2, {
			opacity: 0,
			scale: 1.5,
			y: '-15%'
		},{
			opacity: 1,
			scale: 1.3,
			y: '0%'
		});

		timeLine.fromTo($el.expanded.instructions.header, anim_fast_x2, {
			opacity: 0,
			scale: 1.5
		},{
			opacity: 1,
			scale: 1
		}, "-=" + anim_med);

		timeLine.fromTo(instructionContent, anim_fast_x2, {
			opacity: 0
		},{
			opacity: 1
		}, "-=" + anim_fast);

		if($element == "#move-left" || $element == "#move-right") {
			timeLine.to($el.motionControllerVideo, anim_fast, {
				opacity: 1
			});
		};

		timeLine.to($el.abarthLogo, anim_fast_x2, {
			opacity: 1,
			scale: 0.7
		}, "-=" + anim_fast);

		timeLine.fromTo($el.expanded.instructions.carStraight, anim_fast_x2, {
			opacity: 0
		},{
			opacity: 1,
			onComplete: function () {
				instructionsAnimatedIn = true;
				if($element == "#move-left") {
					instructionsFinished = false;
					window.setTimeout (function () {
						motionInstructionsActive = true;

					}, 2000);

					window.setTimeout (function () {
						if (motionInstructionsLeft) {
							instructionsTester('left');
						};
					}, 10000);
				} else if ($element == "#how-to-play-keyboard") {
					keyboardControlInstructions = true;
				};
			}
		}, "-=" + anim_fast);

	};

	//	ANIMATION
	//	INSTRUCTIONS UPDATE - NEW PAGE
	var animateInstructionsUpdate = function ($element) {

		if(!instructionsAnimatedIn) {
			animateInstructions($element);
			return;
		};

		timeLine.clear();


		var instructionContent = $($element);
		instructionContent.css({display: 'block'});

		timeLine.to($el.expanded.instructions.instruction, anim_fast, {
			opacity: 0
		});

		timeLine.fromTo(instructionContent, anim_fast, {
			opacity: 0
		},{
			opacity: 1,
			onComplete: function () {
				if($element == "#move-left") {
					timeLine.to($el.motionControllerVideo, anim_fast, {
						opacity: 1
					});

				};
				if($element == "#move-left" || $element == "#move-right") {
					window.setTimeout (function () {
						motionInstructionsActive = true;
					}, 2000);

				};

			}
		});

	};

	//	ANIMATION
	//	INSTRUCTIONS CAR WITH CAMERA

	var instructionsTester = function ($direction) {
		if(!instructionsFinished) {
			if ($direction == "up") {
				$el.expanded.instructions.carStraight.css({opacity: 1});
				$el.expanded.instructions.carLeft.css({opacity: 0});
				$el.expanded.instructions.carRight.css({opacity: 0});
			} else if ($direction == "left") {
				$el.expanded.instructions.carStraight.css({opacity: 0});
				$el.expanded.instructions.carLeft.css({opacity: 1});
				$el.expanded.instructions.carRight.css({opacity: 0});

				//	PLAYER TEST LEAN LEFT
				if(motionInstructionsLeft && motionInstructionsActive) {
					motionInstructionsActive = false;
					Enabler.counter("Navigated to Move Right Motion Instructions");

					gameSound.playForced(success);
					timeLine.fromTo(
						[$el.expanded.instructions.bodyLeft , $el.expanded.instructions.bodyLeftBase], anim_fast_x2, {
							opacity: 1
						},{
							opacity: 0
						});
					timeLine.fromTo(
						$el.expanded.instructions.leftComplete, anim_fast_x2, {
							opacity: 0
						},{
							opacity: 1
						}, "-=" + anim_fast_x2);

					timeLine.to(
						$el.expanded.instructions.leftComplete, anim_fast_x2, {
							opacity: 1,
							delay: 2,
							onComplete: function (){
								motionInstructionsLeft = false;
								animateInstructionsUpdate('#move-right');
								window.setTimeout (function () {
									if (!motionInstructionsLeft) {
										instructionsTester('right');
									};
								}, 10000);
							}
						});

				};
			} else if ($direction == "right") {
				$el.expanded.instructions.carStraight.css({opacity: 0});
				$el.expanded.instructions.carLeft.css({opacity: 0});
				$el.expanded.instructions.carRight.css({opacity: 1});

				//	PLAYER TEST LEAN RIGHT
				if(!motionInstructionsLeft && motionInstructionsActive) {
					Enabler.counter("Navigated to Additional Keyboard Controls Instructions");
					gameSound.playForced(success);

					instructionsFinished = true;
					motionInstructionsActive = false;

					timeLine.fromTo(
						[$el.expanded.instructions.bodyRight , $el.expanded.instructions.bodyRightBase], anim_fast_x2, {
							opacity: 1
						},{
							opacity: 0
						});
					timeLine.fromTo(
						$el.expanded.instructions.rightComplete, anim_fast_x2, {
							opacity: 0
						},{
							opacity: 1
						}, "-=" + anim_fast_x2);

					timeLine.to(
						$el.expanded.instructions.rightComplete, anim_fast_x2, {
							opacity: 1,
							delay: 2,
							onComplete: function (){
								$el.expanded.instructions.carStraight.css({opacity: 1});
								$el.expanded.instructions.carLeft.css({opacity: 0});
								$el.expanded.instructions.carRight.css({opacity: 0});
								Enabler.counter("Motion Instructions Completed");
								animateInstructionsUpdate('#also-use-keyboard');
								//animateGameStart();
							}
						});



				};
			};
		};
	};

	//	ANIMATION
	//	GAME OPTIONS IN
	var animateGameOptionsIn = function () {

		gameSound.stopSounds();

		pauseGame(true);
		setupGameOptionsIn();

		timeLine.clear();

		$el.expanded.instructions.gameOptions.css({display: 'block'});

		timeLine.to([$el.expanded.gameHUD, $el.motionControllerVideo], anim_fast_x2, {
			opacity: 0
		});

		timeLine.to($el.expanded.game, anim_fast_x2, {
			scale: 1.3,
			y: '0%'
		}, "-=" + anim_fast_x2);

		timeLine.to($el.expanded.instructions.view, anim_fast_x2, {
			opacity: 1
		}, "-=" + anim_fast_x2);

		timeLine.to($el.expanded.instructions.gameOptionsHeader, anim_fast_x2, {
			opacity: 1
		}, "-=" + anim_fast);

		timeLine.to($el.expanded.instructions.gameOptions, anim_fast_x2, {
			opacity: 1
		}, "-=" + anim_fast);

		timeLine.to($el.expanded.instructions.gameOptionsCta, anim_fast_x2, {
			opacity: 10
		}, "-=" + anim_fast);

		timeLine.to($el.abarthLogo, anim_fast_x2, {
			opacity: 1,
			scale: 0.7
		}, "-=" + anim_fast);


	};


	//	ANIMATION
	//	GAME OPTIONS OUT
	var animateGameOptionsOut = function () {

		gameSound.startSounds();

		setupGameOptionsOut();

		timeLine.clear();

		timeLine.to([$el.expanded.instructions.gameOptionsHeader, $el.expanded.instructions.gameOptionsCta, $el.expanded.instructions.gameOptions], anim_fast, {
			opacity: 0,
			onComplete: function () {
				pauseGame(false);
			}
		});

		timeLine.to($el.expanded.instructions.view, anim_fast_x2, {
			opacity: 0,
			onComplete: function () {
				$el.expanded.instructions.view.css({display: 'none'});
				$el.expanded.gameHUDelements.css({display: 'block'});
			}
		});

		timeLine.to([$el.expanded.gameHUD, $el.expanded.gameHUDelements], anim_fast_x2, {
			opacity: 1,
			scale: 1
		}, "-=" + anim_fast_x2);

		if (motionTrackingActive) {
			timeLine.to($el.motionControllerVideo, anim_fast_x2, {
				opacity: 1
			}, "-=" + anim_fast_x2);
		};

		timeLine.to($el.expanded.game, anim_fast_x2, {
			scale: 1,
			y: '0%',
			onComplete: function() {
				//	IF MOUSE LEAVES GAME AREA ON ANIMATION OUT OF OPTIONS
				if (mouseLeftGameArea) {
					siteCore.apps.mastheadUX.triggerGamePause();
				}
			}
		}, "-=" + anim_fast_x2);

		if (!raceStarted) {
			raceStartLights();

		};
		playTimerStart();
	};




	//	ANIMATION
	//	GAME START
	var animateGameStart = function () {

		//	START CAR SOUNDS
		gameSound.startSounds();

		viewStatus = 'play';

		timeLine.clear();
		resetPlayerPosition();
		setupGame();



		timeLine.to([$el.expanded.instructions.instruction, $el.expanded.instructions.cars, $el.expanded.instructions.header], anim_fast_x2, {
			opacity: 0,
			onComplete: function () {
				$el.expanded.instructions.view.css({display: 'none'});
			}
		});


		timeLine.to($el.expanded.game, anim_fast_x2, {
			scale: 1
		}, "-=" + anim_med);

		timeLine.to($el.expanded.gameHUD, anim_fast_x2, {
			opacity: 1
		}, "-=" + anim_fast);

		timeLine.fromTo($el.expanded.gameHUDelements, anim_fast, {
			opacity: 0,
			scale: 1.5
		},{
			opacity: 1,
			scale: 1
		});


		if (!raceStarted) {
			raceStartLights();
		};
		playTimerStart();
	};

	//	ANIMATION
	//	RACE START
	var raceStartLights = function () {
		//	RACE LIGHTS

		$el.expanded.gameHUDelements.css({display: 'block'});

		timeLine.fromTo([$el.game.ready3], anim_fast, {
			opacity: 0,
			scale: 0.6
			}, {
			opacity: 1,
			scale: 1,
			onStart: function () {
				gameSound.play(beep);
			}
		}, "+=" + raceStarterTime);


		timeLine.to($el.game.ready3, anim_fast, {
			opacity: 0,
			scale: 1.2
		}, "+=" + raceStarterTime);

		timeLine.fromTo($el.game.ready2, anim_fast, {
			opacity: 0,
			scale: 0.6
		}, {
			opacity: 1,
			scale: 1,
			onStart: function () {
				gameSound.play(beep);
			}
		});

		timeLine.to($el.game.ready2, anim_fast, {
			opacity: 0,
			scale: 1.2
		}, "+=" + raceStarterTime);


		timeLine.fromTo($el.game.ready1, anim_fast, {
			opacity: 0,
			scale: 0.6
		}, {
			opacity: 1,
			scale: 1,
			onStart: function () {
				gameSound.play(beep);
			}
		});

		timeLine.to($el.game.ready1, anim_fast, {
			opacity: 0,
			scale: 1.2
		}, "+=" + raceStarterTime);


		timeLine.to($el.game.go, anim_fast, {
			opacity: 1,
			onStart: function () {
				gameSound.play(go);
			},
			onComplete: function() {
				
				raceStarted = true;
				playerInputStatus(true);
				pauseGame(false);
			}
		});


		timeLine.to([$el.game.allRaceStarter], anim_fast_x2, {
			opacity: 0,
			scale: 1.2
		}, "+=" + anim_med_x2);

		timeLine.fromTo($el.expanded.gameHUDlap1, anim_fast_x2, {
			opacity: 0,
			left: -190
		}, {
			opacity: 1,
			left: 0
		}, "-=" + anim_fast_x2);

		timeLine.fromTo($el.expanded.gameHUDtime, anim_fast_x2, {
			opacity: 0,
			left: -190
		}, {
			opacity: 1,
			left: 0
		});

	};


	//	ANIMATION
	//	GAME RESTART
	var animateRestart = function () {

		gameSound.startSounds();

		startCamera();

		playerInputStatus(false);
		raceStarted = false;
		gamePaused = false;

		timeLine.clear();

		timeLine.to($el.expanded.game, anim_fast_x2, {
			scale: 1.5,
			opacity: 0,
			onComplete: function () {
				resetPlayerPosition();
				/*changeCarSoundFX(0);*/

			}
		});

		timeLine.to([$el.expanded.endGame.view, $el.expanded.instructions.instruction, $el.expanded.instructions.cars, $el.expanded.instructions.header, $el.expanded.instructions.gameOptionsHeader], anim_fast_x2, {
			opacity: 0,
			onComplete: function () {
				$el.expanded.instructions.view.css({display: 'none'});
				$el.expanded.endGame.view.css({display: 'none'});
			}
		}, "-=" + anim_fast_x2);

		setupGame();

		timeLine.to($el.abarthLogo, anim_fast_x2, {
			scale: 0.7,
			bottom: '0px',
			right: '0px',
			onComplete: function () {
				if (viewStatus === 'end-game') {
					viewStatus = 'play';
					//	IF MOUSE LEAVES GAME AREA ON ANIMATION OUT OF OPTIONS
					if (mouseLeftGameArea) {
						siteCore.apps.mastheadUX.triggerGamePause();
					}
				};
			}
		});

		timeLine.to($el.expanded.game, anim_fast_x2, {
			scale: 1,
			opacity: 1
		});

		if (motionTrackingActive) {
			timeLine.to($el.motionControllerVideo, anim_fast_x2, {
				opacity: 1
			}, "-=" + anim_fast);
		};

		timeLine.to([$el.expanded.gameHUD], anim_fast_x2, {
			opacity: 1
		}, "-=" + anim_fast);

		timeLine.fromTo($el.expanded.gameHUDelements, anim_fast, {
			opacity: 0,
			scale: 1.5
		},{
			opacity: 1,
			scale: 1
		});

		raceStartLights();
		playTimerStart();
	};


	//	ANIMATION
	//	EXPANDED PANEL OUT
	var animateCollapse = function () {

		if (viewStatus == 'play') {
			pauseGame(true);
			playTimerStop();
		};

		timeLine.clear();



		if (isStudioExit) {

			isStudioExit = false;

			timeLine.to([$el.motionControllerVideo, $el.abarthLogo, $el.expanded.instructions.instruction, $el.expanded.instructions.header, $el.expanded.instructions.gameOptionsHeader, $el.expanded.game], 0, {
				opacity: 0
			});

			if (viewStatus == 'play') {
				timeLine.to([$el.expanded.endGame.view, $el.motionControllerVideo, $el.abarthLogo, $el.expanded.instructions.instruction, $el.expanded.instructions.header, $el.expanded.instructions.gameOptionsHeader], anim_fast, {
					opacity: 0,
					onComplete: function () {
						$el.expanded.instructions.view.css({display: 'none'});
						$el.expanded.endGame.view.css({display: 'none'});
					}

				}, '-=' + anim_fast);
			};


			timeLine.to($el.mainPanel, 0, {
				height: 248,
				onComplete: function () {
					animateStartUp();
				}
			});


		} else {
			timeLine.to($el.expanded.game, anim_fast, {
				opacity: 0,
				scale: 1.3,
				y: '0%'
			});

			timeLine.to([$el.expanded.endGame.view, $el.motionControllerVideo, $el.abarthLogo, $el.expanded.instructions.instruction, $el.expanded.instructions.header, $el.expanded.instructions.gameOptionsHeader], anim_fast, {
				opacity: 0
			}, '-=' + anim_fast);

			timeLine.to($el.mainPanel, anim_fast_x2, {
				height: 250,
				onComplete: function () {
					animateStartUp();
				}
			});
		};

	};


	//	ANIMATION
	//	INITIAL ANIMATION & COLLAPSED PANEL IN
	var animateStartUp = function () {
		siteCore.apps.debugConsole.debugConsole("Start Up Animation");



		setupCollapse();

		timeLine.clear();
		var anim = {};
		var currentAnim = 0;


		timeLine.fromTo($el.collapsed.panel, anim_med_x2, {
			opacity: 0,
			scale: 1.3
		},{
			opacity: 1,
			scale: 1
		});


		$el.abarthLogo.css({
			bottom: '0px',
			right: '0px'
		});

		timeLine.fromTo($el.abarthLogo, anim_fast_x2, {
				opacity: 0,
				scale: 0.6
			},{
				opacity: 1,
				scale: 0.7
			},
			"-=" + anim_fast_x2
		);

		timeLine.fromTo($el.collapsed.tagLine, anim_fast_x2, {
			opacity: 0,
			scale: 0.9
		},{
			opacity: 1,
			scale: 1
		});

		timeLine.fromTo($el.collapsed.description, anim_fast_x2, {
			opacity: 0,
			scale: 0.9
		},{
			opacity: 1,
			scale: 1
		});

		timeLine.fromTo($el.collapsed.button, anim_fast_x2, {
			opacity: 0,
			scale: 0.9
		},{
			opacity: 1,
			scale: 1
		});

	};


	var animateFinishedRace = function () {

		timeLine.clear();

		gameSound.play(success);
		timeLine.fromTo([$el.expanded.gameHUDmedals, $el.expanded.gameHUDniceDriving], anim_fast, {
			opacity: 0,
			scale: 0.7
		}, {
			opacity: 1,
			scale: 1,
			onComplete: function () {
				timeLine.to($el.expanded.game, finishRaceWaitTime, {
					scale: 1,
					onComplete: function () {
						gameSound.stopSounds();
						animateEndGame();
					}
				});
			}
		});
	};

	var animateEndGame = function () {

		viewStatus = "end-game";

		playerInputStatus(false);
		raceStarted = false;
		gamePaused = false;

		timeLine.clear();

		setupEndGame();

		timeLine.to($el.expanded.game, anim_fast_x2, {
			scale: 1.5,
			opacity: 0,
			onComplete: function () {
				resetPlayerPosition();
			}
		});



		timeLine.to([$el.abarthLogo, $el.expanded.instructions.instruction, $el.expanded.instructions.cars, $el.expanded.instructions.header, $el.expanded.instructions.gameOptionsHeader], anim_fast_x2, {
			opacity: 0,
			onComplete: function () {
				$el.expanded.instructions.view.css({display: 'none'});
			}
		}, "-=" + anim_fast_x2);




		timeLine.fromTo($el.expanded.endGame.bg, anim_med_x2, {
			opacity: 0,
			scale: 1.3
		},{
			opacity: 1,
			scale: 1
		});

		timeLine.fromTo($el.expanded.endGame.header, anim_fast_x2, {
				opacity: 0,
				scale: 0.9
			},{
				opacity: 1,
				scale: 1
			},
			"-=" + anim_fast
		);

		timeLine.fromTo($el.expanded.endGame.cta, anim_fast_x2, {
				opacity: 0,
				scale: 0.9
			},{
				opacity: 1,
				scale: 1
			},
			"-=" + anim_fast
		);

		$el.abarthLogo.css({
			bottom: '12px',
			right: '20px'
		});

		timeLine.fromTo($el.abarthLogo, anim_fast_x2, {
				opacity: 0,
				scale: 0.9
			},{
				opacity: 1,
				scale: 1
			},
			"-=" + anim_fast
		);

		timeLine.fromTo($el.expanded.endGame.restart, anim_fast_x2, {
				opacity: 0,
				scale: 0.9
			},{
				opacity: 1,
				scale: 1
			},
			"-=" + anim_fast
		);

	};



	//  INITIALIZE
	init();

	//  EXTERNAL FUNCTIONS
	return {

		animateCollapse: function() {
			animateCollapse();
		},

		animateExpand: function() {
			animateExpand();
		},

		animateStartUp: function() {
			animateStartUp();
		},

		animateInstructions: function($element) {
			animateInstructions($element);
		},

		animateGameStart: function() {
			animateGameStart();
		},

		animateInstructionsUpdate: function($element) {
			animateInstructionsUpdate($element);
		},

		instructionsTester: function ($direction) {
			instructionsTester($direction);
		},

		animateGameOptionsIn: function () {
			animateGameOptionsIn();
		},

		animateGameOptionsOut: function () {
			animateGameOptionsOut();
		},

		animateRestart: function () {
			animateRestart();
		},

		animateEndGame: function () {
			animateEndGame();
		},

		animateFinishedRace: function () {
			animateFinishedRace();
		}
	};
};