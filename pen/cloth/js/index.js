'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1e3 / 60);
};

var accuracy = 5;
var gravity = 400;
var clothY = 24;
var clothX = 50;
var spacing = 8;
var tearDist = 60;
var friction = 0.99;
var bounce = 0.5;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = Math.min(700, window.innerWidth);
canvas.height = 400;

ctx.strokeStyle = '#555';

var mouse = {
  cut: 8,
  influence: 36,
  down: false,
  button: 1,
  x: 0,
  y: 0,
  px: 0,
  py: 0
};

var Point = function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.vx = 0;
    this.vy = 0;
    this.pinX = null;
    this.pinY = null;

    this.constraints = [];
  }

  Point.prototype.update = function update(delta) {
    if (this.pinX && this.pinY) return this;

    if (mouse.down) {
      var dx = this.x - mouse.x;
      var dy = this.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (mouse.button === 1 && dist < mouse.influence) {
        this.px = this.x - (mouse.x - mouse.px);
        this.py = this.y - (mouse.y - mouse.py);
      } else if (dist < mouse.cut) {
        this.constraints = [];
      }
    }

    this.addForce(0, gravity);

    var nx = this.x + (this.x - this.px) * friction + this.vx * delta;
    var ny = this.y + (this.y - this.py) * friction + this.vy * delta;

    this.px = this.x;
    this.py = this.y;

    this.x = nx;
    this.y = ny;

    this.vy = this.vx = 0;

    if (this.x >= canvas.width) {
      this.px = canvas.width + (canvas.width - this.px) * bounce;
      this.x = canvas.width;
    } else if (this.x <= 0) {
      this.px *= -1 * bounce;
      this.x = 0;
    }

    if (this.y >= canvas.height) {
      this.py = canvas.height + (canvas.height - this.py) * bounce;
      this.y = canvas.height;
    } else if (this.y <= 0) {
      this.py *= -1 * bounce;
      this.y = 0;
    }

    return this;
  };

  Point.prototype.draw = function draw() {
    var i = this.constraints.length;
    while (i--) {
      this.constraints[i].draw();
    }
  };

  Point.prototype.resolve = function resolve() {
    if (this.pinX && this.pinY) {
      this.x = this.pinX;
      this.y = this.pinY;
      return;
    }

    this.constraints.forEach(function (constraint) {
      return constraint.resolve();
    });
  };

  Point.prototype.attach = function attach(point) {
    this.constraints.push(new Constraint(this, point));
  };

  Point.prototype.free = function free(constraint) {
    this.constraints.splice(this.constraints.indexOf(constraint), 1);
  };

  Point.prototype.addForce = function addForce(x, y) {
    this.vx += x;
    this.vy += y;
  };

  Point.prototype.pin = function pin(pinx, piny) {
    this.pinX = pinx;
    this.pinY = piny;
  };

  return Point;
}();

var Constraint = function () {
  function Constraint(p1, p2) {
    _classCallCheck(this, Constraint);

    this.p1 = p1;
    this.p2 = p2;
    this.length = spacing;
  }

  Constraint.prototype.resolve = function resolve() {
    var dx = this.p1.x - this.p2.x;
    var dy = this.p1.y - this.p2.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < this.length) return;

    var diff = (this.length - dist) / dist;

    if (dist > tearDist) this.p1.free(this);

    var mul = diff * 0.5 * (1 - this.length / dist);

    var px = dx * mul;
    var py = dy * mul;

    !this.p1.pinX && (this.p1.x += px);
    !this.p1.pinY && (this.p1.y += py);
    !this.p2.pinX && (this.p2.x -= px);
    !this.p2.pinY && (this.p2.y -= py);

    return this;
  };

  Constraint.prototype.draw = function draw() {
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
  };

  return Constraint;
}();

var Cloth = function () {
  function Cloth(free) {
    _classCallCheck(this, Cloth);

    this.points = [];

    var startX = canvas.width / 2 - clothX * spacing / 2;

    for (var y = 0; y <= clothY; y++) {
      for (var x = 0; x <= clothX; x++) {
        var point = new Point(startX + x * spacing, 20 + y * spacing);
        !free && y === 0 && point.pin(point.x, point.y);
        x !== 0 && point.attach(this.points[this.points.length - 1]);
        y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)]);

        this.points.push(point);
      }
    }
  }

  Cloth.prototype.update = function update(delta) {
    var i = accuracy;

    while (i--) {
      this.points.forEach(function (point) {
        point.resolve();
      });
    }

    ctx.beginPath();
    this.points.forEach(function (point) {
      point.update(delta * delta).draw();
    });
    ctx.stroke();
  };

  return Cloth;
}();

function setMouse(e) {
  var rect = canvas.getBoundingClientRect();
  mouse.px = mouse.x;
  mouse.py = mouse.y;
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}

canvas.onmousedown = function (e) {
  mouse.button = e.which;
  mouse.down = true;
  setMouse(e);
};

canvas.onmousemove = setMouse;

canvas.onmouseup = function () {
  return mouse.down = false;
};

canvas.oncontextmenu = function (e) {
  return e.preventDefault();
};

var cloth = new Cloth();

function zeroG() {
  gravity = 0;
  cloth = new Cloth(true);
}

;(function update(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cloth.update(0.016);

  window.requestAnimFrame(update);
})(0);