const files = require('../utils/files')
const path = require('path')

const PREAMBLE_COUNT = 25
async function main() {
  const numbers = await files.readLines(path.resolve(__dirname, 'input.txt'), (n) => Number.parseInt(n, 10))

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
      console.warn(`First incorrect number found: ${current}`)
      break
    }
  }
}

main()
