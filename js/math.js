var minY = 9;
var minX = 9;
var maxY = 591;
var maxX = 791;

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