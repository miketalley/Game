$(document).ready(function(){
	var canvasWidth = 800;
	var canvasHeight = 600;
	var mouseX, mouseY;
	var playerSprites = [];
	var background = "./content/grass.jpg";
	$('.main').attr("background", background);
	var backgroundXPos = 0;
	var backgroundYPos = 0;
	var defaultMoveDistance = 5;
	var defaultDiagonalMoveDistance = defaultMoveDistance * 0.57;
	var keys = [];

	var canvas = new fabric.Canvas("c", { height: canvasHeight, width: canvasWidth, selection: false });
	setCanvas(canvas);

	var p1 = new Player();
	playerSprites.push(p1);
	canvas.add(playerSprites[0].el);
	$(document).mousemove(function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;
		p1.faceCursor();
	});
	$(document).on('contextmenu', function(e){
		e.preventDefault();
		p1.swingSword();
	});
	$(document).on('click', function(e){
		p1.shootGun(e);
	});
	$(window).on('keydown', handleKeyDown);
	$(window).on('keyup', handleKeyUp);

	var checkKeysID = setInterval(checkKeys, 25);
	loadLevel(canvas);
	window.requestAnimationFrame(gameLoop);

	function gameLoop(){
		// Check Inputs

		// Update Values
		p1.checkCollision();

		// Draw Gameaw
		canvas.renderAll();
		window.requestAnimationFrame(gameLoop);
	};

	function handleKeyDown(e){
		var e = e || event;
		var key = e.keyCode;
		keys[key] = true;
	};

	function handleKeyUp(e){
		var e = e || event;
		var key = e.keyCode;
		keys[key] = false;
	};

	function checkKeys(){
		var button = {
			up: keys["87"] || keys["38"],
			down: keys["83"] || keys["40"],
			left: keys["65"] || keys["37"],
			right: keys["68"] || keys["39"]
		}

		if( button.up && button.left ){
			p1.moveUpAndLeft();
		}
		else if( button.up && button.right ){
			p1.moveUpAndRight();
		}
		else if( button.down && button.left ){
			p1.moveDownAndLeft();
		}
		else if( button.down && button.right ){
			p1.moveDownAndRight();
		}
		else if( button.up ){
			p1.moveUp();
		}
		else if( button.down ){
			p1.moveDown();
		}
		else if( button.left ){
			p1.moveLeft();
		}
		else if( button.right ){
			p1.moveRight();
		}
	};

	function Player(){
		this.xPos = canvasWidth / 2;
		this.yPos = canvasHeight / 2;

		var torsoDefaults = {
			fill: 'blue',
			width: 15,
			height: 6,
			originX: "center",
			originY: "center",
			strokeWidth: 1,
			stroke: 'rgba(100,200,200,0.5)'
		};

		var headDefaults = {
			radius: 5,
			fill: "orange",
			originX: "center",
			originY: "center",
			strokeWidth: 1,
			stroke: 'rgba(100,200,200,0.5)'
		};

		var groupDefaults = {
			left: canvasWidth / 2,
			top: canvasHeight / 2,
			originX: "center",
			originY: "center",
			angle: 0,
			selectable: false
		};

		var bladeDefaults = {
			fill: 'silver',
			width: 2,
			height: 16,
			left: -6,
			top: 12,
			originX: "center",
			originY: "center",
			strokeWidth: 1,
			stroke: 'rgba(100,200,200,0.5)',
			selectable: false
		};

		var gunDefaults = {
			fill: 'black',
			width: 2,
			height: 5,
			left: -6,
			top: 6,
			originX: "center",
			originY: "center",
			strokeWidth: 1,
			stroke: 'rgba(100,200,200,0.5)',
			selectable: false
		};

		this.torso = new fabric.Rect(torsoDefaults);
		this.head = new fabric.Circle(headDefaults);
		this.blade = new fabric.Rect(bladeDefaults);
		this.gun = new fabric.Rect(gunDefaults);
		this.el = this.el || new fabric.Group([this.torso, this.head], groupDefaults);
		
		this.faceCursor = function(){
			var hypotenuse, adjacent, opposite, baseAngle, calculatedAngle
				deltaX = (this.el.left) - mouseX,
				deltaY = (this.el.top) - mouseY;

			if(deltaX > 0){
				// Left Side
				if(deltaY < 0){
					// Left Bottom
					this.el.angle = calculateAngle(deltaX, deltaY, 0);
				}
				else if(deltaY > 0){
					// Left Top
					this.el.angle = calculateAngle(deltaY, deltaX, 90);				
				}
				else{
					// Left Side on Line
					this.el.angle = 90;
				}
			}
			else if(deltaX < 0){
				// Right Side
				if(deltaY > 0){
					// Right Top
					this.el.angle = calculateAngle(deltaX, deltaY, 180);
				}
				else if(deltaY < 0){
					// Right Bottom
					this.el.angle = calculateAngle(deltaY, deltaX, 270);
				}
				else{
					// Right Side on Line
					this.el.angle = 270;				
				}
			}
			else{
				if(deltaY > 0){
					// Top on the Line
					this.el.angle = 180;
				}
				else if(deltaY < 0){
					// Bottom on the Line
					this.el.angle = 0;
				}
				else{
					// Dead Center
					this.el.angle = 0;
				}
			}
		};

		this.swingSword = function(){
			// var swordGroup, blade, hilt, point;

			if(this.el.contains(this.gun)){
				this.el.remove(this.gun);
			}
			// swordGroup = new fabric.Group([blade, hilt, point]);
			if(!this.el.contains(this.blade)){
				this.el.add(this.blade);
				var that = this;
				setTimeout(function(){
					that.el.remove(that.blade);
				}, 200);
			}
		};

		this.shootGun = function(clickEvent){
			if(!this.el.contains(this.gun)){
				this.el.add(this.gun);
			}
			var slug = new bullet(clickEvent, this);
		};	

		this.moveUpAndLeft = function(distance){
			if(this.yPos > minY && this.xPos > minX){
				this.xPos -= distance || defaultDiagonalMoveDistance;
				this.yPos -= distance || defaultDiagonalMoveDistance;
				movePlayer();
			}
			else if(this.yPos > minY){
				this.moveUp();
			}
			else if(this.xPos > minX){
				this.moveLeft();
			}
		};

		this.moveUpAndRight = function(distance){
			if(this.yPos > minY && this.xPos < maxX){
				this.xPos += distance || defaultDiagonalMoveDistance;
				this.yPos -= distance || defaultDiagonalMoveDistance;
				movePlayer();
			}
			else if(this.yPos > minY){
				this.moveUp();
			}
			else if(this.xPos < maxX){
				this.moveRight();
			}
		};

		this.moveDownAndLeft = function(distance){
			if(this.yPos < maxY && this.xPos > minX){
				this.xPos -= distance || defaultDiagonalMoveDistance;
				this.yPos += distance || defaultDiagonalMoveDistance;
				movePlayer();
			}
			else if(this.yPos < maxY){
				this.moveDown();
			}
			else if(this.xPos > minX){
				this.moveLeft();
			}
		};

		this.moveDownAndRight = function(distance){
			if(this.yPos < maxY && this.xPos < maxX){
				this.xPos += distance || defaultDiagonalMoveDistance;
				this.yPos += distance || defaultDiagonalMoveDistance;
				movePlayer();
			}
			else if(this.yPos < maxY){
				this.moveDown();
			}
			else if(this.xPos < maxX){
				this.moveRight();
			}
		};

		this.moveUp = function(distance){
			if(this.yPos > minY){
				this.yPos -= distance || defaultMoveUpDistance;
				movePlayer();
			}
		};

		this.moveDown = function(distance){
			if(this.yPos < maxY){
				this.yPos += distance || defaultMoveDownDistance;
				movePlayer();
			}
		};

		this.moveLeft = function(distance){
			if(this.xPos > minX){
				this.xPos -= distance || defaultMoveLeftDistance;
				movePlayer();
			}
		};

		this.moveRight = function(distance){
			if(this.xPos < maxX){
				this.xPos += distance || defaultMoveRightDistance;
				movePlayer();
			}
		};

		this.checkCollision = function(){
			var objectHit = hasHitObject(this.xPos, this.yPos);
			var direction;
			
			if(objectHit){
				direction = checkCollisionDirection(this.xPos, this.yPos, objectHit);
				console.log(direction);
			}
			else{
				defaultMoveUpDistance = defaultMoveDistance;
				defaultMoveDownDistance = defaultMoveDistance;
				defaultMoveLeftDistance = defaultMoveDistance;
				defaultMoveRightDistance = defaultMoveDistance;
			}

			if(direction === "top"){
				defaultMoveDownDistance = 0;
			}
			else if(direction === "bottom"){
				defaultMoveUpDistance = 0;
			}
			else if(direction === "left"){
				defaultMoveRightDistance = 0;
			}
			else if(direction === "right"){
				defaultMoveLeftDistance = 0;
			}
		};
	}

	function bullet(clickEvent, player, bulletType){
		var angle = degToRad(player.el.angle + 90);
		var bulletSettings, yOffset, xOffset, slope;
		var bulletDefaults = {
				radius: 1.5,
				fill: "black",
				left: player.el.left + (32 * Math.cos(angle)),
				top: player.el.top + (32 * Math.sin(angle)),
				originX: 'center',
				originY: 'center',
				selectable: false
			};

		// Set up view elements
		if(bulletType){
			// Add various bulletSettings attributes here
		}
		var slug = new fabric.Circle(bulletSettings || bulletDefaults);

		// Run calculations on bullet trajectory
		if(player.el.angle !== 90 && player.el.angle !== 180){
			slope = Math.tan(angle);
		}
		calculateSlopeOffsets();

		// Main bullet calls
		fire();
		var moveIntervalID = setInterval(move, 10);

		function fire(){
			if(!hasHitObject(slug.left, slug.top)){
				canvas.add(slug);
			}
		}

		function move(){
			slug.top = slug.top + yOffset;
			slug.left = slug.left + xOffset;

			if(!isOnScreen(slug.left, slug.top) || hasHitObject(slug.left, slug.top)){
				clearInterval(moveIntervalID);
				slug.remove();
			}
		}

		function calculateSlopeOffsets(){
			var x1 = clickEvent.clientX;
			var y1 = clickEvent.clientY;
			var x = slug.left;
			var y = slug.top;
			var deltaX = x1 - x;
			var deltaY = y1 - y;
			var magnitude;

			magnitude = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

			yOffset = (deltaY / magnitude) * 3;
			xOffset = (deltaX / magnitude) * 3;
		}
	}

	function movePlayer(){
		p1.el.left = p1.xPos;
		p1.el.top = p1.yPos;
	}

	function drawSprites(){
		for(x in playerSprites){
			canvas.add(playerSprites[x].el);
		}
	}

});