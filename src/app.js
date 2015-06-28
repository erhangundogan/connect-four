/**
 * connect-four
 * app.js
 * core game logic
 * 2015 Erhan Gundogan <erhan.gundogan at gmail.com>
 */

(function(global) {

  'use strict'

  var game = function() {
    this.begin = new Date();
    this.red = new user(this, 'red');
    this.yellow = new user(this, 'yellow');
    return this;
  };
  game.prototype.yellow = typeof user;
  game.prototype.red = typeof user;

  var user = function(game, color) {
    this.game = game;
    this.color = color;
    return this;
  };

  global.connectFour = game;

})(window);
