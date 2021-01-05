const files = require('../utils/files')
const range = require('../utils/range')
const path = require('path')


async function main() {
  let rows = await files.readLines(path.resolve(__dirname, 'input.txt'), (row) => row.split(''))

  function countTaken(x, y) {
    let taken = 0

    for (const [xInc, yInc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
      let newX = Number.parseInt(x, 10)
      let newY = Number.parseInt(y, 10)
      let looking = true
      while (looking) {
        newX += xInc
        newY += yInc
        const seenSeat = rows[newY]?.[newX]
        if (seenSeat === '#') {
          taken++
          looking = false
        } else if (seenSeat === 'L' || !seenSeat) {
          looking = false
        }
      }
    }

    return taken
  }

  let changes = true
  while (changes) {
    changes = false
    const newRows = Array.from({ length: rows.length }, (_, i) => Array.from(rows[i]))

    for (let y in rows) {
      for (let x in rows[y]) {
        const original = rows[y][x]
        if (original === '.') {
          continue
        }

        const taken = countTaken(x, y)
        if (original === 'L' && taken === 0) {
          changes = true
          newRows[y][x] = '#'
        } else if (original === '#' && taken >= 5) {
          changes = true
          newRows[y][x] = 'L'
        }
      }
    }

    rows = newRows
  }

  function countSeatsTaken() {
    return rows.reduce((rowSum, row) => rowSum + row.reduce((columnSum, seat) => columnSum + (seat === '#'), 0), 0)
  }

  console.warn(`Numbers of seats taken: ${countSeatsTaken()}`)
}

main()
