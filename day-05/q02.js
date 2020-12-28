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

  const seatIds = steps.reduce((seatIds, { rowSteps, columnSteps }) => {
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

    seatIds.push(seatId)
    return seatIds
  }, [])

  seatIds.sort((a, b) => a - b)

  for (let i = 0; i < seatIds.length - 1; i++) {
    const seat = seatIds[i]
    if (seat + 1 !== seatIds[i + 1] && seat + 2 === seatIds[i + 1]) {
      console.warn(`Your seat id is ${seat + 1}`)
    }
  }
}

main()
