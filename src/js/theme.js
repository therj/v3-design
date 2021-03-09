const DARK_THEME_NAME = 'dark';
const LIGHT_THEME_NAME = 'light';
const DEFAULT_THEME_NAME = null;

const rootEl = document.querySelector(':root');
const defaultTheme = rootEl.getAttribute('data-theme');

// If user took time to enable dark theme on their device, respect their choice!
const systemPrefersDarkMode = window.matchMedia(
  '(prefers-color-scheme:dark)'
).matches;

const themeLocal = localStorage.getItem('theme');

// User set > system
if (themeLocal === LIGHT_THEME_NAME) {
  setTheme(LIGHT_THEME_NAME);
} else if (themeLocal === DARK_THEME_NAME || systemPrefersDarkMode) {
  setTheme(DARK_THEME_NAME);
}
// else -> keep default!

function isThemeValid(mode) {
  return [LIGHT_THEME_NAME, DARK_THEME_NAME].includes(mode);
}

function setTheme(mode) {
  const isValid = isThemeValid(mode);
  if (isValid) rootEl.setAttribute('data-theme', mode);
}

function storeThemePreference(mode) {
  let isValid = isThemeValid(mode);
  // nullify if falsy value
  if (!mode) {
    isValid = true;
    mode = '';
  }
  if (isValid) localStorage.setItem('theme', mode);
}

// TIP: avoid local storage events, if possible.
window.addEventListener('storage', () => {
  // nobody needs this, but dev for devs!
  const themeLocal = window.localStorage.getItem('theme');
  setTheme(themeLocal);
  // Defaulters not welcome!
  if (!isThemeValid(themeLocal)) {
    storeThemePreference(DEFAULT_THEME_NAME);
  }
});
