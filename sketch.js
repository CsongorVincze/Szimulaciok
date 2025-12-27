
let angle;
let angleV = 0;
let angleA = 0;

let jozsi;
let len;
let gravity = 1;
//todo: a tomeget is erdemes lenne beallitani

let mu;

function setup(){
  createCanvas(600, 600);
  origin = createVector(300, 0);
  angle = PI/4;
  mu = 0.01;

  jozsi = createVector();

  lenSlider = createSlider(20, 400, 200); 
  dampingSlider = createSlider(0.0, 0.1, 0.01, 0.005);
  //todo: itt osszeakad a szog allitas a hossz allitassal

}

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


}
