# CraftLX Child Theme — Design System Usage Guide

**Date:** 2026-03-05  
**Status:** Active  
**CSS File:** `CraftLX/child.css`

## What Was Added

Safe patterns from the CraftLX app design system were added to `child.css`. These are **opt-in utility classes** — they don't change existing styles, only provide new classes you can use in templates and modules.

---

## Available Utilities

### 1. Design Tokens (CSS Variables)

```css
--spacing: 0.25rem;        /* 4px base unit */
--radius: 0.65rem;         /* 10.4px border radius */
--elevate-1: rgba(0, 0, 0, 0.05);  /* Subtle shadow */
--elevate-2: rgba(0, 0, 0, 0.12);  /* Stronger shadow */
--on-dark-fg: hsl(0 0% 96%);       /* Text on dark backgrounds */
--on-dark-muted: hsl(0 0% 80%);    /* Muted text on dark */
--on-dark-border: hsl(0 0% 40%);   /* Borders on dark */
```

**Usage:**
```css
.my-custom-element {
  padding: calc(var(--spacing) * 4); /* 16px */
  border-radius: var(--radius);
}
```

---

### 2. Elevation Utilities

Add subtle depth to interactive elements:

```html
<!-- Hover elevation -->
<a href="#" class="button hover-elevate">Hover me</a>

<!-- Active elevation (press state) -->
<button class="cta_button active-elevate">Press me</button>

<!-- Toggle elevation (e.g. active tab) -->
<div class="toggle-elevate toggle-elevated">Active tab</div>
```

**Effect:** Adds a subtle box-shadow on hover/active/toggle for depth without changing layout.

---

### 3. Scrollbar Utilities

Refine scrollbar appearance:

```html
<!-- Hide scrollbar (content still scrollable) -->
<div class="scrollbar-none" style="overflow: auto; max-height: 400px;">
  Long content...
</div>

<!-- Thin, styled scrollbar -->
<div class="scrollbar-thin" style="overflow: auto; max-height: 400px;">
  Long content...
</div>
```

**Use case:** Use `.scrollbar-thin` on long content blocks, carousels, or sidebar nav where default scrollbars feel too heavy.

---

### 4. Semantic Panels

Color-coded message boxes:

```html
<!-- Info panel (blue) -->
<div class="panel-info">
  💡 This is an informational message.
</div>

<!-- Success panel (green) -->
<div class="panel-success">
  ✅ Your form was submitted successfully!
</div>

<!-- Warning panel (amber) -->
<div class="panel-warn">
  ⚠️ Please review your information before continuing.
</div>

<!-- Danger panel (red) -->
<div class="panel-danger">
  ❌ An error occurred. Please try again.
</div>
```

**Use case:** Add to confirmation messages, alert boxes, or form validation feedback in modules or templates.

---

### 5. Typography Utilities

Enhance hero sections and headings:

```html
<!-- Hero section -->
<div class="hero-section">
  <p class="hero-label">Welcome to CraftLX</p>
  <h1 class="hero-title">Where Learning Meets Architecture</h1>
</div>

<!-- Section headers -->
<section>
  <h2 class="section-title">The Difference Maker</h2>
  <p class="section-subtitle">Design workforce training built for measurable skill impact</p>
</section>
```

**Effect:**
- `.hero-title`: Bold, tight line-height, negative letter-spacing
- `.hero-label`: Small caps, spaced, slightly faded
- `.section-title`: Semibold, readable line-height
- `.section-subtitle`: Slightly larger, relaxed line-height

---

### 6. Border Radius Utilities

Standardize rounded corners:

```html
<!-- Standard radius (10.4px) -->
<div class="rounded-standard">...</div>

<!-- Small radius (6px) -->
<div class="rounded-sm">...</div>

<!-- Large radius (14px) -->
<div class="rounded-lg">...</div>
```

**Use case:** Add to custom cards, CTAs, or image containers for consistent rounded corners.

---

## How to Use in Templates

### Example 1: Hero Section with Typography Utilities

Edit `CraftLX/templates/home-clean.html` (or a hero module):

```html
<section class="hero-section">
  <div class="hero-content">
    <p class="hero-label">Experience Design</p>
    <h1 class="hero-title">Where Learning Meets Architecture</h1>
    <p class="section-subtitle">Design workforce training built for measurable skill impact</p>
    <a href="/contact" class="button hover-elevate">Get Started</a>
  </div>
</section>
```

---

### Example 2: Success Message with Panel

In a form confirmation module or template:

```html
<div class="panel-success">
  <strong>Thank you!</strong> Your message has been sent. We'll get back to you within 24 hours.
</div>
```

---

### Example 3: CTA with Hover Elevation

In any module or template with a CTA:

```html
<a href="/demo" class="cta_button hover-elevate rounded-standard">
  Schedule a Demo
</a>
```

---

## Testing

1. **Upload to HubSpot:**
   ```bash
   hs cms upload --account=craft-lx CraftLX/child.css theme-challenge-CraftLX/child.css
   ```

2. **Preview:** Visit the [HubSpot theme previewer](https://app.hubspot.com/theme-previewer/245311528/edit/CraftLX)

3. **Add classes to templates/modules** and check the live site at www.craftlx.com

---

## What NOT to Do

❌ **Don't apply these globally to existing elements:**
```html
<!-- BAD: changes all buttons everywhere -->
<style>
  button { border-radius: var(--radius); }
</style>
```

✅ **Do use them as opt-in classes:**
```html
<!-- GOOD: only affects this button -->
<button class="rounded-standard hover-elevate">Click me</button>
```

❌ **Don't override parent theme classes** (e.g. `.header`, `.footer`, `.card`) with these utilities — only use on new custom elements.

---

## Guardrails (From REPO_RECON_STRICT.md)

- ✅ **child.css is safe** — It's loaded last in base.html, so these rules won't break parent theme
- ✅ **Opt-in classes only** — No global resets or overrides; classes only apply when you add them
- ✅ **No JS changes** — These are pure CSS utilities; no conflicts with init.js or main.js
- ✅ **No layout changes** — CSS variables and utilities don't affect existing layout or structure

**If something breaks:** Remove the class from the template/module, or comment out the utility in `child.css` and re-upload.

---

## Next Steps

1. **Start small:** Add `.hover-elevate` to one CTA and test.
2. **Hero sections:** Use `.hero-title` and `.hero-label` in hero modules.
3. **Confirmation messages:** Add `.panel-success` to form success states.
4. **Iterate:** If a utility doesn't work as expected, adjust in `child.css` and re-upload.

---

**References:**
- `HUBSPOT_DESIGN_INSPIRATION.md` — Full analysis of what can/can't be adapted from app
- `REPO_RECON_STRICT.md` — Theme contract and must-not-change rules
- `AWARD_WINNING_UI_STANDARDS.md` — UI quality standards for the site
