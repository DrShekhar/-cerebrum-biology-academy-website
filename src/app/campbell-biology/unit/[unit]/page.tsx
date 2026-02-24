import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Book,
  Clock,
  Trophy,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  GraduationCap,
  Target,
} from 'lucide-react'
import { campbellUnits, getUnitBySlug, getAdjacentUnits } from '@/data/campbell-biology/units'
import { getChaptersByUnitId } from '@/data/campbell-biology'
import { CampbellWhatsAppCTA } from '@/components/campbell/CampbellWhatsAppCTA'
import { CampbellFloatingWhatsApp } from '@/components/campbell/CampbellFloatingWhatsApp'

interface UnitPageProps {
  params: Promise<{ unit: string }>
}

export async function generateStaticParams() {
  return campbellUnits.map((unit) => ({
    unit: unit.slug,
  }))
}

export async function generateMetadata({ params }: UnitPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const unit = getUnitBySlug(resolvedParams.unit)

  if (!unit) {
    return {
      title: 'Unit Not Found',
    }
  }

  return {
    title: unit.metaTitle,
    description: unit.metaDescription,
    keywords: unit.keywords,
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/campbell-biology/unit/${unit.slug}/`,
    },
    openGraph: {
      title: unit.metaTitle,
      description: unit.metaDescription,
      type: 'article',
      siteName: 'Cerebrum Biology Academy',
    },
  }
}

export default async function UnitPage({ params }: UnitPageProps) {
  const resolvedParams = await params
  const unit = getUnitBySlug(resolvedParams.unit)

  if (!unit) {
    notFound()
  }

  const chapters = getChaptersByUnitId(unit.id)
  const { previous, next } = getAdjacentUnits(unit.unitNumber)

  const olympiadColors: Record<number, string> = {
    5: 'bg-green-100 text-green-700 border-green-300',
    4: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    3: 'bg-orange-100 text-orange-700 border-orange-300',
    2: 'bg-red-100 text-red-700 border-red-300',
    1: 'bg-gray-100 text-gray-700 border-gray-300',
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/campbell-biology/" className="hover:text-green-400 transition-colors">
              Campbell Biology
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-400">Unit {unit.unitNumber}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Book className="w-4 h-4" />
                Unit {unit.unitNumber} of 8
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {unit.title}
              </h1>

              <p className="text-xl text-green-400 font-medium mb-4">{unit.subtitle}</p>

              <p className="text-lg text-slate-300 mb-6">{unit.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                  <Book className="w-5 h-5 text-green-400" />
                  <span>{unit.chapterCount} Chapters</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{unit.estimatedHours} Hours</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Olympiad {unit.olympiadRelevance}/5</span>
                </div>
              </div>

              <CampbellWhatsAppCTA
                variant="hero"
                messageType="unit"
                messageParams={{
                  unitNumber: unit.unitNumber,
                  unitTitle: unit.title,
                }}
                campaign={`campbell-unit-${unit.unitNumber}`}
                size="lg"
              >
                Get Help with This Unit
              </CampbellWhatsAppCTA>
            </div>

            {/* Sidebar - Key Themes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Key Themes
              </h3>
              <ul className="space-y-3">
                {unit.keyThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{theme}</span>
                  </li>
                ))}
              </ul>

              <hr className="border-slate-600 my-4" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Chapter Range</span>
                  <span className="text-white font-medium">
                    Ch. {unit.chapterRange.start} - {unit.chapterRange.end}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Olympiad Relevance</span>
                  <span
                    className={`px-2 py-1 rounded border ${olympiadColors[unit.olympiadRelevance]}`}
                  >
                    {unit.olympiadRelevance === 5
                      ? 'Essential'
                      : unit.olympiadRelevance === 4
                        ? 'High'
                        : 'Moderate'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Chapters in This Unit
          </h2>
          <p className="text-slate-600 mb-8">
            {unit.chapterCount} chapters covering {unit.subtitle.toLowerCase()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => {
              const difficultyColors = {
                foundational: 'bg-green-100 text-green-700',
                intermediate: 'bg-yellow-100 text-yellow-700',
                advanced: 'bg-red-100 text-red-700',
              }

              return (
                <Link
                  key={chapter.id}
                  href={`/campbell-biology/${chapter.slug}/`}
                  className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-green-500 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-bold text-lg">
                      {chapter.chapterNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors mb-2">
                        {chapter.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3 h-3" />
                          {chapter.estimatedHours}h
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Trophy className="w-3 h-3" />
                          {chapter.olympiadRelevance.overall}/5
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${difficultyColors[chapter.difficulty]}`}
                        >
                          {chapter.difficulty}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-green-500 transition-colors" />
                  </div>

                  {/* Key Topics Preview */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {chapter.keyTopics.slice(0, 2).join(' • ')}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            What You'll Master in Unit {unit.unitNumber}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {unit.keyThemes.map((theme, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-slate-700 font-medium">{theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {previous ? (
              <Link
                href={`/campbell-biology/unit/${previous.slug}/`}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-slate-200 hover:border-green-500 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-green-500" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">Previous Unit</div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Unit {previous.unitNumber}: {previous.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/campbell-biology/"
              className="px-4 py-2 text-sm text-slate-600 hover:text-green-600 transition-colors"
            >
              ← Back to All Units
            </Link>

            {next ? (
              <Link
                href={`/campbell-biology/unit/${next.slug}/`}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-slate-200 hover:border-green-500 transition-colors group"
              >
                <div className="text-right">
                  <div className="text-xs text-slate-500">Next Unit</div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Unit {next.unitNumber}: {next.title}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-green-500" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help with Unit {unit.unitNumber}?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Get personalized tutoring on {unit.title} from expert faculty. Master all{' '}
            {unit.chapterCount} chapters with guided instruction.
          </p>

          <CampbellWhatsAppCTA
            variant="hero"
            messageType="unit"
            messageParams={{
              unitNumber: unit.unitNumber,
              unitTitle: unit.title,
            }}
            campaign={`campbell-unit-${unit.unitNumber}-cta`}
            size="xl"
          >
            Chat on WhatsApp
          </CampbellWhatsAppCTA>

          <p className="mt-4 text-sm text-slate-400">Free demo class • No commitment required</p>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <CampbellFloatingWhatsApp
        messageType="unit"
        messageParams={{
          unitNumber: unit.unitNumber,
          unitTitle: unit.title,
        }}
        campaign={`campbell-unit-${unit.unitNumber}-floating`}
        tooltipTitle={`Help with Unit ${unit.unitNumber}?`}
        tooltipDescription={`Get your doubts cleared on ${unit.title} instantly.`}
      />
    </main>
  )
}
