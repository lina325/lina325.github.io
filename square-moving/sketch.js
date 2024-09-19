// Square Moving Around Screen 
// Sept 19, 2024


let x = 0;
let y = 0;
let sideLength = 50;
let speed = 3;
let state = "right";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  fill(0);
  
  moveSquare();
  displaySquare();
}

function moveSquare() {
  if (state === "right") {
    x += speed;
    if (x >= width - sideLength) {
      state = "down";
    }
  }
  else if (state === "down") {
    y += speed;
    if (y >= height - sideLength) {
      state = "left";
    }
  }
  else if (state === "left") {
    x -= speed;
    if (x <= 0) {
      state = "up";
    }
  }
  else if (state === "up") {
    y -= speed;
    if (y <= 0) {
      state = "right";
    }
  }
}

function displaySquare() {
  fill(0);
  square(x, y, sideLength);
}
