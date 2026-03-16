/**
 * Menu Module - Responsive navigation with hover (desktop) and click (mobile) behavior
 */
(function() {
  "use strict";

  const MOBILE_BREAKPOINT = 768;
  const HOVER_CLOSE_DELAY = 150;

  function initMenu() {
    const menuItems = document.querySelectorAll(".menu__item--has-submenu");

    menuItems.forEach((item) => {
      const toggle = item.querySelector(":scope > .menu__toggle");
      if (!toggle) return;

      let closeTimer = null;

      const openSubmenu = () => {
        clearTimeout(closeTimer);
        item.classList.add("menu__item--open");
        toggle.setAttribute("aria-expanded", "true");
      };

      const closeSubmenu = () => {
        item.classList.remove("menu__item--open");
        toggle.setAttribute("aria-expanded", "false");
      };

      const closeWithDelay = () => {
        closeTimer = setTimeout(closeSubmenu, HOVER_CLOSE_DELAY);
      };

      const isDesktop = () => window.innerWidth >= MOBILE_BREAKPOINT;

      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = item.classList.contains("menu__item--open");
        if (isOpen) {
          closeSubmenu();
        } else {
          openSubmenu();
        }
      });

      item.addEventListener("mouseenter", () => {
        if (isDesktop()) {
          openSubmenu();
        }
      });

      item.addEventListener("mouseleave", () => {
        if (isDesktop()) {
          closeWithDelay();
        }
      });

      item.addEventListener("focusin", () => {
        if (isDesktop()) {
          openSubmenu();
        }
      });

      item.addEventListener("focusout", (e) => {
        if (isDesktop() && !item.contains(e.relatedTarget)) {
          closeSubmenu();
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu")) {
        document.querySelectorAll(".menu__item--open").forEach((item) => {
          item.classList.remove("menu__item--open");
          const toggle = item.querySelector(":scope > .menu__toggle");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
          }
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".menu__item--open").forEach((item) => {
          item.classList.remove("menu__item--open");
          const toggle = item.querySelector(":scope > .menu__toggle");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
          }
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
  } else {
    initMenu();
  }
})();
