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

let chipProperties = {
  diameter: squareSize - 25,

};


function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = Math.floor(height/NUM_OF_ROWS);
  grid = generateGrid(NUM_OF_COLS, NUM_OF_ROWS);

  noStroke();
}

function draw() {
  background(100);

  makeMove();
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
        circle(x * squareSize, y * squareSize, chipProperties.diameter);
      }
    }
  }
}

function makeMove() {
  let x = Math.floor(mouseX/squareSize);
  let y = Math.floor(mouseY/squareSize);

  if (colour === "red") {
    // grid[x][y]
  }

  if (turn % 2 === 0) {
    colour = "red";
  }
  else {
    colour = "blue";
  }
}