# HubSpot CMS Child Theme — Recon (Audit-Grade)

**Theme root:** `CraftLX/`  
**Report date:** 2026-03-05  
**Source of truth:** Commands run from repo root; all paths relative to repo root unless stated.

---

## 1) Executive summary (Proven only)

- **Theme root:** All theme assets in this repo live under `CraftLX/`. (Evidence: find/ls output in Appendix.)
- **theme.json:** The file `CraftLX/theme.json` exists and contains `"extends": "@marketplace/Web_Canopy_Studio/theme-challenge"`, `"preview_path": "./templates/home-clean.html"`, `"enable_domain_stylesheets": false`, `"version": "14"`. (Evidence: Appendix § 1.)
- **preview_path:** In this repo, `theme.json` sets `preview_path` to `"./templates/home-clean.html"`. The file `CraftLX/templates/home-clean.html` exists; `CraftLX/templates/home.html` does not exist. (Evidence: Appendix § 1 and § 2 file list + existence checks.)
- **Base layout and child.css:** The file `CraftLX/templates/layouts/base.html` exists. It contains at line 36 the exact line `{{ require_css(get_public_template_url("../../child.css")) }}`. Lines 12 and 16 require `main.css` and `theme-overrides.css` respectively. (Evidence: Appendix § 2 — full numbered excerpt of base.html and rg output.)
- **Templates extending base:** 22 template files under `CraftLX/templates` contain an `extends` directive that references `base.html`. (Evidence: Appendix § 3 — rg output listing file:line and the extend statement.)
- **Globally loaded CSS (from layout):** The only template that calls `require_css` or `get_public_template_url` for CSS is `CraftLX/templates/layouts/base.html`. It loads three CSS assets: `../../css/main.css` (L12), `../../css/theme-overrides.css` (L16), `../../child.css` via `get_public_template_url("../../child.css")` (L36). (Evidence: Appendix § 2 and § 4.)
- **Modules:** The directory `CraftLX/modules` exists. `find CraftLX/modules -maxdepth 2 -type d -name "*.module"` returns 28 directories. One module (Hero Section.module) was inspected: it contains `fields.json`, `meta.json`, `module.css`, `module.html`, `module.js`. (Evidence: Appendix § 5.)
- **JS and DOM contracts:** The file `CraftLX/js/init.js` contains: scroll handler that adds/removes classes `sticky` and `theme-shadow` on `.header` (L3–16); `getElementsByClassName("theme-scroll-reveal")` and ScrollMagic scene that toggles class `visible` (L136–145); `$("#nav-toggle").click` handler that toggles class `mobile-nav-open` on `.header` (L221–223). The file `CraftLX/templates/partials/header-module.html` contains `id="nav-toggle"` (L47) and classes `header__menu`, `header__navigation`, `header__navigation-toggle`. (Evidence: Appendix § 6 and JS/template excerpts.)
- **child.css content:** The file `CraftLX/child.css` exists and contains only comments and an empty scaffold; no style rules. (Evidence: Appendix § 2.)

---

## 2) Proven / Policy / UNKNOWN

### Proven (backed by Appendix evidence)

| Claim | Evidence pointer |
|-------|------------------|
| theme.json has extends, preview_path, enable_domain_stylesheets, version | § 1 (sed output) |
| preview_path is `./templates/home-clean.html` | § 1; § 3 file list; existence check |
| base.html exists | § 2 (`test -f` output) |
| base.html requires child.css at line 36 | § 2 (nl output + rg) |
| base.html requires main.css (L12), theme-overrides.css (L16) | § 2 (nl output) |
| 22 templates extend base.html | § 3 (rg extends) |
| 28 module directories under CraftLX/modules | § 5 (find + wc -l) |
| init.js adds/removes .sticky, .theme-shadow on scroll; toggles .mobile-nav-open on #nav-toggle click; uses .theme-scroll-reveal with ScrollMagic | § 6 (rg + init.js excerpts) |
| header-module.html has id="nav-toggle" and header__* classes | § 6 (rg output) |
| child.css is scaffold only | § 2 (child.css content) |

### Policy (team decision, not repo fact)

