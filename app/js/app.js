/* lightning-smoke-machine app-walkthrough */
/* ------------------- */
/* app.js — navigation + localStorage + Screen 1 */


/* ------------------- */
/* localStorage helpers */

const Storage = {
  get(key) { return localStorage.getItem(key); },
  set(key, value) { localStorage.setItem(key, value); },
  remove(key) { localStorage.removeItem(key); },

  getLanguage() { return Storage.get('language'); },
  setLanguage(lang) { Storage.set('language', lang); },

  getPseudonym() { return Storage.get('pseudonym'); },
  setPseudonym(name) { Storage.set('pseudonym', name); },

  getProgress() {
    const raw = Storage.get('progress');
    return raw ? JSON.parse(raw) : {};
  },
  setProgress(data) { Storage.set('progress', JSON.stringify(data)); },

  getLevel() { return Storage.get('level') || '00'; },
  setLevel(level) { Storage.set('level', level); },

  isFirstVisit() { return !Storage.getPseudonym(); },
};


/* ------------------- */
/* Navigation */

const history = [];

function showScreen(screenId) {
  const current = document.querySelector('.screen.active');
  if (current) {
    history.push(current.id);
    current.classList.remove('active');
  }
  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');
}

function goBack() {
  const previous = history.pop();
  if (!previous) return;
  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');
  const prev = document.getElementById(previous);
  if (prev) prev.classList.add('active');
}


/* ------------------- */
/* Init — decide which screen to show on load */

function init() {
  const lang = Storage.getLanguage();

  // Update <html lang=""> to match stored language
  if (lang) document.documentElement.lang = lang;

  if (!lang) {
    showScreen('screen-language');
  } else if (Storage.isFirstVisit()) {
    showScreen('screen-welcome');
  } else {
    showScreen('screen-welcome-back');
    loadWelcomeBack();
  }
}


/* ------------------- */
/* Screen 1 — Language Select */

document.getElementById('btn-fr').addEventListener('click', function () {
  Storage.setLanguage('fr');
  Storage.setProgress({ ...Storage.getProgress(), step_01: true });
  init();
});

document.getElementById('btn-en').addEventListener('click', function () {
  Storage.setLanguage('en');
  Storage.setProgress({ ...Storage.getProgress(), step_01: true });
  init();
});


/* ------------------- */
/* Screen 2a — Welcome (first visit) */

document.getElementById('btn-letsgo').addEventListener('click', function () {
  const input = document.getElementById('input-pseudonym');
  const name = input.value.trim();

  if (!name) {
    // shake the input to signal it is required
    input.classList.remove('shake');
    void input.offsetWidth; // force reflow to restart animation
    input.classList.add('shake');
    input.addEventListener('animationend', function () {
      input.classList.remove('shake');
    }, { once: true });
    return;
  }

  Storage.setPseudonym(name);
  Storage.setProgress({ ...Storage.getProgress(), step_02: true });
  showScreen('screen-map');
  loadTutorialMap();
});


/* ------------------- */
/* Screen 2b - Welcome Back */

const TOTAL_STEPS = 16;

// Mascot + color upgrades when a full level is completed:
// level-01 after step 2 (Welcome done)
// level-02 after step 4 (Intro done)
// level-03 after step 7 (Hardware done)
// level-04 after step 12 (Software done)
function getMascotLevel(completed) {
  if (completed >= 12) return '04';
  if (completed >= 7)  return '03';
  if (completed >= 4)  return '02';
  if (completed >= 2)  return '01';
  return '00';
}

const LEVEL_COLORS = {
  '00': '#F9A836',
  '01': '#BCEEB6',
  '02': '#ADE4FF',
  '03': '#E0BFDE',
  '04': '#FFCC77'
};

function loadWelcomeBack() {
  const pseudonym = Storage.getPseudonym() || 'Builder';
  const progress  = Storage.getProgress();
  const completed = Object.keys(progress).length;
  const pct       = Math.min((completed / TOTAL_STEPS) * 100, 100);
  const level     = Storage.getLevel(); // set explicitly by Level Up screen, not calculated
  const stepStr   = String(completed).padStart(2, '0');
  const screen    = document.getElementById('screen-welcome-back');

  document.getElementById('wb-pseudonym').textContent     = pseudonym;
  document.getElementById('wb-progress-fill').style.width = pct + '%';
  document.getElementById('wb-progress-text').textContent = 'Step ' + stepStr + ' of ' + TOTAL_STEPS + ' completed';
  document.getElementById('wb-mascot').src                = 'img/mascot/level-' + level + '.png';
  document.getElementById('wb-logo').src                  = 'img/screen-02b/logo-level-' + level + '.svg';
  screen.style.setProperty('--level-color', LEVEL_COLORS[level]);
}

document.getElementById('btn-continue').addEventListener('click', function () {
  showScreen('screen-map');
  loadTutorialMap();
});

