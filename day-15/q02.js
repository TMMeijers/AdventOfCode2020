const files = require('../utils/files')
const path = require('path')

async function main() {
  const input = '5,1,9,18,13,8,0'.split(',')

  let t = 0
  const n = 30000000
  const numbers = new Array(n)

  let number
  while (t !== n) {
    t++
    if (input[t - 1]) {
      number = input[t - 1]
    } else {
      const timestamps = numbers[number]
      number = timestamps.length === 1 ? '0' : timestamps[timestamps.length - 1] - timestamps[timestamps.length - 2]
    }

    if (!numbers[number]) {
      numbers[number] = []
    }

    numbers[number].push(t)

    if (t % 300000 === 0) {
      process.stdout.write(`\r${t / 300000}%`)
    }
  }

  console.warn(`\nThe last spoken number was ${number}`)
}

main()
