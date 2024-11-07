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

let screenState = "start";

let buttonProperties = {
  width: 300, 
  height: 110,
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

    displayBoard();
    checkWin();
  }
  else if (screenState === "win") {
    announceWinner(winColour);
  }
}

function generateGrid(cols, rows) {     // Center it?
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
  background(240);

  fill(0);
  textAlign(CENTER);
  textSize(110);
  text("Connect 4", width/2, height/4);      // Wait what if Enha themed- (cuz 1, 2, connect-)

  textSize(30);
  text("Press space bar to start", width/2, height/2);

  if (keyIsPressed && keyCode === 32) {
    screenState = "player-player";
  }
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
        if (grid[x][y].state === "empty") {
          grid[x][y].colour = "#d10000"; 
          playerTurn ++;    // May be better way to do this without putting it twice
          break;
        }
      }
    }
    else if (playerTurn % 2 === 1) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].colour = "#1100a6"; 
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
      if (y+3 < NUM_OF_ROWS) {
        if (grid[x][y].colour === "#d10000" && grid[x][y+1].colour === "#d10000" && grid[x][y+2].colour === "#d10000" && grid[x][y+3].colour === "#d10000") {
          winColour = "Red";
          win = true;
        }
        else if (grid[x][y].colour === "#1100a6" && grid[x][y+1].colour === "#1100a6" && grid[x][y+2].colour === "#1100a6" && grid[x][y+3].colour === "#1100a6") {
          winColour = "Blue";
          win = true;
        }
      }

      // Check horizontal 
      if (x+3 < NUM_OF_COLS) {
        if (grid[x][y].colour === "#d10000" && grid[x+1][y].colour === "#d10000" && grid[x+2][y].colour === "#d10000" && grid[x+3][y].colour === "#d10000") {
          winColour = grid[x][y].colour;
          win = true;
        } 
        else if (grid[x][y].colour === "#1100a6" && grid[x+1][y].colour === "#1100a6" && grid[x+2][y].colour === "#1100a6" && grid[x+3][y].colour === "#1100a6") {
          winColour = grid[x][y].colour;
          win = true;
        } 
      }

      // Check left to right diagonal
      if (x+3 < NUM_OF_COLS && y+3 < NUM_OF_ROWS) {
        if (grid[x][y].colour === "#d10000" && grid[x+1][y+1].colour === "#d10000" && grid[x+2][y+2].colour === "#d10000" && grid[x+3][y+3].colour === "#d10000") {
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].colour === "#1100a6" && grid[x+1][y+1].colour === "#1100a6" && grid[x+2][y+2].colour === "#1100a6" && grid[x+3][y+3].colour === "#1100a6") {
          winColour = "Blue";
          win = true;
        } 
      }

      // Check right to left diagonal
      if (x-3 < NUM_OF_COLS && y-3 < NUM_OF_ROWS) {
        if (grid[x][y].colour === "#d10000" && grid[x-1][y-1].colour === "#d10000" && grid[x-2][y-2].colour === "#d10000" && grid[x-3][y-3].colour === "#d10000") {
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].colour === "#1100a6" && grid[x-1][y-1].colour === "#1100a6" && grid[x-2][y-2].colour === "#1100a6" && grid[x-3][y-3].colour === "#1100a6") {
          winColour = "Blue";
          win = true;
        } 
      }
    }
  }

  if (win === true) {
    screenState = "win";
  }
}

function announceWinner(winColour) {
  fill(0);
  textAlign(CENTER);
  textSize(200);
  text(`${winColour} won!`, NUM_OF_COLS*squareSize/2, NUM_OF_ROWS*squareSize/2); 

  rect(width/2 - buttonProperties.width);
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