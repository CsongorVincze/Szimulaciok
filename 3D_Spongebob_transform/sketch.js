let m00, m01, m02;
let m10, m11, m12;
let m20, m21, m22;
let btnRandom, btnReset, checkAuto;
let matrixValuesDisplay;

// Smoothed values
let s00 = 1, s01 = 0, s02 = 0;
let s10 = 0, s11 = 1, s12 = 0;
let s20 = 0, s21 = 0, s22 = 1;

let spongebobModel;
let useModel = false;

function preload() {
    // Try to load the model if it was supported, but .3mf is not natively supported by p5.js
    // We will assume for now we use a placeholder or check if user provides an OBJ later.
    // spongebobModel = loadModel('3D spongebob.3mf', true, 
    //   () => { useModel = true; console.log("Model loaded!"); }, 
    //   () => { console.log("Failed to load model (expected for .3mf)"); }
    // );
}

function setup() {
    createCanvas(windowWidth - 300, windowHeight - 40, WEBGL);

    // Select HTML elements
    m00 = select('#m00'); m01 = select('#m01'); m02 = select('#m02');
    m10 = select('#m10'); m11 = select('#m11'); m12 = select('#m12');
    m20 = select('#m20'); m21 = select('#m21'); m22 = select('#m22');

    btnRandom = select('#btnRandom');
    btnRandom.mousePressed(randomizeMatrix);

    btnReset = select('#btnReset');
    btnReset.mousePressed(resetMatrix);

    checkAuto = select('#checkAuto');

    matrixValuesDisplay = select('#matrixValues');

    // Initialize smoothed values
    resetMatrix();
}

function draw() {
    background(40);

    // Orbit control specifically before transformations if we want user to rotate the VIEW
    // But maybe we want the matrix to be the only transform?
    // Let's add orbitControl so user can see it's 3D.
    orbitControl();

    // Lights
    ambientLight(100);
    directionalLight(255, 255, 255, 0.5, 1, -0.5);
    pointLight(255, 200, 100, -200, -200, 200);

    // Auto-play
    if (checkAuto.checked()) {
        let t = millis() * 0.0005;
        // Animate nicely using noise
        m00.value(map(noise(t), 0, 1, -2, 2));
        m01.value(map(noise(t + 10), 0, 1, -1, 1));
        m02.value(map(noise(t + 20), 0, 1, -1, 1));

        m10.value(map(noise(t + 30), 0, 1, -1, 1));
        m11.value(map(noise(t + 40), 0, 1, -2, 2));
        m12.value(map(noise(t + 50), 0, 1, -1, 1));

        m20.value(map(noise(t + 60), 0, 1, -1, 1));
        m21.value(map(noise(t + 70), 0, 1, -1, 1));
        m22.value(map(noise(t + 80), 0, 1, -2, 2));
    }

    // Get target values
    let t00 = float(m00.value()); let t01 = float(m01.value()); let t02 = float(m02.value());
    let t10 = float(m10.value()); let t11 = float(m11.value()); let t12 = float(m12.value());
    let t20 = float(m20.value()); let t21 = float(m21.value()); let t22 = float(m22.value());

    // Smooth
    let lerpAmt = 0.1;
    s00 = lerp(s00, t00, lerpAmt); s01 = lerp(s01, t01, lerpAmt); s02 = lerp(s02, t02, lerpAmt);
    s10 = lerp(s10, t10, lerpAmt); s11 = lerp(s11, t11, lerpAmt); s12 = lerp(s12, t12, lerpAmt);
    s20 = lerp(s20, t20, lerpAmt); s21 = lerp(s21, t21, lerpAmt); s22 = lerp(s22, t22, lerpAmt);

    // Update text
    let matString = `
[ ${s00.toFixed(2)}, ${s01.toFixed(2)}, ${s02.toFixed(2)} ]
[ ${s10.toFixed(2)}, ${s11.toFixed(2)}, ${s12.toFixed(2)} ]
[ ${s20.toFixed(2)}, ${s21.toFixed(2)}, ${s22.toFixed(2)} ]
  `;
    matrixValuesDisplay.html(matString.replace(/\n/g, '<br>'));

    // Draw Coordination System (Axes)
    drawAxes();

    // Apply User Matrix
    // Note: p5/WEBGL applies transforms to the model matrix. 
    // applyMatrix(a,b,c,d, e,f,g,h, i,j,k,l, m,n,o,p)
    // We use our 3x3 matrix in the top-left block.
    push();
    applyMatrix(
        s00, s01, s02, 0,
        s10, s11, s12, 0,
        s20, s21, s22, 0,
        0, 0, 0, 1
    );

    // Draw Spongebob Placeholder (Yellow Box)
    noStroke();
    fill(255, 235, 59); // Sponge Yellow

    // Make it look a bit more like a sponge
    push();
    box(150, 200, 80); // Body

    // Pores (darker yellow circles/spheres)
    fill(210, 180, 40);
    translate(30, 40, 41);
    sphere(10);
    translate(-60, -80, 0);
    sphere(15);
    translate(40, 100, -82); // back
    sphere(12);
    pop();

    // Eyes
    fill(255);
    push();
    translate(-35, -50, 41);
    sphere(25); // Left eye
    translate(70, 0, 0);
    sphere(25); // Right eye

    // Pupils
    fill(50, 150, 255); // Blue
    translate(0, 0, 15);
    sphere(10);
    translate(-70, 0, 0);
    sphere(10);

    // Black dot
    fill(0);
    translate(0, 0, 7);
    sphere(5);
    translate(70, 0, 0);
    sphere(5);
    pop();

    pop();
}

function drawAxes() {
    push();
    strokeWeight(2);

    // X - Red
    stroke(255, 100, 100);
    line(0, 0, 0, 300, 0, 0);
    push(); translate(300, 0, 0); fill(255, 100, 100); sphere(2); pop();

    // Y - Green
    stroke(100, 255, 100);
    line(0, 0, 0, 0, 300, 0);
    push(); translate(0, 300, 0); fill(100, 255, 100); sphere(2); pop();

    // Z - Blue
    stroke(100, 100, 255);
    line(0, 0, 0, 0, 0, 300);
    push(); translate(0, 0, 300); fill(100, 100, 255); sphere(2); pop();

    // Grid
    stroke(255, 50);
    strokeWeight(1);
    // grid on XZ plane
    for (let i = -300; i <= 300; i += 50) {
        line(i, 0, -300, i, 0, 300);
        line(-300, 0, i, 300, 0, i);
    }
    pop();
}

function randomizeMatrix() {
    m00.value(random(-1.5, 1.5)); m01.value(random(-1, 1)); m02.value(random(-1, 1));
    m10.value(random(-1, 1)); m11.value(random(-1.5, 1.5)); m12.value(random(-1, 1));
    m20.value(random(-1, 1)); m21.value(random(-1, 1)); m22.value(random(-1.5, 1.5));
}

function resetMatrix() {
    m00.value(1); m01.value(0); m02.value(0);
    m10.value(0); m11.value(1); m12.value(0);
    m20.value(0); m21.value(0); m22.value(1);

    // Reset smoothed immediately
    s00 = 1; s01 = 0; s02 = 0;
    s10 = 0; s11 = 1; s12 = 0;
    s20 = 0; s21 = 0; s22 = 1;

    if (checkAuto) checkAuto.checked(false);
}

function windowResized() {
    resizeCanvas(windowWidth - 300, windowHeight - 40);
}