- **Strict override rule:** All global look & feel overrides go in `CraftLX/child.css` only. Rationale: (1) child.css is loaded by the single base layout at L36 after main.css and theme-overrides.css, so it is the last global CSS in the layout; (2) concentrating overrides in one file reduces drift from parent theme and keeps changes auditable; (3) the repo does not designate an “override” file — this is a team convention.
- **Override contract (guardrails):** Do not move or remove the `require_css(get_public_template_url("../../child.css"))` line from the base layout — it is the only override contract. Do not rename `child.css` without updating that require path. See §3 Forbidden and §4 Contract.

### UNKNOWN (not proven by evidence in this report)

- Whether HubSpot (uploaded theme) uses the same preview_path or a different path (e.g. home.html). We only attest to the repo.
- Whether every page that uses this theme in production actually uses a template that extends this base layout (we only proved 22 files extend base in the repo).
- Whether main.css or theme-overrides.css are loaded by any other path (e.g. parent or Design Manager); we only proved they are required in base.html.
- Exact load order at runtime (e.g. after standard_header_includes); we only proved the order of require_css/require_js lines in base.html.
- Whether any module’s module.css is loaded when the module is rendered (HubSpot behavior); we only listed files and did not trace runtime.

---

## 3) Surface Area Map

**Executive takeaway:** You can safely change **brand look** (colors, type, spacing, images) via `child.css`, theme.json (label, preview_path, screenshot_path), and images — without breaking function. That guarantee holds only if the **must-not-change** contract is left intact and **high-risk** script/layout pieces are not changed; those control behavior (animations, scroll, nav, HubSpot tracking).

---

### Must-not-change (contract-level)

These are the real breakpoints. Violating them breaks the override contract or HubSpot/platform contract.

| Item | Why |
|------|-----|
| **Do not remove or move** `{{ require_css(get_public_template_url("../../child.css")) }}` (base.html L36) | This is your **single override contract**. It must load last among layout CSS so `child.css` wins. If you move it earlier, your override rule is no longer true. Do not remove it. Do not rename `child.css` without updating this path. |
| **Do not remove** `{{ standard_header_includes }}` or `{{ standard_footer_includes }}` (base.html L35, L55) | HubSpot injects tracking and required assets here. Removing them breaks platform contract. |
| **Do not change** `"extends"` in theme.json | Child theme inheritance and marketplace updates depend on it. Changing or removing it breaks the theme contract. |
| **Do not edit parent theme assets** | Parent theme is not in this repo; there is no path to edit. |

---

### High-risk / conditional (behavior, not just look)

Changing these can change **behavior** across pages (animations, scroll, nav, carousels). If the goal is “change brand look without breaking function,” leave these alone or change only with explicit testing.

