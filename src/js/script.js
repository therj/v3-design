const goLight = document.querySelector(".goLight")
const goDark = document.querySelector(".goDark")
const navBar = document.querySelector('nav')
const navPoly = document.querySelector('nav-poly')
const navHam = document.querySelector('.nav__ham')
const navToggleCheckbox = document.querySelector('input.nav__toggle')
const navMenu = document.querySelector('.nav__menu')

const storeThemePreference = window.storeThemePreference;
const setTheme = window.setTheme;
const currentTheme = window.CURRENT_THEME;
const DARK_THEME_NAME = window.DARK_THEME_NAME
const LIGHT_THEME_NAME = window.LIGHT_THEME_NAME

const NAV_POLY_SCROLL_SHOW = 32; //24;
const NAV_POLY_SCROLL_HIDE = 48; //48
// hide nav scroll position Y!
let HIDE_NAV_SCROLL_POS = 256;


function setThemeIcons(mode) {
  if (mode == LIGHT_THEME_NAME) {
    goLight.classList.add('hidden')
    goDark.classList.remove('hidden')
  }
  else if (mode == DARK_THEME_NAME) {
    goDark.classList.add('hidden')
    goLight.classList.remove('hidden')
  }

}

let prevScroll = window.scrollY || document.documentElement.scrollTop;
var curScroll;
var direction = 0;
var prevDirection = 0;
function checkScroll() {
  /*
  ** Find the direction of scroll
  ** 0 - initial, 1 - up, 2 - down
  */
  curScroll = window.scrollY || document.documentElement.scrollTop;
  if (curScroll > prevScroll) {
    //scrolled up
    direction = "DOWN";
  }
  else if (curScroll < prevScroll) {
    //scrolled down
    direction = "UP";
  }
  console.log("🚀 ~ file: script.js ~ line 44 ~ checkScroll ~ curScroll", curScroll)
  // hide ploygon only
  // if (curScroll < NAV_HEIGHT_TOTAL_PIXEL / 4 && navPoly) {
  //   navPoly.classList.remove('poly--hide')
  // }
  if (curScroll >= NAV_POLY_SCROLL_HIDE) {
    navPoly.classList.add('poly--hide')
  }
  else if (curScroll <= NAV_POLY_SCROLL_SHOW) {
    navPoly.classList.remove('poly--hide')
  }

  if (direction !== prevDirection) {
    toggleHeader(direction, curScroll);
  }
  prevScroll = curScroll;
};
function toggleHeader(direction, curScroll) {
  if (direction === "DOWN" && curScroll > HIDE_NAV_SCROLL_POS) {
    //replace HIDE_NAV_SCROLL_POS with height of your header in px
    navBar.classList.add('nav--hide');
    // hide ploygon explicitly -> shouldn't come back on reverse scroll
    navPoly ? navPoly.classList.add('poly--hide') : ''
    prevDirection = direction;
  }
  else if (direction === "UP") {
    navBar.classList.remove('nav--hide');
    prevDirection = direction;
  }
};

function init() {
  // These init
  setThemeIcons(currentTheme)
  // TODO: combine event listeners
  goDark.addEventListener('click', (e) => {
    changeTheme(DARK_THEME_NAME)
    setThemeIcons(DARK_THEME_NAME)
  })

  goLight.addEventListener('click', (e) => {
    changeTheme(LIGHT_THEME_NAME)
    setThemeIcons(LIGHT_THEME_NAME)
  })
  navHam.addEventListener('click', hamClick)
  // fixed menu on reverse scroll
  window.addEventListener('scroll', checkScroll);
  // mid-scrolled reload
  checkScroll()

}

function changeTheme(mode) {
  setTheme(mode)
  storeThemePreference(mode)
}


function hamClick() {
  // navMenu.classList.toggle('nav__menu--hide')
  // navToggleCheckbox.toggleAttribute('checked');
  // navToggleCheckbox.checked = !navToggleCheckbox.checked
  document.body.classList.toggle('scroll-lock');
}


init()
