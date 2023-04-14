var $muteBtn = $('.hud-sound');

//  SET FILE FORMAT TYPE
  var fileFormat = "mp3";
  var mp3Test = new Audio();

  var canPlayMP3 = (typeof mp3Test.canPlayType === "function" && mp3Test.canPlayType("audio/mpeg") !== "");

  if (!canPlayMP3) {
    //fileFormat = "ogg";
	soundNotSupported = true;
  }



//  SOUNDS

var beep = new Audio($('#beep-audio source').attr('src'));
var go = new Audio($('#go-audio source').attr('src'));

var success = new Audio($('#success-audio source').attr('src'));

var impact = new Audio($('#car-impact-audio source').attr('src'));

/*var carRunLow = new Audio($('#car-run-audio-low source').attr('src'));
var carRunLow2 = new Audio($('#car-run-audio-low source').attr('src'));

var carRunMediumLow = new Audio($('#car-run-audio source').attr('src'));
var carRunMediumLow2 = new Audio($('#car-run-audio source').attr('src'));

var carRunMedium = new Audio($('#car-run-audio-medium source').attr('src'));
var carRunMedium2 = new Audio($('#car-run-audio-medium source').attr('src'));

var carRunMediumHigh = new Audio($('#car-run-audio-medium-high source').attr('src'));
var carRunMediumHigh2 = new Audio($('#car-run-audio-medium-high source').attr('src'));

var carRunHigh = new Audio($('#car-run-audio-high source').attr('src'));
var carRunHigh2 = new Audio($('#car-run-audio-high source').attr('src'));



var soundStartTime = 2.75;

var soundTransitionTime = 0.1;

var carRunLowSoundStarted = false;

var firstSample = true;
var secondSampleStarted = false;

var crossFadeTime = 0.3;
var crossFadeStarted = false;

var currentSoundfx1 = carRunLow;
var currentSoundfx2 = carRunLow2;

var nextSoundfx1 = carRunLow;
var nextSoundfx2 = carRunLow2;

var soundSwitch = false;

var currentChangeSampleTime = soundStartTime;

function changeCarSoundFX ($carSpeed) {
  if ($carSpeed == 0 && nextSoundfx1 != carRunLow) {
    nextSoundfx1 = carRunLow;
    nextSoundfx2 = carRunLow2;
	soundSwitch = true;
  } else if ($carSpeed == 1 && nextSoundfx1 != carRunMediumLow) {
    nextSoundfx1 = carRunMediumLow;
    nextSoundfx2 = carRunMediumLow2;
	soundSwitch = true;;
  } else if ($carSpeed == 2 && nextSoundfx1 != carRunMedium) {
    nextSoundfx1 = carRunMedium;
    nextSoundfx2 = carRunMedium2;
	soundSwitch = true;
  } else if ($carSpeed == 3 && nextSoundfx1 != carRunMediumHigh) {
    nextSoundfx1 = carRunMediumHigh;
    nextSoundfx2 = carRunMediumHigh2;
	soundSwitch = true;
  } else if ($carSpeed == 4 && nextSoundfx1 != carRunHigh) {
    nextSoundfx1 = carRunHigh;
    nextSoundfx2 = carRunHigh2;
	soundSwitch = true;
  };
};

//var debugSound = false;
var engineSoundPause = true;
var pauseTriggered = false;

function lowEngineFade () {
		if (engineSoundPause) {
			if (!pauseTriggered) {
				return;
			};
			currentSoundfx1.pause();
			currentSoundfx1.currentTime = 0;
			currentSoundfx2.pause();
			currentSoundfx2.currentTime = 0;
			carRunLowSoundStarted = false;
			firstSample = true;
			secondSampleStarted = false;
			console.log('pause true');
			pauseTriggered = false;
			return;
		};

		if (!carRunLowSoundStarted && !engineSoundPause) {
			currentSoundfx1 = nextSoundfx1;
			currentSoundfx2 = nextSoundfx2;
			currentSoundfx1.volume = 1;
			currentSoundfx1.play();
			carRunLowSoundStarted = true;
		};




		if (firstSample) {

			if(!secondSampleStarted && soundSwitch) {
				currentChangeSampleTime = currentSoundfx1.currentTime;
			} else if (!secondSampleStarted) {
				currentChangeSampleTime = soundStartTime;
			};



			if (currentSoundfx1.currentTime > currentChangeSampleTime) {

				if (!secondSampleStarted) {
					currentSoundfx2 = nextSoundfx2;
					currentSoundfx2.currentTime = 0;
					currentSoundfx2.volume = 0;
					currentSoundfx2.play();
					secondSampleStarted = true;
					soundSwitch = false;
				};


				if (currentSoundfx1.currentTime > currentChangeSampleTime+crossFadeTime) {
					crossFadeStarted = true;
					//  FADE SOUND 1
					var thisVolume = currentSoundfx1.volume;
					thisVolume -= soundTransitionTime;
					if (thisVolume < 0) {
						thisVolume = 0;
						firstSample = false;
						soundSwitch = false;
						crossFadeStarted = false;
						currentSoundfx1 = nextSoundfx1;
					};
					currentSoundfx1.volume = round(thisVolume, 2);
				};

				//  FADE SOUND 2
				thisVolume = currentSoundfx2.volume;
				thisVolume += soundTransitionTime;
				if (thisVolume > 1) {
					thisVolume = 1;
				};
				currentSoundfx2.volume = round(thisVolume, 2);

			};


		} else {


			if(secondSampleStarted && soundSwitch) {
				currentChangeSampleTime = currentSoundfx2.currentTime;
			} else if (secondSampleStarted) {
				currentChangeSampleTime = soundStartTime;
			};

			if (currentSoundfx2.currentTime > currentChangeSampleTime) {

				if (secondSampleStarted) {
					currentSoundfx1 = nextSoundfx1;
					currentSoundfx1.currentTime = 0;
					currentSoundfx1.volume = 0;
					currentSoundfx1.play();
					secondSampleStarted = false;
					soundSwitch = false;
				};

				if (currentSoundfx2.currentTime > currentChangeSampleTime+crossFadeTime) {
					crossFadeStarted = true;
					//  FADE SOUND 1
					var thisVolume = currentSoundfx2.volume;
					thisVolume -= soundTransitionTime;
					if (thisVolume < 0) {
						thisVolume = 0;
						firstSample = true;
						soundSwitch = false;
						crossFadeStarted = false;
						currentSoundfx2 = nextSoundfx2;
					};
					currentSoundfx2.volume = round(thisVolume, 2);
				}

				//  FADE SOUND 2
				thisVolume = currentSoundfx1.volume;
				thisVolume += soundTransitionTime;
				if (thisVolume > 1) {
					thisVolume = 1;
				};
				currentSoundfx1.volume = round(thisVolume, 2);

			};
		};

		siteCore.apps.debugConsole.debugValue('sound-1-time', currentSoundfx1.src + " : " + round(currentSoundfx1.currentTime, 2));
		siteCore.apps.debugConsole.debugValue('sound-2-time', currentSoundfx2.src + " : " + round(currentSoundfx2.currentTime, 2));
		siteCore.apps.debugConsole.debugValue('sound-1-volume', round(currentSoundfx1.volume, 2));
		siteCore.apps.debugConsole.debugValue('sound-2-volume', round(currentSoundfx2.volume, 2));




  



};
 */

