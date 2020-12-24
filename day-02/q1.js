const files = require('../utils/files')
const path = require('path')

const EXPECTED_SUM = 2020

async function main() {
  const regex = /(?<min>\d+)-(?<max>\d+) (?<char>\w): (?<pw>[^\n]*\n?)/

  let correct = 0
  const counter = function parsePasswordLine(line) {
    const { min, max, char, pw } = regex.exec(line).groups

    const matchPw = new RegExp(`^([^${char}]*${char}){${min},${max}}[^${char}]*$`)
    correct += matchPw.test(pw)
  }

  await files.readLines(path.resolve(__dirname + '/input.txt'), counter)

  console.warn(`Number of correct items: ${correct}`)
}

main()
