/* LOADER */
requestAnimationFrame(() => {
  const ll = document.getElementById('ll');
  if (ll) ll.classList.add('go');
});

window.addEventListener('load', () => {
  const ldr = document.getElementById('ldr');
  if (ldr) setTimeout(() => ldr.classList.add('out'), 900);
});

/* CURSOR */
let dot, ring, rx = 0, ry = 0, mx = 0, my = 0;

document.addEventListener('DOMContentLoaded', () => {
  dot = document.getElementById('dot');
  ring = document.getElementById('ring');
  
  document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (dot) {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }
});

  (function lp() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) {
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }
    requestAnimationFrame(lp);
  })();
});

/* PARALLAX LAYERS */
let himg, hghost, aimg, aboutbg, cbg, pimgs, projs, nav, lastSY = 0;

document.addEventListener('DOMContentLoaded', () => {
  himg = document.getElementById('himg');
  hghost = document.getElementById('hghost');
  aimg = document.getElementById('aimg');
  aboutbg = document.getElementById('aboutbg');
  cbg = document.getElementById('cbg');
  pimgs = [document.getElementById('pimg0'), document.getElementById('pimg1'), document.getElementById('pimg2')];
  projs = [document.getElementById('proj0'), document.getElementById('proj1'), document.getElementById('proj2')];

  nav = document.querySelector('nav') || document.getElementById('nav');
  if (nav) {
    nav.style.transition = 'top .4s ease';
  }

  // Cache offsets to prevent layout thrashing in RAF loop
  let cachedOffsets = { about: 0, contact: 0, projs: [] };
  
  function getAbsTop(el) {
    let top = 0;
    while(el) { top += el.offsetTop; el = el.offsetParent; }
    return top;
  }

  function updateOffsets() {
    const aboutEl = document.getElementById('about');
    if (aboutEl) cachedOffsets.about = getAbsTop(aboutEl);
    
    const cEl = document.getElementById('contact');
    if (cEl) cachedOffsets.contact = getAbsTop(cEl);
    
    cachedOffsets.projs = projs.map(p => {
      if(!p) return { top: 0, height: 0 };
      return { top: getAbsTop(p), height: p.offsetHeight };
    });
  }

  window.addEventListener('resize', updateOffsets);
  window.addEventListener('load', updateOffsets);
  updateOffsets();

  function raf() {
    const sy = window.scrollY;
    const vh = window.innerHeight;

    /* Hero photo deep parallax */
    if (himg) himg.style.transform = `translateY(${sy * 0.42}px) scale(1.12)`;

    /* Ghost text parallax — faster */
    if (hghost) hghost.style.transform = `translateY(${sy * -0.18}px)`;

    /* About number parallax */
    const aboutEl = document.getElementById('about');
    if (aboutEl && aboutbg) {
      const t = sy - cachedOffsets.about;
      aboutbg.style.transform = `translateY(${t * 0.15}px)`;
      if (aimg) aimg.style.transform = `translateY(${t * 0.08}px)`;
    }

    /* Project image parallax per section */
    projs.forEach((p, i) => {
      if (!p || !pimgs[i]) return;
      const rTop = cachedOffsets.projs[i].top - sy;
      const rHeight = cachedOffsets.projs[i].height;
      const prog = (-rTop) / (rHeight + vh);
      pimgs[i].style.transform = `translateY(${prog * 22}%)`;
    });

    /* Contact bg parallax */
    const cEl = document.getElementById('contact');
    if (cEl && cbg) {
      const ct = sy - cachedOffsets.contact;
      cbg.style.transform = `translate(-50%,calc(-50% + ${ct * 0.12}px))`;
    }

    /* Contact text reveal */
    if (cEl && (cachedOffsets.contact - sy) < vh * 0.85) {
      const cg1 = document.getElementById('cg1');
      const cg2 = document.getElementById('cg2');
      const cg3 = document.getElementById('cg3');
      if (cg1 && !cg1.classList.contains('up')) cg1.classList.add('up');
      if (cg2 && !cg2.dataset.revealed) { cg2.dataset.revealed = true; setTimeout(() => cg2.classList.add('up'), 130); }
      if (cg3 && !cg3.dataset.revealed) { cg3.dataset.revealed = true; setTimeout(() => cg3.classList.add('up'), 260); }
    }

    /* Nav */
    if (nav) {
      if (sy > lastSY && sy > 100) {
        nav.style.top = '-100px';
      } else {
        nav.style.top = '0';
      }
    }
    lastSY = sy;

    requestAnimationFrame(raf);
  }
  
  // Start RAF after a slight delay to allow painting
  setTimeout(() => {
    requestAnimationFrame(raf);
  }, 100);
});

/* SCROLL REVEAL + SKILL BARS */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    const fill = e.target.querySelector('.sk-bar-inner');
    if (fill) {
      const pct = e.target.dataset.pct;
      setTimeout(() => { fill.style.width = pct + '%'; }, 200);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el));

