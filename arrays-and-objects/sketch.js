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

  for (let theRect of hills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }

  moveCharacter();
  spawnCharacter();
}

function makeHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.001;

  // Styling 
  noStroke;
  fill("green");

  for (let x = 0; x < width; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * height;
    someRect = makeRect(x, theHeight, WIDTH_OF_RECTS);
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
    charX: 0,
    charY: height - hills[0].height,
    charw: 50,
  };
  
  square(character.charX, character.charY, character.width);
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