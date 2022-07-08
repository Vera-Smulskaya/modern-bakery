export { Game };

import { StopWatch } from "./stop-watch.js";
import { GameBoard } from "./game-board.js";
import { generateGameState } from "./generate.js";
import { Component } from "./component.js";

class Game extends Component {
  _state = generateGameState();
  _openCell = null;

  _act = (row, column) => {
    const cell = this._state[row][column];
   
    cell.open = true;

    if (this.isFinished) {
      this.end()
    } else if (this._openCell) {
      if (cell.value !== this._openCell.value) {
        const {row, column} = this._openCell

        setTimeout(() => {
          cell.open = false
        }, 1500)

        this._openCell = null

        return {row, column}
      } else {
        this._openCell = null
      }
    } else {
      this._openCell = cell;
    }
  };

  constructor() {
    super();

    this._stopWatch = new StopWatch();
    this._board = new GameBoard(this._state);
  }

  render() {
    this._el = document.createElement("div");
    this._el.classList.add("game");
    this._parent.append(this._el);

    this._stopWatch.settleAt(this._el);
    this._board.settleAt(this._el);
    this._stopWatch.render();
    this._board.render();
  }

  start() {
    this._stopWatch.start();
    this._board.handleClickWith(this._act);
  }

  end() {
    
  }

  get isFinished() {
    return this._state.every(row => row.every(cell => cell.open))
  }
}
