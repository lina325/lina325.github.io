// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let light = "green"; 
let greenTime = 6000;
let yellowTime = 3000;
let redTime = 5000;
// let light = ["green", "yellow", "red"]
// let times = [6000, 3000, 5000]
// let n = 0

let lastChanged = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeLights() {
  // let lightColour = light[n]
  // let waitTime = times[n]

  // // Check to change
  // if (n < 2) {
  //   if (millis() > lastChanged + waitTime) {
  //     n += 1;
  //   }
  // }
  // else {
  //   n = 0;
  // }

  if (millis() > lastChanged + greenTime && light === "green") {
    light = "yellow";
    lastChanged = millis()
  }
  else if (millis() > lastChanged + yellowTime && light === "yellow") {
    light = "red";
    lastChanged = millis()
  }
  else if (millis() > lastChanged + redTime && light === "red") {
    light = "green";
    lastChanged = millis()
  }

  // Change the image
  if (light === "green") {
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  else if (light === "yellow") {
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else if (light === "red") {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}