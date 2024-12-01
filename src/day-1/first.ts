import { readFileSync } from 'fs'
import path from 'path'

const input = readFileSync(path.join(__dirname, '../../src/day-1', 'input.txt'), 'utf-8').split('\n')

export function first() {
  const lhsNumbers: number[] = []
  const rhsNumbers: number[] = []

  input.forEach((line) => {
    const [leftSide, ...others] = line.split(' ').map((x) => Number(x.trim()))

    lhsNumbers.push(leftSide)
    rhsNumbers.push(others.pop()!)
  })

  lhsNumbers.sort((a, b) => a - b)
  rhsNumbers.sort((a, b) => a - b)

  const diff = lhsNumbers.reduce((acc, lhs, idx) => {
    const rhs = rhsNumbers[idx]
    return acc + Math.abs(rhs - lhs)
  }, 0)

  console.log(diff)
}
