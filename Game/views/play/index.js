define(['jquery', 'gameMath', 'fabric', 'level', 'player'], function ($, gmath, fabric, level, Player) {

  function Play(){
    var self = this;

    var canvasWidth = 800;
    var canvasHeight = 600;
    var playerSprites = [];
    var keys = [];

    var p1;


    self.attached = function(){
      var canvas = new fabric.Canvas("c", { height: canvasHeight, width: canvasWidth, selection: false });
      gmath.setCanvas(canvas);

      p1 = new Player();
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
      bullets.push(slug);

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

        if(!isOnScreen(slug.left, slug.top) || hasHitObject(slug.left, slug.top, p1)){
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



    function drawSprites(){
      for(x in playerSprites){
        canvas.add(playerSprites[x].el);
      }
    }

  }

  return Play;

});
