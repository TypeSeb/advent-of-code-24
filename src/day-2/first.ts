import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-2', 'input.txt'), 'utf-8').split('\n')

function isIncreasing(numbers: number[]) {
  return getDiffs(numbers).every((diff) => diff >= 1 && diff <= 3)
}

function isDecreasing(numbers: number[]) {
  return getDiffs(numbers).every((diff) => diff <= -1 && diff >= -3)
}

function getDiffs(numbers: number[]) {
  const differences = []

  for (let i = 1; i < numbers.length; i++) differences.push(numbers[i] - numbers[i - 1])

  return differences
}

function analyzeSequence(numbers: number[]) {
  if (isIncreasing(numbers)) return 'safe'
  if (isDecreasing(numbers)) return 'safe'

  return 'unsafe'
}

export function first() {
  let safeCount = 0

  for (const line of lines) {
    const numbers = line.split(' ').map(Number)

    if (analyzeSequence(numbers) === 'safe') safeCount++
  }

  console.log(safeCount)
}
