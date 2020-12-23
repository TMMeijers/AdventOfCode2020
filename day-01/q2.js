const fs = require('fs')

const EXPECTED_SUM = 2020

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const expenseList = data.split('\n').reduce((list, expense, i) => {
    if (expense.trim()) {
      list.push(Number.parseInt(expense, 10))
    }
    return list
  }, [])
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
})
