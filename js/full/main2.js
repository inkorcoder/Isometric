window.onload = function() {
  var canMove, canvas, charX, charY, character, characterCanvas, ctx, ctx2, draw, drawBlock, drawCharacter, drawImageTile, drawTile, grid, height, img, moveCharacter, randomColor, tileHeight, tileWidth, width;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  characterCanvas = document.getElementById('characterCanvas');
  ctx2 = characterCanvas.getContext('2d');
  width = characterCanvas.width = window.innerWidth;
  height = characterCanvas.height = window.innerHeight;
  tileWidth = 60;
  tileHeight = 30;
  ctx.translate(width / 2, 50);
  ctx2.translate(width / 2, 50);
  charX = 0;
  charY = 9;
  grid = [[15, 15, 15, 14, 13, 10, 3, 2, 1, 0], [15, 15, 14, 13, 10, 10, 3, 2, 1, 0], [15, 14, 13, 10, 10, 3, 3, 2, 1, 0], [14, 13, 10, 9, 3, 3, 2, 1, 0, 0], [13, 10, 9, 7, 3, 2, 1, 0, 0, 0], [10, 9, 7, 6, 3, 2, 1, 0, 0, 0], [9, 7, 6, 5, 3, 2, 1, 1, 1, 1], [7, 6, 5, 3, 3, 2, 2, 2, 2, 2], [6, 5, 5, 3, 3, 3, 3, 3, 3, 3], [5, 5, 5, 5, 5, 5, 5, 5, 5, 3]];
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
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2 - 11 + (index < 4 ? 5 : 0));
    ctx.drawImage(img, index * tileWidth, 0, tileWidth, img.height, -tileWidth / 2, 0, tileWidth, img.height);
    ctx.restore();
  };
  draw = function() {
    var i, j, ref, ref1, row, x, y;
    for (y = i = 0, ref = grid.length; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
      row = grid[y];
      for (x = j = 0, ref1 = row.length; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
        drawImageTile(x, y, row[x]);
      }
    }
  };
  drawCharacter = function(image, x, y) {
    ctx2.clearRect(-width / 2, -50, width, height);
    ctx2.save();
    ctx2.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
    ctx2.drawImage(image, -image.width / 2, -image.height / 2);
    ctx2.restore();
  };
  canMove = function(x, y) {
    var tile;
    x = Math.floor(x);
    y = Math.floor(y);
    if (y < 0 || y >= grid.length) {
      return false;
    }
    if (x < 0 || x >= grid[y].length) {
      return false;
    }
    tile = grid[y][x];
    if (tile < 4 || tile > 14) {
      return false;
    }
    return true;
  };
  moveCharacter = function(event) {
    switch (event.keyCode) {
      case 37:
        if (canMove(charX - 1, charY)) {
          charX--;
          return drawCharacter(character, charX, charY);
        }
        break;
      case 39:
        if (canMove(charX + 1, charY)) {
          charX++;
          return drawCharacter(character, charX, charY);
        }
        break;
      case 38:
        if (canMove(charX, charY - 1)) {
          charY--;
          return drawCharacter(character, charX, charY);
        }
        break;
      case 40:
        if (canMove(charX, charY + 1)) {
          charY++;
          return drawCharacter(character, charX, charY);
        }
    }
  };
  img = document.createElement('img');
  img.addEventListener('load', function() {
    return draw();
  });
  img.src = 'img/tiles.png';
  character = document.createElement('img');
  character.addEventListener('load', function() {
    drawCharacter(character, charX, charY);
    return document.body.addEventListener('keydown', moveCharacter);
  });
  character.src = 'img/tux.png';
};