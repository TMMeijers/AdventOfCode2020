const files = require('../utils/files.js')
const path = require('path')

const STEP_RIGHT = 3
const STEP_DOWN = 1

async function main() {
  const rowsOfTrees = await files.readLines(path.resolve(__dirname, 'input.txt'))
  const width = rowsOfTrees[0].length

  let x = 0
  let treesHit = 0

  for (let y = 0; y < rowsOfTrees.length; y += STEP_DOWN) {
    treesHit += rowsOfTrees[y].charAt(x) === '#'
    x = (x + STEP_RIGHT) % width
  }

  console.warn(`Amount of trees hit on the way down: ${treesHit}`)
}

main()
