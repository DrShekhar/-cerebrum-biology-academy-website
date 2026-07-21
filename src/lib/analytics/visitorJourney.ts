/**
 * First-party visitor-journey tracker (session-scoped, client-only).
 *
 * Records the sequence of pages a visitor has viewed this session — landing
 * page, referrer, and the ordered path list — in sessionStorage. This is the
 * "context of the pages they visited" that gets attached to a WhatsApp-click
 * intent (and can be attached to any lead), so a counselor sees, e.g.:
 *   California hub → Orange County → 6-month prep plan → clicked WhatsApp.
 *
 * Purely additive + best-effort: every function is guarded and never throws,
 * so a storage failure can never affect page rendering or the WhatsApp flow.
 */

const KEY = 'cerebrum_journey'
const MAX_PAGES = 25

interface JourneyStore {
  landingPage: string
  firstSeenAt: string
  referrer: string
  pages: { path: string; at: string }[]
}

export interface VisitorJourneySummary {
  landingPage: string
  /** Ordered list of pathnames viewed this session. */
  path: string[]
  pageCount: number
  firstSeenAt: string
  referrer: string
}

/** Append the current page to the session journey (dedupes consecutive repeats). */
export function recordPageView(path: string): void {
  if (typeof window === 'undefined' || !path) return
  try {
    const raw = window.sessionStorage.getItem(KEY)
    const store: JourneyStore = raw
      ? (JSON.parse(raw) as JourneyStore)
      : {
          landingPage: path,
          firstSeenAt: new Date().toISOString(),
          referrer: document.referrer || '',
          pages: [],
        }

    const last = store.pages[store.pages.length - 1]
    if (!last || last.path !== path) {
      store.pages.push({ path, at: new Date().toISOString() })
      if (store.pages.length > MAX_PAGES) store.pages = store.pages.slice(-MAX_PAGES)
    }
    window.sessionStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    // storage unavailable / quota — ignore
  }
}

/** Read the session journey summary, or null if none / unavailable. */
export function getVisitorJourney(): VisitorJourneySummary | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(KEY)
    if (!raw) return null
    const store = JSON.parse(raw) as JourneyStore
    return {
      landingPage: store.landingPage,
      path: store.pages.map((p) => p.path),
      pageCount: store.pages.length,
      firstSeenAt: store.firstSeenAt,
      referrer: store.referrer,
    }
  } catch {
    return null
  }
}
