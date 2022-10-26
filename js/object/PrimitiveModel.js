var GLOBAL = GLOBAL || {};
define([
	"object/CollisionElement",
],
function (
	CollisionElement,
) {
	class PrimitiveModel extends THREE.Mesh {
		constructor(geometry, materials) {
			super(geometry, materials);
		}
	}

	PrimitiveModel.make = function(modelName, wset) {
        var return_v;
        var CE;
        var MM = new Ammo.btTransform();
        var translation1;var rotation1;var scale1;


        var mass = 0;
        var bounding = new THREE.Mesh();
        var compound_shape = new Ammo.btCompoundShape(true);

        if (modelName == "someBox") {
			var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
			var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );      	
			return_v = new PrimitiveModel( geometry, material );
            mass = 1;

			/******************** 1 unit *********************/
			CE = CollisionElement.make("box", 1.5, 1.5, 1.5);
            translation1 = new THREE.Vector3(0, 0, 0);
            rotation1 = new THREE.Quaternion();
            scale1 = new THREE.Vector3(1, 1, 1);
            MM.setIdentity();MM.setOrigin(threeToBullet(translation1));MM.setRotation(threeToBulletQ(rotation1));
            CE.bounding.position.set(translation1);
            CE.bounding.quaternion.set(rotation1);
            CE.bounding.scale.set(scale1);

            bounding.add(CE.bounding);

            compound_shape.addChildShape(MM, CE.collision);  
            /******************** 1 unit *********************/           
        } else if (modelName == "someSphere") {
			var geometry = new THREE.SphereGeometry( 1, 32, 32 );
			var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );        	
			return_v = new PrimitiveModel( geometry, material );
            mass = 1;

			/******************** 1 unit *********************/
			CE = CollisionElement.make("sphere", 2);
            translation1 = new THREE.Vector3(0, 0, 0);
            rotation1 = new THREE.Quaternion();
            scale1 = new THREE.Vector3(1, 1, 1);
            MM.setIdentity();MM.setOrigin(threeToBullet(translation1));MM.setRotation(threeToBulletQ(rotation1));
            CE.bounding.position.set(translation1);
            CE.bounding.quaternion.set(rotation1);
            CE.bounding.scale.set(scale1);

            bounding.add(CE.bounding);

            compound_shape.addChildShape(MM, CE.collision);  
            /******************** 1 unit *********************/  
        }

        if (mass == 0) {
            return_v.canMove = false;
        } else {
            return_v.canMove = true;
        }

        return_v.bounding_line = bounding;

        var localInertia = new Ammo.btVector3( 0, 0, 0 );
        compound_shape.calculateLocalInertia( mass, localInertia );
        var transform = new Ammo.btTransform();
        transform.setIdentity();

        var motionState = new Ammo.btDefaultMotionState( transform ); 
        var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, compound_shape, localInertia );

        return_v.collision_body = new Ammo.btRigidBody( rbInfo );

        return return_v;        
	}

	function threeToBullet(v){
    	return new Ammo.btVector3(v.x,v.y,v.z);
    }

    function threeToBulletQ(q){
    	return new Ammo.btQuaternion(q.x,q.y,q.z,q.w);
    }	

    return PrimitiveModel;	
});