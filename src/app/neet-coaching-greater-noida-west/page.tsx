'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Train,
  Building2,
  School,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Play,
  Home,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const majorSocieties = [
  {
    name: 'Gaur City 1 & 2',
    students: '180+',
    towers: '50+ towers',
    highlights: ['Largest township', 'Mall inside', 'Metro nearby'],
  },
  {
    name: 'Ace City',
    students: '70+',
    towers: '12 towers',
    highlights: ['Premium location', 'Near Pari Chowk', 'Good connectivity'],
  },
  {
    name: 'Supertech Eco Village',
    students: '65+',
    towers: '20+ towers',
    highlights: ['Affordable premium', 'Green campus', 'Large community'],
  },
  {
    name: 'Panchsheel Greens',
    students: '45+',
    towers: '8 towers',
    highlights: ['Family friendly', 'Good amenities', 'Growing area'],
  },
  {
    name: 'Ajnara Homes',
    students: '40+',
    towers: '10 towers',
    highlights: ['Value for money', 'Near highway', 'Developing area'],
  },
  {
    name: 'Paramount Emotions',
    students: '35+',
    towers: '6 towers',
    highlights: ['Modern design', 'Good facilities', 'Young families'],
  },
  {
    name: 'Mahagun Mywoods',
    students: '30+',
    towers: '8 towers',
    highlights: ['Premium amenities', 'Sports facilities', 'Education focus'],
  },
  {
    name: 'Prateek Grand City',
    students: '28+',
    towers: '10 towers',
    highlights: ['Affordable', 'Growing community', 'Good schools nearby'],
  },
]

const nearbySchools = [
  { name: 'DPS Greater Noida', type: 'CBSE', distance: '5 km' },
  { name: 'Ryan International', type: 'CBSE', distance: '3 km' },
  { name: 'Genesis Global School', type: 'IB', distance: '8 km' },
  { name: 'Sharda International', type: 'CBSE', distance: '6 km' },
  { name: 'Stellar Public School', type: 'CBSE', distance: '2 km' },
  { name: 'Delhi World Public School', type: 'CBSE', distance: '4 km' },
]

const universities = [
  { name: 'Sharda University', students: '150+', courses: 'MBBS, Engineering' },
  { name: 'Galgotias University', students: '120+', courses: 'Engineering, Management' },
  { name: 'Bennett University', students: '80+', courses: 'Engineering, Law' },
  { name: 'GL Bajaj Institute', students: '45+', courses: 'Engineering, MBA' },
]

const metroConnectivity = [
  { station: 'Knowledge Park II', line: 'Aqua Line', distance: '2 km' },
  { station: 'Pari Chowk', line: 'Aqua Line', distance: '3 km' },
  { station: 'Alpha 1', line: 'Aqua Line', distance: '5 km' },
  { station: 'Delta 1', line: 'Aqua Line', distance: '4 km' },
]

const successStories = [
  {
    name: 'Rahul Yadav',
    society: 'Gaur City',
    score: 'AIR 1,123',
    year: '2024',
    quote: "From Gaur City to government medical college! Cerebrum's online classes are the best.",
  },
  {
    name: 'Priyanka Sharma',
    society: 'Ace City',
    score: '695/720',
    year: '2024',
    quote: 'Highest score from Greater Noida West! Small batches made all the difference.',
  },
  {
    name: 'Amit Singh',
    society: 'Supertech Eco Village',
    score: 'AIR 1,567',
    year: '2024',
    quote: 'Top-notch coaching without travel hassles. Perfect for our township.',
  },
  {
    name: 'Neha Gupta',
    society: 'Panchsheel Greens',
    score: '680/720',
    year: '2024',
    quote: 'AIIMS faculty teaching from home. Could never imagine this quality online!',
  },
  {
    name: 'Vikram Tiwari',
    society: 'Gaur City 2',
    score: 'AIR 2,034',
    year: '2023',
    quote: "Two years with Cerebrum, and now I'm in a top medical college!",
  },
  {
    name: 'Anjali Verma',
    society: 'Ajnara Homes',
    score: '665/720',
    year: '2023',
    quote: 'Affordable fees, premium results. Thank you Cerebrum!',
  },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching for Gaur City students?',
    answer:
      'Cerebrum Biology Academy is the top choice for Gaur City students with 180+ enrolled students and 98% success rate. Our online live classes eliminate the need for long commutes from Gaur City to Noida coaching centers.',
  },
  {
    question: 'Do you offer coaching for Greater Noida West societies?',
    answer:
      'Yes! We have 400+ students from Greater Noida West including Gaur City, Ace City, Supertech Eco Village, Panchsheel Greens, Ajnara Homes, and other societies. Our online coaching is perfect for this area.',
  },
  {
    question: 'What are the fees for NEET coaching in Greater Noida West?',
    answer:
      'Our fees range from ₹24,000 to ₹48,000 per year - significantly lower than traditional coaching centers. We offer EMI options and scholarships for deserving students from Greater Noida West.',
  },
  {
    question: 'How do students from Greater Noida West attend classes?',
    answer:
      'All classes are conducted live online via Zoom/Google Meet. Students can attend from home in Gaur City, Ace City, or any society. Classes are recorded for revision. No commute needed!',
  },
  {
    question: 'Is online coaching effective for NEET preparation?',
    answer:
      'Our 98% success rate proves it! Students from Greater Noida West have scored AIR under 2000 through our online coaching. Small batches (15-20 students) ensure personal attention even in online mode.',
  },
]

