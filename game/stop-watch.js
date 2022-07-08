export { StopWatch };

import { Component } from "./component.js";

class StopWatch extends Component {
  render() {
    this._el = document.createElement("div");
    this._el.classList.add("stop-watch");
    this._parent.append(this._el);

    this._el.innerText = "00:00:00";
  }

  start() {
    this._startTime = Date.now();

    setInterval(() => this.update(), 300);
  }

  update() {
    const delta = Date.now() - this._startTime;
    
    this._el.innerText = new Date(delta).toISOString().slice(11, 19)
  }
}
