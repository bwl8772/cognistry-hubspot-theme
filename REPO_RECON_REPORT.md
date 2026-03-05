# HubSpot CMS Child Theme — REPO RECON Report

**Theme:** theme-challenge CraftLX (child of `@marketplace/Web_Canopy_Studio/theme-challenge`)  
**Theme root:** `CraftLX/`  
**Report date:** 2025-03-05  

**→ Action list (with HubL + HubSpot extensions installed):** see [ACTION_LIST.md](./ACTION_LIST.md).

---

## 1) Executive summary

- **Theme root is `CraftLX/`.** All theme assets (templates, modules, css, js, images) live under `CraftLX/`. Repo root holds only config (`.env.local`, `hubspot.config.yml`, `.gitignore`) and the `CraftLX` theme folder.
- **Child theme is correctly declared.** `CraftLX/theme.json` has `"extends": "@marketplace/Web_Canopy_Studio/theme-challenge"`, `"enable_domain_stylesheets": false`, `"version": "14"`. Preview uses `./templates/home-clean.html`. **Do not remove or change `extends`** or marketplace inheritance breaks.
- **Safe override surface for look & feel:** `CraftLX/child.css` (loaded last via `get_public_template_url` in `base.html`), and optionally `CraftLX/css/theme-overrides.css` (HubL/CSS that consumes `theme.*`). All templates extend `./layouts/base.html`; all pages inherit the same CSS/JS load order. Customization should go in `child.css` for overrides and in theme editor for any `theme.*`-driven values.
- **27 custom modules** under `CraftLX/modules/` (each with `module.html`, `module.css`, `fields.json`, `meta.json`). Their markup uses stable class names (e.g. `.hero-section`, `.section-base`, `.header`, `.accordion_box`) that can be targeted from `child.css`. Header/footer are global partials (`partials/header-module.html`, `partials/footer-module.html`) and share classes with `css/components/_header.css` and `_footer.css`.
- **No parent theme files are present locally;** no `dist`/`build` or “DO NOT EDIT”/“generated” markers in theme files. `theme-overrides.css` and `css/main.css` (and included partials) are part of the **child theme** and are overrides of parent behavior; changing them is allowed but riskier than using only `child.css` for additive overrides.

---

## 2) Theme surface area map

### A) Allowed-to-change (safe)

| Path / pattern | Reason | Impact |
|----------------|--------|--------|
| `CraftLX/child.css` | Intended override file; loaded last in `base.html` via `require_css(get_public_template_url("../../child.css"))`. | Global CSS overrides; no structural change; safe for look & feel. |
| `CraftLX/theme.json` — `label`, `preview_path`, `screenshot_path`, `responsive_breakpoints`, `is_available_for_new_content` | Child theme metadata; does not affect parent inheritance. | Editor label, preview template, and breakpoints only. |
| `CraftLX/templates/*.html` (page templates, e.g. `home-clean.html`, `about.html`, `blog-index.html`) | Child-owned page templates; they only `extends` child’s `./layouts/base.html`. | Content structure and which modules/sections appear; safe if you don’t remove required structure (e.g. blocks). |
| `CraftLX/templates/layouts/base.html` | Child layout; controls CSS/JS and global partials. | **Conditional:** changing `require_css`/`require_js` order or paths affects load order; adding styles/scripts is safe; removing or reordering parent-loaded assets can break behavior. |
| `CraftLX/modules/<name>.module/module.css` | Per-module styles in child theme. | Scoped to that module; safe for styling. |
| `CraftLX/modules/<name>.module/fields.json` | Module editor fields in child theme. | Only if you need new/changed editor options; avoid breaking existing field keys used in `module.html`. |
| `CraftLX/images/*` | Child theme images. | Safe to add/replace; update references in templates/modules that use `get_asset_url`. |
| `CraftLX/sections/*.html` | Child theme sections. | Safe to edit for content/styling. |

### B) High-risk / conditional-change