document.getElementById('btn-startover').addEventListener('click', function () {
  // animate bar to zero first, then wipe everything and go to Screen 1
  document.getElementById('wb-progress-fill').style.width = '0%';
  setTimeout(function () {
    Storage.remove('progress');
    Storage.remove('language');
    Storage.remove('pseudonym');
    Storage.setLevel('00');
    showScreen('screen-language');
  }, 450); // slightly longer than the 0.4s CSS transition
});

document.getElementById('btn-wb-profile').addEventListener('click', function () {
  showScreen('screen-profile');
});

document.getElementById('btn-wb-help').addEventListener('click', function () {
  showScreen('screen-help');
});


/* ------------------- */
/* Screen 3 - Tutorial Map */

// Each level: which steps it owns, its bar color, and the mascot card displays
const LEVELS = [
  { name: 'Welcome',      steps: ['step_01', 'step_02'],                                        color: '#F9A836', mascot: 'img/mascot/level-00.png', lastStep: 2  },
  { name: 'Introduction', steps: ['step_03', 'step_04'],                                        color: '#BCEEB6', mascot: 'img/mascot/level-01.png', lastStep: 4  },
  { name: 'Hardware',     steps: ['step_05', 'step_06', 'step_07'],                             color: '#ADE4FF', mascot: 'img/mascot/level-02.png', lastStep: 7  },
  { name: 'Software',     steps: ['step_08', 'step_09', 'step_10', 'step_11', 'step_12'],      color: '#E0BFDE', mascot: 'img/mascot/level-03.png', lastStep: 12 },
  { name: 'Launch',       steps: ['step_13', 'step_14', 'step_15', 'step_16'],                  color: '#FFCC77', mascot: 'img/mascot/level-04.png', lastStep: 16 },
];

function loadTutorialMap() {
  const progress       = Storage.getProgress();
  const totalCompleted = Object.keys(progress).length;
  const overallPct     = Math.min((totalCompleted / TOTAL_STEPS) * 100, 100);

  document.getElementById('map-overall-fill').style.width = overallPct + '%';

  const container = document.getElementById('map-cards');
  container.innerHTML = '';

  let currentFound = false;

  LEVELS.forEach(function (level, index) {
    const doneInLevel  = level.steps.filter(function (s) { return progress[s]; }).length;
    const totalInLevel = level.steps.length;
    const isComplete   = doneInLevel === totalInLevel;

    var state;
    if (isComplete) {
      state = 'completed';
    } else if (!currentFound) {
      state = 'current';
      currentFound = true;
    } else {
      state = 'locked';
    }

    const pct      = Math.min((doneInLevel / totalInLevel) * 100, 100);
    const fraction = state === 'completed' ? '\u26A1/' + totalInLevel : doneInLevel + '/' + totalInLevel;
    const fillColor = state === 'locked' ? '#D0D0D0' : level.color;

    const stepsText = 'Step ' + String(state === 'current' ? totalCompleted : level.lastStep).padStart(2, '0') + ' of ' + TOTAL_STEPS + ' completed';

    const leftHTML = state === 'locked'
      ? '<div class="map-card-locked-icon">?</div>'
      : '<div class="map-card-mascot"><img src="' + level.mascot + '" alt=""/></div>';

    const card = document.createElement('div');
    card.className = 'map-card map-card--' + state;
    card.dataset.levelIndex = index;
    card.innerHTML =
      leftHTML +
      '<div class="map-card-info">' +
        '<span class="map-card-name">' + level.name + '</span>' +
        '<span class="map-card-steps">' + stepsText + '</span>' +
        '<div class="map-card-progress">' +
          '<div class="map-card-bar">' +
            '<div class="map-card-fill" style="width:' + pct + '%;background:' + fillColor + ';"></div>' +
          '</div>' +
          '<span class="map-card-fraction">' + fraction + '</span>' +
        '</div>' +
      '</div>';

    card.addEventListener('click', function () {
      if (state === 'completed') {
        // TODO: navigate to step list for this level when Screen 4 is built
        console.log('Level', index, 'completed - navigate to step list');
      } else if (state === 'current') {
        showScreen('screen-step');
        const next = getNextStep();
        if (next) loadStep(next);
      } else {
        // Locked: shake to signal unavailable
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
        card.addEventListener('animationend', function () {
          card.classList.remove('shake');
        }, { once: true });
      }
    });

    container.appendChild(card);
  });
}

document.getElementById('btn-map-profile').addEventListener('click', function () {
  showScreen('screen-profile');
});

document.getElementById('btn-map-help').addEventListener('click', function () {
  showScreen('screen-help');
});

document.getElementById('btn-map-startover').addEventListener('click', function () {
  document.getElementById('map-overall-fill').style.width = '0%';
  setTimeout(function () {
    Storage.remove('progress');
    Storage.remove('language');
    Storage.remove('pseudonym');
    Storage.setLevel('00');
    showScreen('screen-language');
  }, 450);
});


/* ------------------- */
/* Screen 4 - Step Content */

// Map step number (1-16) to its progress key
function stepKey(n) {
  return 'step_' + String(n).padStart(2, '0');
}

