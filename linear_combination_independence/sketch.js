
let v1, v2;
let slider1, slider2;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create UI elements
  // Slider for first vector scalar: range -3 to 3, start at 1, step 0.1
  slider1 = createSlider(-3, 3, 1, 0.1);
  slider1.position(20, 20);
  
  // Slider for second vector scalar: range -3 to 3, start at 1, step 0.1
  slider2 = createSlider(-3, 3, 1, 0.1);
  slider2.position(20, 50);
  
  // Button to generate new random vectors
  button = createButton('Generate New Vectors');
  button.position(20, 80);
  button.mousePressed(generateVectors);
  
  // Initialize vectors
  generateVectors();
}

function generateVectors() {
  // Create two random unit vectors
  // random2D() gives a unit vector with a random angle (uniform distribution)
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
}

function draw() {
  background(30);
  
  // Display labels for sliders
  fill(255);
  noStroke();
  textSize(16);
  text(`v1 scalar: ${slider1.value()}`, 160, 35);
  text(`v2 scalar: ${slider2.value()}`, 160, 65);
  
  // Move origin to center of canvas
  translate(width / 2, height / 2);
  
  // Base visual length (pixels) for the unit vectors so they are visible
  let baseLen = 100;
  
  // Get scalar values
  let s1 = slider1.value();
  let s2 = slider2.value();
  
  // Calculate the scaled vectors
  let u1 = p5.Vector.mult(v1, s1 * baseLen);
  let u2 = p5.Vector.mult(v2, s2 * baseLen);
  
  // Calculate the sum vector
  let sumVec = p5.Vector.add(u1, u2);
  
  // Draw simple axes
  stroke(100);
  strokeWeight(1);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  
  // Draw the parallelogram components to visualize the sum
  stroke(150, 150, 150, 100);
  strokeWeight(1);
  // Dashed lines look better, but basic line is safe for starters.
  // Line from tip of u1 to tip of sum
  line(u1.x, u1.y, sumVec.x, sumVec.y);
  // Line from tip of u2 to tip of sum
  line(u2.x, u2.y, sumVec.x, sumVec.y);
  
  // Draw vectors
  // Vector 1 (Red)
  drawArrow(createVector(0, 0), u1, color(255, 100, 100));
  
  // Vector 2 (Blue)
  drawArrow(createVector(0, 0), u2, color(100, 100, 255));
  
  // Sum Vector (Yellow)
  drawArrow(createVector(0, 0), sumVec, color(255, 255, 100));
  
  // Label the vectors
  noStroke();
  fill(255, 100, 100);
  text("v1", u1.x + 10, u1.y);
  fill(100, 100, 255);
  text("v2", u2.x + 10, u2.y);
  fill(255, 255, 100);
  text("sum", sumVec.x + 10, sumVec.y);
}

// Helper function to draw an arrow
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0); // Move to near the tip
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

