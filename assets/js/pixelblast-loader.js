/**
 * Deferred PixelBlast Loader
 * Loads Three.js (~600KB) and PixelBlast only after the page is interactive,
 * preventing it from blocking initial page render.
 */
(function() {
  function loadPixelBlast() {
    // Dynamically inject import map for Three.js
    var map = document.createElement('script');
    map.type = 'importmap';
    map.textContent = JSON.stringify({
      imports: {
        "three": "https://esm.sh/three@0.160.0",
        "postprocessing": "https://esm.sh/postprocessing@6.34.1?deps=three@0.160.0"
      }
    });
    document.head.appendChild(map);

    // Dynamically inject the PixelBlast module
    var mod = document.createElement('script');
    mod.type = 'module';
    mod.textContent = [
      "import { PixelBlast } from './assets/js/pixelblast.js';",
      "try {",
      "  new PixelBlast(document.getElementById('pixel-blast-bg'), {",
      "    color: '#c9a84c',",
      "    enableRipples: false,",
      "    liquid: false",
      "  });",
      "} catch(e) {}"
    ].join('\n');
    document.body.appendChild(mod);
  }

  // Load after page is fully rendered and idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadPixelBlast, { timeout: 3000 });
  } else {
    setTimeout(loadPixelBlast, 2000);
  }
})();
