---
title: "Street sweeping tracker"
description: "Tired of getting parking tickets because you forgot it's street sweeping day? BroomBuster is an interactive Python tool that shows where your car is parked on a live map and tells you when street sweeping applies to that block. Supports multiple cities across the Bay Area and Chicago."
image: "./oakland.png"
startDate: "2025-06-06"
endDate: "2026-03-11"
skills: ["Python", "GeoPandas", "Plotly", "GIS"]
sourceLink: "https://github.com/flojule/BroomBuster"
---

## Overview

BroomBuster tells you whether your parked car is at risk of a street-sweeping ticket.
It pulls your car's live GPS location from a [Traccar](https://www.traccar.org/) server (or accepts manual coordinates), reverse-geocodes the address, and overlays sweeping schedules on an interactive OpenStreetMap-backed Plotly map.
Supports multiple cities across the Bay Area (Oakland, San Francisco, Berkeley, Alameda) and Chicago, IL.

## Features

- **Two location modes** — pull live GPS from a Traccar client (phone app or OBD dongle) or set coordinates manually.
- **Interactive map** — every street segment is colour-coded by sweeping urgency:
  - 🔴 Red — sweeping today
  - 🟠 Orange — sweeping tomorrow
  - 🔵 Blue — no sweeping soon
- **Car marker** — coloured dot matches the urgency of the block where your car is parked; hover to see the address.
- **Summary panel** (bottom-left) — shows the address, date, and next sweeping times for both address sides, with an arrow marking your side.
- **Overview inset** (lower-right) — zoomed-out mini-map so you always know where the main view is.
- **Multi-city / regional loading** — load an entire region (e.g. all Bay Area cities) in one run, or switch to single-city mode for faster iteration.
- **Email notification** — opt-in alert when sweeping is same-day or next-day.
- **Credentials via environment variables** — no passwords in source code.

## How it works

1. Fetch car location (live GPS via Traccar or manual lat/lon).
2. Download and normalise the city's street-sweeping shapefile or GeoJSON.
3. Reverse-geocode the car position and find the matching street segment.
4. Parse the sweeping schedule and determine urgency for today and tomorrow.
5. Render an interactive Plotly map with colour-coded segments, car marker, summary panel, and overview inset.
6. Optionally send an email alert via Gmail SMTP.
