'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  GraduationCap,
  MapPin,
  CheckCircle,
  Phone,
  ArrowRight,
  Play,
  Users,
  Clock,
  Calendar,
  BookOpen,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const schoolDetails: Record<
  string,
  {
    name: string
    fullName: string
    location: string
    description: string
    heroDescription: string
    students: string
    curriculum: string
    timings: string
    nearbyAreas: string[]
    whyUs: string[]
    batchTimings: { name: string; time: string; days: string }[]
    testimonial: { name: string; text: string; year: string }
  }
> = {
  'dps-rk-puram': {
    name: 'DPS RK Puram',
    fullName: 'Delhi Public School, RK Puram',
    location: 'RK Puram, South Delhi',
    description: "One of India's most prestigious schools",
    heroDescription:
      "DPS RK Puram is consistently ranked among India's top schools. Our NEET coaching is specially designed for DPS RKP students with timings that complement your school schedule.",
    students: '3,000+',
    curriculum: 'CBSE',
    timings: '7:30 AM - 2:00 PM',
    nearbyAreas: ['Hauz Khas', 'IIT Delhi', 'Vasant Vihar', 'Munirka'],
    whyUs: [
      'Batch timings after school hours (4 PM onwards)',
      'Many DPS RKP alumni as mentors',
      'Weekend intensive batches available',
      'Exam period online mode option',
      'Transport-friendly location near metro',
      'Holiday crash courses during school breaks',
    ],
    batchTimings: [
      { name: 'Weekday Batch', time: '4:00 PM - 6:00 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Batch', time: '10:00 AM - 1:00 PM', days: 'Sat, Sun' },
      { name: 'Evening Batch', time: '6:30 PM - 8:30 PM', days: 'Tue, Thu, Sat' },
    ],
    testimonial: {
      name: 'Aryan Sharma',
      text: "As a DPS RKP student, finding coaching with flexible timings was crucial. Cerebrum's batch timings perfectly fit my school schedule.",
      year: 'NEET 2024 - AIR 1,245',
    },
  },
  'dps-vasant-vihar': {
    name: 'DPS Vasant Vihar',
    fullName: 'Delhi Public School, Vasant Vihar',
    location: 'Vasant Vihar, South Delhi',
    description: 'Premium DPS branch in elite Vasant Vihar',
    heroDescription:
      'DPS Vasant Vihar students enjoy our specialized NEET coaching with convenient location and timings designed around their school hours.',
    students: '2,500+',
    curriculum: 'CBSE',
    timings: '8:00 AM - 2:30 PM',
    nearbyAreas: ['Vasant Vihar', 'Vasant Kunj', 'Munirka', 'RK Puram'],
    whyUs: [
      'Located near Vasant Vihar',
      'After-school batches from 4 PM',
      'DPS curriculum-aligned content',
      'Online mode during exams',
      'Parent-teacher coordination',
      'School holiday special batches',
    ],
    batchTimings: [
      { name: 'Afternoon Batch', time: '4:00 PM - 6:00 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Intensive', time: '9:00 AM - 12:00 PM', days: 'Sat, Sun' },
      { name: 'Evening Online', time: '7:00 PM - 9:00 PM', days: 'Daily' },
    ],
    testimonial: {
      name: 'Priya Malhotra',
      text: 'The Vasant Vihar location made it so convenient. I could attend classes right after school without wasting time in travel.',
      year: 'NEET 2024 - AIR 2,890',
    },
  },
  'vasant-valley-school': {
    name: 'Vasant Valley School',
    fullName: 'Vasant Valley School',
    location: 'Vasant Kunj, South Delhi',
    description: 'Elite IB school with holistic education',
    heroDescription:
      'Vasant Valley School students often need specialized NEET preparation that bridges IB curriculum with NEET requirements. We specialize in this transition.',
    students: '1,800+',
    curriculum: 'IB/CBSE',
    timings: '8:15 AM - 3:00 PM',
    nearbyAreas: ['Vasant Kunj', 'Vasant Vihar', 'Mehrauli', 'Chattarpur'],
    whyUs: [
      'IB to NEET curriculum bridge',
      'Focus on NCERT fundamentals',
      'Flexible timing for IB students',
      'Understanding of IB grading system',
      'Special attention to Biology HL students',
      'Extended essay guidance for Bio',
    ],
    batchTimings: [
      { name: 'Post-School Batch', time: '4:30 PM - 6:30 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Foundation', time: '10:00 AM - 1:00 PM', days: 'Sat, Sun' },
      { name: 'Online Flexible', time: '8:00 PM - 10:00 PM', days: 'Tue, Thu' },
    ],
    testimonial: {
      name: 'Anika Gupta',
      text: 'Coming from IB, I was worried about NEET. Cerebrum helped me bridge the gap between IB Biology HL and NEET requirements perfectly.',
      year: 'NEET 2024 - AIR 3,456',
    },
  },
  'modern-school-vasant-vihar': {
    name: 'Modern School',
    fullName: 'Modern School, Vasant Vihar',
    location: 'Vasant Vihar, South Delhi',
    description: 'Prestigious Modern School branch',
    heroDescription:
      'Modern School Vasant Vihar students benefit from our strategic location and specially designed batches that work around their school timings.',
    students: '2,000+',
    curriculum: 'CBSE',
    timings: '7:45 AM - 2:15 PM',
    nearbyAreas: ['Vasant Vihar', 'RK Puram', 'Munirka', 'JNU'],
    whyUs: [
      'Near Modern School campus',
      'After-school convenient batches',
      'CBSE + NEET integrated approach',
      'School board exam support',
      'Modern School alumni network',
      'Flexible attendance policies',
    ],
    batchTimings: [
      { name: 'Regular Batch', time: '3:30 PM - 5:30 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Batch', time: '10:00 AM - 1:00 PM', days: 'Sat, Sun' },
      { name: 'Evening Batch', time: '6:00 PM - 8:00 PM', days: 'Tue, Thu, Sat' },
    ],
    testimonial: {
      name: 'Rohit Kapoor',
      text: "Being a Modern School student, I appreciated how Cerebrum understood our school's academic culture and designed classes accordingly.",
      year: 'NEET 2024 - AIR 1,678',
    },
  },
  'sanskriti-school': {
    name: 'Sanskriti School',
    fullName: 'Sanskriti School',
    location: 'Chanakyapuri, Central Delhi',
    description: 'IB World School in diplomatic enclave',
    heroDescription:
      'Sanskriti School students from the diplomatic enclave receive specialized NEET coaching that bridges international curriculum with Indian medical entrance requirements.',
    students: '1,500+',
    curriculum: 'IB',
    timings: '8:30 AM - 3:30 PM',
    nearbyAreas: ['Chanakyapuri', 'RK Puram', 'Vasant Vihar', 'Dhaula Kuan'],
    whyUs: [
      'IB curriculum specialists',
      'NCERT foundation building',
      'Flexible for diplomatic families',
      'Online option for relocating families',
      'Multi-year planning support',
      'College counseling integration',
    ],
    batchTimings: [
      { name: 'After School', time: '5:00 PM - 7:00 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Special', time: '11:00 AM - 2:00 PM', days: 'Sat, Sun' },
      { name: 'Online Evening', time: '7:30 PM - 9:30 PM', days: 'Daily' },
    ],
    testimonial: {
      name: 'Aditi Singh',
      text: 'As an IB student at Sanskriti, transitioning to NEET seemed daunting. Cerebrum made it smooth with their specialized IB-to-NEET program.',
      year: 'NEET 2024 - AIR 4,123',
    },
  },
  'shri-ram-school': {
    name: 'The Shri Ram School',
    fullName: 'The Shri Ram School',
    location: 'Vasant Vihar, South Delhi',
    description: 'Elite school for academic excellence',
    heroDescription:
      'The Shri Ram School students receive personalized NEET coaching that complements their rigorous academic environment.',
    students: '1,200+',
    curriculum: 'CBSE',
    timings: '8:00 AM - 2:45 PM',
    nearbyAreas: ['Vasant Vihar', 'Vasant Kunj', 'RK Puram'],
    whyUs: [
      'Understanding of TSRS culture',
      'Complementary to school curriculum',
      'Small batch attention',
      'Parent engagement programs',
      'Holiday revision batches',
      'Online backup for travel',
    ],
    batchTimings: [
      { name: 'Post-School', time: '4:00 PM - 6:00 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Intensive', time: '9:30 AM - 12:30 PM', days: 'Sat, Sun' },
      { name: 'Evening Batch', time: '6:30 PM - 8:30 PM', days: 'Tue, Thu' },
    ],
    testimonial: {
      name: 'Kavya Reddy',
      text: 'TSRS has high academic standards, and Cerebrum matched that with their quality of teaching. Perfect combination for NEET success.',
      year: 'NEET 2024 - AIR 2,345',
    },
  },
  'springdales-pusa-road': {
    name: 'Springdales School',
    fullName: 'Springdales School, Pusa Road',
    location: 'Pusa Road, Central Delhi',
    description: 'Historic school with strong academics',
    heroDescription:
      'Springdales School Pusa Road students enjoy NEET coaching with Central Delhi convenience and timings that work with their schedule.',
    students: '2,000+',
    curriculum: 'CBSE',
    timings: '7:30 AM - 1:45 PM',
    nearbyAreas: ['Karol Bagh', 'Rajendra Place', 'Patel Nagar', 'Connaught Place'],
    whyUs: [
      'Central Delhi accessibility',
      'Early dismissal batch options',
      'CBSE board + NEET prep',
      'Strong biology foundation',
      'Metro-connected location',
      'Evening batches available',
    ],
    batchTimings: [
      { name: 'Afternoon Batch', time: '3:00 PM - 5:00 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Batch', time: '10:00 AM - 1:00 PM', days: 'Sat, Sun' },
      { name: 'Evening Batch', time: '5:30 PM - 7:30 PM', days: 'Tue, Thu, Sat' },
    ],
    testimonial: {
      name: 'Aarav Joshi',
      text: 'The Central Delhi location was perfect for me as a Springdales student. Easy metro access and great faculty made all the difference.',
      year: 'NEET 2024 - AIR 3,890',
    },
  },
  'dps-east-of-kailash': {
    name: 'DPS East of Kailash',
    fullName: 'Delhi Public School, East of Kailash',
    location: 'East of Kailash, South Delhi',
    description: 'Well-established DPS branch in South Delhi',
    heroDescription:
      'DPS East of Kailash students benefit from our South Delhi location and specialized NEET batches designed for DPS curriculum students.',
    students: '2,200+',
    curriculum: 'CBSE',
    timings: '7:45 AM - 2:00 PM',
    nearbyAreas: ['East of Kailash', 'Greater Kailash', 'Nehru Place', 'CR Park'],
    whyUs: [
      'South Delhi location convenience',
      'DPS curriculum alignment',
      'After-school batches',
      'Board exam integration',
      'GK-EOK area coverage',
      'Weekend intensive options',
    ],
    batchTimings: [
      { name: 'Regular Batch', time: '3:30 PM - 5:30 PM', days: 'Mon, Wed, Fri' },
      { name: 'Weekend Batch', time: '10:00 AM - 1:00 PM', days: 'Sat, Sun' },
      { name: 'Evening Batch', time: '6:00 PM - 8:00 PM', days: 'Tue, Thu, Sat' },
    ],
    testimonial: {
      name: 'Neha Verma',
      text: 'As a DPS EOK student, the GK area coaching center was super convenient. The faculty understood our school system well.',
      year: 'NEET 2024 - AIR 2,567',
    },
  },
}

