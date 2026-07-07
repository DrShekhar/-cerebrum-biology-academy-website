'use client'

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  align?: 'left' | 'right'
}

/**
 * The standard admin table: sticky header, hover rows, built-in
 * loading/empty/error states, horizontal scroll contained to the card.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading,
  error,
  onRetry,
  emptyIcon: EmptyIcon = Inbox,
  emptyTitle = 'Nothing here',
  emptyText = 'No records match your current filters.',
  onRowClick,
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  emptyIcon?: LucideIcon
  emptyTitle?: string
  emptyText?: string
  onRowClick?: (row: T) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading…</p>
        </div>
      ) : error ? (
        <div className="p-12 text-center">
          <p className="text-gray-900 font-medium mb-1">Could not load data</p>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          {onRetry && (
            <button onClick={onRetry} className="text-sm text-blue-600 hover:text-blue-800">
              Retry
            </button>
          )}
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-12">
          <EmptyIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{emptyTitle}</h3>
          <p className="mt-1 text-sm text-gray-500">{emptyText}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 whitespace-nowrap ${
                        col.align === 'right' ? 'text-right' : ''
                      }`}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
