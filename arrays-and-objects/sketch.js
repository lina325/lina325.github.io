// Biking Scenery
// Angelina Zhu
// Oct 21, 2024
//
// Extra for Experts:
// Exploration into using gifs (Learnt from: https://editor.p5js.org/remarkability/sketches/tuTPZXym9)

// Bg image - https://www.freepik.com/free-photo/photorealistic-style-clouds-meadow_93622487.htm#query=nature%20sky&position=5&from_view=keyword&track=ais_hybrid&uuid=7b305107-55d9-44b5-81bc-0dfd923aeddb
// Biking gif - https://wifflegif.com/gifs/620701-flash-animation-bike-riding-gif
// Music - Boba Date by Stream Cafe (Royalty Free Music - https://youtu.be/kj1MDJXJ7-I)

let hills = [];
let middleHills = [];
let steepHills = [];
let someRect;
const WIDTH_OF_RECTS = 2;

let aRect;
let characterProperties;
let character;
const REDUCTION = 0.5;
let i = 100/2;

// To compensate for slight space at bottom of gif
const EXTRA_SPACE = 12;  

let bgMusic;
let bgImage;  

function preload() {
  bgMusic = loadSound("bg-music.mp3");
  bgImage = loadImage("sky.png");
  character = createImg("biking-with-fox.gif", "Gif of sketch of a person riding a bike with a fox running in front of them");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeHills(WIDTH_OF_RECTS); 
  makeMiddleHills(WIDTH_OF_RECTS);
  makeSteepHills(WIDTH_OF_RECTS);
  setCharacter();

  // Style rectangles
  noStroke();

  // Size bg image
  bgImage.width = windowWidth;
  bgImage.height = windowHeight;
}

function draw() {
  background(bgImage); 
  displayText();

  moveSteepHills();
  displaySteepHills();

  moveMiddleHills();
  displayMiddleHills();

  moveHills();
  displayHills();

  characterMotion();
  displayCharacter();
}

// Front set of hills
function makeHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.0004; 
  
  for (let x = 0; x < width*2; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * (height/2); // Maybe make all of the hills lower to see the sky
    hills.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
    time += deltaTime;
  }
}

function displayHills() {
  // Styling
  fill("#0b7826");
  
  // Draw rects
  for (let theRect of hills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function moveHills() {
  if (hills[hills.length - 1].x <= width) {
    hills[hills.length - 1].x;
  }
  else {
    for (let theRect of hills) {
      theRect.x -= 2;
    }
  }
}

// Middle set of hills
function makeMiddleHills(WIDTH_OF_RECTS) {
  let time = 0;
  let deltaTime = 0.0017; 
  
  for (let x = 0; x < width*2; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * (height*0.75);
    middleHills.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
    time += deltaTime;
  }
}

function displayMiddleHills() {
  // Styling
  fill("#2ca84b");
  
  // Draw rects
  for (let theRect of middleHills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function moveMiddleHills() {
  if (middleHills[middleHills.length - 1].x <= width) {
    middleHills[middleHills.length - 1].x;
  }
  else {
    for (let theRect of middleHills) {
      theRect.x -= 2;
    }
  }
}

// Back set of hills
function makeSteepHills(WIDTH_OF_RECTS) {
  let time = 5;
  let deltaTime = 0.003; 

  for (let x = 0; x < width*2; x += WIDTH_OF_RECTS) {
    let theHeight = noise(time) * height;
    steepHills.push(makeRect(x, theHeight, WIDTH_OF_RECTS));
    time += deltaTime;
  }
}

function displaySteepHills() {
  // Styling
  fill("#4d6352");

  // Draw rects
  for (let theRect of steepHills) {
    rect(theRect.x, theRect.y, theRect.width, theRect.height);
  }
}

function moveSteepHills() {
  if (steepHills[steepHills.length - 1].x <= width) {
    steepHills[steepHills.length - 1].x;
  }
  else {
    for (let theRect of steepHills) {
      theRect.x -= 1;
    }
  }
}

// Properties of each rectangle in hill arrays
function makeRect(xPos, rectHeight, rectWidth) {
  aRect = {
    x: xPos,
    y: height - rectHeight,
    width: rectWidth,
    height: rectHeight,
  };
  return aRect;
}

// Properties of sprite
function setCharacter() {
  characterProperties = {
    charX: 100,
    charY: height - hills[0].height - character.height*REDUCTION + EXTRA_SPACE, 
    charW: character.width*REDUCTION,
    charH: character.height*REDUCTION,
  };
}

function displayCharacter() {
  character.position(characterProperties.charX, characterProperties.charY);
  character.size(characterProperties.charW, characterProperties.charH);
}

function characterMotion() {
  // Make character run off screen when done
  if (hills[hills.length - 1].x <= width && characterProperties.charX <= width) {
    characterProperties.charX += 2;
  }

  // Move character along hills
  if (i < hills.length) {
    characterProperties.charY = height - hills[i].height - characterProperties.charH + EXTRA_SPACE;
    i += 1;
  }
}

// Play background music
function keyPressed() {
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
  }
}

// Display text if music not playing
function displayText() {
  fill(0);
  textAlign(CENTER);
  textSize(40);

  if (!bgMusic.isPlaying()) {
    text("Press any key to start music", width/2, 50);
  }
}