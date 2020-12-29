const files = require('../utils/files.js')
const path = require('path')

async function main() {
  const input = await files.readFileP(path.resolve(__dirname, 'input.txt'))

  const groups = input.split('\n\n').map((group) => {
    return group.split('\n').filter((person) => person !== '\n')
  })

  const sum = groups.reduce((sum, group) => {
    return sum + Object.keys(group).length
  }, 0)

  console.warn(`The sum of all group's answers is: ${sum}`)
}

main()
