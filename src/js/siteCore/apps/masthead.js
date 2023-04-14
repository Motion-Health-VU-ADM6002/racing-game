//	VARIABLES
var abarthLogoExpandedLinkURL = 'http://www.fiat.com.au/124spider?utm_source=youtube&utm_medium=masthead&utm_campaign=feelthethrill&utm_content=linkabarthlogo';
var abarthLogoCollapsedLinkURL = 'http://www.fiat.com.au/124spider?utm_source=youtube&utm_medium=masthead&utm_campaign=feelthethrill&utm_content=linkabarthlogo';
var BookATestDriveLinkURL = 'http://www.fiat.com.au/124spider?utm_source=youtube&utm_medium=masthead&utm_campaign=feelthethrill&utm_content=ctabooktestdrive';

// If true, start function. If false, listen for INIT.
window.onload = function() {
	if (Enabler.isInitialized()) {
		enablerInitHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
	}
}

function enablerInitHandler() {
	// Start polite loading, or start animation,
	// load in your image assets, call Enabler methods,
	// and/or include other Studio modules.

	//	LOAD SITE CORE
	siteCoreInit();

	//	INIT MASTHEAD
	InitMH();
}

"use strict"

var collapsed_panel;
var btnExpandCTA_dc;

var expanded_panel;
var btnCloseCTA_dc;

function clickExpandCTA(){
	Enabler.requestExpand();
}

function clickCloseCTA(){
	Enabler.reportManualClose();
	Enabler.requestCollapse();
}

function addListeners(){

	btnExpandCTA_dc.addEventListener('click', clickExpandCTA, false);
	btnCloseCTA_dc.addEventListener('click', clickCloseCTA, false);

	// Expand Event Listeners
	Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START,expandStart);
	Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH,expandFinish);

	// Collapse Event Listeners
	Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START,collapseStart);      Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH,collapseFinish);
}

function expandStart() {
/*	Enabler.counter("Creative Expanded");*/
	Enabler.finishExpand();


	//$mainPanel.addClass("expanded");
}

function expandFinish() {
	panelExpanded = true;
	siteCore.apps.mastheadUX.changeView("expand");
	Enabler.counter("Creative Expanded");
}



function collapseStart() {

	Enabler.finishCollapse();
	gameSound.stopSounds();
	stopCamera();
}



function collapseFinish() {
	//$mainPanel.removeClass("expanded");
	panelExpanded = false;

	siteCore.apps.mastheadUX.changeView("collapse");
	Enabler.counter("Creative Collapsed");
}

//This function should be called only after the Enabler.isInitialized
function InitMH(){

	/*Offset of left,top and width height, respectively, of the expanded Masthead.
	 The expansion of a Masthead is only from 970x250 -> 970x500, so this configuration will not change*/
	Enabler.setExpandingPixelOffsets(0, 0, 970, 500);

	//Assign Variables
	collapsed_panel=document.getElementById("collapsed-panel");
	btnExpandCTA_dc = document.getElementById("ctaExpand_dc");

	expanded_panel=document.getElementById("expanded-panel");
	btnCloseCTA_dc = document.getElementById("ctaClose_dc");

	//Adding listeners
	addListeners();


	//	ADD EXITS
	document.getElementById('abarth-logo').addEventListener('click', bgExitHandlerAbarthLogo, false);
	document.getElementById('end-game-cta').addEventListener('click', bgExitHandlerEndGameCTA, false);
}


function bgExitHandlerAbarthLogo(e) {

	/* If you have videos, make sure to stop all of them. Check the YouTube Player implementation section of this guide. */

	stopCamera();

	/* If the masthead is expandable, make sure that it collapses using: */
	if (panelExpanded) {
		Enabler.exitOverride('Abarth Logo Exit - Expanded', abarthLogoExpandedLinkURL);
		isStudioExit = true;
		Enabler.requestCollapse();
	} else {
		Enabler.exitOverride('Abarth Logo Exit - Collapsed', abarthLogoCollapsedLinkURL);
	};

}

function bgExitHandlerEndGameCTA(e) {

	/* If you have videos, make sure to stop all of them. Check the YouTube Player implementation section of this guide. */

	stopCamera();

	/* If the masthead is expandable, make sure that it collapses using: */
	if (panelExpanded) {
		Enabler.exitOverride('Book A Test Drive Exit - End Panel', BookATestDriveLinkURL);
		isStudioExit = true;
		viewStatus = 'play';
		Enabler.requestCollapse();
	};

}
