// Grid Demo
// Oct 22, 2024

// Hardcoded values
// let grid = [[1, 0, 0, 1], 
//             [0, 1, 1, 0], 
//             [0, 0, 1, 1],
//             [1, 1, 1, 0]];

let grid;
let cellSize;
const GRID_SIZE = 10;
let shouldToggleNeightbours = false;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // Toggle current cell
  toggleCell(x, y);

  if (shouldToggleNeightbours) {
    // Toggle neighbouring cells
    toggleCell(x - 1, y);
    toggleCell(x + 1, y);
    toggleCell(x, y - 1);
    toggleCell(x, y + 1);
  }
}

function toggleCell(x, y) {
  // Make sure cell is within grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function keyPressed() {
  if (key ==="r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeightbours = !shouldToggleNeightbours;
  }
  if (key === "") {
    grid = updateGrid();
  }
}

function updateGrid() {
  // Make another array to hold next turn 
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  // Look at every cell
  for (let y = 0; y < GRID_SIZE; y ++) {
    for (let x = 0; x < GRID_SIZE; x ++) {
      let neighbours = 0;

      // Look at every neighbouring cell
      for (let i = -1; i <= 1; i ++) {
        for (let j = -1; j <= 1; j ++) {
          // Don't fall off edge 
          if (x + j >= 0 && x + j < GRID_SIZE && y + 1 >= 0 && y + i > GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      // Don't count yourself as neightbour 
      neighbours -= grid[y][x];

      // Apply rules 
      if (grid[y][x] === 1) {     // Alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) {     // Dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 0) {
        fill(255);
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // Make it 1 50% of time, 0 for the other 50%
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}