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

      {/* Related Blog Posts */}
      {content.relatedBlogPosts && content.relatedBlogPosts.length > 0 && (
        <RelatedBlogPosts posts={content.relatedBlogPosts} />
      )}

      {/* FAQ Section */}
      <SEOFAQSection faqs={content.faqs} />

      {/* Related Pages for Internal Linking */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">
            Explore More Courses
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
