import { readFileSync } from 'fs'
import path from 'path'

const line = readFileSync(path.join(__dirname, '../../src/day-9', 'input.txt'), 'utf-8')

function parseInput(input: string): number[][] {
  const numArray: number[][] = []
  let currentIndex = 0
  let isFileSection = true

  for (const char of input) {
    const value = +char
    const filledArray = Array(value).fill(isFileSection ? currentIndex : -1)
    numArray.push(filledArray)

    if (isFileSection) currentIndex++
    isFileSection = !isFileSection
  }

  return numArray
}

function calculateSum(numArray: number[][]): number {
  const flatArray = numArray.flat()
  return flatArray.reduce((sum, value, index) => {
    if (value !== -1) sum += index * value
    return sum
  }, 0)
}

function redistributeFreeSpace(numArray: number[][]): void {
  let rightIndex = numArray.length - 1
  let leftIndex = 0

  const isFirstItemFreeSpace = () => numArray[leftIndex][0] === -1
  const isArrayFreeSpace = (array: number[]) => array.every((value) => value === -1)

  while (leftIndex < rightIndex) {
    leftIndex++

    if (isFirstItemFreeSpace() === false) continue

    for (let i = 0; i < numArray[leftIndex].length && leftIndex < rightIndex; i++) {
      let rightItem: number | undefined

      while (rightItem === undefined) {
        rightItem = numArray[rightIndex].pop()

        if (rightItem === undefined) {
          rightIndex--

          while (isArrayFreeSpace(numArray[rightIndex])) rightIndex--
        }
      }

      numArray[leftIndex][i] = rightItem
    }
  }
}

export function first(): void {
  const numArray = parseInput(line)
  redistributeFreeSpace(numArray)

  const sum = calculateSum(numArray)

  console.log(sum)
}
