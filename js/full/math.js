window.onload = function() {
  var canvas, ctx, dist, drawBlock, drawTile, dx, dy, height, i, j, randomColor, tileHeight, tileWidth, width, x, y, z;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  tileWidth = 15;
  tileHeight = 10;
  ctx.translate(width / 2, tileHeight);
  drawTile = function(x, y, color) {
    ctx.save();
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tileWidth / 2, tileHeight / 2);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(-tileWidth / 2, tileHeight / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };
  drawBlock = function(x, y, z) {
    var left, right, top;
    top = '#eeeeee';
    left = '#cccccc';
    right = '#999999';
    ctx.save();
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
    ctx.beginPath();
    ctx.moveTo(0, -z * tileHeight);
    ctx.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.lineTo(0, tileHeight - z * tileHeight);
    ctx.lineTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.lineTo(0, tileHeight - z * tileHeight);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(-tileWidth / 2, tileHeight / 2);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.lineTo(0, tileHeight - z * tileHeight);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(tileWidth / 2, tileHeight / 2);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();
    ctx.restore();
  };
  randomColor = function() {
    var b, g, r;
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };
  for (x = i = 0; i < 50; x = ++i) {
    for (y = j = 0; j < 50; y = ++j) {
      dx = 25 - x;
      dy = 25 - y;
      dist = Math.sqrt(dx * dx + dy * dy);
      z = Math.cos(dist * 0.75) * 2 + 2;
      drawBlock(x, y, z);
    }
  }
};
