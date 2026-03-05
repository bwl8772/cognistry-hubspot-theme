# CraftLX HubSpot Theme — Design System Inspiration from App

**Purpose:** Identify patterns from the CraftLX app design system (`CRAFTLX_DESIGN_SYSTEM.md`) that can be safely adapted to the HubSpot child theme, respecting the constraints in `REPO_RECON_STRICT.md`.

**Date:** 2026-03-05  
**Constraint:** All changes must go in `CraftLX/child.css` only. Do not break parent theme, HubSpot contracts, or JS behavior.

---

## ✅ Safe to Adapt (CSS Variables & Utilities)

These patterns from the app can be added to `child.css` without breaking the theme:

### 1. CSS Custom Properties (Design Tokens)

The app uses CSS variables extensively. We can add a subset for the HubSpot theme **without** conflicting with HubSpot's theme system or parent CSS.

**Safe variables to add:**

```css
/* Add to CraftLX/child.css */

:root {
  /* Spacing & Layout */
  --spacing: 0.25rem; /* 4px base unit */
  --radius: 0.65rem; /* 10.4px — default border radius */
  
  /* Elevation (for subtle hover/active states) */
  --elevate-1: rgba(0, 0, 0, 0.05);
  --elevate-2: rgba(0, 0, 0, 0.12);
  
  /* On-dark text (for sections with dark backgrounds) */
  --on-dark-fg: hsl(0 0% 96%);
  --on-dark-muted: hsl(0 0% 80%);
  --on-dark-border: hsl(0 0% 40%);
}

.dark {
  /* Dark mode elevation (if dark mode is ever added) */
  --elevate-1: rgba(255, 255, 255, 0.04);
  --elevate-2: rgba(255, 255, 255, 0.09);
}
```

**Why safe:** These variables are scoped (`:root`, `.dark`), don't conflict with HubSpot theme fields or parent CSS, and only apply when used in child.css rules.

---

### 2. Elevation Utilities

The app has hover/active elevation classes. We can add these for buttons and cards:

```css
/* Add to CraftLX/child.css */

/* Hover elevation */
.hover-elevate {
  transition: box-shadow 200ms ease;
}

.hover-elevate:hover {
  box-shadow: 0 4px 12px var(--elevate-1);
}

/* Active elevation (pressed state) */
.active-elevate:active {
  box-shadow: 0 2px 8px var(--elevate-2);
}

/* For toggleable elements (e.g. tabs) */
.toggle-elevate {
  transition: box-shadow 200ms ease;
}

.toggle-elevate.toggle-elevated {
  box-shadow: 0 4px 12px var(--elevate-1);
}
```

**Use case:** Add `.hover-elevate` to CTAs or card links for subtle depth on hover. Does not conflict with parent theme.

---

### 3. Scrollbar Utilities

The app has `.scrollbar-none` and `.scrollbar-thin`. Safe to add:

```css
/* Add to CraftLX/child.css */

.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: hsl(240 5.9% 80%);
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: hsl(240 5.9% 70%);
}
```

**Use case:** Use `.scrollbar-thin` on long content blocks or carousels if default scrollbars feel too heavy.

---

### 4. Status/Semantic Color Utilities

The app has `.panel-success`, `.panel-warn`, `.panel-info`, etc. We can add simplified versions for HubSpot sections:

```css
/* Add to CraftLX/child.css */

/* Semantic panel backgrounds */
.panel-info {
  background-color: hsl(199 89% 96%);
  border: 1px solid hsl(199 89% 80%);
  color: hsl(199 89% 35%);
  padding: 1rem;
  border-radius: var(--radius, 0.5rem);
}

.panel-success {
  background-color: hsl(142 76% 96%);
  border: 1px solid hsl(142 76% 80%);
  color: hsl(142 76% 28%);
  padding: 1rem;
  border-radius: var(--radius, 0.5rem);
}

.panel-warn {
  background-color: hsl(38 92% 96%);
  border: 1px solid hsl(38 92% 80%);
  color: hsl(38 92% 32%);
  padding: 1rem;
  border-radius: var(--radius, 0.5rem);
}

.panel-danger {
  background-color: hsl(0 84% 96%);
  border: 1px solid hsl(0 84% 80%);
  color: hsl(0 84% 40%);
  padding: 1rem;
  border-radius: var(--radius, 0.5rem);
}
```

**Use case:** Add `.panel-success` to confirmation messages, `.panel-warn` to alert boxes, etc., in HubSpot modules or templates. Does not interfere with parent theme buttons or forms.

---

