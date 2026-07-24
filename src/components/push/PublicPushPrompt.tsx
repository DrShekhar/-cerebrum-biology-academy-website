'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, X } from 'lucide-react'

/**
 * Anonymous web-push opt-in for public marketing pages.
 *
 * Captures a re-contactable lead WITHOUT asking for email or phone: a browser
 * push subscription we can later message (demo reminders, offers). Soft,
 * timed, dismissible — shown only to anonymous-ish visitors on public pages,
 * never on app/admin/dashboard routes, and never if already subscribed,
 * blocked, or previously dismissed.
 *
 * Reuses the same /api/push/subscribe flow as EnablePushButton, and passes the
 * current page as lead context so the subscription is logged as an anonymous
 * lead with the page it opted in from.
 */

const DISMISS_KEY = 'cerebrum_push_prompt_dismissed_at'
const DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 14 // re-ask no sooner than 14 days
const SHOW_DELAY_MS = 22_000
const SCROLL_TRIGGER = 0.45 // or when they've scrolled ~45% of the page

// Routes where the prompt should never appear (logged-in app surfaces).
const SUPPRESSED_PREFIXES = [
  '/dashboard',
  '/admin',
  '/counselor',
  '/consultant',
  '/student',
  '/teacher',
  '/parent',
  '/auth',
  '/login',
  '/signup',
  '/checkout',
  '/purchase',
]

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const output = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i)
  return output
}

export function PublicPushPrompt() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const suppressedRoute = SUPPRESSED_PREFIXES.some((p) => pathname?.startsWith(p))

  const dismiss = useCallback(() => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (suppressedRoute) return
    let cancelled = false
    let shownTimer: ReturnType<typeof setTimeout> | undefined
    let onScroll: (() => void) | undefined

    const maybeShow = async () => {
      if (cancelled) return
      // Feature support
      if (
        typeof window === 'undefined' ||
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('Notification' in window)
      ) {
        return
      }
      if (Notification.permission === 'denied') return

      // Recently dismissed?
      try {
        const at = Number(localStorage.getItem(DISMISS_KEY) || 0)
        if (at && Date.now() - at < DISMISS_COOLDOWN_MS) return
      } catch {
        /* ignore */
      }

      // Server push configured?
      try {
        const res = await fetch('/api/push/subscribe')
        if (!res.ok) return
      } catch {
        return
      }

      // Already subscribed?
      try {
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        if (sub) return
      } catch {
        /* proceed — treat as not subscribed */
      }

      if (!cancelled) setVisible(true)
    }

    // Trigger on a delay OR meaningful scroll, whichever comes first.
    shownTimer = setTimeout(maybeShow, SHOW_DELAY_MS)
    onScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      if (scrolled >= SCROLL_TRIGGER) {
        maybeShow()
        if (onScroll) window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelled = true
      if (shownTimer) clearTimeout(shownTimer)
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [suppressedRoute, pathname])

  const enable = useCallback(async () => {
    setBusy(true)
    try {
      const perm = await Notification.requestPermission()
      if (perm !== 'granted') {
        dismiss()
        return
      }
      const keyRes = await fetch('/api/push/subscribe')
      const keyJson = await keyRes.json()
      const publicKey: string | undefined = keyJson?.publicKey
      if (!publicKey) {
        dismiss()
        return
      }
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      })
      let sessionId: string | undefined
      try {
        sessionId =
          localStorage.getItem('cerebrum_session_id') ||
          sessionStorage.getItem('cerebrum_session_id') ||
          undefined
      } catch {
        /* ignore */
      }
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: sub.toJSON(),
          context: { page: pathname, source: 'public-push-prompt', sessionId },
        }),
      })
      setDone(true)
      setTimeout(() => setVisible(false), 2600)
    } catch {
      dismiss()
    } finally {
      setBusy(false)
    }
  }, [dismiss, pathname])

  if (suppressedRoute || !visible) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[95] mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:left-4 sm:right-auto"
      role="dialog"
      aria-label="Get free NEET Biology updates"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
      >
        <X className="h-4 w-4" />
      </button>

      {done ? (
        <div className="flex items-start gap-3 pr-4">
          <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-100">
            <Bell className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">You&apos;re in! 🎉</p>
            <p className="mt-0.5 text-xs text-slate-600">
              We&apos;ll send you high-yield NEET Biology tips and demo openings — no spam.
            </p>
          </div>
        </div>
      ) : (
        <div className="pr-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal-100">
              <Bell className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Free NEET Biology tips — no email needed
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Get the chapter-weightage cheat sheet, a daily high-yield MCQ, and demo-class
                openings straight to this browser. Just tap Allow — no signup, no number.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={enable}
              disabled={busy}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              <Bell className="h-4 w-4" />
              {busy ? 'Enabling…' : 'Allow updates'}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicPushPrompt
