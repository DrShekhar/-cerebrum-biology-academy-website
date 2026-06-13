#!/usr/bin/env node
/**
 * Rebalance correctAnswer positions in 11 olympiad batch files.
 *
 * BACKGROUND: A scan on 2026-05-21 found 11 of 82 olympiad batch files where
 * the correctAnswer position is concentrated on one option (>40% on a single
 * letter, mostly B). The likely cause: AI-generation pipeline didn't shuffle
 * answer positions after generating the question content. Memory's "Lessons
 * Learned" already flagged this: "Always shuffle answer distributions after
 * generating MCQ batches."
 *
 * WHAT THIS SCRIPT DOES:
 * - Only touches questions where correctAnswer is a single letter A/B/C/D
 *   AND options[] has exactly 4 entries. MTF / T-F multi-letter / non-standard
 *   questions (e.g., "TFTT", "TTFT") are LEFT ALONE.
 * - For each file, builds a "deck" of target positions with as-even-as-possible
 *   distribution (e.g., for 19 eligible questions: 5A, 5B, 5C, 4D), shuffles
 *   the deck deterministically (seeded RNG), and assigns one target per
 *   eligible question.
 * - Swaps options[currentCorrectIdx] ↔ options[targetIdx] and updates
 *   the correctAnswer field. Question stem, explanation, metadata, and
 *   non-MCQ questions are NOT modified.
 *
 * IDEMPOTENCY: Re-running the script produces the same result (seeded RNG)
 * which means the second run will leave the file unchanged — re-runs are safe.
 *
 * USAGE: node scripts/rebalance-olympiad-answers.mjs
 *
 * AFTER RUNNING: re-seed the database via prisma/seed-mcq-batches.ts to
 * propagate the changes. The JSON files alone do not affect production.
 */

import fs from 'node:fs'
import path from 'node:path'

const FILES = [
  'src/data/mcq-batches/olympiad/unit2-cell/campbell-ch06-12-cell-advanced-wave1b.json',
  'src/data/mcq-batches/olympiad/unit2-cell/campbell-ch06-12-cell-integration-wave1c.json',
  'src/data/mcq-batches/olympiad/unit2-cell/campbell-ch08-metabolism.json',
  'src/data/mcq-batches/olympiad/unit2-cell/campbell-ch09-cellular-respiration-wave1.json',
  'src/data/mcq-batches/olympiad/unit2-cell/campbell-ch09-cellular-respiration.json',
  'src/data/mcq-batches/olympiad/unit2-cell/campbell-ch11-cell-communication-wave1.json',
  'src/data/mcq-batches/olympiad/unit4-evolution/campbell-ch22-descent-modification.json',
  'src/data/mcq-batches/olympiad/unit6-plant-physiology/campbell-ch35-39-plant-advanced-wave2b.json',
  'src/data/mcq-batches/olympiad/unit6-plant-physiology/campbell-ch35-39-plant-physiology-wave2.json',
  'src/data/mcq-batches/olympiad/unit7-animal-physiology/campbell-ch41-animal-nutrition-wave1.json',
  'src/data/mcq-batches/olympiad/unit7-animal-physiology/campbell-ch47-49-nervous-sensory-motor-wave1.json',
]

// Linear-congruential RNG with fixed seed → reproducible deterministic output
let seed = 0x1a2b3c4d
function rand() {
  seed = (seed * 1664525 + 1013904223) & 0xffffffff
  return ((seed >>> 0) % 1_000_000) / 1_000_000
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const LETTERS = ['A', 'B', 'C', 'D']
const letterToIdx = (l) => LETTERS.indexOf(l)
const idxToLetter = (i) => LETTERS[i]

function isEligible(q) {
  if (!q || typeof q !== 'object') return false
  if (typeof q.correctAnswer !== 'string') return false
  if (q.correctAnswer.length !== 1) return false
  if (!LETTERS.includes(q.correctAnswer)) return false
  if (!Array.isArray(q.options) || q.options.length !== 4) return false
  return true
}

const cwd = process.cwd()
console.log(`Working dir: ${cwd}\n`)

let totalEligible = 0
let totalSwapped = 0
let totalUnchanged = 0
const fileSummary = []

for (const relPath of FILES) {
  const abs = path.join(cwd, relPath)
  if (!fs.existsSync(abs)) {
    console.error(`MISSING: ${relPath}`)
    continue
  }
  const raw = fs.readFileSync(abs, 'utf-8')
  const data = JSON.parse(raw)
  const questions = data.questions
  if (!Array.isArray(questions)) {
    console.error(`SKIP: ${relPath} (no questions[])`)
    continue
  }

  const eligibleIdxs = []
  questions.forEach((q, i) => {
    if (isEligible(q)) eligibleIdxs.push(i)
  })

  if (eligibleIdxs.length === 0) {
    console.log(`SKIP: ${path.basename(relPath)} (no eligible MCQ)`)
    continue
  }

  const n = eligibleIdxs.length
  const perOption = Math.floor(n / 4)
  const remainder = n % 4
  const deck = []
  for (let i = 0; i < 4; i++) {
    const count = perOption + (i < remainder ? 1 : 0)
    for (let k = 0; k < count; k++) deck.push(i)
  }
  shuffle(deck)

  const before = { A: 0, B: 0, C: 0, D: 0 }
  const after = { A: 0, B: 0, C: 0, D: 0 }
  let swappedInFile = 0

  eligibleIdxs.forEach((qIdx, deckIdx) => {
    const q = questions[qIdx]
    const currentLetter = q.correctAnswer
    before[currentLetter]++

    const currentIdx = letterToIdx(currentLetter)
    const targetIdx = deck[deckIdx]

    if (currentIdx !== targetIdx) {
      ;[q.options[currentIdx], q.options[targetIdx]] = [q.options[targetIdx], q.options[currentIdx]]
      q.correctAnswer = idxToLetter(targetIdx)
      swappedInFile++
    }
    after[q.correctAnswer]++
  })

  fs.writeFileSync(abs, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  totalEligible += n
  totalSwapped += swappedInFile
  totalUnchanged += n - swappedInFile

  fileSummary.push({
    file: path.basename(relPath),
    n,
    before,
    after,
    swapped: swappedInFile,
  })
}

// Print results table
console.log(`${'FILE'.padEnd(60)} ${'  N'} ${'BEFORE          '} ${'AFTER           '} ${'SWAP'}`)
console.log('-'.repeat(110))
for (const s of fileSummary) {
  const beforeStr = `A${s.before.A} B${s.before.B} C${s.before.C} D${s.before.D}`.padEnd(16)
  const afterStr = `A${s.after.A} B${s.after.B} C${s.after.C} D${s.after.D}`.padEnd(16)
  console.log(
    `${s.file.padEnd(60)} ${String(s.n).padStart(3)}  ${beforeStr} ${afterStr} ${s.swapped}`
  )
}
console.log('-'.repeat(110))
console.log(
  `\nTotal: ${totalEligible} eligible questions across ${FILES.length} files. ` +
    `${totalSwapped} swapped, ${totalUnchanged} already at target position.\n` +
    `Re-seed the DB via prisma/seed-mcq-batches.ts to propagate changes.`
)
