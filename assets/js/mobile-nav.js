
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
      });
    });
  }

  /* Project Card Click-to-Reveal Logic */
  const projCards = document.querySelectorAll('.proj-card');
  projCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.proj-close-btn')) {
        card.classList.remove('is-revealed');
        e.stopPropagation();
        return;
      }
      if (e.target.closest('.proj-card-link')) {
        return;
      }
      if (card.classList.contains('is-revealed') && e.target.closest('.proj-card-body')) {
        return; // Don't close if clicking inside details text area
      }
      card.classList.toggle('is-revealed');
    });
  });
});
