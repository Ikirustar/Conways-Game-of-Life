//* Canvas properties and variables
const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");
const canvasWidth = 800;
const canvasHeight = 600;
let offsetX = 0;
let offsetY = 0;
c.width = canvasWidth;
c.height = canvasHeight;
let cellSize = 50; // Default
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

  // Line styling
  ctx.strokeStyle = "rgb(161, 161, 161)";
  ctx.beginPath();

  let lineCount = 0;

  //* Horizontal columns
  for (let y = 0; y <= canvasHeight; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    lineCount++;
  }

  console.log("Number of Y lines: " + lineCount);
  console.assert(lineCount == canvasHeight / cellSize + 1);

  lineCount = 0;

  //* Vertical columns
  for (let x = 0; x <= canvasWidth; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    lineCount++;
  }
  ctx.closePath();
  ctx.stroke();

  console.log("Number of X lines: " + lineCount);
  console.assert(lineCount == canvasWidth / cellSize + 1);

  // Draw origin lines
  ctx.strokeStyle = "Black";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvasWidth, 0);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvasHeight);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
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

//* Left click
c.addEventListener("click", function (e) {
  const mousePos = trackMosPos(e);
  let xPos = mousePos.x;
  let yPos = mousePos.y;

  // scale += 0.3;
  offsetX = xPos;
  offsetY = yPos;

  console.log("MouseX: " + xPos, "MouseY: " + yPos);
  console.assert(xPos >= 0 && xPos <= canvasWidth);
  console.assert(yPos >= 0 && yPos <= canvasHeight);

  drawGame();
});

//* right click
c.addEventListener("contextmenu", function (e) {
  const mousePos = trackMosPos(e);
  let xPos = mousePos.x;
  let yPos = mousePos.y;

  // scale -= 0.3;
  offsetX = xPos;
  offsetY = yPos;

  console.log("MouseX: " + xPos, "MouseY: " + yPos);
  console.assert(xPos >= 0 && xPos <= canvasWidth);
  console.assert(yPos >= 0 && yPos <= canvasHeight);

  drawGame();
  e.preventDefault();
});

//* Game start

drawGame();
