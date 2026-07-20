# Portfolio site

Plain HTML/CSS/JS, no build step. Dark, technical/minimal style: palette and type pairing pulled from the UI/UX Pro Max "Developer Tool / IDE" + "Developer Mono" recommendations.

**Publication decision (18 Jul 2026):** public GitHub repo + Pages, but NO mention of the employer's name anywhere on the site, in the repo, or in commit history. The firm stays "a consulting engineering firm". Copy rules: Marko's voice per humanize-text, no em dashes in page copy.

## Before you publish, fill these in

Search the codebase for these placeholders and replace them:

- `REPLACE_WITH_PUBLIC_EMAIL` (2 places in `index.html`): the email address you want public. Don't reuse a private/alias address without deciding that's intentional.
- `REPLACE_WITH_USERNAME` (2 places in `index.html`): your GitHub handle. (LinkedIn is already filled: linkedin.com/in/marko-visser.)
- The `<!-- TODO -->` Open Graph block in `<head>`: fine as-is, but double check the description once the site has real project links.

```bash
grep -rn "REPLACE_WITH" .
```

## Structure (Jekyll, added 20 Jul 2026)

GitHub Pages builds Jekyll automatically, so no local tooling and no CI are needed. Articles are markdown; Pages renders them.

```
_config.yml              Jekyll config (articles collection)
_layouts/default.html    site shell (head, nav, footer); nav here, not index.html, for subpages
_layouts/article.html    article page (series eyebrow, title, date, cover, LinkedIn cross-link)
_articles/               one .md per article → /articles/<filename>/
articles/index.html      auto-generated article list
series/steal-from-software/  series landing page (update "Upcoming" rows as parts publish)
resources/index.html     public tools shelf (BusJam, sans-calc-mcp)
assets/covers/           article cover images (1920×1080, monospace filename cards)
index.html               the original single page, served as-is (no front matter = static passthrough)
css/styles.css           shared tokens + article styles appended at the bottom
```

### Publishing an article (runbook)

1. Copy the master markdown from `../brand/articles/...` into `_articles/<series-slug>-<part>-<name>.md`.
2. Add front matter: `title`, `date`, `description`, `series`, `series_url`, `part`, `linkedin_url`, `cover`. Strip the internal draft-note line and publish checklist.
3. Drop the cover PNG into `assets/covers/`.
4. On the series page, replace that part's "Upcoming" row with nothing (the published loop picks it up automatically).
5. Push. Pages rebuilds in about a minute.

The homepage Writing section shows the latest piece as a hand-maintained card; update it on each publish.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `yourusername.github.io` for a root domain, or any name for a project page).
2. Push this folder's contents to the repo's default branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/REPLACE_WITH_USERNAME/REPLACE_WITH_REPO.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**. Branch: `main`, folder: `/ (root)`. Save.
4. Site is live at `https://REPLACE_WITH_USERNAME.github.io/REPLACE_WITH_REPO/` (or `https://REPLACE_WITH_USERNAME.github.io/` if you used the `username.github.io` repo name) within a minute or two.

### Custom domain (optional)

Add a `CNAME` file at the root containing just your domain (e.g. `markovisser.dev`), and point your DNS:
- Apex domain: four `A` records to GitHub's IPs (185.199.108.153, .109.153, .110.153, .111.153)
- Subdomain (e.g. `www`): `CNAME` record to `REPLACE_WITH_USERNAME.github.io`

Then set the custom domain in the same Pages settings page.

## No build step needed

This is intentionally plain HTML/CSS/JS: edit the files directly and push. No Node, no bundler, no CI required to deploy.
