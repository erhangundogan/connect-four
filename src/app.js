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

    // we have two players
    this.red = new user(this, 'red');
    this.yellow = new user(this, 'yellow');

    // who is gonna begin to game. Random...
    this.begin = [this.red, this.yellow][Math.round(Math.random(1))];
    this.turn = this.begin.color;

    // history
    this.moves = [];

    /**
     * 6: [ 0, 1, 2, 3, 4, 5 ]
     * 5: [ 0, 1, 2, 3, 4, 5 ]
     * 4: [ 0, 1, 2, 3, 4, 5 ]
     * 3: [ 0, 1, 2, 3, 4, 5 ]
     * 2: [ 0, 1, 2, 3, 4, 5 ]
     * 1: [ 0, 1, 2, 3, 4, 5 ]
     * 0: [ 0, 1, 2, 3, 4, 5 ]
     *
     * board[cols][rows]
     * board[0][0] => bottom left position
     * board[6][5] => top righ position
     *
     * @type {Array}
     */
    this.board = [];
    var col = [];
    for (var i = 0; i < 7; i++) {
      this.board.push(col);
    }

    return this;
  };
  game.prototype.yellow = typeof user;
  game.prototype.red = typeof user;
  game.prototype.events = {
    onColumnSelect: function(selectedColumn) {
      var column = -1;
      try {
        column = parseInt(selectedColumn)
      } catch(e) {
        alert('Please enter number between 0-6!');
      }

      if (column >= 0 && column < 6) {
        this.board.
        this.onUserPlay();
      }
    },

    onUserPlay: function(selectedColumn) {

    }
  };

  game.prototype.play = function() {
    var message = this.turn + ' player\'s turn. Please choose a column top play (0: leftmost, 6: rightmost)';
    var column = prompt(message, '0');
    this.events.onColumnSelect(column);
  };

  var user = function(game, color) {
    this.game = game;
    this.color = color;
    return this;
  };
  user.prototype.game = typeof game;

  var position = function(row, col) {
    this.row = row;
    this.col = col;
    return this;
  };

  global.connectFour = new game();
  global.connectFour.play();

})(window);
