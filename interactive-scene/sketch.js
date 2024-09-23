// Project Title
// Angelina Zhu
// Sept __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Click on the canvas to begin detecting key presses

let x = 200;
let y = 200;
let reduction = 0.4;

let hinataImg;
let kagsImg;
let kenmaImg;
let kurooImg;
let characterList = ['hinataImg', 'kagsImg', 'kenmaImg', 'kurooImg'];
let n = 0;
let character = hinataImg;
// let character = characterList[n];


function preload() {
  hinataImg = loadImage('hinataCrow.png');
  kagsImg = loadImage('kagsCrow.png');
  kenmaImg = loadImage('kenmaCat.png');
  kurooImg = loadImage('kurooCat.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  showCharacter();
}

function keyPressed() {
  if (key === '1') { 
    background('rgb(16,23,114)');
  }
  else if (key === '2') {
   background('rgb(236,0,0)');
  }
  else if (key === '3') {
    background('white');
  }
  else if (key === '4') {
    background('black');
  }
  // else if (key === '5') {}
  // else if (key === '6') {}
  // else if (key === '7') {}
}

// function mousePressed(){
//   character = characterList[n+1]; 
// }

function showCharacter() {
  image(character, mouseX*0.5, mouseY*0.5, character.width*reduction, character.height*reduction);
}