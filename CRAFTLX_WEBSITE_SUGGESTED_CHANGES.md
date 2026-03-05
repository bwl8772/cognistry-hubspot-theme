# CraftLX Website — Suggested Changes (Based on UI Standards)

**Source:** Playwright MCP review of https://www.craftlx.com (2026-03-05), including full-page scroll (below the hero).  
**Reference:** AWARD_WINNING_UI_STANDARDS.md (CraftLX marketing-site edition)  
**Status:** Suggestions only — no changes made yet.

---

## Full-page overview (sections below the hero)

The live page has these main sections in order:

1. **Hero** — "Where Learning Meets Architecture" + subheading + "Learn More"
2. **We Create Superstars** — "STOP BANGING YOUR HEAD AGAINST THE WALL" + value prop + "Check it out"
3. **The Difference Maker** — three benefit cards (Skyrocketing Lead Gen, Revenue-First Mindset, BETTER Traffic) with carousel (1, 2, 3)
4. **Does this Sound Like You?** — "BE HONEST" + four pain-point cards (accordion/tabs) with placeholder body copy
5. **The Plan** — Step 1: Collect, Step 2: Build, Step 3: Refine + "See More Options"
6. **Testimonials** — two quotes with "Jane Doe" / "John Smith" placeholders
7. **FREE DOWNLOAD (lead magnet)** — "Power Statement About Why Your Offer Is Awesome" + bullet points + "Download"
8. **Lean On The Experts** — CTA block + "Get Started"
9. **Insights / HOW WE THINK** — "Insights, Info, and Ideas" (blog/content area)
10. **Footer** — logo, address (400 W Front St), social icons, Products / Company / Resources nav, copyright

The following suggested changes apply across and within these sections.

---

## 1. Critical / Production

| # | Issue | Where | Suggested change |
|---|--------|--------|-------------------|
| 1 | **CTA and nav links point to preview URL** | Hero "Learn More"; footer "How We Work", "Pricing", "Schedule a Demo", "About Us", "Contact" | Replace `https://preview.hs-sites.com/_hcms/preview/...` with production URLs (e.g. `https://www.craftlx.com/...` or correct landing paths). Check HubSpot link fields in theme/modules. |
| 2 | **Placeholder body copy in published content** | "Does this Sound Like You?" section: "Leo volutpat platea amet in aliquet amet eget convallis integer. Bibendum sed" | Replace with real value propositions and benefit copy. Placeholder text hurts trust and cognitive clarity. |
| 3 | **Placeholder testimonial attribution** | Testimonials: "Jane Doe", "John Smith", "CEO of Company", "Director of Marketing at Company" | Replace with real names, titles, and companies (with permission) or remove until real testimonials are ready. |

---

## 2. Cognitive Clarity & Scannability

