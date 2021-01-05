const files = require('../utils/files')
const path = require('path')

async function main() {
  const timetable = '29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,409,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,19,x,x,x,23,x,x,x,x,x,x,x,353,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41'

  const busses = timetable.split(',').reduce((arr, bus, i) => {
    if (bus !== 'x') {
      arr.push({
        bus: bus,
        offset: Number.parseInt(i),
      })
    }
    return arr
  }, [])

  let step = 1
  let t = 0

  // Appareantly chinese remainder theorem.. Stole solution
  busses.forEach(({ bus, offset }) => {
    while (true) {
      t += step
      if ((t + offset) % bus === 0) {
        step = step * bus
        break
      }
    }
  })

  console.warn(`The timestamp is ${t}`)
}

main()
