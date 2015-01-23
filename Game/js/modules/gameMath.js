(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.gameMath = factory();
    }
}(this, function () {

	var minY = 9;
	var minX = 9;
	var maxY = 591;
	var maxX = 791;
	var canvas;

	this.setCanvas = function(passedCanvas){
		canvas = passedCanvas;
	};

	this.calculateAngle = function(opposite, adjacent, baseAngle){
		opposite = Math.abs(opposite);
		adjacent = Math.abs(adjacent);
		hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));
		var x = Math.asin(opposite / hypotenuse);
		x = x * (180/Math.PI);
		return x + baseAngle;
	};

	this.degToRad = function(degrees){
		return degrees * Math.PI / 180;
	};

	this.radToDeg = function(radians){
		return radians * 180 / Math.PI;
	};

	this.isOnScreen = function(x, y){
		if((y < maxY || y > minY) || (x < maxX || x > minX)){
			return true;
		}
		else{
			return false;
		}
	};

	// Returns false or the object hit
	this.hasHitObject = function(x, y, bufferZone, player){
		var objectsList = canvas.getObjects(),		
			buffer = bufferZone || 0,
			hitObject = false;
		
		for(var i = 1; i < objectsList.length; i++){
			var object = objectsList[i];
			var left = object.left - buffer;
			var right = object.left + object.currentWidth + buffer;
			var top = object.top - buffer;
			var bottom = object.top + object.currentHeight + buffer;
			if((x < right && x > left) && (y < bottom && y > top)){
				hitObject = object;
			}
		}

		return hitObject;
	};

	this.checkCollisionDirection = function(x, y, objectHit){
		var topDistance = Math.abs(y - objectHit.top);
		var bottomDistance = Math.abs(y - (objectHit.top + objectHit.currentHeight));
		var leftDistance = Math.abs(x - objectHit.left);
		var rightDistance = Math.abs(x - (objectHit.left + objectHit.currentWidth));

		if(topDistance < bottomDistance && topDistance < leftDistance && topDistance < rightDistance){
			return "top";
		}
		else if(bottomDistance < topDistance && bottomDistance < leftDistance && bottomDistance < rightDistance){
			return "bottom";
		}
		else if(leftDistance < topDistance && leftDistance < bottomDistance && leftDistance < rightDistance){
			return "left";
		}
		else if(rightDistance < topDistance && rightDistance < bottomDistance && rightDistance < leftDistance){
			return "right";
		}
	};

	return this;

}));
