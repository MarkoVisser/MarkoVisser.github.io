# Portfolio site

Personal site for Marko Visser, live at https://markovisser.github.io. Plain Jekyll on GitHub Pages, no local build step required. Dark, technical style: palette and type pairing from the UI/UX Pro Max "Developer Tool / IDE" and "Developer Mono" recommendations.

**Publication rule (18 Jul 2026):** public repo and Pages, but the employer is never named anywhere on the site, in the repo, or in commit history. The firm stays "a consulting engineering firm". Page copy is written in Marko's voice per humanize-text: no em dashes, no hype register.

## Layout and navigation

Every page shares one header, defined once in `_layouts/default.html`: a primary bar with About, Articles, Projects, and a LinkedIn button that doubles as the contact link. The home page uses that same layout, so there is a single source of truth for the nav (it used to be a standalone file with its own copy).

`js/main.js` builds an "on this page" rail from the sections of the current page and highlights the one you are reading as you scroll. On article pages it falls back to a table of contents built from the headings. The rail sits in the left gutter on wide screens (about 1300px and up) and hides on narrower screens, where the top bar carries navigation on its own.

## Structure

```
_config.yml              Jekyll config (articles collection, kramdown)
Gemfile                  gems for an optional local `jekyll serve`; Pages builds without it
_layouts/default.html    shared shell: head, the one nav, footer, on-this-page rail slot
_layouts/article.html    article page (series eyebrow, title, date, cover, LinkedIn cross-link)
_articles/               one .md per article -> /articles/<filename>/
index.html               home page (front matter: layout: default); hero + About, Experience, Stack, Tools, Projects, Writing
articles/index.html      auto-generated article list
projects/index.html      public tools and repos (BusJam, sans-calc-mcp, vault-rag)
resources/index.html     redirect to /projects/, kept so the old URL still resolves
series/steal-from-software/  series landing page (update "Upcoming" rows as parts publish)
assets/covers/           article cover images (1920x1080, monospace filename cards)
assets/logos/            tool logos for the home Tools grid
css/styles.css           design tokens, shared components, nav rail, article styles
js/main.js               footer year, mobile nav, on-this-page rail, reveal-on-scroll
```

## Publishing an article (runbook)

1. Copy the master markdown from `../brand/articles/...` into `_articles/<series-slug>-<part>-<name>.md`.
2. Add front matter: `title`, `date`, `description`, `series`, `series_url`, `part`, `linkedin_url`, `cover`. Strip the internal draft-note line and publish checklist.
3. Drop the cover PNG into `assets/covers/`.
4. On the series page, delete that part's "Upcoming" row. The published loop picks it up automatically.
5. Update the home page Writing section, which shows the latest pieces as hand-maintained cards.
6. Commit and push. Pages rebuilds in about a minute.

## Deploy

The repo is already connected to Pages (Settings -> Pages -> Deploy from a branch, `main`, `/ (root)`). To publish changes, push to `main` and Pages rebuilds automatically. No Node, no bundler, no CI.

To preview locally (optional): `bundle install`, then `bundle exec jekyll serve`.

### Custom domain (optional)

Add a `CNAME` file at the root containing the domain, then point DNS:

- Apex domain: four `A` records to GitHub's IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
- Subdomain (e.g. `www`): a `CNAME` record to `markovisser.github.io`

Then set the custom domain in the Pages settings.
