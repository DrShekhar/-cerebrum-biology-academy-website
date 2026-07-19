/**
 * /online-neet-coaching-pcb
 *
 * SEO-only landing page — not surfaced in any navigation. Targets the
 * broad "online NEET coaching" search cluster (India + NRI / global)
 * but frames Cerebrum honestly as the biology specialist for PCB-stream
 * NEET aspirants. Biology = 360/720 = half the exam, which is the entire
 * argument for ranking on the broad term with a specialist offer.
 *
 * No pricing displayed — CTAs are WhatsApp (contextual preload) and
 * direct phone. Lead capture flows through inboundLogger → CRM.
 *
 * Keyword targets:
 *   - "online neet coaching"
 *   - "online neet coaching for pcb students"
 *   - "online neet coaching india"
 *   - "online neet coaching for nri"
 *   - "online neet coaching from usa / uk / uae / canada"
 *   - "live online neet coaching"
 *   - "online neet biology coaching"
 *   - "best online neet coaching"
 *
 * Schema: Course (no Offer to avoid mis-priced rich result) + Person +
 * Org + FAQ + Breadcrumb + Review (Sadhna Sirin).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/online-neet-coaching-pcb'
const PAGE_URL = `${SITE_URL}${CANONICAL}`
const PHONE_DISPLAY = '+91 88264 44334'

// Contextual WhatsApp message — [your city / country] is a soft placeholder
// the user replaces, which gives the counselor immediate routing context.
const WHATSAPP_MESSAGE = `Hi — I'm interested in Cerebrum's online NEET coaching for PCB. I'm based in [your city / country]. Please share live class timings (in my time zone), what's covered for biology, and how PCM pairing works.`

const WA_URL = 'https://wa.me/918826444334?text=' + encodeURIComponent(WHATSAPP_MESSAGE)

export const metadata: Metadata = {
  title: 'Online NEET Coaching for PCB Students — Live Biology Classes Globally · Cerebrum',
  description:
    'Online NEET coaching for PCB-stream students from AIIMS-trained faculty. Live biology classes serving India, UAE, USA, UK, Canada, Saudi, Singapore — your time zone. Biology is 360/720 of NEET; we are the specialist. Small batches, weekly tests, printed study material shipped globally. Free demo class.',
  keywords: [
    'online neet coaching',
    'online neet coaching for pcb',
    'online neet coaching for pcb students',
    'online neet coaching india',
    'online neet coaching for nri',
    'online neet coaching for indian students abroad',
    'online neet biology coaching',
    'best online neet coaching',
    'live online neet coaching',
    'online neet coaching from usa',
    'online neet coaching from uk',
    'online neet coaching from uae',
    'online neet coaching from saudi',
    'online neet coaching from canada',
    'online neet coaching from australia',
    'online neet coaching from singapore',
    'online neet coaching from qatar',
    'online neet coaching from kuwait',
    'neet coaching from home',
    'neet preparation online',
    'live neet classes online',
    'online neet 2027 coaching',
    'online neet 2028 coaching',
    'online neet coaching for dropper',
    'online neet coaching for class 11',
    'online neet coaching for class 12',
    'aiims faculty online neet coaching',
    'dr shekhar online neet biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-IN': PAGE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'en-AE': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Online NEET Coaching for PCB Students · Cerebrum Biology Academy',
    description:
      'Live online NEET Biology coaching from AIIMS-trained faculty, designed for PCB-stream students in India and overseas. Free demo class.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Online NEET Coaching for PCB Students — Live Biology Classes Globally · Cerebrum',
    description:
      'Online NEET coaching for PCB-stream students from AIIMS-trained faculty. Live biology classes serving India, UAE, USA, UK, Canada, Saudi, Singapore — your time zone. Biology is 360/720 of NEET; we ...',
  },
  robots: 'index, follow, max-image-preview:large',
}

const FAQS = [
  {
    question: 'What does "online NEET coaching for PCB" actually mean here?',
    answer:
      'PCB is the Indian academic stream — Physics, Chemistry, Biology — that NEET aspirants take in Class 11-12. This programme is designed for any PCB-stream student preparing for NEET-UG, whether you are in Class 11, Class 12, or dropper. Classes are live online via Zoom, with recordings if you miss.',
  },
  {
    question: 'Do you teach physics and chemistry too, or only biology?',
    answer:
      "We teach NEET Biology comprehensively — the entire Class 11 + 12 NCERT syllabus, every chapter, with NEET-pattern MCQ drilling. We do not teach physics or chemistry. Biology is 360 of NEET's 720 marks (half the exam) and is consistently the subject where most aspirants lose the most marks; our singular focus is on that. For PCM, our students typically pair us with their school faculty, a local tutor, or one of the major online PCM providers (PW, Allen Digital, Aakash Digital, Unacademy). We can recommend partners on request.",
  },
  {
    question: 'I am in the USA / UK / UAE / Canada / Saudi / Singapore — does this work for me?',
    answer:
      'Yes. We run dedicated batches in multiple time zones — early morning Indian time for Gulf families, evening Indian time for South-East Asia, and a US-friendly batch for North America. Printed study material is shipped to your address (we ship globally; tracking provided). Doubt sessions are async on WhatsApp during your study hours.',
  },
  {
    question: 'How are live classes different from watching recorded YouTube lectures?',
    answer:
      "Live classes have small batch sizes (10-40 students depending on tier), real-time Q&A, weekly tests with personal review, and a mentor accountable for your week-on-week progression. Recorded lectures don't know when you're falling behind. Per Dunlosky et al (2013) and Karpicke & Roediger (2008), retrieval practice and structured feedback drive learning — neither of which a passive video lecture delivers.",
  },
  {
    question: 'What is the schedule like?',
    answer:
      'Class 11: ~6 hours/week of live biology + ~2 hours of weekly tests. Class 12: ~7 hours/week + tests. Dropper: ~10 hours/week + daily tests in the final 2 months. All slots are scheduled to fit alongside your regular school + PCM coaching. You pick the batch slot at enrolment.',
  },
  {
    question: 'Will I get printed study material if I am overseas?',
    answer:
      'Yes — we ship the Cerebrum NCERT-line-by-line guide, MCQ bank, and chapter test booklets to addresses in over 30 countries including USA, Canada, UK, UAE, Saudi Arabia, Qatar, Singapore, Australia, and Malaysia. Shipping included for our annual programmes. Tracking provided.',
  },
  {
    question: 'Who teaches the classes?',
    answer:
      'Lead faculty is Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum (2014), with 15+ years of NEET biology teaching. Senior tier (Pinnacle ZA) is taught directly by Dr. Shekhar. Other tiers are taught by our senior Biology faculty team trained by him; he supervises curriculum and weekly assessments across all batches.',
  },
  {
    question: 'How do I know if this is the right fit before committing?',
    answer:
      "Book a free 60-minute live demo class with Dr. Shekhar via the WhatsApp number on this page. About 80% of overseas enquiries take this demo before deciding. You see the teaching style, ask any questions about format, and walk away with a clear plan even if you don't enrol with us.",
  },
  {
    question: 'What about pricing?',
    answer:
      'We do not display prices publicly because the right tier for you depends on your current preparation level, target rank, and which country / currency you pay in (we accept INR, USD, AED, GBP, CAD, SAR). Send a WhatsApp message or book a demo — we share the tier matrix and currency-specific quote in the conversation.',
  },
  {
    question: 'How do I start?',
    answer:
      'Send a WhatsApp message to +91 88264 44334 with your city / country and your current class. We respond within a few hours (in your time zone) with the live class slots that match your schedule and your demo class booking link. Or call directly if you are in India.',
  },
]

const FEATURES = [
  {
    icon: <Video className="h-6 w-6 text-indigo-600" />,
    title: 'Live online classes — not recorded videos',
    text: 'Two-way Zoom classes with real-time Q&A. Recordings available for any session you miss, but the value is in the live discussion and weekly mentor accountability.',
  },
  {
    icon: <Globe className="h-6 w-6 text-indigo-600" />,
    title: 'Multiple time-zone batches',
    text: 'Dedicated batch slots for Gulf (early morning IST), India (afternoon / evening IST), South-East Asia (evening IST), and North America (US-friendly window). Pick what fits your day.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
    title: 'Printed material shipped globally',
    text: 'Cerebrum NCERT-line-by-line guide + 12,000-MCQ chapter test bank shipped to 30+ countries. Tracking provided. Free with annual programmes.',
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: 'Small batches by design',
    text: 'Maximum batch size is 40 in our most affordable tier, 10-12 in our top tier. Every weekly test is reviewed in the next live class — the per-question discussion is the part that pre-recorded coaching cannot replicate.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
    title: 'AIIMS-trained faculty',
    text: 'Lead faculty is Dr. Shekhar C Singh — AIIMS New Delhi alumnus, 15+ years of NEET biology pedagogy, 680+ medical college selections including 67+ to AIIMS Delhi.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-indigo-600" />,
    title: 'Mentor-led progression tracking',
    text: 'Your biology score trajectory is plotted week-on-week against the NEET pattern. Pinnacle tier includes a weekly 1-on-1 mentor call with Dr. Shekhar himself.',
  },
]

export default function OnlineNEETCoachingPCBPage() {
  // Course schema WITHOUT Offer — we intentionally don't display
  // pricing on this page, so emitting a misleading Offer would be
  // worse than omitting it. Provider + hasCourseInstance with
  // courseMode='Online' is the minimum eligibility for a structured
  // Course rich result.
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Online NEET Coaching for PCB Students — Cerebrum',
    description:
      'Live online NEET Biology coaching from AIIMS-trained faculty, for PCB-stream students in India and overseas. Class 11, Class 12, and Dropper batches with small-group live classes, weekly tests, and printed study material shipped globally.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'NEET-UG Aspirant (Class 11 / 12 / Dropper)',
    educationalCredentialAwarded: 'NEET-UG Biology Preparation',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
      foundingDate: '2014',
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: 'Online NEET Biology — Class 11',
        courseMode: 'Online',
        inLanguage: 'en-IN',
      },
      {
        '@type': 'CourseInstance',
        name: 'Online NEET Biology — Class 12',
        courseMode: 'Online',
        inLanguage: 'en-IN',
      },
      {
        '@type': 'CourseInstance',
        name: 'Online NEET Biology — Dropper / Repeater',
        courseMode: 'Online',
        inLanguage: 'en-IN',
      },
    ],
    audience: {
      '@type': 'EducationalAudience',
      audienceType: 'PCB-stream NEET aspirants worldwide',
      geographicArea: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Singapore' },
        { '@type': 'Country', name: 'Australia' },
      ],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Online NEET Coaching for PCB',
        item: PAGE_URL,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Online NEET Coaching',
          'Online NEET Biology Coaching',
          'NEET Biology for PCB Students',
          'NEET Coaching for NRI Students',
          'Live Online NEET Classes',
          'NEET Biology for Indian Students Abroad',
        ]}
        jobTitle="Founder & Lead Biology Faculty — Online NEET Coaching for PCB-stream students"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Online NEET Coaching for PCB</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-16">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
                <Globe className="h-3.5 w-3.5" />
                India · UAE · USA · UK · Canada · Saudi · Singapore
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
                Online NEET coaching for PCB students,{' '}
                <span className="text-indigo-700">in your time zone.</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Biology is 360 of NEET&rsquo;s 720 marks &mdash; half the exam, and the subject most
                aspirants lose the most marks on. We are India&rsquo;s NEET biology specialist,
                delivering live online classes to PCB-stream students in 30+ countries since 2014.
                Same AIIMS-trained faculty, same NCERT-line-by-line study material, same weekly
                tests &mdash; now shipped to your home and taught in your time zone.
              </p>

              <div className="mt-7 flex flex-col md:flex-row gap-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp with your location
                </a>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  <Phone className="h-5 w-5" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Free 60-minute demo class with Dr. Shekhar. Available in your time zone. Reply
                within a few hours (overseas timing respected).
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Why biology is the rank decider
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600">NEET total marks</span>
                    <span className="text-2xl font-bold text-slate-900">720</span>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600">Biology share</span>
                    <span className="text-2xl font-bold text-indigo-700">360</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-slate-900">= half the exam</span>
                    <span className="text-2xl font-bold text-emerald-600">50%</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  PCM = 360 marks across two subjects, scored well by most serious aspirants.
                  Biology = 360 in one subject, and the one most lose marks on. Whoever owns
                  biology, owns the rank.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What this programme actually is */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What this programme is — and what it isn&rsquo;t
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Upfront so you can decide quickly without a sales call.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                  ✓ What we deliver
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    Live online NEET Biology classes — Class 11, Class 12, Dropper batches
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    Complete Class 11 + 12 NCERT Biology, line-by-line, NEET-pattern weighted
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    12,000+ MCQ bank, weekly chapter tests, monthly full biology mocks
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    Printed study material shipped to 30+ countries
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    Time-zone-matched live batch slots
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    Mentor accountability + weekly progression review
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-2 border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  ✗ What we do not do
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-slate-500">×</span>
                    We do not teach physics or chemistry. By design — biology specialisation is the
                    entire wedge.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-slate-500">×</span>
                    We are not a video-on-demand library. Classes are live; recordings are backup,
                    not the product.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-slate-500">×</span>
                    We do not promise a rank without effort. Mechanism is weekly tests + retrieval
                    practice + mentor accountability; you still have to do the work.
                  </li>
                </ul>
                <p className="mt-5 text-xs text-slate-600 leading-relaxed">
                  For PCM, our students typically pair us with school faculty, a local tutor, or one
                  of the major online PCM providers. We can recommend partners on request via
                  WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            What you get inside the programme
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Time-zone batches */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Live batches across time zones
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Pick the slot that fits alongside your school + PCM coaching. Final timings confirmed
              when you book a demo so we can match your daily schedule precisely.
            </p>

            <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">Region</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">
                      Typical batch window (local time)
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Indian Standard Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      region: 'Gulf (UAE, Saudi, Qatar, Kuwait, Bahrain, Oman)',
                      local: 'Early evening, 5:00 PM – 7:00 PM',
                      ist: '7:30 PM – 9:30 PM',
                    },
                    {
                      region: 'India',
                      local: '4:00 PM – 6:00 PM / 6:30 PM – 8:30 PM',
                      ist: 'Same',
                    },
                    {
                      region: 'Southeast Asia (Singapore, Malaysia)',
                      local: 'Evening, 7:00 PM – 9:00 PM',
                      ist: '4:30 PM – 6:30 PM',
                    },
                    {
                      region: 'UK',
                      local: 'Afternoon, 1:00 PM – 3:00 PM',
                      ist: '6:30 PM – 8:30 PM',
                    },
                    {
                      region: 'US East Coast',
                      local: 'Morning, 8:00 AM – 10:00 AM',
                      ist: '5:30 PM – 7:30 PM',
                    },
                    {
                      region: 'US West Coast',
                      local: 'Morning, 7:00 AM – 9:00 AM',
                      ist: '7:30 PM – 9:30 PM',
                    },
                    {
                      region: 'Canada (Eastern)',
                      local: 'Morning, 8:00 AM – 10:00 AM',
                      ist: '5:30 PM – 7:30 PM',
                    },
                    {
                      region: 'Australia (Sydney)',
                      local: 'Evening, 8:30 PM – 10:30 PM',
                      ist: '3:00 PM – 5:00 PM',
                    },
                  ].map((row) => (
                    <tr key={row.region} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.region}</td>
                      <td className="px-4 py-3 text-slate-700">{row.local}</td>
                      <td className="px-4 py-3 text-slate-500">{row.ist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Slots adjust seasonally for daylight saving and Ramadan schedules. WhatsApp us with
              your country and we share the current active batches.
            </p>
          </div>
        </section>

        {/* Faculty + track record */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Faculty + 12-year track record
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Cerebrum was founded in 2014 by Dr. Shekhar C Singh, an AIIMS New Delhi alumnus,
                with one specific commitment: every Cerebrum student gets the same quality of
                biology teaching that pushed Dr. Shekhar himself into AIIMS. The result, over 12
                years of cohorts:
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <Award className="h-5 w-5 shrink-0 text-amber-500" />
                  <span>
                    <strong>680+ medical college selections</strong> including AIIMS Delhi, JIPMER,
                    AFMC, MAMC, LHMC and major state medical colleges
                  </span>
                </li>
                <li className="flex gap-3">
                  <Award className="h-5 w-5 shrink-0 text-amber-500" />
                  <span>
                    <strong>67+ AIIMS Delhi selections</strong> personally mentored by Dr. Shekhar
                  </span>
                </li>
                <li className="flex gap-3">
                  <Award className="h-5 w-5 shrink-0 text-amber-500" />
                  <span>
                    <strong>98% NEET-UG qualification rate</strong> sustained across cohorts since
                    2014
                  </span>
                </li>
                <li className="flex gap-3">
                  <Award className="h-5 w-5 shrink-0 text-amber-500" />
                  <span>
                    Multiple students with <strong>100 percentile in Biology</strong> — including
                    Sadhna Sirin&rsquo;s 360/360 in NEET 2023 (testimonial below)
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-700 p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                Lead faculty
              </p>
              <h3 className="mt-2 text-2xl font-bold">Dr. Shekhar C Singh</h3>
              <p className="mt-1 text-sm text-indigo-100">Founder, AIIMS New Delhi alumnus</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2">
                  <Microscope className="h-4 w-4 mt-0.5 text-amber-300" />
                  15+ years teaching NEET Biology, CBSE, ICSE, IB, AP
                </li>
                <li className="flex gap-2">
                  <Microscope className="h-4 w-4 mt-0.5 text-amber-300" />
                  Direct mentorship for Pinnacle ZA tier (micro-batch 6-10)
                </li>
                <li className="flex gap-2">
                  <Microscope className="h-4 w-4 mt-0.5 text-amber-300" />
                  Curriculum supervisor for all online + offline batches
                </li>
                <li className="flex gap-2">
                  <Microscope className="h-4 w-4 mt-0.5 text-amber-300" />
                  Coaches Biology Olympiad (INBO, IBO, USABO, BBO, CBO, SBO) candidates
                </li>
              </ul>
              <Link
                href="/dr-shekhar-singh-biology-faculty-india"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Read Dr. Shekhar&rsquo;s full profile
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Sadhna testimonial */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid gap-10 md:grid-cols-5 md:items-center">
              <div className="md:col-span-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900">
                  <Award className="h-3.5 w-3.5" />
                  100 percentile biology · NEET 2023
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
                  Sadhna scored 360/360 in biology. Online programme. Same faculty, same mechanism.
                </h2>
                <figure className="mt-6 border-l-4 border-indigo-600 pl-5">
                  <blockquote className="text-lg italic text-slate-700 leading-relaxed">
                    &ldquo;Dr. Shekhar Sir&rsquo;s conceptual approach made complex topics simple.
                    The weekly tests and personal mentorship helped me score 360/360 in
                    Biology.&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <p className="font-bold text-slate-900">Sadhna Sirin</p>
                    <p className="text-slate-600">
                      Delhi-NCR Topper NEET 2023 · 695/720 · 100 percentile biology
                    </p>
                  </figcaption>
                </figure>
              </div>

              <div className="md:col-span-2">
                <div className="aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200 bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/bk6wQCh6b9w"
                    title="Sadhna Sirin — NEET 2023 Topper testimonial · Cerebrum Biology Academy"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500 text-center">
                  Watch Sadhna&rsquo;s 2-min testimonial
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Online NEET coaching for PCB — common questions
            </h2>
            <div className="mt-8 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — no pricing, WhatsApp + Call only */}
        <section className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Clock className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Ready to talk? Send a quick WhatsApp message.
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Include your <strong>city / country</strong> and your <strong>current class</strong>{' '}
              (Class 11, Class 12, or Dropper). We respond within a few hours in your time zone with
              live batch slots that fit your schedule and a free demo class link.
            </p>
            <div className="mt-7 flex flex-col md:flex-row justify-center gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp with context
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Phone className="h-5 w-5" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              India: +91 88264 44334 (call + WhatsApp) · International callers can WhatsApp the same
              number free.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
