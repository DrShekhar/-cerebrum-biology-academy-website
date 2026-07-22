import type { Metadata } from 'next'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import Link from 'next/link'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalPricingStrip } from '@/components/global/GlobalPricingStrip'
import { ClassVideoCard } from '@/components/media/ClassVideoCard'
import { testimonials } from '@/data/testimonials'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/**
 * /global — the global brand home.
 *
 * `/` stays the India-NEET homepage (it anchors the Delhi NCR NEET rankings);
 * this page is the front door for everyone else: NRI students preparing for
 * NEET from abroad AND local-curriculum students (IB / AP / A-Level / GCSE /
 * MCAT / GAMSAT / USMLE / DAT / olympiads).
 *
 * Intent split vs /best-biology-tutor-global: this page describes WHAT we
 * teach (brand/navigational); that page argues WHY we're the best per region
 * ("best biology tutor" query lander). Don't duplicate its regional sections.
 *
 * Must stay statically rendered — no headers()/cookies(); geo pricing comes
 * from the GlobalPricingStrip client island.
 */

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  // Root layout template appends "| Cerebrum Biology Academy" — don't repeat it here.
  title: 'Global Biology Education — NEET · IB · AP · A-Level · MCAT · GAMSAT · Olympiads',
  description:
    'AIIMS-trained specialist biology faculty for students in 75+ countries: NEET from abroad, IB & AP Biology, A-Level, GCSE/IGCSE, MCAT Bio/Biochem, GAMSAT, USMLE Step 1, DAT, and biology olympiads (USABO, BBO, IBO). Geo-fair pricing, time-zone-friendly live classes, free trial.',
  alternates: {
    canonical: `${BASE_URL}/global`,
    // Without this, the root layout's x-default (-> "/", the India-NEET home) wins
    // sitewide and a non-IN searcher for a generic "biology tutor" can be served
    // the India page. Declare /global as its own en + x-default target.
    languages: {
      en: `${BASE_URL}/global`,
      'x-default': `${BASE_URL}/global`,
    },
  },
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    title: 'Cerebrum Biology Academy — Global Biology Education in 75+ Countries',
    description:
      'NEET (from abroad) · IB · AP · A-Level · GCSE · MCAT · GAMSAT · USMLE · DAT · Biology Olympiads. AIIMS-trained faculty, live online worldwide.',
    url: `${BASE_URL}/global`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy — global biology education for NEET, IB, AP, MCAT and olympiads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum Biology Academy — Global Biology Education',
    description:
      'AIIMS-trained biology faculty for NEET (abroad), IB, AP, A-Level, MCAT, GAMSAT, USMLE, DAT and olympiads in 75+ countries.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
}

const VERTICALS = [
  {
    name: 'NEET for Students Abroad',
    detail:
      'Full NTA-pattern NEET Biology from UAE, Gulf, Singapore, US, UK & 40+ countries — NRI-quota guidance included',
    href: '/online-biology-classes-international',
    flag: '🌏',
  },
  {
    name: 'IB Biology (HL & SL)',
    detail: 'DP1–DP2 coverage, IA & EE mentorship, 2025 syllabus',
    href: '/ib-biology-tuition',
    flag: '📘',
  },
  {
    name: 'AP Biology',
    detail: 'All 8 units + FRQ practice for the May exam, score-5 targeting',
    href: '/ap-biology-tutor',
    flag: '🇺🇸',
  },
  {
    name: 'A-Level Biology',
    detail: 'AQA · OCR · Edexcel · CIE, Year 12–13 and retakes',
    href: '/a-level-biology-tutor',
    flag: '🇬🇧',
  },
  {
    name: 'GCSE / IGCSE Biology',
    detail: 'Foundation for sixth-form success, all major boards',
    href: '/igcse-biology-tuition',
    flag: '📗',
  },
  {
    name: 'MCAT Biology & Biochemistry',
    detail: 'B/B section specialist prep — passage strategy + content review',
    href: '/best-mcat-biology-tutor',
    flag: '🧬',
  },
  {
    name: 'USMLE Step 1 Biology',
    detail: 'Physiology, biochemistry, micro-immuno foundations for IMGs and US students',
    href: '/usmle-step-1-biology-preparation',
    flag: '🩺',
  },
  {
    name: 'GAMSAT & DAT Biology',
    detail: 'GAMSAT Section III reasoning + DAT survey of natural sciences',
    href: '/best-gamsat-biology-tutor',
    flag: '🔬',
  },
  {
    name: 'Middle School Biology (USA)',
    detail:
      'Grades 6-8 early biology foundation & honest olympiad prep — the on-ramp before high school',
    href: '/middle-school-biology-olympiad-usa',
    flag: '🌱',
  },
  {
    name: 'Science Olympiad Division B',
    detail:
      'Coaching for the Division B biology events (grades 6-9) — the real US middle-school olympiad',
    href: '/science-olympiad-division-b-biology-coaching',
    flag: '🔬',
  },
  {
    name: 'USABO Coaching',
    detail: 'USA Biology Olympiad — Open, Semifinal and National rounds',
    href: '/usabo-coaching',
    flag: '🏅',
  },
  {
    name: 'IBO & National Olympiads',
    detail: 'USABO · BBO · CBO · INBO and 75+ national olympiads on the IBO pathway',
    href: '/ibo-preparation',
    flag: '🌐',
  },
  {
    name: 'Brain Bee (Neuroscience)',
    detail:
      'USA & International Brain Bee — neuroanatomy, patient diagnosis & live-oral coaching for ages 13-19',
    href: '/brain-bee-coaching',
    flag: '🧠',
  },
]

