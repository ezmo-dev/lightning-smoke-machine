/* lightning-smoke-machine app-walkthrough */
/* ------------------- */
/* app.js — navigation + localStorage + Screen 1 */


/* ------------------- */
/* Toast */

let toastTimer = null;
function showToast(msg, durationMs = 2000) {
  const el = document.getElementById('app-toast');
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'), durationMs);
}

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
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch (e) {
      Storage.remove('progress');
      return {};
    }
  },
  setProgress(data) { Storage.set('progress', JSON.stringify(data)); },

  getLevel() { return Storage.get('level') || '00'; },
  setLevel(level) { Storage.set('level', level); },

  isFirstVisit() { return !Storage.getPseudonym(); },
};


/* ------------------- */
/* Navigation */

const navHistory = [];

function showScreen(screenId) {
  const current = document.querySelector('.screen.active');
  if (current) {
    navHistory.push(current.id);
    current.classList.remove('active');
  }
  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');
}

function goBack() {
  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');
  const previous = navHistory.pop();
  const prev = previous ? document.getElementById(previous) : null;
  const target = prev || document.getElementById('screen-map');
  if (target) target.classList.add('active');
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
    loadWelcomeBack(); // update assets before showing to avoid level-00 flash
    showScreen('screen-welcome-back');
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
  Storage.setLevel('01');
  triggerLevelUp(1);
});


/* ------------------- */
/* Screen 2b - Welcome Back */

const TOTAL_STEPS = 16;

