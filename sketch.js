
let angle;
let angleV = 0;
let angleA = 0;

let jozsi;
let len;
let gravity = 1;

function setup(){
  createCanvas(600, 600);
  origin = createVector(300, 0);
  angle = PI/4;

  len = 200;
  jozsi = createVector();
}

function draw(){
  background(0);
  angleA = (-1 * gravity) * sin(angle) / len;
  angleV += angleA;
  angle += angleV;

  jozsi.x = len * sin(angle) + origin.x;
  jozsi.y = len * cos(angle) + origin.y;

  if (mouseIsPressed) {
    angle = atan2(mouseX - origin.x, mouseY - origin.y);
    angleV = 0;
    jozsi.x = len * sin(angle) + origin.x;
    jozsi.y = len * cos(angle) + origin.y;
  }

  stroke(255);
  strokeWeight(8);
  fill(127);
  line(origin.x, origin.y, jozsi.x, jozsi.y);
  circle(jozsi.x, jozsi.y, 64);

  stroke(0, 0, 255);
  strokeWeight(4);
  let velocityX = len * angleV * cos(angle);
  let velocityY = -len * angleV * sin(angle);
  
  // Calculate bob position temporarily for drawing the arrow starting point
  let bobX = len * sin(angle) + origin.x;
  let bobY = len * cos(angle) + origin.y;
  
  line(bobX, bobY, bobX + velocityX * 10, bobY + velocityY * 10);
}
