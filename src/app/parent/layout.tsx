import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Parent Portal | Cerebrum Biology Academy',
    template: '%s | Parent Portal - Cerebrum Biology Academy',
  },
  description:
    "Monitor your child's academic progress, view payment history, and communicate with teachers.",
}

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