| Path / pattern | Reason | Impact |
|----------------|--------|--------|
| `CraftLX/templates/layouts/base.html` | Single layout for all pages; defines header/footer partials and CSS/JS order. | Changing partial paths, removing `standard_header_includes`/`standard_footer_includes`, or reordering `main.css` / `theme-overrides.css` / `child.css` can break editor or parent expectations. |
| `CraftLX/templates/partials/header-module.html`, `footer-module.html` | Global partials used by `base.html`; structure and class names are used by `init.js` (e.g. `.header`, `#nav-toggle`, `.mobile-nav-open`) and `main.js` (e.g. `.header__navigation`, `.header__language-switcher`). | Heavy structural changes can break sticky header, mobile nav, or language switcher. Prefer overriding via `child.css`; if you change markup, re-validate JS. |
| `CraftLX/css/theme-overrides.css` | HubL + CSS; uses `theme.*` (spacing, colors, typography, header, buttons, forms, etc.). | Overrides parent styling; safe to tweak values. Removing or renaming `theme.*` variables can break if parent or editor expects them. Prefer additive overrides in `child.css` when possible. |
| `CraftLX/css/main.css` and included partials (e.g. `_header.css`, `_footer.css`, `_default-modules.css`) | Child theme base styles; many classes are referenced in partials and modules. | Changing or removing class names can break JS or partials; adding rules or overriding in place is lower risk. |
| `CraftLX/js/init.js` | Adds `.sticky`, `.theme-shadow` on scroll; toggles `.mobile-nav-open` on `.header`; uses `theme-scroll-reveal` and ScrollMagic. | Changing class names or DOM expectations can break header behavior and scroll effects. |
| `CraftLX/js/main.js` | Toggles for nav, language switcher, search (`.header__navigation`, `.header__language-switcher`, etc.). | Same as above; tightly coupled to header partial structure. |
| `CraftLX/theme.json` — `preview_path` | Points to template used for theme preview. | Changing to a template that doesn’t exist or has different structure can break theme preview. |
| Any template that changes `{% block header %}` / `{% block footer %}` or global partial paths | Base layout contract. | Can break editor or parent expectations. |

### C) Must-not-change

| Path / pattern | Reason | Impact |
|----------------|--------|--------|
| `CraftLX/theme.json` — `extends` | Declares child relationship to `@marketplace/Web_Canopy_Studio/theme-challenge`. | Removing or changing breaks marketplace inheritance and theme updates. |
| Parent theme assets | Parent lives in HubSpot/marketplace; not present in repo. | N/A — do not attempt to edit parent; no parent files in this repo. |
| `{{ standard_header_includes }}` / `{{ standard_footer_includes }}` in `base.html` | HubSpot-injected assets (tracking, etc.). | Removing breaks HubSpot functionality. |
| HubSpot-managed or hidden system files | None identified in theme tree. | If present later, do not edit. |
| Build artifacts (`dist`/`build`/`.map`) | None found in theme. | If introduced, treat as generated; don’t edit. |

---

## 3) Customization entry points

### Global CSS overrides (recommended)

- **Where:** `CraftLX/child.css`
- **How it’s loaded:** In `CraftLX/templates/layouts/base.html` (after `main.css` and `theme-overrides.css`):
  - `{{ require_css(get_public_template_url("../../child.css")) }}`
- **Load order (evidence):**  
  1) `main.css`  
  2) `theme-overrides.css`  
  3) Slick (CDN)  
  4) `main.js`, `child.js`  
  5) `standard_header_includes`  
  6) **child.css**  
  So `child.css` wins on specificity for overrides.
- **Usage:** Put all global look & feel overrides here. Use classes from templates/partials/modules (see Evidence) to target elements. Avoid removing or renaming classes that JS depends on (e.g. `.header`, `.header__navigation`, `#nav-toggle`, `.theme-scroll-reveal`).

### Theme settings (theme.json + theme-overrides.css)

- **theme.json:** In this repo, `theme.json` has no `fields` key. Theme editor fields (e.g. `theme.spacing`, `theme.global_colors`, `theme.typography`, `theme.header`, `theme.buttons`) are likely defined by the **parent** theme and inherited. You can safely change in this child:
  - `label`, `preview_path`, `screenshot_path`, `responsive_breakpoints`, `is_available_for_new_content`, `hide_all_default_modules`.
