/**
 * Resolve a stored `correctAnswer` to a 0-based option index.
 *
 * The question bank is inconsistent: `correctAnswer` may be a letter label
 * ("A".."D"), the full option text ("Hypothalamus"), or a numeric index string
 * ("2"). Students always submit the selected option's numeric index, so grading
 * and result rendering must map every stored form to an index before comparing.
 *
 * Returns -1 when the answer cannot be resolved against the options.
 */
export function resolveCorrectIndex(options: unknown, correctAnswer: unknown): number {
  if (correctAnswer === null || correctAnswer === undefined) return -1

  const opts = Array.isArray(options) ? (options as unknown[]).map((o) => String(o)) : []

  // A real numeric index (actual number type, not a numeric string) — trust it.
  if (typeof correctAnswer === 'number' && Number.isInteger(correctAnswer)) {
    return correctAnswer >= 0 && (opts.length === 0 || correctAnswer < opts.length)
      ? correctAnswer
      : -1
  }

  const raw = String(correctAnswer).trim()
  if (raw === '') return -1

  // TEXT MATCH FIRST — the stored answer is most often the verbatim option text
  // (AI-authored questions store the option string). Doing this before the
  // letter/index heuristics avoids misgrading numeric-option questions
  // (options ["2","4","6"], answer "2") and single-letter-option questions
  // (options ["B","A","O"], answer "A"), where a letter/index guess is wrong.
  const textIdx = opts.findIndex((o) => o.trim().toLowerCase() === raw.toLowerCase())
  if (textIdx >= 0) return textIdx

  // Single letter label A/B/C/D... (case-insensitive) — the seed-bank convention.
  if (/^[a-zA-Z]$/.test(raw)) {
    const idx = raw.toUpperCase().charCodeAt(0) - 65
    if (idx >= 0 && (opts.length === 0 || idx < opts.length)) return idx
  }

  // Finally, a 0-based numeric index string (only when it isn't an option's text).
  if (/^\d+$/.test(raw)) {
    const idx = parseInt(raw, 10)
    return opts.length === 0 || idx < opts.length ? idx : -1
  }

  return -1
}

/**
 * True when a student's selected option index matches the stored answer key.
 * `selectedAnswer` is the 0-based index the student submitted.
 */
export function isAnswerCorrect(
  options: unknown,
  correctAnswer: unknown,
  selectedAnswer: number | null | undefined
): boolean {
  if (selectedAnswer === null || selectedAnswer === undefined) return false
  const correctIndex = resolveCorrectIndex(options, correctAnswer)
  return correctIndex >= 0 && correctIndex === selectedAnswer
}
