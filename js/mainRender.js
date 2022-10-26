var GLOBAL = GLOBAL || {};
define([
	"scene/Loading", "scene/Main_Page", "scene/Sub_Page",
	],
function (
	Loading, Main_Page, Sub_Page,
	) {
	var mainRender = function(){

		//initial area
		var clock = new THREE.Clock();
		GLOBAL.where = WHERE.LOADING;
		var page = {};
		//initial area

		//rendering
		function render()
		{
			if (GLOBAL.where != GLOBAL.old_where) {
				if (GLOBAL.where == WHERE.LOADING) {
					page = new Loading();
				} else if (GLOBAL.where == WHERE.MAIN_PAGE) {
					page = new Main_Page();
				}
				else if (GLOBAL.where == WHERE.SUB_PAGE) {
					page = new Sub_Page();
				} 
				GLOBAL.old_where = GLOBAL.where;
			}//scene selector

			var delta = clock.getDelta();

			page.render(delta);
			requestAnimationFrame(render);
		}
		render();
		//rendering
	}
	return mainRender;
});