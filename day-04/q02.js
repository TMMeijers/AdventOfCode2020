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
    const passportFields = Object.keys(passport)
    const baseValidation = passportFields.length === FIELDS.length || (passportFields.length ===  FIELDS.length - 1 && passport[OPTIONAL_FIELD] == null)
    if (!baseValidation) {
      return correct
    }
    for (let i = 0; i < passportFields.length; i++) {
      const field = passportFields[i]
      let value = passport[field]
      switch (field) {
        case 'byr':
          value = Number.parseInt(value, 10)
          if (value < 1920 || value > 2002) {
            return correct
          }
          break
        case 'iyr':
          value = Number.parseInt(value, 10)
          if (value < 2010 || value > 2020) {
            return correct
          }
          break
        case 'eyr':
          value = Number.parseInt(value, 10)
          if (value < 2020 || value > 2030) {
            return correct
          }
          break
        case 'hgt':
          if (!/^(\d{3}cm|\d{2}in)$/.test(value)) {
            return correct
          }
          break
        case 'hcl':
          if (!/^#[0-9a-f]{6}$/.test(value)) {
            return correct
          }
          break
        case 'ecl':
          if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)) {
            return correct
          }
          break
        case 'pid':
          if (!/^[0-9]{9}$/.test(value)) {
            return correct
          }
          break
        case 'cid':
      }
    }
    return ++correct
  }, 0)

  console.warn(`Number of correct passports: ${correct}`)
}

main()
