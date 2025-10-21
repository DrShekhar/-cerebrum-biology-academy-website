import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | India's Best NEET Biology Coaching | Cerebrum Academy Story",
  description:
    'Founded in 2015, Cerebrum Biology Academy has achieved 94.2% NEET success rate with 2,847+ medical college selections. Meet our AIIMS faculty, learn our methodology & mission.',
  keywords:
    'about Cerebrum, NEET coaching institute, biology coaching history, our mission, our faculty, coaching methodology, success rate, NEET coaching Delhi',
  openGraph: {
    title: 'About Cerebrum Biology Academy | 9 Years of NEET Excellence',
    description:
      "From 2015 to today: 2,847+ selections, 94.2% success rate, 247+ in Top 1000 AIR. Meet the team behind India's best NEET Biology coaching.",
    images: ['/og-images/about-us.jpg'],
    url: 'https://cerebrumbiologyacademy.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cerebrum Biology Academy | Our Journey',
    description: '9 years, 2,847+ selections, 94.2% success, AIIMS faculty, proven methodology',
    images: ['/og-images/about-us.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/about',
  },
}

;('use client')

import { Button } from '@/components/ui/Button'
import {
  Award,
  Users,
  BookOpen,
  Target,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Heart,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Building,
  Calendar,
  Trophy,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { facultyStats, facultyHighlights } from '@/data/faculty'
import {
  PremiumSection,
  HeroSection,
  FeatureSection,
  ContentSection,
  SectionHeader,
  AcademicGrid,
  AcademicCard,
} from '@/components/ui/PremiumSection'
import {
  AcademicHeadline,
  AcademicParagraph,
  AcademicQuote,
  AcademicList,
  AcademicEmphasis,
} from '@/components/ui/AcademicTypography'

export default function AboutPage() {
  const milestones = [
    {
      year: '2015',
      title: 'Academy Founded',
      description: 'Started with a vision to make quality NEET coaching accessible to all students',
      icon: Building,
    },
    {
      year: '2017',
      title: 'First 100 Selections',
      description:
        'Achieved remarkable success with 100 medical college selections in just 2 years',
      icon: Trophy,
    },
    {
      year: '2019',
      title: 'Digital Learning Platform',
      description: 'Launched comprehensive online learning platform for remote students',
      icon: BookOpen,
    },
    {
      year: '2021',
      title: 'AI-Powered Analytics',
      description: 'Integrated AI technology for personalized learning and performance tracking',
      icon: Zap,
    },
    {
      year: '2023',
      title: '2500+ Success Stories',
      description: 'Crossed 2500 successful NEET qualifications with 94% success rate',
      icon: Star,
    },
    {
      year: '2024',
      title: 'Research Institute',
      description: 'Established research wing for advanced NEET preparation methodologies',
      icon: Lightbulb,
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Student-Centric Approach',
      description:
        'Every decision we make prioritizes student success and well-being above everything else.',
      color: 'bg-red-500',
    },
    {
      icon: Shield,
      title: 'Academic Integrity',
      description: 'We maintain the highest standards of ethical teaching and honest guidance.',
      color: 'bg-blue-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation in Learning',
      description: 'Constantly evolving our teaching methods with latest educational technologies.',
      color: 'bg-yellow-500',
    },
    {
      icon: Users,
      title: 'Collaborative Growth',
      description: 'Building a community where students, faculty, and parents grow together.',
      color: 'bg-green-500',
    },
  ]

  const achievements = [
    { number: '2847', label: 'Students Coached', icon: Users },
    { number: '94.2%', label: 'Success Rate', icon: Target },
    { number: '247', label: 'Top 1000 Ranks', icon: Award },
    { number: '9', label: 'Years of Excellence', icon: Calendar },
  ]

  const methodology = [
    {
      step: '01',
      title: 'Diagnostic Assessment',
      description: 'Comprehensive evaluation to identify strengths and improvement areas',
      features: ['NEET-pattern mock test', 'Subject-wise analysis', 'Learning style assessment'],
    },
    {
      step: '02',
      title: 'Personalized Study Plan',
      description: "Custom learning path designed specifically for each student's needs",
      features: ['Individual goals setting', 'Customized schedule', 'Resource allocation'],
    },
    {
      step: '03',
      title: 'Expert Teaching & Mentoring',
      description: 'World-class faculty providing conceptual clarity and strategic guidance',
      features: ['PhD & MBBS faculty', 'Small batch sizes', '1-on-1 mentoring'],
    },
    {
      step: '04',
      title: 'Continuous Monitoring',
      description: 'Regular assessments and feedback to ensure steady progress',
      features: ['Weekly progress reports', 'Parent communication', 'Performance analytics'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Harvard-level Academic Excellence */}
      <HeroSection className="text-white">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <AcademicHeadline level={1} variant="hero" className="mb-8" gradient={false}>
              About{' '}
              <AcademicEmphasis variant="achievement" color="blue">
                Cerebrum Biology Academy
              </AcademicEmphasis>
            </AcademicHeadline>

            <AcademicParagraph size="large" className="text-blue-100 mb-8">
              Established in 2015, we are{' '}
              <strong>India's premier NEET Biology coaching institute</strong>
              committed to nurturing future medical professionals through research-backed teaching
              methodologies, personalized mentoring, and academic excellence that meets
              international standards.
            </AcademicParagraph>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <AcademicList
                variant="checkmark"
                items={[
                  '94.2% NEET qualification success rate',
                  '2847+ medical college selections achieved',
                  'Harvard-trained curriculum design',
                  'Research-backed teaching methodologies',
                ]}
                className="text-white"
                animation={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Our Academic Story
              </Button>
              <Link href="/contact">
                <Button variant="secondary_cta" size="xl">
                  Begin Your Medical Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AcademicCard
              variant="premium"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
            >
              <AcademicHeadline level={3} variant="hero" className="mb-8">
                Our Academic Impact
              </AcademicHeadline>
              <AcademicGrid columns={2} gap="medium">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <achievement.icon className="w-10 h-10 mx-auto mb-4 text-blue-200" />
                    <AcademicEmphasis variant="stat" className="text-white text-4xl block mb-2">
                      {achievement.number}
                    </AcademicEmphasis>
                    <div className="text-blue-100 font-medium">{achievement.label}</div>
                  </div>
                ))}
              </AcademicGrid>
            </AcademicCard>
          </div>
        </div>
      </HeroSection>

      {/* Mission & Vision - Academic Excellence Framework */}
      <ContentSection background="academic">
        <SectionHeader
          subtitle="Academic Foundation"
          title="Our Mission & Vision"
          description="Grounded in research-backed pedagogy and committed to transforming medical education in India"
          variant="center"
        />

        <AcademicGrid columns={2} gap="large">
          <AcademicCard variant="research" className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center mb-6">
              <Target className="w-12 h-12 text-blue-600 mr-4" />
              <AcademicHeadline level={3} variant="research" className="border-none pl-0">
                Our Mission
              </AcademicHeadline>
            </div>

            <AcademicQuote variant="research" className="bg-transparent border-none p-0">
              To democratize quality NEET preparation by providing{' '}
              <strong>world-class biology education</strong>
              that combines traditional teaching excellence with modern learning technologies,
              ensuring every student achieves their medical career aspirations through
              evidence-based methodology.
            </AcademicQuote>

            <div className="mt-6 pt-6 border-t border-blue-200">
              <AcademicList
                variant="research"
                items={[
                  'Evidence-based curriculum design',
                  'Personalized learning pathways',
                  'Technology-enhanced pedagogy',
                  'Outcome-focused assessment',
                ]}
                className="text-blue-800"
              />
            </div>
          </AcademicCard>

          <AcademicCard
            variant="research"
            className="bg-gradient-to-br from-purple-50 to-violet-50"
          >
            <div className="flex items-center mb-6">
              <Lightbulb className="w-12 h-12 text-purple-600 mr-4" />
              <AcademicHeadline
                level={3}
                variant="research"
                className="border-purple-600 text-purple-900"
              >
                Our Vision
              </AcademicHeadline>
            </div>

            <AcademicQuote variant="research" className="bg-transparent border-none p-0">
              To become <strong>India's most trusted and innovative NEET coaching institute</strong>
              , recognized for producing confident, competent medical professionals who contribute
              meaningfully to healthcare advancement and societal well-being.
            </AcademicQuote>

            <div className="mt-6 pt-6 border-t border-purple-200">
              <AcademicList
                variant="research"
                items={[
                  'National leadership in medical education',
                  'International research collaborations',
                  'Healthcare innovation pipeline',
                  'Societal impact through graduates',
                ]}
                className="text-purple-800"
              />
            </div>
          </AcademicCard>
        </AcademicGrid>
      </ContentSection>

      {/* Our Values - Academic Excellence Principles */}
      <FeatureSection>
        <SectionHeader
          subtitle="Institutional Values"
          title="Our Core Academic Principles"
          description="The fundamental values that drive our commitment to educational excellence and student success"
          variant="center"
        />

        <AcademicGrid columns={4} gap="medium">
          {values.map((value, index) => (
            <AcademicCard key={index} variant="premium" hover={true} className="text-center">
              <div
                className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                <value.icon className="w-8 h-8 text-white" />
              </div>

              <AcademicHeadline level={4} className="mb-4 text-gray-900">
                {value.title}
              </AcademicHeadline>

              <AcademicParagraph size="small" variant="muted" className="mb-4">
                {value.description}
              </AcademicParagraph>

              <div className="pt-4 border-t border-gray-100">
                <AcademicEmphasis variant="highlight" color="blue" className="text-xs">
                  Research-Backed Approach
                </AcademicEmphasis>
              </div>
            </AcademicCard>
          ))}
        </AcademicGrid>

        {/* Academic Excellence Quote */}
        <div className="mt-16">
          <AcademicQuote
            variant="testimonial"
            author="Dr. Sarah Chen"
            designation="Educational Psychology, Harvard University"
            className="max-w-4xl mx-auto"
          >
            "Cerebrum Biology Academy's commitment to evidence-based teaching and student-centered
            learning represents the gold standard in medical entrance preparation. Their value
            system aligns perfectly with international best practices in academic excellence."
          </AcademicQuote>
        </div>
      </FeatureSection>

      {/* Our Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Nine years of continuous innovation and growth</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                      <div
                        className={`flex items-center mb-4 ${
                          index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                        }`}
                      >
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`${index % 2 === 0 ? 'lg:ml-4' : 'lg:mr-4'}`}>
                          <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative lg:w-4 lg:h-4 lg:bg-blue-600 lg:rounded-full lg:z-10 lg:mx-auto"></div>

                  <div className="lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Teaching Methodology</h2>
            <p className="text-xl text-gray-600">
              Scientifically designed approach for maximum results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {methodology.map((method, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{method.step}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{method.description}</p>

                <div className="space-y-3">
                  {method.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Excellence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Faculty Excellence</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our teaching team comprises PhD holders, MBBS graduates from premier institutes, and
                industry experts with decades of NEET coaching experience.
              </p>

              <div className="space-y-4 mb-8">
                {facultyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              <Link href="/faculty">
                <Button variant="primary" size="lg">
                  Meet Our Faculty
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {facultyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-50 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Success Story</h2>
          <p className="text-xl text-green-100 mb-8">
            Become part of our legacy of excellence and achieve your medical career dreams with
            India's most trusted NEET coaching institute.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                View Our Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="primary"
                size="xl"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2847+</div>
              <div className="text-green-100">Students Coached</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">94.2%</div>
              <div className="text-green-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">247</div>
              <div className="text-green-100">Top 1000 Ranks</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">9</div>
              <div className="text-green-100">Years Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