// Returns the mascot level string ('00'–'04') based on how many steps are completed.
// Note: stepsCompleted is a count of done steps (0–16), NOT the stored level ('00'–'04').
// Storage.getLevel() stores a string key used for colors/images — keep these two separate.
function getMascotLevel(stepsCompleted) {
  if (stepsCompleted >= 12) return '04';
  if (stepsCompleted >= 7)  return '03';
  if (stepsCompleted >= 4)  return '02';
  if (stepsCompleted >= 2)  return '01';
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

// Double-tap confirmation for destructive "Start Over" actions
function confirmStartOver(btn, originalText, onConfirm) {
  if (btn.dataset.confirming === '1') {
    clearTimeout(btn._confirmTimer);
    delete btn.dataset.confirming;
    btn.textContent = originalText;
    btn.classList.remove('startover--confirming');
    onConfirm();
    return;
  }
  btn.dataset.confirming = '1';
  btn.textContent = 'Tap again to confirm';
  btn.classList.add('startover--confirming');
  btn._confirmTimer = setTimeout(function () {
    delete btn.dataset.confirming;
    btn.textContent = originalText;
    btn.classList.remove('startover--confirming');
  }, 3000);
}

document.getElementById('btn-continue').addEventListener('click', function () {
  showScreen('screen-map');
  loadTutorialMap();
});

document.getElementById('btn-startover').addEventListener('click', function () {
  confirmStartOver(this, 'START OVER', function () {
    document.getElementById('wb-progress-fill').style.width = '0%';
    setTimeout(function () {
      Storage.remove('progress');
      Storage.remove('language');
      Storage.remove('pseudonym');
      Storage.setLevel('00');
      showScreen('screen-language');
    }, 450);
  });
});

// TODO: profile — wire btn-wb-profile when screen-profile is implemented
// document.getElementById('btn-wb-profile').addEventListener('click', function () {
//   showScreen('screen-profile');
// });

document.getElementById('btn-wb-help').addEventListener('click', function () {
  showScreen('screen-help');
});


/* ------------------- */
/* Screen 3 - Tutorial Map */

// Each level: which steps it owns, its bar color, and the mascot card displays
const LEVELS = [
  { name: 'Welcome', steps: ['step_01', 'step_02'], color: '#F9A836', mascot: 'img/mascot/level-00.png', lastStep: 2  },
  { name: 'Introduction', steps: ['step_03', 'step_04'], color: '#BCEEB6', mascot: 'img/mascot/level-01.png', lastStep: 4  },
  { name: 'Hardware', steps: ['step_05', 'step_06', 'step_07'], color: '#ADE4FF', mascot: 'img/mascot/level-02.png', lastStep: 7  },
  { name: 'Software', steps: ['step_08', 'step_09', 'step_10', 'step_11', 'step_12'], color: '#E0BFDE', mascot: 'img/mascot/level-03.png', lastStep: 12 },
  { name: 'Launch', steps: ['step_13', 'step_14', 'step_15', 'step_16'], color: '#FFCC77', mascot: 'img/mascot/level-04.png', lastStep: 16 },
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

    const stepsText = doneInLevel + ' of ' + totalInLevel + ' step' + (totalInLevel > 1 ? 's' : '') + ' completed';

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
        showToast('✓ Level already completed!');
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

// TODO: profile — wire btn-map-profile when screen-profile is implemented
// document.getElementById('btn-map-profile').addEventListener('click', function () {
//   showScreen('screen-profile');
// });

document.getElementById('btn-map-help').addEventListener('click', function () {
  showScreen('screen-help');
});

document.getElementById('btn-map-startover').addEventListener('click', function () {
  confirmStartOver(this, 'START OVER', function () {
    document.getElementById('map-overall-fill').style.width = '0%';
    setTimeout(function () {
      Storage.remove('progress');
      Storage.remove('language');
      Storage.remove('pseudonym');
      Storage.setLevel('00');
      showScreen('screen-language');
    }, 450);
  });
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

  // If this step is the first step of a new level (level 01+), advance the stored level
  for (var li = 1; li < LEVELS.length; li++) {
    var firstNum = parseInt(LEVELS[li].steps[0].replace('step_', ''));
    if (stepNum === firstNum) {
      Storage.setLevel(String(li).padStart(2, '0'));
      break;
    }
  }

  const step = STEPS_CONTENT[stepNum];
  if (!step) return;

  // Inject content
  document.getElementById('step-content').innerHTML = step.html;

  // Wrap tables for horizontal scroll on small screens
  document.querySelectorAll('#step-content table').forEach(function (table) {
    const wrap = document.createElement('div');
    wrap.className = 'step-table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  // Mark zoomable images + skeleton loading state
  document.querySelectorAll('#step-content .step-img-card img, #step-content .step-img-plain img').forEach(function (img) {
    if (isZoomableImage(img.getAttribute('src'))) {
      img.classList.add('img-zoomable');
    }
    if (!img.complete) {
      img.parentElement.classList.add('img-skeleton');
      img.addEventListener('load', function () {
        img.parentElement.classList.remove('img-skeleton');
      }, { once: true });
    }
  });

  // Update counter
  document.getElementById('step-counter').textContent =
    'Step ' + String(stepNum).padStart(2, '0') + ' of ' + TOTAL_STEPS;

  // Update topbar progress bar (width = current step position, color = current level)
  const pct = Math.min((stepNum / TOTAL_STEPS) * 100, 100);
  const fill = document.getElementById('step-topbar-fill');
  fill.style.width = pct + '%';
  fill.style.background = LEVEL_COLORS[Storage.getLevel()];

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
  if (!btn.classList.contains('btn-mark-read--filled')) return;

  // Save progress
  const progress = Storage.getProgress();
  progress[stepKey(currentStep)] = true;
  Storage.setProgress(progress);

  // Step 2: level up to 01, then go to map via level up screen
  if (currentStep === 2) {
    Storage.setLevel('01');
    triggerLevelUp(1);
    return;
  }

  // Step 4: level up 02 first, then safety (handled inside level up next())
  if (currentStep === 4) {
    Storage.setLevel('02');
    triggerLevelUp(2);
    return;
  }

  // Step 7: level up to 03
  if (currentStep === 7) {
    Storage.setLevel('03');
    triggerLevelUp(3);
    return;
  }

  // Step 12: level up to 04
  if (currentStep === 12) {
    Storage.setLevel('04');
    triggerLevelUp(4);
    return;
  }

  // Normal next step
  const next = getNextStep();
  if (next) {
    loadStep(next);
  } else {
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
/* Screen 4a - Safety Warning */

function loadSafetyScreen() {
  // Reset checkboxes
  ['safety-cb1', 'safety-cb2', 'safety-cb3'].forEach(function (id) {
    document.getElementById(id).checked = false;
  });

  // Reset scroll
  const scroll = document.getElementById('safety-scroll');
  scroll.scrollTop = 0;

  // Topbar fill: step 04 of 16, level 01 color (#BCEEB6)
  const fill = document.getElementById('safety-topbar-fill');
  fill.style.width = ((4 / TOTAL_STEPS) * 100) + '%';
  fill.style.background = LEVEL_COLORS['01'];

  // Reset button
  updateSafetyButton();

  // Scroll detection
  scroll.addEventListener('scroll', onSafetyScroll);
}

function isSafetyReady() {
  const allChecked = ['safety-cb1', 'safety-cb2', 'safety-cb3'].every(function (id) {
    return document.getElementById(id).checked;
  });
  const scroll = document.getElementById('safety-scroll');
  const nearBottom = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 60;
  return allChecked && nearBottom;
}

function updateSafetyButton() {
  const btn = document.getElementById('btn-safety-continue');
  if (isSafetyReady()) {
    btn.classList.remove('btn-mark-read--outline');
    btn.classList.add('btn-mark-read--filled');
  } else {
    btn.classList.remove('btn-mark-read--filled');
    btn.classList.add('btn-mark-read--outline');
  }
}

function onSafetyScroll() {
  updateSafetyButton();
}

// Checkbox changes update button state
['safety-cb1', 'safety-cb2', 'safety-cb3'].forEach(function (id) {
  document.getElementById(id).addEventListener('change', updateSafetyButton);
});

document.getElementById('btn-safety-continue').addEventListener('click', function () {
  if (!isSafetyReady()) {
    // Shake button
    const btn = this;
    btn.classList.add('shake');
    btn.addEventListener('animationend', function () { btn.classList.remove('shake'); }, { once: true });

    // Shake unchecked checkbox rows
    ['safety-cb1', 'safety-cb2', 'safety-cb3'].forEach(function (id) {
      if (!document.getElementById(id).checked) {
        const row = document.getElementById(id).closest('.safety-check');
        row.classList.add('shake');
        row.addEventListener('animationend', function () { row.classList.remove('shake'); }, { once: true });
      }
    });
    return;
  }

  Storage.set('safety_ack', '1');
  document.getElementById('safety-scroll').removeEventListener('scroll', onSafetyScroll);
  showScreen('screen-step');
  loadStep(5);
});

document.getElementById('btn-safety-back').addEventListener('click', function () {
  document.getElementById('safety-scroll').removeEventListener('scroll', onSafetyScroll);
  showScreen('screen-map');
  loadTutorialMap();
});

document.getElementById('btn-safety-help').addEventListener('click', function () {
  showScreen('screen-help');
});


/* ------------------- */
/* Screen 5 - Level Up */

const LEVEL_UP_CONTENT = {
  1: {
    color:       '#BCEEB6',
    mascot:      'img/mascot/level-01.png',
    title:       'LEVEL 01',
    desc:        'Inspector look activated!\nNo more crawling around, we\'re switching to investigation mode.',
    stats:       '"Curiosity" module installed\nCold resistance +15\n(thanks to the beanie).',
    heroHeight:  '60vh',   /* <- total colored zone height */
    mascotTop:   '-3%',    /* <- distance from top of hero to mascot */
    mascotSize:  '104%',   /* <- mascot height relative to hero */
    mascotX:     '0px',   /* <- horizontal offset from center */
    textBottom:  '355px',  /* <- distance from screen bottom to title block */
    textX:       '0px',   /* <- horizontal offset of text block from center */
    textColor:   '#F9A836',
    textStroke:  '2px #62605C',    /* <- stroke outline e.g. '2px #ffffff' or 'none' */
    descColor:   '#62605C',
    descBottom:  '235px',
    statsBottom: '145px',
    next:        function () { showScreen('screen-map'); loadTutorialMap(); }
  },
  2: {
    color:       '#ADE4FF',
    mascot:      'img/mascot/level-02.png',
    title:       'LEVEL 02',
    desc:        'Say goodbye to the magnifying glass and hello to the wrench.\nLet\'s tear everything apart!',
    stats:       'Heat shielding active: +100%\nSpark resistance.',
    heroHeight:  '60vh',
    mascotTop:   '0%',
    mascotSize:  '100%',
    mascotX:     '-13px',
    textBottom:  '355px',  /* <- distance from screen bottom to title block */
    textX:       '0px',
    textColor:   '#F9A836',
    textStroke:  '2px #62605C',
    descColor:   '#62605C',
    descBottom:  '220px',
    statsBottom: '150px',
    next:        function () {
      if (!Storage.get('safety_ack')) {
        showScreen('screen-safety');
        loadSafetyScreen();
      } else {
        showScreen('screen-step');
        loadStep(5);
      }
    }
  },
  3: {
    color:       '#E0BFDE',
    mascot:      'img/mascot/level-03.png',
    title:       'LEVEL 03',
    desc:        'You\'re starting to look like a real\ngarage hacker: 80% metal,\n20% caffeine, and 100% class.',
    stats:       'Cypherpunk Evolution active:\nSSH (Super Stylish Hacker)\nProtocol: Brain latency 0ms.',
    heroHeight:  '60vh',
    mascotTop:   '-1%',
    mascotSize:  '97%',
    mascotX:     '0px',
    textBottom:  '365px',  /* <- distance from screen bottom to title block */
    textX:       '0px',
    textColor:   '#F9A836',
    textStroke:  '2px #62605C',
    descColor:   '#62605C',
    descBottom:  '240px',
    statsBottom: '150px',
    next:        function () { showScreen('screen-step'); loadStep(8); }
  },
  4: {
    color:       '#FFCC77',
    mascot:      'img/mascot/level-04.png',
    title:       'LEVEL 04',
    desc:        'You are the Final Boss: with a bit of code, a caterpillar can conquer the universe!',
    stats:       'Check out those antennas!\nLightning Network connection:\nSignal Strength MAX.',
    heroHeight:  '62vh',
    mascotTop:   '-6%',
    mascotSize:  '100%',
    mascotX:     '0px',
    textBottom:  '355px',  /* <- distance from screen bottom to title block */
    textX:       '0px',
    textColor:   '#F9A836',
    textStroke:  '2px #62605C',
    descColor:   '#62605C',
    descBottom:  '240px',
    statsBottom: '150px',
    next:        function () { showScreen('screen-step'); loadStep(13); }
  }
};

var currentLevelUp = 1;

/* Show level-up screen only if not already seen; otherwise skip to next() directly */
function triggerLevelUp(levelNum) {
  if (Storage.get('levelup_' + levelNum + '_seen')) {
    LEVEL_UP_CONTENT[levelNum].next();
  } else {
    showScreen('screen-levelup');
    loadLevelUp(levelNum);
  }
}

function loadLevelUp(levelNum) {
  currentLevelUp = levelNum;
  const data = LEVEL_UP_CONTENT[levelNum];

  // Apply hero color + positioning parameters
  const hero = document.getElementById('levelup-hero');
  hero.style.setProperty('--lu-color',       data.color);
  hero.style.setProperty('--lu-hero-height', data.heroHeight);
  hero.style.setProperty('--lu-mascot-top',  data.mascotTop);
  hero.style.setProperty('--lu-mascot-size', data.mascotSize);
  hero.style.setProperty('--lu-mascot-x',    data.mascotX);
  hero.style.background = data.color;

  // Title block: positioned from screen bottom, clamped so it never overlaps the hero zone
  const heroHeightPx = window.innerHeight * parseFloat(data.heroHeight) / 100;
  const maxTextBottom = window.innerHeight - heroHeightPx - 8; // 8px margin below hero
  const safeTextBottom = Math.min(parseInt(data.textBottom), maxTextBottom);
  const heroText = document.getElementById('levelup-hero-text');
  heroText.style.bottom    = safeTextBottom + 'px';
  heroText.style.transform = 'translateX(' + data.textX + ')';

  // Gradient fade matches level color
  document.getElementById('levelup-fade').style.background =
    'linear-gradient(to bottom, ' + data.color + ', white)';

  document.getElementById('levelup-mascot').src = data.mascot;

  const titleEl = document.getElementById('levelup-title');
  titleEl.textContent  = data.title;
  titleEl.style.color  = data.textColor;
  titleEl.style.webkitTextStroke = data.textStroke;

  const descEl = document.getElementById('levelup-desc');
  descEl.textContent   = data.desc;
  descEl.style.color   = data.descColor;
  descEl.style.bottom  = data.descBottom;

  const statsEl = document.getElementById('levelup-stats');
  statsEl.textContent = data.stats;
  statsEl.style.bottom = data.statsBottom;

  spawnConfetti(data.color);
}

function spawnConfetti(levelColor) {
  const container = document.getElementById('levelup-confetti');
  container.innerHTML = '';

  const colors = [levelColor, '#F9A836', '#ffffff', '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
  const count  = 60;

  for (var i = 0; i < count; i++) {
    const el    = document.createElement('div');
    el.className = 'levelup-confetti-piece';

    // Random properties
    const size     = 6 + Math.random() * 8;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 0.8;
    const duration = 1.8 + Math.random() * 1.2;
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const round    = Math.random() > 0.5 ? '50%' : '2px';

    el.style.cssText =
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      'left:' + left + '%;' +
      'background:' + color + ';' +
      'border-radius:' + round + ';' +
      'animation-duration:' + duration + 's;' +
      'animation-delay:' + delay + 's;';

    container.appendChild(el);
  }
}

document.querySelector('.levelup-help-btn').addEventListener('click', function () {
  showScreen('screen-help');
});

document.getElementById('btn-levelup-gotit').addEventListener('click', function () {
  document.getElementById('levelup-confetti').innerHTML = '';
  Storage.set('levelup_' + currentLevelUp + '_seen', true);
  LEVEL_UP_CONTENT[currentLevelUp].next();
});


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
/* Screen 6 - Help Center */

document.getElementById('btn-help-back').addEventListener('click', function () {
  goBack();
});

// Accordion: one card open at a time across FAQ + Dictionary
var openCard = null;

function closeCard(card) {
  card.classList.remove('open');
}

function openCardEl(card) {
  if (openCard && openCard !== card) {
    closeCard(openCard);
  }
  card.classList.add('open');
  openCard = card;
}

function toggleCard(card) {
  if (card.classList.contains('open')) {
    closeCard(card);
    openCard = null;
  } else {
    openCardEl(card);
  }
}

document.querySelectorAll('.help-card').forEach(function (card) {
  card.addEventListener('click', function () {
    toggleCard(card);
  });
});

// Show more / Show less
function initShowMore(listId, btnId) {
  var btn = document.getElementById(btnId);
  var expanded = false;

  btn.addEventListener('click', function () {
    expanded = !expanded;
    var extras = document.querySelectorAll('#' + listId + ' .help-card--extra');
    extras.forEach(function (el) {
      if (expanded) {
        el.classList.add('expanded-visible');
      } else {
        // Close any open card inside this list before hiding
        if (el.classList.contains('open')) {
          closeCard(el);
          openCard = null;
        }
        el.classList.remove('expanded-visible');
      }
    });
    btn.textContent = expanded ? 'Show less' : 'Show more';
    btn.setAttribute('aria-expanded', expanded);
  });
}

initShowMore('faq-list', 'faq-show-more');
initShowMore('dict-list', 'dict-show-more');

// Contact form
// TODO: Replace mailto with Formspree or custom backend if needed
document.getElementById('btn-help-send').addEventListener('click', function () {
  var textarea = document.getElementById('help-textarea');
  var msg = textarea.value.trim();

  if (!msg) {
    textarea.classList.remove('shake');
    void textarea.offsetWidth;
    textarea.classList.add('shake');
    textarea.addEventListener('animationend', function () {
      textarea.classList.remove('shake');
    }, { once: true });
    return;
  }

  var subject = encodeURIComponent('Lightning Smoke Machine \u2014 Help Center Message');
  var body    = encodeURIComponent(msg);
  window.location.href = 'mailto:tutorial.washtub325@passinbox.com?subject=' + subject + '&body=' + body;

  // Show confirmation
  document.getElementById('help-form-wrap').style.display = 'none';
  var confirm = document.getElementById('help-confirm');
  confirm.removeAttribute('aria-hidden');
  confirm.classList.add('visible');

  setTimeout(function () {
    textarea.value = '';
    confirm.classList.remove('visible');
    confirm.setAttribute('aria-hidden', 'true');
    document.getElementById('help-form-wrap').style.display = '';
  }, 3000);
});


/* ------------------- */
/* Boot */

document.addEventListener('DOMContentLoaded', init);
