// Walker OOP Demo

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.radius = 3;
    this.colour = theColour;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // Up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // Down 
      this.y += this.speed;
    }
    else if (choice < 75) {
      // Left 
      this.x -= this.speed;
    }
    else {
      // Right 
      this.x += this.speed;
    }
  }
}

let walkerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let winston = new Walker(width/2, height/2, "red");
  walkerArray.push(winston);
}

function draw() {
  for (let theWalker of walkerArray) {
    theWalker.move();
    theWalker.display();
  }
}

function mousePressed() {
  let randomColour = color(random(255), random(255), random(255));
  let someWalker  = new Walker(mouseX, mouseY, randomColour);
  walkerArray.push(someWalker);
}