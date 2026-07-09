'use client'

/**
 * CouponsPanel — self-contained coupons manager.
 * Lists existing coupons (code, discount, uses, expiry, active toggle) and a
 * create form. Optimistic active-toggle; toasts on create/toggle/delete.
 * Backed by /api/admin/coupons (GET/POST) and /api/admin/coupons/[id] (PATCH/DELETE).
 */

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, Ticket } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Coupon {
  id: string
  code: string
  description: string | null
  discountPercent: number
  discountAmount: number | null
  isActive: boolean
  expiresAt: string | null
  maxUses: number | null
  usedCount: number
  minOrderAmount: number | null
  applicableCourseIds: string[]
}

type DiscountType = 'percent' | 'amount'

function formatDiscount(c: Coupon) {
  if (c.discountAmount != null && c.discountAmount > 0) return `₹${c.discountAmount}`
  return `${c.discountPercent}%`
}

function formatExpiry(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function CouponsPanel({ courseId }: { courseId?: string }) {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  // create form
  const [code, setCode] = useState('')
  const [discountType, setDiscountType] = useState<DiscountType>('percent')
  const [discountValue, setDiscountValue] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [maxUses, setMaxUses] = useState('')
  const [minOrderAmount, setMinOrderAmount] = useState('')
  const [thisCourseOnly, setThisCourseOnly] = useState(Boolean(courseId))

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/coupons')
      const json = await res.json()
      if (res.ok && json.success) {
        setCoupons(json.data.coupons as Coupon[])
      } else {
        showToast.error(json.error || 'Failed to load coupons')
      }
    } catch {
      showToast.error('Failed to load coupons')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const resetForm = () => {
    setCode('')
    setDiscountType('percent')
    setDiscountValue('')
    setExpiresAt('')
    setMaxUses('')
    setMinOrderAmount('')
    setThisCourseOnly(Boolean(courseId))
  }

  const createCoupon = async () => {
    const trimmed = code.trim().toUpperCase()
    if (trimmed.length < 3) {
      showToast.error('Code must be at least 3 characters')
      return
    }
    const value = parseInt(discountValue, 10)
    if (!value || value <= 0) {
      showToast.error('Enter a discount value')
      return
    }
    if (discountType === 'percent' && value > 100) {
      showToast.error('Percentage cannot exceed 100')
      return
    }

    setCreating(true)
    try {
      const payload: Record<string, unknown> = {
        code: trimmed,
        applicableCourseIds: thisCourseOnly && courseId ? [courseId] : [],
      }
      if (discountType === 'percent') payload.discountPercent = value
      else payload.discountAmount = value
      if (expiresAt) payload.expiresAt = new Date(expiresAt).toISOString()
      if (maxUses) payload.maxUses = parseInt(maxUses, 10)
      if (minOrderAmount) payload.minOrderAmount = parseInt(minOrderAmount, 10)

      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        showToast.success('Coupon created')
        resetForm()
        load()
      } else {
        showToast.error(json.error || 'Failed to create coupon')
      }
    } catch {
      showToast.error('Failed to create coupon')
    } finally {
      setCreating(false)
    }
  }

  const toggleActive = async (coupon: Coupon) => {
    const next = !coupon.isActive
    // optimistic
    setCoupons((cs) => cs.map((c) => (c.id === coupon.id ? { ...c, isActive: next } : c)))
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: next }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        showToast.success(next ? 'Coupon activated' : 'Coupon deactivated')
      } else {
        setCoupons((cs) => cs.map((c) => (c.id === coupon.id ? { ...c, isActive: !next } : c)))
        showToast.error(json.error || 'Failed to update coupon')
      }
    } catch {
      setCoupons((cs) => cs.map((c) => (c.id === coupon.id ? { ...c, isActive: !next } : c)))
      showToast.error('Failed to update coupon')
    }
  }

  const deleteCoupon = async (coupon: Coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return
    const prev = coupons
    setCoupons((cs) => cs.filter((c) => c.id !== coupon.id))
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (res.ok && json.success) {
        showToast.success('Coupon deleted')
      } else {
        setCoupons(prev)
        showToast.error(json.error || 'Failed to delete coupon')
      }
    } catch {
      setCoupons(prev)
      showToast.error('Failed to delete coupon')
    }
  }

  return (
    <div className="space-y-5">
      {/* Existing coupons */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-gray-900">
            <Ticket className="h-4 w-4 text-blue-600" /> Existing coupons
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Toggle a coupon on/off or delete it. Codes apply across the whole cart unless restricted
            to specific courses.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading coupons…
          </div>
        ) : coupons.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No coupons yet. Create one below.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-2.5 font-medium">Code</th>
                  <th className="px-4 py-2.5 font-medium">Discount</th>
                  <th className="px-4 py-2.5 font-medium">Uses</th>
                  <th className="px-4 py-2.5 font-medium">Expiry</th>
                  <th className="px-4 py-2.5 font-medium">Active</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {coupons.map((c) => (
                  <tr key={c.id} className="text-gray-700">
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold text-gray-900">{c.code}</span>
                      {c.applicableCourseIds.length > 0 && (
                        <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                          course-specific
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{formatDiscount(c)}</td>
                    <td className="px-4 py-3 tabular-nums text-gray-500">
                      {c.usedCount} / {c.maxUses ?? '∞'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatExpiry(c.expiresAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleActive(c)}
                        role="switch"
                        aria-checked={c.isActive}
                        aria-label={`${c.isActive ? 'Deactivate' : 'Activate'} ${c.code}`}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          c.isActive ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            c.isActive ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => deleteCoupon(c)}
                        aria-label={`Delete ${c.code}`}
                        className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold text-gray-900">Create a coupon</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-600" htmlFor="coupon-code">
              Code
            </label>
            <input
              id="coupon-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="NEET20"
              maxLength={30}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600" htmlFor="coupon-discount">
              Discount
            </label>
            <div className="mt-1 flex gap-2">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                aria-label="Discount type"
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm"
              >
                <option value="percent">%</option>
                <option value="amount">₹</option>
              </select>
              <input
                id="coupon-discount"
                type="number"
                min={1}
                max={discountType === 'percent' ? 100 : undefined}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === 'percent' ? '20' : '500'}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600" htmlFor="coupon-expiry">
              Expiry date <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="coupon-expiry"
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600" htmlFor="coupon-max-uses">
              Max uses <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="coupon-max-uses"
              type="number"
              min={1}
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              placeholder="∞"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600" htmlFor="coupon-min-order">
              Min order amount (₹) <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="coupon-min-order"
              type="number"
              min={0}
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(e.target.value)}
              placeholder="0"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {courseId && (
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={thisCourseOnly}
                  onChange={(e) => setThisCourseOnly(e.target.checked)}
                />
                Restrict to this course only
              </label>
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={createCoupon}
            disabled={creating}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {creating ? 'Creating…' : 'Create coupon'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CouponsPanel
