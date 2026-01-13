const flock = [];

let alignSlider, cohesionSlider, separationSlider;
let alignPerceptionSlider, cohesionPerceptionSlider, separationPerceptionSlider;

function setup() {
  createCanvas(1200, 600);

  // Sliders for Force Strength
  createP('Alignment Strength');
  alignSlider = createSlider(0, 5, 1, 0.1);
  createP('Cohesion Strength');
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  createP('Separation Strength');
  separationSlider = createSlider(0, 5, 1, 0.1);

  // Sliders for Perception Radius
  createP('Alignment Perception Radius');
  alignPerceptionSlider = createSlider(0, 100, 50, 1);
  createP('Cohesion Perception Radius');
  cohesionPerceptionSlider = createSlider(0, 100, 50, 1);
  createP('Separation Perception Radius');
  separationPerceptionSlider = createSlider(0, 100, 50, 1);

  for (let i = 0; i < 100; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(20);

  for (let boid of flock) {
    boid.flocking(flock);
    boid.update();
    boid.edge();
    boid.show();
  }
}
