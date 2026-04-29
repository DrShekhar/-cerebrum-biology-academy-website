import Link from 'next/link'
import { headers } from 'next/headers'
import { ChevronRight, GraduationCap, Globe2, MapPin, MessageCircle, Users } from 'lucide-react'
import { OlympiadHero } from '@/components/olympiad/OlympiadHero'
import { CurriculumTimeline } from '@/components/olympiad/CurriculumTimeline'
import { PricingTier } from '@/components/olympiad/PricingTier'
import { OlympiadLeadForm } from '@/components/olympiad/OlympiadLeadForm'
import { olympiadCountries } from '@/config/olympiad-countries'

const HUB_URL = 'https://cerebrumbiologyacademy.com/programs/biology-olympiad'

export default async function BiologyOlympiadHubPage() {
  // Soft India geo-nudge — page stays accessible, but Indian visitors see a
  // banner pointing them to the right hub. Per founder direction this programme
  // is NOT promoted to the Indian audience.
  const h = await headers()
  const country = h.get('x-vercel-ip-country')
  const isIndia = country === 'IN'

  // Schema.org — EducationalOrganization + Course (umbrella for the programme)
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    alternateName: "An AIIMSonian's Initiative",
    url: 'https://cerebrumbiologyacademy.com',
    description:
      'Biology-only coaching institute, taught personally by Dr. Shekhar (AIIMS). Specialist in NEET, IB, AP, and Biology Olympiad / IBO preparation.',
    telephone: '+91-88264-44334',
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Olympiad & IBO Coaching — International Programme',
    description:
      'Live online Biology Olympiad and IBO coaching for international-school students. NBO-tier depth, IBO syllabus mapping, Pre-Med foundation. AIIMSonian-led, small-batch (4–6 students), 6 hours per week.',
    url: HUB_URL,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      areaServed: { '@type': 'Place', name: 'International (27 countries)' },
    },
    educationalLevel: 'High School',
    inLanguage: 'en',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType:
        'High school students at international schools (IB, IGCSE/A-Level, AP, French, German curriculum) outside India who are not eligible for their host-country National Biology Olympiad and want Olympiad-grade biology + Pre-Med preparation.',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT6H',
      location: { '@type': 'VirtualLocation', url: HUB_URL },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Soft India banner — soft redirect, not hard. */}
        {isIndia && (
          <div className="bg-[#EDE9FF] px-4 py-3 text-sm text-[#2C2C2C]">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                <strong>For students in India:</strong> this page is built for international-school
                families abroad. If you&apos;re preparing for NEET or INBO / IBO from India,{' '}
                <Link href="/" className="font-semibold text-[#6B5DC6] underline">
                  see our NEET coaching
                </Link>{' '}
                or{' '}
                <Link href="/inbo-coaching" className="font-semibold text-[#6B5DC6] underline">
                  INBO / IBO programme
                </Link>{' '}
                instead.
              </p>
            </div>
          </div>
        )}

        <OlympiadHero />

        {/* Why Cerebrum */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
              Why international-school families choose Cerebrum
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">
              Most international-school students don&apos;t have access to their host-country&apos;s
              National Biology Olympiad — USABO, BBO, CBO and equivalents are restricted to
              host-school enrolment. We built this programme specifically for them: olympiad-grade
              biology depth, in your time zone, mapped to the same skill set that strengthens
              Pre-Med (UCAT / MCAT / NEET-equivalent) applications.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-[#EDE9FF]/30 p-6">
                <GraduationCap className="h-7 w-7 text-[#6B5DC6]" />
                <h3 className="mt-3 font-bold text-[#2C2C2C]">AIIMSonian&apos;s Initiative</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Taught personally by Dr. Shekhar (AIIMS) and AIIMS-trained biology specialists.
                  Same Indian olympiad coaching tradition that has produced national-team performers
                  for over 15 years — adapted to your time zone.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#EDE9FF]/30 p-6">
                <Users className="h-7 w-7 text-[#6B5DC6]" />
                <h3 className="mt-3 font-bold text-[#2C2C2C]">Small batch — 4 to 6 students</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Faculty-led live classes with the same instructor for the year. Weekly written
                  feedback on every past-paper attempt. Indian small-batch coaching tradition,
                  scheduled for your local evening.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#EDE9FF]/30 p-6">
                <Globe2 className="h-7 w-7 text-[#6B5DC6]" />
                <h3 className="mt-3 font-bold text-[#2C2C2C]">27 countries served</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Time-zone friendly across UAE, USA, UK, Singapore, Hong Kong, Australia, Canada,
                  Germany, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait, Malaysia, Thailand,
                  Philippines, Indonesia, Vietnam, South Africa, Nigeria, Kenya, Mauritius, Nepal,
                  Bangladesh, Sri Lanka, Netherlands, New Zealand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CurriculumTimeline />

        {/* Faculty + Centres strip */}
        <section className="bg-[#2C2C2C] py-12 text-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold md:text-2xl">
                  Taught by AIIMSonian biology specialists
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/80">
                  Cerebrum runs four offline centres in India (Rohini, Gurugram, South Delhi,
                  Faridabad) and live online programmes in 27 countries. Faculty are AIIMS-trained;
                  the senior cohort is taught by Dr. Shekhar himself.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs">
                  <MapPin className="h-3.5 w-3.5" /> Rohini
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs">
                  <MapPin className="h-3.5 w-3.5" /> Gurugram
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs">
                  <MapPin className="h-3.5 w-3.5" /> South Delhi
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs">
                  <MapPin className="h-3.5 w-3.5" /> Faridabad
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
              Schedule — calibrated to international school workloads
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">
              Six hours per week, scheduled for your local evenings — typically two weekday slots
              + one Sunday session. Recordings are available if you miss a class. The cycle starts
              fresh each September; mid-year entry is supported with 1-on-1 catch-up sessions.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-[#2C2C2C]">September – December</h3>
                <p className="mt-2 text-sm text-slate-600">
                  NBO Foundation. Campbell Biology end-to-end + diagnostic past papers.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-[#2C2C2C]">January – April</h3>
                <p className="mt-2 text-sm text-slate-600">
                  IBO syllabus deep-dive + Alberts / Lehninger / Raven supplementary reading.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-[#2C2C2C]">May – August</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Past-paper saturation + Pre-Med bridge (UCAT / MCAT / BMAT / NEET-equivalent).
                </p>
              </div>
            </div>
          </div>
        </section>

        <PricingTier allCountries={olympiadCountries} />

        {/* Country list — link out to per-country pages */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
              Country-specific pages
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">
              Pick your country for time-zone-specific scheduling, local pricing, and
              country-tailored FAQs.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {olympiadCountries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/programs/biology-olympiad/${c.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#6B5DC6] hover:shadow-md"
                >
                  <span aria-hidden="true" className="text-2xl">
                    {c.flag}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#2C2C2C]">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.priceDisplay} / month</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lead form */}
        <section className="bg-[#EDE9FF]/40 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
                Book your free counselling call
              </h2>
              <p className="mt-3 text-base text-slate-700 md:text-lg">
                Tell us your country, current grade, and curriculum (IB / AP / IGCSE etc.) and
                we&apos;ll send you a tailored 30-minute call. No obligation; we genuinely use the
                call to figure out whether the programme fits your child.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-700">
                  Prefer WhatsApp directly?{' '}
                  <a
                    href={`https://wa.me/918826444334?text=${encodeURIComponent(
                      'Hi! I want to enquire about the Biology Olympiad & IBO programme.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#6B5DC6] underline-offset-2 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message us on +91 88264 44334
                  </a>
                </p>
              </div>
            </div>
            <OlympiadLeadForm source="olympiad-hub" />
          </div>
        </section>
      </main>
    </>
  )
}
