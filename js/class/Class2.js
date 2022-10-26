var GLOBAL = GLOBAL || {};
define([
	//reference address
	],
function (
	//reference alias
	) {
	var Class2 = function(){
		this.alias = "Class2";
	}
	Class2.prototype = {
		constructor: Class2,
		sayAlias: function() {
			console.log("My name is " + this.alias);
		}
	}
	return Class2;
});