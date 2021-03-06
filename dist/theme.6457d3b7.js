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
})({"qwQt":[function(require,module,exports) {
var rootEl = document.querySelector(':root'); // const defaultTheme = rootEl.getAttribute('data-theme');

var defaultTheme = rootEl.dataset.theme;
var DARK_THEME_NAME = 'dark';
var LIGHT_THEME_NAME = 'light';
var DEFAULT_THEME_NAME = defaultTheme;

function getTheme() {
  // If user took time to enable dark theme on their device, respect their choice!
  var systemPrefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
  var themeLocal = localStorage.getItem('theme'); // User set > system

  if (themeLocal === LIGHT_THEME_NAME) {
    return LIGHT_THEME_NAME;
  } else if (themeLocal === DARK_THEME_NAME || systemPrefersDarkMode) {
    return DARK_THEME_NAME;
  }

  return DEFAULT_THEME_NAME;
}

function isThemeValid(mode) {
  return [LIGHT_THEME_NAME, DARK_THEME_NAME].includes(mode);
}

function setTheme(mode) {
  var isValid = isThemeValid(mode);

  if (isValid) {
    rootEl.setAttribute('data-theme', mode);
    window.CURRENT_THEME = mode;
  }
}

function storeThemePreference(mode) {
  var isValid = isThemeValid(mode); // nullify if falsy value

  if (!mode) {
    isValid = true;
    mode = '';
  }

  if (isValid) localStorage.setItem('theme', mode);
}

function startListeningToOSTheme() {
  var matchMediaPrefDark = window.matchMedia('(prefers-color-scheme: dark)');
  matchMediaPrefDark.addEventListener('change', setTheme(getTheme()));
}

function init() {
  window.DARK_THEME_NAME = DARK_THEME_NAME;
  window.LIGHT_THEME_NAME = LIGHT_THEME_NAME;
  window.DEFAULT_THEME_NAME = DEFAULT_THEME_NAME;
  window.setTheme = setTheme;
  window.storeThemePreference = storeThemePreference;
  setTheme(getTheme());
  startListeningToOSTheme(); // TIP: avoid local storage events, if possible.

  window.addEventListener('storage', function () {
    // nobody needs this, but dev for devs!
    var themeLocal = window.localStorage.getItem('theme');
    setTheme(themeLocal); // Defaulters not welcome!

    if (!isThemeValid(themeLocal)) {
      storeThemePreference(DEFAULT_THEME_NAME);
    }
  });
}

init();
},{}]},{},["qwQt"], null)
//# sourceMappingURL=theme.6457d3b7.js.map