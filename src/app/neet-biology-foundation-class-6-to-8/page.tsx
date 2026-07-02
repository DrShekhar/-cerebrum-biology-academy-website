import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const url = `${SITE_URL}/neet-biology-foundation-class-6-to-8`

export const metadata: Metadata = {
  title: 'NEET Biology Foundation Class 6, 7 & 8 | Early Start for Future Doctors',
  description:
    'Early NEET biology foundation for Class 6, 7 and 8 — build the base for a future medical or research career the calm way, without cramming. Live online, all boards (CBSE/ICSE/IB/state), AIIMS-trained faculty, olympiad-ready. India and abroad.',
  keywords: [
    'neet foundation class 6 to 10',
    'neet biology foundation course',
    'early neet preparation',
    'when to start neet preparation',
    'foundation course for neet class 6 7 8',
    'biology foundation for future doctors',
    'junior neet foundation online',
    'class 6 7 8 biology coaching neet',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'NEET Biology Foundation Class 6–8 | Cerebrum Biology Academy',
    description:
      'Calm, curiosity-led early biology foundation for Class 6, 7 and 8 — for future doctors and researchers. Live online, all boards, AIIMS faculty.',
    type: 'website',
    url,
    locale: 'en_IN',
  },
}

const grades = [
  {
    grade: 'Class 6',
    href: '/neet-foundation-class-6',
    tag: 'Wonder first',
    blurb:
      'The gentlest start of all — we grow a child’s curiosity about the living world, no exam pressure, a decade before NEET.',
  },
  {
    grade: 'Class 7',
    href: '/neet-foundation-class-7',
    tag: 'Spark the interest',
    blurb:
      'Turn everyday curiosity into real understanding. The year a love of biology takes root and school science becomes a strength.',
  },
  {
    grade: 'Class 8',
    href: '/neet-foundation-class-8',
    tag: 'Build the base',
    blurb:
      'The sweet spot: old enough for real concepts, early enough to build them calmly. The foundation every future doctor needs.',
  },
]

const nextSteps = [
  { grade: 'Class 9 Foundation', href: '/neet-foundation-class-9' },
  { grade: 'Class 10 Foundation', href: '/neet-foundation-class-10' },
  { grade: 'Biology Olympiads', href: '/biology-olympiads' },
  { grade: 'NEET Coaching for NRI Students', href: '/nri-students' },
]

const faqs = [
  {
    question: 'When should my child start preparing for NEET?',
    answer:
      'For biology, the earlier a child builds genuine interest and clear concepts, the better — but the approach must match their age. In Class 6 and 7 the goal is curiosity and enjoyment, not exam preparation. By Class 8 a student can begin building real conceptual depth, still without pressure. Formal, exam-focused NEET preparation belongs to Class 11 and 12; the years before that are for building an unshakeable, unhurried foundation. Because biology is 50% of NEET, starting the biology base early compounds more than any other subject.',
  },
  {
    question: 'Is early foundation coaching just extra pressure on a young child?',
    answer:
      'It should never be, and ours is not. Our Class 6–8 programme is one short, enjoyable live class a week, taught through diagrams, stories and simple experiments rather than drilling. It is designed to add curiosity and confidence, and — because it aligns to the school syllabus — to make school science easier, not to crowd a child’s life.',
  },
  {
    question: 'Which class is the right time to start — 6, 7 or 8?',
    answer:
      'Any of them, depending on your child. Class 6 suits a naturally curious young child ready to explore the living world. Class 7 suits a child whose interest you want to spark and shape. Class 8 is the most popular starting point, where concept-building toward NEET can begin calmly. There is no single right answer — the common thread is a light, curiosity-led start well before the pressure years.',
  },
  {
    question: 'Does this suit a future researcher or scientist, not only a doctor?',
    answer:
      'Yes. A deep, curious grasp of biology is the shared foundation for medicine, research, biotechnology and the biological sciences alike. We keep every path open and, for children who show a research spark, fold in science-olympiad thinking (NSO, NTSE) that connects over time to the national biology-olympiad ladder leading to INBO and the International Biology Olympiad.',
  },
  {
    question: 'Does the school board (CBSE, ICSE, IB, state) matter?',
    answer:
      'No. The core biology is shared across boards, and NEET is built on NCERT. We teach those shared concepts, align sessions to your child’s own school syllabus so their marks improve now, and gradually introduce the NCERT framing NEET later requires. Children from every board learn together.',
  },
  {
    question: 'Can NRI students abroad join the Class 6–8 foundation?',
    answer:
      'Yes. We run timezone-friendly live online batches for Indian-origin families in the Gulf, USA, UK, Canada, Singapore and beyond. Starting the biology base early is especially valuable abroad, since international and American-curriculum schools are not aligned to the NCERT framework NEET uses.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Biology Foundation — Class 6 to 8',
  description:
    'Early biology foundation for Class 6, 7 and 8: concept-first, low-pressure, all-boards, olympiad-ready. Live online for students in India and abroad.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
  },
  educationalLevel: 'Class 6–8 (Foundation)',
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'NEET Biology Foundation Class 6–8', item: url },
  ],
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url,
  name: 'NEET Biology Foundation Class 6 to 8',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
}

