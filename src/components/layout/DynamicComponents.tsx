'use client'

import dynamic from 'next/dynamic'

// Dynamically import non-critical components to reduce initial bundle
export const FloatingCTA = dynamic(
  () => import('@/components/common/FloatingCTA').then((mod) => mod.FloatingCTA),
  { ssr: false }
)

export const GlobalExitIntent = dynamic(
  () => import('@/components/conversion/GlobalExitIntent').then((mod) => mod.GlobalExitIntent),
  { ssr: false }
)

export const ChatbotWrapper = dynamic(
  () => import('@/components/chat/ChatbotWrapper').then((mod) => mod.ChatbotWrapper),
  { ssr: false }
)
