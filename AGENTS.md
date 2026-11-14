# Javad Khataei's personal website

## Identity and scope

- Public site: https://khataei.github.io/
- Repository: https://github.com/khataei/khataei.github.io
- Framework: Astro, static output; Node 24; npm with committed package-lock.json.
- GitHub Actions deploys main to GitHub Pages using .github/workflows/deploy.yml.
- English only. Restrained editorial design, light/dark modes, no photo, no public email.
- Do not modify LinkedIn, create posts there, or send messages. Javad handles LinkedIn himself.
- No petroleum references in the introduction or About narrative. Education may include it, but University of Tehran's master's degree is Chemical Engineering. Sharif's bachelor's is Petroleum Engineering.
- Keep vehicle valuation before LLM work in the CARFAX experience; omit team size. Do not add the 50% to 80% claim without clarification of its metric.
- Lead the homepage with current CARFAX Canada work: responsibility for the production vehicle valuation model, vehicle history, and production ML systems. Keep the 2022 paper on Research rather than featuring it on the homepage. Use direct, professional language without slogans.
- Kijiji's publicly announced pricing comparison uses market values. Do not describe it as a History-Based Value integration. AutoVerify's announced valuation integration covers trade-in estimates. Link public product references without implying Javad personally built every partner integration. Supporting sources and wording decisions are in docs/carfax-content-sources.md.
- Javad reports low API latency and support for concurrent requests. Public copy describes low latency without a numerical benchmark; do not turn the number into a response-time guarantee or add a percentile, request rate, or improvement ratio without measurement context.

## When Javad supplies an article

He intends to give the article to an assistant and have it added to this website. Implement the publication when requested; if he asks for a draft or review only, honor that boundary.

1. Work in this repository. Check Git status and remote main first, and preserve unrelated edits. Do not assume an old local copy is current.
2. Preserve the author's meaning and voice. Format headings, code fences with language tags, links, lists, and images. Do not invent claims or write filler.
3. Choose a short descriptive URL slug and create src/pages/writing/<slug>.md with front matter:

   ```yaml
   ---
   layout: ../../layouts/Post.astro
   title: "Article title"
   description: "A concise, accurate summary."
   date: "YYYY-MM-DD"
   ---
   ```

   Use the publication date in America/Vancouver unless the user gives a date. Quote YAML strings. Store images in public/images/<slug>/ and reference them as /images/<slug>/filename with descriptive alt text.
4. The Writing index (/writing/), homepage's three latest posts, RSS feed (/rss.xml), and sitemap (/sitemap.xml) include published Markdown posts automatically. Each article lives at /writing/<slug>/.
5. Unpublished drafts must stay OUTSIDE src/pages/ (use drafts/). A draft flag only hides listings and does not prevent a page URL from being built. Never publish a draft by accident.
6. Install dependencies with npm ci if needed, then npm run build. Verify the rendered article, formatting, metadata, local links/images, Writing listing, and RSS entry. Check mobile layout for new long code blocks or unusual content.
7. For a requested publication, commit only the relevant files and push main. Follow the GitHub Actions deployment to success and verify the live article URL and Writing listing. Report the direct live article link.
8. If asked, prepare a separate LinkedIn summary with a link for Javad to post himself. Never post it or change his profile.

## Existing pages

- src/pages/index.astro: homepage and latest writing.
- src/pages/about.astro: introduction, education, volunteering.
- src/pages/work.astro: experience.
- src/pages/research.astro: paper, open source, selected projects.
- src/pages/writing/index.astro: all articles.
- src/layouts/Post.astro: shared Markdown article layout.
- src/styles/global.css: shared design and responsive styles.
- src/components/GitHubStats.astro and src/data/github.json: GitHub activity section. npm run refresh:github updates the public data snapshot; prebuild runs it automatically. On upstream failure, retain the dated snapshot. Do not add credentials or private repository details to the snapshot.

## Deployment and preview

- For failures, inspect the relevant GitHub Actions logs and fix the cause; do not report success from a push alone.
- Keep any local preview requested for review running; stopping it makes the user's localhost link fail. The public site is independent of the local server.
- Preserve existing URLs when editing articles. Change slugs only with an intentional redirect plan.
