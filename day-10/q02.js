const files = require('../utils/files')
const path = require('path')

const PREAMBLE_COUNT = 25
async function main() {
  const adapters = await files.readLines(path.resolve(__dirname, 'input.txt'), (n) => Number.parseInt(n, 10))

  adapters.sort((a, b) => a - b)
  adapters.unshift(0)
  adapters.push(adapters[adapters.length - 1] + 3)

  const adapterMap = {}
  function getCombinations(idx) {
    if (idx === adapters.length - 1) {
      return 1
    }

    const currentJolts = adapters[idx]
    const currentIndex = idx
    if (adapterMap[idx]) {
      return adapterMap[idx]
    }

    let sum = 0
    while (adapters[++idx] - currentJolts <= 3) {
      sum += getCombinations(idx)
    }
    adapterMap[currentIndex] = sum
    return sum
  }

  const totalCombinations = getCombinations(0)
  console.warn(`The total amoun of combinations: ${totalCombinations}`)
}

main()
