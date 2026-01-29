// PERFORMANCE: Replaced framer-motion with CSS animations
// This reduces bundle size by ~200KB for initial load
import {
  Award,
  Trophy,
  GraduationCap,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  Shield,
  BadgeCheck,
} from 'lucide-react'

interface TrustSignal {
  id: string
  value: string
  label: string
  sublabel?: string
  icon: any
  color: string
  verified?: boolean
}

const trustSignals: TrustSignal[] = [
  {
    id: 'experience',
    value: '14+',
    label: 'Years',
    sublabel: 'Proven excellence since 2009',
    icon: Calendar,
    color: 'bg-[#4285f4]',
    verified: true,
  },
  {
    id: 'success-rate',
    value: '98%',
    label: 'Success Rate',
    sublabel: 'NEET 2023-24 qualification rate',
    icon: Trophy,
    color: 'bg-[#34a853]',
    verified: true,
  },
  {
    id: 'top-score',
    value: '695',
    label: 'Top Score',
    sublabel: 'Sadhna Sirin, NEET 2023 (100%ile Biology)',
    icon: Star,
    color: 'bg-[#fbbc04]',
    verified: true,
  },
  {
    id: 'students',
    value: '2,500+',
    label: 'Students',
    sublabel: 'Medical admissions in last 5 years',
    icon: Users,
    color: 'bg-[#3d4d3d]',
    verified: true,
  },
  {
    id: 'faculty',
    value: 'AIIMS',
    label: 'Faculty',
    sublabel: 'Led by Dr. Shekhar C Singh, AIIMS Alumnus',
    icon: GraduationCap,
    color: 'bg-teal-700',
    verified: true,
  },
  {
    id: 'rating',
    value: '4.9/5',
    label: 'Google Rating',
    sublabel: '500+ verified reviews',
    icon: Star,
    color: 'bg-orange-600',
    verified: false,
  },
]

interface TrustSignalsBannerProps {
  variant?: 'full' | 'compact'
  showVerificationBadges?: boolean
  className?: string
}

export function TrustSignalsBanner({
  variant = 'full',
  showVerificationBadges = true,
  className = '',
}: TrustSignalsBannerProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-gray-50 py-4 xs:py-5 sm:py-6 border-y border-blue-100 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {trustSignals.slice(0, 4).map((signal, index) => (
              <div
                key={signal.id}
                className="flex items-center space-x-2 xs:space-x-3 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-8 xs:w-9 sm:w-10 h-8 xs:h-9 sm:h-10 ${signal.color} rounded-full flex items-center justify-center shadow-md`}
                >
                  <signal.icon className="w-4 xs:w-5 h-4 xs:h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-base xs:text-lg font-bold text-gray-900">
                      {signal.value}
                    </span>
                    {signal.verified && showVerificationBadges && (
                      <BadgeCheck className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="text-xs text-gray-600">{signal.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className={`py-12 xs:py-14 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-semibold mb-3 xs:mb-4">
            <Shield className="w-3 xs:w-4 h-3 xs:h-4 mr-2" />
            Verified Trust Signals
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
            Why 2,500+ Students Trust Us
          </h2>
          <p className="text-base xs:text-lg text-gray-600 max-w-2xl mx-auto">
            Every number tells a story of dedication, excellence, and proven results
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
          {trustSignals.map((signal, index) => (
            <div
              key={signal.id}
              className="relative bg-white rounded-xl xs:rounded-2xl p-4 xs:p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Verified Badge */}
              {signal.verified && showVerificationBadges && (
                <div className="absolute top-3 xs:top-4 right-3 xs:right-4">
                  <div className="flex items-center bg-green-100 text-green-800 px-2 xs:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold">
                    <CheckCircle className="w-2.5 xs:w-3 h-2.5 xs:h-3 mr-1" />
                    Verified
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 ${signal.color} rounded-xl xs:rounded-2xl flex items-center justify-center mb-3 xs:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <signal.icon className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-white" />
              </div>

              {/* Content */}
              <div className="mb-2">
                <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {signal.value}
                </div>
                <div className="text-base xs:text-lg font-semibold text-gray-700">
                  {signal.label}
                </div>
              </div>

              {/* Sublabel */}
              {signal.sublabel && (
                <p className="text-sm text-gray-500 leading-relaxed">{signal.sublabel}</p>
              )}

              {/* Hover Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className={`absolute inset-0 rounded-2xl ${signal.color} opacity-10`} />
              </div>
            </div>
          ))}
        </div>

        {/* Verification Statement */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">
              All statistics are verified and based on{' '}
              <span className="font-semibold text-gray-900">NEET 2023-24</span> results
            </span>
          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div
          className="mt-8 xs:mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 animate-fade-in-up"
          style={{ animationDelay: '500ms' }}
        >
          {[
            { icon: Award, label: 'ISO Certified Institute', color: 'text-blue-600' },
            { icon: TrendingUp, label: '4x National Average', color: 'text-green-600' },
            { icon: BadgeCheck, label: 'Government Registered', color: 'text-purple-600' },
            { icon: Star, label: 'Top-Rated on Google', color: 'text-yellow-600' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center space-x-2 text-center">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TrustSignalsMini() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {trustSignals.slice(0, 4).map((signal) => (
        <div key={signal.id} className="flex items-center space-x-2">
          <div className={`w-8 h-8 ${signal.color} rounded-full flex items-center justify-center`}>
            <signal.icon className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm">
            <span className="font-bold text-gray-900">{signal.value}</span>
            <span className="text-gray-600 ml-1">{signal.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
