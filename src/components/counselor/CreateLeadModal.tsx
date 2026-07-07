'use client'

/**
 * Thin modal shell around the unified LeadForm (counselor surface — the new
 * lead auto-assigns to the creating counselor server-side). The previous
 * 372-line hand-rolled form is superseded by components/leads/LeadForm.
 */

import { X } from 'lucide-react'
import { LeadForm } from '@/components/leads/LeadForm'

interface CreateLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateLeadModal({ isOpen, onClose, onSuccess }: CreateLeadModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">New Lead</h2>
            <p className="text-sm text-gray-500">The lead will be assigned to you.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <LeadForm
          surface="counselor"
          mode="add"
          onSuccess={() => {
            onSuccess?.()
            onClose()
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}
