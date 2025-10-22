'use client'

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

export function AboutPageClient() {
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
      year: '2025',
      title: 'Global Reach',
      description: 'Expanded to serve students across 50+ countries with advanced AI learning',
      icon: Target,
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Student-First Approach',
      description:
        'Every decision we make prioritizes student success, learning experience, and career goals.',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      icon: Shield,
      title: 'Excellence in Education',
      description:
        'We maintain the highest standards in teaching quality, content accuracy, and exam preparation.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Technology',
      description:
        'Leveraging AI and modern pedagogy to create personalized, effective learning experiences.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: Users,
      title: 'Community Building',
      description:
        'Fostering a supportive community of students, teachers, and medical professionals.',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Enrolled Students', icon: Users },
    { value: '2,847', label: 'Medical College Selections', icon: Trophy },
    { value: '94.2%', label: 'NEET Qualification Rate', icon: Target },
    { value: '247', label: 'In Top 1000 AIR', icon: Star },
    { value: '50+', label: 'Countries Served', icon: TrendingUp },
    { value: '9 Years', label: 'Of Excellence', icon: Calendar },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px_32px]" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="h-4 w-4" />
              <span>9 Years of NEET Excellence</span>
            </div>

            <AcademicHeadline className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-teal-700 bg-clip-text text-transparent">
              Our Story,
              <br />
              Your Success
            </AcademicHeadline>

            <AcademicParagraph className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              From a small coaching center in 2015 to India's most trusted NEET Biology academy
              serving 10,000+ students worldwide
            </AcademicParagraph>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="group">
                  Explore Our Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="group">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </HeroSection>

      {/* Stats Section */}
      <PremiumSection className="bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </PremiumSection>

      {/* Mission Section */}
      <FeatureSection className="bg-gradient-to-b from-slate-50 to-white">
        <SectionHeader
          label="Our Mission"
          title="Empowering Future Doctors"
          description="We believe every student deserves world-class NEET preparation that's accessible, effective, and personalized to their learning style."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6">
            <AcademicQuote className="text-lg border-l-4 border-blue-600 pl-6 py-2">
              "Our mission is not just to help students clear NEET, but to nurture future healthcare
              professionals who will serve society with excellence and compassion."
            </AcademicQuote>

            <AcademicList
              items={[
                'Provide AIIMS-quality education accessible to students everywhere',
                'Leverage AI and technology for personalized learning experiences',
                'Maintain 90%+ NEET qualification rates through proven methodologies',
                'Build a supportive community of aspiring medical professionals',
                'Continuously innovate our teaching methods based on latest exam patterns',
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: BookOpen,
                stat: '500+',
                label: 'Video Lectures',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: CheckCircle,
                stat: '10,000+',
                label: 'Practice Questions',
                color: 'bg-emerald-50 text-emerald-600',
              },
              {
                icon: Clock,
                stat: '24/7',
                label: 'Doubt Support',
                color: 'bg-amber-50 text-amber-600',
              },
              {
                icon: Award,
                stat: '15+',
                label: 'AIIMS Faculty',
                color: 'bg-purple-50 text-purple-600',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${item.color} p-6 rounded-2xl`}
              >
                <item.icon className="h-8 w-8 mb-3" />
                <div className="text-2xl font-bold mb-1">{item.stat}</div>
                <div className="text-sm opacity-80">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </FeatureSection>

      {/* Milestones Timeline */}
      <ContentSection className="bg-white">
        <SectionHeader
          label="Our Journey"
          title="Milestones of Excellence"
          description="A decade of dedication to student success and educational innovation"
        />

        <div className="space-y-8 mt-12 max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 group"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                  <milestone.icon className="h-8 w-8" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-blue-600 font-semibold mb-1">{milestone.year}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                <p className="text-slate-600">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Core Values */}
      <FeatureSection className="bg-gradient-to-b from-slate-50 to-white">
        <SectionHeader
          label="Our Values"
          title="What Drives Us Forward"
          description="The principles that guide every decision and shape our teaching philosophy"
        />

        <AcademicGrid className="mt-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AcademicCard className="group hover:shadow-2xl transition-all duration-300">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                >
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </AcademicCard>
            </motion.div>
          ))}
        </AcademicGrid>
      </FeatureSection>

      {/* Faculty Highlights */}
      <ContentSection className="bg-white">
        <SectionHeader
          label="Our Faculty"
          title="Learn from the Best"
          description="AIIMS graduates and experienced educators committed to your success"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {facultyStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">{stat.label}</div>
              <div className="text-sm text-slate-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <AcademicEmphasis className="text-lg mb-8">
            Our faculty includes AIIMS Delhi graduates, NEET toppers, and educators with 10+ years
            of teaching experience
          </AcademicEmphasis>
          <Link href="/faculty">
            <Button size="lg" variant="outline" className="group">
              Meet Our Faculty Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <PremiumSection className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join 10,000+ Students in Their NEET Success Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the Cerebrum difference with our proven methodology, expert faculty, and
            personalized learning approach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" variant="secondary" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                Book Free Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </PremiumSection>
    </div>
  )
}