/* ── MODALS LOGIC ── */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing modals.");
  const termBtn = document.getElementById('term-btn');
  const typingBtn = document.getElementById('typing-btn');
  const termModal = document.getElementById('terminal-modal');
  const typingModal = document.getElementById('typing-modal');

  if (termBtn && termModal) {
    termBtn.addEventListener('click', () => {
      console.log("Terminal button clicked");
      termModal.classList.add('open');
      termModal.classList.add('active');
      const dock = document.querySelector('.dock-outer');
      if (dock) dock.style.display = 'none';
      const termInput = document.getElementById('terminal-input');
      if (termInput) termInput.focus();
    });
  } else {
    console.warn("Terminal elements not found:", { termBtn, termModal });
  }

  if (typingBtn && typingModal) {
    typingBtn.addEventListener('click', () => {
      console.log("Typing button clicked");
      typingModal.classList.add('open');
      typingModal.classList.add('active');
      const dock = document.querySelector('.dock-outer');
      if (dock) dock.style.display = 'none';
      initTypingTest();
    });
  } else {
    console.warn("Typing elements not found:", { typingBtn, typingModal });
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      console.log("Close button clicked for target:", targetId);
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.remove('open');
        modal.classList.remove('active');
        const dock = document.querySelector('.dock-outer');
        if (dock) dock.style.display = '';
      }
    });
  });

  /* Terminal Logic */
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  if (termForm && termInput && termOutput) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = termInput.value.trim();
      if (!val) return;

      const cmdLine = document.createElement('div');
      cmdLine.className = 'term-line cmd';
      cmdLine.innerHTML = `<span class="cmd-prompt">┌──(<span class="user">mbm㉿portfolio</span>)-[<span class="path">~</span>]<br>└─$</span> ${val}`;
      termOutput.appendChild(cmdLine);

      const resLine = document.createElement('div');
      resLine.className = 'term-line';

      const cmd = val.toLowerCase();
      if (cmd === 'help') {
        resLine.innerHTML = `Available commands:<br>
          - <strong>help</strong>: Show this message<br>
          - <strong>neofetch</strong>: System information<br>
          - <strong>whoami</strong>: Current user info<br>
          - <strong>about</strong>: Learn more about me<br>
          - <strong>projects</strong>: View my recent work<br>
          - <strong>contact</strong>: How to reach me<br>
          - <strong>clear</strong>: Clear terminal<br>
          - <strong>sudo</strong>: Execute command as superuser`;
      } else if (cmd === 'neofetch') {
        resLine.innerHTML = `<pre style="color:#268bd2; display:inline-block; vertical-align:top; margin:0 20px 0 0; font-size:11px; line-height:1.2;">
  _______                  _             _ 
 |__   __|                (_)           | |
    | | ___ _ __ _ __ ___  _ _ __   __ _| |
    | |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
    | |  __/ |  | | | | | | | | | | (_| | |
    |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
</pre>
<div style="display:inline-block; vertical-align:top; font-size:13px; line-height:1.4;">
<strong style="color:#268bd2">mbm</strong><span style="color:#e5e5e5">@</span><strong style="color:#268bd2">portfolio</strong><br>
-------------------------<br>
<strong style="color:#268bd2">OS</strong>: MBM System Rolling<br>
<strong style="color:#268bd2">Host</strong>: Web Browser Environment<br>
<strong style="color:#268bd2">Uptime</strong>: Since you opened this page<br>
<strong style="color:#268bd2">Packages</strong>: 2025 (dpkg)<br>
<strong style="color:#268bd2">Shell</strong>: zsh 5.9<br>
<strong style="color:#268bd2">Resolution</strong>: Responsive<br>
<strong style="color:#268bd2">Theme</strong>: MBM-Dark [GTK2/3]<br>
<strong style="color:#268bd2">Terminal</strong>: MBM Custom Terminal<br>
</div>`;
      } else if (cmd === 'whoami') {
        resLine.innerHTML = ' I am <strong>Michael Bryan Mandey</strong>.';
      } else if (cmd === 'about') {
        resLine.innerHTML = 'Software Developer & IT Student at President University.<br>Obsessed with building clean, fast software that scales.';
      } else if (cmd === 'projects') {
        resLine.innerHTML = '1. <strong>GBI Glow Bekasi</strong>: Full community website with CMS.<br>2. <strong>President Cupid</strong>: Active matchmaking platform for students.<br>3. <strong>Student Org System</strong>: Open source attendance tracking system.';
      } else if (cmd === 'contact') {
        resLine.innerHTML = 'Email: <strong>michaelbryanmandey@gmail.com</strong><br>LinkedIn: <strong>Michael Bryan Mandey</strong>';
      } else if (cmd === 'clear') {
        termOutput.innerHTML = '';
        termInput.value = '';
        return;
      } else if (cmd.startsWith('sudo')) {
        resLine.innerHTML = '<span style="color:#dc322f">mbm is not in the sudoers file. This incident will be reported.</span>';
      } else {
        resLine.innerHTML = `<span style="color:#dc322f">zsh: command not found: ${val}</span>`;
      }

      termOutput.appendChild(resLine);
      termInput.value = '';
      termOutput.scrollTop = termOutput.scrollHeight;
    });
  }

  /* Typing Logic */
  const sampleEl = document.getElementById('typing-sample');
  const inputEl = document.getElementById('typing-input');
  const wpmEl = document.getElementById('typing-wpm');
  const accEl = document.getElementById('typing-accuracy');
  const timeEl = document.getElementById('typing-time');
  const progEl = document.getElementById('typing-progress');
  const resetBtn = document.getElementById('typing-reset');
  const newBtn = document.getElementById('typing-new');

  const texts = [
    "Hi, I am Michael Bryan Mandey, a Software Developer and IT Student at President University.",
    "I built the GBI Glow Bekasi website from scratch, utilizing HTML, CSS, JavaScript, and PHP.",
    "President Cupid is a matchmaking platform I developed for President University students with real active users.",
    "I write code that is fast, deliberate, and worth keeping. Not just code that runs, but code that scales.",
    "I have expertise in Java for the backend, JavaScript in the browser, and Python for anything in between."
  ];

  let currentText = "";
  let startTime = null;
  let timerInterval = null;
  let isPlaying = false;

  let typingTimeout = null;

  function initTypingTest() {
    if (timerInterval) clearInterval(timerInterval);
    currentText = texts[Math.floor(Math.random() * texts.length)];
    
    // Generate spans once
    if (sampleEl) {
      let html = '<div class="typing-cursor" id="typing-cursor"></div>';
      for (let i = 0; i < currentText.length; i++) {
        html += `<span>${currentText[i]}</span>`;
      }
      sampleEl.innerHTML = html;
    }

    if (inputEl) {
      inputEl.value = '';
      inputEl.disabled = false;
    }
    startTime = null;
    isPlaying = false;
    if (wpmEl) wpmEl.innerText = '0';
    if (accEl) accEl.innerText = '100%';
    if (timeEl) timeEl.innerText = '0s';
    if (progEl) progEl.innerText = '0%';
    
    updateSample('');
    if (inputEl) inputEl.focus();
  }

  function updateSample(typed) {
    if (!sampleEl) return;
    const spans = sampleEl.querySelectorAll('span');
    const cursor = document.getElementById('typing-cursor');
    
    let activeSpan = null;

    for (let i = 0; i < currentText.length; i++) {
      let span = spans[i];
      if (!span) continue;
      
      let char = currentText[i];
      if (i < typed.length) {
        if (typed[i] === char) span.className = 'correct';
        else span.className = 'incorrect';
      } else if (i === typed.length) {
        span.className = 'active';
        activeSpan = span;
      } else {
        span.className = '';
      }
    }
    
    if (cursor) {
      if (activeSpan) {
        cursor.classList.add('show');
        // Calculate offset relative to parent
        const parentRect = sampleEl.getBoundingClientRect();
        const spanRect = activeSpan.getBoundingClientRect();
        const top = spanRect.top - parentRect.top;
        const left = spanRect.left - parentRect.left;
        cursor.style.transform = `translate(${left}px, ${top}px)`;
      } else {
        cursor.classList.remove('show');
      }
      
      // Stop blinking while typing
      cursor.classList.add('typing');
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        if (cursor) cursor.classList.remove('typing');
      }, 500);
    }
  }

  if (inputEl) {
    inputEl.addEventListener('input', () => {
      if (!isPlaying) {
        isPlaying = true;
        startTime = new Date();
        timerInterval = setInterval(updateStats, 1000);
      }
      const val = inputEl.value;
      updateSample(val);
      updateStats();

      if (val.length >= currentText.length) {
        clearInterval(timerInterval);
        isPlaying = false;
        inputEl.disabled = true;
      }
    });
  }

  function updateStats() {
    if (!startTime || !inputEl) return;
    const val = inputEl.value;
    const timeSec = Math.max(1, Math.floor((new Date() - startTime) / 1000));
    if (timeEl) timeEl.innerText = timeSec + 's';

    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentText[i]) correctChars++;
    }

    const words = correctChars / 5;
    const wpm = Math.round((words / timeSec) * 60) || 0;
    if (wpmEl) wpmEl.innerText = wpm;

    const acc = val.length === 0 ? 100 : Math.round((correctChars / val.length) * 100);
    if (accEl) accEl.innerText = acc + '%';

    const prog = Math.round((val.length / currentText.length) * 100);
    if (progEl) progEl.innerText = Math.min(100, prog) + '%';
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (inputEl) inputEl.value = '';
      if (timerInterval) clearInterval(timerInterval);
      startTime = null;
      isPlaying = false;
      if (wpmEl) wpmEl.innerText = '0';
      if (accEl) accEl.innerText = '100%';
      if (timeEl) timeEl.innerText = '0s';
      if (progEl) progEl.innerText = '0%';
      updateSample('');
      if (inputEl) {
        inputEl.disabled = false;
        inputEl.focus();
      }
    });
  }

  if (newBtn) newBtn.addEventListener('click', initTypingTest);
});
