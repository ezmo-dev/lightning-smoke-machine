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
/* Boot */

document.addEventListener('DOMContentLoaded', init);
