// Haikyuu Chaos
// Angelina Zhu
// Sept 30, 2024
//
// Extra for Experts:
// Used arrays to store images and image positioning

// Got the idea to use arrays to stamp the images from the shape-stamper project 


// Set variables

// Background
let bgcolour = 220;
let bgsizing = 1.5;

let karasunoBgImg;
let nekomaBgImg;
let fukorodaniBgImg;
let inarizakiBgImg;

let flashFrequency = 100;
let lastTimeChanged = 0;
let showImage = false;

// Characters
let hinataImg;
let kagsImg;
let kenmaImg;
let kurooImg;
let bokutoImg;
let akaashiImg;
let atusmuImg;
let osamuImg;

let n = 0;
let reduction = 0.4;

let characterList;
let character;

let xPos = [];
let yPos = [];
let stampedChar = [];

// Button
let buttonWidth = 200;
let buttonHeight = 80;

// Set state
let screenState = "instructions";


// Load all images
function preload() {
  hinataImg = loadImage("characters/hinataCrow.png");
  kagsImg = loadImage("characters/kagsCrow.png");
  kenmaImg = loadImage("characters/kenmaCat.png");
  kurooImg = loadImage("characters/kurooCat.png");
  bokutoImg = loadImage("characters/bokutoOwl.png");
  akaashiImg = loadImage("characters/akaashiOwl.png");
  atusmuImg = loadImage("characters/atsumuFox.png");
  osamuImg = loadImage("characters/osamuFox.png");

  karasunoBgImg = loadImage("background-images/karasuno.png");
  nekomaBgImg = loadImage("background-images/nekoma.png");
  fukorodaniBgImg = loadImage("background-images/fukorodani.png");
  inarizakiBgImg = loadImage("background-images/inarizaki.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  characterList = [hinataImg, kagsImg, kenmaImg, kurooImg, bokutoImg, akaashiImg, atusmuImg, osamuImg];
}

function draw() {
  if (screenState === "instructions") {
    instructionPage();
  }

  else if (screenState === "started") {
    background(bgcolour);

    flashBackground();

    displayCharacter();
  }
}

function instructionPage() {
  background(bgcolour);

  // White window with intructions
  fill(255);
  rect(windowWidth*0.5 - windowWidth*0.75*0.5, windowHeight*0.5 - windowHeight*0.75*0.5, windowWidth*0.75, windowHeight*0.75);

  fill(0);
  textAlign(CENTER);
  textSize(30);
  text("I don't know what this is :)", windowWidth*0.5, windowHeight*0.3);

  textSize(20);
  text("Arrow keys - Change character\n Numbers (1-4) - Change background colour\n Hold Space Bar - Flash background\n Mouse Click - Stamp character", windowWidth*0.5, windowHeight*0.4);

  // OK Button
  fill(225);
  rect(windowWidth*0.5 - buttonWidth*0.5, windowHeight*0.65 - buttonHeight*0.5, buttonWidth, buttonHeight);

  fill(0);
  textSize(30);
  text("Ok", windowWidth*0.5, windowHeight*0.66);

  // Check if button is being pressed 
  if (mouseIsPressed && mouseX <= windowWidth*0.5 + buttonWidth*0.5 && mouseX >= windowWidth*0.5 - buttonWidth*0.5 && mouseY <= windowHeight*0.65 + buttonHeight*0.5 && mouseY >= windowHeight*0.65 - buttonHeight*0.5) {
    screenState = "started";
  }
}

function keyPressed() { 
  // Change background colour
  if (key === "1") { 
    bgcolour = "#040942";
  }
  else if (key === "2") {
    bgcolour = "#b00202";
  }
  else if (key === "3") {
    bgcolour = "#faf6eb";
  }
  else if (key === "4") {
    bgcolour = "#0e0e0f";
  }

  // Change character
  else if (keyCode === RIGHT_ARROW) {
    if (n < 7) {
      n += 1;
    }
    else {
      n;
    }
  }
  else if (keyCode === LEFT_ARROW) {
    if (n > 0) {
      n -= 1;
    }
    else {
      n;
    }
  }  
}

function flashBackground() {
  let bgImages = [karasunoBgImg, nekomaBgImg, fukorodaniBgImg, inarizakiBgImg];
  let m;

  // Check if space key is down
  if (keyIsDown(32)) {
    if (millis() > lastTimeChanged + flashFrequency) {
      showImage = !showImage;
      lastTimeChanged = millis();
    }
  }

  // Check which banner to flash
  if (bgcolour === "#040942") {
    m = 0;
  }
  if (bgcolour === "#b00202") {
    m = 1;
  }
  if (bgcolour === "#faf6eb") {
    m = 2;
  }
  if (bgcolour === "#0e0e0f") {
    m = 3;
  }
    
  // Flash the banner
  if (showImage) {
    image(bgImages[m], windowWidth*0.5 - bgImages[m].width*bgsizing*0.5, windowHeight*0.5 - bgImages[m].height*bgsizing*0.5, bgImages[m].width*bgsizing, bgImages[m].height*bgsizing);
  }
  else {
    bgcolour;
  }
}

function mouseClicked() {
  character = characterList[n];

  if (screenState === "started") {
    append(xPos, mouseX);
    append(yPos, mouseY); 
    append(stampedChar, character);
  }
}

// Show character on screen
function displayCharacter() {
  character = characterList[n];

  // Show character on screen
  image(character, mouseX - character.width*reduction*0.5, mouseY - character.height*reduction*0.5, character.width*reduction, character.height*reduction);

  // Show stamped characters
  for (let i = 1; i < xPos.length; i++) {
    image(stampedChar[i], xPos[i] - character.width*reduction*0.5, yPos[i] - character.height*reduction*0.5, character.width*reduction, character.height*reduction);
  }
}