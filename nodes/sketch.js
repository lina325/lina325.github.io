// Connected Nodes OOP

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width/2, height/2);
  points.push(somePoint);
}

function draw() {
  background(255);

  // Draw lines first
  for (let point of points) {
    point.update();
    point.connectTo(points);
  }

  // Draw circles on top
  for (let point of points) {
    point.display();
  }
}

function mousePressed() {
  let newPoint = new MovingPoint(mouseX, mouseY);
  points.push(newPoint);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.colour = color(random(255), random(255), random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
    this.minRadius = 15;
    this.maxRadius = 30;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      // Avoid drawing line to self 
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.colour);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }

  move() {
    // Pick a random direction to move 
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // Scale to mvnt speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // Move the point 
    this.x += this.dx; 
    this.y += this.dy;

    // Move on time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    // Fell off left 
    if (this.x < 0) {
      this.x += width;
    }

    // Fell off right
    if (this.x > width) {
      this.x -= width;
    }

    // Fell off top
    if (this.y < 0) {
      this.y += height;
    }

    // Fell off bottom
    if (this.y > height) {
      this.y -= height;
    }
  }
}