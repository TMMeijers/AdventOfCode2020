const files = require('../utils/files')
const path = require('path')

const PREAMBLE_COUNT = 25
async function main() {
  const adapters = await files.readLines(path.resolve(__dirname, 'input.txt'), (n) => Number.parseInt(n, 10))

  adapters.sort((a, b) => a - b)

  const diffs = { 1: Number(adapters[0] === 1), 2: 0, 3: Number(adapters[0] === 3) + 1 }
  for (let i = 0; i < adapters.length - 1; i++) {
    diffs[adapters[i + 1] - adapters[i]]++
  }

  console.warn(`The product of ${diffs[1]} and ${diffs[3]} is ${diffs[1] * diffs[3]}`)
}

main()