export default function NeetBiologyFoundationClass6To8Page() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <nav className="mb-6 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">NEET Biology Foundation Class 6–8</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
              Class 6 · Class 7 · Class 8 — the early years, done right
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              NEET Biology Foundation for Class 6, 7 &amp; 8
            </h1>
            <p className="mt-6 text-lg text-white/90">
              If your child dreams of becoming a doctor or a scientist, the biology begins here —
              the calm way, not the cramming way. One short, curiosity-led class a week that grows a
              love of biology and quietly builds the base NEET needs. Live online, all boards,
              AIIMS-trained faculty, for students in India and abroad.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/book-free-demo"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-green-800 hover:bg-white/90"
              >
                Book a Free Demo Class
              </Link>
              <Link
                href="https://wa.me/918826444334?text=Hi%20Cerebrum!%20I'm%20interested%20in%20early%20NEET%20biology%20foundation%20(Class%206-8)%20for%20my%20child."
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why start early */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Why Start Biology Early?</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Biology makes up half of the NEET exam — 360 of 720 marks — yet it is the subject most
              students engage with last, cramming vast content under pressure in Class 11 and 12. A
              child who grows up genuinely curious about how living things work approaches it
              completely differently. Starting in Class 6, 7 or 8 spreads the learning over years
              instead of weeks, removes the senior-year pressure that overwhelms late starters, and
              lets each new topic feel familiar rather than frightening. Crucially, at this age the
              goal is understanding and enjoyment — not exam preparation — so it never costs a child
              their childhood.
            </p>
          </div>
        </div>
      </section>

      {/* Grade cards */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Child’s Starting Point</h2>
            <p className="mt-4 text-gray-600">
              The same calm, curiosity-led approach, pitched perfectly for each age.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {grades.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                  {g.tag}
                </div>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 group-hover:text-green-700">
                  {g.grade}
                </h3>
                <p className="mt-3 text-sm text-gray-600">{g.blurb}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-green-700">
                  Explore {g.grade} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor and scientist */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              For Future Doctors and Future Scientists
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              A young child rarely knows yet whether they want medicine, research or biotechnology —
              and they should not have to decide. Every one of those futures rests on the same
              thing: a strong, curious understanding of biology. That is what we build, while
              keeping options open. For children who show a real appetite, we introduce
              age-appropriate science- and biology-olympiad thinking (NSO, NTSE) that stretches them
              and, over the years, connects to the national biology-olympiad ladder leading to INBO
              and the International Biology Olympiad. As a dedicated biology academy rather than a
              general coaching chain, this depth of subject focus is exactly what we are built to
              give a young learner.
            </p>
          </div>
        </div>
      </section>

      {/* What's next */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Where It Leads</h2>
            <p className="mt-4 text-gray-600">
              A smooth path from early wonder through to full NEET preparation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {nextSteps.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
                >
                  {s.grade}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              When to Start NEET — Parents’ Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                  open={i === 0}
                >
                  <summary className="cursor-pointer font-semibold text-gray-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Give Your Child the Earliest Advantage</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Tell us your child’s class and we’ll suggest the right, low-pressure start. Live online,
            small batches, AIIMS-trained biology faculty.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/book-free-demo"
              className="rounded-xl bg-white px-8 py-3 font-semibold text-green-800 hover:bg-white/90"
            >
              Book a Free Demo Class
            </Link>
            <Link
              href="https://wa.me/918826444334?text=Hi%20Cerebrum!%20I'm%20interested%20in%20early%20NEET%20biology%20foundation%20(Class%206-8)%20for%20my%20child."
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white hover:bg-white/20"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
