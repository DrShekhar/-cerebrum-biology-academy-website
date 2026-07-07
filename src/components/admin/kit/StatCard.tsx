'use client'

import type { LucideIcon } from 'lucide-react'

/**
 * The standard admin stat tile. Never render a stat without a real data
 * source — omit the card instead of defaulting a number.
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  color = 'bg-blue-100 text-blue-600',
  sub,
}: {
  label: string
  value: string | number
  icon: LucideIcon
  color?: string
  sub?: string
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
