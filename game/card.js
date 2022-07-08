export {Card} 

class Card {
  constructor(row, column, value) {
    Object.assign(this, {row, column, value})
  }

  render() {
    this._el = document.createElement('div')
    this._el.classList.add('game__card')

    const {row, column, value} = this
    
    this._el.innerHTML = `
      <div class="game__card-core">
        <div class="game__card-front">${value}</div>
        <div class="game__card-back"></div>
      </div>
    ` 
    Object.assign(this._el.dataset, {row, column})

    return this._el
  } 

  rotate() {
    this._el.classList.toggle('open') 
  } 
}