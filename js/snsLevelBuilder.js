function snsLevelBuilder(){
	var self = this,
		canvasWidth = 800,
		canvasHeight = 600,
		previewCanvasWidth = 200,
		previewCanvasHeight = 200,
		fbUrl = "https://blistering-fire-3558.firebaseio.com/",
		canvas = $("#c")[0],
		cc = canvas.getContext("2d"),
		previewCanvas = $("#preview-canvas")[0],
		pc = previewCanvas.getContext("2d");

	// Builder Constants
	self.types = ko.observableArray(["Rectangle", "Circle"]);
	self.colors = ko.observableArray(["red", "blue", "yellow", "green", "purple", "orange"]);
	self.widths = ko.observableArray([0, 1, 2, 3, 4, 5]);

	// Element Builder
	self.elementName = ko.observable();
	self.elementType = ko.observable();
	self.elementRadius = ko.observable();
	self.elementWidth = ko.observable();
	self.elementHeight = ko.observable();
	self.elementFillStyle = ko.observable();
	self.elementLineWidth = ko.observable();
	self.elementStrokeStyle = ko.observable();

	self.element = ko.computed(function(){
		return {
			name: self.elementName(),
			type: self.elementType() === "Circle" ? "arc" : "rect",
			radius: self.elementRadius(),
			width: self.elementWidth(),
			height: self.elementHeight(),
			fillStyle: self.elementFillStyle(),
			lineWidth: self.elementLineWidth(),
			strokeStyle: self.elementStrokeStyle()
		}

		// if(self.elementType === "Circle"){
		// 	elObj.type = "arc";
		// 	elObj.radius = self.elementRadius();
		// }
		// else if(self.elementType === "Rectangle"){
		// 	elObj.type = "rect";
		// 	elObj.height = self.elementHeight();
		// 	elObj.width = self.elementWidth();
		// }

		// return elObj;
	});

	// Add to preview of element to canvas
	self.previewElement = function(){
		var newVal = self.element();
		var xOffset = (previewCanvasWidth - (newVal.width || 0)) / 2,
			yOffset = (previewCanvasHeight - (newVal.height || 0)) / 2;

		clearPreviewCanvas();

		if(newVal.type === "arc"){
			pc.beginPath();
			pc[newVal.type](xOffset, yOffset, newVal.radius, 0, 2 * Math.PI, false);
		}
		else if(newVal.type === "rect"){
			pc[newVal.type](xOffset, yOffset, newVal.width, newVal.height);
		}
		pc.fillStyle = newVal.fillStyle;
		pc.fill();
		pc.lineWidth = newVal.lineWidth;
		pc.strokeStyle = newVal.strokeStyle;
		pc.stroke();
	};


	// self.levels = ko.observableArray([1,2,3,4,5]);
	// self.levelsObject = ko.observable();
	// self.selectedLevel = ko.observable();
	
	// self.levelElements = ko.observableArray();
	// Example levelElement
	// {
	// 	name: "Small Rectangle",
	// 	type: "rect",
	// 	width: 150,
	// 	height: 100,
	//  fillStyle: fillcolor,
	//  lineWidth: borderwidth,
	//  strokeStyle: bordercolor
	// }
	// self.levelElementsObject = ko.observable();
	// self.selectedLevelElement = ko.observable();
	// self.selectedLevelElement.subscribe(function(newVal){
	// 	// Add to preview canvas
	// 	var xOffset = (previewCanvasWidth - newVal.width) / 2,
	// 		yOffset = (previewCanvasHeight - newVal.height) / 2;

	// 	pc[newVal.type](xOffset, yOffset, newVal.width, newVal.height);
	// 	pc.fillStyle = newVal.fillStyle;
	// 	pc.fill();
	// 	pc.lineWidth = newVal.lineWidth;
	// 	pc.strokeStyle = newVal.strokeStyle;
	// 	pc.stroke();
	// });


	initialize();


	self.insertLevelElement = function(){
		console.log(self.selectedLevelElement());
	};

	function initialize(){
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		previewCanvas.width = previewCanvasWidth;
		previewCanvas.height = previewCanvasHeight;

		$.get(fbUrl + "/levels.json", function(response){
			if(response){
			}
		});
	};

	function clearPreviewCanvas(){
		pc.clearRect(0, 0, canvasWidth, canvasHeight);
	}

}

$(document).ready(function(){
	ko.applyBindings(new snsLevelBuilder());
});