### 5. Typography Utilities (Light Enhancements)

The app has `.header-title`, `.header-label`, etc. We can create simplified versions for HubSpot hero sections:

```css
/* Add to CraftLX/child.css */

/* Hero/section title enhancements */
.hero-title {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-label {
  font-size: 0.875rem; /* 14px */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  opacity: 0.8;
}

.section-title {
  font-weight: 600;
  line-height: 1.3;
}

.section-subtitle {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
  opacity: 0.9;
}
```

**Use case:** Add `.hero-title` and `.hero-label` to hero section markup in `home-clean.html` or modules for consistent title styling. Does not override parent headings (h1–h6) but provides opt-in classes.

---

## ⚠️ Conditional / Careful Adaptations

These patterns can work but need careful implementation to avoid conflicts:

### 6. Border Radius Standardization

The app uses `--radius: 0.65rem`. We can standardize border-radius **only for new elements we control**:

```css
/* Add to CraftLX/child.css (use sparingly) */

/* Only apply to elements you explicitly add these classes to */
.rounded-standard {
  border-radius: var(--radius, 0.65rem);
}

.rounded-sm {
  border-radius: 0.375rem; /* 6px */
}

.rounded-lg {
  border-radius: 0.9rem; /* ~14px */
}
```

**Why conditional:** Do not apply `--radius` globally to `.button`, `.card`, etc., because the parent theme may already define border-radius. Only use `.rounded-standard` on new custom elements (e.g. custom modules, new CTAs).

---

### 7. Dark Mode Support (Future)

The app has `.dark` class for dark mode. HubSpot themes don't natively support dark mode, but if you want to prep for it:

```css
/* Add to CraftLX/child.css (future-proofing) */

/* Only add if you plan to implement dark mode toggle */
.dark {
  --elevate-1: rgba(255, 255, 255, 0.04);
  --elevate-2: rgba(255, 255, 255, 0.09);
  --on-dark-fg: hsl(0 0% 96%);
  --on-dark-muted: hsl(0 0% 80%);
}

/* Example: invert hero section in dark mode */
.dark .hero-section {
  background-color: hsl(240 10% 10%);
  color: hsl(0 0% 96%);
}
```

**Why conditional:** HubSpot doesn't provide a dark mode switcher by default. Only add if you implement a custom toggle (e.g. via `child.js` and local storage). Otherwise, skip this.

---

## ❌ Cannot Adapt (App-Specific or Conflicts)

These patterns from the app **cannot** be used in the HubSpot theme:

### 8. Theme Switching (`data-theme="rose"`, `data-theme="yellow"`, etc.)

**Why not:** The app has 5 accent themes (Rose, Yellow, Green, Orange, Black) controlled by `data-theme` attribute. HubSpot themes use **theme.json** and theme fields (e.g. `theme.global_colors.primary_color`) for color customization, not `data-theme`. Adding app-style theme tokens would conflict with HubSpot's theme editor.

**Alternative:** Use HubSpot theme fields to define colors (already in `theme-overrides.css`). Do not add `data-theme` logic to `child.css`.

---

### 9. Header Gradient System

**Why not:** The app has `.header-gradient` with multi-layer radial/linear gradients and theme-specific tokens (`--header-base`, `--header-accent`, etc.). The HubSpot site uses solid colors or image backgrounds for hero sections. Adding gradient logic would require:
- Defining gradient tokens (conflicts with HubSpot theme fields)
- Applying `.header-gradient` to sections (may break existing layouts or ScrollMagic animations)

**Alternative:** If you want gradients, add them **per-section** in custom modules or templates, not as a global system. Example:

```css
/* Safe: scoped gradient for a specific hero */
.hero-section.gradient-hero {
  background: linear-gradient(135deg, hsl(346 77% 50%) 0%, hsl(346 77% 35%) 100%);
}
```

---

### 10. CDF Stage Tokens & Block Type Colors

**Why not:** The app has CDF stage tokens (`--cdf-assess-bg`, `--cdf-challenge-bg`, etc.) and block type tokens (`--block-blue-bg`, `--role-foundation`, etc.) for educational content. The HubSpot site is a marketing site (not a learning platform), so these tokens have no use case.

**Alternative:** Skip these entirely unless you add educational content blocks to the site (e.g. a "How it works" section with stages). In that case, define colors inline or in a scoped module CSS.

---

### 11. Component Classes (Card, Popover, Sidebar)

