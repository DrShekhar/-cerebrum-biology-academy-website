import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Target, GraduationCap, Globe } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { olympiadCourseSchema, nsebHowToSchema } from '@/data/olympiads/schema-helpers'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/nseb-coaching'
const CAMPAIGN = 'nseb-coaching'

export const metadata: Metadata = {
  title: 'NSEB Coaching in India | National Standard Examination in Biology',
  description:
    'NSEB coaching for the Indian national biology olympiad prelim. Complete Campbell + NCERT coverage, past-paper drills, mock tests, and senior olympiad tutors. Pathway to INBO, OCSC, IBO.',
  keywords: [
    'NSEB coaching',
    'NSEB preparation',
    'NSEB online coaching',
    'National Standard Examination Biology',
    'NSEB classes India',
    'NSEB INBO coaching',
    'HBCSE biology olympiad',
    'IAPT biology olympiad',
    'NSEB past papers',
    'NSEB 2025 preparation',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-IN': PAGE_URL,
      en: PAGE_URL,
      'x-default': 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
  },
  openGraph: {
    title: 'NSEB Coaching in India — National Standard Examination in Biology',
    description:
      'Expert NSEB coaching with Campbell Biology coverage, past-paper drills, and senior olympiad tutors. Stage 1 of the NSEB → INBO → OCSC → IBO pathway.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NSEB Coaching — Cerebrum Biology Academy',
    description: 'Expert coaching for NSEB. Campbell + NCERT + past-paper drills.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const pathway = [
  { stage: 'Stage 1', name: 'NSEB', window: 'November', note: 'Prelim MCQ paper (IAPT)' },
  { stage: 'Stage 2', name: 'INBO', window: 'February', note: 'Theory + Practical exam (HBCSE)' },
  { stage: 'Stage 3', name: 'OCSC', window: 'April-May', note: 'HBCSE training camp' },
  { stage: 'Finals', name: 'IBO', window: 'July', note: 'International Biology Olympiad' },
]

const syllabusBreakdown = [
  { unit: 'Cell Biology & Biochemistry', weightage: '20%' },
  { unit: 'Genetics & Evolution', weightage: '20%' },
  { unit: 'Animal Anatomy & Physiology', weightage: '25%' },
  { unit: 'Plant Biology', weightage: '15%' },
  { unit: 'Ecology & Behavior', weightage: '15%' },
  { unit: 'Biosystematics & Biodiversity', weightage: '5%' },
]

const whyCerebrum = [
  {
    icon: Award,
    title: 'Senior olympiad tutors',
    body: 'Your mentor has deep NSEB past-paper experience across 10+ years of Indian olympiad papers. Feedback is exam-specific, not theoretical.',
  },
  {
    icon: Target,
    title: 'Past-paper drills from 2010',
    body: '15+ years of NSEB past papers, timed mocks with national-percentile feedback, and topic-wise error analysis.',
  },
  {
    icon: GraduationCap,
    title: 'Complete INBO pathway',
    body: 'Coaching continues through INBO and OCSC prep once you qualify. One mentor through all four stages.',
  },
]

const faqs = [
  {
    question: 'What is NSEB and who conducts it?',
    answer:
      'NSEB (National Standard Examination in Biology) is Stage 1 of the Indian Biology Olympiad pathway. It is conducted by IAPT (Indian Association of Physics Teachers) every November. Students in Class 12 or below in Indian schools are eligible. Top performers qualify for INBO (Stage 2, conducted by HBCSE).',
  },
  {
    question: 'What is the NSEB exam pattern?',
    answer:
      '80 multiple-choice questions to be solved in 2 hours. Questions cover Botany, Zoology, Cell Biology, Genetics, Ecology, and Evolution — at a level deeper than NCERT. Difficulty is closer to first-year university biology. Negative marking applies for incorrect answers.',
  },
  {
    question: 'What is the NSEB cutoff for INBO?',
    answer:
      'The cutoff varies year-to-year but generally corresponds to the top ~300 students nationally (roughly top 1% of registered candidates). Our students target 70–80% raw score as a safety margin above the typical cutoff band.',
  },
  {
    question: 'What books are recommended for NSEB preparation?',
    answer:
      'Campbell Biology (11th or 12th edition) is the primary reference. Your NCERT Class 11 and 12 biology forms the foundation. For specific NSEB-style question practice, past papers back to 2010 are essential. We also use Raven Biology and Taylor for specific topics (genetics, ecology). Trueman Biology is helpful but not sufficient on its own.',
  },
  {
    question: 'When should I start NSEB preparation?',
    answer:
      'Ideally in Class 9 or 10 to build the Campbell foundation early. Class 11 is the most common starting point and fits our Complete Olympiad Year programme. Class 12 students can still qualify with a focused 6–8 month sprint if NCERT is already strong.',
  },
  {
    question: 'Do you offer NSEB coaching only for Delhi NCR or across India?',
    answer:
      'Our NSEB programme is fully online for students across India. We also run in-centre programmes from our Gurugram, South Extension (Delhi), and Faridabad centres for students who prefer classroom learning. See /nseb-coaching-gurugram for the Gurugram centre details.',
  },
  {
    question: 'What does NSEB coaching cost?',
    answer:
      'Complete Olympiad Year (9–12 months, covers NSEB and INBO): $4,500 equivalent in INR — local currency equivalents are shown in the pricing section below. 1:1 Elite Mentoring with a senior olympiad tutor: $90 per hour. Small-Batch Weekend: $50 per hour.',
  },
  {
    question: 'Do you coach for INBO, OCSC, and IBO after NSEB?',
    answer:
      'Yes. Our Complete Olympiad Year programme covers the full NSEB → INBO → OCSC → IBO pathway. Same mentor continues with the student through all four stages. See /inbo-coaching and /ibo-preparation for the next stages.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const courseSchema = olympiadCourseSchema({
  name: 'NSEB Coaching Programme',
  description:
    'National Standard Examination in Biology (NSEB) coaching. Stage 1 of the Indian biology olympiad pathway — prepares students for NSEB → INBO → OCSC → IBO.',
  url: PAGE_URL,
  about: 'NSEB - National Standard Examination in Biology',
  areaServed: { type: 'Country', name: 'India' },
  inLanguage: 'en-IN',
  teaches: [
    'Cell Biology & Biochemistry',
    'Genetics & Evolution',
    'Plant Biology',
    'Animal Anatomy & Physiology',
    'Ecology & Behavior',
    'Biosystematics & Biodiversity',
  ],
})

const howToSchema = nsebHowToSchema(PAGE_URL)

export default function NSEBCoachingHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'Biology Olympiads', href: '/biology-olympiads' },
          { label: 'NSEB Coaching', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-start lg:gap-12">
              <div className="order-2 lg:order-1 lg:col-span-3">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  <Target className="h-3.5 w-3.5 text-green-400" />
                  Stage 1 · NSEB · November paper · 80 MCQs · IAPT
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  NSEB coaching.
                  <br />
                  <span className="text-green-400">Built for olympiad depth.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  Campbell and NCERT coverage, 15 years of past-paper drills, and the same mentor
                  with you through NSEB, INBO, OCSC, and IBO.
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Past papers</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">15+ years</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Programme length
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">9-12 mo</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Paper format
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">80 MCQ / 2 hr</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={CAMPAIGN}
                  heading="Book a free NSEB demo"
                  subheading="Tell us your class + school. We match you to the right mentor in 15 minutes."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pathway */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                The NSEB to IBO pathway.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                NSEB is Stage 1. Our programme continues through all four stages with the same
                mentor, past-paper archive, and practical lab access.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {pathway.map((s) => (
                <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    {s.stage}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{s.window}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/inbo-coaching"
                className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-green-50 px-4 py-2 font-medium text-green-800 hover:bg-green-100"
              >
                INBO coaching (Stage 2)
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ibo-preparation"
                className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-green-50 px-4 py-2 font-medium text-green-800 hover:bg-green-100"
              >
                IBO preparation (Finals)
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/nseb-coaching-gurugram"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:border-green-300"
              >
                In-centre · Gurugram
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Syllabus */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              NSEB syllabus and weightage.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Questions are distributed across six broad units. Our revision schedule follows
              weightage so you spend proportionate prep time on each topic cluster.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {syllabusBreakdown.map((s) => (
                <div key={s.unit} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    {s.weightage}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{s.unit}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why NSEB students choose Cerebrum.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {whyCerebrum.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <item.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <GeoAwareSharedPricingMatrix
          products={olympiadPricingProducts}
          heading="NSEB coaching — pricing in your currency"
          subheading="USD reference price. INR auto-shown for visitors in India."
          equivalents={['INR', 'USD', 'AED', 'SGD', 'GBP', 'EUR']}
          regionalLinks={[
            { region: 'All Olympiads', href: '/biology-olympiads' },
            { region: 'INBO (Stage 2)', href: '/inbo-coaching' },
            { region: 'IBO (Finals)', href: '/ibo-preparation' },
            { region: 'In-centre Gurugram', href: '/nseb-coaching-gurugram' },
          ]}
        />

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              NSEB questions, answered.
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 open:border-green-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                    <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing form */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to start NSEB prep?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo, no commitment. We confirm your class and school on the form and assign
                  a mentor within 15 minutes (working hours).
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                  <Globe className="h-4 w-4" />
                  Online across India. In-centre in Gurugram, Delhi, Faridabad.
                </div>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={CAMPAIGN}
                  heading="Book your NSEB demo"
                  subheading="Same form, same promise."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Legal footer */}
        <section className="bg-white py-6">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <a href="/privacy-policy" className="underline hover:text-slate-900">
                Privacy
              </a>
              <a href="/terms-of-service" className="underline hover:text-slate-900">
                Terms
              </a>
              <a href="/contact" className="underline hover:text-slate-900">
                Contact
              </a>
            </div>
          </div>
        </section>

        <FloatingWhatsAppButton
          message="Hi Cerebrum, I saw your NSEB coaching page and would like details. Please share the programme and pricing."
          campaign={CAMPAIGN}
          tooltip="Questions about NSEB? Chat with us"
        />
      </main>
    </>
  )
}