export default function SchoolNEETCoachingPage() {
  const params = useParams()
  const schoolSlug = params.school as string
  const school = schoolDetails[schoolSlug]

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">School not found</h1>
          <Link href="/neet-coaching-near">
            <Button>View All Schools</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', `demo_booking_${schoolSlug}`, {
        event_category: 'conversion',
        event_label: `neet_coaching_near_${schoolSlug}`,
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/neet-coaching-near"
              className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              All Schools
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              {school.curriculum} Curriculum
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              NEET Coaching for <span className="text-yellow-300">{school.name}</span> Students
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">
              <MapPin className="w-5 h-5 inline mr-2" />
              {school.location}
            </p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{school.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Users className="w-4 h-4 inline mr-2" />
                {school.students} Students
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock className="w-4 h-4 inline mr-2" />
                School: {school.timings}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Batch Timings */}
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
              Batch Timings for {school.name} Students
            </h2>
            <p className="text-lg text-gray-600">Designed to fit around your school schedule</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {school.batchTimings.map((batch, index) => (
              <motion.div
                key={batch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-50 rounded-xl p-6 border border-green-100"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="font-bold text-gray-900">{batch.name}</h3>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">{batch.time}</div>
                <div className="text-gray-600">{batch.days}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
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
              Why {school.name} Students Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {school.whyUs.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center bg-white rounded-lg p-4 shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <blockquote className="text-xl md:text-2xl italic mb-6">
              "{school.testimonial.text}"
            </blockquote>
            <div className="font-bold text-lg">{school.testimonial.name}</div>
            <div className="text-yellow-300">{school.testimonial.year}</div>
          </motion.div>
        </div>
      </section>

      {/* Nearby Areas */}
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
              Nearby Areas We Cover
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center">
            {school.nearbyAreas.map((area) => (
              <span
                key={area}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
              >
                <MapPin className="w-4 h-4 inline mr-1" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Your {school.name} Classmates at Cerebrum
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Special batches designed for {school.name} students. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

              <Link href="/neet-coaching-near">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View Other Schools
                </Button>
              </Link>
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
            name: `Cerebrum Biology Academy - Near ${school.name}`,
            description: `NEET coaching for ${school.name} students. ${school.description}`,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-near/${schoolSlug}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: school.location,
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
          }),
        }}
      />
    </div>
  )
}
