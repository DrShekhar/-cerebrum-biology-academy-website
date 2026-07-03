'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff, Check } from 'lucide-react'

/**
 * Enable/disable web-push notifications for this browser.
 * Silently renders nothing when the browser doesn't support push or the
 * server has no VAPID keys configured.
 */

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const output = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i)
  return output
}

type Status = 'unsupported' | 'checking' | 'off' | 'on' | 'denied' | 'unavailable'

export function EnablePushButton({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<Status>('checking')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const check = async () => {
      if (
        typeof window === 'undefined' ||
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('Notification' in window)
      ) {
        setStatus('unsupported')
        return
      }
      // Is push configured server-side?
      try {
        const res = await fetch('/api/push/subscribe')
        if (!res.ok) {
          setStatus('unavailable')
          return
        }
      } catch {
        setStatus('unavailable')
        return
      }
      if (Notification.permission === 'denied') {
        setStatus('denied')
        return
      }
      try {
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        setStatus(sub ? 'on' : 'off')
      } catch {
        setStatus('off')
      }
    }
    check()
  }, [])

  const enable = async () => {
    setBusy(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setStatus(permission === 'denied' ? 'denied' : 'off')
        return
      }
      const keyRes = await fetch('/api/push/subscribe').then((r) => r.json())
      if (!keyRes.success) {
        setStatus('unavailable')
        return
      }
      const reg = await navigator.serviceWorker.ready
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyRes.publicKey) as BufferSource,
      })
      const save = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription }),
      })
      setStatus(save.ok ? 'on' : 'off')
    } catch {
      setStatus('off')
    } finally {
      setBusy(false)
    }
  }

  const disable = async () => {
    setBusy(true)
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await fetch('/api/push/subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        }).catch(() => {})
        await sub.unsubscribe()
      }
      setStatus('off')
    } catch {
      /* keep current state */
    } finally {
      setBusy(false)
    }
  }

  if (status === 'unsupported' || status === 'unavailable' || status === 'checking') return null

  if (status === 'denied') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs text-gray-400 ${className}`}>
        <BellOff className="h-3.5 w-3.5" /> Notifications blocked in browser settings
      </span>
    )
  }

  if (status === 'on') {
    return (
      <button
        onClick={disable}
        disabled={busy}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-60 ${className}`}
        title="Disable notifications on this device"
      >
        <Check className="h-3.5 w-3.5" /> Notifications on
      </button>
    )
  }

  return (
    <button
      onClick={enable}
      disabled={busy}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 ${className}`}
    >
      <Bell className="h-3.5 w-3.5" /> {busy ? 'Enabling…' : 'Enable notifications'}
    </button>
  )
}