// Find the next step number the user should read (first incomplete, starting from 3)
function getNextStep() {
  const progress = Storage.getProgress();
  for (var i = 3; i <= TOTAL_STEPS; i++) {
    if (!progress[stepKey(i)]) return i;
  }
  return null; // all done
}

var currentStep = null;

function loadStep(stepNum) {
  currentStep = stepNum;
  const step = STEPS_CONTENT[stepNum];
  if (!step) return;

  // Inject content
  document.getElementById('step-content').innerHTML = step.html;

  // Mark zoomable images
  document.querySelectorAll('#step-content .step-img-card img').forEach(function (img) {
    if (isZoomableImage(img.getAttribute('src'))) {
      img.classList.add('img-zoomable');
    }
  });

  // Update counter
  document.getElementById('step-counter').textContent =
    'Step ' + String(stepNum).padStart(2, '0') + ' of ' + TOTAL_STEPS;

  // Update topbar progress bar
  const pct = Math.min(((stepNum - 1) / TOTAL_STEPS) * 100, 100);
  document.getElementById('step-topbar-fill').style.width = pct + '%';

  // Reset button to outline (unread) state
  const btn = document.getElementById('btn-mark-read');
  btn.classList.remove('btn-mark-read--filled');
  btn.classList.add('btn-mark-read--outline');

  // Scroll detection: activate button when near bottom
  const content = document.getElementById('step-content');
  content.scrollTop = 0;

  function checkScroll() {
    const nearBottom = content.scrollHeight - content.scrollTop - content.clientHeight < 60;
    if (nearBottom) {
      btn.classList.remove('btn-mark-read--outline');
      btn.classList.add('btn-mark-read--filled');
      content.removeEventListener('scroll', checkScroll);
    }
  }

  // Also activate immediately if content is short enough to not need scrolling
  setTimeout(function () {
    if (content.scrollHeight <= content.clientHeight + 60) {
      btn.classList.remove('btn-mark-read--outline');
      btn.classList.add('btn-mark-read--filled');
    } else {
      content.addEventListener('scroll', checkScroll);
    }
  }, 100);
}

document.getElementById('btn-mark-read').addEventListener('click', function () {
  const btn = this;
  if (!btn.classList.contains('btn-mark-read--filled')) return; // not yet readable

  // Save progress
  const progress = Storage.getProgress();
  progress[stepKey(currentStep)] = true;
  Storage.setProgress(progress);

  // Determine next step
  const next = getNextStep();
  if (next) {
    loadStep(next);
  } else {
    // All steps done — go to tutorial map
    showScreen('screen-map');
    loadTutorialMap();
  }
});

document.getElementById('btn-step-back').addEventListener('click', function () {
  if (currentStep > 3) {
    // Navigate to the previous step within the step screen
    loadStep(currentStep - 1);
  } else {
    // On the first content step — go back to the tutorial map and refresh it
    goBack();
    loadTutorialMap();
  }
});

document.getElementById('btn-step-home').addEventListener('click', function () {
  showScreen('screen-map');
  loadTutorialMap();
});


/* ------------------- */
/* Lightbox */

function isZoomableImage(src) {
  var match = src && src.match(/(\d+)\.webp/);
  if (!match) return false;
  var n = parseInt(match[1]);
  return n === 7 || (n >= 13 && n <= 42);
}

var lbScale    = 1;
var lbLastDist = 0;
var lbLastTap  = 0;

function openLightbox(src) {
  var img = document.getElementById('lightbox-img');
  img.src = src;
  img.style.transition = '';
  img.style.transform  = 'scale(1)';
  lbScale = 1;
  document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

// Tap on dark backdrop → close
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this || e.target.classList.contains('lightbox-container')) {
    closeLightbox();
  }
});

var lbImg = document.getElementById('lightbox-img');

// Pinch-to-zoom
lbImg.addEventListener('touchstart', function (e) {
  if (e.touches.length === 2) {
    lbLastDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
}, { passive: true });

lbImg.addEventListener('touchmove', function (e) {
  if (e.touches.length === 2) {
    e.preventDefault();
    var dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    lbScale = Math.min(Math.max(lbScale * (dist / lbLastDist), 0.8), 6);
    this.style.transform = 'scale(' + lbScale + ')';
    lbLastDist = dist;
  }
}, { passive: false });

// Double-tap to toggle zoom 1× ↔ 2.5×
lbImg.addEventListener('touchend', function (e) {
  if (e.changedTouches.length !== 1) return;
  var now = Date.now();
  if (now - lbLastTap < 280) {
    lbScale = lbScale > 1.2 ? 1 : 2.5;
    this.style.transition  = 'transform 0.25s ease';
    this.style.transform   = 'scale(' + lbScale + ')';
    var self = this;
    setTimeout(function () { self.style.transition = ''; }, 260);
  }
  lbLastTap = now;
});

// Click delegation on step content
document.getElementById('step-content').addEventListener('click', function (e) {
  var img = e.target.closest('.step-img-card img');
  if (img && isZoomableImage(img.getAttribute('src'))) {
    openLightbox(img.src);
  }
});


/* ------------------- */
/* Boot */

document.addEventListener('DOMContentLoaded', init);
