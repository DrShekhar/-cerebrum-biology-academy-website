import { Metadata } from 'next'
import { SeminarHero } from '@/components/seminar/SeminarHero'
import { SeminarValueProps } from '@/components/seminar/SeminarValueProps'
import { SeminarSpeaker } from '@/components/seminar/SeminarSpeaker'
import { SeminarTestimonials } from '@/components/seminar/SeminarTestimonials'
import { SeminarFAQ } from '@/components/seminar/SeminarFAQ'
import { SeminarRegistrationForm } from '@/components/seminar/SeminarRegistrationForm'
import { SeminarFloatingCTA } from '@/components/seminar/SeminarFloatingCTA'
import { SEMINAR_CONFIG } from '@/lib/seminar/config'

export const metadata: Metadata = {
  title: `${SEMINAR_CONFIG.title}`,
  description: SEMINAR_CONFIG.description,
  keywords: [
    'NEET guidance seminar',
    'NEET parents seminar',
    'NEET preparation tips',
    'NEET coaching guidance',
    'NEET 2027 preparation',
    'biology for NEET',
    'NEET parent support',
  ],
  openGraph: {
    title: SEMINAR_CONFIG.title,
    description: SEMINAR_CONFIG.description,
    url: 'https://cerebrumbiologyacademy.com/neet-guidance-seminar/',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og/neet-guidance-seminar.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Parents Guidance Seminar',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEMINAR_CONFIG.title,
    description: SEMINAR_CONFIG.subtitle,
    images: ['https://cerebrumbiologyacademy.com/og/neet-guidance-seminar.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-guidance-seminar/',
  },
}

function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: SEMINAR_CONFIG.title,
    description: SEMINAR_CONFIG.description,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://cerebrumbiologyacademy.com/neet-guidance-seminar/',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    performer: {
      '@type': 'Person',
      name: SEMINAR_CONFIG.speakerName,
      jobTitle: SEMINAR_CONFIG.speakerTitle,
    },
    offers: {
      '@type': 'Offer',
      price: SEMINAR_CONFIG.pricing.standard,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    image: 'https://cerebrumbiologyacademy.com/og/neet-guidance-seminar.jpg',
  }
}

export default function NEETGuidanceSeminarPage() {
  const structuredData = generateStructuredData()

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen">
        {/* Hero Section with Countdown */}
        <SeminarHero />

        {/* Value Propositions */}
        <SeminarValueProps />

        {/* Speaker Section */}
        <SeminarSpeaker />

        {/* Testimonials */}
        <SeminarTestimonials />

        {/* Registration Form */}
        <SeminarRegistrationForm />

        {/* FAQ Section */}
        <SeminarFAQ />

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Child's NEET Success Starts with Informed Parents
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Join 500+ parents who have transformed their approach to supporting their NEET
              aspirant. This seminar has helped children improve by 20+ percentile points on
              average.
            </p>
            <a
              href="#register"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-lg py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              Register Now - Only ₹{SEMINAR_CONFIG.pricing.standard}
            </a>
            <p className="mt-4 text-sm text-green-200">
              100% Money-back guarantee if you're not satisfied
            </p>
          </div>
        </section>

        {/* Floating CTA */}
        <SeminarFloatingCTA />
      </main>
    </>
  )
}
