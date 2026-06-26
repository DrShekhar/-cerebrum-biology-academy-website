import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'

// USD pricing + College-Board AP curriculum = US-primary audience. Use the
// shared AP Biology US-locale builder so hreflang and ogLocale are emitted
// (the prior hand-rolled metadata was missing alternates.languages).
export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Online Tutor | College Board Aligned Coaching',
  description:
    'Expert AP Biology tutoring aligned with Campbell Biology textbook. Master all 8 units, ace your labs, and score 5 on the AP exam with personalized online coaching.',
  keywords: [
    'AP Biology tutor',
    'AP Biology online tutor',
    'AP Biology coaching',
    'AP Biology prep',
    'AP Biology exam preparation',
    'AP Biology score 5',
    'College Board Biology',
    'AP Biology labs',
    'AP Biology FRQ',
  ],
  canonical: '/ap-biology-online-tutor',
})

export default function APBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Internal link to the unit-by-unit study guides — rescues the
          /ap-biology-units cluster from orphan status and helps Google
          crawl it from this high-intent online-tutor page. */}
      <section className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-base text-slate-700">
            Want to dive into the curriculum unit by unit?{' '}
            <Link
              href="/ap-biology-units"
              className="font-semibold text-green-700 underline hover:no-underline"
            >
              See our AP Biology Units 1–8 study guides
            </Link>{' '}
            — one detailed page per College Board CED unit.
          </p>
        </div>
      </section>
    </>
  )
}
