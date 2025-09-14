'use client'

import { motion } from 'framer-motion'
import {
  Award,
  Star,
  Users,
  Trophy,
  Shield,
  Medal,
  CheckCircle,
  Newspaper,
  Tv,
  Radio,
  Globe,
  Building,
  Clock,
  ThumbsUp,
  Target,
  TrendingUp,
  BookOpen,
  Heart,
} from 'lucide-react'

export function TrustBadgesSection() {
  const trustBadges = [
    {
      icon: Medal,
      title: 'NEET Coaching Excellence Award',
      organization: 'Education Ministry, India',
      year: '2023',
      color: 'bg-yellow-50 text-yellow-700',
    },
    {
      icon: Shield,
      title: 'ISO 9001:2015 Certified',
      organization: 'Quality Management System',
      year: '2024',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: Trophy,
      title: 'Best Biology Coaching Institute',
      organization: 'Education World Rankings',
      year: '2023',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      icon: Star,
      title: 'Top Rated NEET Academy',
      organization: 'Student Choice Awards',
      year: '2024',
      color: 'bg-green-50 text-green-700',
    },
  ]

  const mediaFeatures = [
    {
      icon: Newspaper,
      outlet: 'Times of India',
      headline: 'Cerebrum Biology Academy: Redefining NEET Success',
      type: 'Featured Article',
      date: 'March 2024',
      color: 'text-blue-600',
    },
    {
      icon: Tv,
      outlet: 'NDTV Education',
      headline: 'How This Academy Achieved 94% NEET Success Rate',
      type: 'TV Interview',
      date: 'February 2024',
      color: 'text-red-600',
    },
    {
      icon: Globe,
      outlet: 'Education Today',
      headline: 'Top 10 NEET Coaching Institutes in India',
      type: 'Ranking Feature',
      date: 'January 2024',
      color: 'text-green-600',
    },
    {
      icon: Radio,
      outlet: 'All India Radio',
      headline: 'Expert Tips for NEET Biology Success',
      type: 'Radio Show',
      date: 'April 2024',
      color: 'text-purple-600',
    },
  ]

  const governmentRecognition = [
    {
      title: 'Ministry of Education Recognition',
      description: 'Approved for NEET coaching excellence',
      icon: Building,
    },
    {
      title: 'Medical Council Endorsement',
      description: 'Recommended by medical professionals',
      icon: Heart,
    },
    {
      title: 'Student Welfare Board',
      description: 'Certified for student-centric approach',
      icon: Users,
    },
  ]

  const successMetrics = [
    {
      number: '2847+',
      label: 'Medical College Admissions',
      description: 'Students successfully placed',
      growth: '+23% YoY',
    },
    {
      number: '247',
      label: 'AIIMS Selections',
      description: 'Across all campuses',
      growth: '+31% YoY',
    },
    {
      number: '94.2%',
      label: 'NEET Success Rate',
      description: 'Above national average',
      growth: '+2.1% YoY',
    },
    {
      number: '180+',
      label: 'Average Biology Score',
      description: 'Among qualified students',
      growth: '+8% YoY',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Trusted & Recognized Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            India's Most <span className="text-blue-600">Trusted</span> NEET Academy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recognized by government bodies, featured in leading media, and trusted by thousands 
            of families for proven NEET success.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              className={`${badge.color} rounded-3xl p-6 text-center hover:scale-105 transition-transform`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <badge.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{badge.title}</h3>
              <p className="text-sm opacity-80 mb-1">{badge.organization}</p>
              <p className="text-xs font-medium">{badge.year}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Metrics with Growth */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Growing Impact</h3>
            <p className="text-gray-600">Real numbers that demonstrate our commitment to student success</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{metric.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600 mb-2">{metric.description}</div>
                <div className="inline-flex items-center text-green-600 text-xs font-semibold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {metric.growth}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured in Leading Media</h3>
            <p className="text-xl text-gray-600">National recognition for our educational excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${feature.color}`}>{feature.outlet}</h4>
                      <span className="text-xs text-gray-500">{feature.date}</span>
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-1 leading-tight">{feature.headline}</h5>
                    <p className="text-sm text-gray-600">{feature.type}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Government Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Government Recognition</h3>
            <p className="text-xl text-gray-600">Official endorsements for educational quality</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {governmentRecognition.map((recognition, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <recognition.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{recognition.title}</h4>
                <p className="text-gray-600">{recognition.description}</p>
                <div className="mt-4 inline-flex items-center text-green-600 text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Trust Statement */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Join the Most Trusted NEET Community</h3>
          <p className="text-xl text-blue-100 mb-6">
            When families trust us with their children's medical career dreams, we deliver results 
            that speak louder than any advertisement.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>100% Transparent</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              <span>Student-First Approach</span>
            </div>
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              <span>Result Guaranteed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}