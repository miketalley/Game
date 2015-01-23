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
    var angle = degToRad(player.el.angle + 90),
        bulletSettings,
        bulletDefaults = {
          radius: 1.5,
          fill: "black",
          left: player.el.left + (32 * Math.cos(angle)),
          top: player.el.top + (32 * Math.sin(angle)),
          originX: 'center',
          originY: 'center',
          selectable: false,
          damage: 50
        };

    this.isApplyingDamage = false;

    this.moveBullet = function(){
      var bullet = this.slug;

      bullet.top = bullet.top + this.offsets.y;
      bullet.left = bullet.left + this.offsets.x;

      if(gmath.isOnScreen(bullet.left, bullet.top)){
        var hitObject = gmath.hasHitObject(bullet.left, bullet.top);
        if(hitObject){
          if(hitObject.destroyable){
            this.damageObject(hitObject, bullet);
          }
          bullet.remove();
        }
      } 
      else{
        bullet.remove();
      }
    };

    this.damageObject = function(objectToDamage, damagingObject){
      if(!this.isApplyingDamage){
        this.isApplyingDamage = true;
        console.log('Before Health: ', objectToDamage.health);
        objectToDamage.health -= damagingObject.damage;
        console.log('After Health: ', objectToDamage.health);
        if(objectToDamage.health <= 0){
          objectToDamage.remove();
          // Play sound
          return true;
        }
        else{
          return false;
          // Play indestructible sound
        }
        this.isApplyingDamage = false;
      }
    };

    // Set up view elements
    // if(bulletType){
    //   // Add various bulletSettings attributes here
    // }

    this.slug = new fabric.Circle(bulletSettings || bulletDefaults);

    // Run calculations on bullet trajectory
    // if(player.el.angle !== 90 && player.el.angle !== 180){
    //   this.slope = Math.tan(angle);
    // }

    this.offsets = gmath.calculateSlopeOffsets(clickEvent, this.slug);

    var hitObject = gmath.hasHitObject(this.slug.left, this.slug.top);
    hitObject ? this.addDamage(hitObject) : canvas.add(this.slug);

  }    

  return Bullet;

}));
