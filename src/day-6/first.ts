import { readFileSync } from 'fs'
import path from 'path'

const inputFilePath = path.join(__dirname, '../../src/day-6', 'input.txt')
const lines = readFileSync(inputFilePath, 'utf-8').trim().split('\n')

type MapKey = `${number}|${number}`
type AllowedChars = '.' | '#' | '^'
type Directions = 'up' | 'down' | 'left' | 'right'

const map: Record<MapKey, AllowedChars> = {}
const visited: Record<MapKey, boolean> = {}
let steps = 0

const getKey = (x: number, y: number): MapKey => `${x}|${y}`

const startPosition = { x: -1, y: -1 }
let startDirection: Directions = 'up'

const directionOffsets: Record<Directions, [number, number]> = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0]
}

const nextDirection: Record<Directions, Directions> = {
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up'
}

function initMap(): void {
  for (const [y, line] of lines.entries()) {
    for (const [x, char] of [...line].entries()) {
      map[getKey(x, y)] = char as AllowedChars
      if (char === '^') {
        startPosition.x = x
        startPosition.y = y
      }
    }
  }
}

function nextPosition({ x, y }: { x: number; y: number }, direction: Directions): { x: number; y: number } {
  const [dx, dy] = directionOffsets[direction]
  return { x: x + dx, y: y + dy }
}

function isOutOfBounds({ x, y }: { x: number; y: number }): boolean {
  return map[getKey(x, y)] === undefined
}

function isBlocked({ x, y }: { x: number; y: number }, direction: Directions): boolean {
  const nextPos = nextPosition({ x, y }, direction)
  return map[getKey(nextPos.x, nextPos.y)] === '#'
}

function step(position: { x: number; y: number }): { x: number; y: number } {
  const key = getKey(position.x, position.y)

  if (!visited[key]) {
    visited[key] = true
    steps++
  }

  return position
}

function walkThroughMap(position: { x: number; y: number }, direction: Directions): void {
  while (true) {
    const nextPos = nextPosition(position, direction)

    if (isOutOfBounds(nextPos)) {
      step(position)
      return
    }

    if (isBlocked(position, direction)) direction = nextDirection[direction]
    else position = step(nextPos)
  }
}

export function first(): void {
  initMap()
  walkThroughMap(startPosition, startDirection)
  console.log(steps)
}
