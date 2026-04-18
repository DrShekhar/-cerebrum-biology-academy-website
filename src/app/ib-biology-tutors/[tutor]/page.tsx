import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { getTutor, tutorSlugs, tutors } from '@/data/ib-biology/tutors'
import { ArrowRight, MessageCircle, Award, CheckCircle2, Clock, Globe } from 'lucide-react'

interface PageProps {
  params: Promise<{ tutor: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return tutorSlugs().map((tutor) => ({ tutor }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tutor } = await params
  const t = getTutor(tutor)
  if (!t) return {}

  const url = `https://cerebrumbiologyacademy.com/ib-biology-tutors/${t.slug}`
  return {
    title: `${t.name} — IB Biology ${t.tier} | Cerebrum`,
    description: t.bio.slice(0, 160),
    keywords: [
      `${t.name} IB Biology`,
      `IB Biology ${t.tier}`,
      `${t.name} tutor`,
      ...t.specialties.slice(0, 3),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${t.name} — IB Biology ${t.tier}`,
      description: t.bio.slice(0, 160),
      url,
      siteName: 'Cerebrum Biology Academy',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${t.name} — IB Biology ${t.tier}`,
      description: t.bio.slice(0, 120),
    },
    robots: { index: true, follow: true },
  }
}

export default async function TutorProfilePage({ params }: PageProps) {
  const { tutor } = await params
  const t = getTutor(tutor)
  if (!t) notFound()

  const url = `https://cerebrumbiologyacademy.com/ib-biology-tutors/${t.slug}`

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.name,
    jobTitle: t.tier,
    description: t.bio,
    url,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    knowsAbout: t.specialties,
    knowsLanguage: t.languages,
    hasCredential: t.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
  }

  const profileFAQs = [
    {
      question: `How do I book a session with ${t.name}?`,
      answer: `Send us a WhatsApp message requesting ${t.name} — we will schedule a 30-minute free demo at a time that fits your ${t.timezones[0]} schedule. Paid sessions start at $${t.hourlyRateUSD}/hr.`,
    },
    {
      question: `What topics is ${t.name} best for?`,
      answer: `${t.name} specialises in ${t.specialties.join(', ')}. For other IB Biology topics, we can match you to a different tutor in our directory.`,
    },
    {
      question: `Does ${t.name} offer IA and EE supervision?`,
      answer:
        t.tier === 'Examiner' || t.tier === 'Qualified Teacher'
          ? `Yes. ${t.name} provides structured IA coaching (all 4 criteria) and EE supervision. Specifically strong on ${t.specialties[0]}.`
          : `${t.name} supports IA drafting and feedback but full EE supervision is typically matched with an Examiner-tier tutor for best criterion coverage.`,
    },
    {
      question: `Can ${t.name} support students preparing for medicine?`,
      answer: t.specialties.some(
        (s) =>
          s.toLowerCase().includes('medic') ||
          s.toLowerCase().includes('medicine') ||
          s.toLowerCase().includes('neet')
      )
        ? `Yes. ${t.name} has specific experience with medical school pathway coaching and can help you choose HL targets that match UK/US/India medical admissions.`
        : `${t.name} teaches IB Biology content that is foundational for medical school. For application-specific coaching (personal statements, MCAT/BMAT), we can pair you with Dr. Shekhar Singh.`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <FAQSchema questions={profileFAQs} pageUrl={url} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'Tutors', href: '/ib-biology-tutors' },
          { label: t.name, isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology" className="hover:text-white">
                    IB Biology
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology-tutors" className="hover:text-white">
                    Tutors
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  {t.name}
                </li>
              </ol>
            </nav>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                <Award className="h-3.5 w-3.5" />
                {t.tier}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300">
                ${t.hourlyRateUSD}/hr
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                {t.yearsExperience} years
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">{t.name}</h1>
            <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">{t.bio}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Teaching philosophy</h2>
                <p className="rounded-xl bg-green-50 p-6 italic text-green-900">
                  &ldquo;{t.philosophy}&rdquo;
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Credentials</h2>
                <ul className="space-y-2">
                  {t.credentials.map((c) => (
                    <li key={c} className="flex gap-3 text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Specialisations</h2>
                <div className="flex flex-wrap gap-2">
                  {t.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-900">At a glance</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <dt className="font-semibold text-gray-900">Timezones</dt>
                      <dd className="text-gray-700">{t.timezones.join(', ')}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <dt className="font-semibold text-gray-900">Languages</dt>
                      <dd className="text-gray-700">{t.languages.join(', ')}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <dt className="font-semibold text-gray-900">Students supported</dt>
                      <dd className="text-gray-700">{t.studentsSupported}+</dd>
                    </div>
                  </div>
                </dl>
              </div>
              {t.availableForDemo && (
                <a
                  href={`https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I'd like a free demo session with ${t.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-green-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book Free Demo
                </a>
              )}
            </aside>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">FAQ</h2>
            <div className="space-y-4">
              {profileFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-green-600 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Other Tutors</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tutorSlugs()
                .filter((s) => s !== t.slug)
                .map((s) => (
                  <Link
                    key={s}
                    href={`/ib-biology-tutors/${s}`}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-700"
                  >
                    {tutors[s].name}
                  </Link>
                ))}
            </div>
            <div className="mt-8">
              <Link
                href="/ib-biology-tutors"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
              >
                Back to full directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
