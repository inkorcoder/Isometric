window.onload = function() {
  var canvas, ctx, draw, drawBlock, drawImageTile, drawTile, height, img, randomColor, tileHeight, tileWidth, width;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  tileWidth = 60;
  tileHeight = 30;
  ctx.translate(width / 2, 100);
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
  drawImageTile = function(x, y, index) {
    ctx.save();
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2 + (index < 4 ? 5 : 0));
    ctx.drawImage(img, index * tileWidth, 0, tileWidth, img.height, -tileWidth / 2, 0, tileWidth, img.height);
    ctx.restore();
  };
  draw = function() {
    var i, j, x, y;
    for (x = i = 0; i < 10; x = ++i) {
      for (y = j = 0; j < 10; y = ++j) {
        drawImageTile(x, y, Math.floor(Math.random() * 16));
      }
    }
  };
  img = document.createElement('img');
  img.addEventListener('load', function() {
    return draw();
  });
  img.src = 'img/tiles.png';
};
