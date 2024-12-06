import { readFileSync } from 'fs'
import path from 'path'

const [ruleLines, pageNumbersLines] = readFileSync(path.join(__dirname, '../../src/day-5', 'input.txt'), 'utf-8').split(
  '\n\n'
)

const rules: Record<number, number[]> = {}
const rulesReverse: Record<number, number[]> = {}
const pagesList: number[][] = []

function init() {
  for (const line of ruleLines.split('\n')) {
    const [lhs, rhs] = line.split('|').map(Number)

    rules[lhs] = [...(rules[lhs] || []), rhs]
    rulesReverse[rhs] = [...(rulesReverse[rhs] || []), lhs]
  }

  for (const line of pageNumbersLines.split('\n')) pagesList.push(line.split(',').map(Number))
}

function checkPageSequence(pages: number[], ruleForPage?: number[]): boolean {
  if (pages.length === 0) return true
  if (ruleForPage === undefined) return false

  return pages.every((page) => ruleForPage.includes(page))
}

function isRightOrder(pages: number[]): number[] {
  for (const [idx, page] of pages.entries()) {
    const lhsPages = pages.slice(0, idx).reverse()
    const rhsPages = pages.slice(idx + 1)

    if (checkPageSequence(rhsPages, rules[page]) === false) return []
    if (checkPageSequence(lhsPages, rulesReverse[page]) === false) return []
  }

  return pages
}

function getMiddlePage(pageList: number[]): number {
  return pageList[Math.floor(pageList.length / 2)]
}

export function first() {
  init()

  const sum = pagesList.reduce((acc, pageList) => {
    const validPages = isRightOrder(pageList)
    return validPages.length > 0 ? acc + getMiddlePage(validPages) : acc
  }, 0)

  console.log(sum)
}
