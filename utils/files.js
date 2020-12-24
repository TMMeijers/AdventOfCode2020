const fs = require('fs');

async function readLines(path, transform = null) {
  const data = await readFileP(path)
  return data.split('\n').reduce((list, item) => {
    if (item.trim()) {
      let data = transform ? transform(item) : item
      list.push(data)
    }
    return list
  }, [])
}

async function readFileP(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      return resolve(data)
    })
  })
}

module.exports.readLines = readLines
module.exports.readFileP = readFileP
