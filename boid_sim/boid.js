class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 1.5));
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    align(boids) {
        let preceptionRadius = alignPerceptionSlider.value();
        let total = 0;
        let steering = createVector();

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < preceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);

        }

        return steering;
    }

    cohesion(boids) {
        let preceptionRadius = cohesionPerceptionSlider.value();
        let total = 0;
        let steering = createVector();

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < preceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    separation(boids) {
        let preceptionRadius = separationPerceptionSlider.value();
        let total = 0;
        let steering = createVector();

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < preceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            //steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }






    flocking(boids) {
        this.acceleration.mult(0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        let mouseForce = this.interact();

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
        // Interaction force can be strong to be noticeable
        mouseForce.mult(5);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.add(mouseForce);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    edge() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    interact() {
        let steering = createVector();
        // Check if mouse is inside canvas
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            let mousePos = createVector(mouseX, mouseY);
            let d = dist(this.position.x, this.position.y, mousePos.x, mousePos.y);
            let perceptionRadius = 100;

            if (d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, mousePos);
                diff.div(d); // Weight by distance
                steering.add(diff);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
            }
        }
        return steering;
    }

    show() {
        let theta = this.velocity.heading() + radians(90);
        fill(200, 100);
        stroke(255);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -6); // Tip
        vertex(-3, 6); // Bottom left
        vertex(3, 6);  // Bottom right
        endShape(CLOSE);
        pop();
    }




}