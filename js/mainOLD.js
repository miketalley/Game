var player1, player2;
var playing = true;

$(document).ready(function(){
	$(".main").append("<canvas id='canvas' height='600' width='800'></canvas>");
	$(document).on('keydown', handleKeyDown);
	player = new Player(1);
	player2 = new Player(2);
	runGame();
});

var sprites = [];

function getContext(){
	return $("#canvas")[0].getContext('2d');
};

function runGame(){
	window.setInterval(function(){
		getContext().clearRect(0, 0, 800, 600);
		for(i in sprites){
			if(!sprites[i].movingRight){
				getContext().save;
				getContext().scale(1, -1);
			}
			getContext().drawImage(sprites[i].image, sprites[i].xPos, sprites[i].yPos);
		}
	}, 0);
};

function Player(number){
	this.xPos = 100;
	this.yPos = 400;
	this.movingRight = true;
	this.image = new Image();

	if(number === 1){
		this.image.src = 'content/alex.jpg';
	}
	else if(number === 2){
		this.image.src = 'content/ryan.jpg';
	}
	sprites.push(this);
	
	this.moveUp = function(){
		this.yPos -= 5;
	};
	this.moveDown = function(){
		this.yPos += 5;
	};
	this.moveLeft = function(){
		if(this.movingRight){
			this.movingRight = false;
		}
		this.xPos -= 5;
	};
	this.moveRight = function(){
		if(!this.movingRight){
			this.movingRight = true;
		}
		this.xPos += 5;
	};
}


// var createPlayer = function (){
// 	base_image = new Image();
// 	base_image.src = 'content/ryan.jpg';
// 	base_image.onload = function(){
//   		getContext().drawImage(base_image, 100, 400);
//   	};
// };

 function handleKeyDown(e){
	var key = e.keyCode
	if(key === 87 || key === 38){
		// Up
		player.moveUp();
	}
	else if(key === 83 || key === 40 ){
		// Down
		player.moveDown();
	}
	else if(key === 65 || key === 37 ){
		// Left
		player.moveLeft();
	}
	else if(key === 68 || key === 39 ){
		// Right
		player.moveRight();
	}
};



