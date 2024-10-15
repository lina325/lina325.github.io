// Project Title
// Angelina Zhu
// Oct __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let hills = [];
let hills1 = [];
let someRect;
const WIDTH_OF_RECTS = 2;

let aRect;
let character;

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeHills(WIDTH_OF_RECTS);
  makeHills1(WIDTH_OF_RECTS);
  setCharacter();

  noStroke();
}

function draw() {
  background("#b7c4f7");

  displayHills1();
  displayHills();

  // characterMotion();
  displayCharacter();
}

function displayHills() {
  // Styling
  fill("#035718");

  // for (let theRect of hills) {
  //   rect(theRect.x, theRect.y, theRect.width, theRect.height);
  // }

  // Maybe a nested loops will work?
  for (let i = 0; i < width; i++) {
    rect(hills[i].x, hills[i].y, hills[i].width, hills[i].height);
  }
}

function moveHills() {
  
}

function makeHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.0004; // Look for numbers to make hills less drastic, maybe 0.0003 - 0.0006

  for (let x = 0; x < width + 500; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * (height/2);
    hills.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
    time += deltaTime;
  }
}

function displayHills1() {
  fill("#01260a");

  for (let theRect of hills1) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function makeHills1(WIDTH_OF_RECTS) {
  let time = 5;
  let deltaTime = 0.003; // Look for numbers to make hills less drastic, maybe 0.0003 - 0.0006

  for (let x = 0; x < width; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * height;
    hills1.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
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
  return aRect;
}

function setCharacter() {
  character = {
    charW: 50,
    charX: 0,
    charY: height - hills[0].height, // Take away image height
  };
}

function displayCharacter() {
  fill(0);
  square(character.charX, character.charY, character.charW);  
}

function characterMotion() {
  character.charX += 2;

  // for (let i = 1; i < width; i ++) {
  character.charY = height - hills[1].height;
  // }
}