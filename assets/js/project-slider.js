/* ── PROJECT SLIDER LOGIC ── */
const projectImages = {
  p2: [
    'assets/images/projects/president-cupid/cover.png',
    'assets/images/projects/president-cupid/cupid1.png',
    'assets/images/projects/president-cupid/cupid2.png',
    'assets/images/projects/president-cupid/cupid3.png'
  ],
  p4: [
    'assets/images/projects/cybersecuritymanagement/Screenshot 2026-02-26 220236.png',
    'assets/images/projects/cybersecuritymanagement/Screenshot 2026-02-26 220248.png',
    'assets/images/projects/cybersecuritymanagement/Screenshot 2026-02-26 220302.png',
    'assets/images/projects/cybersecuritymanagement/Screenshot 2026-02-26 220313.png',
    'assets/images/projects/cybersecuritymanagement/Screenshot 2026-02-26 220332.png'
  ],
  p5: [
    'assets/images/projects/robloxgame/Screenshot 2025-12-05 125356.png',
    'assets/images/projects/robloxgame/Screenshot 2025-12-05 210235.png',
    'assets/images/projects/robloxgame/Screenshot 2025-12-13 125802.png',
    'assets/images/projects/robloxgame/Screenshot 2025-12-13 135414.png'
  ]
};

const projectImageIndexes = {
  p2: 0,
  p4: 0,
  p5: 0
};

window.changeProjImage = function (event, projId, direction) {
  event.stopPropagation(); // Prevent opening the detail panel
  event.preventDefault();   // Prevent any default button behavior

  if (!projectImages[projId]) return;

  const images = projectImages[projId];
  let currentIndex = projectImageIndexes[projId];

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  } else if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  projectImageIndexes[projId] = currentIndex;

  // Update portfolio.html image
  const imgPort = document.getElementById(`img-${projId}-portfolio`);
  if (imgPort) {
    imgPort.src = images[currentIndex];
  }

  // Update index.html image
  const imgIndex = document.getElementById(`img-${projId}-index`);
  if (imgIndex) {
    imgIndex.src = images[currentIndex];
  }
};
