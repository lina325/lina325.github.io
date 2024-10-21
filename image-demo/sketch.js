// Image Demo
// Sept 23, 2024

let totoroImg;
let circleMask;

function preload() {
  totoroImg = loadImage("totoro.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // circleMask = createGraphics(300, 300);
}

function draw() {
  background(220);

  // circleMask.fill("rgba(0, 0, 0, 1)");
  // circleMask.circle(windowWidth/2, windowHeight/2, 300);

  // totoroImg.mask(circleMask);

  image(totoroImg, mouseX, mouseY, totoroImg.width*0.2, totoroImg.height*0.2);
}
