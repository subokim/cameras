var GLOBAL = GLOBAL || {};
Ammo().then(function(Ammo) {
	require(["mainRender"],
	function(mainRender){
		var MyApp = new mainRender();
	});
});

