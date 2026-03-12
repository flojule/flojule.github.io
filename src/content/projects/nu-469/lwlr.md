---
title: "Learning a robot motion model with LWLR"
description: "Locally Weighted Linear Regression (LWLR) trained from ground truth data to learn the motion model of a differential-drive robot, replacing the analytical unicycle model used in earlier work."
image: "./lwlr.png"
startDate: "2025-11-15"
endDate: "2025-12-15"
skills: ["Python", "Machine Learning", "Regression"]
sourceLink: "https://github.com/flojule/LWLR"
draft: true
---

## Overview

Instead of relying on an analytical unicycle model, this project learns the robot's motion model directly from data. Given a control input $(v, \omega)$ and the previous pose, LWLR predicts the resulting pose change by fitting a local linear model weighted by similarity to the query point.

## Approach

Locally Weighted Linear Regression assigns each training sample a weight based on its distance to the query in control space, then solves a weighted least-squares problem. This non-parametric approach adapts to non-linearities in the true motion model without requiring an explicit parameterization.

The learned model is evaluated against the analytical unicycle model on held-out odometry sequences — the data-driven model captures systematic errors (wheel slip, asymmetry) that the closed-form model cannot represent.