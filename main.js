var c = document.getElementById("gameCanvas");
gridWidth = 800;
gridHeight = 600;
c.width = gridWidth;
c.height = gridHeight;
var ctx = c.getContext("2d");
var cellSize = Number(document.getElementById("grid-slider").value);

function drawGrid() {
  lineHeight = 50;

  // Draw Horizontal lines
  for (let y = 0; y < gridHeight; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * cellSize);
    ctx.lineTo(gridWidth, y * cellSize);
    ctx.stroke();
  }

  // Draw Vertical lines
  for (let x = 0; x < gridWidth; x++) {
    ctx.beginPath();
    ctx.moveTo(x * cellSize, 0);
    ctx.lineTo(x * cellSize, gridHeight);
    ctx.stroke();
  }
}

function spawnCell(x, y) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, cellSize, cellSize);
}

function redrawGrid() {
  cellSize = Number(document.getElementById("grid-slider").value);
  ctx.clearRect(0, 0, 800, 600);
  drawGrid();
  spawnCell(cellSize, cellSize);
}

drawGrid();
console.log(cellSize);
