// Sierpinski Triangle with Recursion 
// Dec 18, 2024

let initialTriangle = [
  {x: 625, y: 30},
  {x: 50, y: 730},
  {x: 1200, y: 730},
];

let theDepth = 0;

let theColours = ["blue", "red", "green", "pink", "yellow", "orange", "cyan", "turquoise"];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, theDepth);
}

function mousePressed() {
  if (theDepth < 7) {
    theDepth ++;
  }
}

function sierpinski(points, depth) {
  fill(theColours[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  // Escape clause 
  if (depth > 0) {
    // Draw upper triangle 
    sierpinski([points[0], midpoint(points[0], points[1]), midpoint(points[0], points[2])], depth - 1);

    // Draw left triangle 
    sierpinski([points[1], midpoint(points[0], points[1]), midpoint(points[1], points[2])], depth - 1);

    // Draw right triangle
    sierpinski([points[2], midpoint(points[1], points[2]), midpoint(points[0], points[2])], depth - 1);
  }
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;

  return {x: midX, y: midY};
}