import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Trophy,
  Monitor,
  School,
  Globe,
  MessageCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title:
    'Our Services | Online, Classroom, International & Doubt Resolution | Cerebrum Biology Academy',
  description:
    'Comprehensive NEET Biology coaching services: Online classes, Classroom teaching, International programs, and 24/7 doubt resolution support.',
  keywords:
    'NEET coaching services, online Biology classes, classroom teaching, international coaching, doubt resolution',
}

export default function ServicesPage() {
  const services = [
    {
      name: 'Online Classes',
      description: 'Interactive live sessions with recorded content access',
      icon: Monitor,
      features: [
        'Live interactive sessions',
        'HD recorded lectures',
        'Digital whiteboard',
        'Real-time doubt clearing',
      ],
      benefits: [
        'Study from anywhere',
        'Flexible scheduling',
        'Unlimited replay access',
        'Cost-effective',
      ],
      pricing: 'Starting ₹15,999',
      link: '/services/online-classes',
      color: 'blue',
    },
    {
      name: 'Classroom Coaching',
      description: 'Traditional face-to-face teaching with personal attention',
      icon: School,
      features: [
        'Small batch sizes',
        'Personal mentoring',
        'Immediate feedback',
        'Peer interaction',
      ],
      benefits: [
        'Direct faculty interaction',
        'Structured learning',
        'Competitive environment',
        'Hands-on practical work',
      ],
      pricing: 'Starting ₹25,999',
      link: '/services/classroom',
      color: 'green',
    },
    {
      name: 'International Programs',
      description: 'Specialized coaching for students abroad and international curricula',
      icon: Globe,
      features: [
        'Timezone flexibility',
        'International curriculum',
        'Global university prep',
        'Cultural adaptation',
      ],
      benefits: [
        'Worldwide accessibility',
        'Board-specific preparation',
        'University counseling',
        'Remote support',
      ],
      pricing: 'Starting $599',
      link: '/services/international',
      color: 'purple',
    },
    {
      name: 'Doubt Resolution',
      description: '24/7 doubt clearing with multiple support channels',
      icon: MessageCircle,
      features: [
        '24/7 availability',
        'Multiple platforms',
        'Expert faculty support',
        'Quick response time',
      ],
      benefits: [
        'Instant clarification',
        'Continuous learning',
        'Confidence building',
        'Academic support',
      ],
      pricing: 'Free with courses',
      link: '/services/doubt-resolution',
      color: 'red',
    },
  ]

  const comparisonFeatures = [
    {
      feature: 'Live Interactive Classes',
      online: true,
      classroom: true,
      international: true,
      doubt: false,
    },
    {
      feature: 'Recorded Lecture Access',
      online: true,
      classroom: false,
      international: true,
      doubt: false,
    },
    {
      feature: 'Personal Mentoring',
      online: 'Limited',
      classroom: true,
      international: true,
      doubt: false,
    },
    {
      feature: 'Practical Lab Work',
      online: 'Virtual',
      classroom: true,
      international: 'Virtual',
      doubt: false,
    },
    {
      feature: 'Peer Interaction',
      online: 'Limited',
      classroom: true,
      international: 'Limited',
      doubt: false,
    },
    { feature: 'Flexibility', online: true, classroom: false, international: true, doubt: true },
    { feature: '24/7 Support', online: false, classroom: false, international: true, doubt: true },
    {
      feature: 'Cost Effectiveness',
      online: true,
      classroom: false,
      international: false,
      doubt: true,
    },
  ]

  const successMetrics = [
    { number: '95%', label: 'Student Satisfaction', description: 'Across all service types' },
    { number: '24/7', label: 'Support Available', description: 'Round the clock assistance' },
    { number: '50+', label: 'Countries Served', description: 'International reach' },
    { number: '98%', label: 'Doubt Resolution Rate', description: 'Within 24 hours' },
  ]

  const whyChooseOurServices = [
    {
      title: 'Flexible Learning Options',
      description:
        'Choose from online, classroom, or hybrid models based on your learning style and convenience',
      icon: Target,
    },
    {
      title: 'Expert Faculty Network',
      description:
        'Experienced AIIMS and top medical college faculty across all service delivery methods',
      icon: Award,
    },
    {
      title: 'Technology Integration',
      description:
        'Advanced learning management systems and digital tools for enhanced learning experience',
      icon: Monitor,
    },
    {
      title: 'Personalized Support',
      description:
        'Individual attention and customized learning paths regardless of service type chosen',
      icon: Users,
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-600',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-600',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-600',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-600',
        text: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700',
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Comprehensive NEET Biology Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Choose from our diverse range of services designed to meet every student's unique
              learning needs. From online flexibility to classroom interaction, we've got you
              covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-white text-indigo-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors min-h-[44px]"
              >
                Get Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Service Excellence Metrics
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Delivering exceptional results across all service formats
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {successMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                  {metric.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Service Offerings
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Flexible learning solutions designed to accommodate different learning preferences and
              lifestyles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const colors = getColorClasses(service.color)

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border-l-4 ${colors.border} hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start mb-4 sm:mb-6">
                    <div
                      className={`p-2 sm:p-3 rounded-lg ${colors.bg} mr-3 sm:mr-4 flex-shrink-0`}
                    >
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <CheckCircle className={`w-4 h-4 mr-2 ${colors.text}`} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                      <div className="space-y-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center">
                            <Star className={`w-4 h-4 mr-2 ${colors.text}`} />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <div>
                      <span className="text-xs sm:text-sm text-gray-600">Starting from</span>
                      <div className={`text-lg sm:text-xl font-bold ${colors.text}`}>
                        {service.pricing}
                      </div>
                    </div>
                    <Link
                      href={service.link}
                      className={`w-full sm:w-auto px-6 py-3 text-white rounded-lg font-semibold transition-colors ${colors.button} text-center min-h-[44px] inline-flex items-center justify-center`}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Service Comparison
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Compare features across our different service offerings
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Features
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                      Online
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                      Classroom
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                      International
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">
                      Doubt Resolution
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {feature.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.online === 'boolean' ? (
                          feature.online ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.online}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.classroom === 'boolean' ? (
                          feature.classroom ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.classroom}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.international === 'boolean' ? (
                          feature.international ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{feature.international}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.doubt ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Comprehensive support system designed for student success across all learning
              modalities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {whyChooseOurServices.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{reason.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Ready to Start Your NEET Journey?
          </h2>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Choose Your Preferred Learning Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="text-left space-y-4">
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Online Classes - Flexible & Convenient</span>
                </div>
                <div className="flex items-center">
                  <School className="w-5 h-5 text-green-600 mr-3" />
                  <span>Classroom Coaching - Personal Touch</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-purple-600 mr-3" />
                  <span>International Programs - Global Reach</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-red-600 mr-3" />
                  <span>24/7 Doubt Resolution - Always Available</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/admissions"
                  className="block bg-indigo-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Explore All Services
                </Link>
                <Link
                  href="/contact"
                  className="block border border-indigo-600 text-indigo-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 sm:p-6">
            <p className="text-sm sm:text-base text-yellow-800 font-semibold mb-2">
              🚀 Limited Time Offer
            </p>
            <p className="text-xs sm:text-sm text-yellow-700">
              Try any service free for 7 days! Experience our teaching quality before making a
              commitment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
