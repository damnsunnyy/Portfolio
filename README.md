# Shubham — personal portfolio

A responsive portfolio for Shubham, inspired by expressive developer portfolios and personalized with projects from the public `damnsunnyy` GitHub profile. It features a starfield, an interactive Three.js keyboard whose keys filter projects, a selectable tech stack, GitHub project timeline, dark/light themes, an animated opening sequence, scroll progress, and tactile project previews. Three.js and the typefaces load from external CDNs.

## Personalize it

Edit `index.html` to change the name, bio, repository descriptions, timeline, and contact links. Update the page title, description, and social preview metadata in the document head as well. Colors, layout, and typography are in `styles.css` and the inline page styles; the 3D keyboard lives in `scene.js`, with interactions in `script.js`.

## Featured repositories

- `stanford-dog-breed-recognition` — ResNet-18 image classification research
- `TODO-APP` — React, Django REST Framework, and SQLite
- `react-streaming-catalog` — StreamBox movie discovery and watchlist UI
- `amazon-prime-video-clone` — Django streaming application
- `google-docs-clone` — DocsFlow real-time collaborative editor
- `resume_ats` — Java resume screening and candidate ranking

## Publish on GitHub Pages

1. Push these files to the `main` branch of `damnsunnyy/Portfolio` (or another repository you choose).
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` deploys the site on every push to `main`. The Pages URL appears in the Actions run and in Settings → Pages.

No build command or package installation is required. GitHub Pages serves this static site directly.
