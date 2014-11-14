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



function loadLevel(canvas){
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

	canvas.add(column_small);
}