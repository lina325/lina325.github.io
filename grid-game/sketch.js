// Basic Connect 4
// Angelina Zhu
// Nov 8, 2024
//
// Extra for Experts:
// Clipping images + ?

// Checking logic for check-win system help from my dad
// Image credits: https://www.youtube.com/channel/UCArLZtok93cO5R9RI4_Y5Jw (Blue chip)
// https://www.reddit.com/r/kpop/comments/1dit3dz/stray_kids_ate_logo_teaser_image/ (Red chip)
// https://ca.pinterest.com/pin/36310340742061984/ (Green chip)
// https://www.soompi.com/article/816817wpp/fantagios-new-boy-group-astro-reveals-first-teaser-and-logo (Yellow chip)


const NUM_OF_COLS = 7; 
const NUM_OF_ROWS = 6;
let squareSize;
let grid;
let playerTurn = 0;
let selectingPlayer = 1;
let player1;
let player2;

let screenState = "start";
let winColour;
let win = false;
let allFilled = false;

let circleMask;
let blueChip;
let redChip;
let greenChip;
let yellowChip;

const BUTTON_PROPERTIES = {
  width: 300, 
  height: 110,
};

function preload() {
  blueChip = loadImage("blue-chip.png");
  redChip = loadImage("red-chip.png");
  greenChip = loadImage("green-chip.png");
  yellowChip = loadImage("yellow-chip.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  squareSize = Math.floor(height/NUM_OF_ROWS);
  grid = generateGrid(NUM_OF_COLS, NUM_OF_ROWS);

  // Put mask on images
  for (let x = 0; x < NUM_OF_COLS; x ++) {
    for (let y = 0; y < NUM_OF_ROWS; y ++) {
      circleMask.circle(x * squareSize + squareSize/2, y * squareSize + squareSize/2, grid[x][y].diameter); 
    }
  }
  blueChip.mask(circleMask);
  redChip.mask(circleMask);
  greenChip.mask(circleMask);
  yellowChip.mask(circleMask);
}

function draw() {
  if (screenState === "start") {
    background(240);

    displayStartScreen();
  }
  else if (screenState === "select") {
    background(240);

    displaySelectionScreen();
  }
  else if (screenState === "player-player") { 
    win = false;
    background(150); 

    displayBoard();
    displayTurn();
    checkWin();
  }
  else if (screenState === "win") {
    background(150);

    displayBoard();
    announceWinner(winColour);
  }
  else if (screenState === "tie") {
    background(150);

    displayBoard();
    announceTie();
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
  noStroke();
  fill(0);
  textSize(45);

  if (selectingPlayer === 1) {
    text("Choose 1st player colour", width/2, height/8);
  }
  else {
    text("Choose 2nd player colour", width/2, height/8);
  }

  // Display images 
  image(redChip, width/8 - squareSize/2, height/2 - squareSize/2, squareSize, squareSize);
  image(blueChip, width/8 * 3 - squareSize/2, height/2 - squareSize/2, squareSize, squareSize);
  image(greenChip, width/8 * 5 - squareSize/2, height/2 - squareSize/2, squareSize, squareSize);
  image(yellowChip, width/8 * 7 - squareSize/2, height/2 - squareSize/2, squareSize, squareSize);
  

  // Display box if mouse is hovering over 

  // Red
  if (mouseX > width/8 - squareSize/2 && mouseX < width/8 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
    stroke(2);
    fill(0, 0, 0, 1);
    square(width/8 - squareSize/2, height/2 - squareSize/2, squareSize);
  }

  // Blue
  else if (mouseX > width/8 * 3 - squareSize/2 && mouseX < width/8 * 3 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
    stroke(2);
    fill(0, 0, 0, 1);
    square(width/8 * 3 - squareSize/2, height/2 - squareSize/2, squareSize);
  }

  // Green
  else if (mouseX > width/8 * 5 - squareSize/2 && mouseX < width/8 * 5 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
    stroke(2);
    fill(0, 0, 0, 1);
    square(width/8 * 5 - squareSize/2, height/2 - squareSize/2, squareSize);
  }

  // Yellow
  else if (mouseX > width/8 * 7 - squareSize/2 && mouseX < width/8 * 7 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
    stroke(2);
    fill(0, 0, 0, 1);
    square(width/8 * 7 - squareSize/2, height/2 - squareSize/2, squareSize);
  }


  // Check if both players have selected
  if (selectingPlayer === 3) {
    screenState = "player-player";
  }
}

function displayBoard() {
  noStroke();

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
}

function displayButton() {
  fill(200);
  rect(width - (width - NUM_OF_COLS*squareSize)/2 - BUTTON_PROPERTIES.width/2, height/4 * 3 - BUTTON_PROPERTIES.height/2, BUTTON_PROPERTIES.width, BUTTON_PROPERTIES.height);

  fill(0);
  textSize(40);

  if (screenState === "win" || screenState === "tie") {
    text("Replay", width - (width - NUM_OF_COLS*squareSize)/2, height/4 * 3 + 20);
  }
  else {
    text("Back", width - (width - NUM_OF_COLS*squareSize)/2, height/4 * 3 + 20);
  }

  // If button is pressed, go back to start screen + reset
  if (mouseX >= width - (width - NUM_OF_COLS*squareSize)/2 - BUTTON_PROPERTIES.width/2 && mouseX < width - (width - NUM_OF_COLS*squareSize)/2 + BUTTON_PROPERTIES.width/2 && mouseY > height/4 * 3 - BUTTON_PROPERTIES.height/2 && mouseY < height/4 * 3 + BUTTON_PROPERTIES.height/2 && mouseIsPressed) {
    grid = generateGrid(NUM_OF_COLS, NUM_OF_ROWS);
    selectingPlayer = 0;
    playerTurn = 0;
    screenState = "select";

  }

}

function displayTurn() {
  text("Player:", width - (width - NUM_OF_COLS*squareSize)/2, height/4);

  if (playerTurn % 2 === 0) {
    image(player1, width - (width - NUM_OF_COLS*squareSize)/2 - squareSize/2, height/4 + 20, squareSize, squareSize);
  }
  else {
    image(player2, width - (width - NUM_OF_COLS*squareSize)/2 - squareSize/2, height/4 + 20, squareSize, squareSize);
  }
}

function mouseClicked() {

  // Selecting screen
  if (screenState === "select") {

    // Red chip
    if (mouseX > width/8 - squareSize/2 && mouseX < width/8 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
      if (selectingPlayer === 1) {
        player1 = redChip;
      }
      else {
        player2 = redChip;
      }
    }

    // Blue chip
    else if (mouseX > width/8 * 3 - squareSize/2 && mouseX < width/8 * 3 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
      if (selectingPlayer === 1) {
        player1 = blueChip;
      }
      else {
        player2 = blueChip;
      }
    }

    // Green chip
    else if (mouseX > width/8 * 5 - squareSize/2 && mouseX < width/8 * 5 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
      if (selectingPlayer === 1) {
        player1 = greenChip;
      }
      else {
        player2 = greenChip;
      }
    }

    // Yellow chip
    else if (mouseX > width/8 * 7 - squareSize/2 && mouseX < width/8 * 7 + squareSize/2 && mouseY > height/2 - squareSize/2 && mouseY < height/2 - squareSize/2 + squareSize) {
      if (selectingPlayer === 1) {
        player1 = yellowChip;
      }
      else {
        player2 = yellowChip;
      }
    }

    selectingPlayer ++;
  }


  // Gameplay/Placing chips
  if (screenState === "player-player") {
    let x = Math.floor(mouseX/squareSize);
  
    // Player 1
    if (playerTurn % 2 === 0) {
      for (let y = NUM_OF_ROWS - 1; y >= 0; y --) {
        if (grid[x][y].state === "empty") {
          grid[x][y].img = player1;
          playerTurn ++;
          break;
        }
      }
    }

    // Player 2
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
        else if (grid[x][y].img === greenChip && grid[x][y+1].img === greenChip && grid[x][y+2].img === greenChip && grid[x][y+3].img === greenChip) {
          winColour = "Green";
          win = true;
        }
        else if (grid[x][y].img === yellowChip && grid[x][y+1].img === yellowChip && grid[x][y+2].img === yellowChip && grid[x][y+3].img === yellowChip) {
          winColour = "Yellow";
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
        else if (grid[x][y].img === greenChip && grid[x+1][y].img === greenChip && grid[x+2][y].img === greenChip && grid[x+3][y].img === greenChip) {
          winColour = "Green";
          win = true;
        }
        else if (grid[x][y].img === yellowChip && grid[x+1][y].img === yellowChip && grid[x+2][y].img === yellowChip && grid[x+3][y].img === yellowChip) {
          winColour = "Yellow";
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
        else if (grid[x][y].img === greenChip && grid[x+1][y+1].img === greenChip && grid[x+2][y+2].img === greenChip && grid[x+3][y+3].img === greenChip) {
          winColour = "Green";
          win = true;
        }
        else if (grid[x][y].img === yellowChip && grid[x+1][y+1].img === yellowChip && grid[x+2][y+2].img === yellowChip && grid[x+3][y+3].img === yellowChip) {
          winColour = "Yellow";
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
        else if (grid[x][y].img === greenChip && grid[x=1][y+1].img === greenChip && grid[x=2][y+2].img === greenChip && grid[x=3][y+3].img === greenChip) {
          winColour = "Green";
          win = true;
        }
        else if (grid[x][y].img === yellowChip && grid[x=1][y+1].img === yellowChip && grid[x=2][y+2].img === yellowChip && grid[x=3][y+3].img === yellowChip) {
          winColour = "Yellow";
          win = true;
        }
      }
    }
  }

  if (win === true) {
    screenState = "win";
    return;
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

function announceTie() {
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