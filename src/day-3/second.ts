import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-3', 'input.txt'), 'utf-8').split('\n')

function calculateMul(str: string) {
  const lhs = +str.substring(4, str.indexOf(','))
  const rhs = +str.substring(str.indexOf(',') + 1, str.length - 1)

  return lhs * rhs
}

function calculateMuls(str: string) {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
  const matches = str.match(regex)

  let sum = 0

  if (matches) for (const match of matches) sum += calculateMul(match)

  return sum
}

export function second() {
  const stop = "don't()"
  const start = 'do()'
  let oneLine = lines.join('')

  const [starting, ...donts] = oneLine.split(stop)

  let sum = calculateMuls(starting)

  for (const dont of donts) {
    const doIdx = dont.indexOf(start)

    if (doIdx === -1) continue

    const substring = dont.substring(doIdx + start.length)
    sum += calculateMuls(substring)
  }

  console.log(sum)
}
