
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
      window.location.href = 'portfolio.html';
    });
  });

  // Initialize Lenis Smooth Scroll if available
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      autoRaf: true, // Let Lenis try to handle it automatically
    });
    
    // Explicitly add our own RAF loop just in case autoRaf fails on this specific version
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
});
