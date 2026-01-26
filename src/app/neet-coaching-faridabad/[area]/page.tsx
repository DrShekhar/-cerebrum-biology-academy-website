'use client'

import { useParams } from 'next/navigation'
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
  Phone,
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Award,
  Play,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TrackedWhatsAppButton } from '@/components/common/TrackedWhatsAppButton'

interface AreaData {
  name: string
  fullName: string
  description: string
  highlights: string[]
  nearbyMetro: string[]
  societies: string[]
  schools: string[]
  landmarks: string[]
  studentCount: string
  successStories: { name: string; score: string; quote: string }[]
}

const areaData: Record<string, AreaData> = {
  'greater-faridabad': {
    name: 'Greater Faridabad',
    fullName: 'Greater Faridabad, Haryana',
    description:
      'Greater Faridabad is the premium residential hub comprising Sectors 81-89. Home to BPTP Parklands, Crown Greens, and other luxury townships, it attracts IT professionals and business families seeking quality NEET coaching.',
    highlights: [
      'Premium residential hub',
      'Sectors 81-89',
      'BPTP & Crown Townships',
      'Growing infrastructure',
    ],
    nearbyMetro: ['Escorts Mujesar Metro', 'Ballabgarh Metro (upcoming)'],
    societies: [
      'BPTP Parklands',
      'Crown Greens',
      'BPTP Princess Park',
      'SRS Residency',
      'Omaxe Heights',
      'Eldeco Eternia',
      'RPS Savana',
      'Godrej Aria',
    ],
    schools: ['KR Mangalam', 'Shriram School', 'DPS Greater Faridabad', 'Ryan International'],
    landmarks: ['Sector 81 Market', 'BPTP Township', 'Crown Interiorz Mall', 'Sector 86 Market'],
    studentCount: '280+',
    successStories: [
      {
        name: 'Aditya Sharma',
        score: 'AIR 1,123',
        quote: 'From BPTP Parklands to AIIMS! Best decision to join Cerebrum.',
      },
      {
        name: 'Priya Verma',
        score: '690/720',
        quote: 'Crown Greens resident. Online classes were perfect for preparation.',
      },
      {
        name: 'Rahul Singh',
        score: 'AIR 1,456',
        quote: 'Sector 86 to medical college. Cerebrum made it possible!',
      },
    ],
  },
  'sector-21': {
    name: 'Sector 21',
    fullName: 'Sector 21, Faridabad',
    description:
      'Sector 21 is a major commercial and residential hub in Faridabad with excellent metro connectivity. Close to Crown Interiorz Mall and NHPC Chowk metro, it is home to many coaching aspirants.',
    highlights: [
      'Commercial hub',
      'Excellent metro connectivity',
      'Near Crown Mall',
      'Central location',
    ],
    nearbyMetro: ['NHPC Chowk Metro', 'Badkhal Mor Metro'],
    societies: ['SRS Tower', 'Vatika City', 'Park View City', 'Omaxe Residency'],
    schools: ['DPS Faridabad', 'Modern School', 'St. Josephs School'],
    landmarks: ['Crown Interiorz Mall', 'NHPC Chowk', 'Sector 21 Market', 'Faridabad Bus Stand'],
    studentCount: '150+',
    successStories: [
      {
        name: 'Sneha Agarwal',
        score: 'AIR 1,890',
        quote: 'Sector 21 resident. Metro commute made classes convenient!',
      },
      {
        name: 'Vikram Kumar',
        score: '675/720',
        quote: 'Best coaching near Crown Mall. Highly recommend Cerebrum!',
      },
    ],
  },
  'nit-faridabad': {
    name: 'NIT Faridabad',
    fullName: 'NIT, Faridabad',
    description:
      'NIT (New Industrial Township) is an established residential area near YMCA University. With good schools and proximity to educational institutions, it is a preferred location for NEET aspirants.',
    highlights: [
      'Educational hub',
      'Near YMCA University',
      'Established area',
      'Good connectivity',
    ],
    nearbyMetro: ['Badkhal Mor Metro', 'Old Faridabad Metro'],
    societies: ['Omaxe Celebration', 'NIT Flats', 'DAV Society', 'Government Quarters'],
    schools: ['DAV Public School NIT', 'St. Marys School', 'NIT Public School'],
    landmarks: ['YMCA University', 'NIT Market', 'Badkhal Lake', 'NIT Stadium'],
    studentCount: '120+',
    successStories: [
      {
        name: 'Ankit Sharma',
        score: 'AIR 2,100',
        quote: 'NIT student here. Online classes with AIIMS faculty changed everything!',
      },
      {
        name: 'Kavita Singh',
        score: '660/720',
        quote: 'From NIT to MBBS. Grateful to Cerebrum team!',
      },
    ],
  },
  ballabgarh: {
    name: 'Ballabgarh',
    fullName: 'Ballabgarh, Faridabad',
    description:
      'Ballabgarh is a major industrial town and sub-district in Faridabad. With upcoming metro connectivity and proximity to Palwal, it serves students from a wide catchment area.',
    highlights: [
      'Industrial town',
      'Metro connectivity (upcoming)',
      'Wide catchment area',
      'Growing education hub',
    ],
    nearbyMetro: ['Escorts Mujesar Metro', 'Ballabgarh Metro (upcoming)'],
    societies: ['Ballabgarh Old Town', 'Saran Complex', 'Aggarwal Colony', 'Model Town'],
    schools: ['DAV Ballabgarh', 'St. Josephs Ballabgarh', 'Greenland Public School'],
    landmarks: ['Ballabgarh Railway Station', 'Old Faridabad Road', 'Industrial Area', 'Bus Stand'],
    studentCount: '180+',
    successStories: [
      {
        name: 'Rajesh Kumar',
        score: 'AIR 1,567',
        quote: 'Ballabgarh to MBBS journey. Cerebrum made the difference!',
      },
      {
        name: 'Sunita Yadav',
        score: '665/720',
        quote: 'Best online coaching for Ballabgarh students. No travel hassles!',
      },
    ],
  },
  'sector-15': {
    name: 'Sector 15',
    fullName: 'Sector 15, Faridabad',
    description:
      'Sector 15 is an established residential area with excellent metro connectivity via Neelam Chowk station. Known for its markets and proximity to Sector 16, it has many NEET aspirants.',
    highlights: ['Established area', 'Neelam Chowk Metro', 'Good markets', 'Central location'],
    nearbyMetro: ['Neelam Chowk Metro', 'Old Faridabad Metro'],
    societies: ['Sector 15 RWA', 'Kothi Area', 'Builder Floors', 'Apartments'],
    schools: ['Apeejay School', 'DAV Sector 14', 'Little Flowers School'],
    landmarks: ['Neelam Chowk', 'Sector 15 Market', 'Faridabad Courts', 'MC Office'],
    studentCount: '95+',
    successStories: [
      {
        name: 'Meera Gupta',
        score: 'AIR 2,345',
        quote: 'Sector 15 to medical college. Thank you Cerebrum!',
      },
    ],
  },
  neharpar: {
    name: 'Neharpar',
    fullName: 'Neharpar (Greater Faridabad)',
    description:
      'Neharpar is the beyond-canal area of Greater Faridabad including premium townships like BPTP and Omaxe. This mega residential zone is home to thousands of families seeking quality NEET coaching.',
    highlights: [
      'Mega township area',
      'Premium societies',
      'Growing infrastructure',
      'Large student population',
    ],
    nearbyMetro: ['Sector 28 Metro', 'Mewla Maharajpur Metro (nearby)'],
    societies: [
      'BPTP Parklands',
      'Omaxe Heights',
      'SRS Residency',
      'RPS Green Valley',
      'Eldeco Eternia',
      'Park View Spa',
    ],
    schools: ['DPS Neharpar', 'Ryan International', 'Manav Rachna School'],
    landmarks: ['Surajkund Road', 'Sector 88 Market', 'BPTP Township', 'Omaxe Mall'],
    studentCount: '200+',
    successStories: [
      {
        name: 'Arjun Malik',
        score: 'AIR 1,234',
        quote: 'From BPTP to AIIMS! Cerebrum online classes are the best.',
      },
      {
        name: 'Ishita Sharma',
        score: '685/720',
        quote: 'Neharpar resident. Perfect coaching for working parents!',
      },
    ],
  },
  'sector-86': {
    name: 'Sector 86',
    fullName: 'Sector 86, Greater Faridabad',
    description:
      'Sector 86 is a premium sector in Greater Faridabad with BPTP Princess Park and other luxury societies. Close to Surajkund and Sector 88, it attracts families seeking quality education.',
    highlights: ['Premium sector', 'BPTP Princess Park', 'Near Surajkund', 'Luxury living'],
    nearbyMetro: ['Escorts Mujesar Metro (nearby)'],
    societies: ['BPTP Princess Park', 'Omaxe The Lake', 'SRS Pearl Heights', 'Eldeco Eternia'],
    schools: ['KR Mangalam', 'Shriram Millennium', 'Ryan International'],
    landmarks: ['Surajkund', 'Sector 86 Market', 'BPTP Township', 'Badkhal Lake'],
    studentCount: '110+',
    successStories: [
      {
        name: 'Aakash Verma',
        score: 'AIR 1,678',
        quote: 'BPTP Princess Park to medical college. Cerebrum is the best!',
      },
    ],
  },
  'old-faridabad': {
    name: 'Old Faridabad',
    fullName: 'Old Faridabad, Haryana',
    description:
      'Old Faridabad is the heritage area with excellent metro connectivity. Home to established families and close to industrial areas, it has a strong tradition of academic excellence.',
    highlights: ['Heritage area', 'Excellent metro', 'Established locality', 'Academic tradition'],
    nearbyMetro: ['Old Faridabad Metro', 'Neelam Chowk Metro'],
    societies: ['Old Faridabad Colony', 'Ashoka Enclave', 'Sector 9 RWA', 'Kothi Area'],
    schools: ['St. Josephs School', 'DAV Old Faridabad', 'Little Flowers'],
    landmarks: ['Old Faridabad Metro Station', 'Sarai Khawaja', 'Industrial Area', 'Bus Stand'],
    studentCount: '90+',
    successStories: [
      {
        name: 'Pooja Singh',
        score: 'AIR 2,456',
        quote: 'Old Faridabad to MBBS. Online coaching made it possible!',
      },
    ],
  },
}

