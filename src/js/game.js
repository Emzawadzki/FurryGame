var Coin = require('./coin');
var Furry = require('./furry');
var score = require('./dom_elements').score;
var startBtn = require('./dom_elements').startBtn;
var overallScore = require('./dom_elements').overallScore;
var gameOverBox = require('./dom_elements').gameOverBox;

var Game = function Game() {
  this.board = document.querySelectorAll('#board>div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  this.index = function (x, y) {
    return x + (y * 10);
  }
  this.gameRunningInterval = '';
  var self = this;
  // Showing Furry
  this.showFurry = function (x, y) {
    this.board[this.index(x, y)].classList.add('furry');
  }

  // Initial Furry position
  this.showFurry(this.furry.x, this.furry.y)

  // Hiding Furry
  this.hideFurry = function () {
    this.board[this.index(this.furry.x, this.furry.y)].classList.remove('furry');
  }

  // Showing coin
  this.showCoin = function () {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
  }

  // Hiding coin
  this.hideCoin = function () {
    this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
  }

  // Furry moving
  this.furryMove = function () {
    this.hideFurry();
    if (this.furry.direction === "right") {
      this.furry.x += 1;
    } else if (this.furry.direction === "down") {
      this.furry.y += 1;
    } else if (this.furry.direction === "left") {
      this.furry.x -= 1;
    } else if (this.furry.direction === "up") {
      this.furry.y -= 1;
    }
    if (this.furry.x === 10 || this.furry.x === -1 || this.furry.y === 10 || this.furry.y === -1) {
      this.gameOver();
      return;
    }
    this.getCoin();
    this.showFurry(this.furry.x, this.furry.y);
  }

  // Furry change direction
  this.changeDirection = function (key) {
    var self = this;
    switch (key.which) {
      case 37:
      case 65:
        self.furry.direction = 'left';
        break;
      case 38:
      case 87:
        self.furry.direction = 'up';
        break;
      case 39:
      case 68:
        self.furry.direction = 'right';
        break;
      case 40:
      case 83:
        self.furry.direction = 'down';
        break;

    }
  }

  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    self.changeDirection(e);
  });

  // Gaining score
  this.getCoin = function () {
    if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
      this.hideCoin();
      this.coin = new Coin();
      this.showCoin();
      this.score++;
      score.innerText = this.score;
    }
  }

  // Game starting
  this.startGame = function () {
    var self = this;
    this.gameRunningInterval = setInterval(function () {
      self.furryMove();
    }, 250);
  }

  // Game over
  this.gameOver = function () {
    clearInterval(this.gameRunningInterval);
    startBtn.disabled = false;
    this.hideCoin();
    overallScore.innerText = this.score;
    gameOverBox.classList.remove('hiddenDown');
  }

}

module.exports = Game;