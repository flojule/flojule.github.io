---
title: "PID and feedforward control of a UR5 arm"
description: "Simulated trajectory tracking on a UR5 robotic arm in CoppeliaSim. Compares a Proportional-Integral-Derivative (PID) controller against PID with computed-torque feedforward, evaluated on joint tracking accuracy, torque commands, and end-effector error."
image: "./ur5.gif"
startDate: "2025-11-19"
endDate: "2025-12-15"
skills: ["Python", "Robotic Manipulation", "Control Theory", "CoppeliaSim"]
sourceLink: "https://github.com/flojule/UR5"
draft: true
---

## Overview

This project compares two feedback control strategies for trajectory tracking on a UR5 arm simulated in CoppeliaSim. Both controllers follow the same screw quintic trajectory (1 s duration) from a fixed start to a fixed end pose, allowing a direct comparison of tracking accuracy and transient behavior.

## Controllers

### PID

The pure PID controller shows noticeable overshoot. An integral term tends to destabilize the system, so $K_i = 0$ was used. $K_d$ was set as high as possible before instability to damp transient oscillations. Tracking is acceptable but the overshoot is hard to eliminate without feedforward.

### PID + Feedforward (Computed Torque)

Adding a dynamics-based feedforward term significantly improves performance. Three variants are compared:

- **$K_d = K_i = 0$**: feedforward alone achieves good tracking with minimal oscillation.
- **Non-zero $K_d$**: eliminates residual oscillations and smooths the trajectory.
- **Moderate $K_i$**: reduces peak error during acceleration without destabilizing the deceleration phase.

A large $K_i$ causes instability in the second half of the trajectory (quintic deceleration phase), so gains were kept moderate. Increasing the total trajectory duration also improves tracking by reducing the required accelerations.

## Gain Selection

Joint torques were not explicitly limited, but gains were chosen to stay well below ~100 Nm. In general, higher $K_p$ improved accuracy up to the point of instability.