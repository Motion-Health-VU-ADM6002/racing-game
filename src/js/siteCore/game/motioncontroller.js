var listenerActive = false;
var cameraActive = false;
var cameraAvailable = false;
var motionTrackingActive = false;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

if (navigator.getUserMedia) {
	cameraAvailable = true;
} else {
	cameraAvailable = false;
}


function checkCameraStatus () {
	// check for camerasupport
	if (cameraAvailable) {
		// set up stream

		
		startMotionTracking();


/*		var videoSelector = {video : true};
		if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
			var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
			if (chromeVersion < 20) {
				videoSelector = "video";
			} else {
			};
		};

		navigator.getUserMedia(videoSelector, function( stream ) {
			if (videoInput.mozCaptureStream) {
				videoInput.mozSrcObject = stream;
			} else {
				videoInput.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
			};
			startMotionTracking();
			cameraActive = true;
			siteCore.apps.viewAnimations.animateInstructionsUpdate('#move-left');

		}, function() {
			siteCore.apps.viewAnimations.animateInstructionsUpdate('#how-to-play-keyboard');
		});*/
	};
};







// set up video and canvas elements needed

var videoInput = document.getElementById('outputVideo');
var canvasInput = document.getElementById('inputVideo');
var canvasOverlay = document.getElementById('motion-track-overlay')
var overlayContext = canvasOverlay.getContext('2d');
var htracker;

//	RESET WIDTH AFTER LOAD
$('#outputVideo').width(160);

var trackingWidth = 160;
var centerLeft = 65;
var centerRight = 95;
var difference = 0;
var minMoveDistance = 1;



//	FEEDBACK
$right = $('#right-motion-area');
$center = $('#center-motion-area');
$left = $('#left-motion-area');
$motionLine = $('#motion-line');

$motionControlHelper = $('#motion-control-helper');





function headTrackMotion(event) {

		// clear canvas
		overlayContext.clearRect(0,0,160,120);
		// once we have stable tracking, draw rectangle
		if (event.detection == "CS") {
			overlayContext.translate(event.x, event.y)
			overlayContext.rotate(event.angle-(Math.PI/2));
			overlayContext.strokeStyle = "#00CC00";
			overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
			overlayContext.rotate((Math.PI/2)-event.angle);
			overlayContext.translate(-event.x, -event.y);
		};



		if (motionTrackingActive && !gamePaused) {

			var trackedPoint = event.x;

			siteCore.apps.debugConsole.debugValue('motion-controller-input', trackedPoint);

			$motionLine.css({left:  trackingWidth - trackedPoint});

			if (trackedPoint > centerRight) {

				motionControllerOutputValue = ((trackedPoint - centerRight) / centerLeft);

				if (!keyDown) {
					keyLeft = true;
					keyRight = false;
				};

				siteCore.apps.debugConsole.debugValue('input-direction', "LEFT");

				$right.css({opacity: 0.5});
				$center.css({opacity: 0.5});
				$left.css({opacity: 0.75});

				siteCore.apps.viewAnimations.instructionsTester("left");

			} else if (trackedPoint < centerLeft) {

				siteCore.apps.debugConsole.debugValue('input-direction', "RIGHT");

				motionControllerOutputValue = ((centerLeft - trackedPoint) / centerLeft);

				if (!keyDown) {
					keyLeft = false;
					keyRight = true;
				};

				$right.css({opacity: 0.75});
				$center.css({opacity: 0.5});
				$left.css({opacity: 0.5});

				siteCore.apps.viewAnimations.instructionsTester("right");

			} else {

				siteCore.apps.debugConsole.debugValue('input-direction', "UP");

				$right.css({opacity: 0.5});
				$center.css({opacity: 0.75});
				$left.css({opacity: 0.5});

				motionControllerOutputValue = 0;

				siteCore.apps.debugConsole.debugValue('game-paused', playerInput);

				if (!keyDown) {
					keyFaster = true;
					keyLeft = false;
					keyRight = false;
				};

				siteCore.apps.viewAnimations.instructionsTester("up");
			};


			siteCore.apps.debugConsole.debugValue('motion-controller-output', motionControllerOutputValue);

		} else {

			siteCore.apps.debugConsole.debugValue('input-direction', "NO DATA");

			$right.css({opacity: 0.5});
			$center.css({opacity: 0.75});
			$left.css({opacity: 0.5});

		};
}



function startMotionTracking() {

	if (cameraActive && cameraStopped || !cameraActive) {
		// the face tracking setup
		htracker = new headtrackr.Tracker({
			//calcAngles : true,
			ui : false,
			headPosition : true
		});

		htracker.init(videoInput, canvasInput);
		htracker.start();
		motionTrackingActive = true;
	} else {
		if (viewStatus == "instructions") {
			Enabler.counter("Navigated to Move Left Motion Instructions - allowed camera");
			siteCore.apps.viewAnimations.animateInstructions('#move-left');
			startCamera();
		};
	};

	
	


	

	// for each facetracking event received draw rectangle around tracked face on canvas
	if (!listenerActive) {

		listenerActive = true;
		document.addEventListener("facetrackingEvent", headTrackMotion);

	};

};





