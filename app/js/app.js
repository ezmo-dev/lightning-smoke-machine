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
  }
}


/* ------------------- */
/* Screen 1 — Language Select */

document.getElementById('btn-fr').addEventListener('click', function () {
  Storage.setLanguage('fr');
  init();
});

document.getElementById('btn-en').addEventListener('click', function () {
  Storage.setLanguage('en');
  init();
});


/* ------------------- */
/* Boot */

document.addEventListener('DOMContentLoaded', init);