- **theme-overrides.css:** Uses HubL variables (e.g. `theme.spacing.max_width`, `theme.global_colors.primary_color.color`, `theme.header.background_color`). Adjusting these variables only affects how the child theme renders; it does not change the parent’s theme field definitions. For maximum safety, prefer overriding the same properties in `child.css` instead of editing `theme-overrides.css` unless you need to change the variable-based logic.

### Templates and preview_path

- **Where templates live:** `CraftLX/templates/` (e.g. `home-clean.html`, `about.html`, `blog-index.html`, `contact.html`, `pricing.html`, `product.html`, `pillar.html`, `blog-post.html`, system templates under `templates/system/`).
- **How they’re wired:** All extend `./layouts/base.html` (or `../layouts/base.html` for `system/`). `theme.json` has `"preview_path": "./templates/home-clean.html"`, so the theme preview uses that template.
- **Stable hooks for styling:** Templates and partials use consistent classes (e.g. `body-container`, `body-container--home`, `header`, `footer`, `hero-section`, `section-base`, `theme-section-styles`, `theme-scroll-reveal`, `theme-shadow`). These can be targeted from `child.css`.

### Custom modules (styling and markup hooks)

- **Location:** `CraftLX/modules/` — 27 modules (e.g. `Hero Section.module`, `Section.module`, `Accordion.module`, `Menu Section.module`, `Card.module`, `Blog Feed.module`).
- **Per-module assets:** Each has `module.html`, `module.css`, `fields.json`, `meta.json`; many have `module.js`.
- **Styling:** Module CSS is loaded with the module when used. For global overrides, use `child.css` and target the same class names (e.g. `.hero-section`, `.section-base`, `.accordion_box`, `.header__main-bar`, `.footer__container`). Key classes from evidence:
  - **Header/footer:** `.header`, `.header__main-bar`, `.header__container`, `.header__logo`, `.header__menu`, `.header__navigation`, `.header__navigation-toggle`, `#nav-toggle`, `.footer`, `.footer__container`.
  - **Hero:** `.hero-section`, `.hero-content`, `.hero-section-overlay`, `.theme-section-styles`, `.section-bg-fixed`.
  - **Sections:** `.section-base`, `.section-row`, `.theme-scroll-reveal`, `.section-img`, `.dnd_column`.
  - **Accordion:** `.accordion_area`, `.accordion_box`, `.accordion_boxinner`, `.theme-shadow-card-flat`.
  - **Menu (macros):** `.menu-item`, `.menu-link`, `.has-submenu`, `.active-item`, `.active-branch`.

---

## 4) Proof / evidence appendix

### A) Inventory structure

```text
# ls -la (repo root)
total 40
drwxr-xr-x@  8 brianlambert  staff   256 Mar  5 06:19 .
drwxr-xr-x  12 brianlambert  staff   384 Mar  5 06:22 ..
-rw-r--r--@  1 brianlambert  staff  6148 Mar  5 06:19 .DS_Store
-rw-r--r--@  1 brianlambert  staff   215 Mar  5 06:14 .env.local
drwxr-xr-x@ 14 brianlambert  staff   448 Mar  5 06:20 .git
-rw-r--r--@  1 brianlambert  staff    43 Mar  5 06:09 .gitignore
drwxr-xr-x@ 11 brianlambert  staff   352 Mar  5 06:16 CraftLX
-rw-r--r--  1 brianlambert  staff   827 Mar  5 06:15 hubspot.config.yml
```

```text
# find . -maxdepth 4 -type d (excluding .git) — theme-relevant dirs
.
./CraftLX
./CraftLX/css
./CraftLX/css/components
./CraftLX/css/elements
./CraftLX/css/generic
./CraftLX/css/objects
./CraftLX/css/templates
./CraftLX/css/tools
./CraftLX/images
./CraftLX/images/icons
./CraftLX/images/template-previews
./CraftLX/js
./CraftLX/modules
./CraftLX/sections
./CraftLX/templates
./CraftLX/templates/layouts
./CraftLX/templates/partials
./CraftLX/templates/partials-Delete
./CraftLX/templates/system
```

