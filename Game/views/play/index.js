define(['jquery', 'gameMath', 'fabric', 'level', 'player'], function ($, gmath, fabric, level, Player) {

  function Play(){
    var self = this;

    var canvas;
    window.canvas = canvas;

    var canvasWidth = 800;
    var canvasHeight = 600;
    var playerSprites = [];
    var keys = [];

    var p1;


    self.attached = function(){
      canvas = new fabric.Canvas("c", { height: canvasHeight, width: canvasWidth, selection: false });
      gmath.setCanvas(canvas);

      p1 = new Player(canvas);
      playerSprites.push(p1);
      canvas.add(playerSprites[0].el);
      $(document).mousemove(function(e){
        // if(faceCursorEnabled){
          p1.faceCursor(e.clientX, e.clientY);
        // }
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
      level.loadLevel(canvas);
      window.requestAnimationFrame(gameLoop);
    };

    function gameLoop(){
      // Check Inputs

      // Update Values
      p1.checkCollision();
      // checkBulletCollision();

      // Draw Game
      canvas.renderAll();
      window.requestAnimationFrame(gameLoop);
    }

    function handleKeyDown(e){
      var e = e || event;
      var key = e.keyCode;

      keys[key] = true;
    }

    function handleKeyUp(e){
      var e = e || event;
      var key = e.keyCode;
      keys[key] = false;
    }

    function checkKeys(){
      var button = {
        up: keys["87"] || keys["38"],
        down: keys["83"] || keys["40"],
        left: keys["65"] || keys["37"],
        right: keys["68"] || keys["39"]
      };

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
    }

    function drawSprites(){
      for(x in playerSprites){
        canvas.add(playerSprites[x].el);
      }
    }

  }

  return Play;

});