**Why not:** The app has `.card`, `.popover`, `.sidebar` with tokens (`--card`, `--card-foreground`, `--sidebar`, etc.). The HubSpot theme already has:
- Card styles in `main.css` (e.g. `.card`, `.section-base`)
- No popover system (HubSpot uses native tooltips/dropdowns)
- Header/footer for layout (not a sidebar)

**Alternative:** Do not add app-style `.card` or `.sidebar` classes. Use existing HubSpot classes (`.section-base`, `.header`, `.footer`). If you need a card-like module, style it in the module's `module.css` or add a scoped class in `child.css` (e.g. `.custom-card`).

---

### 12. Typography Scale (Font Families)

**Why not:** The app uses Open Sans (body), JetBrains Mono (code), Quattrocento (logo). The HubSpot theme uses theme fields for fonts:
- `theme.global_fonts.primary_font`
- `theme.global_fonts.secondary_font`
- `theme.typography.body_text`

Adding `--font-sans`, `--font-mono`, etc., to `child.css` would conflict with theme fields.

**Alternative:** Use HubSpot theme fields to set fonts (already in `theme-overrides.css`). Do not hardcode font families in `child.css`.

---

## 📋 Recommended Additions to `child.css`

Based on the above, here's what to add to `child.css` now (safe and useful):

```css
/* CraftLX/child.css — Safe app-inspired patterns */

/* --- Design tokens --- */
:root {
  --spacing: 0.25rem;
  --radius: 0.65rem;
  --elevate-1: rgba(0, 0, 0, 0.05);
  --elevate-2: rgba(0, 0, 0, 0.12);
  --on-dark-fg: hsl(0 0% 96%);
  --on-dark-muted: hsl(0 0% 80%);
  --on-dark-border: hsl(0 0% 40%);
}

/* --- Elevation utilities --- */
.hover-elevate {
  transition: box-shadow 200ms ease;
}

.hover-elevate:hover {
  box-shadow: 0 4px 12px var(--elevate-1);
}

.active-elevate:active {
  box-shadow: 0 2px 8px var(--elevate-2);
}

/* --- Scrollbar utilities --- */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: hsl(240 5.9% 80%);
  border-radius: 4px;
}

/* --- Semantic panels --- */
.panel-info {
  background-color: hsl(199 89% 96%);
  border: 1px solid hsl(199 89% 80%);
  color: hsl(199 89% 35%);
  padding: 1rem;
  border-radius: var(--radius);
}

.panel-success {
  background-color: hsl(142 76% 96%);
  border: 1px solid hsl(142 76% 80%);
  color: hsl(142 76% 28%);
  padding: 1rem;
  border-radius: var(--radius);
}

.panel-warn {
  background-color: hsl(38 92% 96%);
  border: 1px solid hsl(38 92% 80%);
  color: hsl(38 92% 32%);
  padding: 1rem;
  border-radius: var(--radius);
}

.panel-danger {
  background-color: hsl(0 84% 96%);
  border: 1px solid hsl(0 84% 80%);
  color: hsl(0 84% 40%);
  padding: 1rem;
  border-radius: var(--radius);
}

/* --- Typography utilities --- */
.hero-title {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  opacity: 0.8;
}

.section-title {
  font-weight: 600;
  line-height: 1.3;
}

.section-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.9;
}
```

---

## 🚫 Do Not Add (Conflicts or No Use Case)

- ❌ `data-theme` logic (Rose, Yellow, Green, etc.) — conflicts with HubSpot theme fields
- ❌ `.header-gradient` — conflicts with existing hero sections and may break ScrollMagic
- ❌ CDF stage/block tokens — no use case for marketing site
- ❌ `.card`, `.sidebar`, `.popover` — conflicts with existing HubSpot classes
- ❌ `--font-sans`, `--font-mono` — conflicts with HubSpot theme font fields

---

## Summary

**What to do:**
1. Add the recommended CSS (design tokens, elevation, scrollbar, panels, typography utilities) to `child.css`.
2. Test on the live site (upload to `theme-challenge-CraftLX` and preview).
3. Use the new classes in modules/templates (e.g. add `.hover-elevate` to CTAs, `.panel-success` to confirmation messages, `.hero-title` to hero sections).

**What not to do:**
- Do not add theme switching or header gradient logic (conflicts with HubSpot theme system).
- Do not override existing parent classes (`.card`, `.button`, `.header`) globally; only add opt-in utilities.
- Do not change `base.html`, `main.css`, or JS (violates REPO_RECON_STRICT guardrails).

---

**Next step:** Add the recommended CSS to `child.css`, upload to HubSpot, and test on a few pages. If it works, document the new utilities in `CraftLX/css/README.md`.
