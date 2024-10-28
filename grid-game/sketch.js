// Project Title
// Angelina Zhu
// Nov 8, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const NUM_OF_COLS = 7;
const NUM_OF_ROWS = 6;
let squareSize;     // Maybe change name later
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = width/NUM_OF_COLS;     // # of cols will always be more, thus making the smaller square 
  grid = generateGrid(NUM_OF_COLS, NUM_OF_ROWS);

  noStroke();
}

function draw() {
  background(20);

  displayBoard();
}

function generateGrid(cols, rows) {
  let newGrid = [];

  for (let x = 0; x < cols; x ++) {
    newGrid.push([]);
    for (let y = 0; y < rows; y ++) {
      newGrid[x].push(0);
    }
  }

  return newGrid;
}

function displayBoard() {
  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      if (grid[x][y] === 0) {
        fill(255);
        square(x*squareSize, y*squareSize, squareSize);
        // circle(x * squareSize, y * squareSize, squareSize);
      }
    }
  }
}