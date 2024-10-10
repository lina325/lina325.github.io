// Project Title
// Angelina Zhu
// Oct __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let hills = [];
let someRect;
const WIDTH_OF_RECTS = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeHills(WIDTH_OF_RECTS);
}

function draw() {
  background(220);

  displayHills();

  moveCharacter();
  spawnCharacter();
}

function displayHills() {
  for (let theRect of hills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function makeHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.001;

  // Styling 
  noStroke();
  fill("#035718");

  for (let x = 0; x < width; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * height;
    someRect = makeRect(x, theHeight, WIDTH_OF_RECTS); // May be possible to simplify?
    hills.push(someRect);
    time += deltaTime;
  }
}

function makeRect(xPos, rectHeight, rectWidth) {
  let aRect = {
    x: xPos,
    y: height - rectHeight,
    width: rectWidth,
    height: rectHeight,
  };
  return aRect;
}

function spawnCharacter() {
  let character = {
    charW: 50,
    charX: 0,
    charY: height - hills[0].height, // need to access rectHeight to match the height of the rect each time...
  };
  
  square(character.charX, character.charY, character.charW);
}

function moveCharacter() {
  if (keyIsPressed) {
    if (key === RIGHT_ARROW) {
      character.x += 2;
    }
    else if (key === LEFT_ARROW) {
      character.x -= 2;
    }
  }
}