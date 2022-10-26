var GLOBAL = GLOBAL || {};
define([

	],
function (

	) {
	var loader1, loader2, loader3, loader4, loader5;
	var totalItemNum = 2;
	var loadedItemNum = 0;
	var Loading = function(){
		//중간 함수를 조절하면 부드럽게 할수 있음
		loader1 = new THREE.GLTFLoader();
		loader1.load( './assets/model/human1.glb', function ( gltf ) {
			GLOBAL.model1 = gltf;
			loadedItemNum++;
			callbackProgress();			
		}, undefined, function (error) {
			console.error(error);
		});
		loader2 = new THREE.GLTFLoader();
		loader2.load( './assets/model/Monster.glb', function ( gltf ) {
			GLOBAL.model2 = gltf;
			loadedItemNum++;
			callbackProgress();			
		}, undefined, function (error) {
			console.error(error);
		});

		var callbackProgress = function(){
			var fs = parseInt($("html").css("font-size"));
			var bar = 20*fs;
			bar = Math.floor( bar * loadedItemNum / totalItemNum );
			$("#bar").css('width', bar);

			if (loadedItemNum == totalItemNum){
				GLOBAL.where = WHERE.MAIN_PAGE;
				$("#Loading_page").css("display","none");
			}
		}								
	}
	Loading.prototype = {
        constructor: Loading,
        render: function() {

        },
	}
	return Loading;
});