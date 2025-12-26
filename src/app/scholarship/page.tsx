'use client'

import Link from 'next/link'
import {
  CheckCircle,
  Award,
  GraduationCap,
  Target,
  Star,
  ArrowRight,
  Trophy,
  FileText,
  Calendar,
  Users,
  Percent,
  IndianRupee,
  BookOpen,
  Clock,
  Phone,
  Mail,
  HelpCircle,
} from 'lucide-react'

export default function ScholarshipPage() {
  const scholarshipTypes = [
    {
      name: 'Merit Scholarship',
      discount: 'Up to 100%',
      criteria: 'Based on previous academic performance',
      eligibility: [
        '90%+ in Class 10/12 Board Exams',
        'Top 10% in school rankings',
        'State/National level exam toppers',
        'Olympiad medal winners',
      ],
      benefits: [
        '50-100% fee waiver',
        'Free study materials',
        'Priority doubt resolution',
        'Mentorship sessions',
      ],
      color: 'yellow',
      icon: Trophy,
    },
    {
      name: 'Need-Based Scholarship',
      discount: 'Up to 75%',
      criteria: 'Based on family income and financial need',
      eligibility: [
        'Annual family income below ₹3 lakhs',
        'Single parent/Guardian situations',
        'Rural area students',
        'First-generation college aspirants',
      ],
      benefits: [
        '25-75% fee waiver',
        'Flexible payment plans',
        'Free course materials',
        'Career counseling support',
      ],
      color: 'green',
      icon: IndianRupee,
    },
    {
      name: 'NEET Performance Scholarship',
      discount: 'Up to 50%',
      criteria: 'Based on previous NEET attempt scores',
      eligibility: [
        'NEET score 500+ in previous attempt',
        'Consistent improvement in mock tests',
        'Regular class attendance (90%+)',
        'Active participation in discussions',
      ],
      benefits: [
        '25-50% fee waiver',
        'Extra practice tests',
        'Personal mentor assignment',
        'Study group placement',
      ],
      color: 'blue',
      icon: Target,
    },
    {
      name: 'Early Bird Scholarship',
      discount: 'Up to 30%',
      criteria: 'For early registrations',
      eligibility: [
        'Registration within first 30 days',
        'Full fee payment upfront',
        'Referral from existing students',
        'Campus visit attendees',
      ],
      benefits: [
        '15-30% instant discount',
        'Priority batch allocation',
        'Welcome kit with materials',
        'Sibling discount stackable',
      ],
      color: 'purple',
      icon: Clock,
    },
  ]

  const applicationProcess = [
    {
      step: 1,
      title: 'Fill Application Form',
      description:
        'Complete the online scholarship application form with accurate details about your academic background and financial situation.',
      duration: '15 minutes',
      icon: FileText,
    },
    {
      step: 2,
      title: 'Submit Documents',
      description:
        'Upload required documents including mark sheets, income certificates, and any achievement certificates.',
      duration: '1-2 days',
      icon: BookOpen,
    },
    {
      step: 3,
      title: 'Scholarship Test',
      description:
        'Take a 60-minute online aptitude test to assess your current Biology knowledge and potential.',
      duration: '60 minutes',
      icon: Target,
    },
    {
      step: 4,
      title: 'Interview (If Required)',
      description:
        'Short interview with our academic counselors to understand your goals and assess scholarship eligibility.',
      duration: '15-20 minutes',
      icon: Users,
    },
    {
      step: 5,
      title: 'Result Announcement',
      description:
        'Scholarship results are announced within 7 days of completing all steps. Successful candidates receive offer letter via email.',
      duration: '5-7 days',
      icon: Award,
    },
  ]

  const successStories = [
    {
      name: 'Rahul Kumar',
      location: 'Bihar',
      scholarship: 'Merit Scholarship (100%)',
      story:
        'Coming from a small village in Bihar, I never thought I could afford quality NEET coaching. The 100% scholarship changed my life. I scored 680 in NEET and now studying at AIIMS Delhi.',
      neetScore: 680,
      college: 'AIIMS Delhi',
    },
    {
      name: 'Priya Sharma',
      location: 'Rajasthan',
      scholarship: 'Need-Based (75%)',
      story:
        "After my father passed away, continuing NEET preparation seemed impossible. Cerebrum's scholarship gave me hope. Today I'm a medical student at SMS Medical College.",
      neetScore: 625,
      college: 'SMS Medical College',
    },
    {
      name: 'Amit Patel',
      location: 'Gujarat',
      scholarship: 'NEET Performance (50%)',
      story:
        'My first NEET attempt was disappointing (420). With the performance scholarship and focused coaching, I improved to 598 in my second attempt.',
      neetScore: 598,
      college: 'BJ Medical College',
    },
  ]

  const faqs = [
    {
      question: 'Can I apply for multiple scholarship types?',
      answer:
        'Yes, you can apply for multiple scholarships. Our team will evaluate your application and award the highest applicable scholarship based on your eligibility.',
    },
    {
      question: 'Are scholarships renewable each year?',
      answer:
        'Merit and need-based scholarships are renewable based on maintaining minimum attendance (85%) and performance criteria. Early bird discounts are one-time offers.',
    },
    {
      question: 'What documents are required for scholarship application?',
      answer:
        'Required documents include: Class 10/12 mark sheets, income certificate (for need-based), any achievement certificates, Aadhaar card, and passport-size photographs.',
    },
    {
      question: 'When are scholarship tests conducted?',
      answer:
        'Scholarship tests are conducted every weekend. You can choose a convenient slot during registration. Online tests are available for students unable to visit the center.',
    },
    {
      question: 'Can scholarship be combined with other discounts?',
      answer:
        'Early bird discount can be combined with sibling discount. However, merit and need-based scholarships cannot be combined. The higher value scholarship will be applied.',
    },
  ]

  const stats = [
    { number: '500+', label: 'Students Awarded', description: 'Scholarships in 2024' },
    { number: '₹2.5 Cr', label: 'Total Disbursed', description: 'In scholarships last year' },
    { number: '100%', label: 'Max Coverage', description: 'For merit toppers' },
    { number: '98%', label: 'Selection Rate', description: 'Of scholarship students' },
  ]

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; light: string }> = {
      yellow: {
        bg: 'bg-yellow-500',
        border: 'border-yellow-500',
        text: 'text-yellow-600',
        light: 'bg-yellow-50',
      },
      green: {
        bg: 'bg-green-600',
        border: 'border-green-600',
        text: 'text-green-600',
        light: 'bg-green-50',
      },
      blue: {
        bg: 'bg-blue-500',
        border: 'border-blue-500',
        text: 'text-blue-600',
        light: 'bg-blue-50',
      },
      purple: {
        bg: 'bg-purple-500',
        border: 'border-purple-500',
        text: 'text-purple-600',
        light: 'bg-purple-50',
      },
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 border border-white/30">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium">
                <span className="font-bold">₹2.5 Crore+</span> in scholarships awarded last year
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Don&apos;t Let Finances Stop Your{' '}
                <span className="text-yellow-300">Medical Dream</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-green-100 mb-4 sm:mb-6">
                Cerebrum Biology Academy offers{' '}
                <span className="font-bold text-yellow-300">up to 100% scholarships</span> for
                deserving NEET aspirants. Your talent and dedication matter more than your financial
                situation.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  <span>Merit-based awards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  <span>Need-based support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  <span>No hidden conditions</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-green-50 transition-all hover:scale-105 inline-flex items-center justify-center text-base sm:text-lg shadow-lg min-h-[44px]"
                >
                  Apply for Scholarship
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
                <Link
                  href="#types"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  View Scholarship Types
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Quick Eligibility Check
              </h3>
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">Academic Excellence</div>
                    <div className="text-green-100 text-xs sm:text-sm">
                      90%+ in boards = Up to 100% off
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">Financial Need</div>
                    <div className="text-green-100 text-xs sm:text-sm">
                      Income &lt; ₹3L = Up to 75% off
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">NEET Performers</div>
                    <div className="text-green-100 text-xs sm:text-sm">
                      500+ in NEET = Up to 50% off
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">Early Registration</div>
                    <div className="text-green-100 text-xs sm:text-sm">
                      Register early = Up to 30% off
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Types */}
      <section id="types" className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Scholarship Programs
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Multiple scholarship options designed to support students from all backgrounds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {scholarshipTypes.map((scholarship, index) => {
              const colors = getColorClasses(scholarship.color)
              const Icon = scholarship.icon
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border-t-4 ${colors.border} hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 sm:p-3 ${colors.light} rounded-lg`}>
                        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          {scholarship.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">{scholarship.criteria}</p>
                      </div>
                    </div>
                    <div
                      className={`${colors.bg} text-white px-3 py-1 rounded-full text-sm font-bold`}
                    >
                      {scholarship.discount}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                        Eligibility
                      </h4>
                      <div className="space-y-2">
                        {scholarship.eligibility.map((item, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`}
                            />
                            <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                        Benefits
                      </h4>
                      <div className="space-y-2">
                        {scholarship.benefits.map((item, i) => (
                          <div key={i} className="flex items-start">
                            <Star
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`}
                            />
                            <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How to Apply
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Simple 5-step process to apply for your scholarship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {applicationProcess.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center h-full">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                    </div>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      {step.description}
                    </p>
                    <div className="text-xs text-green-600 font-medium">{step.duration}</div>
                  </div>
                  {index < applicationProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-green-700 transition-colors min-h-[44px]"
            >
              <FileText className="w-5 h-5" />
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-8 sm:py-12 md:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Scholarship Success Stories
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Real students who achieved their dreams with our scholarships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-green-600 p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold">{story.name}</h3>
                      <p className="text-green-100 text-xs sm:text-sm">{story.location}</p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-3 py-2 inline-block">
                    <span className="text-xs sm:text-sm font-semibold">{story.scholarship}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-gray-700 text-sm sm:text-base mb-4 italic">
                    &quot;{story.story}&quot;
                  </p>

                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">
                        {story.neetScore}
                      </div>
                      <div className="text-xs text-gray-600">NEET Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">
                        {story.college}
                      </div>
                      <div className="text-xs text-gray-600">Currently at</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Your Financial Situation Should Not Define Your Future
          </h2>
          <p className="text-base sm:text-lg text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Apply for our scholarship program today and take the first step towards your medical
            career. Our team is here to support you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
            <Link
              href="/contact"
              className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-green-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="tel:+918826444334"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: +91 88264 44334
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>scholarship@cerebrumbiologyacademy.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Next Test: Every Saturday</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
