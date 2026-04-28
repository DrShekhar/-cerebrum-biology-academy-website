/**
 * Centralised Anthropic model IDs.
 * When Anthropic retires a model, change it here once — not in 40+ call-sites.
 *
 * HAIKU  — fast + cheap. Use for chat, classification, simple templating.
 * SONNET — mid-tier reasoning. Use for content generation, agents, code review.
 * OPUS   — heaviest. Reserve for hard reasoning / long-horizon tasks.
 */
export const HAIKU = 'claude-haiku-4-5-20251001'
export const SONNET = 'claude-sonnet-4-6'
export const OPUS = 'claude-opus-4-7'
