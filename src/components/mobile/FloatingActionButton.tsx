'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, BookOpen, Target, Clock, MessageCircle } from 'lucide-react'

export interface FABAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  color?: string
  ariaLabel?: string
}

interface FloatingActionButtonProps {
  actions?: FABAction[]
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  mainIcon?: React.ComponentType<{ className?: string }>
  mainLabel?: string
  className?: string
}

export function FloatingActionButton({
  actions = [],
  position = 'bottom-right',
  mainIcon: MainIcon = Plus,
  mainLabel = 'Quick Actions',
  className = '',
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-20 right-4 md:bottom-8 md:right-8',
    'bottom-left': 'bottom-20 left-4 md:bottom-8 md:left-8',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2 md:bottom-8',
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleActionClick = (action: FABAction) => {
    action.onClick()
    setIsOpen(false)
    if ('vibrate' in navigator) {
      navigator.vibrate(20)
    }
  }

  return (
    <div className={`fixed z-50 ${positionClasses[position]} ${className}`}>
      <AnimatePresence>
        {isOpen && actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleActionClick(action)}
                aria-label={action.ariaLabel || action.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-all min-h-[48px] touch-action-manipulation group`}
              >
                <div
                  className={`p-2 rounded-full ${action.color || 'bg-blue-100'} group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-gray-900 pr-2 whitespace-nowrap">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        aria-label={mainLabel}
        aria-expanded={isOpen}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all touch-action-manipulation flex items-center justify-center ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-800'
            : 'bg-gradient-to-r from-green-600 to-navy-700 hover:from-green-700 hover:to-navy-800'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MainIcon className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleToggle}
          className="fixed inset-0 bg-black/20 -z-10"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export function useDashboardFAB() {
  const defaultActions: FABAction[] = [
    {
      id: 'start-study',
      label: 'Start Study Session',
      icon: Clock,
      onClick: () => {
        const event = new CustomEvent('dashboard:start-study')
        window.dispatchEvent(event)
      },
      color: 'bg-blue-100',
      ariaLabel: 'Start a new study session',
    },
    {
      id: 'take-test',
      label: 'Take Practice Test',
      icon: Target,
      onClick: () => {
        window.location.href = '/mock-tests'
      },
      color: 'bg-green-100',
      ariaLabel: 'Navigate to practice tests',
    },
    {
      id: 'browse-topics',
      label: 'Browse Topics',
      icon: BookOpen,
      onClick: () => {
        window.location.href = '/practice'
      },
      color: 'bg-purple-100',
      ariaLabel: 'Browse study topics',
    },
    {
      id: 'ask-doubt',
      label: 'Ask Doubt',
      icon: MessageCircle,
      onClick: () => {
        window.location.href = '/support'
      },
      color: 'bg-orange-100',
      ariaLabel: 'Ask a question or doubt',
    },
  ]

  return { defaultActions }
}
