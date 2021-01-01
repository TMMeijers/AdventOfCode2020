const files = require('../utils/files.js')
const path = require('path')

async function main() {
  const input = await files.readFileP(path.resolve(__dirname, 'input.txt'))

  const groups = input.split('\n\n').map((group) => {
    return group.split('\n').filter((person) => person !== '\n' && person !== '')
  })

  function getConsistentAnswers(groupAnswers) {
    const possibleAnswers = Object.keys(groupAnswers.reduce((map, personAnswers) => {
      personAnswers.split('').forEach((answer) => map[answer] = true)
      return map
    }, {}))

    return possibleAnswers.reduce((consistent, answer) => {
      return consistent + groupAnswers.every((personAnswers) => personAnswers.indexOf(answer) >= 0)
    }, 0)
  }

  const sum = groups.reduce((sum, group) => {
    return sum + getConsistentAnswers(group)
  }, 0)

  console.warn(`The sum of all group's answers is: ${sum}`)
}

main()
