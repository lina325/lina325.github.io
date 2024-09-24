// Project Title
// Angelina Zhu
// Sept __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Click on the canvas to begin detecting key presses

// Set variables
let x = 200;
let y = 200;
let reduction = 0.4;
let bgcolour = 220;

let hinataImg;
let kagsImg;
let kenmaImg;
let kurooImg;
let bokutoImg;
let akaashiImg;
let atusmuImg;
let osamuImg;
let n = 0;

// Load all images
function preload() {
  hinataImg = loadImage('characters/hinataCrow.png');
  kagsImg = loadImage('characters/kagsCrow.png');
  kenmaImg = loadImage('characters/kenmaCat.png');
  kurooImg = loadImage('characters/kurooCat.png');
  bokutoImg = loadImage("characters/bokutoOwl.png");
  akaashiImg = loadImage("characters/akaashiOwl.png");
  atusmuImg = loadImage("characters/atsumuFox.png");
  osamuImg = loadImage("characters/osamuFox.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgcolour)

  showCharacter();
}


function keyPressed() {       //Add iskeypressed to flash banner
  // Change background colour
  if (key === '1') { 
    bgcolour = ("#040942")
  }
  else if (key === '2') {
    bgcolour = ("#b00202");
  }
  else if (key === '3') {
    bgcolour = ("#faf6eb");
  }
  else if (key === '4') {
    bgcolour = ("#0e0e0f");
  }

  // Change character
  else if (keyCode === RIGHT_ARROW) {
    if (n < 7) {
      n += 1
    }
    else {
      n = n
    }
  }
  else if (keyCode === LEFT_ARROW) {
    if (n > 0) {
      n -= 1
    }
    else {
      n = n
    }
  }
}

function mousePressed(){
  //Make it draw it to tha canvas
}

function showCharacter() {
  // let character = characterList[n];
  let characterList = [hinataImg, kagsImg, kenmaImg, kurooImg, bokutoImg, akaashiImg, atusmuImg, osamuImg];
  let character = characterList[n];

  image(character, mouseX - character.width*reduction*0.5, mouseY - character.height*reduction*0.5, character.width*reduction, character.height*reduction);
}