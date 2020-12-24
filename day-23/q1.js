const cups = [3, 6, 4, 2, 8, 9, 7, 1, 5]
let moves = 0
const MAX_MOVES = 100

let currentIndex = 0
while (moves < MAX_MOVES)  {
  currentLabel = cups[currentIndex]
  console.warn(`-- move ${++moves}`)
  console.warn('Cups: ' + cups.map((c, i) => i === currentIndex ? `(${c})` : `${c}`).join(' '))

  const threeCups = cups.splice(currentIndex + 1, 3)
  if (threeCups.length !== 3) {
    threeCups.push(...cups.splice(0, 3 - threeCups.length))
  }

  console.warn(`pick up: ${threeCups.join(' ')}`)

  destinationIndex = null
  destinationLabel = currentLabel
  while (destinationIndex === null) {
    destinationLabel = destinationLabel === 1 ? 9 : --destinationLabel
    if (!threeCups.includes(destinationLabel)) {
      destinationIndex = cups.findIndex((label) => label === destinationLabel)
    }
  }

  console.warn(`destination: ${destinationLabel}\n`)
  cups.splice(destinationIndex + 1, 0, ...threeCups)
  const newIndex = cups.findIndex((label) => label === currentLabel)
  currentIndex = newIndex === 8 ? 0 : newIndex + 1
}

const indexCupOne = cups.findIndex((label) => label === 1)
const cupOrder = cups.slice(indexCupOne + 1).concat(cups.slice(0, indexCupOne))
console.warn(`Cups after cup with label 1: ${cupOrder.join('')}`)
