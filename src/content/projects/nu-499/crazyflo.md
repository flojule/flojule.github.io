---
title: "Payload manipulation with drone swarm"
description: "I wrote a planning algorithm to control a swarm of drones to dynamically control the position of a payload given a trajectory or end destination."
image: "./crazyflo.png"
startDate: "2026-01-01"
endDate: "2026-03-31"
skills: ["Python", "ROS 2", "OCP", "Drones"]
sourceLink: "https://github.com/flojule/crazyflo"

---

## Overview

I used optimal control to solve for a desired payload trajectory or end destination. The planner finds feasible trajectories for each drone in the swarm, with a time optimal solution.

## Video demonstration

[Watch the demo video](https://github.com/user-attachments/assets/08495a9e-1ff6-4af9-ac21-35a55d5e8173)

## Block diagram

![crazyflo block diagram](./cf_block.png)

