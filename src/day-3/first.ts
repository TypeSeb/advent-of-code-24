import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-3', 'input.txt'), 'utf-8').split('\n')

function calculateMul(str: string) {
  const lhs = +str.substring(4, str.indexOf(','))
  const rhs = +str.substring(str.indexOf(',') + 1, str.length - 1)

  return lhs * rhs
}

export function first() {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g

  let sum = 0
  for (const line of lines) {
    const matches = line.match(regex)

    if (matches) for (const match of matches) sum += calculateMul(match)
  }

  console.log(sum)
}
