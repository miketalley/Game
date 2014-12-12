/* TODO
	- Make preview auto-update based on observable changes
	- Save prefab to DB
*/

function snsLevelBuilder(){
	var self = this,
		previewCanvasWidth = 200,
		previewCanvasHeight = 200,
		previewCanvas = $("#preview-canvas")[0],
		pc = previewCanvas.getContext("2d");

	// Builder Constants
	self.types = ko.observableArray(["Rectangle", "Circle"]);
	self.colors = ko.observableArray(["red", "blue", "yellow", "green", "purple", "orange"]);
	self.widths = ko.observableArray([0, 1, 2, 3, 4, 5]);

	// Element Builder
	self.previewElementName = ko.observable();
	self.previewElementType = ko.observable();
	self.previewElementType.subscribe(function(type){
		if(type === "Circle"){
			self.previewElementHeight(null);
			self.previewElementWidth(null);
		}
		else if(type === "Rectangle"){
			self.previewElementRadius(null);
		}
	});
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
		clearPreviewCanvas();
		buildShapeElement(el);
	});

	self.previewElement = function(){
		var element = self.previewElementObject();
		if(element.name && nameExists(element.name, self.builtElements())){
			message("Name is taken! Please choose another.");
		}
		else if(element.name && element.type && element.radius > 0 || (element.width > 0 && element.height > 0)){
			clearPreviewCanvas();
			buildShapeElement(element);
		}
		else{
			message("Please fill out form completely.");
		}
	};

	self.savePrefab = function(model, event, levelPrefabObject){
		var prefabToSave = levelPrefabObject || self.previewElementObject();
		self.builtElements.push(prefabToSave);
		$.post("/level_prefabs", {level_prefab: prefabToSave}, function(response){
			debugger;
		});
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

	function initialize(){
		previewCanvas.width = previewCanvasWidth;
		previewCanvas.height = previewCanvasHeight;

		$.get("/level_prefabs.json", function(response){
			if(response & response.length){
				self.builtElements(response);
			}
		});
	};

	self.clearPreview = function(){
		clearPreviewCanvas();
	}


	function clearPreviewCanvas(){
		previewCanvas.height = previewCanvasHeight;
		previewCanvas.width = previewCanvasWidth;
		// Doesn't clear lines
		// pc.clearRect(0, 0, previewCanvasWidth, previewCanvasHeight);
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

	function message(text){
		$("#message-output").text(text);
		setTimeout(function(){
			$("#message-output").text();	
		}, 2000);
	}

	function nameExists(name, array){
		var exists = false;
		name = name.toLowerCase();

		for(var i = 0; i < array.length; i++){
			if(name === array[i].name.toLowerCase()){
				exists = true;
			}
		}
		return exists;
	}

}

$(document).ready(function(){
	ko.applyBindings(new snsLevelBuilder());
});