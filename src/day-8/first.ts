import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-8', 'input.txt'), 'utf-8').split('\n')

type MapKey = `${number}|${number}`

type Point = { x: number; y: number }

const map: Record<MapKey, string> = {}
const antennas: Record<string, Point[]> = {}

const getKey = (x: number, y: number): MapKey => `${x}|${y}`

const maxX = lines[0].length
const maxY = lines.length

function initMap() {
  for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.split('').entries()) {
      map[`${x}|${y}`] = char

      const antennasVal = antennas[char]
      if (antennasVal) antennasVal.push({ x, y })
      else antennas[char] = [{ x, y }]
    }
  }
}

function scaleVector(v: Point, scale: number): Point {
  return { x: v.x * scale, y: v.y * scale }
}

function addPoints(p1: Point, p2: Point): Point {
  return { x: p1.x + p2.x, y: p1.y + p2.y }
}

function subtractPoints(p1: Point, p2: Point): Point {
  return { x: p1.x - p2.x, y: p1.y - p2.y }
}

function calculateNewPoints(pointA: Point, pointB: Point): { lhs: Point; rhs: Point } {
  const vector: Point = { x: pointB.x - pointA.x, y: pointB.y - pointA.y }

  const scaledVector = scaleVector(vector, 1)

  const newP1 = subtractPoints(pointA, scaledVector)
  const newP2 = addPoints(pointB, scaledVector)

  return { lhs: newP1, rhs: newP2 }
}

function calculateAntinodes() {
  for (const [antenna, points] of Object.entries(antennas)) {
    if (antenna !== '.') {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const lhs = points[i]
          const rhs = points[j]
          const { lhs: lhsNew, rhs: rhsNew } = calculateNewPoints(lhs, rhs)

          if (map[getKey(lhsNew.x, lhsNew.y)]) map[getKey(lhsNew.x, lhsNew.y)] = '#'
          if (map[getKey(rhsNew.x, rhsNew.y)]) map[getKey(rhsNew.x, rhsNew.y)] = '#'
        }
      }
    }
  }
}

export function first() {
  initMap()
  calculateAntinodes()

  const sum = Object.values(map).filter((char) => char === '#').length

  console.log(sum)
}
