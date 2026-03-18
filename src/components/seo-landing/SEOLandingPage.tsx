'use client'

import { SEOLandingContent, coursePageLinks } from '@/data/seo-landing/types'
import { SEOLandingHero } from './SEOLandingHero'
import { PainPointsSection } from './PainPointsSection'
import { BenefitsSection } from './BenefitsSection'
import { MiniTestimonials } from './MiniTestimonials'
import { CourseSummaryCard } from './CourseSummaryCard'
import { SEOFAQSection } from './SEOFAQSection'
import { FinalCTA } from './FinalCTA'
import { ToolsCTASection } from './ToolsCTASection'
import { RelatedBlogPosts } from './RelatedBlogPosts'
import { HowToSchema, DrShekharSinghSchema } from '@/components/seo/StructuredData'
import { AICitationTracking } from '@/components/seo/AICitationTracking'
import { CourseOfferingsSection } from '@/components/seo/CourseOfferingsSection'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SEOLandingPageProps {
  content: SEOLandingContent
}

export function SEOLandingPage({ content }: SEOLandingPageProps) {
  const courseLink = coursePageLinks[content.classLevel]

  // Check if this is a "how-to" style page that should have instructional schema
  const hasHowToContent = content.howToSteps && content.howToSteps.length > 0

  return (
    <main className="min-h-screen">
      {/* HowTo Schema for instructional/guide pages */}
      {hasHowToContent && (
        <HowToSchema
          name={content.title}
          description={content.metaDescription}
          steps={content.howToSteps!}
          totalTime={content.howToMeta?.totalTime}
          supply={content.howToMeta?.supply}
          tool={content.howToMeta?.tool}
        />
      )}

      {/* Author Schema for E-E-A-T signals */}
      <DrShekharSinghSchema />
      {/* Hero Section with Stats */}
      <SEOLandingHero hero={content.hero} stats={content.stats} />

      {/* Pain Points / Challenges */}
      <PainPointsSection painPoints={content.painPoints} />

      {/* Benefits / Why Choose Us */}
      <BenefitsSection benefits={content.benefits} />

      {/* Free Tools CTA Section */}
      {content.toolsCTA && <ToolsCTASection toolsCTA={content.toolsCTA} />}

      {/* Course Summary with Pricing */}
      <CourseSummaryCard
        courseSummary={content.courseSummary}
        classLevel={content.classLevel}
        ctaLink={courseLink}
      />

      {/* Testimonials */}
      <MiniTestimonials testimonials={content.testimonials} />

      {/* Deep Content Section — unique educational content per page */}
      {content.deepContent && content.deepContent.paragraphs.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {content.deepContent.paragraphs.map((para, i) => (
              <div key={i} className={i > 0 ? 'mt-10' : ''}>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{para.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{para.body}</p>
              </div>
            ))}

            {content.deepContent.comparisonTable &&
              content.deepContent.comparisonTable.length > 0 && (
                <div className="mt-10 overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        {Object.keys(content.deepContent.comparisonTable[0]).map((key) => (
                          <th
                            key={key}
                            className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.deepContent.comparisonTable.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {Object.values(row).map((val, j) => (
                            <td
                              key={j}
                              className="border border-gray-200 px-4 py-3 text-sm text-gray-700"
                            >
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            {content.deepContent.checklist && content.deepContent.checklist.length > 0 && (
              <div className="mt-10 rounded-xl bg-green-50 border border-green-200 p-6">
                <h3 className="mb-4 text-lg font-bold text-green-900">Study Checklist</h3>
                <ul className="space-y-3">
                  {content.deepContent.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">{item.item}</span>
                        <p className="text-sm text-gray-600">{item.explanation}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Blog Posts */}
      {content.relatedBlogPosts && content.relatedBlogPosts.length > 0 && (
        <RelatedBlogPosts posts={content.relatedBlogPosts} />
      )}

      {/* FAQ Section */}
      <SEOFAQSection faqs={content.faqs} />

      {/* Course Offerings — NEET, Board, Olympiad, Foundation */}
      <CourseOfferingsSection />

      {/* Related Pages for Internal Linking */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">
            Related Pages You May Find Useful
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {content.relatedPages.map((page, index) => (
              <Link
                key={index}
                href={page.link}
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {page.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA cta={content.cta} contactButtons={content.contactButtons} />

      {/* AI Citation Tracking for GEO */}
      <AICitationTracking
        pageName={content.title}
        pageType="course"
        primaryKeywords={content.keywords.slice(0, 5)}
      />
    </main>
  )
}
