# Shubham — personal portfolio

**Live site:** [https://damnsunnyy.github.io/Portfolio/](https://damnsunnyy.github.io/Portfolio/)

A responsive portfolio for Shubham, curated from the public `damnsunnyy` GitHub profile and spanning full-stack applications, applied machine learning, AI prototypes, iOS, and developer tools. The dark, animated hero presents a 3D constellation of the portfolio’s project areas, so no single repository takes the spotlight. The page also includes a selectable tech stack, a GitHub project timeline, project-strength rankings, scroll progress, and live project screenshots. Typefaces load from Google Fonts; technology logos are stored locally.

## Personalize it

Edit `index.html` to change the name, bio, repository descriptions, timeline, and contact links. Update the page title, description, and social preview metadata in the document head as well. Colors, 3D styling, and motion are in `portfolio-refresh.css`; page interactions live in `script.js`.

## Featured repositories

Ten selected projects are grouped by system scope, technical integration, completeness, and verifiable evidence. This is an editorial guide to resume strength, not a formal code-quality score. Prototypes and collaborator work are identified.

### Tier 1 — strongest resume anchors

- [ModelBench](https://github.com/damnsunnyy/ModelBench) — leakage-safe local-first tabular ML experiments, cross-validation, and portable reports
- [Apply Desk](https://github.com/damnsunnyy/ApplyDesk) — role discovery, resume preparation, and application tracking with account-scoped records
- [Stanford Dog Breed Recognition](https://github.com/damnsunnyy/stanford-dog-breed-recognition) — 120-class ResNet-18 study with saved checkpoint and held-out metrics
- [SANA / Echo](https://github.com/damnsunnyy/Echo) — local voice-assistant prototype joining speech recognition, Ollama, FastAPI, and React/Electron

### Tier 2 — broad systems and specialist builds

- [DocsFlow](https://github.com/damnsunnyy/google-docs-clone) — collaborative document editor with authentication, live sync, and export
- [Prime Video Clone](https://github.com/damnsunnyy/amazon-prime-video-clone) — Django streaming app with catalog, accounts, watchlists, ratings, and tests
- [InsightX](https://github.com/Shubham01-shubh/InsightX) — **collaborator project:** CSV/JSON cleaning and analytics workspace
- [SiteSentry](https://github.com/damnsunnyy/SiteSentry) — explainable website audits and portable reports
- [RunScope](https://github.com/damnsunnyy/RunScope) — GitHub Actions health metrics with workflow details and tested calculations

### Tier 3 — focused applications and tools

- [HTML DOM Visualizer](https://github.com/damnsunnyy/HTML-DOM-Visualizer) — custom HTML parser and searchable tree

The [interactive Buildroom](https://damnsunnyy.github.io/Portfolio/buildroom/) is part of this portfolio and presents the same selected projects as a navigable 3D map.

## Publish on GitHub Pages

1. Push these files to the `main` branch of `damnsunnyy/Portfolio`.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` deploys the site on every push to `main`. The Pages URL appears in the Actions run and in Settings → Pages.

GitHub Pages serves the portfolio as a static site. Its Actions workflow also builds the Apply Desk bundle before publishing.

## Apply Desk

Open the standalone [Apply Desk live app](https://damnsunnyy.github.io/ApplyDesk/). It helps users search roles, prepare a role-focused résumé, and track applications and shortlist/interview signals. Each account's rows are isolated with database row-level security. The optional [Chrome helper](browser-helper/README.md) can capture pages, log an open email, and fill clear profile fields; it never submits applications.

## Live demos

- [RunScope](https://damnsunnyy.github.io/RunScope/) — live read-only GitHub Actions health dashboard
- [SiteSentry live demo](https://damnsunnyy.github.io/SiteSentry/)
- [ModelBench live demo](https://damnsunnyy.github.io/ModelBench/)
- [HTML DOM Visualizer](https://damnsunnyy.github.io/HTML-DOM-Visualizer/)

## Resume

The public portfolio includes [Shubham Meghani’s updated one-page resume PDF](assets/Shubham-Meghani-Resume-2026.pdf), with a matching [HTML source](assets/resume-source.html).

## Project imagery

The `assets/project-captures/` directory stores compressed interface previews and research figures used by the selected project cards.

## Contact

- [LinkedIn](https://linkedin.com/in/shubham-meghani/)
- [Email](mailto:shubham.meghani.work@gmail.com)
