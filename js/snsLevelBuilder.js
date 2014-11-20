function snsLevelBuilder(){
	var self = this,
		canvasWidth = 800,
		canvasHeight = 600,
		previewCanvasWidth = 200,
		previewCanvasHeight = 200,
		fbUrl = "https://blistering-fire-3558.firebaseio.com/ShootAndSlash",
		canvas = $("#c")[0],
		cc = canvas.getContext("2d"),
		previewCanvas = $("#preview-canvas")[0],
		pc = previewCanvas.getContext("2d");

	// Builder Constants
	self.types = ko.observableArray(["Rectangle", "Circle"]);
	self.colors = ko.observableArray(["red", "blue", "yellow", "green", "purple", "orange"]);
	self.widths = ko.observableArray([0, 1, 2, 3, 4, 5]);

	// Element Builder
	self.previewElementName = ko.observable();
	self.previewElementType = ko.observable();
	self.previewElementRadius = ko.observable();
	self.previewElementWidth = ko.observable();
	self.previewElementHeight = ko.observable();
	self.previewElementFillStyle = ko.observable();
	self.previewElementLineWidth = ko.observable();
	self.previewElementStrokeStyle = ko.observable();

	self.previewElementObject = ko.computed(function(){
		return {
			name: self.previewElementName(),
			type: getType(),
			radius: self.previewElementRadius(),
			width: self.previewElementWidth(),
			height: self.previewElementHeight(),
			fillStyle: self.previewElementFillStyle(),
			lineWidth: self.previewElementLineWidth(),
			strokeStyle: self.previewElementStrokeStyle()
		}
	});

	self.builtElements = ko.observableArray();
	self.selectedBuiltElement = ko.observable();
	self.selectedBuiltElement.subscribe(function(el){
		clearPreviewInputs();
		clearPreviewCanvas();
		buildShapeElement(el);
	});

	// Add to preview of element to canvas
	self.previewElement = function(){
		var element = self.previewElementObject();
		clearPreviewInputs();
		clearPreviewCanvas();
		self.builtElements.push(element);
		buildShapeElement(element);
	};

	function buildShapeElement(el){
		var widthOffset = el.width || 0,
			heightOffset = el.height || 0,
			xOffset = (previewCanvasWidth - widthOffset) / 2,
			yOffset = (previewCanvasHeight - heightOffset) / 2;

		if(el.type === "arc"){
			pc.beginPath();
			pc[el.type](xOffset, yOffset, el.radius, 0, 2 * Math.PI, false);
		}
		else if(el.type === "rect"){
			pc[el.type](xOffset, yOffset, el.width, el.height);
		}
		pc.fillStyle = el.fillStyle;
		pc.fill();
		pc.lineWidth = el.lineWidth;
		pc.strokeStyle = el.strokeStyle;
		pc.stroke();
	};

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

	function clearCanvas(){
		canvas.height = canvasHeight;
		canvas.width = canvasWidth;
	}

	function clearPreviewCanvas(){
		previewCanvas.height = previewCanvasHeight;
		previewCanvas.width = previewCanvasWidth;
		// Doesn't clear lines
		// pc.clearRect(0, 0, previewCanvasWidth, previewCanvasHeight);
	}

	function clearPreviewInputs(){
		self.previewElementName(null);
		self.previewElementType(null);
		self.previewElementRadius(null);
		self.previewElementWidth(null);
		self.previewElementHeight(null);
		self.previewElementFillStyle(null);
		self.previewElementLineWidth(null);
		self.previewElementStrokeStyle(null);
	}

	// Converts human readable element type to key
	function getType(){
		switch(self.previewElementType()){
			case "Circle":
				return "arc";
				break
			case "Rectangle":
				return "rect";
				break;
		}
	}

}

$(document).ready(function(){
	ko.applyBindings(new snsLevelBuilder());
});