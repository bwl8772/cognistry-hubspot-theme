# CraftLX Award-Winning UI Standards — Marketing Website Edition

**Purpose:** Define UI/UX standards for the CraftLX marketing website (www.craftlx.com). This site is built with the HubSpot CMS child theme in this repo. The quality bar is professional, accessible, and trustworthy — suitable for a business audience evaluating experience design for serious learning.

**Scope:** This document applies to the **CraftLX HubSpot theme** in this repository only. It is tailored for marketing pages (hero, sections, CTAs, nav, footer), not for app UIs (e.g. Digico Forge/Sim).

**Last Updated:** 2026-03-05  
**Status:** Active Standard  
**Repo:** craftlx-hubspot-template (theme root: `CraftLX/`)

---

## Where to Implement (This Repo)

Follow the contract and surface area defined in `REPO_RECON_STRICT.md`:

| Change type | Where to implement |
|-------------|---------------------|
| **Global style overrides** | `CraftLX/child.css` only. Do not remove or move the `require_css(get_public_template_url("../../child.css"))` line in `CraftLX/templates/layouts/base.html`. |
| **Layout / structure** | `CraftLX/templates/` (layouts, partials) and `CraftLX/modules/`. Do not edit parent theme assets. |
| **Theme metadata** | `CraftLX/theme.json`. Do not remove or change `"extends"`. |
| **New or changed modules** | `CraftLX/modules/`. Use existing module patterns (module.html, module.css, fields.json). |

---

## Vision

The CraftLX marketing site serves professionals under cognitive load. Award-winning quality for this audience means:

1. **Cognitive efficiency:** Section purpose and primary CTAs are clear at a glance — no guessing what a block is for.
2. **Trust at a glance:** Real copy, real testimonials (or none), and correct links. No placeholder text or broken URLs in production.
3. **Calm power:** Dense value propositions where needed, but clear hierarchy and breathing room. No all-caps or color-alone emphasis for critical meaning.
4. **Accessibility:** Keyboard navigation, visible focus, and touch-friendly targets so everyone can use the site.

---

## Quality Dimensions (Marketing Site)

### 1. Cognitive Clarity

**What we measure:** Can a visitor quickly understand what each section is for and what to do next?

**Requirements:**

- [ ] Every major section has a clear heading (and optional short subheading). Heading hierarchy (H1 → H2 → H3) is logical.
- [ ] Primary CTAs are labeled clearly (e.g. "Learn more", "Get started", "Download") and used consistently by context.
- [ ] No placeholder or Lorem-style body copy in production.
- [ ] Meaning is not conveyed by ALL CAPS or color alone — use sentence/title case and support with typography or icons where needed.

### 2. Trust & Credibility

**What we measure:** Does the site feel honest and professional?

**Requirements:**

- [ ] No broken or placeholder links (e.g. preview URLs or "craftlx.com" for social links). CTAs and nav point to correct production or landing URLs.
- [ ] Testimonials use real attributions (name, title, company) or are removed until real ones exist.
- [ ] At least one theme-controlled trust signal where appropriate (e.g. client/partner mention or certification). The "Built on HubSpot" badge is a platform overlay — not part of the theme; ignore it for this checklist. Keep minimal and accurate.

### 3. Usability & Accessibility

**What we measure:** Can all users navigate and act without barriers?

**Requirements:**

- [ ] All interactive elements (links, buttons, nav toggles, accordions, carousel controls) are keyboard accessible (Tab, Enter/Space).
- [ ] Visible focus states on all interactive elements (e.g. `:focus-visible` in `child.css`).
- [ ] Touch targets ≥ 44px (min height/width) on touch devices for primary CTAs and nav.
- [ ] Line-height ≥ 1.5 for body text.
- [ ] No horizontal overflow at common viewports (e.g. 320px, 768px, 1024px).
- [ ] Images (including logo) have descriptive `alt` text, not file names.

### 4. Visual Consistency

**What we measure:** Does the site feel cohesive and intentional?

**Requirements:**

- [ ] CTA set is consistent (e.g. a small set of standard actions used by context).
- [ ] Spacing and typography are consistent across sections; overrides live in `child.css` and do not break layout or parent behavior.

---

## Implementation Guidelines

### Information density

- **Hero:** One clear message and one primary CTA. Low density.
- **Sections:** Headline + short value prop; detail in body. Use progressive disclosure (e.g. accordions, tabs) when content is long.
- **Footer:** Scannable groups (e.g. Products, Company, Resources); links and social icons clearly tappable.

### CTAs and buttons

- Primary CTAs: clearly labeled, sufficient size and contrast.
- In `child.css`, you can add focus styles and min dimensions (e.g. `min-height: 44px`) for key buttons without changing base layout or parent JS.

### Trust signals

- Prefer one or two clear, theme-controlled signals (e.g. client logo, partner/certification) over clutter. The "Built on HubSpot" badge is a HubSpot-injected overlay and cannot be changed in the theme — ignore it for design/audit.
- Do not imply credentials or results that cannot be substantiated.

### Motion and reduced motion

- Scroll-reveal and animations (e.g. ScrollMagic, `.theme-scroll-reveal`) should not block critical content.
- Consider `prefers-reduced-motion` for non-essential motion (e.g. in `child.css` or theme JS) where feasible.

---

## What This Standard Does Not Cover

The following are **out of scope** for this marketing-site standard (they belong to app/product UI standards):

- Pipeline gates, CDF stages, or workflow steps
- LEXI or AI provenance labels
- Realm identity (Signal / Forge / Sim)
- Bulk operations, inline editing, or app-style workflows
- Data-heavy tables and pipeline visualizations

---

## Quality Checklist for Release

**Before publishing or re-publishing the site:**

- [ ] No preview or placeholder URLs in CTAs or main nav.
- [ ] No Lorem or placeholder body copy or testimonial text.
- [ ] Social links point to correct profiles.
- [ ] Visible focus states on interactive elements.
- [ ] Logo and key images have descriptive `alt` text.
- [ ] No horizontal overflow at 320px and 768px.

**Optional but recommended:**

- [ ] Line-height and touch targets meet requirements above.
- [ ] Section headings and CTA labels reviewed for clarity and consistency.
- [ ] One clear theme-controlled trust signal present (e.g. client/partner mention). Note: "Built on HubSpot" is a platform overlay — not editable in the theme.

---

## Suggested Changes and Audits

- **Suggested changes** from a live review of www.craftlx.com are in `CRAFTLX_WEBSITE_SUGGESTED_CHANGES.md`. Use that list to prioritize fixes and enhancements.
- **Theme contract and must-not-change** rules are in `REPO_RECON_STRICT.md`. Do not violate the override contract (child.css loading, extends, standard_header_includes/footer_includes) or high-risk script/layout behavior when applying these standards.

---

## Resources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [HubSpot CMS theme docs](https://developers.hubspot.com/docs/cms/building-blocks/themes)
- Repo: `REPO_RECON_STRICT.md`, `ACTION_LIST.md`, `CRAFTLX_WEBSITE_SUGGESTED_CHANGES.md`

---

**Last Updated:** 2026-03-05  
**Next Review:** After implementing high-priority items from `CRAFTLX_WEBSITE_SUGGESTED_CHANGES.md`
