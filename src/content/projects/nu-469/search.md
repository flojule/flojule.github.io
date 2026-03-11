---
title: "A* path planning and motion control for a wheeled robot"
description: "A* path planner for a wheeled robot navigating a landmark-based environment, with offline (full map) and online (partial knowledge) variants, plus a proportional controller that drives the robot along the planned paths. Validated on the UTIAS MRCLAM dataset."
image: "./search.png"
startDate: "2025-10-15"
endDate: "2025-11-15"
skills: ["Python", "A*", "Path Planning", "Motion Control"]
sourceLink: "https://github.com/flojule/search-a-star"
---

## Overview

This project covers two tightly coupled problems in mobile robotics: finding a collision-free path through a grid map and executing that path with a feedback controller on a differential-drive robot.

## Approach

### Path Planning (A*)

Paths are planned on a grid using A* with a Chebyshev distance heuristic (admissible for 8-directional movement). Two tie-breaking criteria improve path quality: fewest direction changes and octile distance. Two grid resolutions are compared — coarse (1 m/cell) and fine (0.1 m/cell, with landmarks inflated by the robot footprint).

Online planning starts with no map knowledge. At each timestep the robot reveals its neighbors and A* replans from scratch — coarse grids yield faster, cleaner trajectories due to fewer waypoints and direction changes.

### Motion Controller

A proportional controller tracks the waypoints by independently commanding linear velocity $v = K_v \cdot d$ and angular velocity $\omega = K_\omega \cdot \Delta\theta$. Linear velocity is scaled by $\cos(\Delta\theta)$ to avoid moving away from the target while turning. A collision avoidance layer reorients the robot when the next cell is occupied. Gains were tuned by sweeping $K_v \in \{1, 2, 5\}$ and $K_\omega \in \{1, 2, 5, 10\}$ — the combination $K_v=2, K_\omega=5$ gave the best result (24 s completion time, low overshoot).
