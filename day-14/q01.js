const files = require('../utils/files')
const path = require('path')

async function main() {
  const regex = /^(?:mask = (?<mask>[01X]+))|(?:mem\[(?<address>\d+)\] = (?<value>\d+))$/

  let commands = await files.readLines(path.resolve(__dirname, 'input.txt'), (line) => regex.exec(line).groups)

  const memory = {}
  let currentMask = 0
  commands.forEach(({ mask, address, value }) => {
    if (mask) {
      currentMask = mask
      return
    }

    const binary = Number.parseInt(value, 10).toString(2)

    let rBin = binary.split('').reverse()
    const rMask = currentMask.split('').reverse()

    const maskedBin = rMask.map((mask, index) => mask !== 'X' ? mask : rBin[index] || '0').reverse().join('')
    const maskedValue = Number.parseInt(maskedBin, 2)
    memory[address] = maskedValue
  })

  const sum = Object.values(memory).reduce((sum, val) => sum + val, 0)
  console.warn(`The final sum is: ${sum}`)
}

main()
