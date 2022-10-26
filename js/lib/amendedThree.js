Object.assign(THREE.Vector3.prototype, {
	set: function ( x, y, z ) {
		if (x instanceof THREE.Vector3){
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
		}
		else {
			this.x = x;
			this.y = y;
			this.z = z;
		}
		return this;
	},
});
Object.assign(THREE.Quaternion.prototype, {
	set: function ( x, y, z, w ) {
		if (x instanceof THREE.Quaternion){
			this._x = x._x;
			this._y = x._y;
			this._z = x._z;
			this._w = x._w;
		} else {
			this._x = x;
			this._y = y;
			this._z = z;
			this._w = w;
		}
		this._onChangeCallback();
		return this;
	},
});
Object.assign(THREE.Matrix4.prototype, {
	getRotation: function(rotation,normalizeAxes){
		if (rotation == undefined) { 
			var return_v = new THREE.Quaternion();
			return return_v.setFromRotationMatrix(this);
		} else {
			return rotation.setFromRotationMatrix(this,normalizeAxes);
		}
	},	
	setPosition: function ( v, y, z ) {
		var te = this.elements;
		if (v instanceof THREE.Vector3)
		{
			te[ 12 ] = v.x;
			te[ 13 ] = v.y;
			te[ 14 ] = v.z;
		}
		else
		{
			te[ 12 ] = v;
			te[ 13 ] = y;
			te[ 14 ] = z;
		}
		return this;
	},	
	scale: function ( v, v2, v3 ) {
		var te = this.elements;
		if (v instanceof THREE.Vector3){			
			var x = v.x, y = v.y, z = v.z;
		}
		else{
			var x = v, y = v2, z = v3;
		}
		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;
		return this;
	},	
	getFrontVector: function() {
		var te = this.elements;
		var V = new THREE.Vector3( -te[ 8 ], -te[ 9 ], -te[ 10 ] );
		return V;
	},
	getRightVector: function() {
		var te = this.elements;
		var V = new THREE.Vector3( te[ 0 ], te[ 1 ], te[ 2 ] );
		return V;
	},
	getUpVector: function() {
		var te = this.elements;
		var V = new THREE.Vector3( te[ 4 ], te[ 5 ], te[ 6 ] );
		return V;
	}
});
