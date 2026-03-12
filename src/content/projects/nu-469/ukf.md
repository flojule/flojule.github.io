---
title: "UKF-based mobile robot localization"
description: "Implemented an Unscented Kalman Filter to localize a wheeled robot in an environment with known landmarks. Wheel odometry drives the prediction step via a unicycle motion model, while range and bearing measurements to landmarks correct the state estimate. Validated on the UTIAS MRCLAM dataset — achieving 0.107 m average position error where dead reckoning diverges."
image: "./ukf.png"
startDate: "2025-09-15"
endDate: "2025-10-15"
skills: ["Python", "Kalman Filter", "Localization", "Sensor Fusion"]
sourceLink: "https://github.com/flojule/UKF"
draft: true
---

## Overview

This project implements UKF-based localization for a differential-drive robot navigating an environment with known landmarks. The filter fuses robot odometry with range and bearing measurements to maintain a pose estimate `(x, y, θ)` over time.

## Approach

The filter operates in two steps each timestep:

- **Predict**: the current pose is propagated forward using a unicycle motion model and sigma points, accounting for process noise in wheel velocities.
- **Correct**: visible landmark measurements (range + bearing) are used to pull the estimate toward ground truth, weighted by sensor noise.

## Results

Tested on the [UTIAS MRCLAM](http://asrl.utias.utoronto.ca/datasets/mrclam/) single-robot dataset. Dead reckoning accumulates orientation error and diverges shortly. The UKF tracks ground truth throughout the run.

| Metric | UKF | Dead Reckoning |
|---|---|---|
| Avg. position error | 0.107 m | diverges |
| Avg. bearing error | 0.049 rad | diverges |
