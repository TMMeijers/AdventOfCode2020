const files = require('../utils/files')
const path = require('path')

async function main() {
  const instructions = await files.readLines(path.resolve(__dirname, 'input.txt'))

  let acc = 0
  let idx = 0
  const executed = {}

  while (!executed[idx]) {
    const line = instructions[idx]
    executed[idx] = line


    const match = /(?<instr>\w{3}) (?<arg>[+-]\d+)/.exec(line)
    let { instr, arg } = match.groups
    arg = eval(arg)

    switch(instr) {
      case 'acc':
        acc = acc + arg
      case 'nop':
        idx++
        break
      case 'jmp':
        idx = idx + arg
        break
    }
  }

  console.warn(`The final accumulator value: ${acc}`)
}

main()
