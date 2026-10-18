# Buildroom

An original interactive profile page: a CSS perspective scene maps three public projects to real deployments and shows the latest public GitHub Actions run for RunScope, Portfolio, and StreamBox.

## Interactions

- Drag the project room to rotate it.
- Focus the scene and use the left and right arrow keys, or use the rotation buttons.
- Open each project's live demo or source from its floating card.
- Read the latest public Actions run from the signal panel. Select a run row to open its GitHub Actions page; use **Scan workflows** to refresh.

## Data and deployment

The workflow panel requests the unauthenticated public GitHub Actions API for one latest run per repository. It does not use tokens or access private data. If the API is rate limited or unavailable, the page shows `NO DATA` and keeps the project's Actions link available.

This directory is served as part of the Portfolio GitHub Pages site at `/Portfolio/buildroom/`. It is plain HTML, CSS, and JavaScript; the 3D effect uses CSS transforms rather than a rendering engine. The image at `assets/readme-preview.svg` is a static README thumbnail that links into the interactive page.

For local review, serve this directory over HTTP (for example, `python3 -m http.server 8000 --directory buildroom`) and open `http://localhost:8000`.
