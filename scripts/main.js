"use strict";function toggleDropdown(){document.querySelector(".dropdown-wrapper").classList.toggle("active")}function submit(){var e=document.getElementById("emailBody").value;window.location="mailto:ntiquach@gmail.com?subject=Hey Natalie!&body="+e}function toAboutPage(){aboutTab1.classList.contains("active")||(landing.classList.add("inactive"),placeholder.classList.add("offscreen"),workTab1.classList.remove("active"),aboutTab1.classList.add("active"),about.classList.add("active"),window.setTimeout(function(){landing.setAttribute("hidden",""),placeholder.setAttribute("hidden","")},600))}function toWorkPage(){workTab1.classList.contains("active")||(workTab1.classList.add("active"),aboutTab1.classList.remove("active"),about.classList.remove("active"),placeholder.classList.contains("active")||landing.removeAttribute("hidden"),placeholder.classList.contains("active")&&placeholder.removeAttribute("hidden",""),window.setTimeout(function(){landing.classList.remove("inactive"),placeholder.classList.remove("offscreen")},100))}var nav=document.querySelector(".nav-items"),workTab1=nav.querySelector(".work"),aboutTab1=nav.querySelector(".about"),dropdown=document.querySelector(".dropdown"),workTab2=dropdown.querySelector(".work"),aboutTab2=dropdown.querySelector(".about"),landing=document.querySelector(".landing"),about=document.querySelector("article.about"),placeholder=document.querySelector("article.project"),init=function(){var e={};return e.destination=location.hash,e.getMarkup=function(e,t){var o=new XMLHttpRequest;o.onreadystatechange=function(){4===o.readyState&&200===o.status&&t(o.responseText)},o.open("GET",e,!0),o.send(null)},e.responseHandler=function(e){document.querySelector("nav").scrollIntoView(),window.scrollBy(0,-30),placeholder.innerHTML=e,placeholder.removeAttribute("hidden"),window.setTimeout(function(){placeholder.classList.add("active")},100),landing.setAttribute("hidden","")},e.isValidPath=function(){var t=e.destination;return t.indexOf("#")<=-1&&(e.destination="#"+e.destination),"#/aquos"===t||"#/axis"===t||"#/iceland"===t||"#/coffee-metric"===t||"#/rise"===t||"#/daily-ui"===t||"#/eau-naturale"===t},e.route=function(){if(e.destination=location.hash,""!==e.destination)if(e.isValidPath()){var t="markup"+e.destination.split("#")[1]+".html";e.getMarkup(t,e.responseHandler)}else window.location.href=window.location.host+window.location.pathname,history.pushState("",document.title,window.location.pathname);else placeholder.classList.remove("active"),placeholder.setAttribute("hidden",""),landing.removeAttribute("hidden","")},e}();!function(){var e=init;e.route();var t=document.querySelector(".project-grid");new Masonry(t,{percentPosition:!0,itemSelector:".project-thumb",columnWidth:".grid-sizer"});window.onhashchange=e.route}(),aboutTab1.addEventListener("click",toAboutPage),aboutTab2.addEventListener("click",toAboutPage),workTab1.addEventListener("click",toWorkPage),workTab2.addEventListener("click",toWorkPage),document.querySelector(".dropdown").addEventListener("click",function(){toggleDropdown()});