//
//	MODULE: DEBUG CONSOLE
//

function debugConsole() {

	//  CREATE ELEMENTS ARRAY
	var $el = {};
	var consoleLine = 0;

	var log = function ($content) {
		if (debug) {
			console.log('debug console: ' + $content);
		};
	};

	var init = function() {


		log('init()');
		buildConsole();

		cacheEl();

		//	CREATE DEBUG VALUES
		createValue('game-paused');
		createValue('key-down');
		createValue('frames');
		createValue('segments');
		createValue('current-segment');
		createValue('current-position');
		createValue('motion-controller-input');

		createValue('input-direction');
		createValue('speed');
		createValue('speed-percent');
		createValue('dt-parameter');
		createValue('dx-parameter');

		createValue('motion-controller-output');
		createValue('player-x');
		createValue('player-x-after-adjustment');

		createValue('turn-speed');

		createValue('blur-amount');

		createValue('current-lap-time');

		createValue('sound-1-time');
		createValue('sound-2-time');

		createValue('sound-1-volume');
		createValue('sound-2-volume');


		styleConsole();


		debugConsole("init");

		document.onkeypress=function(e){
			//do the required work

			getKeyDown(e);

			if(e.which == 104 || e.which == 72) {
				toggleConsole();
			};
		};
	};


	var getKeyDown = function (e) {
		siteCore.apps.debugConsole.debugValue('key-down', e.which);
	}
	var buildConsole = function () {
		$('body').append(
			"<div id='debug-console'>" +
				"Press H to toggle in window debug console" +
				"<div id='debug-feed'>" +
				"</div>" +
				"<div id='debug-static-values'>" +
				"</div>" +
			"</div>"
		);
	};

	var createValue = function ($valueName) {
		$el.debugStaticValues.append(
			"<div id='" + $valueName + "'>" +
				$valueName + ": <span class='value'></span>" +
			"</div>"
		);
	};

	var styleConsole = function () {

		$el.debugConsole.css({
			color: 'white',
			background: 'black',
			border: '1px solid gray',
			position: 'absolute',
			zIndex: '3000',
			fontSize: 9,
			padding: 10,
			maxHeight: 500,
			height: 350,
			width: 400,
			opacity: 0.65,
			top: 30,
			left: 10,
			display: 'none'
		});

		$el.debugFeed.css({
			background: 'black',
			overflowY: 'scroll',
			width: 200,
			paddingTop: 10,
			paddingBottom: 10,
			marginTop: 10
		});

		$el.debugStaticValues.css({
			position: 'absolute',
			top: 0,
			right: 0,
			width: 200,
			paddingTop: 10,
			paddingBottom: 10,
			marginTop: 10
		});


		$el.debugConsole.css('font-family', '"Helvetica Neue", helvetica, arial, verdana, sans-serif');
	};

	var toggleConsole = function () {

		if($el.debugConsole.css('display') == "block") {
			log("hidden");
			$el.debugConsole.css({
				display: 'none'
			});
			$el.debugExtraElements.css({
				display: 'none',
				opacity: 0
			});
		} else {
			log("activated");
			$el.debugConsole.css({
				display: 'block'
			});
			$el.debugExtraElements.css({
				display: 'block',
				opacity: 1
			});
		};
	};


	var debugConsole = function ($data) {
		$el.debugFeed.prepend(consoleLine + " > " + $data + "<br />");
		consoleLine++
	};

	var debugValue = function ($valueName, $data) {
		$el.debugStaticValues.find('#' + $valueName + " span.value").empty().append($data);
		consoleLine++
	};

	//  CACHE ELEMENTS
	var cacheEl = function() {
		$el.debugConsole = $('#debug-console');
		$el.debugFeed = $('#debug-feed');
		$el.debugStaticValues = $('#debug-static-values');
		$el.debugExtraElements = $('#motion-control-helper');
	};



	//  INITIALIZE
	init();

	//  EXTERNAL FUNCTIONS
	return {

		debugConsole: function($data) {
			debugConsole($data);
		},

		debugValue: function($valueName, $data) {
			debugValue($valueName, $data);
		},
		toggleConsole : function () {
			toggleConsole();
		}
	};
};