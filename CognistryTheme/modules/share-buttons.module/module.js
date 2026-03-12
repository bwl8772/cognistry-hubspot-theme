/* Share Buttons - Copy Link Functionality */
document.addEventListener('DOMContentLoaded', function() {
  const copyButtons = document.querySelectorAll('[data-copy-url]');
  
  copyButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const url = this.dataset.copyUrl;
      const textSpan = this.querySelector('.share-buttons__copy-text');
      const originalText = textSpan.textContent;
      
      navigator.clipboard.writeText(url).then(function() {
        button.classList.add('share-buttons__button--copied');
        textSpan.textContent = 'Copied!';
        
        setTimeout(function() {
          button.classList.remove('share-buttons__button--copied');
          textSpan.textContent = originalText;
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        textSpan.textContent = 'Failed';
        
        setTimeout(function() {
          textSpan.textContent = originalText;
        }, 2000);
      });
    });
  });
});
