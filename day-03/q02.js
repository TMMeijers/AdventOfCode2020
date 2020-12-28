const files = require('../utils/files.js')
const path = require('path')

async function main() {
  const angles = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]
  const rowsOfTrees = await files.readLines(path.resolve(__dirname, 'input.txt'))
  const width = rowsOfTrees[0].length

  const treeHits = angles.map(({ right, down }) => {
    let x = 0
    let treesHit = 0

    for (let y = 0; y < rowsOfTrees.length; y += down) {
      treesHit += rowsOfTrees[y].charAt(x) === '#'
      x = (x + right) % width
    }

    return treesHit
  })

  console.warn(`Amount of trees hit on the way down: ${treeHits.join(', ')}`)
  const product = treeHits.reduce((product, hit) => product * hit, 1)
  console.warn(`Product of tree hits: ${product}`)
}

main()
