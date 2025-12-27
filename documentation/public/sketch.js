
let angle;
let angleV = 0;
let angleA = 0;

let jozsi;
let len;
let gravity = 1;

let mu;

function setup(){
  let canvas = createCanvas(1200, 600);
  let controls = createDiv();
  controls.id('controls');
  
  // Check if the container exists (it might not on other pages)
  if (document.getElementById('simulation-container')) {
    canvas.parent('simulation-container');
    controls.parent('simulation-container');
  }

  origin = createVector(300, 0);
  angle = PI/4;
  mu = 0.01;
  jozsi = createVector();

  controls.style('display', 'flex');
  controls.style('gap', '20px');
  controls.style('margin-top', '10px');
  controls.style('color', '#333'); // Dark text for visibility on white background

  // Container for Length
  let lenContainer = createDiv();
  lenContainer.parent(controls);
  lenContainer.style('display', 'flex');
  lenContainer.style('flex-direction', 'column');
  lenContainer.style('align-items', 'center');
  
  let lenLabel = createSpan('Pendulum Length');
  lenLabel.parent(lenContainer);
  
  lenSlider = createSlider(20, 400, 200); 
  lenSlider.parent(lenContainer);

  // Container for Damping
  let muContainer = createDiv();
  muContainer.parent(controls);
  muContainer.style('display', 'flex');
  muContainer.style('flex-direction', 'column');
  muContainer.style('align-items', 'center');

  let muLabel = createSpan('Damping (Friction)');
  muLabel.parent(muContainer);
  
  dampingSlider = createSlider(0.0, 0.1, 0.01, 0.005);
  dampingSlider.parent(muContainer);
}


let angleHistory = [];

function draw(){
  background(0);

  len = lenSlider.value();
  mu = dampingSlider.value();
  angleA = (-1 * gravity) * sin(angle) / len - mu * angleV;
  angleV += angleA;
  angle += angleV;

  jozsi.x = len * sin(angle) + origin.x;
  jozsi.y = len * cos(angle) + origin.y;

  if (mouseIsPressed) {
    if (mouseX < 600 && mouseY < 600) { // Only interact with pendulum on the left upper side
      angle = atan2(mouseX - origin.x, mouseY - origin.y);
      angleV = 0;
      jozsi.x = len * sin(angle) + origin.x;
      jozsi.y = len * cos(angle) + origin.y;
    }
  }

  stroke(255);
  strokeWeight(8);
  fill(127);
  line(origin.x, origin.y, jozsi.x, jozsi.y);
  circle(jozsi.x, jozsi.y, 64);

  // rakodjad a nyilakat oda ugy e

  // sebesseg nyil
  stroke(0, 0, 255);
  strokeWeight(8);
  let velocityX = len * angleV * cos(angle);
  let velocityY = -len * angleV * sin(angle);
  
  line(jozsi.x, jozsi.y, jozsi.x + velocityX * 10, jozsi.y + velocityY * 10);
  // gyorsulas nyil
  stroke(255, 0, 0);
  strokeWeight(8);
  let accelerationX = len * angleA * cos(angle);
  let accelerationY = -len * angleA * sin(angle);

  line(jozsi.x, jozsi.y, jozsi.x + accelerationX * 100, jozsi.y + accelerationY * 100);

  // Graph logic
  angleHistory.push(angle);
  // Limit history to the width of the graph area (approx 550 pixels)
  if (angleHistory.length > 500) {
    angleHistory.shift();
  }

  // Draw Graph Background
  noStroke();
  fill(20);
  rect(600, 0, 600, 600);

  // Draw Axes
  stroke(255);
  strokeWeight(2);
  line(650, 300, 1150, 300); // X axis (Time)
  line(650, 50, 650, 550);   // Y axis (Angle)

  // Label Axes
  noStroke();
  fill(255);
  textSize(16);
  text("Time", 1100, 320);
  text("Angle", 600, 50);

  // Draw Graph
  noFill();
  stroke(0, 255, 0); // Green color for angle
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < angleHistory.length; i++) {
    // Map i to x position
    let x = 650 + i;
    // Map angle to y position (center at 300, scale factor e.g., 50 pixels per radian)
    let y = 300 - angleHistory[i] * 50; 
    vertex(x, y);
  }
  endShape();
}
