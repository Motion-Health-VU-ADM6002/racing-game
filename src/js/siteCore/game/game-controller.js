var raceStarted = false;
var cameraStopped = false;

//	TOGGLE PLAYER CONTROL ON AND OFF
function playerInputStatus ($state) {
	if ($state) {
		playerInput = true;
		keyFaster = true;
	} else {
		playerInput = false;
	};
};

function resetPlayerPosition () {
	speed = 0;
	position = 0;
	playerX = 0;
	currentLap = 1;
	currentLapTime = 0;
	lapStarted = false;
}

var gamePaused = false;

function pauseGame ($status) {
	gamePaused = $status;
};


function stopCamera () {
	if (motionTrackingActive && !cameraStopped) {
		motionControllerOutputValue = 0;
		htracker.stop();
		htracker.stopStream();
		cameraStopped = true;

	};
}

function startCamera () {
	if (motionTrackingActive && cameraStopped) {
		motionControllerOutputValue = 0;
		startMotionTracking();
	};
}



//	TIMER FLASH


var time_flash_timeline = new TimelineLite({
	onComplete: function() {
		this.restart();
	}
});

function timerFlash() {
	timerFlashActive = true;
	time_flash_timeline.to(
		$lapTime,
		anim_fast,
		{
			opacity: 0
		}
	);

	time_flash_timeline.to(
		$lapTime,
		anim_fast,
		{
			opacity: 1
		}
	);

	window.setTimeout(timerFlashClear, timerFlashTime);
};


function timerFlashClear() {
	time_flash_timeline.clear();
	timerFlashActive = false;
}

