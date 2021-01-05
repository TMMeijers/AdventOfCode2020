const files = require('../utils/files')
const path = require('path')

async function main() {
  let timestamp = 1000511
  const timetable = '29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,409,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,19,x,x,x,23,x,x,x,x,x,x,x,353,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41'

  const busses = timetable.split(',').reduce((arr, bus) => {
    if (bus !== 'x') {
      arr.push(Number.parseInt(bus, 10))
    }
    return arr
  }, [])

  let shortestWait = Infinity
  let bus

  busses.forEach((id) => {
    const wait = bus - (timestamp % bus)
    if (wait < shortestWait) {
      bus = id
      shortestWait = wait
    }
  })

  console.warn(`The fastest bus is ${bus} with a ${shortestWait} minute wait. Product: ${bus * shortestWait}`)
}

main()
