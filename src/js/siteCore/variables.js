//	MASTHEAD MASTER
var panelExpanded = false;
var $mainPanel = $('#main-panel');


//	STUDIO TRACKING
var playTimerStopped = true;


//	SOUND
var soundNotSupported = false;
var soundMuted = false;
var carSound = "low";

//	MOTION TRACKING
var trackingLost = true;


//	CONTROLS
var keyLeft        = false;
var keyRight       = false;
var keyFaster      = false;
var keySlower      = false;


//  MOTION INSTRUCTIONS
var instructionsAnimatedIn = false;
var motionInstructionsActive = false;
var instructionsFinished = true;
var motionInstructionsLeft = true;


function playTimerStop () {
	if (!playTimerStopped) {
		playTimerStopped = true;
		Enabler.stopTimer("Playing Game");
	};
};

function playTimerStart () {
	if (playTimerStopped) {
		playTimerStopped = false;
		Enabler.startTimer("Playing Game");
	};
};

var isStudioExit = false;

//	ANIMATION SPEEDS
var waitTime_frame_1 	= 4;
var waitTime_frame_2 	= 4;

var anim_box_in			= 0.65;
var anim_box_wait		= 0.55;

var anim_sheen_move		= 0.2;
var anim_sheen_wait 	= 0.1;

var anim_fast 			= 0.25;
var anim_fast_x2 		= (anim_fast*2);
var anim_fast_third		= (anim_fast/3);
var anim_fast_half		= (anim_fast/2);
var anim_fast_2_third	= (anim_fast*0.66);

var anim_med 			= 0.75;
var anim_med_x2 		= (anim_med*2);

var anim_slow 			= 3;
var anim_slow_x2		= (anim_slow*2);

var bg_in				= 9;
var bg_out				= 9;
var bg_wait				= 0;
var bg_full_length		= bg_in + bg_out + bg_wait;

var raceStarterTime 	= 0.75;


var finishRaceWaitTime 	= 3;



//	MATHS
function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}