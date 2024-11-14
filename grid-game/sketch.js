// Basic Connect 4
// Angelina Zhu
// Nov 8, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Food idea credit to my mom; Checking logic for check-win system help from my dad

const NUM_OF_COLS = 7; 
const NUM_OF_ROWS = 6;
let squareSize;
let grid;
let turn = 0;
let playerTurn = 0;
let player1;
let player2;

let screenState = "start";
let winColour;
let win = false;
let allFilled = false;
let circleMask;
let blueChip;
let redChip;

const BUTTON_PROPERTIES = {
  width: 300, 
  height: 110,
};

function preload() {
  blueChip = loadImage("blue-chip.png");
  redChip = loadImage("red-chip.png");
  // redChip = loadImage("image.png");
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
      circleMask.circle(x * squareSize + squareSize/2, y * squareSize + squareSize/2, grid[x][y].diameter); //Maybe don't need to apply mask to each spot? Also then why does it work on the displayTurn function haha
    }
  }
  blueChip.mask(circleMask);
  redChip.mask(circleMask);
}

function draw() {
  if (screenState === "start") {
    displayStartScreen();
  }
  else if (screenState === "select") {
    displaySelectionScreen();
  }
  else if (screenState === "player-player") { //Maybe try making a choose colours thing? 
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
  background(240);

  fill(0);
  textAlign(CENTER);
  textSize(110);
  text("Connect 4", width/2, height/4); 

  textSize(30);
  text("Press space bar to start", width/2, height/2);

  if (keyIsPressed && keyCode === 32) {
    screenState = "select";
  }
}

function displaySelectionScreen() {
  background(240);

  text("Choose 1st player colour", width/2, height/12);

  // Find images first haha 
  image(redChip, width/6, height/3, squareSize, squareSize);
  image(blueChip, width/6 * 2, height/3, squareSize, squareSize);
  

  player2 = blueChip;
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

  displayButton();
  displayTurn();
  // displayScore();
}

function displayButton() {
  fill(200);
  rect(width - (width - NUM_OF_COLS*squareSize)/2 - BUTTON_PROPERTIES.width/2, height/4 * 3 - BUTTON_PROPERTIES.height/2, BUTTON_PROPERTIES.width, BUTTON_PROPERTIES.height);

  fill(0);
  textSize(40);
  text("Back", width - (width - NUM_OF_COLS*squareSize)/2, height/4 * 3);

  if (mouseX >= width - (width - NUM_OF_COLS*squareSize)/2 - BUTTON_PROPERTIES.width/2 && mouseX < width - (width - NUM_OF_COLS*squareSize)/2 + BUTTON_PROPERTIES.width/2 && mouseY > height/4 * 3 - BUTTON_PROPERTIES.height/2 && mouseY < height/4 * 3 + BUTTON_PROPERTIES.height/2 && mouseIsPressed) {
    screenState = "start";
  }
}

function displayTurn() {
  // fill(0);
  text("Player:", width - (width - NUM_OF_COLS*squareSize)/2, height/4);

  if (playerTurn % 2 === 0) {
    image(redChip, width - (width - NUM_OF_COLS*squareSize)/2 - squareSize/2, height/4 + 20, squareSize, squareSize);
  }
  else {
    image(blueChip, width - (width - NUM_OF_COLS*squareSize)/2 - squareSize/2, height/4 + 20, squareSize, squareSize);
  }
}

function displayScore() {

}

function mouseClicked() {
  if (screenState === "select") {
    if (clickedInCircle(mouseX, mouseY)) { //Need to check which one is clicked..
      player1 = redChip;
    }
  }

  if (screenState === "player-player") {
    let x = Math.floor(mouseX/squareSize);
  
    if (playerTurn % 2 === 0) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].img = player1;
          playerTurn ++;
          break;
        }
      }
    }
    else {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].img = player2;
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

function clickedInCircle(x, y) {
  let distFromCenter = dist(x, y, width/6, height/3);
  if (distFromCenter < squareSize/2) {
    return true;
  }
  else {
    return false;
  }
}

function checkWin() {
  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      
      // Check vertical
      if (y+3 < NUM_OF_ROWS) {
        if (grid[x][y].img === redChip && grid[x][y+1].img === redChip && grid[x][y+2].img === redChip && grid[x][y+3].img === redChip) {
          winColour = "Red";
          win = true;
        }
        else if (grid[x][y].img === blueChip && grid[x][y+1].img === blueChip && grid[x][y+2].img === blueChip && grid[x][y+3].img === blueChip) {
          winColour = "Blue";
          win = true;
        }
      }

      // Check horizontal
      if (x+3 < NUM_OF_COLS) {
        if (grid[x][y].img === redChip && grid[x+1][y].img === redChip && grid[x+2][y].img === redChip && grid[x+3][y].img === redChip) {
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].img === blueChip && grid[x+1][y].img === blueChip && grid[x+2][y].img === blueChip && grid[x+3][y].img === blueChip) {
          winColour = "Blue";
          win = true;
        } 
      }

      // Check left to right diagonal
      if (x+3 < NUM_OF_COLS && y+3 < NUM_OF_ROWS) {
        if (grid[x][y].img === redChip && grid[x+1][y+1].img === redChip && grid[x+2][y+2].img === redChip && grid[x+3][y+3].img === redChip) {
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].img === blueChip && grid[x+1][y+1].img === blueChip && grid[x+2][y+2].img === blueChip && grid[x+3][y+3].img === blueChip) {
          winColour = "Blue";
          win = true;
        } 
      }

      // Check right to left diagonal
      if (x-3 >= 0 && y+3 < NUM_OF_ROWS) {
        if (grid[x][y].img === redChip && grid[x-1][y+1].img === redChip && grid[x-2][y+2].img === redChip && grid[x-3][y+3].img === redChip) {
          winColour = "Red";
          win = true;
        } 
        else if (grid[x][y].img === blueChip && grid[x-1][y+1].img === blueChip && grid[x-2][y+2].img === blueChip && grid[x-3][y+3].img === blueChip) {
          winColour = "Blue";
          win = true;
        } 
      }
    }
  }

  if (win === true) {
    screenState = "win"; //May be able to end it if win is true cuz if it is you don't need to check for a tie
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
    diameter: squareSize - squareSize*0.15,
    colour: 255,
    state: "empty",
    img: 255,
  };
  return chip;
}