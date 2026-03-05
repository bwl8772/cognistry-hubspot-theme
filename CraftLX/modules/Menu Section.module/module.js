(function() {
  // Variables
  var link = 0;
  var item = 0;
  var menuLinks = document.querySelectorAll('.submenu > li .menu-link');
  var firstSubmenuItems = document.querySelectorAll(
    '.submenu.level-2 > *:nth-child(2)'
  );

  // Functions
  for (link; link < menuLinks.length; link++) {
    menuLinks[link].addEventListener('focus', function() {
      this.parentElement.classList.add('focus');
    });

    if (menuLinks[link].nextElementSibling) {
      var subLinks = document.querySelectorAll('.level-2 li > .menu-link');
      var lastLinkIndex = subLinks.length - 1;
      var lastLink = subLinks[lastLinkIndex];
      lastLink.addEventListener('blur', function() {
        this.parentElement.classList.remove('focus');
      });
    }
  }

  for (item; item < firstSubmenuItems.length; item++) {
    if (window.hsInEditor) {
      return;
    } else if (firstSubmenuItems[item]) {
      firstSubmenuItems[item].addEventListener('mouseover', function() {
        this.previousElementSibling.classList.add('hover');
      });

      firstSubmenuItems[item].addEventListener('mouseout', function() {
        this.previousElementSibling.classList.remove('hover');
      });
    }
  }
})();