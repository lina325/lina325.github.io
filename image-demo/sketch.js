// Image Demo
// Sept 23, 2024

let totoroImg;

function preload() {
  totoroImg = loadImage('totoro.webp');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  image(totoroImg, mouseX, mouseY);
}
