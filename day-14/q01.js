const files = require('../utils/files')
const path = require('path')

async function main() {
  let moves = await files.readLines(path.resolve(__dirname, 'input.txt'), (line) => {
    return line
  })

}

main()
