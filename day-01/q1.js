const files = require('../utils/files')
const path = require('path')

const EXPECTED_SUM = 2020

async function main() {
  const expenseList = await files.readLines(path.resolve(__dirname, 'input.txt'), (expense) => Number.parseInt(expense, 10))
  expenseList.sort((a, b) => a - b)

  const half = EXPECTED_SUM / 2
  const halfIndex = expenseList.findIndex((a) => a >= EXPECTED_SUM / 2)
  const lower = expenseList.slice(0, halfIndex)
  const higher = expenseList.slice(halfIndex)

  if (higher[0] + higher[1] === EXPECTED_SUM) {
    console.log(`Lame, answer is ${(EXPECTED_SUM / 2) ^ 2 }`)
    process.exit(0)
  }

  let iterations = 0
  lower.forEach((a) => {
    let searching = true
    let copy = higher.slice()

    while (copy.length) {
      let index = Math.floor(copy.length / 2)
      b = copy[index]

      const sum = a + b

      if (sum === EXPECTED_SUM) {
        console.log(`Expenses ${a} and ${b} combine to ${EXPECTED_SUM}. Product: ${a * b}`)
        process.exit(0)
      } else if (sum > EXPECTED_SUM) {
        copy = copy.slice(0, index)
      } else {
        copy = copy.slice(index + 1)
      }
    }
  })
}

main()
