var GLOBAL = GLOBAL || {};
define([
	"event/keyProcess", "object/PrimitiveModel", 
    ],
function (
	keyProcess, PrimitiveModel, 
    ) {

	var scene;
	var camera;
	var renderer;
	var wset;

    var Main_Page = function(){

		//initial area
		$("#WebGL_space").css("display","block");
		scene = new THREE.Scene(); 
		GLOBAL.scene = scene;
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

		//camera.position.set(5,5,5);
		camera.position.set(5,5,5);
		camera.lookAt(new THREE.Vector3());
		//camera.rotation.x = 10 * Math.PI/180;

		var character = new THREE.Group();

		//var geometry = new THREE.BoxGeometry( 1, 2, 1 );
		//var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
		//var cube = new THREE.Mesh( geometry, material );
		//character.add( cube );

		//var geometry = new THREE.ConeGeometry( 0.5, 1.5, 32 );
		//var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
		//var cone = new THREE.Mesh( geometry, material );
		//character.add( cone );

		var geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		var cyclinder = new THREE.Mesh( geometry, material );
		character.add( cyclinder );
		
		//cube.position.x = 1;
		//cone.rotation.x = - 90 * Math.PI/180;
		
		//cube.position.y = 1;
		//cube.rotation.y = 10 * Math.PI/180;
		
		//cube.position.z = 1;
		//cube.rotation.z = 10 * Math.PI/180;

		scene.add( character );

		character.matrixAutoUpdate = false;

		var position = new THREE.Vector3(3, 3, 3);
		character.matrix.setPosition(position);

		var eye = position.clone();
		var target = new THREE.Vector3(0, 0, 0);
		var up = new THREE.Vector3(0, 1, 0);
		character.matrix.lookAt(eye, target, up);

		console.log(character.matrix.getFrontVector());
		console.log(character.matrix.getRightVector());
		console.log(character.matrix.getUpVector());


		$("#WebGL_space button").text("move sub menu");
		$("#WebGL_space button").css("display","block");
        $("#WebGL_space button").off("mouseup");
        $("#WebGL_space button").on("mouseup",function() { 
        	document.getElementById("WebGL_space").removeChild( renderer.domElement );
        	GLOBAL.where = WHERE.SUB_PAGE;
			
        });	
		//initial area

    }

    Main_Page.prototype = {
        constructor: Main_Page,
        render: function(delta) {
            renderer.render(scene,camera);
        },
    }

    return Main_Page;
    

});