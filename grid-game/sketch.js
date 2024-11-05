// Basic Connect 4
// Angelina Zhu
// Nov 8, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const NUM_OF_COLS = 7;    //Maybe change it later to adjust + fill the screen
const NUM_OF_ROWS = 6;
let squareSize;
let grid;
let turn = 0;
let playerTurn = 0;

let screenState = "player-player";

let buttonProperties = {
  width: 300, 
  height: 100,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (windowWidth > windowHeight) {
    squareSize = Math.floor(height/NUM_OF_ROWS);
  }
  else {
    squareSize = Math.floor(width/NUM_OF_COLS);
  }
  grid = generateGrid(NUM_OF_COLS, NUM_OF_ROWS);

  noStroke();
}

function draw() {
  if (screenState === "start") {
    displayStartScreen();
  }
  else if (screenState === "player-player") {
    background(100); //#fcf8eb

    // playerVsPlayer();
    displayBoard();
    checkWin();
  }
  else if (screenState === "player-comp") {     //Hopefully? Eventually?
    background(120);

    displayBoard();
    // checkWin();
  }
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

function displayStartScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(110);
  text("Connect 4", width/2, height/4);      // Wait what if Enha themed- (cuz 1, 2, connect-)

  fill(255);
  stroke(0);
  rect(width/2 - buttonProperties.width/2, height/2, buttonProperties.width, buttonProperties.height);

  fill(0);
  textSize(30);
  text("Player V.S. Player", width/2, height/2);

  // if (keyIsPressed) {
  //   screenState = "player-player";
  // }
}

function displayBoard() {
  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      fill(grid[x][y].colour);
      circle(x * squareSize + squareSize/2, y * squareSize + squareSize/2, grid[x][y].diameter);
    }
  }
}

function mouseClicked() {
  if (screenState === "player-player") {
    let x = Math.floor(mouseX/squareSize);
  
    if (playerTurn % 2 === 0) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state !== "filled") {
          grid[x][y].colour = "red"; //#d10000
          playerTurn ++;    // May be better way to do this without putting it twice
          break;
        }
      }
    }
    else if (playerTurn % 2 === 1) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].colour = "blue"; //#1100a6
          playerTurn ++;
          break;
        }
      }
    }
    
    // Update grid
    for (let x = 0; x < NUM_OF_COLS; x ++) {
      for (let y = 0; y < NUM_OF_ROWS; y ++) {
        if (grid[x][y].colour !== 255) {
          grid[x][y].state = "filled";
        }
      }
    }
  }
}

function checkWin() {
  let win = "false";
  let winColour;

  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      // Check vertical
      if (y+4 < NUM_OF_ROWS) {
        if (grid[x][y].state === "filled" && grid[x][y+1].state === "filled" && grid[x][y+2].state === "filled" && grid[x][y+3].state === "filled" && grid[x][y+4].state === "filled") {
          winColour = grid[x][y].colour;
          win = true;
        }
      }

      // Check horizontal 
      if (x+4 < NUM_OF_COLS) {
        if (grid[x][y].state === "filled" && grid[x+1][y].state === "filled" && grid[x+2][y].state === "filled" && grid[x+3][y].state === "filled" && grid[x+4][y].state === "filled") {
          winColour = grid[x][y].colour;
          win = true;
        } 
      }

      // Check diagonal
      if (x+4 < NUM_OF_COLS && y+4 < NUM_OF_ROWS) {
        if (grid[x][y].state === "filled" && grid[x+1][y+1].state === "filled" && grid[x+2][y+2].state === "filled" && grid[x+3][y+3].state === "filled" && grid[x+4][y+4].state === "filled") {
          winColour = grid[x][y].colour;
          win = true;
        } 
      }
    }
  }

  if (win === true) {
    announceWinner(winColour);
  }
}

function announceWinner(winColour) {
  fill(0);
  textAlign(CENTER);
  textSize(200);
  text(`${winColour} won!`, NUM_OF_COLS*squareSize/2, NUM_OF_ROWS*squareSize/2); 

  // Buttons to play again or back to start
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