### B) theme.json (excerpt)

```json
{
  "label" : "theme-challenge CraftLX",
  "preview_path" : "./templates/home-clean.html",
  "screenshot_path" : "./images/template-previews/ThemeChallengeHome.png",
  "enable_domain_stylesheets" : false,
  "is_available_for_new_content" : true,
  "extends" : "@marketplace/Web_Canopy_Studio/theme-challenge",
  "responsive_breakpoints" : [ {
    "mediaQuery" : "@media (max-width: 767px)",
    "messages" : { },
    "name" : "mobile",
    "previewWidth" : { "units" : "px", "value" : 477 }
  } ],
  "version" : "14",
  ...
}
```

### C) CSS entry points and load order

**Files:**

- `CraftLX/child.css` — override scaffold (comments only).
- `CraftLX/css/main.css` — includes generic, objects, elements, components, templates (no HubL).
- `CraftLX/css/theme-overrides.css` — HubL (`{% set ... theme.* %}`) + CSS.
- Per-module: `CraftLX/modules/<name>.module/module.css` (many).

**base.html (top ~56 lines) — load order:**

```html
{{ require_css(get_asset_url('../../css/main.css')) }}
{{ require_js(get_asset_url('../../js/jquery-3.5.1.min.js')) }}
{{ require_css(get_asset_url('../../css/theme-overrides.css')) }}
<!-- Slick CDN -->
{{ require_js(get_asset_url('../../js/main.js')) }}
...
{{ require_js(get_asset_url("../../child.js")) }}
{{ standard_header_includes }}
{{ require_css(get_public_template_url("../../child.css")) }}
```

**child.css (full file):**

```css
/* @import url('http://example.com/example_style.css'); */
/***********************************************/
/* CSS @imports must be at the top of the file */
/***********************************************/
/*****************************************/
/* Start your style declarations here    */
/*****************************************/
```

**main.css (includes only):**

```css
{% include './generic/_reset.css' %}
{% include './generic/_normalize.css' %}
{% include './objects/_layout.css' %}
...
{% include './components/_header.css' %}
{% include './components/_footer.css' %}
...
```

**theme-overrides.css (variable usage sample):**

```css
{% set container_width = theme.spacing.max_width ~ 'px' %}
{% set primary_color = theme.global_colors.primary_color.color %}
{% set primary_font = theme.global_fonts.primary_font %}
{% set header_bg_color = color(theme.header.background_color) %}
...
```

### D) Templates: extends and global partials

- All page templates: `{% extends './layouts/base.html' %}` or `{% extends '../layouts/base.html' %}` (e.g. `home-clean.html`, `about.html`, `blog-index.html`, `contact.html`, `pricing.html`, `product.html`, `pillar.html`, `blog-post.html`, and all under `templates/system/`).
- `base.html`:
  - `{% block header %}` → `{% global_partial path='../partials/header-module.html' %}`
  - `{% block footer %}` → `{% global_partial path='../partials/footer-module.html' %}`
- `demo-lp.html` overrides header/footer: `global_partial path="./partials/header-no-navigation.html"` and `footer-no-navigation.html`.

### E) Modules (sample markup and classes)

- **Hero Section.module:**  
  `<section class="hero-section {{ hero_overlay }} theme-section-styles section-bg-fixed {{ hero_type }}">`, `.hero-content`, `.theme-scroll-reveal`, `.hero-btn`, `.hero-section-background-container`.
- **Section.module:**  
  `<section class="section-base row-fluid">`, `.section-row`, `.theme-scroll-reveal`, `.section-img`, `.section-img-container`, `.dnd_column`.
- **Accordion.module:**  
  `.accordion_area`, `.accordion_box`, `.accordion_boxinner`, `.theme-shadow-card-flat`.
