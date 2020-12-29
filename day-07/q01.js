const files = require('../utils/files')
const path = require('path')

async function main() {
  const regex = /^(?<main>.*?) contain (?:(\d+[^,.]+)(?:, |\.))+$/

  function getBagName(bag) {
    return bag.endsWith('s') ? bag.slice(0, -1) : bag
  }

  const allBags = {}

  await files.readLines(path.resolve(__dirname, 'input.txt'), (line) => {
    let [firstBag, rest] = line.split(' contain ')

    mainBagName = getBagName(firstBag)
    if (!allBags[mainBagName]) {
      allBags[mainBagName] = {
        name: mainBagName,
        contains: [],
        in: []
      }
    }
    const mainBag = allBags[mainBagName]

    const otherBags = rest.slice(0, -1).split(', ')
    otherBags.forEach((bag) => {
      if (bag === 'no other bags') {
        return
      }

      const amountAndName = getBagName(bag)
      const regex = /^(\d+) (.*)$/
      const matches = regex.exec(amountAndName)
      const otherBagName = matches[2]


      if (!allBags[otherBagName]) {
        allBags[otherBagName] = {
          name: otherBagName,
          contains: [],
          in: []
        }
      }
      otherBag = allBags[otherBagName]
      otherBag.in.push(mainBag)

      mainBag.contains.push({ amount: matches[1], bag: otherBag  })
    })
  })

  const countedBags = {}
  function getContainedIn(bag) {
    countedBags[bag.name] = true
    bag.in.forEach(getContainedIn)
  }

  const shinyGoldBag = allBags['shiny gold bag']
  getContainedIn(shinyGoldBag)
  let count = Object.keys(countedBags).length - 1

  console.warn(`The shiny gold bag can reside in this amount of bags: ${count}`)

}

main()
