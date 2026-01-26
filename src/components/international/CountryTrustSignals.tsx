import { Star, Users, Clock, Award } from 'lucide-react'
import { type CountryConfig } from '@/lib/international/countries'

interface CountryTrustSignalsProps {
  country: CountryConfig
}

export function CountryTrustSignals({ country }: CountryTrustSignalsProps) {
  const stats = [
    {
      icon: Star,
      value: '4.9/5',
      label: 'Student Rating',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Users,
      value: '500+',
      label: 'Students Taught',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Clock,
      value: '10,000+',
      label: 'Hours Tutored',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      icon: Award,
      value: '95%',
      label: 'Exam Success Rate',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join hundreds of {country.name} students who have achieved their academic goals with our
            expert tutoring.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div
                className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {country.trustBadges.map((badge) => (
            <div
              key={badge}
              className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-slate-300"
            >
              ✓ {badge}
            </div>
          ))}
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-slate-300">
            ✓ {country.timezoneAbbr} Timezone Compatible
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-slate-300">
            ✓ {country.currency.code} Pricing
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountryTrustSignals
