const goDark = document.querySelector('.goDark')
const goLight = document.querySelector('.goLight')
const navBar = document.querySelector('nav')
const navPoly = document.querySelector('.nav__poly')
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
  // if (mode == LIGHT_THEME_NAME) {
  //   goLight.classList.add('hidden')
  //   goDark.classList.remove('hidden')
  // }
  // else if (mode == DARK_THEME_NAME) {
  //   goDark.classList.add('hidden')
  //   goLight.classList.remove('hidden')
  // }

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
  if (curScroll >= NAV_POLY_SCROLL_HIDE) {
    navPoly.classList.add('nav__poly--hide')
  }
  else if (curScroll <= NAV_POLY_SCROLL_SHOW) {
    navPoly.classList.remove('nav__poly--hide')
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
    navPoly ? navPoly.classList.add('nav__poly--hide') : ''
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

  // for podcasts
  podcastPlayerHandler();

  // for scroll lock
  setObserver()
  navToggleCheckbox.addEventListener('change', menuToggle)
  // fixed menu on reverse scroll
  window.addEventListener('scroll', checkScroll);
  // mid-scrolled reload
  checkScroll()

}

function changeTheme(mode) {
  setTheme(mode)
  storeThemePreference(mode)
}


function menuToggle() {
  // do NOT toggle: menu can exist before JS loads
  // That'd reverse required scroll-lock behaviour in some cases!
  if (navToggleCheckbox.checked) {
    document.body.classList.add('scroll-lock');
  } else {
    document.body.classList.remove('scroll-lock');

  }
}


function setObserver() {
  const targetNode = document.querySelector('body');
  let options = {
    attributes: true, childList: false, subtree: false

  }

  // const observer = new MutationObserver(observeMe);

  // observer.observe(targetNode, options)

  function observeMe(mutation, observer) {
    const theBody = mutation[0];
    if (theBody.attributeName == "class") {
      // BUG: FIX THIS !!
      scrollLock()
      if ([...document.body.classList].includes('scroll-lock')) {
        console.log('Obeserverbee');
        scrollLock.disableScroll()
        // console.log("🚀 ~ file: script.js ~ line 139 ~ observeMe ~ blocker", blocker)
      }
      else {
        console.log('OUT!');
        scrollLock.enableScroll()
      }
    }

  }



  // call this to Disable
  function scrollLock() {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    function preventDefault(e) {
      e.preventDefault();
    }
    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }
    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
      }));
    } catch (e) { }

    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    function disableScroll() {

      console.log("🚀 disableScroll")
      // FIXME: keydown for fn+home/end/pgUp/pgDown & space!

      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    function enableScroll() {
      console.log('🚀 Enable Scroll');
      // FIXME: wheelEvent/keyup 'wheel' NOT removed!
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    scrollLock.disableScroll = disableScroll;
    scrollLock.enableScroll = enableScroll;
  }
}

function podcastPlayerHandler(params) {
  const podcasts = document.querySelectorAll('.recent__card__podcast__list--item')
  const podcastsWithSources = [];

  podcasts.forEach(pod => {
    if (pod.dataset.src) {
      console.log('SRC');
      podcastsWithSources.push(pod)
    }
  })
  // console.log("🚀 ~ file: script.js ~ line 206 ~ podcastPlayerHandler ~ podcastsWithSources", podcastsWithSources)
  const audioContainer = []

  podcastsWithSources.forEach(cast => {
    const currentAudio = new Audio(cast.dataset.src)
    console.log("🚀 ~ file: script.js ~ line 216 ~ podcastPlayerHandler ~ currentAudio", currentAudio)
  })


}

init()
