const files = require('../utils/files')
const path = require('path')

const PREAMBLE_COUNT = 25
async function main() {
  const numbers = await files.readLines(path.resolve(__dirname, 'input.txt'), (n) => Number.parseInt(n, 10))

  function findIncorrectIndex() {
    for (let idx = PREAMBLE_COUNT; idx < numbers.length; idx++) {
      const current = numbers[idx]
      const preamble = numbers.slice(idx - PREAMBLE_COUNT, idx + PREAMBLE_COUNT)

      let found = false
      for (let n1 of preamble) {
        for (let n2 of preamble) {
          if (n1 !== n2 && n1 + n2 === current) {
            found = true
            break
          }
        }

        if (found) {
          break
        }
      }

      if (!found) {
        return idx
      }
    }
  }

  const i0 = findIncorrectIndex()
  const n0 = numbers[i0]

  for (let i1 = i0 - 1; i1 >= 0; i1--) {
    let sum = 0
    let i2 = i1 - 1
    while (sum < n0) {
      sum += numbers[i2--]
    }

    if (sum === n0) {
      const range = numbers.slice(i2 + 1, i1).sort((a, b) => a - b)
      const n1 = range[0]
      const n2 = range[range.length - 1]
      console.warn(`The sum of ${n1} and ${n2} is ${n1 + n2}`)
      process.exit(0)
    }
  }
}

main()
