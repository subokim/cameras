var GLOBAL = GLOBAL || {};
define([],
function () {
	class CollisionElement {
		constructor() {
			this.bounding = {};
			this.collision = {};
		}
	}
	CollisionElement.make = function() {
        var name = arguments[0];
        var point = [];
        for (var i= 1;i<arguments.length;i++) point.push(arguments[i]);
        var newElement = new CollisionElement();
        var bounding_geometry;
        var bounding_material = new THREE.MeshBasicMaterial({color:"#ff0000",wireframe:true});
        var node;

        try {
            if (name == "box2d") {
                if (point.length != 3) throw exception;
                bounding_geometry = new THREE.BoxGeometry( point[0], point[1], point[2] );
                node = new THREE.Mesh( bounding_geometry, bounding_material );
                newElement.bounding = node;
                newElement.collision = new Ammo.btBoxShape(new Ammo.btVector3(point[0] / 2, point[1] / 2, point[2] / 2));
            } else if (name == "box") {
                if (point.length != 3) throw exception;
                bounding_geometry = new THREE.BoxGeometry( point[0], point[1], point[2] );
                node = new THREE.Mesh( bounding_geometry, bounding_material );
                newElement.bounding = node;
                newElement.collision = new Ammo.btBoxShape(new Ammo.btVector3(point[0] / 2, point[1] / 2, point[2] / 2));
            } else if (name == "sphere") {
                if (point.length !=1) throw exception;
                bounding_geometry = new THREE.SphereGeometry( point[0] / 2, 32, 32 );
                node = new THREE.Mesh( bounding_geometry, bounding_material );
                newElement.bounding = node;
                newElement.collision = new Ammo.btSphereShape(point[0]/2);
            } else if (name == "cone") { //libgdx width, height, depth 라는데.

            } else if (name == "capsule") {

            } else if (name == "cylinder") {
                if (point.length !=3) throw exception; //libgdx width, height, depth 라는데. //three radius,radius,height
                bounding_geometry = new THREE.CylinderGeometry( point[0] / 2, point[0] / 2, point[1], 32 );
                node = new THREE.Mesh( bounding_geometry, bounding_material );
                newElement.bounding = node;
                newElement.collision = new Ammo.btCylinderShape(new Ammo.btVector3(point[0]/2, point[0]/2, point[1]/2));
            } else if (name == "diamond") {
                var a1, a2, a3, a4, a5, a6;
                var va1, va2, va3, va4, va5, va6;
                if (point.length != 5) throw exception;

                var width = point[0] / 2;
                var height = point[1] / 2;
                var depth = point[2] / 2;
                var offset1 = point[3];
                var offset2 = point[4];

                a1 = new THREE.Vector3(-width, 0, 0); //왼쪽
                a2 = new THREE.Vector3(width, 0, 0); //오른쪽
                a3 = new THREE.Vector3(offset1, height+offset2, 0); //위
                a4 = new THREE.Vector3(offset1, -height+offset2, 0); //아래
                a5 = new THREE.Vector3(offset1, 0, depth); //앞
                a6 = new THREE.Vector3(offset1, 0, -depth); //뒤
                va1 = threeToBullet(a1);va2 = threeToBullet(a2);va3 = threeToBullet(a3);va4 = threeToBullet(a4);
                va5 = threeToBullet(a5);va6 = threeToBullet(a6);

                bounding_geometry = new THREE.Geometry();
                bounding_geometry.vertices.push(a1, a2, a3, a4, a5, a6);
                bounding_geometry.faces.push(new THREE.Face3(1,2,4), new THREE.Face3(1,2,5),new THREE.Face3(1,3,4), new THREE.Face3(1,3,5),
                    new THREE.Face3(0,2,4), new THREE.Face3(0,2,5),new THREE.Face3(0,3,4), new THREE.Face3(0,3,5));
                node = new THREE.Mesh( bounding_geometry, bounding_material );

                var collision_hull = new Ammo.btConvexHullShape();
                collision_hull.addPoint(va1);collision_hull.addPoint(va2);
                collision_hull.addPoint(va3);collision_hull.addPoint(va4);
                collision_hull.addPoint(va5);collision_hull.addPoint(va6);

                newElement.bounding = node;
                // console.log(node);
                newElement.collision = collision_hull;                
            } else {
                var a1,a2,a3,a4,b1,b2,b3,b4;
                var va1,va2,va3,va4,vb1,vb2,vb3,vb4;

                if (name == "sadari") {
                    if (point.length != 12) throw exception;
                    // width_up, width_down, height, offset, depth_up, depth_down,offset
                    //small_offset 상단width
                    // depth_ offset 순서, 정면으로 z축기준, 우상, 좌상, 우하, 좌하 순.
                    var width1 = point[0]/2;
                    var width2 = point[1]/2;
                    var height = point[2]/2;
                    var small_offset = point[3];
                    var depth1 = point[4]/2;
                    var depth2 = point[5]/2;
                    var depth3 = point[6]/2;
                    var depth4 = point[7]/2;
                    var offset1 = point[8];
                    var offset2 = point[9];
                    var offset3 = point[10];
                    var offset4 = point[11];

                    a1 = new THREE.Vector3(-width2,-height,-depth4+offset4);a2 = new THREE.Vector3(-width1+small_offset,height,-depth2+offset2);
                    a3 = new THREE.Vector3(-width2,-height,depth4+offset4);a4 = new THREE.Vector3(-width1+small_offset,height,depth2+offset2);
                    b1 = new THREE.Vector3(width2,-height,-depth3+offset3);b2 = new THREE.Vector3(width1+small_offset,height,-depth1+offset1);
                    b3 = new THREE.Vector3(width2,-height,depth3+offset3);b4 = new THREE.Vector3(width1+small_offset,height,depth1+offset1);
                    va1 = threeToBullet(a1);va2 = threeToBullet(a2);va3 = threeToBullet(a3);va4 = threeToBullet(a4);
                    vb1 = threeToBullet(b1);vb2 = threeToBullet(b2);vb3 = threeToBullet(b3);vb4 = threeToBullet(b4);
                } else if (name == "arrow") {
                    if (point.length != 12) throw exception;
                    //width, height1, height2, offset, depth1,depth2,depth3,depth4;
                    //z축 앞기준.
                    //height 순서 우->좌, small offset 우height
                    //offset기준 우상, 좌상, 우하, 좌하
                    var width = point[0]/2;
                    var height1 = point[1]/2;
                    var height2 = point[2]/2;
                    var small_offset = point[3];
                    var depth1 = point[4]/2;
                    var depth2 = point[5]/2;
                    var depth3 = point[6]/2;
                    var depth4 = point[7]/2;
                    var offset1 = point[8];
                    var offset2 = point[9];
                    var offset3 = point[10];
                    var offset4 = point[11];

                    a1 = new THREE.Vector3(-width,-height2,-depth4+offset4);a2 = new THREE.Vector3(-width,height2,-depth2+offset2);
                    a3 = new THREE.Vector3(-width,-height2,depth4+offset4);a4 = new THREE.Vector3(-width,height2,depth2+offset2);
                    b1 = new THREE.Vector3(width,-height1+small_offset,-depth3+offset3);b2 = new THREE.Vector3(width,height1+small_offset,-depth1+offset1);
                    b3 = new THREE.Vector3(width,-height1+small_offset,depth3+offset3);b4 = new THREE.Vector3(width,height1+small_offset,depth1+offset1);
					va1 = threeToBullet(a1);va2 = threeToBullet(a2);va3 = threeToBullet(a3);va4 = threeToBullet(a4);
                    vb1 = threeToBullet(b1);vb2 = threeToBullet(b2);vb3 = threeToBullet(b3);vb4 = threeToBullet(b4);
                } else {
                    if (point.length != 24) throw exception;
                    a1 = new THREE.Vector3(point[0],point[1],point[2]);a2 = new THREE.Vector3(point[3],point[4],point[5]);
                    a3 = new THREE.Vector3(point[6],point[7],point[8]);a4 = new THREE.Vector3(point[9],point[10],point[11]);
                    b1 = new THREE.Vector3(point[12],point[13],point[14]);b2 = new THREE.Vector3(point[15],point[16],point[17]);
                    b3 = new THREE.Vector3(point[18],point[19],point[20]);b4 = new THREE.Vector3(point[21],point[22],point[23]);
                    va1 = threeToBullet(a1);va2 = threeToBullet(a2);va3 = threeToBullet(a3);va4 = threeToBullet(a4);
                    vb1 = threeToBullet(b1);vb2 = threeToBullet(b2);vb3 = threeToBullet(b3);vb4 = threeToBullet(b4);                    
                }
                bounding_geometry = new THREE.Geometry();
                bounding_geometry.vertices.push(b4, b2, b3, b1, a2, a4, a1, a3);
                bounding_geometry.faces.push(new THREE.Face3(0,2,1), new THREE.Face3(2,3,1), new THREE.Face3(4,6,5), new THREE.Face3(6,7,5),
                        new THREE.Face3(4,5,1), new THREE.Face3(5,0,1), new THREE.Face3(7,6,2), new THREE.Face3(6,3,2),
                        new THREE.Face3(5,7,0), new THREE.Face3(7,2,0), new THREE.Face3(1,3,4), new THREE.Face3(3,6,4));
                node = new THREE.Mesh( bounding_geometry, bounding_material );

                var verts = [vb4, vb2, vb3, vb1, va2, va4, va1, va3];

                var collision_hull = new Ammo.btConvexHullShape();
                collision_hull.addPoint(va1);collision_hull.addPoint(va2);
                collision_hull.addPoint(va3);collision_hull.addPoint(va4);
                collision_hull.addPoint(vb1);collision_hull.addPoint(vb2);
                collision_hull.addPoint(vb3);collision_hull.addPoint(vb4);

                newElement.bounding = node;
                newElement.collision = collision_hull;
            }

        } catch (e) {
            console.log(e);
        }

        return newElement;
	}
    function threeToBullet(v){
    	return new Ammo.btVector3(v.x,v.y,v.z);
    }
	return CollisionElement;
});	