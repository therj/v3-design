parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"L4bL":[function(require,module,exports) {
var e=document.querySelector(".goLight"),o=document.querySelector(".goDark"),n=document.querySelector("nav"),c=document.querySelector("nav-poly"),t=document.querySelector(".nav__ham"),d=document.querySelector("input.nav__toggle"),l=document.querySelector(".nav__menu"),i=window.storeThemePreference,s=window.setTheme,r=window.CURRENT_THEME,a=window.DARK_THEME_NAME,u=window.LIGHT_THEME_NAME,m=32,v=48,w=256;function L(n){n==u?(e.classList.add("hidden"),o.classList.remove("hidden")):n==a&&(o.classList.add("hidden"),e.classList.remove("hidden"))}var E,h=window.scrollY||document.documentElement.scrollTop,y=0,_=0;function f(){(E=window.scrollY||document.documentElement.scrollTop)>h?y="DOWN":E<h&&(y="UP"),console.log("🚀 ~ file: script.js ~ line 44 ~ checkScroll ~ curScroll",E),E>=v?c.classList.add("poly--hide"):E<=m&&c.classList.remove("poly--hide"),y!==_&&S(y,E),h=E}function S(e,o){"DOWN"===e&&o>w?(n.classList.add("nav--hide"),c&&c.classList.add("poly--hide"),_=e):"UP"===e&&(n.classList.remove("nav--hide"),_=e)}function T(){L(r),o.addEventListener("click",function(e){g(a),L(a)}),e.addEventListener("click",function(e){g(u),L(u)}),t.addEventListener("click",p),window.addEventListener("scroll",f),f()}function g(e){s(e),i(e)}function p(){document.body.classList.toggle("scroll-lock")}T();
},{}]},{},["L4bL"], null)
//# sourceMappingURL=/script.acb5e0a8.js.map