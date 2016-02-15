var random = require("random-js")();
var Shotgun = require('./shotgun.js');

function AI(op) {
  this.opponent = op;
  this.shotgun = new Shotgun("AI");
}

AI.prototype.fire = function() {
  return this.shotgun.fire();
};

AI.prototype.load = function() {
  return this.shotgun.load();
};

AI.prototype.block = function() {
  return this.shotgun.block();
};


AI.prototype.reset = function() {
  this.shotgun.reset();
};

AI.prototype.printStats = function() {
  this.shotgun.printStats();
};

AI.prototype.nextMove = function() {
  move = "n";
  if (0 == this.shotgun.ammo && 0 == this.opponent.ammo) {
    // neither ai or opponent has any ammos, safe to just load
    move = this.load();
  } else if (0 < this.shotgun.ammo && 0 == this.opponent.ammo) {
    // opponent has no ammo, safe to load or fire
    switch(random.integer(1, 2)) {
      case 1 :
        move = this.load();
        break;
      case 2 :
        move = this.fire();
        break;
    }
  } else if (0 == this.shotgun.ammo && 0 < this.opponent.ammo) {
    // opponent has ammo, need to load or block
    switch(random.integer(1, 3)) {
      case 1 :
        move = this.load();
        break;
      case 2 :
        move = this.block();
        break;
    }
  } else {
    // both players have ammo, anything is possible
    switch(random.integer(1, 3)) {
      case 1 :
        move = this.load();
        break;
      case 2 :
        move = this.fire();
        break;
      case 3 :
        move = this.block();
        break;
    }
  }
  return move;
};

module.exports = AI;
