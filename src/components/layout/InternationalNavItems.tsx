'use client'

import Link from 'next/link'
import { useVisitorCountry } from '@/hooks/useVisitorCountry'

/**
 * The two international items of the desktop header nav — the "By Exam"
 * dropdown (US/international exams) and the "Global" link.
 *
 * Owner rule (Jul 5, 2026): global programmes are NOT shown to visitors
 * browsing from inside India — they are for international students and
 * NRIs abroad. Unknown/undetected countries (crawlers, VPNs) see them.
 * Renders nothing until the country resolves, so Indian visitors never
 * see the items flash in and out.
 */

const EXAM_NAV_LINKS: { href: string; label: string }[] = [
  { href: '/best-biology-tutor-usa', label: 'USA — all exams' },
  { href: '/ap-biology-tutor', label: 'AP Biology' },
  { href: '/usabo-coaching', label: 'USABO / Olympiad' },
  { href: '/brain-bee-coaching', label: 'Brain Bee (Neuroscience)' },
  { href: '/mcat-biology', label: 'MCAT Biology' },
  { href: '/ib-biology-tutor-global', label: 'IB Biology' },
  { href: '/a-level-biology-tutor', label: 'A-Level Biology' },
  { href: '/honors-biology-tutor', label: 'Honors / High-School' },
  { href: '/college-biology-tutor', label: 'College / Intro Biology' },
]

const navLinkClasses =
  'flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200'

export function InternationalNavItems() {
  const { resolved, isIndia } = useVisitorCountry()

  if (!resolved || isIndia) return null

  return (
    <>
      {/* By Exam — native <details> disclosure (no client JS beyond the geo gate) */}
      <details className="group relative [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span>By Exam</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
          <p className="px-3 pt-1 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            International &amp; US exams
          </p>
          {EXAM_NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </details>
      <Link href="/global" className={navLinkClasses}>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span>Global</span>
      </Link>
    </>
  )
}
