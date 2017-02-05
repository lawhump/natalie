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

/**
 *
 * Created by Borbás Geri on 12/17/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var EPPZScrollTo = {
  /**
   * Helpers.
   */
  documentVerticalScrollPosition: function()
  {
      if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
      if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
      if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
      return 0; // None of the above.
  },

  viewportHeight: function()
  { return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight; },

  documentHeight: function()
  { return (document.height !== undefined) ? document.height : document.body.offsetHeight; },

  documentMaximumScrollPosition: function()
  { return this.documentHeight() - this.viewportHeight(); },

  elementVerticalClientPositionById: function(id)
  {
      var element = document.getElementById(id);
      var rectangle = element.getBoundingClientRect();
      return rectangle.top;
  },

  /**
   * Animation tick.
   */
  scrollVerticalTickToPosition: function(currentPosition, targetPosition)
  {
      var filter = 0.2;
      var fps = 120;
      var duration = 1250;

      var difference = parseFloat(targetPosition) - parseFloat(currentPosition);

      // Snap, then stop if arrived.
      var arrived = (Math.abs(difference) <= 0.5);
      if (arrived)
      {
          // Apply target.
          scrollTo(0.0, targetPosition);
          return;
      }

      // Filtered position.
      currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);

      // Apply target.
      scrollTo(0.0, Math.round(currentPosition));

      // Schedule next tick.
      setTimeout("EPPZScrollTo.scrollVerticalTickToPosition("+currentPosition+", "+targetPosition+")", (duration / fps));
  },

  /**
   * For public use.
   *
   * @param id The id of the element to scroll to.
   * @param padding Top padding to apply above element.
   */
  scrollVerticalToElementById: function(id, padding)
  {
    console.log('wtf');
      var element = document.getElementById(id);
      if (element == null)
      {
          console.warn('Cannot find element with id \''+id+'\'.');
          return;
      }

      var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
      var currentPosition = this.documentVerticalScrollPosition();

      // Clamp.
      var maximumScrollPosition = this.documentMaximumScrollPosition();
      if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

      // Start animation.
      this.scrollVerticalTickToPosition(currentPosition, targetPosition);
  }
};

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
    // document.querySelector('nav').scrollIntoView();
    // window.scrollBy(0, -30);

    placeholder.innerHTML = res;
    placeholder.removeAttribute('hidden');
    EPPZScrollTo.scrollVerticalToElementById('nav', 150);
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
        path === '#/out-west' ||
        path === '#/see-america' ||
        path === '#/azor' ||
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
