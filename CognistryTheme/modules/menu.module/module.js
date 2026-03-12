document.addEventListener("DOMContentLoaded", () => {
  const desktopParentItems = document.querySelectorAll(".menu--desktop .menu__item--has-submenu");
  const mobileChildToggles = document.querySelectorAll(".menu--mobile .menu__child-toggle");

  desktopParentItems.forEach((item) => {
    const link = item.querySelector("a");
    const button = item.querySelector(".menu__child-toggle");
    let closeTimer;

    const openMenu = () => {
      window.clearTimeout(closeTimer);
      item.classList.add("menu__item--open");
      if (link) link.setAttribute("aria-expanded", "true");
      if (button) button.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      item.classList.remove("menu__item--open");
      if (link) link.setAttribute("aria-expanded", "false");
      if (button) button.setAttribute("aria-expanded", "false");
    };

    item.addEventListener("mouseenter", openMenu);
    item.addEventListener("mouseleave", () => {
      closeTimer = window.setTimeout(closeMenu, 120);
    });

    item.addEventListener("focusin", openMenu);
    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) {
        closeMenu();
      }
    });

    if (button) {
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("menu__item--open");
        window.clearTimeout(closeTimer);
        item.classList.toggle("menu__item--open", !isOpen);
        if (link) link.setAttribute("aria-expanded", String(!isOpen));
        button.setAttribute("aria-expanded", String(!isOpen));
      });
    }
  });

  mobileChildToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const parent = toggle.parentNode;
      const link = parent.querySelector("a");
      const isOpen = parent.classList.contains("menu__item--open");

      toggle.classList.toggle("menu__child-toggle--open", !isOpen);
      parent.classList.toggle("menu__item--open", !isOpen);

      if (link) link.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });
});