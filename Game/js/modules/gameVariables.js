(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.gameVariables = factory();
    }
}(this, function () {
  var self = {};

  self.canvasWidth = 800;
  self.canvasHeight = 600;
  self.playerSprites = [];
  self.diagonalModifier = 0.57;
  self.defaultMoveDistance = 5;
  self.defaultMoveUpDistance = 5;
  self.defaultMoveDownDistance = 5;
  self.defaultMoveLeftDistance = 5;
  self.defaultMoveRightDistance = 5;
  self.defaultDiagonalMoveUpDistance = 5;
  self.defaultDiagonalMoveDownDistance = 5;
  self.defaultDiagonalMoveLeftDistance = 5;
  self.defaultDiagonalMoveRightDistance = 5;
  self.defaultDiagonalMoveDistance = defaultMoveDistance * diagonalModifier;
  self.keys = [];
  // self.faceCursorEnabled = true;

  return self;

}));
