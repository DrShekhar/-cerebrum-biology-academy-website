import Link from 'next/link'
import { ShieldCheck, Flag, ArrowRight } from 'lucide-react'

// MCQ management hub. The subpages (moderation, error-reports) existed but
// /admin/mcq itself 404'd — every sidebar/deep link to the section broke.

export const metadata = { title: 'MCQ Management | Admin' }

const SECTIONS = [
  {
    href: '/admin/mcq/moderation',
    title: 'Community MCQ Moderation',
    description: 'Review, approve, or reject community-submitted questions before they go live.',
    icon: ShieldCheck,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    href: '/admin/mcq/error-reports',
    title: 'Question Error Reports',
    description: 'Student-flagged mistakes in questions — wrong answers, typos, unclear options.',
    icon: Flag,
    color: 'bg-amber-100 text-amber-600',
  },
]

export default function AdminMcqHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">MCQ Management</h1>
        <p className="text-gray-500 mb-8">
          Question-bank quality tools: moderation and error triage.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div
                className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <h2 className="font-semibold text-gray-900 mb-1 flex items-center gap-1.5">
                {s.title}
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </h2>
              <p className="text-sm text-gray-500">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
