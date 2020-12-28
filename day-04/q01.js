const files = require('../utils/files.js')
const path = require('path')

const FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']
const OPTIONAL_FIELD = 'cid'

async function main() {
  const input = await files.readFileP(path.resolve(__dirname, 'input.txt'))

  const passports = input.split('\n\n').map((passportLines) => {
    const passportFields = passportLines.split(/\n| /)
    return passportFields.reduce((passport, pair) => {
      const [field, value] = pair.split(':')
      if (field && value) {
        passport[field] = value
      }
      return passport
    }, {})
  })

  const correct = passports.reduce((correct, passport) => {
    const numFields = Object.keys(passport).length
    if (
      numFields === FIELDS.length
      || (numFields ===  FIELDS.length - 1 && passport[OPTIONAL_FIELD] == null)
    ) {
      correct++
    }
    return correct
  }, 0)

  console.warn(`Number of correct passports: ${correct}`)
}

main()
