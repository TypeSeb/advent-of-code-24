import { readFileSync } from 'fs'
import path from 'path'

const [ruleLines, pageNumbersLines] = readFileSync(path.join(__dirname, '../../src/day-5', 'input.txt'), 'utf-8').split(
  '\n\n'
)

const rules: [number, number][] = []
const pagesList: number[][] = []

function init() {
  for (const line of ruleLines.split('\n')) {
    const [lhs, rhs] = line.split('|').map(Number)
    rules.push([lhs, rhs])
  }

  for (const line of pageNumbersLines.split('\n')) {
    pagesList.push(line.split(',').map(Number))
  }
}

function isRightOrder(pages: number[]): true | number {
  for (let i = 0; i < rules.length; i++) {
    const [lhs, rhs] = rules[i]

    const lhsIndex = pages.indexOf(lhs)
    const rhsIndex = pages.indexOf(rhs)

    if (lhsIndex !== -1 && rhsIndex !== -1 && lhsIndex > rhsIndex) {
      return Math.min(lhsIndex, rhsIndex)
    }
  }

  return true
}

function sortPages(pages: number[]): number[] {
  const sortedPages = [...pages]

  sortedPages.sort((a, b) => {
    for (const [lhs, rhs] of rules) {
      if (a === lhs && b === rhs) return -1
      if (a === rhs && b === lhs) return 1
    }

    return 0
  })

  return sortedPages
}

function getMiddlePage(pages: number[]): number {
  return pages[Math.floor(pages.length / 2)]
}

export function second() {
  init()

  const middlePages: number[] = []

  for (const pages of pagesList) {
    const result = isRightOrder(pages)

    if (result !== true) {
      const sortedPages = sortPages(pages)
      middlePages.push(getMiddlePage(sortedPages))
    }
  }

  console.log(middlePages.reduce((sum, page) => sum + page, 0))
}
