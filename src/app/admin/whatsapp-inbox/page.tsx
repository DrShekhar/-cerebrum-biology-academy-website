'use client'

import { WhatsAppInbox } from '@/components/staff/WhatsAppInbox'

export default function AdminWhatsAppInboxPage() {
  return (
    <div className="p-3 sm:p-6">
      <WhatsAppInbox surface="admin" />
    </div>
  )
}
