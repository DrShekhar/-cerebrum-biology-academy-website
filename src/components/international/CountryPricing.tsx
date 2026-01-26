import { CheckCircle } from 'lucide-react'
import { type CountryConfig, formatPrice } from '@/lib/international/countries'
import { CountryWhatsAppCTA } from './CountryWhatsAppCTA'

interface CountryPricingProps {
  country: CountryConfig
}

export function CountryPricing({ country }: CountryPricingProps) {
  const plans = [
    {
      name: 'Small Group',
      description: '3-5 students per session',
      price: country.pricing.smallGroup,
      priceMax: null,
      features: [
        'Live interactive sessions',
        'Collaborative learning',
        'Peer discussions',
        'Recorded sessions',
        'WhatsApp support',
      ],
      popular: false,
    },
    {
      name: 'One-on-One',
      description: 'Personalized attention',
      price: country.pricing.oneOnOneMin,
      priceMax: country.pricing.oneOnOneMax,
      features: [
        'Fully personalized curriculum',
        'Flexible scheduling',
        'Exam-focused preparation',
        'Progress tracking',
        'Priority WhatsApp support',
        'Mock tests & feedback',
      ],
      popular: true,
    },
  ]

  return (
    <section id="pricing" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
          Transparent Pricing for {country.name}
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12">
          All prices in {country.currency.code}. No hidden fees.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 shadow-xl border-2 ${
                plan.popular ? 'border-green-500' : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">
                  {formatPrice(plan.price, country.currency)}
                </span>
                {plan.priceMax && (
                  <span className="text-slate-600">
                    {' '}
                    - {formatPrice(plan.priceMax, country.currency)}
                  </span>
                )}
                <span className="text-slate-600">/hour</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <CountryWhatsAppCTA
                variant={plan.popular ? 'primary' : 'secondary'}
                country={country.code}
                message="courseEnquiry"
                size="lg"
                className="w-full"
              >
                Get Started
              </CountryWhatsAppCTA>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CountryPricing
