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

    // spawn html5 WebWorker if it is supported
    if (global.Worker) {
      this.worker = new global.Worker('src/task.js');
    } else {
      this.worker = null;
    }

    // we have two players
    this.red = new user(this, 'red');
    this.yellow = new user(this, 'yellow');

    // who is gonna begin to game. Random...
    this.begin = [this.red, this.yellow][Math.round(Math.random(1))];
    this.turn = this.begin.color;

    /**
     * 5: [ 0, 1, 2, 3, 4, 5, 6 ]
     * 4: [ 0, 1, 2, 3, 4, 5, 6 ]
     * 3: [ 0, 1, 2, 3, 4, 5, 6 ]
     * 2: [ 0, 1, 2, 3, 4, 5, 6 ]
     * 1: [ 0, 1, 2, 3, 4, 5, 6 ]
     * 0: [ 0, 1, 2, 3, 4, 5, 6 ]
     *
     * board[rows][cols]
     * board[0][0] => bottom left position
     * board[5][0] => top left position
     * board[5][6] => top right position
     * board[0][6] => bottom right position
     *
     * @type {Array}
     */
    this.moves = [];
    this.board = [];
    var row = [null, null, null, null, null, null, null];
    for (var i = 0; i < 6; i++) {
      this.board.push(row);
    }

    // keep column last index
    this.lastColIndex = [-1, -1, -1, -1, -1, -1, -1];

    return this;
  };
  game.prototype.yellow = typeof user;
  game.prototype.red = typeof user;
  game.prototype.render = function(renderPosition, renderColor) {
    // jQuery can be replaced with document.createFragment combined with document.getElementById
    if (global.jQuery) {
      if (renderPosition && renderColor) {
        // render specific cell
        var cell = '#r' + renderPosition.row + 'c' + renderPosition.col;
        global.$(cell).addClass(renderColor);

      } else {
        // render all
        var board = global.$('<table></table>');
        for (var row = 5; row >= 0; row--) {
          var rowElement = global.$('<tr></tr>').attr('id', 'r' + row);

          for (var col = 0; col < 7; col++) {
            var colElement = global.$('<td></td>').attr('id', 'r' + row + 'c' + col);
            var colColor = this.board[row][col];
            if (colColor) {
              colElement.addClass(colColor);
            }
            rowElement.append(colElement);
          }
          board.append(rowElement);
        }
        var colNumbers = global
          .$('<tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>');
        board.append(colNumbers);

        var continuePlay = global
          .$('<input type="button" value="Continue" onclick="window.connectFour.play()">');

        global.$('#board').empty().append(board).append(continuePlay);
      }
    }
  };

  game.prototype.events = {
    onColumnSelect: function(selectedColumn) {
      var column = -1;
      try {
        column = parseInt(selectedColumn)
      } catch(e) {
        alert('Please enter number between 0-6!');
        return this.play();
      }

      if (column >= 0 && column <= 6) {
        this.events.onUserPlay.call(this, selectedColumn);
      } else {
        alert('Please enter number between 0-6!');
        return this.play();
      }
    },

    onUserPlay: function(selectedColumn) {
      // increase column +1
      var selectedColumnNumber = parseInt(selectedColumn);
      if (this.lastColIndex[selectedColumnNumber] === 5) {
        alert('This column is full. Please enter another column!');
        return this.play();
      }
      var activeRow = ++this.lastColIndex[selectedColumnNumber];

      // res, yellow
      var activePlayer = this.turn;

      // which position played
      var movement = new position(activeRow, selectedColumn);

      // set board position red or yellow
      this.board[activeRow][selectedColumn] = activePlayer;

      // history
      this.moves.push(movement);

      // change player turn
      this.turn = this.turn === 'red' ? 'yellow' : 'red';

      // fire render, calculation events etc.
      this.events.onBoardChange.apply(this, [movement, activePlayer]);

      if (this.worker) {
        this.worker.postMessage(this.board);
      } else {
        // TODO: implement internal calculation logic
      }
    },

    onBoardChange: function(currentPosition, color) {
      this.render(currentPosition, color);
      this.play();
    }
  };

  game.prototype.play = function() {
    var message = this.turn + ' player\'s turn. Please choose a column top play (0:leftmost, 6:rightmost, cancel:stop)';
    var column = prompt(message, '0');
    if (!column) {
      return;
    }
    this.events.onColumnSelect.call(this, column);
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

})(window);


$(function() {
  if (window.connectFour) {
    window.connectFour.render();
    window.connectFour.play();
  }
});