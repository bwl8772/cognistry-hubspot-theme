document.addEventListener("DOMContentLoaded", () => {
  const desktopParentItems = document.querySelectorAll(".menu--desktop .menu__item--has-submenu");
  const mobileChildToggles = document.querySelectorAll(".menu--mobile .menu__child-toggle");

  desktopParentItems.forEach((item) => {
    const link = item.querySelector("a");
    const button = item.querySelector(".menu__child-toggle");

    item.addEventListener("mouseover", () => {
      item.classList.add("menu__item--open");
      if (link) link.setAttribute("aria-expanded", "true");
      if (button) button.setAttribute("aria-expanded", "true");
    });

    item.addEventListener("mouseout", () => {
      item.classList.remove("menu__item--open");
      if (link) link.setAttribute("aria-expanded", "false");
      if (button) button.setAttribute("aria-expanded", "false");
    });

    if (button) {
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("menu__item--open");
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