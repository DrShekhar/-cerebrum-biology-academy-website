// AI Monitoring Dashboard Admin Page

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import AIMonitoringDashboard from '@/components/ai/AIMonitoringDashboard'

export const metadata = {
  title: 'AI Monitoring Dashboard | Cerebrum Biology Academy Admin',
  description:
    'Real-time AI performance monitoring, cost tracking, and analytics for administrators',
}

export default function AIMonitoringPage() {
  return <AIMonitoringDashboard />
}
