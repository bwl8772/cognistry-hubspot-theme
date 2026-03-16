/**
 * Main JavaScript - Header mobile toggle and utilities
 */
(function() {
  "use strict";

  function initMobileNav() {
    var nav = document.querySelector(".header__navigation");
    var navToggle = document.querySelector(".header__navigation--toggle");
    var closeToggle = document.querySelector(".header__close--toggle");

    if (!nav || !navToggle) return;

    function openNav() {
      nav.classList.add("open");
      navToggle.classList.add("hide");
      navToggle.setAttribute("aria-expanded", "true");
      if (closeToggle) {
        closeToggle.classList.add("show");
      }
    }

    function closeNav() {
      nav.classList.remove("open");
      navToggle.classList.remove("hide");
      navToggle.setAttribute("aria-expanded", "false");
      if (closeToggle) {
        closeToggle.classList.remove("show");
      }
    }

    navToggle.addEventListener("click", function() {
      var isOpen = nav.classList.contains("open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (closeToggle) {
      closeToggle.addEventListener("click", closeNav);
    }

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeNav();
      }
    });

    window.addEventListener("resize", function() {
      if (window.innerWidth >= 768 && nav.classList.contains("open")) {
        closeNav();
      }
    });
  }

  function initEmailPrefs() {
    var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');
    if (!emailGlobalUnsub) return;

    function toggleDisabled() {
      var emailSubItems = document.querySelectorAll("#email-prefs-form .item");
      emailSubItems.forEach(function(item) {
        var input = item.querySelector("input");
        if (emailGlobalUnsub.checked) {
          item.classList.add("disabled");
          input.setAttribute("disabled", "disabled");
          input.checked = false;
        } else {
          item.classList.remove("disabled");
          input.removeAttribute("disabled");
        }
      });
    }

    emailGlobalUnsub.addEventListener("change", toggleDisabled);
  }

  function init() {
    initMobileNav();
    initEmailPrefs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
