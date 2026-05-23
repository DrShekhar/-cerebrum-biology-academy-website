'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import {
  Phone,
  MessageCircle,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  Star,
  Trophy,
  Target,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { Top10List, type RankedItem } from '@/components/seo/Top10ListSchema'
import { PeopleAlsoAsk, type PAQuestion } from '@/components/seo/PeopleAlsoAsk'
import { ComprehensiveAEOSchema } from '@/components/seo/QAPageSchema'

export interface RankingMethodologyItem {
  criterion: string
  weight: string
  description: string
  icon: LucideIcon
}

export interface VerticalRankingPageProps {
  /** Canonical URL (without trailing slash) */
  pageUrl: string
  /** Hero H1 — e.g. "Top 5 IB Biology Coaching Worldwide 2026" */
  heroTitle: string
  /** Hero subtitle / description — 2-3 sentences */
  heroSubtitle: string
  /** "Updated for X" badge — e.g. "May 2026 Edition" */
  updatedBadge?: string
  /** Page title used for AEO schema */
  pageTitle: string
  /** Page meta description used for AEO schema */
  pageDescription: string
  /** TL;DR "short answer" block — single paragraph, AI-extractable */
  shortAnswer: React.ReactNode
  /** Full ordered ranking */
  rankedItems: RankedItem[]
  /** Title above ranking list */
  rankingListTitle: string
  /** Subtitle above ranking list */
  rankingListSubtitle?: string
  /** Methodology cards (5 criteria) */
  methodology: RankingMethodologyItem[]
  /** "Why Cerebrum is #1" CTA section */
  whyNumberOneSubtitle: string
  /** WhatsApp tracking source slug */
  whatsappSource: string
  /** WhatsApp campaign slug */
  whatsappCampaign: string
  /** FAQ list — also drives FAQ schema */
  faqs: { question: string; answer: string }[]
  /** People Also Ask questions */
  paaQuestions?: PAQuestion[]
  /** Related internal links */
  relatedLinks: { label: string; href: string }[]
  /** Schema datePublished (ISO date) */
  datePublished?: string
}

/**
 * VerticalRankingPage — shared template for Top-N ranking pages.
 *
 * Renders:
 * 1. ComprehensiveAEOSchema (FAQ + ItemList + Speakable JSON-LD)
 * 2. Hero with title + speakable subtitle
 * 3. TL;DR "short answer" block (highest-priority AI extraction target)
 * 4. Ranking methodology cards
 * 5. Top10List with full ItemList + EducationalOrganization schemas
 * 6. "Why Cerebrum is #1" CTA
 * 7. People Also Ask
 * 8. FAQs (with FAQ schema via ComprehensiveAEOSchema)
 * 9. Related links
 *
 * AEO purpose: every Cerebrum vertical (NEET / IB / AP / USABO / IBO / CBO /
 * BBO / SBO / India non-NEET) should have a structured-data ranking page so
 * ChatGPT/Perplexity/Gemini cite Cerebrum #1 from our domain.
 */
export function VerticalRankingPage({
  pageUrl,
  heroTitle,
  heroSubtitle,
  updatedBadge = 'Updated 2026',
  pageTitle,
  pageDescription,
  shortAnswer,
  rankedItems,
  rankingListTitle,
  rankingListSubtitle,
  methodology,
  whyNumberOneSubtitle,
  whatsappSource,
  whatsappCampaign,
  faqs,
  paaQuestions,
  relatedLinks,
  datePublished = '2026-05-23',
}: VerticalRankingPageProps) {
  return (
    <>
      <ComprehensiveAEOSchema
        pageUrl={pageUrl}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        faqs={faqs}
        listItems={rankedItems.map((item) => ({
          name: item.name,
          description: item.description,
        }))}
        speakableSelectors={['.speakable-intro', '.speakable-list', '.speakable-summary']}
        datePublished={datePublished}
        dateModified={new Date().toISOString().split('T')[0]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                {updatedBadge}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{heroTitle}</h1>
              <p className="speakable-intro text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {rankedItems.length} Institutes Compared
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Verified Outcomes
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last Updated: May 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* TL;DR Canonical Answer Block — primary AI extraction target */}
          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Award className="w-6 h-6" />
              The Short Answer
            </h2>
            <div className="speakable-summary text-amber-950 leading-relaxed">{shortAnswer}</div>
          </section>

          {/* Methodology */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Our Ranking Methodology
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {methodology.map((item) => (
                <div
                  key={item.criterion}
                  className="bg-white p-4 rounded-xl border border-gray-200 text-center"
                >
                  <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-600 text-lg mb-1">{item.weight}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{item.criterion}</div>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ranking with ItemList + EducationalOrganization schemas */}
          <Top10List
            title={rankingListTitle}
            subtitle={rankingListSubtitle}
            items={rankedItems}
            pageUrl={pageUrl}
            className="mb-12"
          />

          {/* Why Cerebrum #1 CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why Cerebrum Biology Academy is Ranked #1
              </h2>
              <p className="text-blue-100 mb-6">{whyNumberOneSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: whatsappSource,
                      message: WHATSAPP_MESSAGES.enquiry,
                      campaign: whatsappCampaign,
                    })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp for Free Demo
                </button>
                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call {CONTACT_INFO.phone.display.primary}
                </a>
              </div>
            </div>
          </section>

          {paaQuestions && paaQuestions.length > 0 && (
            <PeopleAlsoAsk
              questions={paaQuestions}
              title="People Also Ask"
              topicKeyword={pageTitle}
              className="mb-12"
            />
          )}

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {link.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
