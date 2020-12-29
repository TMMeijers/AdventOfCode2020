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

      mainBag.contains.push({ amount: Number.parseInt(matches[1], 10), bag: otherBag  })
    })
  })

  function countBags(bag) {
    total = 0
    bag.contains.forEach((ref) => {
      total += ref.amount
      total += ref.amount * countBags(ref.bag)
    })
    return total
  }

  const shinyGoldBag = allBags['shiny gold bag']
  const count = countBags(shinyGoldBag)
  console.warn(`The shiny gold bag can reside in this amount of bags: ${count}`)

}

main()
