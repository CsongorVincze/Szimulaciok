let spongebob;
let imgState = 'init'; // init, loading, success, error
let sliderA, sliderB, sliderC, sliderD;
let btnRandom, btnReset, checkAuto;
let matrixValuesDisplay;

// Smoothed values for the transformation matrix
let smoothedA = 1;
let smoothedB = 0;
let smoothedC = 0;
let smoothedD = 1;



function setup() {
    createCanvas(800, 800);
    imageMode(CENTER);

    // HTML elements are manually created in index.html for better styling control,
    // we will select them here.
    sliderA = select('#sliderA');
    sliderB = select('#sliderB');
    sliderC = select('#sliderC');
    sliderD = select('#sliderD');

    btnRandom = select('#btnRandom');
    btnRandom.mousePressed(randomizeMatrix);

    btnReset = select('#btnReset');
    btnReset.mousePressed(resetMatrix);

    checkAuto = select('#checkAuto');

    matrixValuesDisplay = select('#matrixValues');

    // Load image asynchronously in setup so the sketch starts immediately
    imgState = 'loading';
    spongebob = loadImage('Spongebob_pic.jpg',
        () => {
            console.log("Image loaded successfully");
            imgState = 'success';
        },
        (e) => {
            console.error("Failed to load image", e);
            imgState = 'error';
        }
    );

    // Initialize smoothed values to the current slider values
    smoothedA = float(sliderA.value());
    smoothedB = float(sliderB.value());
    smoothedC = float(sliderC.value());
    smoothedD = float(sliderD.value());
}

function draw() {
    background(220);

    // Auto-play logic
    if (checkAuto.checked()) {
        // Smoother random movement using Perlin noise or just random walk
        // For simplicity, let's just jitter the values a bit or pick new ones occasionally
        // A nice effect is using noise for smooth transitions

        let t = millis() * 0.001;
        let valA = map(noise(t), 0, 1, -2, 2);
        let valB = map(noise(t + 100), 0, 1, -2, 2);
        let valC = map(noise(t + 200), 0, 1, -2, 2);
        let valD = map(noise(t + 300), 0, 1, -2, 2);

        sliderA.value(valA);
        sliderB.value(valB);
        sliderC.value(valC);
        sliderD.value(valD);
    }

    // Get values
    // Get target values from sliders
    let targetA = float(sliderA.value());
    let targetB = float(sliderB.value());
    let targetC = float(sliderC.value());
    let targetD = float(sliderD.value());

    // Smoothly interpolate current values towards target values
    let lerpAmt = 0.1;
    smoothedA = lerp(smoothedA, targetA, lerpAmt);
    smoothedB = lerp(smoothedB, targetB, lerpAmt);
    smoothedC = lerp(smoothedC, targetC, lerpAmt);
    smoothedD = lerp(smoothedD, targetD, lerpAmt);

    // Update display with smoothed values
    matrixValuesDisplay.html(`[[ ${smoothedA.toFixed(2)}, ${smoothedC.toFixed(2)} ],<br> [ ${smoothedB.toFixed(2)}, ${smoothedD.toFixed(2)} ]]`);

    push();
    translate(width / 2, height / 2);

    // P5's applyMatrix takes arguments: (a, b, c, d, e, f)
    // corresponding to a 2x3 affine matrix:
    // [ a  c  e ]
    // [ b  d  f ]
    // Note: P5 documentation says applyMatrix(a, b, c, d, e, f) maps to:
    // [ a  c  e ]
    // [ b  d  f ]
    // Wait, let's double check standard CSS matrix transform order vs P5.
    // P5/Canvas context usually:
    // x' = a*x + c*y + e
    // y' = b*x + d*y + f
    // So a=scaleX, b=skewY, c=skewX, d=scaleY

    applyMatrix(smoothedA, smoothedB, smoothedC, smoothedD, 0, 0);

    // Draw grid for reference
    stroke(200, 0, 0, 100);
    strokeWeight(2);
    noFill();
    rect(-200, -200, 400, 400);

    if (imgState === 'success') {
        image(spongebob, 0, 0);
    } else if (imgState === 'loading' || imgState === 'init') {
        push();
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        text("Loading image...", 0, 0);
        pop();
    } else if (imgState === 'error') {
        push();
        fill(255, 0, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text("Error: Image failed to load.", 0, -20);
        text("Check console for more details.", 0, 10);
        text("Make sure Spongebob_pic.jpg is in the folder.", 0, 40);
        pop();
    }
    pop();
}

function randomizeMatrix() {
    sliderA.value(random(-2, 2));
    sliderB.value(random(-2, 2));
    sliderC.value(random(-2, 2));
    sliderD.value(random(-2, 2));
}

function resetMatrix() {
    sliderA.value(1);
    sliderB.value(0);
    sliderC.value(0);
    sliderD.value(1);
    checkAuto.checked(false);
}
