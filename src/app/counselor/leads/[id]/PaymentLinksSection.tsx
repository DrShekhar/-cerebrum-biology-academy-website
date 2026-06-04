'use client'

import { useCallback, useEffect, useState } from 'react'
import { CreditCard, Plus, Copy, ExternalLink, Check, Loader2, X } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { showToast } from '@/lib/toast'

type Provider = 'RAZORPAY' | 'CASHFREE'
type Currency = 'INR' | 'USD'
type Status = 'ACTIVE' | 'PAID' | 'PARTIALLY_PAID' | 'EXPIRED' | 'CANCELLED'

interface PaymentLink {
  id: string
  amount: string | number
  currency: Currency
  description: string
  provider: Provider
  shortUrl: string
  status: Status
  expiresAt: string
  paidAt: string | null
  paidAmount: string | number | null
  remindersSent: number
  createdAt: string
}

const STATUS_STYLES: Record<Status, { label: string; bg: string; text: string }> = {
  ACTIVE: { label: 'Active', bg: 'bg-blue-100', text: 'text-blue-700' },
  PAID: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-700' },
  PARTIALLY_PAID: { label: 'Partial', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  EXPIRED: { label: 'Expired', bg: 'bg-gray-100', text: 'text-gray-600' },
  CANCELLED: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700' },
}

function formatAmount(amount: string | number, currency: Currency) {
  const n = typeof amount === 'string' ? Number(amount) : amount
  const symbol = currency === 'USD' ? '$' : '₹'
  return `${symbol}${n.toLocaleString(currency === 'USD' ? 'en-US' : 'en-IN')}`
}

export function PaymentLinksSection({ leadId }: { leadId: string }) {
  const [links, setLinks] = useState<PaymentLink[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch(`/api/counselor/payment-links?leadId=${leadId}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to load payment links')
      const json = await res.json()
      setLinks(json.data ?? [])
    } catch (err) {
      console.error(err)
      showToast.error('Could not load payment links')
    } finally {
      setLoading(false)
    }
  }, [leadId])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Payment Links
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Send Link
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : links.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">No payment links yet for this lead.</p>
      ) : (
        <div className="space-y-2">
          {links.map((link) => (
            <PaymentLinkRow key={link.id} link={link} />
          ))}
        </div>
      )}

      {showModal && (
        <CreatePaymentLinkModal
          leadId={leadId}
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false)
            fetchLinks()
          }}
        />
      )}
    </div>
  )
}

function PaymentLinkRow({ link }: { link: PaymentLink }) {
  const [copied, setCopied] = useState(false)
  const style = STATUS_STYLES[link.status]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      showToast.error('Copy failed — long-press the link to copy')
    }
  }

  return (
    <div className="border border-gray-100 rounded-lg p-3 hover:border-indigo-200 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {formatAmount(link.amount, link.currency)}
            </span>
            <span
              className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded ${style.bg} ${style.text}`}
            >
              {style.label}
            </span>
            <span className="text-[10px] text-gray-400">{link.provider}</span>
          </div>
          <p className="text-xs text-gray-600 truncate mt-0.5">{link.description}</p>
          <p className="text-[11px] text-gray-400 mt-1">
            {link.status === 'PAID' && link.paidAt
              ? `Paid ${formatDistanceToNow(new Date(link.paidAt), { addSuffix: true })}`
              : link.status === 'ACTIVE'
                ? `Expires ${format(new Date(link.expiresAt), 'MMM d, h:mm a')}`
                : format(new Date(link.createdAt), 'MMM d')}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={copy}
            title="Copy link"
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <a
            href={link.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open"
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

function CreatePaymentLinkModal({
  leadId,
  onClose,
  onCreated,
}: {
  leadId: string
  onClose: () => void
  onCreated: () => void
}) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<Currency>('INR')
  const [description, setDescription] = useState('Course fee — Cerebrum Biology Academy')
  const [provider, setProvider] = useState<Provider>('RAZORPAY')
  const [expiryDays, setExpiryDays] = useState<1 | 3 | 7 | 30>(7)
  const [notifySms, setNotifySms] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const amountNum = Number(amount)
    if (!amountNum || amountNum <= 0) {
      setError('Enter a valid amount')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/counselor/payment-links/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          amount: amountNum,
          currency,
          description,
          provider,
          expiryDays,
          notifySms,
          notifyEmail,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to create link')
      }
      showToast.success('Payment link created')
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create link')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Send Payment Link</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="50000"
                required
              />
            </div>
            <div className="w-24">
              <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => {
                  const next = e.target.value as Currency
                  setCurrency(next)
                  if (next === 'USD') setProvider('RAZORPAY')
                }}
                className="w-full px-2 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={description}
              maxLength={200}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as Provider)}
                disabled={currency === 'USD'}
                className="w-full px-2 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              >
                <option value="RAZORPAY">Razorpay</option>
                <option value="CASHFREE">Cashfree</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Expires in</label>
              <select
                value={expiryDays}
                onChange={(e) => setExpiryDays(Number(e.target.value) as 1 | 3 | 7 | 30)}
                className="w-full px-2 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              Notify via SMS
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              Notify via Email
            </label>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 rounded px-2 py-1.5">{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-md"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Create &amp; Share
          </button>
        </div>
      </form>
    </div>
  )
}
