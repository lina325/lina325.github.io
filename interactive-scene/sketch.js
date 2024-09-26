// Project Title
// Angelina Zhu
// Sept __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Click on the canvas to begin detecting key presses

// Set variables
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
let reduction = 0.4;

let karasunoBgImg;
let nekomaBgImg;
let fukorodaniBgImg;
let inarizakiBgImg;

let flashFrequency = 1000;
let lastTimeChanged = 0;
let showImage = false;


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
}

function draw() {
  background(bgcolour);

  showCharacter();

  flashBackgroundIfNeeded();
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

function flashBackgroundIfNeeded() {
  if (keyIsDown) {
    if (millis() > lastTimeChanged + flashFrequency) {
      showImage = !showImage;
      lastTimeChanged = millis();
    }
  }
}

function mousePressed() {
  // let characterList = [hinataImg, kagsImg, kenmaImg, kurooImg, bokutoImg, akaashiImg, atusmuImg, osamuImg];
  // let character = characterList[n];

  // image(character, mouseX - character.width*reduction*0.5, mouseY - character.height*reduction*0.5, character.width*reduction, character.height*reduction);
}

function showCharacter() {
  let characterList = [hinataImg, kagsImg, kenmaImg, kurooImg, bokutoImg, akaashiImg, atusmuImg, osamuImg];
  let character = characterList[n];

  image(character, mouseX - character.width*reduction*0.5, mouseY - character.height*reduction*0.5, character.width*reduction, character.height*reduction);
}

function showBgImage() {
  let bgColours = ["#040942", "#b00202", "#faf6eb", "#0e0e0f"];
  let bgImages = [karasunoBgImg, nekomaBgImg, fukorodaniBgImg, inarizakiBgImg];
  let m;

  if (key === "49") {
    m = 0;
  }
  else if (key === "50") {
    m = 1;
  }
  else if (key === "51") {
    m = 2;
  }
  else if (key === "52") {
    m = 3;
  }

  if (showImage) {
    image(bgImages[m], windowWidth*0.5 - bgImages[m].width*0.5, windowHeight*0.5 - bgImages[m].height*0.5);
  }
  else {
    bgcolour = bgColours[m];
  }
}