const REGIONS = [
  {
    name: 'North America',
    detail: 'AP · MCAT · DAT · USMLE · USABO — EST/CST/MST/PST evening slots',
    href: '/best-biology-tutor-usa',
  },
  {
    name: 'UK & Europe',
    detail: 'A-Level · GCSE · IB · GAMSAT UK · BBO — GMT/CET slots',
    href: '/best-biology-tutor-uk',
  },
  {
    name: 'Middle East',
    detail: 'NEET (NRI) · IB · A-Level — Gulf-friendly timings',
    href: '/neet-coaching-nri-uae',
  },
  {
    name: 'Asia-Pacific',
    detail: 'IB · IGCSE · NEET (NRI) · GAMSAT Australia · ABO/SBO — SGT/AEST slots',
    href: '/best-biology-tutor-global',
  },
]

const FAQS = [
  {
    q: 'Which countries does Cerebrum Biology Academy teach in?',
    a: 'Cerebrum teaches live online classes to students in 75+ countries across North America, the UK and Europe, the Middle East, Asia-Pacific, and Africa. Physical centres operate in Delhi NCR, India; every programme is also available fully online with time-zone-matched batches.',
  },
  {
    q: 'Can I prepare for NEET while living outside India?',
    a: 'Yes. NEET coaching for students abroad is one of our largest programmes — full NTA-pattern Biology preparation with batches timed for the Gulf, Singapore, the US, the UK and other regions, plus NRI-quota admission guidance. NEET exam centres exist in several overseas cities.',
  },
  {
    q: 'How does time-zone scheduling work for live classes?',
    a: 'Batches are organised by region: US/Canada students get EST–PST evening slots, UK/Europe get GMT/CET slots, Gulf students get evening GST slots, and Singapore/Australia get SGT/AEST slots. 1:1 tutoring is scheduled to your calendar. Recordings are available for every live session.',
  },
  {
    q: 'How is pricing set for different countries?',
    a: 'Pricing is geo-fair: each programme has a published per-zone price so students pay an amount calibrated to their region, shown in local currency on each programme page. There are no hidden conversion markups, and a free trial class precedes any payment.',
  },
  {
    q: 'Who teaches the classes?',
    a: 'All programmes are led by AIIMS New Delhi-trained faculty headed by Dr. Shekhar C Singh. AIIMS New Delhi is India’s apex medical institution — internationally ranked alongside Harvard Medical School, Johns Hopkins and Oxford for selectivity — so the teaching depth translates to any biology exam, regardless of your country. Dr. Shekhar has coached students to medical-school admissions, IB 7s, AP 5s, and national biology olympiad teams across multiple countries since 2014.',
  },
]

const GLOBAL_KNOWS_ABOUT = [
  'NEET Coaching for NRI Students',
  'MCAT Biology and Biochemistry',
  'GAMSAT Section III Biology',
  'USMLE Step 1 Biology',
  'DAT Biology',
  '75+ Country National Biology Olympiad Coach',
  'International Biology Olympiad (IBO) Preparation',
]

function GlobalSchemas() {
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/global#webpage`,
    url: `${BASE_URL}/global`,
    name: 'Cerebrum Biology Academy — Global Biology Education',
    description:
      'Global home of Cerebrum Biology Academy: NEET for students abroad, IB, AP, A-Level, GCSE/IGCSE, MCAT, GAMSAT, USMLE, DAT and biology olympiad coaching in 75+ countries.',
    inLanguage: 'en',
    about: { '@id': `${BASE_URL}/#organization` },
    isPartOf: { '@id': `${BASE_URL}/#website` },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Global Programs', item: `${BASE_URL}/global` },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const verticalList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cerebrum Biology Academy global programmes',
    itemListElement: VERTICALS.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.name,
      url: `${BASE_URL}${v.href}`,
    })),
  }

  return (
    <>
      {[webPage, breadcrumb, faqPage, verticalList].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CerebrumPersonSchema
        knowsAbout={GLOBAL_KNOWS_ABOUT}
        jobTitle="Founder & Global Lead Biology Faculty"
      />
    </>
  )
}

