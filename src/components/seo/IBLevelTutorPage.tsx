'use client'

import Link from 'next/link'
import Script from 'next/script'
import {
  GraduationCap,
  CheckCircle,
  Target,
  FlaskConical,
  BookOpen,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { IB_ASSESSMENT, IB_THEMES, type IBLevelConfig } from '@/data/ib-biology/levels'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export function IBLevelTutorPage({ config }: { config: IBLevelConfig }) {
  const pageUrl = `${BASE_URL}${config.path}`
  const otherLevelUrl = `${BASE_URL}${config.otherLevelPath}`
  const waMessage = `Hi! I am interested in IB Biology ${config.level} tutoring.`

  return (
    <main className="min-h-screen bg-white">
      {/* Course schema — provider + level, no fabricated pricing */}
      <Script
        id={`ib-${config.level.toLowerCase()}-course-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `${config.fullName} Tutoring`,
            description: config.metaDescription,
            url: pageUrl,
            educationalLevel: config.fullName,
            teaches: `IB Biology ${config.level} (2025 syllabus)`,
            inLanguage: 'en',
            isAccessibleForFree: false,
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
              sameAs: `${BASE_URL}/ib-biology-tutor`,
            },
            about: {
              '@type': 'Thing',
              name: 'International Baccalaureate Biology',
            },
          }),
        }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'IB Biology',
          `IB Biology ${config.level}`,
          'IB Diploma Programme Biology',
          'IB Biology Internal Assessment',
          'IB Biology 2025 syllabus',
        ]}
        jobTitle="Founder & Lead IB Biology Tutor"
      />
      <FAQSchema questions={config.faqs} pageUrl={pageUrl} />
      <BreadcrumbSchema
        showHome={false}
        showSchemaOnly
        items={[
          { label: 'Home', href: '/' },
          { label: 'IB Biology Tutor', href: '/ib-biology-tutor' },
          { label: `IB Biology ${config.level} Tutor`, href: config.path, isCurrentPage: true },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <GraduationCap className="h-4 w-4" />
            IB Diploma Programme · 2025 syllabus
          </div>
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {config.heroTagline}
          </h1>
          <p className="mt-4 max-w-2xl text-blue-50 text-lg">{config.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: config.path,
                  page: config.path,
                  message: waMessage,
                  buttonText: `IB ${config.level} consultation`,
                })
              }
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Book a free IB {config.level} consultation
            </button>
            <Link
              href="/ib-biology-tutor"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              All IB Biology tutoring
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            {config.teachingHours} teaching hours · led by AIIMS-trained Dr. Shekhar C Singh · HL
            &amp; SL specialists across 27 cities
          </p>
        </div>
      </section>

      {/* HL vs SL clarity strip */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <p className="text-gray-700">
            <span className="font-semibold">On the {config.level} page.</span> Taking the other
            level instead?
          </p>
          <Link
            href={config.otherLevelPath}
            className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-800"
          >
            Go to IB Biology {config.otherLevel} tutoring
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Who it's for */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Is IB Biology {config.level} right for you?
        </h2>
        <ul className="mt-6 grid sm:grid-cols-2 gap-3">
          {config.whoIsItFor.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Level-specific differentiators */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            How we tutor IB Biology {config.level}
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {config.differentiators.map((d) => (
              <div
                key={d.title}
                className="rounded-xl bg-white p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 text-blue-700">
                  <Target className="h-5 w-5" />
                  <h3 className="font-semibold text-gray-900">{d.title}</h3>
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus + assessment (shared, factual) */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          The {config.level} syllabus &amp; assessment we prepare you for
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 text-teal-700">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold text-gray-900">Four themes</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {IB_THEMES.map((t) => (
                <li key={t.key} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                    {t.key}
                  </span>
                  {t.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Studied across four levels of organisation: molecules, cells, organisms and
              ecosystems.
              {config.level === 'HL'
                ? ' Higher Level adds additional depth (AHL content) across every theme.'
                : ' Standard Level focuses on the core of each theme.'}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-teal-700">
              <FlaskConical className="h-5 w-5" />
              <h3 className="font-semibold text-gray-900">Assessment</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {IB_ASSESSMENT.map((a) => (
                <li key={a.name} className="rounded-lg border border-gray-100 p-4">
                  <p className="font-semibold text-gray-900">{a.name}</p>
                  <p className="text-sm text-gray-600">{a.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <FAQDisplay
            questions={config.faqs}
            title={`IB Biology ${config.level} tutoring — FAQs`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to aim for a 7 in IB Biology {config.level}?
          </h2>
          <p className="mt-3 text-blue-50">
            Start with a free consultation. We&apos;ll map your current level, your target grade,
            and a plan to get there.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: `${config.path}-cta`,
                  page: config.path,
                  message: waMessage,
                  buttonText: `IB ${config.level} WhatsApp CTA`,
                })
              }
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Message us on WhatsApp
            </button>
            <Link
              href={otherLevelUrl.replace(BASE_URL, '')}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Compare with IB Biology {config.otherLevel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
