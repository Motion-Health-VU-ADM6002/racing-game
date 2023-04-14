/******
 * siteCore
 * [Web Template System]
 * Version: 1.0.0.0.A
 *
 * Author: Ed Spurrier
 ******/

/**
 * WINDOW READY INIT
 */
var siteCore = {};
siteCore.apps = {};

var debug = true;

if(debug) {
	siteCore.apps.debugConsole = new debugConsole();
	function bug ($data) {

	}
};


/**
 * siteCore Init
 */
function siteCoreInit() {
	var everythingLoaded = setInterval(function() {
		if (/loaded|complete/.test(document.readyState)) {
			clearInterval(everythingLoaded);
			siteCore.apps.viewAnimations = new viewAnimations();
			siteCore.apps.mastheadUX = new mastheadUX();
		};
	}, 10);
};

