const files = require('../utils/files')
const range = require('../utils/range')
const path = require('path')

async function main() {
  let rows = await files.readLines(path.resolve(__dirname, 'input.txt'), (row) => row.split(''))

  function countAdjecent(x, y) {
    const counts = { '#': 0, 'L': 0, '.': 0 }
    for (row of range(3, y - 1)) {
      for (column of range(3, x - 1)) {
        if (rows[row]?.[column] && (column != x || row != y)) {
          counts[rows[row][column]]++
        }
      }
    }
    return counts
  }

  let changes = true
  while (changes) {
    changes = false
    const newRows = Array.from({ length: rows.length }, (_, i) => Array.from(rows[i]))

    for (y in rows) {
      for (x in rows[y]) {
        const original = rows[y][x]
        if (original === '.') {
          continue
        }

        const adjecent = countAdjecent(x, y)
        if (original === 'L' && adjecent['#'] === 0) {
          changes = true
          newRows[y][x] = '#'
        } else if (original === '#' && adjecent['#'] >= 4) {
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
