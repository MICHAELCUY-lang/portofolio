document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.dock-item');
  const baseSize = 50;
  const magnification = 80;
  const maxDistance = 200;

  // Track mouse X position globally
  let mouseX = Infinity;
  let isHovered = false;

  const panel = document.querySelector('.dock-panel');
  if (!panel) return;

  panel.addEventListener('mousemove', (e) => {
    isHovered = true;
    mouseX = e.pageX;
  });

  panel.addEventListener('mouseleave', () => {
    isHovered = false;
    mouseX = Infinity;
  });

  // Keep track of current sizes for each item to interpolate
  const currentSizes = Array.from(items).map(() => baseSize);

  function animate() {
    if (window.innerWidth > 768) {
      items.forEach((item, index) => {
        let targetSize = baseSize;

        if (isHovered) {
          const rect = item.getBoundingClientRect();
          // Calculate center of the item
          const itemCenter = rect.left + rect.width / 2;
          // Distance from mouse to center of the item
          const distance = Math.abs(mouseX - itemCenter);
          
          if (distance < maxDistance) {
            // Normalize distance between 0 and 1
            const scale = 1 - (distance / maxDistance);
            // Easing function for smoother bell curve
            const easeScale = Math.pow(Math.cos(distance / maxDistance * (Math.PI / 2)), 2);
            targetSize = baseSize + (magnification - baseSize) * easeScale;
          }
        }

        // Lerp (Linear Interpolation) for buttery smoothness
        // 0.2 is the lerp factor. Lower = slower/smoother, Higher = faster/snappier
        currentSizes[index] += (targetSize - currentSizes[index]) * 0.2;
        
        item.style.setProperty('--size', `${currentSizes[index]}px`);
      });
    } else {
      // Mobile reset
      items.forEach(item => {
        item.style.removeProperty('--size');
      });
    }

    requestAnimationFrame(animate);
  }

  // Start the animation loop
  animate();
});
