'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { StaffInboxProvider } from '@/hooks/staff/useStaffInbox'
import { TeamChatView } from '@/components/staff/chat/TeamChatView'

export default function TeacherTeamChatPage() {
  return (
    <StaffInboxProvider>
      <div className="p-6 max-w-6xl mx-auto">
        <Link
          href="/teacher"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <TeamChatView />
      </div>
    </StaffInboxProvider>
  )
}
