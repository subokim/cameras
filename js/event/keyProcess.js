var GUPPY = GUPPY || {};
define([
	
	],
function (

	) {

	var listener = new window.keypress.Listener();

	listener.register_combo({ "prevent_repeat" : true, "keys" : "w", "on_keydown" : 
	function(){
		allStop();
		var clip = THREE.AnimationClip.findByName(GLOBAL.clips, 'walk');
		var action = GLOBAL.mixer.clipAction(clip);
		action.play();
		}, 
	});
	listener.register_combo({ "prevent_repeat" : true, "keys" : "r", "on_keydown" : 
	function(){
		allStop();
		var clip = THREE.AnimationClip.findByName(GLOBAL.clips, 'run');
		var action = GLOBAL.mixer.clipAction(clip);
		action.play();
		}, 
	});
	listener.register_combo({ "prevent_repeat" : true, "keys" : "s", "on_keydown" : 
	function(){
		allStop();
		var clip = THREE.AnimationClip.findByName(GLOBAL.clips, 'idle');
		var action = GLOBAL.mixer.clipAction(clip);
		action.play();
		}, 
	});

	function allStop(){
		GLOBAL.clips.forEach(function(clip) {
			GLOBAL.mixer.clipAction(clip).stop();
		});
	}

});