(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['fabric', 'bullet'], factory);
    } else {
        // Browser globals
        root.player = factory(root.fabric);
    }
}(this, function (fabric, Bullet) {

  function Player(canvas){
    var diagonalModifier = 0.57;
    var defaultMoveDistance = 5;
    var defaultMoveUpDistance = 5;
    var defaultMoveDownDistance = 5;
    var defaultMoveLeftDistance = 5;
    var defaultMoveRightDistance = 5;
    var defaultDiagonalMoveUpDistance = 5;
    var defaultDiagonalMoveDownDistance = 5;
    var defaultDiagonalMoveLeftDistance = 5;
    var defaultDiagonalMoveRightDistance = 5;
    var defaultDiagonalMoveDistance = defaultMoveDistance * diagonalModifier;
    // var faceCursorEnabled = true;

    // TODO -- get these from window
    var minY = 9;
    var minX = 9;
    var maxY = 591;
    var maxX = 791;

    this.xPos = canvas.width / 2;
    this.yPos = canvas.height / 2;

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
      left: this.xPos,
      top: this.yPos,
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

    this.faceCursor = function(mouseX, mouseY){
      var hypotenuse, adjacent, opposite, baseAngle, calculatedAngle,
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
        var angleStart = this.el.angle;
        var that = this;
        var turnIntervalID = setInterval(function(){
          turn(that, angleStart, turnIntervalID);
        }, 8);
        faceCursorEnabled = false;
      }
    };

    function turn(that, angleStart, interval){
      if(angleStart - that.el.angle < 360){
        that.el.angle -= 12;
      }
      else{
        that.el.angle = angleStart;
        that.el.remove(that.blade);
        clearInterval(interval);
        faceCursorEnabled = true;
      }
    }

    this.shootGun = function(clickEvent){
      if(!this.el.contains(this.gun)){
        this.el.add(this.gun);
      }
      var slug = new Bullet(canvas, clickEvent, this);
    };

    this.moveUpAndLeft = function(distance){
      if(this.yPos > minY && this.xPos > minX){
        this.xPos -= distance || defaultDiagonalMoveLeftDistance;
        this.yPos -= distance || defaultDiagonalMoveUpDistance;
        // movePlayer(this);
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
        this.xPos += distance || defaultDiagonalMoveRightDistance;
        this.yPos -= distance || defaultDiagonalMoveUpDistance;
        // movePlayer(this);
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
        this.xPos -= distance || defaultDiagonalMoveLeftDistance;
        this.yPos += distance || defaultDiagonalMoveDownDistance;
        // movePlayer(this);
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
        this.xPos += distance || defaultDiagonalMoveRightDistance;
        this.yPos += distance || defaultDiagonalMoveDownDistance;
        // movePlayer(this);
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
        // movePlayer(this);
      }
    };

    this.moveDown = function(distance){
      if(this.yPos < maxY){
        this.yPos += distance || defaultMoveDownDistance;
        // movePlayer(this);
      }
    };

    this.moveLeft = function(distance){
      if(this.xPos > minX){
        this.xPos -= distance || defaultMoveLeftDistance;
        // movePlayer(this);
      }
    };

    this.moveRight = function(distance){
      if(this.xPos < maxX){
        this.xPos += distance || defaultMoveRightDistance;
        // movePlayer(this);
      }
    };

    this.checkCollision = function(){
      var objectHit = hasHitObject(this.xPos, this.yPos, 7);
      var direction;

      if(objectHit){
        direction = checkCollisionDirection(this.xPos, this.yPos, objectHit);
      }
      else{
        defaultMoveUpDistance = defaultMoveDistance;
        defaultDiagonalMoveDownDistance = defaultDiagonalMoveDistance;
        defaultMoveDownDistance = defaultMoveDistance;
        defaultDiagonalMoveUpDistance = defaultDiagonalMoveDistance;
        defaultMoveLeftDistance = defaultMoveDistance;
        defaultDiagonalMoveRightDistance = defaultDiagonalMoveDistance;
        defaultMoveRightDistance = defaultMoveDistance;
        defaultDiagonalMoveLeftDistance = defaultDiagonalMoveDistance;
      }

      if(direction === "top"){
        defaultMoveDownDistance = 0;
        defaultDiagonalMoveDownDistance = 0;
      }
      else if(direction === "bottom"){
        defaultMoveUpDistance = 0;
        defaultDiagonalMoveUpDistance = 0;
      }
      else if(direction === "left"){
        defaultMoveRightDistance = 0;
        defaultDiagonalMoveRightDistance = 0;
      }
      else if(direction === "right"){
        defaultMoveLeftDistance = 0;
        defaultDiagonalMoveLeftDistance = 0;
      }
    };

    // function movePlayer(player){
    //   player.el.left = player.xPos;
    //   player.el.top = player.yPos;
    // }
  }

  return Player;

}));
