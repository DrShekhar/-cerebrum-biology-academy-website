'use client'

import dynamic from 'next/dynamic'

const IntelligentChatbot = dynamic(
  () => import('@/components/chat/IntelligentChatbot').then((mod) => mod.IntelligentChatbot),
  { ssr: false }
)

export function ChatbotWrapper() {
  return <IntelligentChatbot />
}
