(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['fabric'], factory);
    } else {
        // Browser globals
        root.level = factory();
    }
}(this, function (fabric) {

	var S = {

	};

	var rooms = {
		1: [column_small, column_small_destroyable]
	}

	var R = 0;

	var testLevel = [
		R, R, R,
		R, R, R,
		R, S, R
	];

	var levels = [
		testLevel
	];

	var column_small = new fabric.Rect({
		width: 50,
		height: 50,
		fill: 'yellow',
		stroke: 'green',
		strokeWidth: 3,
		left: 100,
		top: 100,
		selectable: false
	});

	var column_small_destroyable = new fabric.Rect({
		width: 80,
		height: 80,
		fill: 'blue',
		stroke: 'red',
		strokeWidth: 2,
		left: 500,
		top: 400,
		selectable: false,
		destroyable: true,
		health: 200
	});

	function explode(){
		// Example death animation for objects
	}

	this.loadLevel = function(canvas, level){
		canvas.add(column_small);
		canvas.add(column_small_destroyable);
	};

	return this;

}));
