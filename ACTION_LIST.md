# CraftLX theme — Action list

**Assumption:** HubL and HubSpot extensions are installed in Cursor.  
**Theme root:** `CraftLX/` (child of `@marketplace/Web_Canopy_Studio/theme-challenge`).  
**Account (from config):** `craft-lx`.

Use this as the order of operations and ongoing workflow.

---

## One-time setup

- [ ] **1. Enable HubL in Cursor**  
  - Open **Settings** (Cmd+,) → search **files.associations**.  
  - Add: `*.html` → `html-hubl`, `*.css` → `css-hubl`.  
  - So HubL syntax/autocomplete works in templates and `theme-overrides.css`.

- [ ] **2. Link HubSpot account (if not already)**  
  - In HubSpot extension sidebar: **Authenticate HubSpot Account**.  
  - Or ensure CLI uses this project: `hubspot.config.yml` + `.env.local` (account `craft-lx`).  
  - Confirm the correct account is selected (starred = default).

- [x] **3. Confirm theme path in HubSpot**  
  - In Design Manager, note the full path to the CraftLX child theme (e.g. `craft-lx-theme` or the path you use when uploading).  
  - You’ll need this for `watch` and `upload` (as `<dest>`).

- [ ] **4. (Optional) Emmet for HubL HTML**  
  - Settings → **Emmet: Include Languages** → add `html-hubl` : `html`.  
  - Gives HTML abbreviation expansion in `.html` theme files.

---

## Daily workflow: edit locally, sync to HubSpot

- [ ] **5. Start watch so saves push to HubSpot**  
  - From **repo root**:  
    `hs cms watch --account=craft-lx CraftLX theme-challenge-CraftLX`  
  - Or use HubSpot extension: … menu on **Remote File System** → **Watch** → select `CraftLX` and enter `theme-challenge-CraftLX`.  
  - Leave watch running while you edit; changes upload on save.

- [ ] **6. Prefer `child.css` for look & feel**  
  - Put **global CSS overrides** in `CraftLX/child.css`.  
  - It’s loaded last in `base.html`, so it overrides parent/theme styles.  
  - Use class names from the recon report (e.g. `.header`, `.hero-section`, `.section-base`, `.theme-scroll-reveal`) to target elements.  
  - Avoid changing or removing classes that JS relies on (e.g. `.header`, `#nav-toggle`, `.theme-scroll-reveal`).

- [ ] **7. Optional: `child.js` for custom behavior**  
  - Add small scripts in `CraftLX/child.js` if needed; it’s already included in `base.html`.  
  - Don’t break existing behavior in `init.js` / `main.js` (sticky header, nav toggles).

- [ ] **8. Preview changes**  
  - **In HubSpot:** Open a draft page using the child theme and refresh after saves (when watch is running).  
  - **Local preview (no upload):** From repo root, run  
    `hs cms theme preview CraftLX <dest>`  
    and open https://hslocal.net:3000/ (may require sudo for SSL once).

---

## When changing more than CSS/JS

- [ ] **9. Theme settings (labels, preview image)**  
  - Edit `CraftLX/theme.json` only for: `label`, `preview_path`, `screenshot_path`, `responsive_breakpoints`, `is_available_for_new_content`.  
  - Do **not** remove or change `extends`.

- [ ] **10. New or changed templates**  
  - Add or edit templates under `CraftLX/templates/`; keep `{% extends './layouts/base.html' %}` and the same block structure.  
  - If cloning from parent, use Design Manager “Clone to child theme” or create the same path under `CraftLX/` and upload.

- [ ] **11. Module-specific styling**  
  - Prefer targeting module classes from `child.css` (e.g. `.accordion_box`, `.hero-section`).  
  - If a module has a “custom class” field, use that in `child.css` for scoped overrides.  
  - Clone a module to the child only if you must change its HTML or `fields.json`; use a **unique name** so the original can still receive parent updates.

---

## Don’t do

- [ ] **12. Never remove or change `extends` in `theme.json`**  
  - Breaks child theme inheritance and future parent updates.

- [ ] **13. Don’t remove `standard_header_includes` or `standard_footer_includes`** from `base.html`.

- [ ] **14. Avoid cloning parent CSS/JS or whole folders into the child**  
  - Prefer overrides in `child.css` / `child.js` so parent updates don’t get out of sync.

- [ ] **15. Test on staged/draft pages first**  
  - Don’t rely on production for experiments; use unpublished pages or local theme preview.

---

## Quick reference

| Goal              | Where / command |
|-------------------|-----------------|
| Global CSS        | `CraftLX/child.css` |
| Global JS         | `CraftLX/child.js` |
| Theme metadata    | `CraftLX/theme.json` (safe: label, preview_path, screenshot_path, breakpoints) |
| Watch (sync)      | `hs cms watch --account=craft-lx CraftLX theme-challenge-CraftLX` or extension Watch |
| Local preview     | `hs cms theme preview CraftLX theme-challenge-CraftLX` → https://hslocal.net:3000/ |
| Upload once       | `hs cms upload --account=craft-lx CraftLX theme-challenge-CraftLX` |

**Details and evidence:** see `REPO_RECON_REPORT.md`.
