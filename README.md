# Archive Dumps

**Live website:** [yesjermo.github.io/project-archive](https://yesjermo.github.io/project-archive/)

**My favourite archives — a little collection, still growing.**

A personal archive website by **Allan Fung**, made for Design for the Web, Project 2. It brings together sketchbook pages, design ideas, music, posters, tickets, and everyday objects in an interactive collection.

## Concept

The site feels like looking through a box of keepsakes: loose photographs, folded posters, handwritten ideas, and things worth saving. Its visual direction combines paper textures, collage layouts, inky headings, ASCII graphics, and Japanese Y2K editorial references.

## Pages

| File             | What it contains                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `index.html`     | A personal introduction and Polaroid portrait above a collage with links into the collection. |
| `archive.html`   | Two ways to browse: a flipping paper diary and a rotating object orbit.                       |
| `entry.html`     | Individual archive entries, descriptions, images, and source information.                     |
| `listening.html` | A Spotify album player with a spinning CD visualization.                                      |
| `playroom.html`  | Interactive metal drawing and crumpled-paper experiments.                                     |
| `about.html`     | An introduction, credits, and a portrait with ASCII, 1-bit, and original views.               |

## Features

- Shared navigation, search controls, and sketch-style footers.
- Archive search and category filters.
- Paper spreads with Pencil and Original presentation options.
- An orbit with drag, rotation, zoom, pause, and reset controls.
- A mix of poster layouts, Polaroid-style photos, tickets, and object cutouts.
- Spotify playback with CD rotation linked to the player's playback state.
- A circle-and-dot cursor that follows pointer movement.
- Soft click sounds with a mute preference saved in the browser.
- Responsive layouts and reduced-motion handling.

## Run locally

Download and unzip the project, then open `index.html` in a browser. No package installation or build step is needed.

For local development, serving the folder is recommended. With Python installed, run this command from the project folder:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000**. You can also use VS Code's Live Server extension.

Spotify needs an internet connection. Playback availability, previews, and sign-in requirements are controlled by Spotify. Click sounds begin after a user interaction, subject to browser audio permissions.

## Project structure

```text
Fung_Allan_Project2_Step5/
├── index.html
├── archive.html
├── entry.html
├── listening.html
├── playroom.html
├── about.html
├── css/                 Styles for layouts, paper effects, and controls
├── js/                  Archive data and interactive behavior
├── assets/              Images and graphic assets
├── fonts/               Bundled font files and licenses
├── SOURCES.md           Image sources and credits
└── README.md
```

## Editing the site

- **Archive entries:** edit the `entries` array in `js/main.js`. Keep each entry's ID unique and update its image paths when replacing assets.
- **Images:** place files in `assets/collection/`. Preserve poster proportions and use transparent assets when an object should appear without its background.
- **Homepage and About:** edit `index.html`, `about.html`, and `css/personal.css`.
- **Portrait, cursor, and click sounds:** edit `js/personal.js`.
- **Paper and orbit interactions:** edit `js/archive-room.js`.
- **Listening room:** edit `listening.html` and the album URI in `js/spotify-disc.js` together.
- **Shared footer:** its markup appears in each HTML page; update all six pages to keep it consistent.

CSS is split across several files, with later stylesheets overriding earlier ones. Check the stylesheet order in each page before changing a rule. The latest shared presentation styles are in `css/refinement.css` and `css/personal.css`.

## Built with

HTML, CSS, and vanilla JavaScript, with Canvas and SVG for visual effects. The listening room uses the Spotify iFrame API. There is no backend, database, or framework build process.

## References and credits

Visual references include [claunicornios.com](https://claunicornios.com/), the supplied Sundae School editorial images, and the supplied collage and cursor references. Stympaul.com was requested as an additional layout reference but could not be loaded during the latest update.

Personal photographs and sketchbook work are presented alongside collected music, film, and design references. See `SOURCES.md` and individual entries for available attribution. Demo tickets are fictional keepsakes; their presence does not claim attendance or travel. Third-party artwork remains the property of its respective rights holders.

## Project notes

This is an evolving coursework project. Some objects use CSS clipping rather than detailed background removal. The paper experiment is a stylized visual effect, not a physical cloth simulation. The CD is a visual representation of Spotify playback, not a separate audio player.

The original `README.txt` contains earlier development notes and may describe features that have since changed. This Markdown README describes the current version.

## Code formatting

HTML, CSS, and JavaScript use consistent two-space indentation. Formatting settings are stored in `.prettierrc.json`. Stylesheet order is intentional: later files refine the earlier styles.
