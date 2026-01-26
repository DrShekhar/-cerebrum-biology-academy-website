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
  HelpCircle,
} from 'lucide-react'
import { getChapterBySlug, allChapters, getAdjacentChapters } from '@/data/campbell-biology'
import { getUnitById } from '@/data/campbell-biology'
import { CampbellWhatsAppCTA } from '@/components/campbell/CampbellWhatsAppCTA'
import { CampbellFloatingWhatsApp } from '@/components/campbell/CampbellFloatingWhatsApp'

interface ChapterPageProps {
  params: Promise<{ chapter: string }>
}

export async function generateStaticParams() {
  return allChapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const chapter = getChapterBySlug(resolvedParams.chapter)

  if (!chapter) {
    return {
      title: 'Chapter Not Found | Cerebrum Academy',
    }
  }

  return {
    title: chapter.metaTitle,
    description: chapter.metaDescription,
    keywords: chapter.keywords,
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/campbell-biology/${chapter.slug}/`,
    },
    openGraph: {
      title: chapter.metaTitle,
      description: chapter.metaDescription,
      type: 'article',
      siteName: 'Cerebrum Biology Academy',
    },
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params
  const chapter = getChapterBySlug(resolvedParams.chapter)

  if (!chapter) {
    notFound()
  }

  const unit = getUnitById(chapter.unitId)
  const { previous, next } = getAdjacentChapters(chapter.chapterNumber)

  const difficultyColors = {
    foundational: 'bg-green-100 text-green-700 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    advanced: 'bg-red-100 text-red-700 border-red-300',
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
            {unit && (
              <>
                <span className="text-slate-500">Unit {unit.unitNumber}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-green-400">Chapter {chapter.chapterNumber}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Book className="w-4 h-4" />
                Chapter {chapter.chapterNumber}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {chapter.title}
              </h1>

              <p className="text-lg text-slate-300 mb-6">{chapter.heroDescription}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{chapter.estimatedHours} Hours</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Olympiad {chapter.olympiadRelevance.overall}/5</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${difficultyColors[chapter.difficulty]}`}
                >
                  {chapter.difficulty.charAt(0).toUpperCase() + chapter.difficulty.slice(1)}
                </div>
              </div>

              <CampbellWhatsAppCTA
                variant="hero"
                messageType="chapter"
                messageParams={{
                  chapterNumber: chapter.chapterNumber,
                  chapterTitle: chapter.title,
                }}
                campaign={`campbell-chapter-${chapter.chapterNumber}`}
                size="lg"
              >
                Get Help with This Chapter
              </CampbellWhatsAppCTA>
            </div>

            {/* Sidebar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Exam Relevance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">NEET</span>
                  <span
                    className={`px-2 py-1 rounded ${chapter.examRelevance.neet ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}
                  >
                    {chapter.examRelevance.neet ? 'Required' : 'Optional'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">MCAT</span>
                  <span
                    className={`px-2 py-1 rounded ${chapter.examRelevance.mcat ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}
                  >
                    {chapter.examRelevance.mcat ? 'Required' : 'Optional'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">AP Biology</span>
                  <span
                    className={`px-2 py-1 rounded ${chapter.examRelevance.apBiology ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}
                  >
                    {chapter.examRelevance.apBiology ? 'Required' : 'Optional'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">IB Biology</span>
                  <span
                    className={`px-2 py-1 rounded ${chapter.examRelevance.ibBiology ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}
                  >
                    {chapter.examRelevance.ibBiology ? 'Required' : 'Optional'}
                  </span>
                </div>
              </div>

              <hr className="border-slate-600 my-4" />

              <h3 className="text-lg font-bold text-white mb-4">Olympiad Scores</h3>
              <div className="space-y-2">
                {[
                  { name: 'USABO', score: chapter.olympiadRelevance.usabo },
                  { name: 'BBO', score: chapter.olympiadRelevance.bbo },
                  { name: 'INBO', score: chapter.olympiadRelevance.inbo },
                  { name: 'IBO', score: chapter.olympiadRelevance.ibo },
                ].map(({ name, score }) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="text-slate-300 text-sm w-14">{name}</span>
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-slate-400 text-sm">{score}/5</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Topics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Key Topics Covered</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapter.keyTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-slate-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Learning Objectives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.learningObjectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-slate-700">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {chapter.faqs && chapter.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {chapter.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3
                    className="flex items-start gap-3 text-lg font-semibold text-slate-900 mb-3"
                    itemProp="name"
                  >
                    <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-slate-600 pl-9" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {previous ? (
              <Link
                href={`/campbell-biology/${previous.slug}/`}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-slate-200 hover:border-green-500 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-green-500" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">Previous Chapter</div>
                  <div className="font-semibold text-slate-900 text-sm">{previous.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/campbell-biology/${next.slug}/`}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-slate-200 hover:border-green-500 transition-colors group"
              >
                <div className="text-right">
                  <div className="text-xs text-slate-500">Next Chapter</div>
                  <div className="font-semibold text-slate-900 text-sm">{next.title}</div>
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
            Need Help with Chapter {chapter.chapterNumber}?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Get personalized tutoring on {chapter.title} from expert faculty.
          </p>

          <CampbellWhatsAppCTA
            variant="hero"
            messageType="chapter"
            messageParams={{
              chapterNumber: chapter.chapterNumber,
              chapterTitle: chapter.title,
            }}
            campaign={`campbell-chapter-${chapter.chapterNumber}-cta`}
            size="xl"
          >
            Chat on WhatsApp
          </CampbellWhatsAppCTA>

          <p className="mt-4 text-sm text-slate-400">Free demo class • No commitment required</p>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <CampbellFloatingWhatsApp
        messageType="chapter"
        messageParams={{
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.title,
        }}
        campaign={`campbell-chapter-${chapter.chapterNumber}-floating`}
        tooltipTitle={`Help with Chapter ${chapter.chapterNumber}?`}
        tooltipDescription="Get your doubts cleared instantly on WhatsApp."
      />
    </main>
  )
}
