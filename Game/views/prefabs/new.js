define(['knockout', 'fabric'], function(ko){

  function NewPrefab(){
  	var self = this;

	self.previewCanvasWidth = 300;
	self.previewCanvasHeight = 300;

	// Builder Constants
	self.types = ["Rectangle", "Circle"];
	self.colors = ["red", "blue", "yellow", "green", "purple", "orange"];
	self.widths = [0, 1, 2, 3, 4, 5];

	// Element Builder
	self.name = ko.observable();
	self.type = ko.observable();
	self.type.subscribe(function(type){
		if(type === "Circle"){
			self.height(null);
			self.width(null);
		}
		else if(type === "Rectangle"){
			self.radius(null);
		}
	});
	self.radius = ko.observable();
	self.width = ko.observable();
	self.height = ko.observable();
	self.fillStyle = ko.observable();
	self.lineWidth = ko.observable();
	self.strokeStyle = ko.observable();

	self.Object = ko.computed(function(){
		var obj = {
			name: self.name(),
			type: getType(),
			fillStyle: self.fillStyle(),
			lineWidth: self.lineWidth(),
			strokeStyle: self.strokeStyle()
		};

		if(self.type() === 'Circle'){
			obj.radius = self.radius();
		}
		else if(self.type() === 'Rectangle'){
			obj.height = self.height();
			obj.width = self.width();
		}

		return obj;

	});

	self.builtElements = ko.observableArray();
	self.selectedBuiltElement = ko.observable();
	self.selectedBuiltElement.subscribe(function(el){
		clearPreviewCanvas();
		buildShapeElement(el);
	});

	self.attached = function(){
		self.previewCanvas = $("#preview-canvas")[0];
		pc = self.previewCanvas.getContext("2d");

		self.previewCanvas.width = self.previewCanvasWidth;
		self.previewCanvas.height = self.previewCanvasHeight;

		$.get("/level_prefabs.json", function(response){
			if(response & response.length){
				self.builtElements(response);
			}
		});
	};

	self.preview = ko.computed(function(){
		var element = self.Object();
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
	});

	self.savePrefab = function(model, event, levelPrefabObject){
		var prefabToSave = levelPrefabObject || self.Object();
		self.builtElements.push(prefabToSave);
		$.post("/level_prefabs", {level_prefab: prefabToSave}, function(response){
			debugger;
		});
	};

	function buildShapeElement(el){
		var widthOffset = el.width || 0,
			heightOffset = el.height || 0,
			xOffset = (self.previewCanvasWidth - widthOffset) / 2,
			yOffset = (self.previewCanvasHeight - heightOffset) / 2;

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


	self.clearPreview = function(){
		clearPreviewCanvas();
	};


	function clearPreviewCanvas(){
		self.previewCanvas.height = self.previewCanvasHeight;
		self.previewCanvas.width = self.previewCanvasWidth;
		// Doesn't clear lines
		// pc.clearRect(0, 0, self.previewCanvasWidth, self.previewCanvasHeight);
	}

	// Converts human readable element type to key
	function getType(){
		switch(self.type()){
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

  return NewPrefab;

});
