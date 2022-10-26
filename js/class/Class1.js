var GLOBAL = GLOBAL || {};
define([
	"class/Class2",
	],
function (
	Class2,
	) {
	var Class1 = function(){
		this.alias = "Class1";
	}
	Class1.prototype = {
		constructor: Class1,
		sayAlias: function() {
			console.log("My name is " + this.alias);
		},
		sayAlias2: function() {
			var class2 = new Class2();
			console.log("Class2's name is " + class2.alias);
		},
	}
	return Class1;
});