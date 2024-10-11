// Project Title
// Angelina Zhu
// Oct __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let hills = [];
let someRect;
const WIDTH_OF_RECTS = 2;

let aRect;
let character;

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeHills(WIDTH_OF_RECTS);
}

function draw() {
  background(220);

  displayHills();

  // moveCharacter();
  // characterMotion();
  displayCharacter();
}

function displayHills() {
  // Styling
  noStroke();
  fill("#035718");

  for (let theRect of hills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function makeHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.0007; // Look for numbers to make hills less drastic, maybe 0.0003 - 0.0006

  for (let x = 0; x < width; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * height;
    makeRect(x, theHeight, WIDTH_OF_RECTS);
    time += deltaTime;
  }
}

function makeRect(xPos, rectHeight, rectWidth) {
  aRect = {
    x: xPos,
    y: height - rectHeight,
    width: rectWidth,
    height: rectHeight,
  };
  hills.push(aRect);
}

function displayCharacter() {
  character = {
    charW: 50,
    charX: 0,
    charY: height, // need to access rectHeight to match the height of the rect each time...
  };
  
  fill(0);
  square(character.charX, character.charY, character.charW);
}

// function characterMotion() {
//   character.charX += 2;
// }

// function moveCharacter() {
//   if (keyIsPressed) {
//     if (key === RIGHT_ARROW) {
//       character.charX += 2;
//     }
//     else if (key === LEFT_ARROW) {
//       character.charX -= 2;
//     }
//   }
// }