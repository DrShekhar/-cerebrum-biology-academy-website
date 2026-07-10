import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Phone,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { facultyMembers } from '@/data/faculty'
import { FacultyListSchema } from '@/components/seo/PersonSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Faculty | Dr. Shekhar Singh (AIIMS) & Senior Biology Team — Cerebrum',
  description:
    'AIIMS-led biology faculty: Dr. Shekhar Singh + 5 senior subject specialists across NEET, IB, AP, CBSE 11-12, and Biology Olympiad. Student outcomes include 695 NEET marks and 360/360 Biology.',
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/faculty' },
  openGraph: {
    locale: 'en_IN',
    title: 'Cerebrum Biology Faculty — AIIMS-led, biology-only specialists',
    description:
      'Meet Dr. Shekhar C Singh (AIIMS) and the senior team. Bio-only focus, small batches (10-25), and direct founder-led mentoring at the top tier.',
    url: 'https://cerebrumbiologyacademy.com/faculty',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Faculty | Dr. Shekhar Singh (AIIMS) & Senior Biology Team — Cerebrum',
    description:
      'AIIMS-led biology faculty: Dr. Shekhar Singh + 5 senior subject specialists across NEET, IB, AP, CBSE 11-12, and Biology Olympiad. Student outcomes include 695 NEET marks and 360/360 Biology.',
  },
}

const FOUNDER = facultyMembers.find((f) => f.id === 'dr-shekhar-singh')
const SENIOR_TEAM = facultyMembers.filter((f) => f.id !== 'dr-shekhar-singh')

const WHATSAPP_FOUNDER =
  'https://wa.me/918826444334?text=Hi%20Dr.%20Shekhar%20%E2%80%94%20I%20want%20to%20talk%20to%20you%20directly%20about%20joining%20Cerebrum%20for%20NEET%20Biology%20preparation.'
const WHATSAPP_DEMO =
  'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20Cerebrum%20faculty.%20Please%20share%20available%20timings.'

const differentiators = [
  {
    title: 'Biology-only specialist',
    body: 'Aakash and Allen teach all three subjects. Our entire faculty bench is biology-only — every senior teacher has spent a decade-plus going deep into Botany, Zoology, Genetics, or Physiology. For a student where biology is the gap, that depth shows up in mock scores within the first two months.',
    icon: BookOpen,
  },
  {
    title: 'AIIMS-led teaching',
    body: 'Dr. Shekhar C Singh is an AIIMS Delhi alumnus and former Academic Head at Narayana Group. He still teaches the Pinnacle micro-batch personally. Most coaching institutes route students to part-time faculty after the demo; here, the senior team teaches every day.',
    icon: Award,
  },
  {
    title: 'Direct founder mentoring at the top tier',
    body: 'Pinnacle tier (10-12 students per batch) gives you direct 1:1 mentoring with Dr. Shekhar — weekly doubt slots, your tests reviewed by him, and your progress tracked personally. Available on request to NEET, IB, AP, CBSE Class 11-12, and Olympiad-track students.',
    icon: Star,
  },
]

const founderResults = [
  {
    student: 'Sadhna Sirin',
    achievement: 'NEET 2023 — 695 marks',
    note: '100 percentile in Biology, Delhi-NCR topper',
  },
  {
    student: 'Priya Sehgal',
    achievement: 'Perfect 360/360 in NEET Biology',
    note: 'Maximum possible Biology score',
  },
  {
    student: '15,000+ mentored',
    achievement: 'Across NEET, IB, AP, CBSE, and Olympiads',
    note: 'Including AIIMS, JIPMER, top-100 NEET ranks',
  },
]

