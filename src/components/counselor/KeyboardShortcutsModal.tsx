'use client'

import { useEffect, useState } from 'react'
import { X, Keyboard } from 'lucide-react'

interface Shortcut {
  key: string
  description: string
  category: string
}

const shortcuts: Shortcut[] = [
  // Global
  { key: '?', description: 'Show keyboard shortcuts', category: 'Global' },
  { key: 'Esc', description: 'Close modals & clear filters', category: 'Global' },

  // Leads Page
  { key: 'Ctrl + N', description: 'Create new lead', category: 'Leads' },
  { key: 'Ctrl + F', description: 'Focus search input', category: 'Leads' },
  { key: 'Ctrl + E', description: 'Export leads to CSV', category: 'Leads' },
  { key: 'Ctrl + R', description: 'Refresh leads', category: 'Leads' },

  // Tasks Page
  { key: 'Ctrl + T', description: 'Create new task', category: 'Tasks' },
  { key: 'Ctrl + A', description: 'Run automation', category: 'Tasks' },
  { key: 'Ctrl + 1', description: 'Filter: All tasks', category: 'Tasks' },
  { key: 'Ctrl + 2', description: 'Filter: Overdue tasks', category: 'Tasks' },
  { key: 'Ctrl + 3', description: 'Filter: Due today', category: 'Tasks' },

  // Payments Page
  { key: 'Ctrl + P', description: 'Focus payments search', category: 'Payments' },
  { key: 'Ctrl + M', description: 'Mark selected as paid', category: 'Payments' },

  // Navigation
  { key: 'G + L', description: 'Go to Leads', category: 'Navigation' },
  { key: 'G + T', description: 'Go to Tasks', category: 'Navigation' },
  { key: 'G + P', description: 'Go to Payments', category: 'Navigation' },
  { key: 'G + A', description: 'Go to Analytics', category: 'Navigation' },
]

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <Keyboard className="w-6 h-6" />
            <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-6">
          {categories.map((category) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{shortcut.description}</span>
                      <kbd className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Press{' '}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded">
              ?
            </kbd>{' '}
            anytime to show this dialog
          </p>
        </div>
      </div>
    </div>
  )
}