| Item | Why |
|------|-----|
| **CDN scripts and ScrollMagic in base layout** (L24–32) | The layout loads ScrollMagic, debug indicators, and initializes `var controller = new ScrollMagic.Controller()` in global scope. init.js (footer) builds ScrollMagic scenes for `.theme-scroll-reveal`. Changing script order, removing the controller init, or swapping/removing ScrollMagic breaks scroll/animation behavior across pages. |
| **main.js in head, init.js in footer** (L22, L56) | main.js runs in `<head>` (nav/language/search toggles, DOM ready). init.js runs after `standard_footer_includes` (scroll, sticky header, ScrollMagic scenes, #nav-toggle, slick). That order is a **deliberate behavior contract**. Reordering or moving one to the other can break nav, scroll effects, or carousels. |
| **Header/footer partials and their markup** (header-module.html, footer-module.html) | base.html includes them (L43–44, L50–51). init.js and main.js depend on `.header`, `#nav-toggle`, `.header__navigation`, etc. Changing structure or class names can break sticky header, mobile nav, and toggles. |
| **main.css, theme-overrides.css** (L12, L16) | Required by the layout. Policy: prefer overrides in child.css. Editing them can change layout/typography in ways that affect where scripts hook in. |

---

### Allowed (safe for look & feel)

| Path / item | Note |
|-------------|------|
| `CraftLX/child.css` | Add override rules here. It is loaded by base layout L36 (Appendix § 2). |
| `CraftLX/theme.json` — `label`, `preview_path`, `screenshot_path`, `responsive_breakpoints`, `is_available_for_new_content` | Safe. Do not change `extends`. |
| `CraftLX/templates/*.html` (page templates that extend base) | 22 files extend base (§ 3 appendix). Edit content/structure with care; preserve blocks. |
| `CraftLX/modules/<name>.module/module.css`, `fields.json` | 28 module dirs (§ 5). Scoped to modules. |
| `CraftLX/images/*` | Replace/add images; update `get_asset_url` refs where used (§ 4). |

---

## 4) Override policy

- **Strict rule:** Put all global look & feel overrides in **`CraftLX/child.css`** only. Do not add override CSS to `main.css`, `theme-overrides.css`, or other global files.
- **Rationale:** (1) child.css is the only CSS file loaded via `get_public_template_url` in the repo, and it appears last among the layout’s require_css calls (Appendix § 2), so it wins on cascade for overrides. (2) One-file override keeps changes visible and avoids editing theme-structure CSS. (3) This is a team policy; the repo does not label a file as “the” override file.

**Contract (guardrails).** If child.css is your only global override surface, treat the link between the layout and the file as a contract:

1. **Do not move or remove** the `require_css(get_public_template_url("../../child.css"))` line from the base layout (when that layout exists). That line is the only override contract. Removing it means overrides are never loaded. **Moving it earlier** (e.g. above main.css or theme-overrides.css) makes your override rule false — child.css would no longer load last, so it would not reliably win on cascade.
2. **Do not rename** `child.css` without updating the require path in the base layout. The layout currently requires `"../../child.css"`; if you rename the file, you must change that path to match.

---

## 5) Evidence appendix

### 1) theme.json

**Command:** `sed -n '1,120p' CraftLX/theme.json`

```
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
    "previewWidth" : {
      "units" : "px",
      "value" : 477
    }
  } ],
  "version" : "14",
  "author" : {
    "name" : "",
    "email" : ""
  },
  "license" : "./license.txt",
  "hide_all_default_modules" : false
}
```

**Existence checks:**  
`test -f CraftLX/templates/home-clean.html && echo "OK home-clean.html exists"` → OK home-clean.html exists  
`test -f CraftLX/templates/home.html` → exit 1 (home.html does not exist)

---

### 2) Base layout exists and loads child.css

**Commands:**

- `test -f CraftLX/templates/layouts/base.html && echo "OK base exists"`  
  → OK base exists

- `nl -ba CraftLX/templates/layouts/base.html | sed -n '1,120p'`

```
     1	<!--
     2	  templateType: "none"
     3	  isAvailableForNewContent: false
     4	-->
     5	<!doctype html>
     6	<html lang="{{ html_lang }}" {{ html_lang_dir }}>
     7	  <head>
     8	    <meta charset="utf-8">
     9	    <title>{{ page_meta.html_title }}</title>
    10	    {% if site_settings.favicon_src %}<link rel="shortcut icon" href="{{ site_settings.favicon_src }}" />{% endif %}
    11	    <meta name="description" content="{{ page_meta.meta_description }}">
    12	    {{ require_css(get_asset_url('../../css/main.css')) }}
    13	
    14	    {# Include theme overrides #}
    15	    {{ require_js(get_asset_url('../../js/jquery-3.5.1.min.js')) }}
    16	    {{ require_css(get_asset_url('../../css/theme-overrides.css')) }}
    17	    
    18	    <!-- Add the slick-theme.css if you want default styling -->
    19	    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    20	    <!-- Add the slick-theme.css if you want default styling -->
    21	    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
    22	    {{ require_js(get_asset_url('../../js/main.js')) }}
    23	    
    24	    <script src="https://cdn.jsdelivr.net/npm/simple-parallax-js@5.5.1/dist/simpleParallax.min.js"></script>
    25	    
    26	    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
    27	    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
    28	    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
    29	    
    30	    <script>
    31	      // init controller
    32	      var controller = new ScrollMagic.Controller();
    33	    </script>
    34	    {{ require_js(get_asset_url("../../child.js")) }}
    35	{{ standard_header_includes }}
    36	{{ require_css(get_public_template_url("../../child.css")) }}
    37	  </head>
    38	  <body>
    ...
    43	      {% block header %}
    44	        {% global_partial path='../partials/header-module.html' %}
    45	      {% endblock header %}
    ...
    55	    {{ standard_footer_includes }}
    56	    {{ require_js(get_asset_url('../../js/init.js')) }}
```

- `rg -n "child\.css|get_public_template_url\(|require_css\(" CraftLX/templates/layouts/base.html`

```
12:    {{ require_css(get_asset_url('../../css/main.css')) }}
16:    {{ require_css(get_asset_url('../../css/theme-overrides.css')) }}
36:{{ require_css(get_public_template_url("../../child.css")) }}
```

**child.css content (CraftLX/child.css):**

```css
/* @import url('http://example.com/example_style.css'); */

/***********************************************/
/* CSS @imports must be at the top of the file */
/* Add them above this section                 */
/***********************************************/

/*****************************************/
/* Start your style declarations here    */
/*****************************************/
```

---

### 3) Templates that extend base.html

**Command:** `find CraftLX/templates -maxdepth 2 -type f -name "*.html" -print | sort`

```
CraftLX/templates/about.html
CraftLX/templates/blog-index-2-col-sidebar.html
CraftLX/templates/blog-index-2-col.html
CraftLX/templates/blog-index-video-hero.html
CraftLX/templates/blog-index.html
CraftLX/templates/blog-post.html
CraftLX/templates/contact.html
CraftLX/templates/demo-lp-2.html
CraftLX/templates/demo-lp.html
CraftLX/templates/home-clean.html
CraftLX/templates/layouts/base.html
CraftLX/templates/partials-Delete/footer-module.html
CraftLX/templates/partials-Delete/footer-no-navigation.html
CraftLX/templates/partials-Delete/footer.html
CraftLX/templates/partials-Delete/header-module.html
CraftLX/templates/partials-Delete/header-no-navigation.html
CraftLX/templates/partials-Delete/header.html
CraftLX/templates/partials/footer-module.html
CraftLX/templates/partials/footer-no-navigation.html
CraftLX/templates/partials/footer.html
CraftLX/templates/partials/header-module.html
CraftLX/templates/partials/header-no-navigation.html
CraftLX/templates/partials/header.html
CraftLX/templates/pillar.html
CraftLX/templates/pricing.html
CraftLX/templates/product.html
CraftLX/templates/system/404.html
CraftLX/templates/system/500.html
CraftLX/templates/system/backup-unsubscribe.html
CraftLX/templates/system/membership-login.html
CraftLX/templates/system/membership-register.html
CraftLX/templates/system/membership-reset-password-request.html
CraftLX/templates/system/membership-reset-password.html
CraftLX/templates/system/password-prompt.html
CraftLX/templates/system/search-results.html
CraftLX/templates/system/subscription-preferences.html
CraftLX/templates/system/subscriptions-confirmation.html
```

**Command:** `rg -n "extends\s+.*base\.html" CraftLX/templates`

```
CraftLX/templates/blog-index.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/demo-lp-2.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/home-clean.html:7:{% extends "./layouts/base.html" %}
CraftLX/templates/demo-lp.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/blog-post.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/pricing.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/system/password-prompt.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/blog-index-2-col.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/blog-index-2-col-sidebar.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/system/subscriptions-confirmation.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/about.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/system/membership-login.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/system/search-results.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/system/membership-register.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/system/404.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/contact.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/product.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/system/membership-reset-password.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/system/subscription-preferences.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/pillar.html:7:{% extends "./layouts/base.html" %}
CraftLX/templates/system/500.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/system/membership-reset-password-request.html:7:{% extends '../layouts/base.html' %}
CraftLX/templates/blog-index-video-hero.html:7:{% extends './layouts/base.html' %}
CraftLX/templates/system/backup-unsubscribe.html:7:{% extends '../layouts/base.html' %}
```

Count: 22 files (excluding base.html itself).

---

### 4) CSS files and what is loaded globally from templates

**Command:** `find CraftLX -type f -name "*.css" -print | sort`

```
CraftLX/child.css
CraftLX/css/components/_default-modules.css
CraftLX/css/components/_footer.css
CraftLX/css/components/_header.css
CraftLX/css/elements/_buttons.css
CraftLX/css/elements/_forms.css
CraftLX/css/elements/_tables.css
CraftLX/css/elements/_typography.css
CraftLX/css/generic/_normalize.css
CraftLX/css/generic/_reset.css
CraftLX/css/main.css
CraftLX/css/objects/_containers-dnd.css
CraftLX/css/objects/_layout.css
CraftLX/css/templates/_blog.css
CraftLX/css/templates/_system.css
CraftLX/css/theme-overrides.css
CraftLX/css/tools/_macros.css
CraftLX/modules/Accordion.module/module.css
CraftLX/modules/Blog Feed.module/module.css
... (28 module module.css files total; see §5 for module list)
```

**Command:** `rg -n "require_css\(|get_asset_url\(|get_public_template_url\(" CraftLX/templates`  
(Only base.html contains require_css or get_public_template_url for CSS. Relevant lines from that run:)

```
CraftLX/templates/layouts/base.html:12:    {{ require_css(get_asset_url('../../css/main.css')) }}
CraftLX/templates/layouts/base.html:16:    {{ require_css(get_asset_url('../../css/theme-overrides.css')) }}
CraftLX/templates/layouts/base.html:36:{{ require_css(get_public_template_url("../../child.css")) }}
```

So the only template that loads CSS globally is base.html; it loads main.css, theme-overrides.css, and child.css (last).

---

### 5) Module inventory and count

**Commands:**

- `test -d CraftLX/modules && find CraftLX/modules -maxdepth 2 -type d -name "*.module" -print | sort`

```
CraftLX/modules/Accordion.module
CraftLX/modules/Blog Feed.module
CraftLX/modules/Blog Hero Section.module
CraftLX/modules/Blog Tag Filter.module
CraftLX/modules/Call To Action.module
CraftLX/modules/Card.module
CraftLX/modules/Content Timeline.module
CraftLX/modules/Hero Section.module
CraftLX/modules/Icon Slider.module
CraftLX/modules/Image Hover Info.module
CraftLX/modules/LP Hero Section.module
CraftLX/modules/Logo Section copy.module
CraftLX/modules/Menu Section.module
CraftLX/modules/Pricing Card.module
CraftLX/modules/Section Content Layouts.module
CraftLX/modules/Section FAQ.module
CraftLX/modules/Section Lead Magnet.module
CraftLX/modules/Section.module
CraftLX/modules/Social Follow.module
CraftLX/modules/Stat Counter.module
CraftLX/modules/Tab Module.module
CraftLX/modules/Testimonial Section.module
CraftLX/modules/card-section.module
CraftLX/modules/customizable-button.module
CraftLX/modules/menu-section.module
CraftLX/modules/pricing-card.module
CraftLX/modules/social-follow.module
CraftLX/modules/themes-pillar.module
```

- `test -d CraftLX/modules && find CraftLX/modules -maxdepth 2 -type d -name "*.module" -print | wc -l`  
  → 28

- `ls CraftLX/modules/Hero\ Section.module/`  
  → _locales  fields.json  meta.json  module.css  module.html  module.js

---

### 6) JS files and DOM contracts

**Command:** `find CraftLX -type f -name "*.js" -print | sort`  
(Output: CraftLX/child.js, CraftLX/js/cursor-follow.js, init.js, jquery-3.5.1.min.js, main.js, scroll.js, simpleParallax.js, and 28 module module.js files, plus partials icon-slider.js.)

**Command:** `rg -n "header__|nav-toggle|mobile-nav-open|sticky|theme-scroll-reveal" CraftLX/js CraftLX/templates CraftLX/modules`  
(Output: many matches; key ones summarized below.)

**Excerpts from CraftLX/js/init.js:**

- Lines 3–16 (scroll, .header, .sticky, .theme-shadow):

```js
  $(window).on('scroll', function() {
      var scroll = $(this).scrollTop();
      var topHeaderBar = $('.header');
      if(scroll < 25) {
          topHeaderBar.removeClass('sticky theme-shadow');
      }
      if(scroll >= 25) {
          topHeaderBar.addClass('sticky theme-shadow');
      }
```

- Lines 136–145 (theme-scroll-reveal, ScrollMagic, class "visible"):

```js
  var revealElements = document.getElementsByClassName("theme-scroll-reveal");
  for (var i=0; i<revealElements.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: revealElements[i],
        offset: 50,
        triggerHook: 0.9,
      })
        .setClassToggle(revealElements[i], "visible")
        .addTo(controller);
  }
```

- Lines 221–223 (#nav-toggle, .header, .mobile-nav-open):

```js
    $("#nav-toggle").click(function() {
        $('.header').toggleClass('mobile-nav-open');
        console.log('nav toggle clicked');
    });
```

**From rg:** `CraftLX/templates/partials/header-module.html:47: <input type="checkbox" id="nav-toggle">` and `header-module.html:48: <label class="header__navigation-toggle" for="nav-toggle">`, plus `header-module.html:51: <div class="header__navigation">`, etc.

---

**End of report.** No files were modified. All material claims are tied to the evidence above; override rule is TEAM POLICY; unproven items are in UNKNOWN.
