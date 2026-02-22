import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCountryConfig, SUPPORTED_COUNTRIES } from '@/lib/international/countries'
import { CountryHero } from '@/components/international/CountryHero'
import { CountryWhatsAppCTA } from '@/components/international/CountryWhatsAppCTA'
import { CountryExamSystems } from '@/components/international/CountryExamSystems'
import { CountryPricing } from '@/components/international/CountryPricing'
import { CountryTestimonials } from '@/components/international/CountryTestimonials'
import { CountryFAQ } from '@/components/international/CountryFAQ'
import { CountryFloatingCTA } from '@/components/international/CountryFloatingCTA'
import { CountryTrustSignals } from '@/components/international/CountryTrustSignals'

interface Props {
  params: Promise<{ country: string }>
}

// Generate static params for all 10 countries
export async function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((code) => ({ country: code }))
}

// Generate metadata per country
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params
  const config = getCountryConfig(country)

  if (!config) return {}

  const examList = config.examSystems.slice(0, 3).join(', ')
  const priceString = `${config.currency.symbol}${config.pricing.smallGroup}/hr`

  return {
    title: `Online Biology Tutoring for ${config.name} Students | Cerebrum Academy`,
    description: `Expert biology tutoring for ${examList}. Small group from ${priceString}. Online classes in your timezone. Book a free demo class today!`,
    keywords: [
      `biology tutor ${config.name}`,
      `online biology classes ${config.name}`,
      ...config.examSystems.map((exam) => `${exam} tutoring`),
      `${config.name.toLowerCase()} biology tutor`,
    ],
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/international/${country}/`,
    },
    openGraph: {
      title: `Biology Tutoring for ${config.name} Students`,
      description: `Expert ${config.examSystems[0]} tutoring. From ${priceString}.`,
      url: `https://cerebrumbiologyacademy.com/international/${country}/`,
      siteName: 'Cerebrum Biology Academy',
      locale: config.hreflang.replace('-', '_'),
      type: 'website',
      images: [
        {
          url: `https://cerebrumbiologyacademy.com/og/international-${country}.jpg`,
          width: 1200,
          height: 630,
          alt: `Biology tutoring for ${config.name} students`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Biology Tutoring for ${config.name} Students`,
      description: `Expert tutoring for ${config.examSystems.slice(0, 2).join(' & ')}`,
      images: [`https://cerebrumbiologyacademy.com/og/international-${country}.jpg`],
    },
  }
}

// JSON-LD Structured Data
function generateStructuredData(config: NonNullable<ReturnType<typeof getCountryConfig>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    description: `Expert biology tutoring for ${config.name} students`,
    url: `https://cerebrumbiologyacademy.com/international/${config.code}/`,
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    areaServed: {
      '@type': 'Country',
      name: config.name,
    },
    availableLanguage: 'English',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Biology Tutoring Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Small Group Tutoring',
          price: config.pricing.smallGroup,
          priceCurrency: config.currency.code,
        },
        {
          '@type': 'Offer',
          name: 'One-on-One Tutoring',
          price: config.pricing.oneOnOneMin,
          priceCurrency: config.currency.code,
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '38',
    },
  }
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params
  const config = getCountryConfig(country)

  if (!config) {
    notFound()
  }

  const structuredData = generateStructuredData(config)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen">
        {/* 1. Hero Section */}
        <CountryHero country={config} />

        {/* 2. Primary WhatsApp CTA (Above Fold) */}
        <section className="py-8 bg-gradient-to-r from-green-50 to-teal-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <CountryWhatsAppCTA
              variant="hero"
              country={country}
              message="booking"
              size="xl"
              className="w-full md:w-auto"
            >
              Book Your Free Demo Class
            </CountryWhatsAppCTA>
            <p className="mt-3 text-sm text-slate-600">
              Average response time: &lt; 2 minutes • No commitment required
            </p>
          </div>
        </section>

        {/* 3. Exam Systems Grid */}
        <CountryExamSystems country={config} />

        {/* 4. Course Categories Preview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              Courses for Every {config.name} Student
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              From high school to pre-med, we have courses tailored to your academic journey.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {config.courseCategories.map((category) => (
                <div
                  key={category}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{category}</h3>
                  <p className="text-sm text-slate-600">View Courses →</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Trust Signals */}
        <CountryTrustSignals country={config} />

        {/* 6. Pricing Section */}
        <CountryPricing country={config} />

        {/* 7. Testimonials */}
        <CountryTestimonials country={config} />

        {/* 8. FAQ Section */}
        <CountryFAQ country={config} />

        {/* 9. Final CTA */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Excel in Biology?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join students across {config.name} who are achieving their academic goals with
              personalized online tutoring.
            </p>
            <CountryWhatsAppCTA
              variant="hero"
              country={country}
              message="booking"
              size="xl"
              className="bg-green-500 hover:bg-green-600"
            >
              Start Your Journey Today
            </CountryWhatsAppCTA>
            <p className="mt-4 text-sm text-slate-400">
              Free demo class • No commitment • {config.timezoneAbbr} timezone friendly
            </p>
          </div>
        </section>

        {/* 10. Floating WhatsApp Button */}
        <CountryFloatingCTA country={country} />
      </main>
    </>
  )
}
