'use client'

import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Shield,
  Star,
  Trophy,
  Users,
  Verified,
} from 'lucide-react'

interface EEATSignalsProps {
  variant?: 'full' | 'compact' | 'inline'
  showExperience?: boolean
  showExpertise?: boolean
  showAuthority?: boolean
  showTrust?: boolean
  className?: string
}

const experienceSignals = [
  {
    icon: Clock,
    label: '10+ Years Teaching NEET Biology',
    description: 'Proven track record since 2014',
  },
  {
    icon: Users,
    label: '5,000+ Students Trained',
    description: 'Across Delhi NCR and online',
  },
  {
    icon: Trophy,
    label: '500+ Medical Selections',
    description: 'Including AIIMS, JIPMER, and top GMCs',
  },
]

const expertiseSignals = [
  {
    icon: GraduationCap,
    label: 'AIIMS & Top Medical Faculty',
    description: 'Faculty from premier medical institutions',
  },
  {
    icon: BookOpen,
    label: 'NCERT-Aligned Curriculum',
    description: 'Updated for NEET 2025 pattern',
  },
  {
    icon: Award,
    label: 'Specialized Biology Focus',
    description: 'Dedicated to Biology excellence',
  },
]

const authoritySignals = [
  {
    icon: Star,
    label: '98% Success Rate',
    description: 'Consistently high results since 2018',
  },
  {
    icon: Verified,
    label: 'Google Verified Business',
    description: 'Trusted by Google Maps users',
  },
  {
    icon: Trophy,
    label: 'Top-Rated Institute',
    description: 'Highest rated NEET coaching in South Delhi',
  },
]

const trustSignals = [
  {
    icon: Shield,
    label: 'Transparent Pricing',
    description: 'No hidden fees, clear fee structure',
  },
  {
    icon: CheckCircle2,
    label: 'Free Demo Class',
    description: 'Try before you commit',
  },
  {
    icon: Users,
    label: '4.8/5 Student Rating',
    description: 'Based on 200+ verified reviews',
  },
]

function SignalCard({
  icon: Icon,
  label,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 p-2 bg-teal-50 rounded-lg">
        <Icon className="w-5 h-5 text-teal-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{label}</p>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
    </div>
  )
}

function SignalBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  )
}

export function EEATSignals({
  variant = 'full',
  showExperience = true,
  showExpertise = true,
  showAuthority = true,
  showTrust = true,
  className = '',
}: EEATSignalsProps) {
  if (variant === 'inline') {
    const allSignals = [
      ...(showExperience ? experienceSignals.slice(0, 1) : []),
      ...(showExpertise ? expertiseSignals.slice(0, 1) : []),
      ...(showAuthority ? authoritySignals.slice(0, 1) : []),
      ...(showTrust ? trustSignals.slice(0, 1) : []),
    ]

    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {allSignals.map((signal, idx) => (
          <SignalBadge key={idx} icon={signal.icon} label={signal.label} />
        ))}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-br from-gray-50 to-teal-50/30 rounded-xl p-6 ${className}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-teal-600" />
          Why Trust Cerebrum Biology Academy?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {showExperience && (
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-teal-600">10+</div>
              <div className="text-xs text-gray-600">Years Experience</div>
            </div>
          )}
          {showAuthority && (
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-teal-600">98%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
          )}
          {showExpertise && (
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-teal-600">500+</div>
              <div className="text-xs text-gray-600">Medical Selections</div>
            </div>
          )}
          {showTrust && (
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-teal-600">4.8</div>
              <div className="text-xs text-gray-600">Student Rating</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className={`py-12 ${className}`} aria-labelledby="eeat-heading">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-10">
          <h2 id="eeat-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Why Students & Parents Trust Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cerebrum Biology Academy is committed to excellence in NEET Biology preparation with
            proven results and trusted methodologies.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showExperience && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Clock className="w-4 h-4 text-teal-600" />
                Experience
              </h3>
              <div className="space-y-3">
                {experienceSignals.map((signal, idx) => (
                  <SignalCard key={idx} {...signal} />
                ))}
              </div>
            </div>
          )}

          {showExpertise && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                Expertise
              </h3>
              <div className="space-y-3">
                {expertiseSignals.map((signal, idx) => (
                  <SignalCard key={idx} {...signal} />
                ))}
              </div>
            </div>
          )}

          {showAuthority && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Trophy className="w-4 h-4 text-teal-600" />
                Authority
              </h3>
              <div className="space-y-3">
                {authoritySignals.map((signal, idx) => (
                  <SignalCard key={idx} {...signal} />
                ))}
              </div>
            </div>
          )}

          {showTrust && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Shield className="w-4 h-4 text-teal-600" />
                Trust
              </h3>
              <div className="space-y-3">
                {trustSignals.map((signal, idx) => (
                  <SignalCard key={idx} {...signal} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Structured data for AI/Search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              description:
                'Premier NEET Biology coaching institute with 10+ years of experience and 98% success rate',
              foundingDate: '2014',
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                value: 25,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '200',
                bestRating: '5',
                worstRating: '1',
              },
              areaServed: [
                { '@type': 'City', name: 'Delhi' },
                { '@type': 'City', name: 'Noida' },
                { '@type': 'City', name: 'Gurgaon' },
                { '@type': 'City', name: 'Ghaziabad' },
                { '@type': 'City', name: 'Faridabad' },
              ],
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'NEET Biology Specialist',
                  description: 'Specialized coaching for NEET Biology with AIIMS faculty',
                },
              ],
              award: [
                'Top NEET Biology Coaching in Delhi NCR',
                '98% Success Rate in NEET',
                '500+ Medical Selections',
              ],
              knowsAbout: [
                'NEET Biology',
                'Medical Entrance Exam Preparation',
                'NCERT Biology',
                'Human Physiology',
                'Genetics',
                'Ecology',
                'Cell Biology',
              ],
            }),
          }}
        />
      </div>
    </section>
  )
}

export function ExperienceBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg ${className}`}
    >
      <Clock className="w-4 h-4 text-amber-600" />
      <span className="text-sm font-medium text-amber-800">10+ Years of NEET Excellence</span>
    </div>
  )
}

export function ExpertiseBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg ${className}`}
    >
      <GraduationCap className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-medium text-blue-800">AIIMS Faculty</span>
    </div>
  )
}

export function AuthorityBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg ${className}`}
    >
      <Trophy className="w-4 h-4 text-green-600" />
      <span className="text-sm font-medium text-green-800">98% Success Rate</span>
    </div>
  )
}

export function TrustBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg ${className}`}
    >
      <Shield className="w-4 h-4 text-teal-600" />
      <span className="text-sm font-medium text-teal-800">Verified & Trusted</span>
    </div>
  )
}

export function CredibilityBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 py-4 px-6 bg-gray-50 rounded-xl ${className}`}
    >
      <ExperienceBadge />
      <ExpertiseBadge />
      <AuthorityBadge />
      <TrustBadge />
    </div>
  )
}

export default EEATSignals
