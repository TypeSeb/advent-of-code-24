import { readFileSync } from 'fs'
import path from 'path'

const input = readFileSync(path.join(__dirname, '../../src/day-1', 'input.txt'), 'utf-8').split('\n')

export function second() {
  const lhsNumbers: number[] = []
  const rhsMap: Record<number, number> = {}

  input.forEach((line) => {
    const [leftSide, ...others] = line.split(' ').map((x) => Number(x.trim()))

    lhsNumbers.push(leftSide)

    const rhs = others.pop()!

    if (rhsMap[rhs]) rhsMap[rhs] += 1
    else rhsMap[rhs] = 1
  })

  const diff = lhsNumbers.reduce((acc, lhs) => {
    const numberCnt = rhsMap[lhs]

    if (numberCnt) return (acc += lhs * numberCnt)

    return acc
  }, 0)

  console.log(diff)
}
