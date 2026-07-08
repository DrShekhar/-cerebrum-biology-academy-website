'use client'

/**
 * Admin per-user permission editor. Grant a capability a user's role lacks, or
 * WITHDRAW one it has (e.g. cut off AI access for a paying student who misuses
 * it). Each permission is Inherit (role default) / Granted / Denied.
 */

import { use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, ShieldCheck, ShieldX, Shield } from 'lucide-react'

type OverrideState = 'GRANT' | 'DENY' | null

interface PermRow {
  key: string
  label: string
  description: string
  category: string
  relevant: boolean
  defaultGranted: boolean
  override: OverrideState
  effective: boolean
}

interface UserInfo {
  id: string
  name: string
  email: string
  role: string
}

export default function UserPermissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [perms, setPerms] = useState<PermRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/users/${id}/permissions`)
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to load')
      setUser(json.data.user)
      setPerms(json.data.permissions)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const setEffect = async (permission: string, effect: 'GRANT' | 'DENY' | 'INHERIT') => {
    setSaving(permission)
    try {
      const res = await fetch(`/api/admin/users/${id}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permission, effect }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setPerms((prev) =>
          prev.map((p) => {
            if (p.key !== permission) return p
            const override = effect === 'INHERIT' ? null : effect
            const effective =
              override === 'GRANT' ? true : override === 'DENY' ? false : p.defaultGranted
            return { ...p, override, effective }
          })
        )
      }
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading permissions…
      </div>
    )
  }
  if (error || !user) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Couldn&apos;t load permissions</h1>
        <p className="mt-2 text-gray-600">{error || 'Not found'}</p>
        <button
          onClick={load}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Retry
        </button>
      </div>
    )
  }

  const visible = perms.filter((p) => showAll || p.relevant || p.override)
  const categories = Array.from(new Set(visible.map((p) => p.category)))

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        href="/admin/settings/users"
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> All users
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Permissions — {user.name}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {user.email} · <span className="font-medium">{user.role}</span>. Grant a capability or
          withdraw one the role has. &ldquo;Inherit&rdquo; follows the role default.
        </p>
      </div>

      <label className="mb-4 inline-flex cursor-pointer items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
        Show all permissions (not just ones relevant to this role)
      </label>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {cat}
            </h2>
            <div className="space-y-2">
              {visible
                .filter((p) => p.category === cat)
                .map((p) => (
                  <div
                    key={p.key}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{p.label}</p>
                        {p.effective ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            <ShieldCheck className="h-3 w-3" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                            <ShieldX className="h-3 w-3" /> Disabled
                          </span>
                        )}
                        {p.override && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                            override
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">{p.description}</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Role default: {p.defaultGranted ? 'enabled' : 'disabled'}
                        <code className="ml-2 rounded bg-gray-100 px-1">{p.key}</code>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 p-0.5">
                      <SegBtn
                        active={p.override === 'GRANT'}
                        onClick={() => setEffect(p.key, 'GRANT')}
                        disabled={saving === p.key}
                        tone="green"
                        icon={<ShieldCheck className="h-4 w-4" />}
                        label="Grant"
                      />
                      <SegBtn
                        active={p.override === null}
                        onClick={() => setEffect(p.key, 'INHERIT')}
                        disabled={saving === p.key}
                        tone="gray"
                        icon={<Shield className="h-4 w-4" />}
                        label="Inherit"
                      />
                      <SegBtn
                        active={p.override === 'DENY'}
                        onClick={() => setEffect(p.key, 'DENY')}
                        disabled={saving === p.key}
                        tone="red"
                        icon={<ShieldX className="h-4 w-4" />}
                        label="Deny"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SegBtn({
  active,
  onClick,
  disabled,
  tone,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  disabled: boolean
  tone: 'green' | 'gray' | 'red'
  icon: React.ReactNode
  label: string
}) {
  const activeCls =
    tone === 'green'
      ? 'bg-green-600 text-white'
      : tone === 'red'
        ? 'bg-red-600 text-white'
        : 'bg-gray-700 text-white'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
        active ? activeCls : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon} {label}
    </button>
  )
}
