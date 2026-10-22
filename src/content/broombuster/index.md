---
title: "Street sweeping tracker"
description: "Web app that maps your parked cars and street-sweeping times in Bay Area cities and Chicago."
image: "./bay_area.webp"
startDate: "2025-06-06"
skills: ["Web App", "Maps"]
team: 1
demoLink: "https://broombuster.com/"
demoLabel: "broombuster.com"
sourceLink: "https://github.com/flojule/BroomBuster"
---

## Overview

BroomBuster tells you whether your parked cars are at risk of a street-sweeping ticket. It runs as a Web App backed by a FastAPI server. Save multiple cars, place them via GPS or by tapping the map, and see sweeping schedules overlaid on an interactive map. Currently covers Oakland, San Francisco, Berkeley, Alameda, and Chicago.

## Features

- **Multi-car tracking** — each car has a name, color, and saved location.
- **GPS or manual placement** — one tap to drop on the map or to your phone's current GPS position.
- **Color-coded map** — every street segment shaded by sweeping urgency: red (today), orange (tomorrow), green (clear).
- **Live status banner** — top bar shows at a glance which cars need to move.
- **Multi-city / multi-region** — Bay Area or Chicago.
