// Project Title
// Angelina Zhu
// Oct __, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rects = [];
const NUM_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let widthOfRects = width/NUM_OF_RECTS;
}

function draw() {
  background(220);

  for (let i = 0; i < width; i++) { // How to make it continuous...?

  }
}

function makeHills(widthOfRects) {
  let time = 0;
  let deltaTime = 0.001;

  for (let x = 0; x < width; x += widthOfRects) {
    
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
