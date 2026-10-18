# Shubham — personal portfolio

A responsive portfolio for Shubham, curated from the public `damnsunnyy` GitHub profile and spanning full-stack applications, applied machine learning, AI prototypes, iOS, and developer tools. Its warm editorial design opens directly to a featured project, with a selectable tech stack, a GitHub project timeline, project-strength rankings, scroll progress, and live screenshots from deployed project interfaces. Typefaces load from Google Fonts; technology logos are stored locally.

## Personalize it

Edit `index.html` to change the name, bio, repository descriptions, timeline, and contact links. Update the page title, description, and social preview metadata in the document head as well. Colors and layout are in `portfolio-refresh.css`, `styles.css`, and `project-captures.css`; page interactions live in `script.js`.

## Featured repositories

Projects are grouped by system scope, technical integration, completeness, and verifiable evidence. This is an editorial guide to resume strength, not a formal code-quality score. Prototypes and collaborator work are identified.

### Tier 1 — strongest resume anchors

- [ModelBench](https://github.com/damnsunnyy/ModelBench) — leakage-safe local-first tabular ML experiments, cross-validation, and portable reports
- [Apply Desk](https://github.com/damnsunnyy/ApplyDesk) — role discovery, resume preparation, and application tracking with account-scoped records
- [Stanford Dog Breed Recognition](https://github.com/damnsunnyy/stanford-dog-breed-recognition) — 120-class ResNet-18 study with saved checkpoint and held-out metrics
- [SANA / Echo](https://github.com/damnsunnyy/Echo) — local voice-assistant prototype joining speech recognition, Ollama, FastAPI, and React/Electron

### Tier 2 — broad systems and specialist builds

- [InsightX](https://github.com/Shubham01-shubh/InsightX) — **collaborator project:** CSV/JSON cleaning and analytics workspace
- [DocsFlow](https://github.com/damnsunnyy/google-docs-clone) — collaborative document editor with authentication, live sync, and export
- [Prime Video Clone](https://github.com/damnsunnyy/amazon-prime-video-clone) — Django streaming app with catalog, accounts, watchlists, ratings, and tests
- [RoadTrip](https://github.com/damnsunnyy/RoadTrip) — **in-progress iOS prototype:** group rides with Firestore and MapKit
- [SiteSentry](https://github.com/damnsunnyy/SiteSentry) — explainable website audits and portable reports
- [RunScope](https://github.com/damnsunnyy/RunScope) — GitHub Actions health metrics with workflow details and tested calculations

### Tier 3 — focused applications and tools

- [HTML DOM Visualizer](https://github.com/damnsunnyy/HTML-DOM-Visualizer) — custom HTML parser and searchable tree
- [RepoRadar](https://github.com/damnsunnyy/RepoRadar) — searchable public GitHub profile explorer
- [Resume ATS](https://github.com/damnsunnyy/resume_ats) — Java resume screening and candidate ranking
- [Student Management System](https://github.com/damnsunnyy/StudentManagementSystem) — MERN student directory; requires configured API and MongoDB
- [TODO-APP](https://github.com/damnsunnyy/TODO-APP) — [live browser demo](https://damnsunnyy.github.io/TODO-APP/) · React, Django REST Framework, and SQLite
- [StreamBox Catalog](https://github.com/damnsunnyy/react-streaming-catalog) — [live demo](https://damnsunnyy.github.io/react-streaming-catalog/) with browser-persistent movie watchlist
- [Portfolio](https://github.com/damnsunnyy/Portfolio) — interactive portfolio and automated GitHub Pages publishing

The [interactive Buildroom](https://damnsunnyy.github.io/Portfolio/buildroom/) is part of the Portfolio repository and presents projects from multiple fields.

## Publish on GitHub Pages

1. Push these files to the `main` branch of `damnsunnyy/Portfolio` (or another repository you choose).
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` deploys the site on every push to `main`. The Pages URL appears in the Actions run and in Settings → Pages.

GitHub Pages serves the portfolio as a static site. Its Actions workflow also builds the Apply Desk bundle before publishing.

## Apply Desk

Open the standalone [Apply Desk live app](https://damnsunnyy.github.io/ApplyDesk/) or browse its [GitHub repository](https://github.com/damnsunnyy/ApplyDesk). It helps users search roles, prepare a role-focused résumé, and track applications and shortlist/interview signals. Each account's rows are isolated with database row-level security. The optional [Chrome helper](browser-helper/README.md) can capture pages, log an open email, and fill clear profile fields; it never submits applications.

## Live demos

- [RunScope](https://damnsunnyy.github.io/RunScope/) — live read-only GitHub Actions health dashboard
- [Apply Desk live app](https://damnsunnyy.github.io/ApplyDesk/)
- [RepoRadar live demo](https://damnsunnyy.github.io/RepoRadar/)
- [SiteSentry live demo](https://damnsunnyy.github.io/SiteSentry/)
- [ModelBench live demo](https://damnsunnyy.github.io/ModelBench/)
- [HTML DOM Visualizer](https://damnsunnyy.github.io/HTML-DOM-Visualizer/)
- [StreamBox Catalog](https://damnsunnyy.github.io/react-streaming-catalog/)
- [Todo browser demo](https://damnsunnyy.github.io/TODO-APP/)
- [Buildroom interactive profile](https://damnsunnyy.github.io/Portfolio/buildroom/) — CSS 3D project map and read-only GitHub Actions history

## More projects

- [Echo](https://github.com/damnsunnyy/Echo) — local-first voice assistant with an Ollama loop and React dashboard.
- [RoadTrip](https://github.com/damnsunnyy/RoadTrip) — SwiftUI motorcycle group ride prototype with Firestore and MapKit.

## Resume

The public portfolio includes [Shubham Meghani’s updated one-page resume PDF](assets/Shubham-Meghani-Resume-2026.pdf), with a matching [HTML source](assets/resume-source.html).

## Project imagery

`assets/project-captures/` contains reduced-size captures of the live RunScope, RepoRadar, SiteSentry, HTML DOM Visualizer, ModelBench, and Apply Desk interfaces, plus the Echo dashboard, StreamBox catalog, and Stanford Dogs held-out recall figure. The portfolio labels live previews and research figures to distinguish them from one another. The RoadTrip card describes its documented prototype flow without presenting sample rider locations as live data.

## Contact

- [LinkedIn](https://linkedin.com/in/shubham-meghani/)
- [Email](mailto:shubham.meghani.work@gmail.com)
- [HTML DOM Visualizer](https://damnsunnyy.github.io/HTML-DOM-Visualizer/) — live custom parser and interactive tree explorer.
- [Student Management System](https://github.com/damnsunnyy/StudentManagementSystem) — source and local setup; requires a MongoDB-backed API.
