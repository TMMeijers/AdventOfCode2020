const files = require('../utils/files')
const path = require('path')

async function main() {
  const regex = /^(?:mask = (?<mask>[01X]+))|(?:mem\[(?<address>\d+)\] = (?<value>\d+))$/

  let commands = await files.readLines(path.resolve(__dirname, 'input.txt'), (line) => regex.exec(line).groups)

  const memory = {}
  let currentMask = 0

  function getMaskedAddress(mask, address) {
    const binary = Number.parseInt(address, 10).toString(2)

    let rBin = binary.split('').reverse()
    const rMask = currentMask.split('').reverse()

    return rMask.map((mask, index) => mask === '0' ? rBin[index] || '0' : mask).reverse().join('')
  }

  commands.forEach(({ mask, address, value }) => {
    if (mask) {
      currentMask = mask
      return
    }

    const maskedAddress = getMaskedAddress(currentMask, address)

    function storeValues(idx = 0, partialMask = '') {
      if (idx === maskedAddress.length) {
        memory[Number.parseInt(partialMask, 2)] = Number.parseInt(value, 10)
        return
      }

      const bit = maskedAddress.charAt(idx++)
      if (bit === 'X') {
        storeValues(idx, partialMask + '0')
        storeValues(idx, partialMask + '1')
      } else {
        storeValues(idx, partialMask + bit)
      }
    }
    storeValues()
  })

  const sum = Object.values(memory).reduce((sum, val) => sum + val, 0)
  console.warn(`The final sum is: ${sum}`)
}

main()
