let x = 300;
let originallen = 250;
let k = 0.1;
let velocity = 0;
let F;
let A;
let m = 10;

function setup() {
  createCanvas(1200, 600);

  massSlider = createSlider(1, 20, 5);
  massSlider.position(20, 520);
  kSlider = createSlider(0.01, 1, 0.1, 0.01);
  kSlider.position(220, 520);
}

function draw() {
  m = massSlider.value();
  k = kSlider.value();

  background(220);
  
  // Draw Environment (Wall and Ground)
  fill(150);
  rect(0, 150, 20, 100); // Wall
  stroke(100);
  line(0, 222, 600, 222); // Ground line (radius is 20, center 200 -> bottom 220 + 2 for stroke)
  
  // Draw Slider Labels
  noStroke();
  fill(0);
  text("Mass: " + m, 20, 510);
  text("Spring Constant (k): " + k, 220, 510);
  
  // Update Physics
  F = -k * (x - originallen);
  A = F / m;
  
  if (mouseIsPressed && mouseX > 50 && mouseX < 400 && mouseY < 600) {
    x = mouseX;
    velocity = 0; // Reset velocity when dragging
    A = 0;
  } else {
    velocity += A;
    x += velocity;
    
    // Damping (optional, keeps it stable)
    //velocity *= 0.99; 
  }

  // Draw Spring
  drawSpring(20, 200, x, 200);

  // Draw Mass
  noStroke();
  fill(45, 197, 244);
  circle(x, 200, 40); // Made circle smaller so visuals are clearer

  // Draw Vectors
  drawArrow(x, 200, velocity * 10, color(0, 0, 255), "v"); // Velocity (Blue)
  drawArrow(x, 200, A * 100, color(255, 0, 0), "a"); // Acceleration (Red)

  // Update Data for Graphs
  updateGraphs(x - originallen, velocity, A);

  // Draw Graphs
  drawGraph(dispHistory, "Displacement", 600, 10, color(0));
  drawGraph(velHistory, "Velocity", 600, 210, color(0, 0, 255));
  drawGraph(accHistory, "Acceleration", 600, 410, color(255, 0, 0));
}

let dispHistory = [];
let velHistory = [];
let accHistory = [];

function drawSpring(x1, y1, x2, y2) {
  stroke(0);
  strokeWeight(2);
  noFill();
  let dist = x2 - x1;
  let zigzags = 20;
  let step = dist / zigzags;
  
  beginShape();
  vertex(x1, y1);
  for (let i = 1; i < zigzags; i++) {
    let y = (i % 2 === 0) ? y1 - 10 : y1 + 10;
    vertex(x1 + i * step, y);
  }
  vertex(x2, y2);
  endShape();
}

function drawArrow(x, y, vecMag, col, label) {
  push();
  translate(x, y);
  stroke(col);
  strokeWeight(3);
  fill(col);
  line(0, 0, vecMag, 0);
  
  let arrowSize = 6;
  if (vecMag > 0) {
    triangle(vecMag, 0, vecMag - arrowSize, -arrowSize/2, vecMag - arrowSize, arrowSize/2);
  } else if (vecMag < 0) {
    triangle(vecMag, 0, vecMag + arrowSize, -arrowSize/2, vecMag + arrowSize, arrowSize/2);
  }
  
  noStroke();
  text(label, vecMag, -10);
  pop();
}

function updateGraphs(disp, vel, acc) {
  dispHistory.push(disp);
  velHistory.push(vel);
  accHistory.push(acc);
  
  if (dispHistory.length > 300) {
    dispHistory.shift();
    velHistory.shift();
    accHistory.shift();
  }
}

function drawGraph(history, label, x, y, col) {
  push();
  translate(x, y);
  
  // Background and axes
  fill(255);
  stroke(200);
  rect(0, 0, 500, 150);
  
  // Axes (Midline and Y-axis)
  stroke(180);
  line(0, 75, 500, 75); // X-axis
  line(2, 0, 2, 150);   // Y-axis
  
  // Axes Labels
  noStroke();
  fill(100);
  textSize(10);
  text("0", 5, 75);
  text("Time", 470, 140);
  text("+", 5, 15);
  text("-", 5, 145);
  
  // Plot data
  noFill();
  stroke(col);
  strokeWeight(1.5);
  beginShape();
  for (let i = 0; i < history.length; i++) {
    // Map i from 0-300 (buffer size) to width 0-500
    // This effectively scrolls the graph if we shift the buffer
    // But since we shift, the oldest is always at 0.
    // To prevent stretching, we map the MAX size (300), not current size.
    let px = map(i, 0, 300, 0, 500);
    
    let val = history[i];
    if (label === "Acceleration") val *= 15;
    if (label === "Velocity") val *= 2;
    if (label === "Displacement") val *= 0.3;
    
    let py = 75 - val; 
    
    // Clamp to box (0-150)
    py = constrain(py, 0, 150); // Constrained to inside the box height
  
    vertex(px, py);
  }
  endShape();
  
  noStroke();
  fill(0);
  textSize(12);
  text(label, 10, 20);
  pop();
}

