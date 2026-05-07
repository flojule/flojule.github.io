---
title: "Street sweeping tracker"
description: "BroomBuster is a Web App and Python command-line tool that shows where your cars are parked on a live map and tells you when street sweeping applies. Supports several Bay Area cities and Chicago."
image: "./bay_area.webp"
startDate: "2025-06-06"
endDate: "2026-03-11"
skills: ["Python", "FastAPI", "GeoPandas", "Plotly", "GIS", "PWA"]
sourceLink: "https://github.com/flojule/BroomBuster"
---

## Overview

BroomBuster tells you whether your parked cars are at risk of a street-sweeping ticket. It runs as a Web App backed by a FastAPI server, with a Python CLI for local use. Save multiple cars, place them via GPS or by tapping the map, and see sweeping schedules overlaid on an interactive map. Currently covers Oakland, San Francisco, Berkeley, Alameda, and Chicago.

## Features

- **Multi-car tracking** — each car has a name, color, and saved location.
- **GPS or manual placement** — one tap to drop on the map or to your phone's current GPS position.
- **Color-coded map** — every street segment shaded by sweeping urgency: red (today), orange (tomorrow), blue (not soon).
- **Live status banner** — top bar shows at a glance which cars need to move.
- **Multi-city / multi-region** — Bay Area or Chicago.
- **Python CLI** — original command-line tool works standalone and supports email alerts via Gmail SMTP.
