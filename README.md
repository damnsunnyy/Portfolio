# Shubham — personal portfolio

A responsive portfolio for Shubham with an animated Three.js sculpture, an interactive opening sequence, custom cursor, draggable 3D object, scroll progress, project filters, and pointer-reactive project cards. The featured projects and repository links are drawn from the public `damnsunnyy` GitHub profile. Three.js loads as an ES module from jsDelivr.

## Personalize it

Edit `index.html` to change the name, bio, repository descriptions, or contact links. Update the page title, description, and social preview metadata in the document head as well. Colors, layout, and typography are in `styles.css`; the 3D object and interaction behavior are in `scene.js` and `script.js`.

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

No build command or package installation is required. The 3D centerpiece and Geist/DM Mono fonts load from external CDNs; the page layout and remaining effects are self-contained.
