document.addEventListener('DOMContentLoaded', function() {
  const tocNav = document.querySelector('.toc');
  if (!tocNav) return;

  const contentSelector = tocNav.dataset.contentSelector || '.blog-post__body';
  const headingLevels = tocNav.dataset.headingLevels || 'h2, h3';
  const tocList = document.getElementById('toc-list');
  const content = document.querySelector(contentSelector);

  if (!content || !tocList) return;

  const headings = content.querySelectorAll(headingLevels);

  if (headings.length === 0) {
    tocNav.classList.add('toc--empty');
    return;
  }

  tocList.innerHTML = '';

  headings.forEach(function(heading, index) {
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }

    const li = document.createElement('li');
    li.className = 'toc__item toc__item--' + heading.tagName.toLowerCase();

    const link = document.createElement('a');
    link.className = 'toc__link';
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;

    li.appendChild(link);
    tocList.appendChild(li);
  });

  /* Active state tracking */
  const tocLinks = tocList.querySelectorAll('.toc__link');
  let lastActive = null;

  function setActiveLink() {
    let currentActive = null;
    const scrollTop = window.scrollY + 150;

    headings.forEach(function(heading, index) {
      if (heading.offsetTop <= scrollTop) {
        currentActive = tocLinks[index];
      }
    });

    if (currentActive !== lastActive) {
      if (lastActive) {
        lastActive.classList.remove('toc__link--active');
      }
      if (currentActive) {
        currentActive.classList.add('toc__link--active');
      }
      lastActive = currentActive;
    }
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* Smooth scroll */
  tocLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = parseInt(tocNav.style.getPropertyValue('--toc-offset')) || 100;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});
