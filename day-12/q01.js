const files = require('../utils/files')
const path = require('path')

async function main() {
  let moves = await files.readLines(path.resolve(__dirname, 'input.txt'), (line) => {
    const [direction, ...rest] = line.split('')
    return {
      direction,
      units: Number.parseInt(rest.join(''), 10)
    }
  })

  // N:0, E: 1, S: 2, W: 3
  const headings = ['N', 'E', 'S', 'W']
  let heading = 1
  let north = 0
  let east = 0

  moves.forEach(({ direction, units }) => {
    switch (direction) {
      case 'R':
        heading = (heading + units / 90) % 4
        break
      case 'L':
        heading = (4 + heading - units / 90) % 4
        break
      case 'N':
        north += units
        break
      case 'S':
        north -= units
        break
      case 'E':
        east += units
        break
      case 'W':
        east -= units
        break
      case 'F':
        switch (headings[heading]) {
          case 'N':
            north += units
            break
          case 'E':
            east += units
            break
          case 'S':
            north -= units
            break
          case 'W':
            east -= units
            break
        }
        break
    }
  })

  console.warn(`Final position N${north} - E${east}. MH distance: ${Math.abs(north) + Math.abs(east)}`)
}

main()
