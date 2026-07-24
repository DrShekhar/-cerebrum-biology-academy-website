/**
 * Best-effort anonymous "lead signal" logging for the free, ungated NEET tools.
 *
 * When an anonymous visitor completes an interactive tool (rank predictor, score
 * calculator) they reveal high buying-intent data (target score / expected rank).
 * We log that silently as an anonymous lead via the existing analytics track
 * endpoint — WITHOUT ever asking for email/phone. This is fire-and-forget: it must
 * never block the UI and never throw.
 */

const ANON_ID_KEY = 'cerebrum_anon_id'

/**
 * Returns a stable anonymous id for the current browser. Reuses the site's
 * existing `freeUserId` if present, otherwise reads/creates a persisted
 * `cerebrum_anon_id`. Falls back to 'anonymous' when storage is unavailable.
 */
export function getAnonId(): string {
  if (typeof window === 'undefined') return 'anonymous'
  try {
    const existing = localStorage.getItem('freeUserId') || localStorage.getItem(ANON_ID_KEY)
    if (existing) return existing
    const generated = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem(ANON_ID_KEY, generated)
    return generated
  } catch {
    return 'anonymous'
  }
}

// Canonical session id shared with the WhatsApp tracker + visitor-journey
// system (sessionStorage 'cerebrum_session_id'), so a tool completion groups
// into the SAME anonymous session as that visitor's other intent events.
function getSessionId(): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    let sid = sessionStorage.getItem('cerebrum_session_id')
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem('cerebrum_session_id', sid)
    }
    return sid
  } catch {
    return undefined
  }
}

/**
 * Fire-and-forget POST to the analytics track endpoint recording that an
 * anonymous visitor completed a tool. Best-effort only — swallows all errors.
 *
 * @param tool - tool slug, e.g. 'neet-rank-predictor'
 * @param properties - tool inputs/outputs (expectedScore, predictedRank, etc.)
 */
export function logToolLeadSignal(tool: string, properties: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  try {
    const anonId = getAnonId()
    const sessionId = getSessionId()
    const pagePath = window.location.pathname

    // Matches the shape /api/analytics/track expects: an `activities` array
    // whose `type` becomes both eventType and eventName. Using 'tool_completed'
    // gives eventName === 'tool_completed'. Rich data goes in `metadata`.
    const payload = {
      activities: [
        {
          // 'anonymous' is intentional: the track endpoint leaves
          // analytics_events.userId NULL for it, which is what the
          // anonymous-session scoring keys on. The stable anon id lives in
          // metadata.anonId instead.
          type: 'tool_completed',
          userId: 'anonymous',
          sessionId,
          metadata: {
            tool,
            page: pagePath,
            pageTitle: typeof document !== 'undefined' ? document.title : undefined,
            anonId,
            ...properties,
          },
        },
      ],
      sessionId,
      timestamp: new Date().toISOString(),
    }

    const url = '/api/analytics/track'
    const body = JSON.stringify(payload)

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon(url, blob)
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {
        /* best-effort */
      })
    }
  } catch {
    /* best-effort — never block the UI or throw */
  }
}
