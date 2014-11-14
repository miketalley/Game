var minY = 9;
var minX = 9;
var maxY = 591;
var maxX = 791;
var canvas;

function setCanvas(passedCanvas){
	canvas = passedCanvas;
}

function calculateAngle(opposite, adjacent, baseAngle){
	opposite = Math.abs(opposite);
	adjacent = Math.abs(adjacent);
	hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));
	var x = Math.asin(opposite / hypotenuse);
	x = x * (180/Math.PI);
	return x + baseAngle;
}

function degToRad(degrees){
	return degrees * Math.PI / 180;
}

function radToDeg(radians){
	return radians * 180 / Math.PI;
}

function isOnScreen(x, y){
	if((y < maxY || y > minY) || (x < maxX || x > minX)){
		return true;
	}
	else{
		return false;
	}
}

// Returns false or the object hit
function hasHitObject(x, y, bufferZone){
	var buffer = bufferZone || 0;
	for(var i = 1; i < canvas.getObjects().length; i++){
		var object = canvas.getObjects()[i];
		var left = object.left - buffer;
		var right = object.left + object.currentWidth + buffer;
		var top = object.top - buffer;
		var bottom = object.top + object.currentHeight + buffer;
		if((x < right && x > left) && (y < bottom && y > top)){
			return object;
		}
		else{
			return false;
		}
	}
}

function checkCollisionDirection(x, y, objectHit){
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
}