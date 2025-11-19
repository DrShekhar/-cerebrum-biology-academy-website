'use client'

import { CheckCircle, X, Trash2, Send, Download } from 'lucide-react'

interface BulkActionsBarProps {
  selectedCount: number
  onClearSelection: () => void
  onMarkComplete?: () => void
  onDelete?: () => void
  onSendReminder?: () => void
  onExport?: () => void
  actions?: {
    label: string
    icon?: React.ReactNode
    onClick: () => void
    variant?: 'default' | 'danger' | 'success'
  }[]
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onMarkComplete,
  onDelete,
  onSendReminder,
  onExport,
  actions,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-slide-up">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl px-6 py-4 flex items-center gap-4 min-w-[400px]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">
            {selectedCount}
          </div>
          <span className="font-medium">
            {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
          </span>
        </div>

        <div className="h-6 w-px bg-gray-700" />

        <div className="flex items-center gap-2 flex-1">
          {actions ? (
            actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  action.variant === 'danger'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : action.variant === 'success'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))
          ) : (
            <>
              {onMarkComplete && (
                <button
                  onClick={onMarkComplete}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </button>
              )}

              {onSendReminder && (
                <button
                  onClick={onSendReminder}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Reminder
                </button>
              )}

              {onExport && (
                <button
                  onClick={onExport}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              )}

              {onDelete && (
                <button
                  onClick={onDelete}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </>
          )}
        </div>

        <button
          onClick={onClearSelection}
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
