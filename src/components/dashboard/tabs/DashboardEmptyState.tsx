'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, Target, Play, BookOpen } from 'lucide-react'
import { FloatingActionButton, useDashboardFAB } from '@/components/mobile/FloatingActionButton'
import { BottomNavigation } from '@/components/mobile/MobileFullscreenMenu'

interface DashboardEmptyStateProps {
  userName?: string
}

export function DashboardEmptyState({ userName }: DashboardEmptyStateProps) {
  const pathname = usePathname()
  const { defaultActions } = useDashboardFAB()

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-green-50 to-gold-50 pb-20 md:pb-0">
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4a5d4a] rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                Welcome, {userName || 'Student'}! 🎓
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Start your NEET Biology mastery journey
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-12 text-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Let&apos;s Start Your Journey! 🚀
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
            Take your first practice test to unlock personalized insights, track your progress, and
            get AI-powered recommendations for NEET success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              href="/practice"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:shadow-lg transition-all min-h-[48px] touch-action-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-semibold">Start Practice Test</span>
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all min-h-[48px] touch-action-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-semibold">Browse Courses</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <FloatingActionButton actions={defaultActions} />
      <BottomNavigation currentPath={pathname || '/dashboard'} />
    </div>
  )
}
