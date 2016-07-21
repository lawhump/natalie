'use strict';
var nav = document.querySelector('.nav-items');
var workTab1 = nav.querySelector('.work');
var aboutTab1 = nav.querySelector('.about');

var dropdown = document.querySelector('.dropdown');
var workTab2 = dropdown.querySelector('.work');
var aboutTab2 = dropdown.querySelector('.about');

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
    document.querySelector('nav').scrollIntoView();
    window.scrollBy(0, -30);
    placeholder.innerHTML = res;
    placeholder.removeAttribute('hidden');
    window.setTimeout(function() {
      placeholder.classList.add('active');
    }, 100);
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
      if (api.destination === '#') {
        api.goHome();
      }

      else if (api.isValidPath()) {
        var path = 'markup' + api.destination.split('#')[1] + '.html';
        api.getMarkup(path, api.responseHandler);
      }

      else {
        window.location.href = window.location.host + window.location.pathname;
        history.pushState("", document.title, window.location.pathname);
        api.goHome();
      }
    }

    else {
      api.goHome();
    }
  };

  api.goHome = function() {
    placeholder.classList.remove('active');
    placeholder.setAttribute('hidden', '');

    if(about.classList.contains('active')) {
      about.classList.remove('active');
      landing.classList.remove('inactive');
    }

    if(aboutTab1.classList.contains('active')) {
      aboutTab1.classList.remove('active');
      workTab1.classList.add('active');
    }

    landing.removeAttribute('hidden', '');

    if (placeholder.classList.contains('offscreen')) {
      window.setTimeout(function() {
        placeholder.classList.remove('offscreen');
      }, 100);
    }
  };

  return api;
})();

function toggleDropdown() {
  document.querySelector('.dropdown-wrapper').classList.toggle('active');
}

function submit() {
  var message = document.getElementById('emailBody').value;
  window.location='mailto:ntiquach@gmail.com?subject=Hey Natalie!&body=' + message;
}

function toAboutPage() {
  if(!aboutTab1.classList.contains('active')) {
    landing.classList.add('inactive');
    placeholder.classList.add('offscreen');

    workTab1.classList.remove('active');
    aboutTab1.classList.add('active');

    about.classList.add('active');

    window.setTimeout(function() {
      landing.setAttribute('hidden', '');
      placeholder.setAttribute('hidden', '');
    }, 600);
  }
}

function toWorkPage() {
  if(!workTab1.classList.contains('active')) {
    workTab1.classList.add('active');
    aboutTab1.classList.remove('active');

    about.classList.remove('active');

    if(!placeholder.classList.contains('active')){
      landing.removeAttribute('hidden');
    }
    if(placeholder.classList.contains('active')){
      placeholder.removeAttribute('hidden', '');
    }
    window.setTimeout(function() {
      landing.classList.remove('inactive');
      placeholder.classList.remove('offscreen');
    }, 100);
  }
}

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

aboutTab1.addEventListener('click', toAboutPage);
aboutTab2.addEventListener('click', toAboutPage);
workTab1.addEventListener('click', toWorkPage);
workTab2.addEventListener('click', toWorkPage);

document.querySelector('.dropdown').addEventListener('click', function() {
  toggleDropdown();
});
