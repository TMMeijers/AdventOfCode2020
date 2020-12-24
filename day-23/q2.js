const LinkedList = require('../utils/LinkedList')

const DEBUG = false
const MAX_LABEL = 1000 * 1000
const MAX_MOVES = 10 * 1000 * 1000

const originalCups = [3, 6, 4, 2, 8, 9, 7, 1, 5]
const allCups = Array.from({ length: MAX_LABEL }, (_, i) => i + 1 <= originalCups.length ? originalCups[i] : i + 1)
const cups = LinkedList.fromArray(allCups)

let moves = 0
let currentCup = cups.head

while (moves < MAX_MOVES)  {
  DEBUG && console.warn(`-- move ${moves}`)
  DEBUG && console.warn('Cups: ' + cups)

  const threeCups = cups.spliceFromNode(currentCup.next, 3)
  const cupsLeft = 3 - threeCups.length
  if (cupsLeft > 0) {
    threeCups.spliceFromNode(null, 0, cups.splice(0, cupsLeft))
  }
  DEBUG && console.warn('pick up: ' + threeCups)

  let destinationLabel = currentCup.value - 1 < 1 ? MAX_LABEL : currentCup.value - 1
  while (threeCups.includes(destinationLabel)) {
    destinationLabel = --destinationLabel < 1 ? MAX_LABEL : destinationLabel
  }

  DEBUG && console.warn(`destination: ${destinationLabel}\n`)

  const destinationCup = cups.find(destinationLabel)
  cups.spliceFromNode(destinationCup.next, 0, threeCups)

  currentCup = currentCup.isTail ? cups.head : currentCup.next
  moves++
  if (moves % 10000 === 0) {
    console.warn(`${moves / 1000}k moves done...`)
  }
}

const cupOne = cups.find(1)
let firstCup = cupOne.next == null ? cups.head : cupOne.next
let secondCup = firstCup.next == null ? cups.head : firstCup.next

console.warn(`Product of ${firstCup.value} and ${secondCup.value}: ${firstCup.value * secondCup.value}`)