export default function GreaterNoidaWestPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_gnw', {
        event_category: 'conversion',
        event_label: 'greater_noida_west_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-noida" className="hover:text-green-600">
              NEET Coaching Noida
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Greater Noida West</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              400+ Students from Noida Extension
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best NEET Coaching in <span className="text-yellow-300">Greater Noida West</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Gaur City • Ace City • Supertech Eco Village • Panchsheel Greens • Ajnara Homes
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join 400+ NEET aspirants from Greater Noida West (Noida Extension). Live online
              classes by AIIMS faculty. No commute to Noida needed - study from your society!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Users, value: '400+', label: 'Students Enrolled' },
                { icon: Trophy, value: '98%', label: 'Success Rate' },
                { icon: Building2, value: '15+', label: 'Societies Covered' },
                { icon: Star, value: '4.9', label: 'Google Rating' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Major Societies Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Every Major Society
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from Gaur City to Ajnara Homes - we serve all Greater Noida West
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorSocieties.map((society, index) => (
              <motion.div
                key={society.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <Building2 className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{society.name}</h3>
                <div className="text-orange-600 font-semibold mb-2">
                  {society.students} students
                </div>
                <div className="text-sm text-gray-500 mb-3">{society.towers}</div>
                <div className="flex flex-wrap gap-1">
                  {society.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Your Neighborhood
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real students from Greater Noida West societies achieving their NEET dreams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{story.name}</div>
                    <div className="text-sm text-gray-500">{story.society}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-orange-600 font-bold text-lg">{story.score}</span>
                  <span className="text-sm text-gray-500">NEET {story.year}</span>
                </div>
                <p className="text-gray-700 italic">&ldquo;{story.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro & Schools Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Metro Connectivity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Train className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Metro Connectivity</h3>
              <p className="text-gray-600 mb-4">
                Aqua Line metro connects Greater Noida West to Noida - but with our online classes,
                you don&apos;t need to travel!
              </p>
              <div className="space-y-3">
                {metroConnectivity.map((metro) => (
                  <div
                    key={metro.station}
                    className="flex items-center justify-between bg-blue-50 rounded-lg p-3"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{metro.station}</div>
                      <div className="text-sm text-gray-500">{metro.line}</div>
                    </div>
                    <span className="text-blue-600 font-medium">{metro.distance}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Nearby Schools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <School className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Schools in the Area</h3>
              <p className="text-gray-600 mb-4">
                Perfect coaching for students from these Greater Noida West schools
              </p>
              <div className="space-y-3">
                {nearbySchools.map((school) => (
                  <div
                    key={school.name}
                    className="flex items-center justify-between bg-purple-50 rounded-lg p-3"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{school.name}</div>
                      <div className="text-sm text-gray-500">{school.type}</div>
                    </div>
                    <span className="text-purple-600 font-medium">{school.distance}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Droppers from Greater Noida Universities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from nearby universities who switched to medicine with our help
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100"
              >
                <Award className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900">{uni.name}</h3>
                <div className="text-indigo-600 font-semibold">{uni.students} students</div>
                <div className="text-sm text-gray-500 mt-2">{uni.courses}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Greater Noida West Students Choose Cerebrum
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Building2,
                title: 'No Commute Needed',
                desc: 'Study from Gaur City, Ace City - no travel to Noida coaching centers',
              },
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: 'Expert teachers with 15+ years experience',
              },
              {
                icon: Users,
                title: 'Small Batches',
                desc: 'Only 15-20 students for personal attention',
              },
              {
                icon: Clock,
                title: 'Flexible Timings',
                desc: 'Morning, afternoon & evening batches available',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQs - NEET Coaching in Greater Noida West
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join 400+ Greater Noida West Students
            </h2>
            <p className="text-xl mb-8 opacity-90">
              From Gaur City to Ajnara Homes - your NEET success journey starts here!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/neet-coaching-noida">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Noida Areas
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['Gaur City', 'Ace City', 'Supertech', 'Panchsheel', 'Ajnara', 'Paramount'].map(
                (society) => (
                  <span
                    key={society}
                    className="flex items-center bg-white/20 px-3 py-1 rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {society}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Greater Noida West',
            description:
              'Best NEET Biology coaching in Greater Noida West (Noida Extension). Expert AIIMS faculty, 98% success rate. Gaur City, Ace City, Supertech Eco Village.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida-west',
            areaServed: {
              '@type': 'Place',
              name: 'Greater Noida West',
              alternateName: 'Noida Extension',
              containedInPlace: {
                '@type': 'City',
                name: 'Greater Noida',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '400',
              bestRating: '5',
            },
          }),
        }}
      />
    </div>
  )
}
