// Basic Connect 4
// Angelina Zhu
// Nov 8, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const NUM_OF_COLS = 7;    //Maybe change it later to adjust + fill the screen
const NUM_OF_ROWS = 6;
let squareSize;     // Maybe change name later
let grid;
let turn = 0;
let colour;

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = Math.floor(height/NUM_OF_ROWS);
  grid = generateGrid(NUM_OF_COLS, NUM_OF_ROWS);

  noStroke();
}

function draw() {
  background(100);

  // makeMove();
  displayBoard();
}

function generateGrid(cols, rows) {
  let newGrid = [];

  for (let x = 0; x < cols; x ++) {
    newGrid.push([]);
    for (let y = 0; y < rows; y ++) {
      newGrid[x].push(chipProperties(x, y));
    }
  }

  return newGrid;
}

function displayBoard() {
  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      fill(grid[x][y].colour);
      circle(x * squareSize + squareSize/2, y * squareSize + squareSize/2, grid[x][y].diameter);
    }
  }
}

function mousePressed() {
  // let x = 
  console.log(Math.floor(mouseX/squareSize));
  // let y = Math.floor(mouseY/squareSize);

  for (let y = NUM_OF_COLS - 1; y > 0; y --) {
    if (grid[x][y].state !== "filled") {
      grid[x][y].colour = "red";
    }
  }
  // May have to consider case where all are filled (maybe doesn't need additional statement tho)

  if (grid[x][y].colour !== 255) {
    grid[x][y].state = "filled";
  }
}

function chipProperties(x, y) {
  let chip = {
    x: x, 
    y: y,
    diameter: squareSize - 25, 
    colour: 255,
    state: "empty",
  };
  return chip;
}