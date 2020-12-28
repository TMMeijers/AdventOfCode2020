const files = require('../utils/files')
const path = require('path')

const EXPECTED_SUM = 2020

async function main() {
  const expenseList = await files.readLines(path.resolve(__dirname, 'input.txt'), (expense) => Number.parseInt(expense, 10))
  expenseList.sort((a, b) => a - b)

  for (i = 0; i < expenseList.length - 2; i++) {
    const a = expenseList[i]
    let begin = i + 1
    let end = expenseList.length - 1

    while (begin < end) {
      const b = expenseList[begin]
      const c = expenseList[end]

      const sum = a + b + c
      if (sum === EXPECTED_SUM) {
        console.log(`Expenses ${a}, ${b} and ${c} combine to ${EXPECTED_SUM}. Product: ${a * b * c}`)
        process.exit(0)
      } else if (sum > EXPECTED_SUM) {
        end--
      } else {
        begin++
      }
    }
  }
}

main()
