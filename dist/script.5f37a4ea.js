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
var goDark = document.querySelector('.goDark');
var goLight = document.querySelector('.goLight');
var navBar = document.querySelector('nav');
var navPoly = document.querySelector('nav-poly');
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

  console.log("🚀 ~ file: script.js ~ line 44 ~ checkScroll ~ curScroll", curScroll); // hide ploygon only
  // if (curScroll < NAV_HEIGHT_TOTAL_PIXEL / 4 && navPoly) {
  //   navPoly.classList.remove('poly--hide')
  // }

  if (curScroll >= NAV_POLY_SCROLL_HIDE) {
    navPoly.classList.add('poly--hide');
  } else if (curScroll <= NAV_POLY_SCROLL_SHOW) {
    navPoly.classList.remove('poly--hide');
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

    navPoly ? navPoly.classList.add('poly--hide') : '';
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
  });
  navHam.addEventListener('click', hamClick); // fixed menu on reverse scroll

  window.addEventListener('scroll', checkScroll); // mid-scrolled reload

  checkScroll();
}

function changeTheme(mode) {
  setTheme(mode);
  storeThemePreference(mode);
}

function hamClick() {
  // navMenu.classList.toggle('nav__menu--hide')
  // navToggleCheckbox.toggleAttribute('checked');
  // navToggleCheckbox.checked = !navToggleCheckbox.checked
  document.body.classList.toggle('scroll-lock');
}

init();
},{}]},{},["L4bL"], null)
//# sourceMappingURL=script.5f37a4ea.js.map