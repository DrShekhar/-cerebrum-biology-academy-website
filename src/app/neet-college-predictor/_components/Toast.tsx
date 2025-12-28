'use client'

import { PartyPopper, Info, X, ArrowDown } from 'lucide-react'
import type { ToastState } from './types'

interface ToastProps {
  toast: ToastState
  onClose: () => void
}

export function Toast({ toast, onClose }: ToastProps) {
  return (
    <div
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-500 ${
        toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-full px-6 py-3 shadow-lg ${
          toast.count > 0
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
            : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
        }`}
      >
        {toast.count > 0 ? <PartyPopper className="h-5 w-5" /> : <Info className="h-5 w-5" />}
        <span className="font-semibold">{toast.message}</span>
        {toast.count > 0 && (
          <span className="flex items-center gap-1 text-sm opacity-90">
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Scroll down
          </span>
        )}
        <button onClick={onClose} className="ml-2 rounded-full p-1 hover:bg-white/20">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
