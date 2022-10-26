var MathUtils = {
	bullet2three(bullet) {
		if (bullet instanceof Ammo.btVector3){
			return new THREE.Vector3( bullet.x(), bullet.y(), bullet.z() );
		} else if (bullet instanceof Ammo.btQuaternion){
			return new THREE.Quaternion( bullet.x(), bullet.y(), bullet.z(), bullet.w() );
		} else if (bullet instanceof Ammo.btTransform){
			var return_v = new THREE.Matrix4();
            var p = bullet.getOrigin();
            var q = bullet.getRotation();
            return_v.makeRotationFromQuaternion(new THREE.Quaternion( q.x(), q.y(), q.z(), q.w()));
            return_v.setPosition( p.x(), p.y(), p.z() );
            return return_v;
		} else {
			throw 'wrong arg';
		}
    },
    three2bullet(three) {
		if (three instanceof THREE.Vector3){
			return new Ammo.btVector3( three.x, three.y, three.z );
		} else if (three instanceof THREE.Quaternion){
			return new Ammo.btQuaternion( three.x, three.y, three.z, three.w );
		} else if (three instanceof THREE.Matrix4){
			var return_v = new Ammo.btTransform();
			return_v.setIdentity();
			var temp_v = three.getPosition();
			var temp_r = new THREE.Quaternion();
			three.getRotation(temp_r,true); 
			return_v.setOrigin(new Ammo.btVector3( temp_v.x, temp_v.y, temp_v.z ));
            return_v.setRotation(new Ammo.btQuaternion( temp_r.x, temp_r.y, temp_r.z, temp_r.w));
			return return_v;				
		} else {
			throw 'wrong arg';
		}	
    },
};