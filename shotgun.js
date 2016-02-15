function Shotgun (n) {
    this.name = n;
    this.reset();
}

Shotgun.prototype.fire = function() {
  if (this.ammo <= 0) {
    // illegal move
    return this.noop();
  } else {
    this.ammo --;
    this.history.push("fire");
    return "f";
  }
};

Shotgun.prototype.load = function() {
  this.ammo ++;
  this.history.push("load");
  return "l";
};

Shotgun.prototype.block = function() {
  this.history.push("block");
  return "b";
};

Shotgun.prototype.noop = function() {
  this.history.push("noop");
  return "";
}

Shotgun.prototype.reset = function() {
  this.ammo = 0;
  this.history = [];
}

Shotgun.prototype.printStats = function() {
  console.log("%s: ammo: %d, history: %s", this.name, this.ammo, this.history);
}

module.exports = Shotgun;
