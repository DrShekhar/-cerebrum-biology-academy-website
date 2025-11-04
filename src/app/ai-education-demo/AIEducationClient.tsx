'use client'

import dynamic from 'next/dynamic'
import { ChatbotSkeleton } from '@/components/ui/skeletons/ChatbotSkeleton'

// Lazy load chatbot only on client side for better initial load
const BiologyTutorChatbot = dynamic(() => import('@/components/ai/BiologyTutorChatbot'), {
  loading: () => (
    <div className="fixed bottom-6 right-6 z-50">
      <ChatbotSkeleton />
    </div>
  ),
  ssr: false, // Client-only component
})

export default function AIEducationClient() {
  return <BiologyTutorChatbot />
}