- **header-module.html (partial):**  
  `<header class="header">`, `.header__main-bar`, `.header__container`, `.header__logo`, `.header__menu`, `#nav-toggle`, `.header__navigation-toggle`, `.header__navigation`, `.header__language-switcher`.

### F) JS affecting look & feel

- **init.js:**  
  - `$(window).on('scroll', ...)` adds/removes `.sticky` and `.theme-shadow` on `.header` (scroll &gt; 25).  
  - `#nav-toggle` click: `$('.header').toggleClass('mobile-nav-open')`.  
  - ScrollMagic: `.theme-scroll-reveal` → class toggle `visible`.
- **main.js:**  
  - Uses `.header__navigation`, `.header__language-switcher`, `.header__search`, `.header--toggle`, `.header__navigation--toggle`, etc.; toggles `.open` / `.show` / `.hide` for nav, language, search.

### G) Generated / managed / parent-owned

- **find:** No `node_modules`, `dist`, or `build` under `CraftLX/`. No `*.map` in theme.
- **rg "DO NOT EDIT|generated|autogenerated|managed by HubSpot|marketplace":** Only hit is `theme.json` (the string `"extends" : "@marketplace/..."`). No “do not edit” or “generated” comments in theme files.
- **Parent theme:** Not present in repo; child does not copy parent assets. All files under `CraftLX/` are child theme assets.

---

## 5) Firecrawl research: Customizing your HubSpot theme with Cursor / your IDE

*Research conducted via Firecrawl MCP (search + scrape). Sources: HubSpot docs, HubSpot Developer Blog, Maka Agency developer guide. Applied to this repo (CraftLX child theme).*

### Summary: Using your own IDE (Cursor / VS Code) to improve your theme

