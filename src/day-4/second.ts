import { readFileSync } from 'fs'
import path from 'path'

const lines = readFileSync(path.join(__dirname, '../../src/day-4', 'input.txt'), 'utf-8').split('\n')

type MapKey = `${number}|${number}`

const xmasMap: Record<MapKey, 'M' | 'A' | 'S'> = {}

const getKey = (x: number, y: number): MapKey => `${x}|${y}`

const maxX = lines[0].length
const maxY = lines.length

function initXmasMap() {
  for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.split('').entries()) {
      xmasMap[`${x}|${y}`] = char as 'M' | 'A' | 'S'
    }
  }
}

function isM(x: number, y: number) {
  return xmasMap[getKey(x, y)] === 'M'
}
function isA(x: number, y: number) {
  return xmasMap[getKey(x, y)] === 'A'
}
function isS(x: number, y: number) {
  return xmasMap[getKey(x, y)] === 'S'
}

function checkXMASDiagonal(x: number, y: number) {
  if (isM(x - 1, y - 1) === false) return false
  if (isA(x + 0, y + 0) === false) return false
  if (isS(x + 1, y + 1) === false) return

  return true
}

function checkXMASDiagonalReverse(x: number, y: number) {
  if (isM(x + 1, y + 1) === false) return false
  if (isA(x - 0, y - 0) === false) return false
  if (isS(x - 1, y - 1) === false) return false

  return true
}

function checkXMASDiagonal2(x: number, y: number) {
  if (isM(x - 1, y + 1) === false) return false
  if (isA(x + 0, y - 0) === false) return false
  if (isS(x + 1, y - 1) === false) return false

  return true
}

function checkXmasDiagonalReverse2(x: number, y: number) {
  if (isM(x + 1, y - 1) === false) return false
  if (isA(x - 0, y + 0) === false) return false
  if (isS(x - 1, y + 1) === false) return false

  return true
}

function searchXMAX() {
  let founds = 0

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (
        (checkXMASDiagonal(x, y) || checkXMASDiagonalReverse(x, y)) &&
        (checkXMASDiagonal2(x, y) || checkXmasDiagonalReverse2(x, y))
      )
        founds++
    }
  }

  return founds
}

export function second() {
  initXmasMap()
  console.log(searchXMAX())
}