export default function GlobalHomePage() {
  const internationalTestimonials = testimonials.filter(
    (t) => t.location && !t.location.toLowerCase().includes('india')
  )
  const whatsappHref = CONTACT_INFO.whatsapp.linkWithMessage(
    'Hi! I found Cerebrum via the Global Programs page. I would like to book a free trial class.'
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8ede8] via-white to-[#f3f6f3]">
      <GlobalSchemas />

      {/* Hero — identity + two-pathway fork */}
      <section className="bg-[#3d4d3d] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[#fcd34d]">
            Founded by an AIIMS New Delhi alumnus · 2014 · New Delhi → the world
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Global Biology Education in 75+ Countries
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg"
            data-speakable="summary"
          >
            One subject, taught deeply. We coach biology across every major pathway — NEET for
            students abroad, IB and AP Biology, A-Level and GCSE, MCAT, GAMSAT, USMLE, DAT, and
            national biology olympiads up to the IBO — live online, in your time zone, with
            AIIMS-trained specialist faculty.
          </p>

          {/* Two-pathway fork */}
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Link
              href="/online-biology-classes-international"
              className="rounded-2xl bg-white p-5 text-left shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-[#3d4d3d]/70">
                Pathway 1
              </div>
              <div className="mt-1 text-lg font-bold text-gray-900">
                Preparing for NEET from abroad?
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Full NEET Biology programme with Gulf, Singapore, US and UK batches + NRI-quota
                guidance.
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-[#3d4d3d]">
                NEET NRI programmes →
              </span>
            </Link>
            <a
              href="#programmes"
              className="rounded-2xl bg-white p-5 text-left shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-[#3d4d3d]/70">
                Pathway 2
              </div>
              <div className="mt-1 text-lg font-bold text-gray-900">
                Studying IB · AP · A-Level, or aiming for med school in your country?
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Curriculum-specific tutoring and pre-med exam prep — MCAT, GAMSAT, USMLE, DAT,
                olympiads.
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-[#3d4d3d]">
                See all programmes ↓
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#25D366] px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-[#20BD5A]"
            >
              Book a free trial class on WhatsApp
            </a>
            <Link
              href="/best-biology-tutor-global"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border-2 border-white/70 px-8 py-3 text-base font-bold text-white transition-all hover:bg-white/10"
            >
              Why students worldwide choose Cerebrum
            </Link>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="border-b border-gray-200 bg-white/70 py-6 backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 text-center sm:grid-cols-4 sm:px-6">
          {[
            { k: 'Est. 2014', v: 'Founded by an AIIMS alumnus' },
            { k: 'AIIMS-trained', v: 'Specialist biology faculty' },
            { k: 'Biology only', v: 'One subject, taught in depth' },
            { k: '75+ countries', v: 'Live, time-zone-matched classes' },
          ].map((s) => (
            <div key={s.k}>
              <div className="text-xl font-bold text-[#3d4d3d] sm:text-2xl">{s.k}</div>
              <div className="mt-1 text-xs text-gray-600 sm:text-sm">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* See a real class */}
      <section className="bg-[#eef2ee] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              See a real Cerebrum class
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">
              Not a promo reel — actual recorded live classes taught by Dr. Shekhar. Small live
              batches, cameras on, real teaching. Click to watch.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ClassVideoCard
              id="CbQHpBiEKKs"
              title="Live class: USABO Genetics"
              caption="Live class · USABO Genetics"
            />
            <ClassVideoCard
              id="61NIROotk6Y"
              title="Live class: USABO Genetics (part 2)"
              caption="Live class · USABO Genetics (part 2)"
            />
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-gray-500">
            Sample recorded live classes from our YouTube channel.
          </p>
        </div>
      </section>

      {/* Programmes grid */}
      <section id="programmes" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Every biology pathway, one specialist faculty
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
            Pick your exam or curriculum — each programme page has the syllabus map, batch timings
            for your region, and exact pricing.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v) => (
              <Link
                key={v.href + v.name}
                href={v.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#3d4d3d]/30"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3d4d3d] to-[#4a5d4a] opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base font-bold text-gray-900 group-hover:text-[#3d4d3d]">
                    {v.name}
                  </div>
                  <span aria-hidden="true" className="shrink-0 text-lg opacity-80">
                    {v.flag}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.detail}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#3d4d3d] opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Geo pricing strip */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <GlobalPricingStrip />
        </div>
      </section>

      {/* Regions */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Find your region
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((r) => (
              <Link
                key={r.name}
                href={r.href}
                className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all hover:shadow-lg"
              >
                <div className="text-base font-bold text-gray-900">{r.name}</div>
                <p className="mt-1 text-sm text-gray-600">{r.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* International testimonials */}
      {internationalTestimonials.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Students who studied with us from abroad
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {internationalTestimonials.map((t) => (
                <figure key={t.id} className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200">
                  <blockquote className="text-sm leading-relaxed text-gray-700">
                    &ldquo;{t.comment}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4">
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">
                      {t.location} · {t.result}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Global programmes — common questions
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-gray-900">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form — capture path for non-WhatsApp visitors (any nationality) */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-xl px-4">
          <GlobalEnquiryForm source="global-home" />
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#3d4d3d] py-12 text-center text-white sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Start with a free trial class — any programme, your time zone
          </h2>
          <p className="mt-3 text-white/85">
            Tell us your exam and country on WhatsApp; we&apos;ll reply with the right batch and a
            trial slot within 15 minutes (9 AM – 9 PM IST).
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#25D366] px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-[#20BD5A]"
          >
            WhatsApp us — free trial
          </a>
        </div>
      </section>
    </main>
  )
}