const verticalCoverage = [
  {
    label: 'NEET-UG',
    body: 'Pursuit / Ascent / Pinnacle tiers. AIIMS-style depth on Plant + Human Physiology, Genetics, Ecology.',
    link: '/neet-coaching',
  },
  {
    label: 'IB Biology',
    body: 'HL + SL coverage, IA marking, paper-pattern drill. School feeders include UWCSEA, Tanglin Trust, DAIS, ASB, Pathways.',
    link: '/ib-biology',
  },
  {
    label: 'AP Biology',
    body: 'AAMC-aligned, full-syllabus FRQ practice. Phillips Exeter, Dalton, Deerfield, and other US feeders.',
    link: '/ap-biology',
  },
  {
    label: 'CBSE Class 11-12',
    body: 'Board + NEET parallel pedagogy. Sync with school calendar, weekend revision intensives.',
    link: '/courses/class-12',
  },
  {
    label: 'Biology Olympiad',
    body: 'NSEB → INBO → OCSC → IBO funnel. HBCSE / IAPT framework. India IBO team selection track.',
    link: '/biology-olympiads',
  },
]

function initials(fullName: string) {
  return fullName
    .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}

export default function FacultyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Pedagogy India',
          'NEET Biology',
          'IB Biology',
          'AP Biology',
          'CBSE Class 11-12 Biology',
          'Biology Olympiad Coaching',
        ]}
        jobTitle="Founder & Lead Biology Faculty — Cerebrum Biology Academy"
      />
      <div className="mx-auto max-w-7xl bg-gray-50 px-4 pt-4">
        <BreadcrumbSchema items={[{ label: 'Faculty', isCurrentPage: true }]} />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              <GraduationCap className="h-4 w-4" />
              AIIMS-led biology faculty
            </div>
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Six senior biology faculty.
              <br className="hidden sm:block" />
              One founder who still teaches.
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-base text-blue-200 sm:text-lg md:text-xl">
              Dr. Shekhar C Singh (AIIMS Delhi alumnus, 15+ years) leads a biology-only team across
              NEET, IB, AP, CBSE 11-12, and Olympiads. No rotating part-timers; the senior team
              teaches every batch.
            </p>
            <div className="flex flex-col justify-center gap-3 md:flex-row sm:gap-4">
              <Link href={WHATSAPP_FOUNDER} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-yellow-500 font-bold text-slate-900 hover:bg-yellow-400 md:w-auto"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Talk to Dr. Shekhar
                </Button>
              </Link>
              <Link href={WHATSAPP_DEMO} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white/10 md:w-auto"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a demo class
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER BLOCK ===== */}
      {FOUNDER && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
              <div>
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-blue-50 shadow-xl ring-1 ring-gray-200">
                  <Image
                    src="/images/faculty/dr-shekhar-portrait.jpg"
                    alt="Dr. Shekhar C Singh, AIIMS Delhi alumnus and founder of Cerebrum Biology Academy"
                    width={640}
                    height={800}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{FOUNDER.rating}/5.0</span>
                  <span className="text-gray-500">·</span>
                  <span>{FOUNDER.studentsGuided.toLocaleString('en-IN')}+ students mentored</span>
                </div>
              </div>

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                  <Award className="h-3 w-3" />
                  Founder &amp; Lead Faculty
                </div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {FOUNDER.name}
                </h2>
                <p className="mb-2 text-lg font-medium text-gray-700">{FOUNDER.qualification}</p>
                <p className="mb-6 text-sm text-gray-500">
                  {FOUNDER.designation} · {FOUNDER.experience}
                </p>
                <p className="mb-6 text-base text-gray-700 sm:text-lg">{FOUNDER.bio}</p>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                  {founderResults.map((r) => (
                    <div
                      key={r.student}
                      className="rounded-xl border border-blue-100 bg-blue-50/50 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 flex-shrink-0 text-yellow-600" />
                        <div className="text-sm font-semibold text-blue-900">{r.student}</div>
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-900">{r.achievement}</div>
                      <div className="mt-1 text-xs text-gray-600">{r.note}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                    Achievements
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {FOUNDER.achievements.slice(0, 6).map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <Link href={WHATSAPP_FOUNDER} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="primary"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp Dr. Shekhar
                    </Button>
                  </Link>
                  <Link href="/dr-shekhar-singh-biology-faculty-india">
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white md:w-auto"
                    >
                      Full faculty profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== DIFFERENTIATORS ===== */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Why this faculty wins
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What makes biology-only different
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Honest answer: most NEET institutes optimise for the median student across three
              subjects. For a student where biology is the gap, that approach loses 30-50 marks.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <d.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{d.title}</h3>
                <p className="text-sm text-gray-600">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SENIOR TEAM ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Senior Team
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Five subject specialists behind the founder
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Each of these faculty teaches their domain across multiple programmes — they're not
              part-time consultants. Extended teaching and lab-support team backs them on student
              doubts and weekly assessments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SENIOR_TEAM.map((faculty, index) => {
              const gradient = [
                'from-blue-600 to-blue-800',
                'from-teal-600 to-teal-800',
                'from-purple-700 to-purple-900',
                'from-green-600 to-green-800',
                'from-blue-700 to-indigo-800',
              ][index % 5]
              return (
                <article
                  key={faculty.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
                >
                  {/* Slim gradient band + overlapping monogram = premium profile card */}
                  <div className={`h-16 bg-gradient-to-br ${gradient}`} />
                  {faculty.rating && (
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {faculty.rating}
                    </div>
                  )}
                  <div className="-mt-10 flex justify-center">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-lg ring-4 ring-white`}
                    >
                      <span className="text-2xl font-bold text-white drop-shadow">
                        {initials(faculty.name)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-3 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{faculty.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-700">
                      {faculty.qualification}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {faculty.designation} · {faculty.experience}
                    </p>

                    {faculty.specialization.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                        {faculty.specialization.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}

                    {faculty.studentsGuided && (
                      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-600">
                        <Users className="h-3.5 w-3.5" />
                        <span>
                          {faculty.studentsGuided.toLocaleString('en-IN')}+ students mentored
                        </span>
                      </div>
                    )}

                    <Link href={`/faculty/${faculty.id}`} className="mt-auto block pt-5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        View full profile
                      </Button>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CROSS-VERTICAL COVERAGE ===== */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Programmes
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Same faculty, five biology pathways
            </h2>
          </div>

          <div className="space-y-3">
            {verticalCoverage.map((v) => (
              <Link
                key={v.label}
                href={v.link}
                className="group flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm md:flex-row sm:items-center sm:gap-6"
              >
                {/* No `w-full`: in production CSS `.w-full` overrode `.sm:w-48`,
                    so the label took the whole row and crushed the description.
                    In flex-col it stretches full-width naturally; in flex-row
                    sm:w-48 now applies cleanly. */}
                <div className="flex-shrink-0 sm:w-48">
                  <span className="text-lg font-bold text-gray-900 group-hover:text-blue-700">
                    {v.label}
                  </span>
                </div>
                <p className="min-w-0 flex-1 text-sm text-gray-700">{v.body}</p>
                <Lightbulb className="hidden h-5 w-5 flex-shrink-0 text-blue-600 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAREERS ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Careers
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Teach biology with us
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            We hire AIIMS / IIT / IISc / DU alumni with a decade-plus of senior teaching. If biology
            is your craft, we'd like to talk.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row sm:gap-4">
            <Link href="/about/careers">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white md:w-auto"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Faculty requirements
              </Button>
            </Link>
            <Link href="/about/careers">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Apply
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Faculty matter most when biology is the gap.
          </h2>
          <p className="mb-8 text-lg text-blue-200">
            Talk to Dr. Shekhar directly on WhatsApp — he answers personally for the first message,
            then routes you to the right tier.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row sm:gap-4">
            <Link href={WHATSAPP_FOUNDER} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="xl"
                className="w-full bg-yellow-500 font-bold text-slate-900 hover:bg-yellow-400 md:w-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Dr. Shekhar
              </Button>
            </Link>
            <a href="tel:+918826444334" className="w-full md:w-auto">
              <Button
                variant="outline"
                size="xl"
                className="w-full border-white/30 text-white hover:bg-white/10 md:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 88264-44334
              </Button>
            </a>
          </div>
        </div>
      </section>

      <FacultyListSchema faculty={facultyMembers} />
    </div>
  )
}
