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
  const wp = [1, 10, 0, 0]

  const ship = [0, 0, 0, 0]

  moves.forEach(({ direction, units }) => {
    switch (direction) {
      case 'R':
        let right = units / 90
        while (right-- > 0) {
          wp.unshift(wp.pop())
        }
        break
      case 'L':
        let left = units / 90
        while (left-- > 0) {
          wp[3] = wp.shift()
        }
        break
      case 'N':
        wp[0] += units
        break
      case 'S':
        wp[2] += units
        break
      case 'E':
        wp[1] += units
        break
      case 'W':
        wp[3] += units
        break
      case 'F':
        wp.forEach((nm, dir) => {
          ship[dir] += nm * units
        })
        break
    }
  })

  console.warn(`Final position N${ship[0]} E${ship[1]} S${ship[2]} W${ship[3]}. MH distance: ${Math.abs(ship[0] - ship[2]) + Math.abs(ship[1] - ship[3])}`)
}

main()
