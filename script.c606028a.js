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
  }); // for podcasts

  podcastPlayerHandlerObserver(); // for scroll lock

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
    subtree: false // const observer = new MutationObserver(observeMe);
    // observer.observe(targetNode, options)

  };

  function observeMe(mutation, observer) {
    var theBody = mutation[0];

    if (theBody.attributeName == "class") {
      // BUG: FIX THIS !!
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
      console.log("🚀 disableScroll"); // FIXME: keydown for fn+home/end/pgUp/pgDown & space!

      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF

      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop

      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile

      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    function enableScroll() {
      console.log('🚀 Enable Scroll'); // FIXME: wheelEvent/keyup 'wheel' NOT removed!

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
  var itemSelector = '.recent__card__podcast__list--item';
  var toggleIconSelector = "".concat(itemSelector, "__heading--btn");
  var progressSelector = "".concat(itemSelector, "__progress");
  var plusMinusSelector = "".concat(itemSelector, "__plusminus");
  var podcasts = document.querySelectorAll(itemSelector);

  var _loop = function _loop(i) {
    var element = podcasts[i];
    var theButton = element.querySelector(toggleIconSelector);
    var theAudio = element.querySelector('audio');
    var theBar = element.querySelector(progressSelector);
    var plusMinus = element.querySelector(plusMinusSelector);
    var plus10 = plusMinus.querySelector('.plus10');
    var plus30 = plusMinus.querySelector('.plus30');
    var minus10 = plusMinus.querySelector('.minus10');
    var minus30 = plusMinus.querySelector('.minus30');
    if (!theAudio) return "continue"; // Play pause button

    theButton.addEventListener('click', function (e) {
      if (theAudio.paused) {
        theAudio.play();
        console.log('Playing!');
      } else {
        theAudio.pause();
        console.log('Paused!');
      }
    }); //
    // change progress bar

    theAudio.addEventListener('timeupdate', function (event) {
      var progress = element.querySelector(progressSelector);
      var played = progress.querySelector("".concat(progressSelector, "--played"));
      played.style.width = "".concat(theAudio.currentTime / theAudio.duration * 100, "%");
    });
    theBar.addEventListener('mouseup', seekHandler);

    function seekHandler(e) {
      var clickedAt = e.clientX || e.pageX;
      var offsetLeft = e.currentTarget.getBoundingClientRect().left;
      var seekRatio = (clickedAt - offsetLeft) / e.currentTarget.offsetWidth; // const wasPaused = theAudio.paused || theAudio.ended; // play on seek? Yes!

      var playIn = setInterval(function () {
        // not even metadata loaded => must be paused!
        if (isNaN(theAudio.duration)) {
          console.log('isNan, playing!');
          theAudio.play();
        } else {
          // if (wasPaused) {
          //   theAudio.pause()
          // }
          clearInterval(playIn);
          var seekTime = seekRatio * theAudio.duration;
          theAudio.currentTime = seekTime;
          console.log("🚀 ~ file: script.js ~ line 255 ~ seekHandler ~ seekTime", seekRatio, seekTime);
        }
      }, 200);

      if (theAudio.paused) {
        theAudio.play();
      }
    } // plus minus 10 & 30


    plus10.addEventListener('click', function (e) {
      theAudio.currentTime = theAudio.currentTime + 10;
    });
    plus30.addEventListener('click', function (e) {
      theAudio.currentTime = theAudio.currentTime + 30;
    });
    minus10.addEventListener('click', function (e) {
      theAudio.currentTime = theAudio.currentTime - 10;
    });
    minus30.addEventListener('click', function (e) {
      theAudio.currentTime = theAudio.currentTime - 30;
    }); // When audio plays, do XYZ!

    theAudio.addEventListener('play', function (event) {
      console.log('Video is playing');
      element.classList.add('playing');
    });
    theAudio.addEventListener('playing', function (event) {
      // console.log('Video is playing');
      var audios = document.getElementsByTagName('audio');

      for (var _i = 0, len = audios.length; _i < len; _i++) {
        if (audios[_i] != event.target) {
          audios[_i].pause();
        }
      }
    });
    theAudio.addEventListener('pause', function (event) {
      console.log('Video is  paused');
      element.classList.remove('playing');
    });
    theAudio.addEventListener('progress', function (event) {
      var progress = element.querySelector(progressSelector);
      var buffered = progress.querySelector("".concat(progressSelector, "--buffered"));
      buffered.innerHTML = '';
      var duration = theAudio.duration;

      for (var _i2 = 0; _i2 < theAudio.buffered.length; _i2++) {
        var start = theAudio.buffered.start(_i2) / duration * 100;
        var end = theAudio.buffered.end(_i2) / duration * 100;
        var loaded = document.createElement('span');
        loaded.style.left = "".concat(start, "%");
        loaded.style.right = "".concat(100 - end, "%");

        if (start != 0) {
          loaded.style.borderTopLeftRadius = 0;
          loaded.style.borderBottomLeftRadius = 0;
        }

        if (end != 100) {
          loaded.style.borderTopRightRadius = 0;
          loaded.style.borderBottomRightRadius = 0;
        }

        buffered.appendChild(loaded);
      }
    });
    theAudio.addEventListener('loadstart', function (event) {
      console.log('Video is  loadstart');
    });
    theAudio.addEventListener('loadeddata', function (event) {
      console.log('Video is  loadeddata');
    });
    theAudio.addEventListener('ended', function (event) {
      console.log('Video is  ended');
    });
    theAudio.addEventListener('canplay', function (event) {
      console.log('Video is  canplay');
    });
  };

  for (var i = 0; i < podcasts.length; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
}

function podcastPlayerHandlerObserver() {
  // TODO: enable preload here (if)!
  var options = {
    root: document.querySelector('.recent'),
    rootMargin: '0px',
    threshold: 0.5
  };
  var observer = new IntersectionObserver(podcastPlayerHandler, options); // target = document.querySelector(`.recent__card__podcast`)

  target = document.querySelector(".recent__card__podcast");
  observer.observe(target);
}

init();
},{}]},{},["L4bL"], null)
//# sourceMappingURL=script.c606028a.js.map