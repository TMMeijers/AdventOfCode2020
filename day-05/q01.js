const files = require('../utils/files.js')
const path = require('path')

const ROWS = 128
const COLUMNS = 8

async function main() {
  const steps = await files.readLines(path.resolve(__dirname, 'input.txt'), (line) => {
    const steps = line.split('')
    const rowSteps = steps.splice(0, 7)
    return {
      rowSteps,
      columnSteps: steps
    }
  })

  const highest = steps.reduce((highest, { rowSteps, columnSteps }) => {
    let low = 0
    let high = ROWS
    rowSteps.forEach((step) => {
      const half = (high - low) / 2
      if (step === 'F') {
        high -= half
      } else {
        low += half
      }
    })
    const row = low

    low = 0
    high = COLUMNS
    columnSteps.forEach((step) => {
      const half = (high - low) / 2
      if (step === 'L') {
        high -= half
      } else {
        low += half
      }
    })
    const column = low
    const seatId = row * 8 + column

    return seatId > highest ? seatId : highest
  }, 0)

  console.warn(`Highest seat id: ${highest}`)
}

main()
