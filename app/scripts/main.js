'use strict';
var nav = document.querySelector('.nav-items');
var workTab = nav.querySelector('.work');
var aboutTab = nav.querySelector('.about');


var landing = document.querySelector('.landing');
var about = document.querySelector('article.about');
var placeholder = document.querySelector('article.project');

var init = (function () {
  var api = {};

  api.destination = location.hash;
  api.getMarkup = function(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.open('GET', url, true); // true for asynchronous
    xmlHttp.send(null);
  };

  api.responseHandler = function(res) {
    window.scrollTo(0, 0);
    placeholder.innerHTML = res;
    placeholder.classList.add('active');
    landing.setAttribute('hidden', '');
  };

  api.isValidPath = function() {
    var path = api.destination;
    if (path.indexOf('#') <= -1) {
      api.destination = '#' + api.destination;
    }

    if (path === '#/aquos' ||
        path === '#/axis' ||
        path === '#/iceland' ||
        path === '#/coffee-metric' ||
        path === '#/rise' ||
        path === '#/daily-ui' ||
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
        api.getMarkup(path, api.responseHandler);
      }

      else {
        window.location.href = window.location.host + window.location.pathname;
        history.pushState('', document.title, window.location.pathname);
      }
    }
  };

  return api;
})();

(function() {
  var app = init;
  app.route();

  var elem = document.querySelector('.project-grid');
  var masonry = new Masonry( elem, {
    percentPosition: true,
    itemSelector: '.project-thumb',
    columnWidth: '.grid-sizer'
  });

  window.onhashchange = app.route;
})();

aboutTab.addEventListener('click', function() {
  if(!aboutTab.classList.contains('active')) {
    landing.classList.add('inactive');

    workTab.classList.remove('active');
    aboutTab.classList.add('active');

    about.classList.add('active');

    window.setTimeout(function() {
      landing.setAttribute('hidden', '');
    }, 600);
  }
});

workTab.addEventListener('click', function() {
  if(!workTab.classList.contains('active')) {

    workTab.classList.add('active');
    aboutTab.classList.remove('active');

    about.classList.remove('active');

    landing.removeAttribute('hidden');
    window.setTimeout(function() {
      landing.classList.remove('inactive');
    }, 100);
  }
});
