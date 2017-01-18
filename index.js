var forrest = 0;
var griffin = 0;
var dan = 0;
var single = 0;
var mama = 0;
var jensen = 0;

var fclicked = function() {
  forrest += parseInt(document.getElementById('demo').value);
}

var gclicked = function() {
  griffin += parseInt(document.getElementById('demo').value);
}

var dclicked = function() {
  dan += parseInt(document.getElementById('demo').value);
}

var sclicked = function() {
  single += parseInt(document.getElementById('demo').value);
}

var mclicked = function() {
  mama += parseInt(document.getElementById('demo').value);
}

var jclicked = function() {
  jensen += parseInt(document.getElementById('demo').value);
}

var submit = function() {
  var winner = Math.max(forrest,dan,griffin,single,mama,jensen);
  if (forrest == winner) {
    document.getElementById('persontext').innerHTML = "You chose Forrest!";
    document.getElementById('person').innerHTML = "<img src='ryangosling.jpg'>";
    window.scrollBy(document.getElementById('persontext').offsetHeight + document.getElementById('person').offsetHeight, window.scrollY);
}
if (dan == winner) {
  document.getElementById('persontext').innerHTML = "You chose Dan!";
  document.getElementById('person').innerHTML = "<img src='danschandel.jpg'>";
  window.scrollBy(document.getElementById('persontext').offsetHeight + document.getElementById('person').offsetHeight, window.scrollY);
}
if (jensen == winner) {
  document.getElementById('persontext').innerHTML = "You chose Jensen!";
  document.getElementById('person').innerHTML = "<img src='jensen.jpg'>";
  window.scrollBy(document.getElementById('persontext').offsetHeight + document.getElementById('person').offsetHeight, window.scrollY);
}
if (single == winner) {
  document.getElementById('persontext').innerHTML = "You chose Single!";
  document.getElementById('person').innerHTML = "<img src='single.jpg'>";
  window.scrollBy(document.getElementById('persontext').offsetHeight + document.getElementById('person').offsetHeight, window.scrollY);
}
if (griffin == winner) {
  document.getElementById('persontext').innerHTML = "You chose Griffin!";
  document.getElementById('person').innerHTML = "<img src='pirate.jpg'>";
  window.scrollBy(document.getElementById('persontext').offsetHeight + document.getElementById('person').offsetHeight, window.scrollY);
}
if (mama == winner) {
  document.getElementById('persontext').innerHTML = "You chose Mama!";
  document.getElementById('person').innerHTML = "<img src='mama2.JPG'>";
  window.scrollBy(document.getElementById('persontext').offsetHeight + document.getElementById('person').offsetHeight, window.scrollY);
}
}