var carRunStartLoop = 1;
var carRunEndLoop = 7;
var carModulationMax = 1.9;
//var carModulationMin = 0.25;

var carSpeedAudioRate = 0.5;

var carModulationMin = 0.5;
var carModulationDifference = carModulationMax-carModulationMin;

// define variables

"use strict"

function audioContextCheck() {
	if (typeof AudioContext !== "undefined") {
		return new window.AudioContext();
	} else if (typeof webkitAudioContext !== "undefined") {
		soundNotSupported = true;
		return new window.webkitAudioContext();
	} else if (typeof mozAudioContext !== "undefined") {
		return new mozAudioContext();
	} else {
		// Do stuff with soundmanager or something else if Web Audio API is not supported
		soundNotSupported = true;
	}
}

var audioCtx = audioContextCheck();

//var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//var audioCtx = new AudioContext();
var source;
var songLength;


// use XHR to load an audio track, and
// decodeAudioData to decode it and stick it in a buffer.
// Then we put the buffer into the source

function getEngineBufferData() {
  source = audioCtx.createBufferSource();
  source.type= 'audio/mpeg';
  request = new XMLHttpRequest();

  //request.open('GET', 'audio/car-run.mp3', true);
  request.open('GET', $('#car-run-audio source').attr('src'), true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer;
        songLength = buffer.duration;
        source.buffer = myBuffer;
        source.playbackRate.value = carSpeedAudioRate;
        source.connect(audioCtx.destination);
        source.loop = true;

        //loopstartControl.setAttribute('max', Math.floor(songLength));
        //loopendControl.setAttribute('max', Math.floor(songLength));
        source.loop = true;
        source.loopStart = carRunStartLoop;
        source.loopEnd = carRunEndLoop;
      },

      function(e){
	  });

  }

  request.send();
}



var gameSound = {};

gameSound.active = false;

gameSound.runCar = function () {
  if(!soundMuted && gameSound.active && !soundNotSupported) {
    getEngineBufferData();
	  source.start ? source.start(0) : source.noteOn(0);
  } else if (!soundMuted && gameSound.active && soundNotSupported) {
/*	pauseTriggered = false;
  	engineSoundPause = false;*/
  };
};

gameSound.stopCar = function () {
	if(!soundNotSupported) {
		source.stop ? source.stop(0) : source.noteOff(0);
	} else if(soundNotSupported) {
/*		pauseTriggered = true;
		engineSoundPause = true;*/
  };
};

gameSound.play = function ($sound) {
  if(!soundMuted && gameSound.active) {
    $sound.pause();
    $sound.currentTime = 0;
    $sound.play();
  };
};

gameSound.playForced = function ($sound) {
    $sound.pause();
    $sound.currentTime = 0;
    $sound.play();
};

gameSound.startSounds = function () {
  gameSound.active = true;
  gameSound.runCar();
};

gameSound.stopSounds = function () {
  gameSound.active = false;
  gameSound.stopCar();
};


gameSound.muteSound = function ($status) {

  if($status == 'toggle') {
    if (soundMuted) {
      soundMuted = false;
    } else {
      soundMuted = true;
    };
  } else {
    soundMuted = $status;
  };
  
  if (soundMuted) {
    gameSound.stopCar();
	$(".hud-sound-muted").css({visibility: 'visible'});
	$(".hud-sound-unmuted").css({visibility: 'hidden'});
  } else if (!soundMuted && gameSound.active) {
    gameSound.runCar();
	  $(".hud-sound-muted").css({visibility: 'hidden'});
	  $(".hud-sound-unmuted").css({visibility: 'visible'});
  };
  
}
