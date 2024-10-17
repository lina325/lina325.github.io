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
let i = 0;

let bgImage;

function preload() {
  bgImage = loadImage("sky.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeHills(WIDTH_OF_RECTS); // Try adding second half of array where it's reversed
  reverseHill(hills);

  makeHills1(WIDTH_OF_RECTS);
  setCharacter();

  noStroke();

  bgImage.width = width;
  bgImage.height = height;
}

function draw() {
  background(bgImage); //Maybe look for different image, this one looks funky lol (or draw one yourself)
  // background("#b7c4f7"); 

  moveHills1();
  displayHills1();

  moveHills();
  displayHills();

  characterMotion();
  displayCharacter();
}

function reverseHill(array) {
  for (let i = 0; i < array.length; i++) {
    array[array.length-i];
  }
}

function makeHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.0004; 
  
  for (let x = 0; x < width; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * (height/2);
    hills.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
    time += deltaTime;
  }
}

function displayHills() {
  // Styling
  fill("#035718");
  
  // Draw rects
  for (let theRect of hills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function moveHills() {
  // Shift through hill values to access y value
  hills.push(hills.shift()); 

  // Move hills to the left
  for (let theRect of hills) { 
    if (theRect.x === 0) {
      theRect.x = width - 2;
    }
    else {
      theRect.x -= 2;
    }
  }
}

function makeHills1(WIDTH_OF_RECTS) {
  let time = 5;
  let deltaTime = 0.003; 

  for (let x = 0; x < width; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * height;
    hills1.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
    time += deltaTime;
  }
}

function displayHills1() {
  // Styling
  fill("#01260a");

  // Draw rects
  for (let theRect of hills1) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function moveHills1() {
  for (let theRect of hills1) {
    theRect.x -= 1;
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
    charY: height - hills[0].height - 50, // Take away image height, # is placeholder
  };
}

function displayCharacter() {
  fill(0);
  square(character.charX, character.charY, character.charW);  // Try using gif
}

function characterMotion() {
  if (character.charX < width/3) {
    // Moving character forward
    character.charX += 2; // Little bit of trouble keeping pace with hills - look into that
  }
  // Move character along hills
  character.charY = height - hills[i].height - character.charW;
  i ++;
}