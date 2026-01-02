let pSlider;

function setup() {
  createCanvas(400, 400);
  pSlider = createSlider(0.2, 10, 2, 0.1);
  pSlider.position(10, 10);
}

function draw() {
  background(220);
  let p = pSlider.value();
  
  fill(0);
  noStroke();
  text('p = ' + p, 20, 35);
  
  translate(width / 2, height / 2);
  
  // Draw axes
  stroke(150);
  strokeWeight(1);
  line(-width/2, 0, width/2, 0);
  line(0, -height/2, 0, height/2);
  
  let r_scale = 100; // Radius in pixels representing 1 unit
  
  noFill();
  stroke(0);
  strokeWeight(2);
  beginShape();
  let totalSteps = 500;
  for (let i = 0; i < totalSteps; i++) {
    let angle = map(i, 0, totalSteps, 0, TWO_PI);
    
    // We want to solve for r in the polar equation derived from:
    // (|x|^p + |y|^p)^(1/p) = 1
    // Substitute x = r * cos(theta), y = r * sin(theta)
    // (|r * cos(theta)|^p + |r * sin(theta)|^p)^(1/p) = 1
    // |r| * (|cos(theta)|^p + |sin(theta)|^p)^(1/p) = 1
    // r = 1 / (|cos(theta)|^p + |sin(theta)|^p)^(1/p)
    
    let absCos = abs(cos(angle));
    let absSin = abs(sin(angle));
    
    let den = pow(absCos, p) + pow(absSin, p);
    
    if (den !== 0) {
      let r = 1 / pow(den, 1 / p);
      
      let x = r * cos(angle) * r_scale;
      let y = r * sin(angle) * r_scale;
      vertex(x, y);
    }
  }
  endShape(CLOSE);
}
