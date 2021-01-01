const files = require('../utils/files')
const path = require('path')

async function main() {
  const instructions = await files.readLines(path.resolve(__dirname, 'input.txt'))
  const regex = /(?<instr>\w{3}) (?<arg>[+-]\d+)/

  function parseInstruction(line) {
    const match = regex.exec(line)
    if (!match) {
      console.warn('ERROR: Could not parse instruction')
      process.exit(1)
    }
    return {
      instr: match.groups.instr,
      arg: eval(match.groups.arg),
    }
  }

  // returns last valid idx if not terminating
  function execute() {
    let acc = 0
    let idx = 0
    const executed = {}
    let lastExecuted = idx

    while (!executed[idx]) {
      const line = instructions[idx]
      lastExecuted = idx

      // Program terminates
      if (!line) {
        console.warn(`Program terminated, idx: ${idx}`)
        return acc
      }
      executed[idx] = line

      const { instr, op, arg } = parseInstruction(line)

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
  }

  function findCorruptedInstruction(idx, corruptedIndex) {
    if (idx === 0) {
      return corruptedIndex
    }

    for (let i = 0; i < instructions.length; i++) {
      if (idx === i) {
        continue
      }

      const difference = idx - i
      const { instr, op, arg } = parseInstruction(instructions[i])

      if (instr === 'acc') {
        if (difference === 1) {
          const result = findCorruptedInstruction(i, corruptedIndex)
          if (result != null) {
            return result
          }
        }
      } else if (instr === 'jmp') {
        if (difference === arg) {
          const result = findCorruptedInstruction(i, corruptedIndex)
          if (result != null) {
            return result
          }
        } else if (difference === 1 && corruptedIndex == null) {
          // Corrupted instruction (arg should be ignored as diff = 1, so nop)
          const result = findCorruptedInstruction(i, i)
          if (result != null) {
            return result
          }
        }
      } else if (instr === 'nop') {
        if (difference === 1) {
          const result = findCorruptedInstruction(i, corruptedIndex)
          if (result != null) {
            return result
          }
        } else if (difference === arg && corruptedIndex == null) {
          // Corrupted instruction (arg should be used as jump)
          const result = findCorruptedInstruction(i, i)
          if (result != null) {
            return result
          }
        }
      }
    }
  }

  const corruptedIndex = findCorruptedInstruction(instructions.length - 1)
  const corruptedInstruction = instructions[corruptedIndex]
  if (!corruptedInstruction) {
    console.warn('FAILED')
    process.exit(1)
  }
  let fixedInstruction = corruptedInstruction.slice(0, 3) === 'nop'
    ? corruptedInstruction.replace('nop', 'jmp')
    : corruptedInstruction.replace('jmp', 'nop')
  instructions[corruptedIndex] = fixedInstruction

  const acc = execute()
  console.warn(`The final accumulator value: ${acc}`)
}

main()
