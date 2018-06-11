// Coin data
var Coin = function Coin() {
  this.y = Math.floor(Math.random() * 10);
  this.x = Math.floor(Math.random() * 10);
  while (this.x === 0 && this.y === 0) {
    this.y = Math.floor(Math.random() * 10);
    this.x = Math.floor(Math.random() * 10);
  }
}

module.exports = Coin;