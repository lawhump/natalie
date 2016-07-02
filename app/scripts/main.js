'use strict';
var nav = document.querySelector('.nav-items');
var landing = document.querySelector('.landing');
var about = document.querySelector('article.about');
var placeholder = document.querySelector('article.project');

var init = (function () {
  var api = {};

  api.destination = location.hash;
  api.getMarkup = function(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open('GET', url, true); // true for asynchronous
    xmlHttp.send(null);
  };

  api.responseHandler = function(res) {
    window.scrollTo(0,0);
    placeholder.innerHTML = res;
    placeholder.classList.add('active');
    landing.setAttribute('hidden', '');
  };

  api.isValidPath = function() {
    var path = api.destination;
    if (!path.includes('#')) {
      api.destination = '#' + api.destination;
    }

    if (path === '#/aquos' ||
        path === '#/axis' ||
        path === '#/iceland' ||
        path === '#/coffee-metric' ||
        path === '#/rise' ||
        path === '#/eau-naturale') {
      return true;
    }

    return false;
  };

  api.route = function() {
    api.destination = location.hash;

    if (api.destination !== '') {
      if (api.isValidPath()) {
        var path = 'markup' + api.destination.split('#')[1] + '.html';
        console.log(path);
        api.getMarkup(path, api.responseHandler);
      }

      else {
        window.location.href = window.location.host + window.location.pathname;
        history.pushState("", document.title, window.location.pathname);
      }
    }
  };

  return api;
})();

(function() {
  var app = init;
  app.route();

  window.onhashchange = app.route;
})();

nav.addEventListener('click', function(e) {
  // if(e.target.classList.indexOf("about") > -1) {
    landing.classList.add('inactive');

    nav.querySelector('.active').classList.remove('active');
    e.target.parentNode.classList.add('active');
    about.classList.add('active');
  // }
});
