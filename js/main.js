$(document).ready(function(){
	var canvasWidth = $(window).innerWidth();
	var canvasHeight = $(window).innerHeight();
	var mouseX, mouseY;
	var playerSprites = [];
	var background = "./content/grass.jpg";
	$('body').attr("background", background);
	var backgroundXPos = 0;
	var backgroundYPos = 0;
	var keys = [];

	var canvas = new fabric.Canvas("c", { height: canvasHeight, width: canvasWidth});

	var p1 = new Player();
	playerSprites.push(p1);
	canvas.add(playerSprites[0].el);
	$(document).mousemove(function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;
		p1.faceCursor();
		canvas.renderAll();
	});
	$(document).on('click', function(e){
		p1.swingSword();
	});
	$(window).on('keydown', handleKeyDown);
	$(window).on('keyup', handleKeyUp);

	function handleKeyDown(e){
		var e = e || event;
		var key = e.keyCode;
		keys[key] = true;
		checkKeys();
	};

	function checkKeys(){
		if(keys["87"] || keys["38"]){
			// Up
			p1.moveUp();
		}
		else if(key === 83 || key === 40 ){
			// Down
			p1.moveDown();
		}
		else if(key === 65 || key === 37 ){
			// Left
			p1.moveLeft();
		}
		else if(key === 68 || key === 39 ){
			// Right
			p1.moveRight();
		}
	};

	function handleKeyUp(e){
		var e = e || event;
		var key = e.keyCode;
		keys[key] = false;
	}

	function Player(){
		var torsoDefaults = {
			fill: 'red',
			width: 40,
			height: 20,
			originX: "center",
			originY: "center",
			strokeWidth: 5,
			stroke: 'rgba(100,200,200,0.5)'
		};

		var headDefaults = {
			radius: 14,
			fill: "orange",
			originX: "center",
			originY: "center",
			strokeWidth: 5,
			stroke: 'rgba(100,200,200,0.5)'
		};

		var groupDefaults = {
			left: canvasWidth / 2,
			top: canvasHeight / 2,
			originX: "center",
			originY: "center",
			angle: 0
		};

		this.torso = new fabric.Rect(torsoDefaults);
		this.head = new fabric.Circle(headDefaults);
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
			var swordGroup, blade, hilt, point;

			var blade = new fabric.Rect({
				fill: 'silver',
				width: 8,
				height: 40,
				left: -17,
				top: 32,
				originX: "center",
				originY: "center",
				strokeWidth: 5,
				stroke: 'rgba(100,200,200,0.5)'
			});

			// swordGroup = new fabric.Group([blade, hilt, point]);
			this.el.add(blade);
			var that = this;
			setTimeout(function(){
				that.el.remove(blade);
				canvas.renderAll();
			}, 200);
		};

		this.moveUp = function(){
			backgroundYPos += 5;
			bgUpdate();
		};

		this.moveDown = function(){
			backgroundYPos -= 5;
			bgUpdate();
		};

		this.moveLeft = function(){
			backgroundXPos += 5;
			bgUpdate();
		};

		this.moveRight = function(){
			backgroundXPos -= 5;
			bgUpdate();
		};
	};

	function bgUpdate(){
		$('body').css("background-position", backgroundXPos.toString() + "px " + backgroundYPos.toString() + "px");
	};

	function calculateAngle(opposite, adjacent, baseAngle){
		opposite = Math.abs(opposite);
		adjacent = Math.abs(adjacent);
		hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));
		// console.log(opposite, adjacent, hypotenuse);
		var x = Math.asin(opposite / hypotenuse);
		x = x * (180/Math.PI);
		return x + baseAngle;
	};

	function drawSprites(){
		for(x in playerSprites){
			canvas.add(playerSprites[x].el);
		}
	};
});

// var player1, player2;
// var playing = true;

// $(document).ready(function(){
// 	$(".main").append("<canvas id='canvas' height='600' width='800'></canvas>");
// 	$(document).on('keydown', handleKeyDown);
// 	player = new Player(1);
// 	player2 = new Player(2);
// 	runGame();
// });

// var sprites = [];

// function getContext(){
// 	return $("#canvas")[0].getContext('2d');
// };

// function runGame(){
// 	window.setInterval(function(){
// 		getContext().clearRect(0, 0, 800, 600);
// 		for(i in sprites){
// 			if(!sprites[i].movingRight){
// 				getContext().save;
// 				getContext().scale(1, -1);
// 			}
// 			getContext().drawImage(sprites[i].image, sprites[i].xPos, sprites[i].yPos);
// 		}
// 	}, 0);
// };

// function Player(number){
// 	this.xPos = 100;
// 	this.yPos = 400;
// 	this.movingRight = true;
// 	this.image = new Image();

// 	if(number === 1){
// 		this.image.src = 'content/alex.jpg';
// 	}
// 	else if(number === 2){
// 		this.image.src = 'content/ryan.jpg';
// 	}
// 	sprites.push(this);
	
// 	this.moveUp = function(){
// 		this.yPos -= 5;
// 	};
// 	this.moveDown = function(){
// 		this.yPos += 5;
// 	};
// 	this.moveLeft = function(){
// 		if(this.movingRight){
// 			this.movingRight = false;
// 		}
// 		this.xPos -= 5;
// 	};
// 	this.moveRight = function(){
// 		if(!this.movingRight){
// 			this.movingRight = true;
// 		}
// 		this.xPos += 5;
// 	};
// }


// // var createPlayer = function (){
// // 	base_image = new Image();
// // 	base_image.src = 'content/ryan.jpg';
// // 	base_image.onload = function(){
// //   		getContext().drawImage(base_image, 100, 400);
// //   	};
// // };

//  function handleKeyDown(e){
// 	var key = e.keyCode
// 	if(key === 87 || key === 38){
// 		// Up
// 		player.moveUp();
// 	}
// 	else if(key === 83 || key === 40 ){
// 		// Down
// 		player.moveDown();
// 	}
// 	else if(key === 65 || key === 37 ){
// 		// Left
// 		player.moveLeft();
// 	}
// 	else if(key === 68 || key === 39 ){
// 		// Right
// 		player.moveRight();
// 	}
// };




