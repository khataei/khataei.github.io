# Javad Khataei — personal site

Static Astro site prepared for `https://khataei.github.io`. English, light and dark modes, no photo, no email, no tracking.

## Run locally

Requires Node 24 or newer. With nvm: `nvm use`.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Astro. `npm run build` generates the static site in `dist/`. `npm run preview` serves that build.

## Content

- Home: `src/pages/index.astro`
- About and education: `src/pages/about.astro`
- Experience: `src/pages/work.astro`
- Publication, open source, and projects: `src/pages/research.astro`
- Blog listing: `src/pages/writing/index.astro`
- Colors, typography, spacing: `src/styles/global.css`

The valuation bullet omits team size and unqualified numerical accuracy. The current CRAN entry lists Javad as co-author and Daniel Fuller as maintainer; the site therefore uses co-author. Introductory certificates and the expired AWS credential are omitted. Source material is in the sibling `linkedin-site-content.md` document.

## Publish a post

Create `src/pages/writing/your-post-slug.md`:

```md
---
layout: ../../layouts/Post.astro
title: "Your post title"
description: "A short summary."
date: "2026-11-14"
---

Your post goes here. Use Markdown for headings, links, lists, and code.
```

The Writing listing, homepage's three latest posts, RSS feed, and sitemap include new posts automatically. Once GitHub Pages is set up, commit the new file to main in GitHub (or push it from your computer) to trigger automatic build and publication. There is no web-based article editor in the current site.

Keep unpublished drafts outside `src/pages/` (for example in `drafts/`): files in `src/pages/` generate public URLs even if a `draft` flag hides them from listings. No invented or sample posts are published.

## Deploy to GitHub Pages

1. Use the existing public repository `khataei/khataei.github.io`.
2. Push this directory's contents to its `main` branch. Exclude `node_modules`, `.astro`, and `dist` as specified in `.gitignore`.
3. In repository Settings → Pages, set Source to GitHub Actions.
4. Run the included deployment workflow, or push to `main`.

The included workflow builds and deploys to Pages. The existing destination repository is https://github.com/khataei/khataei.github.io and the site address is https://khataei.github.io/. If the destination changes, update `astro.config.mjs`, `rss.xml.ts`, `sitemap.xml.ts`, and `public/robots.txt`.

## Future article requests

Give the article to your assistant and ask to publish it on this site. `AGENTS.md` records the content rules, Markdown format, publishing workflow, verification, and the boundary that LinkedIn is managed by Javad himself.

## GitHub activity section

`src/components/GitHubStats.astro` renders a contribution calendar, contribution and streak counts, public repository count, and primary languages. It uses the dated public snapshot in `src/data/github.json`; it needs no visitor-side API calls or third-party image widgets.

`npm run refresh:github` fetches unauthenticated public GitHub profile/repository data and the public contribution calendar. `npm run build` refreshes it automatically through prebuild. If GitHub is temporarily unavailable or the calendar markup changes, the build keeps the previous dated snapshot. Counts update at build time, not on every page view. Language counts are the number of non-fork public repositories by primary language, not measures of proficiency or code volume. Contribution totals match the calendar visible on the public GitHub profile, which may include anonymized private contributions if enabled in GitHub.

Publication was approved on November 14, 2026. The production site uses the GitHub Actions workflow in this repository.

The homepage leads with current vehicle valuation work. The 2022 paper remains on Research. Public integration references and the decision to describe API latency without an unqualified numerical benchmark are documented in `docs/carfax-content-sources.md`.

Google Fonts supplies Instrument Serif and DM Sans; local fallbacks remain usable if font loading is unavailable.
