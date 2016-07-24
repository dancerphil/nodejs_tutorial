var g = -10
var dt = 0.04
var ball = {
  x: 4,
  y: 3,
  r: 0.1,
  vx: -1,
  vy: 0,
  color: "#faa"
};
var wall1 = {
  a: 0,
  b: 1,
  c: 0
}
$(function() {
  var canvas = $("#canvas");
  canvas[0].width = 1024;
  canvas[0].height = 768;
  var context = canvas[0].getContext("2d");
  alert
  setInterval(
    function() {
      render(context);
      update();
    },
    dt * 1000
  );
});

function update() {
  var pvx = ball.vx;
  var nvx = pvx;
  var pvy = ball.vy;
  var nvy = pvy + g * dt;
  var px = ball.x;
  var nx = px + (pvx + nvx) / 2 * dt;
  var py = ball.y;
  var ny = py + (pvy + nvy) / 2 * dt;
  if((wall1.a*px+wall1.b*py+wall1.c)*(wall1.a*nx+wall1.b*ny+wall1.c) <= 0) {
    // area of position number
    var t_g = Math.abs(g);
    var t1_y = py;
    var t_pvy = -pvy;
    var t1_t = (-t_pvy + Math.sqrt(t_pvy * t_pvy + 2 * t_g * t1_y)) / t_g;
    var t2_t = dt - t1_t;
    var vjustCrash = t_pvy + t1_t * t_g;
    console.log("vjustCrash: ",vjustCrash)
    nvy = vjustCrash - t2_t * t_g;
    ny = (vjustCrash + nvy) / 2 * t2_t;
  }
  ball.vx = nvx;
  ball.x = nx;
  ball.vy = nvy;
  ball.y = ny;
}

function render(cxt) {

  cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
  cxt.fillStyle = ball.color;
  cxt.beginPath();
  cxt.arc(ball.x * 100, 768 - ball.y * 100, ball.r * 100, 0, 2 * Math.PI, true);
  cxt.closePath();
  cxt.fill();
}