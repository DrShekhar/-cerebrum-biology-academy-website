/**
 * @mention markup for staff messages and lead comments.
 *
 * Stored form: "call @[Priya Sharma](usr_abc123) about fees"
 * Display form: "call @Priya Sharma about fees"
 */

const MENTION_RE = /@\[([^\]]+)\]\(([^)\s]+)\)/g

export interface Mention {
  name: string
  userId: string
}

export function parseMentions(content: string): Mention[] {
  const mentions: Mention[] = []
  for (const match of content.matchAll(MENTION_RE)) {
    mentions.push({ name: match[1], userId: match[2] })
  }
  return mentions
}

export function mentionedUserIds(content: string): string[] {
  return Array.from(new Set(parseMentions(content).map((m) => m.userId)))
}

/** Serialize a mention for insertion into a composer. */
export function formatMention(name: string, userId: string): string {
  return `@[${name}](${userId})`
}

/** Plain-text rendering (e.g. for notification bodies). */
export function stripMentionMarkup(content: string): string {
  return content.replace(MENTION_RE, '@$1')
}

/**
 * Split content into text and mention segments for rich rendering.
 */
export function segmentContent(
  content: string
): Array<{ type: 'text'; value: string } | { type: 'mention'; name: string; userId: string }> {
  const segments: Array<
    { type: 'text'; value: string } | { type: 'mention'; name: string; userId: string }
  > = []
  let lastIndex = 0
  for (const match of content.matchAll(MENTION_RE)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ type: 'text', value: content.slice(lastIndex, index) })
    }
    segments.push({ type: 'mention', name: match[1], userId: match[2] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < content.length) {
    segments.push({ type: 'text', value: content.slice(lastIndex) })
  }
  return segments
}