| # | Issue | Where | Suggested change |
|---|--------|--------|-------------------|
| 4 | **Section purpose not always obvious at a glance** | Long sections (e.g. "The Difference Maker", "The Plan") with dense text | Ensure each section has a clear heading (H2) and optional short subheading so scanning users get the gist. Confirm heading hierarchy (H1 → H2 → H3) is logical. |
| 5 | **All-caps section labels** | "STOP BANGING YOUR HEAD AGAINST THE WALL", "BE HONEST", "HOW WE THINK" | Per standards: avoid conveying meaning by casing alone. Prefer sentence case or title case and use visual weight (font-size, color) for emphasis. Consider adding small labels or icons if they aid scanning. |
| 6 | **Accordion/tab content** | "Does this Sound Like You?" tabs (#srevtab1–#srevtab4) | Ensure tab labels clearly describe the content; ensure keyboard users can focus and activate tabs; ensure focus is visible (visible focus ring per usability requirements). |

---

## 3. Trust & Credibility

| # | Issue | Where | Suggested change |
|---|--------|--------|-------------------|
| 7 | **Theme-controlled trust signals** | (Ignore the "Built on HubSpot" badge — it is a HubSpot-injected overlay and cannot be changed in the theme.) | Consider adding one or two trust signals in theme content (e.g. "Used by learning teams at X", client/partner mention, or certification) where appropriate. Keep minimal and honest. |
| 8 | **Social links point to same domain** | Footer: Facebook, LinkedIn, Twitter, Instagram all href="https://craftlx.com/" | Point each to the correct social profile URL. Broken or same-domain social links reduce credibility. |

---

## 4. Usability & Accessibility

| # | Issue | Where | Suggested change |
|---|--------|--------|-------------------|
| 9 | **Visible focus states** | All interactive elements (CTAs, nav links, accordion triggers, footer links) | Add visible focus styles in `child.css` (e.g. `:focus-visible` outline or ring). Standard requires "Visible focus states on all interactive elements." |
| 10 | **Touch targets** | CTAs and nav (especially mobile) | Ensure tap targets are ≥ 44px min height/width on touch devices. Check "Learn More", "Check it out", "Time To Do Something About It", "See More Options", "Download", "Get Started", and nav toggles. |
| 11 | **Keyboard navigation** | Header nav, footer nav, accordion, carousels | Verify full keyboard access (Tab, Enter/Space for activation). Menu Section already uses `aria-label="Main menu"` and `aria-role="menu"` — ensure open/close and focus trap for mobile menu are keyboard-friendly. |
| 12 | **Logo alt text** | Snapshot shows `alt="White-2"` on logo image | Use descriptive alt text (e.g. "CraftLX" or "CraftLX – Experience Design for Serious Learning") instead of file name. Set in module or template where logo is defined. |

---

## 5. Consistency & Polish

| # | Issue | Where | Suggested change |
|---|--------|--------|-------------------|
| 13 | **CTA wording** | Multiple CTAs: "Learn More", "Check it out", "Time To Do Something About It", "See More Options", "Download", "Get Started" | Align with standards: primary actions clear and consistent. Consider a small set of standard CTAs (e.g. "Learn more", "Get started", "Download") and use them consistently by context. |
| 14 | **Line-height for body text** | Body and section copy | Ensure line-height ≥ 1.5 for body text in `child.css` for readability (per usability requirements). |
| 15 | **Horizontal overflow** | All sections at 320px, 768px, 1024px | Check that no section causes horizontal scroll at standard viewports; fix in theme CSS or child.css. |

---

## 6. Section-by-section improvements (below the hero)

| Section | Current | Suggested improvement |
|--------|---------|------------------------|
| **We Create Superstars** | All-caps "STOP BANGING YOUR HEAD AGAINST THE WALL"; generic marketing copy | Use sentence or title case for the headline. Align copy with CraftLX (learning/experience design), not generic lead-gen. Ensure "Check it out" links to a real page. |
| **The Difference Maker** | Three benefit cards; carousel dots (1, 2, 3) | Confirm cards are keyboard- and screen-reader friendly. Ensure carousel has visible prev/next and clear focus. Consider numbering or labels so "1, 2, 3" are not the only indicator. |
| **Does this Sound Like You?** | Four pain-point cards; first card highlighted (teal border); others fade in opacity; placeholder "Leo volutpat..." under each | Replace all "Leo volutpat..." with real benefit or pain copy. Revisit fading opacity — per standards, avoid conveying importance by visual weight/opacity alone; ensure all four points are readable and have equal semantic weight or a clear visual hierarchy (e.g. numbered or labeled). |
| **The Plan** | Step 1 / 2 / 3 with icons and short copy; "See More Options" CTA | Confirm step labels are visible (not icon-only). Ensure "See More Options" goes to a real destination. Check that step connectors or order are clear when one step is in focus. |
| **Testimonials** | Placeholder names and companies | Replace with real testimonials (name, title, company) or remove the section until real quotes are available. |
| **FREE DOWNLOAD (lead magnet)** | Headline "Power Statement About Why Your Offer Is Awesome"; generic bullet placeholders; "Download" CTA | Replace headline and bullets with the actual offer (what they get, why it matters). Ensure "Download" is a proper button/link with adequate touch target and goes to form or asset. |
| **Lean On The Experts** | "Get Started" CTA | Ensure CTA links to contact/demo or signup, not preview URL. Style as primary button (min 44px height) with visible focus. |
| **Insights / HOW WE THINK** | "HOW WE THINK" + "Insights, Info, and Ideas" | Use sentence or title case. Ensure blog/pillar links in this section and in footer go to real content or a clear empty state. |
| **Footer** | Address, social icons, Products / Company / Resources columns, copyright | Fix all nav and social URLs (see items 1 and 8). Ensure footer nav is keyboard navigable and has visible focus. Check contrast of copyright line. |

---

## 7. Optional / Enhancement

| # | Issue | Where | Suggested change |
|---|--------|--------|-------------------|
| 16 | **Section semantics for testing/analytics** | Key sections (hero, testimonials, CTA blocks) | Optionally add stable `data-*` attributes (e.g. `data-section="hero"`, `data-block="testimonials"`) in templates for analytics or Playwright audits. Align with any future audit scripts. |
| 17 | **Empty or minimal states** | Any module that can render with no content | If any area can show "no content", ensure it has a clear next action or message (per standard empty-state guidance). |
| 18 | **Scroll/reveal behavior** | Elements using `.theme-scroll-reveal` and ScrollMagic | Confirm scroll-reveal doesn’t obscure critical content or violate motion preferences; consider `prefers-reduced-motion` in child.css or init.js. |

---

## Implementation Notes (This Repo)

- **Styling changes:** Apply in `CraftLX/child.css` only (per REPO_RECON_STRICT.md). Do not remove or move the `require_css(...child.css)` line in `base.html`.
- **Link and copy changes:** Update in HubSpot (page/module content) or in the relevant templates/modules in `CraftLX/templates` and `CraftLX/modules`. Section-by-section copy (hero, We Create Superstars, The Plan, lead magnet, etc.) is typically in HubSpot page or module fields.
- **Logo alt / markup:** Update in `header-module.html` or the logo module configuration.
- **Focus and touch targets:** Prefer `child.css` for focus styles and min dimensions; avoid changing base layout or parent theme assets.

---

**Next step:** Prioritize items 1–3 (production correctness), then 9–12 (accessibility). Use the full-page overview and §6 section-by-section table to improve each block below the hero (copy, CTAs, focus, and links).
