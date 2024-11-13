// Basic Connect 4
// Angelina Zhu
// Nov 8, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Food idea credit to my mom; Checking logic for check-win system help from my dad

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
let redChip;

let buttonProperties = {
  width: 300, 
  height: 110,
};

function preload() {
  blueChip = loadImage("blue-chip.png");
  redChip = loadImage("red-chip.png");
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

  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      circleMask.circle(x * squareSize + squareSize/2, y * squareSize + squareSize/2, grid[x][y].diameter);
    }
  }
  blueChip.mask(circleMask);
  redChip.mask(circleMask);
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

function generateGrid(cols, rows) { 
  let newGrid = [];
  
  for (let x = 0; x < cols; x ++) {
    newGrid.push([]);
    for (let y = 0; y < rows; y ++) {
      newGrid[x].push(chipProperties(x, y));

      circleMask = createGraphics(squareSize, squareSize);
      circleMask.fill(100);
    }
  }
  
  return newGrid;
}

function displayStartScreen() {
  background(240); //Maybe add/replace with image?

  fill(0);
  textAlign(CENTER);
  textSize(110);
  text("Connect 4", width/2, height/4); 

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
      
      if (grid[x][y].img !== 255) {
        image(grid[x][y].img, x*squareSize, y*squareSize, squareSize, squareSize);
      }
    }
  }

  // Buttons to play again or back to start
  // fill(255);
  // stroke(2);
  // rect(width - (width - NUM_OF_COLS*squareSize)/2, height/3 * 2, buttonProperties.width, buttonProperties.height);
}

function mouseClicked() {
  if (screenState === "player-player") {
    let x = Math.floor(mouseX/squareSize);
  
    if (playerTurn % 2 === 0) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].colour = "#d10000"; 
          grid[x][y].img = redChip;
          playerTurn ++;
          break;
        }
      }
    }
    else if (playerTurn % 2 === 1) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].colour = "#1100a6"; 
          grid[x][y].img = blueChip;
          playerTurn ++;
          break;
        }
      }
    }
    
    // Update grid
    for (let x = 0; x < NUM_OF_COLS; x ++) {
      for (let y = 0; y < NUM_OF_ROWS; y ++) {
        if (grid[x][y].img !== 255) {
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
      if (x-3 >= 0 && y+3 < NUM_OF_ROWS) {
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

  if (win === true) {
    screenState = "win";
  }
  else if (win !== true && allFilled) {
    screenState = "tie";
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
    img: 255,
  };
  return chip;
}