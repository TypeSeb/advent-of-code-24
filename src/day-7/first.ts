import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-7', 'input.txt'), 'utf-8').split('\n')

type Operators = '+' | '*'

function getPermutations(characters: Operators[], count: number): string[] {
  if (count === 0) return ['']

  const permutations: string[] = []

  const smallerPermutations = getPermutations(characters, count - 1)

  for (const smaller of smallerPermutations) {
    for (const char of characters) {
      permutations.push(smaller + char)
    }
  }

  return permutations
}

function getExpression(numbers: number[], operatorsStr: string): string {
  const operators = operatorsStr.split('').map((op) => op as Operators)

  let expression = `${numbers[0]}`

  for (let i = 0; i < operators.length; i++) expression += ` ${operators[i]} ${numbers[i + 1]}`

  return expression
}

function evaluateLeftToRight(expression: string): number {
  const tokens = expression.split(' ')

  let result = parseFloat(tokens[0])

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i]
    const operand = parseFloat(tokens[i + 1])

    if (operator === '+') result += operand
    else if (operator === '*') result *= operand
  }

  return result
}

function isEquationValid(equation: string): number {
  const [result, ...others] = equation.split(':')
  const values = others[0].trim().split(' ').map(Number)
  const operatorsCount = values.length - 1

  const possibleOperators = getPermutations(['+', '*'], operatorsCount)

  for (const possibleOperator of possibleOperators) {
    const expression = getExpression(values, possibleOperator)
    const evalResult = evaluateLeftToRight(expression)

    if (evalResult === +result) return evalResult
  }

  return 0
}

export function first() {
  const sum = lines.reduce((acc, line) => acc + isEquationValid(line), 0)

  console.log(sum)
}
