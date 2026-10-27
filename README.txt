Allan Fung - Project 2, Step 5
Open index.html. No installation, server, CDN, framework, or API key is required.

STYLING MILESTONE (approximately halfway)
Completed: shared typography, navigation and footer; responsive homepage; archive
grid/list and form styling; listening-room layout; pointer-reactive ASCII disc;
motion pause/reset/density controls; local-audio player and spinning CD.
Preserved: five page templates, search, filters, pagination, breadcrumbs, tags,
previous/next entries, related entries and return-to-results state.

Still to finish: real photos and scans, final captions/dates/contact links,
album artwork and permitted audio selection, detail-page editorial styling,
and final visual polish. Bracketed media areas are intentional placeholders.
No personal memories or contact information have been invented.

INTERACTIONS
Home: move the pointer to disturb the character disc; use Density, Pause and Reset.
On touchscreens, touch or move across the graphic. Scrolling is not locked.
Reduced-motion preferences start the scene paused. Offscreen animation stops.
Listening: choose one or more local audio files. Play, pause, seek, change volume,
or select a track. The CD spins during playback. No files are uploaded or retained.

TOOLS
HTML/CSS/JavaScript is the delivered site. Figma remains the layout reference.
TouchDesigner is an optional future visual-authoring tool, not a dependency.
Instagram references could not be viewed, so no exact effect recreation is claimed.

References
https://www.figma.com/design/eKaLZNo2omj2kfaPfiV8kt
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
https://learn.derivative.ca/courses/100-fundamentals/lessons/102-tops-working-with-images/topic/saving-images-and-video/


REFERENCE-BASED PLAYROOM UPDATE
Open playroom.html, or select Playroom in the main navigation.
- Metal: draw embossed strokes; change brush; clear; add a keyboard mark; export PNG.
- Paper: turn sample pages or choose up to 40 local images. Photos are not uploaded or saved across reloads.
- Orbit: original desktop-style symbols on a perspective sphere; pause/resume.
- Scrap: edit a note; drag or use the slider to crumple/unfold a triangulated paper surface.

Reference mapping: supplied metallic emboss clip -> lit drawing surface; sketchbook clip -> page-turn book; Varra icon clip -> orbit of original symbols; TypingMind clip -> deformable paper. These are original browser studies, not exact reproductions. Scrap uses stylized mesh deformation rather than a cloth-physics solver. No source video, artwork, or Windows icon assets are redistributed.

Keyboard: arrow keys/Home/End switch material tabs. Native buttons and sliders provide alternatives to drawing and dragging. Reduced motion pauses orbit initially and removes book-turn animation.


ARCHIVE EDITORIAL REDESIGN
Paper and Orbit now live in archive.html and browse the same four draft entries.
The Archive uses a centered book with top-corner view, search, and menu buttons, plus four circular controls below. Click a cover to open; use next/previous or swipe across pages; choose an orbit card to open its book spread. Search by title/tag or category. Returning from an entry preserves the selected item and view.
More options includes local image selection for the current entry. Images remain local to the tab and are not persisted across reloads. The visual studies remain labeled where personal media is missing.
Playroom now contains only Metal and Scrap.
Typography: locally bundled Archivo Black, Special Elite, and Caveat from Google Fonts, with licenses in fonts/. These interpret the supplied editorial reference, not its exact proprietary typography. No reference brand artwork or logos are copied.

PRINTED-INK UPDATE
Display headings now use bundled Roboto Condensed with live SVG ink distress: irregular edges and fine speckled coverage. Text remains editable and selectable. Paper grain is a lightweight local SVG surface. The homepage uses staggered headlines; archive covers and spreads use inky type and layered papers; entry pages use oversized headings, prominent introductory copy, handwritten notes, and tilted media. Small navigation labels remain clear.
Edit css/print-finish.css for layout and js/print-finish.js for ink density. Font license is in fonts/condensed-LICENSE.txt.

October 26 update: collage homepage; About ASCII / 1-bit / original portrait modes; shared sketch footer; animated circle cursor; click sounds with persistent mute. Open index.html. Portrait canvas requires browser JavaScript. All source photos retained.
