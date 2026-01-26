import { type CountryConfig, formatPrice } from '@/lib/international/countries'
import { CountryWhatsAppCTA } from './CountryWhatsAppCTA'

interface CountryHeroProps {
  country: CountryConfig
}

export function CountryHero({ country }: CountryHeroProps) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center">
          {/* Country Flag */}
          <span className="text-6xl md:text-7xl mb-6 block">{country.flag}</span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Expert Biology Tutoring for <span className="text-green-400">{country.name}</span>{' '}
            Students
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Master {country.examSystems.slice(0, 3).join(', ')} with personalized online tutoring.
            Available in your timezone ({country.timezoneAbbr}).
          </p>

          {/* Pricing Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <span className="text-slate-300">Small Group</span>
            <span className="text-2xl font-bold text-green-400">
              {formatPrice(country.pricing.smallGroup, country.currency)}/hr
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300">1-on-1</span>
            <span className="text-2xl font-bold text-yellow-400">
              from {formatPrice(country.pricing.oneOnOneMin, country.currency)}/hr
            </span>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CountryWhatsAppCTA variant="hero" country={country.code} message="booking" size="xl">
              Book Free Demo Class
            </CountryWhatsAppCTA>
            <a
              href="#pricing"
              className="px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              View Pricing
            </a>
          </div>

          {/* Response time indicator */}
          <p className="mt-6 text-sm text-slate-400">
            Average WhatsApp response time: &lt; 2 minutes
          </p>
        </div>
      </div>
    </section>
  )
}

export default CountryHero
