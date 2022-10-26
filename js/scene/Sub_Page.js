var GLOBAL = GLOBAL || {};
define([

    ],
function (

    ) {

	var scene;
	var camera;
	var renderer;
	var cube;

    var Sub_Page = function(){

		//initial area
		$("#WebGL_space").css("display","block");
		scene = new THREE.Scene(); 
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
		renderer = new THREE.WebGLRenderer(); 
		renderer.setSize( window.innerWidth, window.innerHeight ); 
		document.getElementById("WebGL_space").appendChild( renderer.domElement );
		var controls = new THREE.OrbitControls( camera, renderer.domElement );
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set(50,10,50);
		scene.add( directionalLight );
		var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight2.position.set(-50,-10,-50);
		scene.add( directionalLight2 );
		var gridHelper = new THREE.GridHelper( 20, 20 );
		scene.add( gridHelper );
		var axesHelper = new THREE.AxesHelper( 5 );
		scene.add( axesHelper );

		var monster1 = GLOBAL.model2.scene;
		monster1.scale.set(0.1,0.1,0.1);
		scene.add(monster1);

		camera.position.set(5,5,5);
		camera.lookAt(new THREE.Vector3());
		
		$("#WebGL_space button").text("move main menu");
		$("#WebGL_space button").css("display","block");
        $("#WebGL_space button").off("mouseup");
        $("#WebGL_space button").on("mouseup",function() { 
        	document.getElementById("WebGL_space").removeChild( renderer.domElement );
        	GLOBAL.where = WHERE.MAIN_PAGE; 
        });	
		//initial area

    }

    Sub_Page.prototype = {
        constructor: Sub_Page,
        render: function(delta) {

            renderer.render(scene,camera);
        },
    }

    return Sub_Page;
    

});