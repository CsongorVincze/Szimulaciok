---
title: 'Physics Pendulum Simulation'
description: 'A simulation of a simple pendulum with physics calculations.'
pubDate: 'Jul 08 2022'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

# Physics Pendulum Simulation

This simulation demonstrates the motion of a simple pendulum under the influence of gravity and damping.

## The Physics Behind It

The motion of a simple pendulum is governed by the following differential equation:

$$ \theta'' = -\frac{g}{L} \sin(\theta) - \mu \theta' $$

Where:
- $\theta$ is the angle of the pendulum from the vertical.
- $\theta'$ is the angular velocity.
- $\theta''$ is the angular acceleration.
- $g$ is the acceleration due to gravity.
- $L$ is the length of the pendulum.
- $\mu$ is the damping coefficient (representing air resistance or friction).

In our simulation, we approximate this using Euler integration:

1. Calculate angular acceleration based on the current angle and velocity.
2. Update angular velocity by adding the acceleration.
3. Update the angle by adding the velocity.

<div id="simulation-container" style="display: flex; justify-content: center; margin: 2rem 0;"></div>

<script is:inline src="/libraries/p5.min.js"></script>
<script is:inline src="/libraries/p5.sound.min.js"></script>
<script is:inline src="/sketch.js"></script>
