import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-4', 'input.txt'), 'utf-8').split('\n')

type MapKey = `${number}|${number}`

const xmasChars = ['X', 'M', 'A', 'S'] as const
type XmasChar = (typeof xmasChars)[number]

const xmasMap: Record<MapKey, XmasChar> = {}

const getKey = (x: number, y: number): MapKey => `${x}|${y}`

const maxX = lines[0].length
const maxY = lines.length

function initXmasMap() {
  for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.split('').entries()) {
      xmasMap[`${x}|${y}`] = char as XmasChar
    }
  }
}

function isXMASChar(x: number, y: number, char: XmasChar) {
  return xmasMap[getKey(x, y)] === char
}

function checkXMASPattern(x: number, y: number, steps: [number, number][]) {
  return steps.every(([dx, dy], i) => isXMASChar(x + dx, y + dy, xmasChars[i]))
}

function generatePatterns(word: string): [number, number][][] {
  const length = word.length

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1]
  ]

  return directions.map(([dx, dy]) => Array.from({ length }, (_, i) => [i * dx, i * dy]))
}

function searchXMAS() {
  const patterns: [number, number][][] = generatePatterns(xmasChars.join(''))

  let founds = 0

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      founds += patterns
        .map((pattern) => (checkXMASPattern(x, y, pattern) ? 1 : 0))
        .reduce((a: number, b: number) => a + b, 0)
    }
  }

  return founds
}

export function first() {
  initXmasMap()
  console.log(searchXMAS())
}
