// Project Title
// Angelina Zhu
// Sept __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Click on the canvas to begin detecting key presses

let x = 200;
let y = 200;
let bgcolour = 220;
let reduction = 0.4;

let hinataImg;
let kagsImg;
let kenmaImg;
let kurooImg;
let characterList = ['hinataImg', 'kagsImg', 'kenmaImg', 'kurooImg'];
let n = 0;
let character = characterList[n];


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
  background(bgcolour);
  
  showCharacter();
}

function keyPressed() {
  if (key === '1') { 
    bgcolour = 'rgb(16,23,114)'
  }
  else if (key === '2') {
    bgcolour = 'rgb(236,0,0)'
  }
  else if (key === '3') {
    bgcolour = 'white'
  }
  else if (key === '4') {
    bgcolour = 'black'
  }
  // else if (key === '5') {}
  // else if (key === '6') {}
  // else if (key === '7') {}
}

function mousePressed(){
  character = characterList[n+1]; 
}

function showCharacter() {
  image(character, x - character.width*reduction*0.5, y - character.height*reduction*0.5, character.width*reduction, character.height*reduction);
}