- **Child themes are the supported way to customize** a marketplace or parent theme without losing updates. The child holds only override files; everything else is inherited from the parent. Your IDE edits the child theme locally; HubSpot CLI syncs to the account.
- **HubSpot CLI** is the bridge between local files and HubSpot: `hs cms fetch`, `hs cms upload`, `hs cms watch`. Use **watch** for automatic upload on save so you can edit in Cursor/VS Code and see changes in the HubSpot preview. **Local theme preview** is available via `hs cms theme preview` (renders at https://hslocal.net:3000/ without uploading).
- **HubSpot’s VS Code extension** works in Cursor (Cursor is VS Code–based): HubL syntax/autocomplete, CMS file management (upload, fetch, watch), account auth, and creating new templates/modules from the sidebar. Enabling HubL (e.g. `*html` → `html-hubl`, `*css` → `css-hubl`) improves editing of theme templates and `theme-overrides.css`.
- **Best practice: prefer `child.css` and `child.js`** for look & feel. Avoid cloning parent CSS/JS or whole folders into the child; only add custom code in the child’s root `child.css` / `child.js`. Clone parent assets (templates/modules) only when you must change structure or fields; cloning detaches from parent updates.
- **Override rule:** A file with the **same path and name** in the child replaces the parent’s file. To keep receiving parent updates, use unique names for custom modules/templates when you clone, or avoid cloning and override only via `child.css` / `child.js`.

### Child theme mechanics (HubSpot docs)

- **What the child gets by default:** `theme.json` (with `extends`), empty `child.css` and `child.js`, and any file that contains `standard_header_includes` (typically the base layout). You do **not** get full copies of every template/module; those are inherited. Clone only what you need to override.
- **Creating a child via CLI:** Create a directory, copy the parent’s `theme.json`, add a comma after line 5 (or after `responsive_breakpoints`), add `"extends": "path/to/parent"` (e.g. `"@marketplace/Vendor/theme-name"` or `@hubspot/barricade`). Upload with `hs cms upload <src> <dest>`.
- **Limits:** Child theme count depends on subscription (e.g. 1 for Starter, 5 for Pro, 10 for Enterprise). You cannot create a child of a child.

### CLI commands relevant to this repo

| Command | Purpose |
|--------|----------|
| `hs cms fetch --account=<name> <src> [dest]` | Pull theme/files from HubSpot into local (e.g. after cloning in Design Manager). |
| `hs cms upload --account=<name> <src> <dest>` | Push local theme (e.g. `CraftLX`) to Design Manager. |
| `hs cms watch --account=<name> <src> <dest>` | Watch folder and auto-upload on save; best for editing in Cursor/IDE. |
| `hs cms theme preview <src> <dest>` | Local preview at https://hslocal.net:3000/ without uploading. |
| `hs cms lighthouse-score --theme-path=<path>` | SEO/accessibility/performance scores for the theme. |

*As of CLI v8, use `hs cms` (e.g. `hs cms upload`) not legacy `hs upload`.*

### IDE setup (Cursor / VS Code)

- **HubSpot extension:** Install “HubSpot” from the Extensions panel. Use it to authenticate accounts, upload/fetch/watch the theme folder, and get HubL support.
- **HubL in Cursor/VS Code:** In Settings → `files.associations`, add `*html` → `html-hubl` and `*css` → `css-hubl` so HubL syntax and autocomplete work in `.html` and `.css` (including `theme-overrides.css`).
- **Watch from IDE:** Either run `hs cms watch` in a terminal for the theme directory, or use the extension’s “Watch” on the folder so saves in Cursor push to HubSpot.
- **Config:** This repo uses `hubspot.config.yml` and `.env.local` for account/auth; the CLI and extension can use the same (e.g. `--account=craft-lx` or default account).

### Best practices (from HubSpot blog + Maka Agency guide)

- **Do:** Put global overrides in `child.css` and `child.js`; ensure they load **after** parent/theme styles (e.g. in `base.html`, `child.css` last). This repo already does this in `CraftLX/templates/layouts/base.html`.
- **Do:** Use custom CSS classes (e.g. module “custom class” fields) to target specific modules from `child.css` instead of cloning modules for style-only changes.
- **Do:** Use staged/unpublished pages for experiments so production isn’t affected.
- **Don’t:** Edit the parent theme directly; don’t remove `extends` from `theme.json`.
- **Don’t:** Clone parent CSS/JS or whole folders into the child unless necessary; prefer overriding in `child.css` / `child.js` to stay compatible with parent updates.
- **If you clone:** Prefer unique names for cloned modules/templates so the original can still receive updates; document version and changes in a comment in the cloned file.

### How this applies to the CraftLX repo

- **Theme root:** `CraftLX/` is the child theme; it extends `@marketplace/Web_Canopy_Studio/theme-challenge`. All edits in Cursor should be under `CraftLX/`.
- **Safe customization surface:** `CraftLX/child.css` (and optionally `CraftLX/child.js`) for global look & feel; load order in `CraftLX/templates/layouts/base.html` already puts `child.css` last via `get_public_template_url("../../child.css")`.
- **Sync workflow:** From repo root, e.g. `hs cms watch --account=craft-lx CraftLX <design-manager-path>` so that edits in Cursor auto-upload. Or use the HubSpot VS Code extension “Watch” on the `CraftLX` folder.
- **Local preview:** Run `hs cms theme preview` from the theme root (e.g. `CraftLX`) to preview at https://hslocal.net:3000/ without publishing.
- **HubL:** Associating `*html` and `*css` with `html-hubl` / `css-hubl` in Cursor will improve editing of templates and `theme-overrides.css`.

### Sources (Firecrawl)

- [Child Themes - HubSpot docs](https://developers.hubspot.com/docs/cms/start-building/building-blocks/themes/child-themes)
- [Customize your Site with a Child Theme - HubSpot Developer Blog](https://developers.hubspot.com/blog/customize-your-site-with-a-child-theme)
- [CMS CLI commands - HubSpot docs](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/commands/cms-commands)
- [Install the HubSpot Visual Studio Code extension - HubSpot docs](https://developers.hubspot.com/docs/developer-tooling/local-development/vs-code-extension)
- [Developer Guide - Best Practices for Customizing a HubSpot Theme - Maka Agency](https://www.maka-agency.com/power-help-center/developer-guide-best-practices-for-customizing-a-hubspot-theme)

---

**End of report.** No files were modified; this is analysis and documentation only.
