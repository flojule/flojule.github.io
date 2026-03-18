---
title: "Street sweeping tracker"
description: "Know before the grim sweeper comes. BroomBuster is a web app and Python CLI that shows where your cars are parked on a live map and tells you when street sweeping applies to that block. Supports multiple cities across the Bay Area and Chicago."
image: "./bay_area.webp"
startDate: "2025-06-06"
endDate: "2026-03-11"
skills: ["Python", "FastAPI", "GeoPandas", "Plotly", "GIS", "PWA"]
sourceLink: "https://github.com/flojule/BroomBuster"
---

## Overview

BroomBuster tells you whether your parked cars are at risk of a street-sweeping ticket.
It is a Progressive Web App backed by a FastAPI server, with a Python CLI for local use.
Save multiple cars, place them via GPS or by tapping the map, and see sweeping schedules overlaid on an interactive map.
Supports multiple cities across the Bay Area (Oakland, San Francisco, Berkeley, Alameda) and Chicago, IL.

## Features

- **Multi-car tracking** — save multiple cars, each with its own name, color, and location.
- **GPS and manual placement** — one tap to move a car to your phone's current GPS position, or tap anywhere on the map to place it manually.
- **Interactive map** — every street segment is color-coded by sweeping urgency: red (today), orange (tomorrow), blue (not soon).
- **Live status banner** — top bar shows at a glance which cars need to move.
- **Multi-city / multi-region** — load an entire region (e.g. all Bay Area cities) or a single city.
- **Python CLI** — the original command-line tool works independently and includes email alerts via Gmail SMTP.

## How it works

1. Fetch car location (phone GPS or manual map placement).
2. Download and normalise the city's street-sweeping shapefile or GeoJSON.
3. Find the matching street segment and parse the sweeping schedule.
4. Render a color-coded map with car markers and a live status banner.
5. Serve everything as a PWA via FastAPI, deployed on Render.com.
