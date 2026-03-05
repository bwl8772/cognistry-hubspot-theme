CSS
===

## What we're doing

**CraftLX** is the HubSpot CMS child theme for **www.craftlx.com**. We're improving look and feel (and accessibility) without breaking the parent theme or the HubSpot editor.

- **Child theme:** This theme extends `@marketplace/Web_Canopy_Studio/theme-challenge`. We do not edit parent assets; we override only in the child.
- **Global overrides:** Put **global** style overrides in **`CraftLX/child.css`** (at the theme root). That file is loaded last in `base.html`, so it wins over `main.css` and `theme-overrides.css`. See `REPO_RECON_STRICT.md` and `AWARD_WINNING_UI_STANDARDS.md` in the repo root.
- **This folder:** Contains the main theme CSS (ITCSS-style partials) and `theme-overrides.css` (HubL + theme variables). Edit these when changing shared components (header, footer, buttons, forms, etc.). For quick, global tweaks (e.g. body line-height, focus rings, button min-height), prefer **`child.css`** so overrides stay in one place and survive parent updates.
- **Standards:** We follow the CraftLX UI standards (cognitive clarity, trust, usability, accessibility). Suggested changes and section-by-section notes are in `CRAFTLX_WEBSITE_SUGGESTED_CHANGES.md`.

---

The CSS for the boilerplate is written using HubL+CSS. To organize the code, partials are used to group HubL+CSS based on purpose. The different CSS partials are categorized into folders based on the their type based on the [ITCSS methodology](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528).

Our current CSS folder structure is:

```
/css
  /components
    _footer.css
    _header.css
  /elements
    _forms.css
    _tables.css
    _typography.css
  /generic
    _normalize.css
    _reset.css
  /objects
    _containers-dnd.css
    _layout.css
  /templates
    _blog.css
    _system.css
  main.css
  theme-overrides.css
```

## HubSpot CLI sync

This CSS folder lives in the CraftLX child theme. In Design Manager the theme path is **theme-challenge-CraftLX**.

From the repo root, sync the whole theme (including this folder) to HubSpot:

```bash
# Upload once
hs cms upload --account=craft-lx CraftLX "theme-challenge-CraftLX"

# Watch for changes (uploads on save)
hs cms watch --account=craft-lx CraftLX "theme-challenge-CraftLX"
```

To upload only this file to HubSpot:

```bash
hs cms upload --account=craft-lx CraftLX/css/README.md "theme-challenge-CraftLX/css/README.md"
```