export default function FaridabadAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const area = areaData[areaSlug]

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Area not found</h1>
          <Link href="/neet-coaching-faridabad" className="text-orange-600 hover:underline">
            Back to Faridabad Coaching
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', `demo_booking_${areaSlug}`, {
        event_category: 'conversion',
        event_label: `faridabad_${areaSlug}_page`,
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-rose-900 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <Link
            href="/neet-coaching-faridabad"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Faridabad Coaching
          </Link>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4 mr-2 text-yellow-300" />
              {area.studentCount} Students from {area.name}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Best NEET Coaching in <span className="text-yellow-300">{area.name}, Faridabad</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-6">{area.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {area.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="lg"
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
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>

              <TrackedWhatsAppButton
                source={`faridabad-${areaSlug}-hero`}
                message={`Hi! I'm from ${area.name}, Faridabad. I want to join NEET Biology coaching. What batches are available?`}
                buttonText="WhatsApp Now"
                variant="primary"
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white font-bold"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: `${area.name} Students`, value: area.studentCount },
              { icon: Trophy, label: 'Success Rate', value: '98%' },
              { icon: Star, label: 'Google Rating', value: '4.9' },
              { icon: Award, label: 'NEET Selections', value: '850+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Societies Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Students from {area.name} Societies
            </h2>
            <p className="text-gray-600">Trusted by families from premium residential complexes</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {area.societies.map((society, index) => (
              <motion.div
                key={society}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <Building2 className="w-5 h-5 text-orange-600 mb-2" />
                <div className="font-semibold text-gray-900 text-sm">{society}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              NEET Coaching Near {area.name} Schools
            </h2>
            <p className="text-gray-600">Perfect for students from nearby schools</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {area.schools.map((school, index) => (
              <motion.div
                key={school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <School className="w-5 h-5 text-orange-600 mb-2" />
                <div className="font-semibold text-gray-900 text-sm">{school}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Section */}
      {area.nearbyMetro.length > 0 && (
        <section className="py-12 md:py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Nearby Metro Stations
              </h2>
              <p className="text-gray-600">Excellent connectivity for online coaching</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {area.nearbyMetro.map((metro, index) => (
                <motion.div
                  key={metro}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl px-6 py-4 shadow-sm flex items-center"
                >
                  <Train className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-semibold text-gray-900">{metro}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Success Stories from {area.name}
            </h2>
            <p className="text-gray-600">Our students achieving their MBBS dreams</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {area.successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl p-6 border border-orange-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-gray-900">{story.name}</div>
                    <div className="text-orange-600 font-semibold">{story.score}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{story.quote}&quot;</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-center"
          >
            <p className="text-white/90 text-lg mb-2">Want to achieve similar results?</p>
            <p className="text-white text-xl md:text-2xl font-bold mb-4">
              Talk to our {area.name} counselor now
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedWhatsAppButton
                source={`faridabad-${areaSlug}-testimonial`}
                message={`Hi! I saw the success stories from ${area.name}. How can I achieve similar NEET scores?`}
                buttonText="Chat on WhatsApp"
                variant="secondary"
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 font-bold"
              />
              <Link href="/demo-booking">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  Book Demo Class
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-white/70 text-sm">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Average response time: 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Why {area.name} Students Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'AIIMS Faculty', desc: '15+ years experience' },
              { icon: Users, title: 'Small Batches', desc: '15-20 students only' },
              { icon: Clock, title: '24/7 Support', desc: 'Doubt clearing anytime' },
              { icon: BookOpen, title: 'Complete Material', desc: 'Notes, tests, PYQs' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Your NEET Journey from {area.name}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join {area.studentCount} students from {area.name}. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <TrackedWhatsAppButton
                source={`faridabad-${areaSlug}-footer-cta`}
                message={`Hi! I'm from ${area.name}, Faridabad. I want to enroll for NEET coaching. Please share batch details and fees.`}
                buttonText="WhatsApp Counselor"
                variant="primary"
                size="xl"
                className="bg-green-500 hover:bg-green-400 text-white font-bold"
              />

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-orange-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View Courses
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/70 text-sm">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Average response time: 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Schema Markup for AI/LLM Discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            '@id': 'https://cerebrumbiologyacademy.com/#organization',
            name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
            alternateName: ['Cerebrum Academy', 'Cerebrum NEET Coaching'],
            description: `Best NEET Biology coaching in ${area.name}, Faridabad. ${area.studentCount} students, 98% success rate.`,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
            telephone: '+91-8826444334',
            email: 'info@cerebrumbiologyacademy.com',
            areaServed: {
              '@type': 'City',
              name: 'Faridabad',
              containsPlace: [
                { '@type': 'Place', name: area.name },
                { '@type': 'Place', name: 'Haryana' },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              bestRating: '5',
              ratingCount: area.studentCount.replace('+', ''),
              reviewCount: area.studentCount.replace('+', ''),
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: '98% Success Rate in NEET',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'AIIMS-Qualified Faculty',
              },
            ],
          }),
        }}
      />
      {/* FAQPage Schema for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What is the best NEET coaching in ${area.name}, Faridabad?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Cerebrum Biology Academy is rated the best NEET coaching serving ${area.name}, Faridabad with 98% success rate and ${area.studentCount} successful students. We offer both online and offline classes with AIIMS-qualified faculty.`,
                },
              },
              {
                '@type': 'Question',
                name: `Is there online NEET coaching for ${area.name} students?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes, Cerebrum Biology Academy offers excellent online NEET coaching for ${area.name}, Faridabad students. Live interactive classes, recorded lectures, weekly tests, and unlimited doubt sessions - all from home.`,
                },
              },
              {
                '@type': 'Question',
                name: `How to reach Cerebrum from ${area.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Students from ${area.name} can join our online batch for convenience or travel to our South Delhi center via metro. ${area.nearbyMetro[0]} connects to Violet Line for easy commute.`,
                },
              },
            ],
          }),
        }}
      />
      {/* CourseList Schema for AI Discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `NEET Biology Courses for ${area.name} Students`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'Course',
                  name: 'NEET Foundation (Class 11+12)',
                  description: `2-year NEET Biology program for ${area.name} students with complete syllabus coverage`,
                  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                  offers: { '@type': 'Offer', price: '120000', priceCurrency: 'INR' },
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'Course',
                  name: 'NEET Intensive (Class 12)',
                  description: `1-year intensive NEET Biology program for ${area.name} Class 12 students`,
                  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                  offers: { '@type': 'Offer', price: '75000', priceCurrency: 'INR' },
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'Course',
                  name: 'NEET Dropper Batch',
                  description: `Specialized dropper program for ${area.name} NEET repeaters`,
                  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
                  offers: { '@type': 'Offer', price: '85000', priceCurrency: 'INR' },
                },
              },
            ],
          }),
        }}
      />
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Faridabad',
                item: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: area.name,
                item: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
              },
            ],
          }),
        }}
      />
      {/* WebPage with Speakable for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Best NEET Coaching in ${area.name}, Faridabad | Cerebrum Biology Academy`,
            description: area.description,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', 'h2', '.area-description'],
            },
            mainEntity: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
          }),
        }}
      />
    </div>
  )
}
