require ('../scss/main.scss')

document.addEventListener('DOMContentLoaded', function () {

  var score = require('./dom_elements').score;
  var startBtn = require('./dom_elements').startBtn;
  var overallScore = require('./dom_elements').overallScore;
  var gameOverBox = require('./dom_elements').gameOverBox;

  var Furry = require('./furry');
  var Coin = require('./coin');
  var Game = require('./game');

  // Start game event
  startBtn.addEventListener('click', function (e) {
    var recentGame = new Game();
    recentGame.showCoin();
    recentGame.startGame();
    startBtn.disabled = true;
    score.innerText = recentGame.score;
    gameOverBox.classList.add('hiddenDown');
  });
})