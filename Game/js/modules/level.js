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

	var R = {
		column_small: {
			x: 100,
			y: 100
		}
	};

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
		destroyable: true
	});

	this.loadLevel = function(canvas){
		canvas.add(column_small);
		canvas.add(column_small_destroyable);
	};

	return this;

}));
