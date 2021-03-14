// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"L4bL":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var goDark = document.querySelector('.goDark');
var goLight = document.querySelector('.goLight');
var navBar = document.querySelector('nav');
var navPoly = document.querySelector('.nav__poly');
var navHam = document.querySelector('.nav__ham');
var navToggleCheckbox = document.querySelector('input.nav__toggle');
var navMenu = document.querySelector('.nav__menu');
var storeThemePreference = window.storeThemePreference;
var setTheme = window.setTheme;
var currentTheme = window.CURRENT_THEME;
var DARK_THEME_NAME = window.DARK_THEME_NAME;
var LIGHT_THEME_NAME = window.LIGHT_THEME_NAME;
var NAV_POLY_SCROLL_SHOW = 32; //24;

var NAV_POLY_SCROLL_HIDE = 48; //48
// hide nav scroll position Y!

var HIDE_NAV_SCROLL_POS = 256;

function setThemeIcons(mode) {// if (mode == LIGHT_THEME_NAME) {
  //   goLight.classList.add('hidden')
  //   goDark.classList.remove('hidden')
  // }
  // else if (mode == DARK_THEME_NAME) {
  //   goDark.classList.add('hidden')
  //   goLight.classList.remove('hidden')
  // }
}

var prevScroll = window.scrollY || document.documentElement.scrollTop;
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
  } else if (curScroll < prevScroll) {
    //scrolled down
    direction = "UP";
  }

  if (curScroll >= NAV_POLY_SCROLL_HIDE) {
    navPoly.classList.add('nav__poly--hide');
  } else if (curScroll <= NAV_POLY_SCROLL_SHOW) {
    navPoly.classList.remove('nav__poly--hide');
  }

  if (direction !== prevDirection) {
    toggleHeader(direction, curScroll);
  }

  prevScroll = curScroll;
}

;

function toggleHeader(direction, curScroll) {
  if (direction === "DOWN" && curScroll > HIDE_NAV_SCROLL_POS) {
    //replace HIDE_NAV_SCROLL_POS with height of your header in px
    navBar.classList.add('nav--hide'); // hide ploygon explicitly -> shouldn't come back on reverse scroll

    navPoly ? navPoly.classList.add('nav__poly--hide') : '';
    prevDirection = direction;
  } else if (direction === "UP") {
    navBar.classList.remove('nav--hide');
    prevDirection = direction;
  }
}

;

function init() {
  // These init
  setThemeIcons(currentTheme); // TODO: combine event listeners

  goDark.addEventListener('click', function (e) {
    changeTheme(DARK_THEME_NAME);
    setThemeIcons(DARK_THEME_NAME);
  });
  goLight.addEventListener('click', function (e) {
    changeTheme(LIGHT_THEME_NAME);
    setThemeIcons(LIGHT_THEME_NAME);
  }); // for scroll lock

  setObserver();
  navToggleCheckbox.addEventListener('change', menuToggle); // fixed menu on reverse scroll

  window.addEventListener('scroll', checkScroll); // mid-scrolled reload

  checkScroll();
}

function changeTheme(mode) {
  setTheme(mode);
  storeThemePreference(mode);
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
  var targetNode = document.querySelector('body');
  var options = {
    attributes: true,
    childList: false,
    subtree: false
  };
  var observer = new MutationObserver(observeMe);
  observer.observe(targetNode, options);

  function observeMe(mutation, observer) {
    var theBody = mutation[0];

    if (theBody.attributeName == "class") {
      // const blocker = (e) => { e.preventDefault(); e.stopPropagation(); }
      scrollLock();

      if (_toConsumableArray(document.body.classList).includes('scroll-lock')) {
        console.log('Obeserverbee');
        scrollLock.disableScroll(); // console.log("🚀 ~ file: script.js ~ line 139 ~ observeMe ~ blocker", blocker)
      } else {
        console.log('OUT!');
        scrollLock.enableScroll();
      }
    }
  } // call this to Disable


  function scrollLock() {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {
      37: 1,
      38: 1,
      39: 1,
      40: 1
    };

    function preventDefault(e) {
      e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    } // modern Chrome requires { passive: false } when adding event


    var supportsPassive = false;

    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function get() {
          supportsPassive = true;
        }
      }));
    } catch (e) {}

    var wheelOpt = supportsPassive ? {
      passive: false
    } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    function disableScroll() {
      console.log("🚀 disableScroll"); // BUG: keydown for fn+home/end/pgUp/pgDown & space!

      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF

      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop

      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile

      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    function enableScroll() {
      console.log('🚀 Enable Scroll'); // BUG: wheelEvent/keyup 'wheel' NOT removed!

      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    scrollLock.disableScroll = disableScroll;
    scrollLock.enableScroll = enableScroll;
  }
}

init();
},{}]},{},["L4bL"], null)
//# sourceMappingURL=script.00d70e5c.js.map