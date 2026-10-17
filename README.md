# Shubham — personal portfolio

A responsive portfolio for Shubham, personalized with projects from the public `damnsunnyy` GitHub profile. It features a starfield, an interactive Three.js keyboard whose keys filter projects, genuine technology logos, a selectable tech stack, a GitHub project timeline, dark/light themes, an animated opening sequence, scroll progress, and live screenshots from deployed project interfaces. Three.js and the typefaces load from external CDNs; the technology logos are stored locally.

## Personalize it

Edit `index.html` to change the name, bio, repository descriptions, timeline, and contact links. Update the page title, description, and social preview metadata in the document head as well. Colors, layout, and typography are in `styles.css`, `project-captures.css`, and the page's inline responsive styles; the 3D keyboard lives in `scene.js`, with interactions in `script.js`.

## Featured repositories

- `stanford-dog-breed-recognition` — ResNet-18 image classification research
- `TODO-APP` — React, Django REST Framework, and SQLite
- `react-streaming-catalog` — StreamBox movie discovery and watchlist UI
- `amazon-prime-video-clone` — Django streaming application
- `google-docs-clone` — DocsFlow real-time collaborative editor
- `resume_ats` — Java resume screening and candidate ranking
- [InsightX](https://github.com/Shubham01-shubh/InsightX) — collaborator project: React and Django REST CSV analytics studio
- `RepoRadar` — live GitHub profile and repository explorer
- `SiteSentry` — robots-aware website quality scanner with portable reports
- `ModelBench` — leakage-safe, local-first tabular model benchmark

## Publish on GitHub Pages

1. Push these files to the `main` branch of `damnsunnyy/Portfolio` (or another repository you choose).
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` deploys the site on every push to `main`. The Pages URL appears in the Actions run and in Settings → Pages.

GitHub Pages serves the portfolio as a static site. Its Actions workflow also builds the Apply Desk bundle before publishing.

## Job search workspace

Open the [Apply Desk](job-hunt/) to create an account, search live roles, compare recognized requirements against your profile, prepare a role-focused résumé, and track applications and shortlist/interview signals. Each account's rows are isolated with database row-level security. The page first shows the backend setup guide until a Supabase project is connected. The guide includes the database migration, job-search function, and Gmail connection steps. The optional [Chrome helper](browser-helper/README.md) can capture pages, log an open email, and fill clear profile fields; it never submits applications.

- [RepoRadar live demo](https://damnsunnyy.github.io/RepoRadar/)
- [SiteSentry live demo](https://damnsunnyy.github.io/SiteSentry/)
- [ModelBench live demo](https://damnsunnyy.github.io/ModelBench/)

## More projects

- [Echo](https://github.com/damnsunnyy/Echo) — local-first voice assistant with an Ollama loop and React dashboard.
- [RoadTrip](https://github.com/damnsunnyy/RoadTrip) — SwiftUI motorcycle group ride prototype with Firestore and MapKit.

## Resume

The public portfolio includes [Shubham Meghani’s updated one-page resume PDF](assets/Shubham-Meghani-Resume-2026.pdf), with a matching [HTML source](assets/resume-source.html).

## Project imagery

`assets/project-captures/` contains reduced-size captures of the live RepoRadar, SiteSentry, HTML DOM Visualizer, and ModelBench interfaces, plus the Echo dashboard and Stanford Dogs held-out recall figure. The portfolio labels previews and research figures to distinguish them from one another. The RoadTrip card describes its documented prototype flow without presenting sample rider locations as live data.

## Contact

- [LinkedIn](https://linkedin.com/in/shubham-meghani/)
- [Email](mailto:shubham.meghani.work@gmail.com)
- [HTML DOM Visualizer](https://damnsunnyy.github.io/HTML-DOM-Visualizer/) — live custom parser and interactive tree explorer.
- [Student Management System](https://github.com/damnsunnyy/StudentManagementSystem) — source and local setup; requires a MongoDB-backed API.
