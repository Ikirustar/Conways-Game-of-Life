//* Debug mode
const DEBUG = true;

//* Canvas properties and variables
const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");
const canvasWidth = 800;
const canvasHeight = 600;
let offsetX = 0;
let offsetY = 0;
c.width = canvasWidth;
c.height = canvasHeight;
let cellSize = 50; // Def
let scale = 1;

//* Canvas styling/setup
let canvasBackgroundColor = "rgb(252, 239, 211)";
c.style.backgroundColor = canvasBackgroundColor;

function drawGame() {
  //* Redrawing canvas
  ctx.save();
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, 800, 600);
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // World View
  const worldTop = -offsetY;
  const worldLeft = -offsetX;
  const worldBottom = canvasHeight - offsetY;
  const worldRight = canvasWidth - offsetX;

  // Line styling
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();

  //* Drawing grid
  let yLineCount = 0;
  let xLineCount = 0;

  const startY = Math.floor(worldTop / cellSize) * cellSize;
  const endY = Math.ceil(worldBottom / cellSize) * cellSize;

  // Horizontal columns
  for (let y = startY; y <= endY; y += cellSize) {
    ctx.moveTo(worldLeft, y);
    ctx.lineTo(worldRight, y);
    yLineCount++;
  }

  const startX = Math.floor(worldLeft / cellSize) * cellSize;
  const endX = Math.ceil(worldRight / cellSize) * cellSize;

  // Vertical columns
  for (let x = startX; x <= endX; x += cellSize) {
    ctx.moveTo(x, worldTop);
    ctx.lineTo(x, worldBottom);
    xLineCount++;
  }

  ctx.closePath();
  ctx.stroke();

  //* Draw origin lines

  ctx.strokeStyle = "rgb(145, 160, 240)";
  ctx.lineWidth = 5;

  ctx.beginPath();

  // Horizontal
  ctx.moveTo(worldLeft, 0);
  ctx.lineTo(worldRight, 0);

  // Vertical
  ctx.moveTo(0, worldTop);
  ctx.lineTo(0, worldBottom);

  ctx.closePath();
  ctx.stroke();

  let currentMatrix = ctx.getTransform();

  ctx.restore();

  if (DEBUG == true) {
    let canvasXT = currentMatrix.e;
    let canvasYT = currentMatrix.f;
    let canvasXS = currentMatrix.a;
    let canvasYS = currentMatrix.d;

    // drawDefaultGrid();
    console.log("Number of X lines: " + xLineCount);
    console.assert(xLineCount == (worldRight + offsetX) / cellSize + 2);
    console.log("Number of Y lines: " + yLineCount);
    console.assert(yLineCount == (worldBottom + offsetY) / cellSize + 2);
    console.log("X Translation: " + canvasXT, "Y Translation: " + canvasYT);
    console.log("X Scale: " + canvasXS, "Y Scale: " + canvasYS);
  }
}

//* Mouse event testing
window.addEventListener("wheel", function (e) {});

function trackMosPos(e) {
  const rect = c.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

// Left click
c.addEventListener("click", function (e) {
  const mousePos = trackMosPos(e);
  let xPos = mousePos.x;
  let yPos = mousePos.y;

  // scale += 0.3;
  offsetX = xPos;
  offsetY = yPos;

  if (DEBUG == true) {
    console.log("MouseX: " + xPos, "MouseY: " + yPos);
    console.assert(xPos >= 0 && xPos <= canvasWidth);
    console.assert(yPos >= 0 && yPos <= canvasHeight);
  }

  drawGame();
});

// right click
c.addEventListener("contextmenu", function (e) {
  const mousePos = trackMosPos(e);
  let xPos = mousePos.x;
  let yPos = mousePos.y;

  // scale -= 0.3;
  offsetX = xPos;
  offsetY = yPos;

  if (DEBUG == true) {
    console.log("MouseX: " + xPos, "MouseY: " + yPos);
    console.assert(xPos >= 0 && xPos <= canvasWidth);
    console.assert(yPos >= 0 && yPos <= canvasHeight);
  }

  drawGame();
  e.preventDefault();
});

//* Debugging functions
function drawDefaultGrid() {
  // Line styling
  ctx.strokeStyle = "rgb(164, 3, 3)";
  ctx.beginPath();

  //* Horizontal columns
  for (let y = 0; y <= canvasHeight; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
  }

  //* Vertical columns
  for (let x = 0; x <= canvasWidth; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
  }
  ctx.closePath();
  ctx.stroke();
}

//* Game start

drawGame();
