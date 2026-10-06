# Cloudbricks.dev — Hugo site with a custom shadcn/ui theme

A static Hugo site that reproduces the [shadcn/ui](https://ui.shadcn.com) look
in plain HTML and CSS: Tailwind CSS v4 design tokens, component shortcodes, and
no JavaScript framework.

- **Hugo** 0.167 (extended) at `E:\tools\hugo.exe`
- **Tailwind CSS** 4.3.3 via Hugo Pipes (`css.TailwindCSS`)
- **Theme** `themes/shadcn`, written for this project

## Run it

```powershell
# Dev server with live reload
& "E:\tools\hugo.exe" server

# Drafts included
& "E:\tools\hugo.exe" server --buildDrafts

# Production build (minified + fingerprinted)
& "E:\tools\hugo.exe" --gc --minify --environment production
```

New post:

```powershell
& "E:\tools\hugo.exe" new posts my-post.md
```

> `package.json` also defines `npm run dev` / `npm run build`, but those assume
> `hugo` is on your PATH. It is not — use the full path above.

## Layout

```
hugo.toml                 site config (menus, taxonomies, Tailwind, security)
data/landing.yaml         /landing/ copy — hero, features, pricing, testimonial
static/images/            post images (migrated from hugo-clarity theme)
content/
  _index.md               home (blog feed)
  landing/_index.md       marketing page (layout: landing)
  about.md                "About me" page
  homelab.md              "Home Lab" page
  archives.md             year-grouped archives (layout: archives)
  post/                   blog posts (URLs stay /post/<category>/<slug>/)
themes/shadcn/
  assets/css/
    shadcn.css            design variant 'shadcn' (default) — entry point + tokens
    kish.css              design variant 'kish' — entry point + tokens
    components.css        component recipes (btn, card, badge, alert, tabs, …)
  assets/js/main.js       theme toggle, tabs, reveal-on-scroll, copy button
  layouts/
    baseof.html  home.html  landing.html  page.html  section.html  archives.html
    taxonomy.html  term.html  404.html  rss.xml
    _partials/            header, footer, sidebar, post-card, post-list,
                          pagination, icons…
    _shortcodes/          button, card, badge, alert, callout, tabs, tab,
                          accordion, item, notice, youtube
  i18n/en.toml
```

## Pages

| Path        | Layout          | Shows                                  |
| ----------- | --------------- | -------------------------------------- |
| `/`         | `home.html`     | The blog — every post, paginated        |
| `/post/`    | `section.html`  | Same feed, section-scoped (34 posts)    |
| `/tags/…`   | `term.html`     | Posts carrying that tag                 |
| `/categories/…` | `term.html` | Posts carrying that category        |
| `/series/…` | `term.html`    | Posts in that series                    |
| `/archives/`| `archives.html` | Every post grouped by year             |
| `/landing/` | `landing.html`  | Marketing page (hero, pricing, CTA)     |
| `/posts/`   | (alias)         | Redirects to `/post/`                   |

All three listings share `_partials/post-list.html`, which owns the `Paginate`
call — so card markup and pagination stay in one place. `/posts/`, `/articles/`,
`/blog/` etc. are aliases redirecting to `/post/`.

## Sidebar

The three blog listings (`/`, `/post/`, `/tags/…`) render a right-hand sidebar
from `_partials/sidebar.html`: author card, five most recent posts, then the
category and tag clouds with post counts. `/landing/` and individual posts have
no sidebar.

Each block is optional. A taxonomy with no terms in it renders nothing, so the
sidebar is safe on a site that has not adopted categories or tags.

Card grids use **container queries**, not viewport breakpoints — the grid sits
in a column that narrows when the sidebar appears, so `@lg:grid-cols-2` keys off
the column's own width. Adding `@container` to a new listing is required, or the
grid silently stays single-column.

## Editing the landing page

`data/landing.yaml` drives `/landing/`. Each block (`hero`, `features`,
`steps`, `metrics`, `pricing`, `testimonial`, `cta`) is optional — delete one to
drop that section.

Icons for feature cards come from `layouts/_partials/icon.html`. To add one,
extend that partial with another `{{ else if eq $name "…" }}` branch.

## Shortcodes

```markdown
{{< button text="Get started" url="/signup" variant="default" size="lg" >}}

{{< card title="Anomaly detection" icon="sparkles" >}}
Optional markdown body.
{{< /card >}}

{{< badge "New" variant="secondary" >}}

{{< alert title="Heads up" variant="warning" >}}
Supports variants: default, info, warning, destructive, success.
{{< /alert >}}

{{< callout title="Rule of thumb" variant="info" >}}…{{< /callout >}}

{{< tabs >}}
{{< tab title="npm" >}}…{{< /tab >}}
{{< tab title="pnpm" >}}…{{< /tab >}}
{{< /tabs >}}

{{< accordion >}}
{{< item title="Details" open="true" >}}…{{< /item >}}
{{< /accordion >}}
```

## Dark mode

Add `.dark` to `<html>`. The toggle in the header cycles light → dark → system
and persists to `localStorage`, with an inline script in `<head>` that applies
the class before first paint so there is no flash.

To recolour the site, edit the tokens at the top of
`themes/shadcn/assets/css/shadcn.css`. Everything else derives from them.

## Two things that will bite you

**1. Editing an imported CSS file may not rebuild.**

Hugo caches the Tailwind transform keyed on `assets/css/main.css`, not on the
files it `@import`s. Edit `shadcn.css` or `components.css`, run the build, and
the output may be stale. Delete `resources/` to force a rebuild:

```powershell
Remove-Item -Recurse -Force resources
```

**2. `security.exec.allow` is required.**

Since Hugo 0.165.0 `tailwindcss` is no longer in the default allow list. The
project config has to opt in:

```toml
[security.exec]
  allow = ['^(dart-)?sass$', '^go$', '^git$', '^node$', '^postcss$', '^tailwindcss$']
```

Tailwind also needs `build.buildStats.enable = true` (emits `hugo_stats.json`)
so it can see the utility classes used in templates. Since `hugo_stats.json` is
gitignored, `main.css` sources it explicitly with `@source "../../hugo_stats.json"`.

## Content notes

- Posts live in `content/posts/`; `tags` and `categories` taxonomies are enabled.
- Add a cover image by putting `featured.jpg` next to a post's `index.md`, or set
  `cover` in front matter. Cards and Open Graph tags pick it up automatically.
- Syntax highlighting uses Chroma's `github-dark` style.