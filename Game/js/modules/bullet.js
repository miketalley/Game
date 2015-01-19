(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['gameMath', 'fabric'], factory);
    } else {
        // Browser globals
        root.player = factory(root.fabric);
    }
}(this, function (gmath, fabric) {

  function Bullet(canvas, clickEvent, player, bulletType){
      var bullets = [];

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
        if(!gmath.hasHitObject(slug.left, slug.top)){
          canvas.add(slug);
        }
      }

      function move(){
        slug.top = slug.top + yOffset;
        slug.left = slug.left + xOffset;

        if(!gmath.isOnScreen(slug.left, slug.top) || gmath.hasHitObject(slug.left, slug.top, player)){
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

    return Bullet;

}));
