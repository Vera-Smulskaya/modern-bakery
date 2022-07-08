export {generateGameState} 

const values = 'ABCDEFGHIJKLMNOPRS'.split('')

function generateGameState() {
    const pool = [...values, ...values]
    const state = []

    for (let i = 0; i < 6; i++) {
        const row = []

        for (let j = 0; j < 6; j++) {
            row.push({value: popRandom(pool), open: false, row: i, column: j})       
        }

        state.push(row)
    }

    return state
}

function popRandom(arr) {
    const i = Math.floor(Math.random() * arr.length)

    return arr.splice(i, 1)[0]
}