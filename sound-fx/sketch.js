// Sound Effects Demo
// Oct 16, 2024

let bgMusic;
let clickEffect;

function preload() {
  bgMusic = loadSound("background-music.mp3");
  clickEffect = loadSound("gem.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.amp(0.3);
  clickEffect.amp(1.0);
}

function draw() {
  background(220);
}

function mousePressed() {
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
  }
}

function keyPressed() {
  clickEffect.play();
}