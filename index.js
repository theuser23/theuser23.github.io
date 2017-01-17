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
    window.alert("Forrest");
}
if (dan == winner) {
  window.alert("Dan");
}
if (jensen == winner) {
  window.alert("Jensen");
}
if (single == winner) {
  window.alert("Single");
}
if (griffin == winner) {
  window.alert("Griffin");
}
if (mama == winner) {
  window.alert("Mama");
}
}
