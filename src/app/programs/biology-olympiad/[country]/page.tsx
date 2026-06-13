import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { ChevronDown, ChevronRight, Home, MessageCircle } from 'lucide-react'
import { OlympiadHero } from '@/components/olympiad/OlympiadHero'
import { CurriculumTimeline } from '@/components/olympiad/CurriculumTimeline'
import { PricingTier } from '@/components/olympiad/PricingTier'
import { OlympiadLeadForm } from '@/components/olympiad/OlympiadLeadForm'
import { CountryTestimonials } from '@/components/olympiad/CountryTestimonials'
import { getOlympiadCountry } from '@/config/olympiad-countries'

interface PageProps {
  params: Promise<{ country: string }>
}

export default async function OlympiadCountryPage({ params }: PageProps) {
  const { country: slug } = await params
  const country = getOlympiadCountry(slug)
  if (!country) notFound()

  const url = `https://cerebrumbiologyacademy.com/programs/biology-olympiad/${country.slug}`

  // Soft India geo-nudge (same approach as the hub).
  const h = await headers()
  const visitorCountry = h.get('x-vercel-ip-country')
  const isIndia = visitorCountry === 'IN'

  // Schema.org — country-specific Course + EducationalOrganization + FAQPage + Breadcrumb
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Biology Olympiad Programme',
        item: 'https://cerebrumbiologyacademy.com/programs/biology-olympiad',
      },
      { '@type': 'ListItem', position: 3, name: country.name, item: url },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Biology Olympiad & IBO Coaching — ${country.name}`,
    description: country.heroAngle,
    url,
    inLanguage: `en-${country.iso2}`,
    educationalLevel: 'High School',
    about: 'Biology Olympiad and IBO preparation',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      alternateName: "An AIIMSonian's Initiative",
      url: 'https://cerebrumbiologyacademy.com',
      areaServed: { '@type': 'Country', name: country.name },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `Students at international schools (IB, IGCSE/A-Level, AP, French, German curriculum) in ${country.name} preparing for Biology Olympiad / IBO and Pre-Med pathways.`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT6H',
      courseSchedule: `Live classes in ${country.timezone}`,
      location: { '@type': 'VirtualLocation', url },
    },
    offers: {
      '@type': 'Offer',
      name: 'Small-batch tier — 4 to 6 students',
      price: country.priceMonthlyLocal.toString(),
      priceCurrency: country.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: country.priceMonthlyLocal.toString(),
        priceCurrency: country.currency,
        unitText: 'MONTH',
      },
      availability: 'https://schema.org/InStock',
      url,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: country.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* India banner — soft redirect, not hard */}
        {isIndia && (
          <div className="bg-[#EDE9FF] px-4 py-3 text-sm text-[#2C2C2C]">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                <strong>For students in India:</strong> this page is built for international-school
                families abroad. From India, see our{' '}
                <Link href="/" className="font-semibold text-[#6B5DC6] underline">
                  NEET coaching
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

        {/* Breadcrumb */}
        <nav className="bg-slate-100 py-3 px-4">
          <div className="mx-auto max-w-7xl">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-slate-600 hover:text-[#6B5DC6]">
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />
                <Link
                  href="/programs/biology-olympiad"
                  className="text-slate-600 hover:text-[#6B5DC6]"
                >
                  Biology Olympiad Programme
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />
                <span className="font-medium text-[#6B5DC6]">{country.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        <OlympiadHero country={country} />

        <CurriculumTimeline />

        <PricingTier country={country} />

        <CountryTestimonials testimonials={country.testimonials} countryName={country.name} />

        {/* FAQs */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
              Frequently Asked Questions — {country.name}
            </h2>
            <div className="mt-8 space-y-3">
              {country.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-xl border border-slate-200 bg-white open:shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-5">
                    <span className="pr-4 font-semibold text-[#2C2C2C]">{f.question}</span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-700">{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Lead form */}
        <section className="bg-[#EDE9FF]/40 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
                Book a free counselling call from {country.name}
              </h2>
              <p className="mt-3 text-base text-slate-700 md:text-lg">
                We schedule the call in {country.timezone} so it fits your weekday evening. The call
                covers your child&apos;s current biology level, school curriculum (IB / AP / IGCSE
                etc.), and the most appropriate olympiad track + Pre-Med pathway.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-700">
                  Prefer WhatsApp directly?{' '}
                  <a
                    href={`https://wa.me/918826444334?text=${encodeURIComponent(
                      `Hi! I want to enquire about the Biology Olympiad & IBO programme for ${country.name}.`
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
            <OlympiadLeadForm
              source={`olympiad-${country.slug}`}
              countryLabel={country.name}
              heading={`Enquire — ${country.name}`}
            />
          </div>
        </section>

        {/* Cross-links */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-5xl px-4">
            <h3 className="text-base font-semibold text-[#2C2C2C]">Related programmes</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/programs/biology-olympiad"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#2C2C2C] transition hover:border-[#6B5DC6]"
              >
                ← Programme overview
              </Link>
              {country.canonicalHubUrl && (
                <Link
                  href={country.canonicalHubUrl}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#6B5DC6] bg-[#EDE9FF] px-4 py-2 text-sm font-semibold text-[#6B5DC6]"
                >
                  {country.canonicalHubLabel} (host-country students) →
                </Link>
              )}
              <Link
                href="/ibo-preparation"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#2C2C2C] transition hover:border-[#6B5DC6]"
              >
                IBO preparation hub
              </Link>
              <Link
                href="/biology-olympiads"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#2C2C2C] transition hover:border-[#6B5DC6]"
              >
                All biology olympiads (country-by-country)
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
