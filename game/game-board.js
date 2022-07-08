export { GameBoard };

import { Component } from "./component.js";
import { Card } from "./card.js";

class GameBoard extends Component {
  _cards = [];
  _busy = false;

  constructor(state) {
    super();

    this._gameState = state;
  }

  render() {
    this._el = document.createElement("div");
    this._el.classList.add("game__board");
    this._parent.append(this._el);

    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 6; column++) {
        const { value } = this._gameState[row][column];

        this._cards.push(new Card(row, column, value));
      }
    }

    const cardElements = this._cards.map((card) => card.render());

    this._cardMap = new Map(cardElements.map((el, i) => [el, this._cards[i]]));

    this._el.append(...cardElements);
  }

  handleClickWith(handler) {
    this._el.addEventListener("click", (event) => {
      const cardEl = event.target.closest(".game__card");

      if (this._busy || !cardEl || cardEl.classList.contains("open")) {
        return;
      }

      const { row, column } = cardEl.dataset;

      const card = this._cardMap.get(cardEl);

      const cellToRevert = handler(row, column);

      card.rotate();

      if (cellToRevert) {
        this._busy = true;

        setTimeout(() => {
          this._busy = false;
          card.rotate();

          const i = cellToRevert.row * 6 + cellToRevert.column;

          this._cards[i].rotate();
        }, 1500);
      }
    });
  }
}
