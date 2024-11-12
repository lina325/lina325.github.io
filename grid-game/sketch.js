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
let winColour;
let win = false;
let allFilled = false;
let circleMask;
let blueChip;

let buttonProperties = {
  width: 300, 
  height: 110,
};

function preload() {
  blueChip = loadImage("blue-chip.png");
}

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
    background(100); //#fcf8eb Maybe change

    displayBoard();
    checkWin();
  }
  else if (screenState === "win") {
    announceWinner(winColour);
  }
  else if (screenState === "tie") {
    tie();
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
  background(240); //Maybe add/replace with image?

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
  noStroke();

  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      fill(grid[x][y].colour);
      circle(x * squareSize + squareSize/2, y * squareSize + squareSize/2, grid[x][y].diameter);
    }
  }

  // Buttons to play again or back to start
  // fill(255);
  // stroke(2);
  // rect(width/2 - buttonProperties.width/2, (height/3)*2 - buttonProperties.height, buttonProperties.width, buttonProperties.height);
}

function mouseClicked() {
  if (screenState === "player-player") {
    let x = Math.floor(mouseX/squareSize);
  
    if (playerTurn % 2 === 0) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].colour = "#d10000"; 
          playerTurn ++;
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
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].colour === "#1100a6" && grid[x+1][y].colour === "#1100a6" && grid[x+2][y].colour === "#1100a6" && grid[x+3][y].colour === "#1100a6") {
          winColour = "Blue";
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
      if (x-3 > NUM_OF_COLS && y+3 < NUM_OF_ROWS) {
        if (grid[x][y].colour === "#d10000" && grid[x-1][y+1].colour === "#d10000" && grid[x-2][y+2].colour === "#d10000" && grid[x-3][y+3].colour === "#d10000") {
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].colour === "#1100a6" && grid[x-1][y+1].colour === "#1100a6" && grid[x-2][y+2].colour === "#1100a6" && grid[x-3][y+3].colour === "#1100a6") {
          winColour = "Blue";
          win = true;
        } 
      }
    }
  }

  // Check for tie
  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      if (grid[x][y].state === "empty") {
        return false;
      }
    }
  }
  allFilled = true;

  if (win === true) {
    screenState = "win";
  }
  else if (win !== true && allFilled) {
    screenState = "tie"
  }
}

function announceWinner(winColour) {
  fill(0);
  textAlign(CENTER);
  textSize(75);
  text(`${winColour} wins!`, width - (width - NUM_OF_COLS*squareSize)/2, height/3); 
}

function tie() {
  fill(0);
  textAlign(CENTER);
  textSize(60);
  text("You both lost, \nwomp womp.", width - (width - NUM_OF_COLS*squareSize)/2, height/3); 
}

function chipProperties(x, y) {
  let chip = {
    x: x, 
    y: y,
    diameter: squareSize - squareSize*0.2, 
    colour: 255,
    state: "empty",
  };
  return chip;
}