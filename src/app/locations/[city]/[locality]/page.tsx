import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { getAllLocalities, getLocalityBySlug } from '@/data/localities'
import { generateLocalityMetadata } from '@/lib/seo/localityMetadata'
import { generateAllSchemas } from '@/lib/seo/localitySchema'
import LocalityHero from '@/components/localities/LocalityHero'
import LocalityFAQ from '@/components/localities/LocalityFAQ'
import { GoogleMapEmbed } from '@/components/maps/GoogleMapEmbed'
import { TrackedWhatsAppButton } from '@/components/common/TrackedWhatsAppButton'
import {
  MapPin,
  Train,
  Bus,
  School,
  Users,
  Trophy,
  Star,
  CheckCircle,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Clock,
} from 'lucide-react'

interface LocalityPageProps {
  params: Promise<{
    city: string
    locality: string
  }>
}

// Generate static paths for all 51 localities
export async function generateStaticParams() {
  const localities = getAllLocalities()

  return localities.map((locality) => ({
    city: locality.citySlug,
    locality: locality.slug,
  }))
}

// Return 404 for any locality not in generateStaticParams
export const dynamicParams = false

// Generate metadata for SEO
export async function generateMetadata({ params }: LocalityPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const locality = getLocalityBySlug(resolvedParams.locality)

  if (!locality) {
    return {
      title: 'Location Not Found',
    }
  }

  return generateLocalityMetadata(locality)
}

export default async function LocalityPage({ params }: LocalityPageProps) {
  const resolvedParams = await params
  const locality = getLocalityBySlug(resolvedParams.locality)

  if (!locality) {
    notFound()
  }

  const schemas = generateAllSchemas(locality)

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.localBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.faq),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.course),
        }}
      />

      {/* Hero Section */}
      <LocalityHero locality={locality} />

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why {locality.displayName} Students Choose Cerebrum Biology Academy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{locality.content.valueProposition}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Trophy className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Results</h3>
              <p className="text-gray-600">
                {locality.socialProof.studentCount}+ students coached with 85%+ scoring 330+ in
                Biology
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Small Batches</h3>
              <p className="text-gray-600">
                Maximum 15 students per batch for personalized attention and doubt clearing
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Faculty</h3>
              <p className="text-gray-600">
                15+ years of NEET Biology teaching experience with proven track record
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Timings</h3>
              <p className="text-gray-600">
                Morning, afternoon, and evening batches available with recorded lectures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories from {locality.displayName}
            </h2>
            <p className="text-gray-600">Real results from real students in your area</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {locality.socialProof.successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 font-medium">{story}</p>
                <p className="text-sm text-gray-500">Verified {locality.displayName} student</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Challenge & Solution */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Understanding {locality.displayName} Students' Challenges
            </h2>
            <p className="text-lg text-gray-700 mb-8">{locality.content.localChallenge}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Proven Methodology</h3>
                <p className="text-sm text-gray-600">
                  NCERT foundation + NEET-level problems + Previous year analysis
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <Target className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Focused Approach</h3>
                <p className="text-sm text-gray-600">
                  Exclusive Biology focus ensures mastery of every concept
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <BookOpen className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Material</h3>
                <p className="text-sm text-gray-600">5000+ questions, tests, and study resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transport & Accessibility */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Convenient for {locality.displayName} Students
            </h2>
            <p className="text-gray-600">Easy access from anywhere in {locality.displayName}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Train className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Metro Connectivity</h3>
              <ul className="space-y-2">
                {locality.transportLinks.metros.slice(0, 3).map((metro, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">{metro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Bus className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bus Routes</h3>
              <p className="text-gray-600 text-sm mb-3">{locality.transportLinks.accessibility}</p>
              <p className="text-sm text-gray-500">
                Routes: {locality.transportLinks.buses.join(', ')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <MapPin className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nearby Landmarks</h3>
              <ul className="space-y-2">
                {locality.nearbyLandmarks.slice(0, 3).map((landmark, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">{landmark}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-8">
            <GoogleMapEmbed
              coordinates={locality.coordinates}
              localityName={locality.displayName}
              centerAddress={locality.centerAddress}
            />
          </div>
        </div>
      </section>

      {/* Schools & Colleges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serving Students from Top {locality.displayName} Schools
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <School className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Schools</h3>
              <div className="space-y-2">
                {locality.demographics.primarySchools.map((school, index) => (
                  <p key={index} className="text-gray-700 flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                    {school}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
              <Award className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Colleges</h3>
              <div className="space-y-2">
                {locality.demographics.popularColleges.map((college, index) => (
                  <p key={index} className="text-gray-700 flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                    {college}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Affordable Quality Coaching for {locality.displayName}
          </h2>
          <p className="text-gray-600 mb-8">
            Best value NEET Biology coaching with flexible payment options
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Pricing Overview */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">₹45,000 - ₹1,56,000</div>
              <p className="text-gray-600 mb-4">
                Per year • Choose from 3 tiers based on your needs
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 inline-block">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Best Value in {locality.city}</span>
                </div>
                <p className="text-sm text-green-700">Starting at ₹45K for foundation courses</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Pursuit Series</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">₹45K - ₹70K</div>
                <p className="text-sm text-gray-600">Essential features • 25 students/batch</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-500">
                <div className="text-xs font-semibold text-purple-600 mb-2">MOST POPULAR</div>
                <h4 className="font-semibold text-gray-900 mb-2">Ascent Series</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">₹60K - ₹90K</div>
                <p className="text-sm text-gray-600">Balanced features • 20 students/batch</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Pinnacle Series</h4>
                <div className="text-2xl font-bold text-green-600 mb-2">₹90K - ₹1.56L</div>
                <p className="text-sm text-gray-600">Premium features • 12 students/batch</p>
              </div>
            </div>

            {/* Payment Benefits */}
            <div className="space-y-2 text-sm text-gray-700 mb-8 text-center">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Flexible EMI options (0% interest available)</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Up to 25% scholarship discounts for meritorious students</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            <div className="mt-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Our Advantage over {locality.city} Coaching Institutes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {locality.competition.ourAdvantage.map((advantage, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/admissions"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Detailed Pricing & Enroll
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LocalityFAQ locality={locality} />

      {/* Nearby Localities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Also Serving Nearby Areas</h2>
            <p className="text-gray-600">Find coaching in localities near {locality.displayName}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {locality.nearbyLocalities.map((nearbySlug, index) => {
              const nearbyLocality = getLocalityBySlug(nearbySlug)
              if (!nearbyLocality) return null

              return (
                <Link
                  key={index}
                  href={`/locations/${nearbyLocality.citySlug}/${nearbyLocality.slug}`}
                  className="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow"
                >
                  <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{nearbyLocality.displayName}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join {locality.socialProof.studentCount}+ students from {locality.displayName} who have
            trusted us with their NEET Biology preparation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Enroll Now
            </Link>
            <TrackedWhatsAppButton
              source={`locality-page-${locality.slug}`}
              message={`Hi, I'm from ${locality.displayName} and interested in NEET Biology coaching`}
              campaign="location-page"
              buttonText="WhatsApp Us"
              variant="outline"
              size="xl"
              showIcon={false}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            />
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Contact: +91-88264-44334 | Available for calling and WhatsApp
          </p>
        </div>
      </section>
    </div>
  )
}
