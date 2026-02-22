'use client'

import Link from 'next/link'
import {
  MapPin,
  BookOpen,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Target,
  Microscope,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const classPrograms = [
  {
    class: 'Class 9',
    title: 'Foundation Biology',
    description: 'Build strong fundamentals for future NEET preparation',
    topics: [
      'Cell Biology Basics',
      'Tissues',
      'Diversity in Living Organisms',
      'Health & Diseases',
    ],
    duration: '2 hours/week',
    fee: '₹45,000-₹90,000/year',
  },
  {
    class: 'Class 10',
    title: 'Pre-Foundation Biology',
    description: 'NCERT mastery with NEET orientation',
    topics: ['Life Processes', 'Control & Coordination', 'Reproduction', 'Heredity & Evolution'],
    duration: '3 hours/week',
    fee: '₹45,000-₹90,000/year',
  },
  {
    class: 'Class 11',
    title: 'NEET Biology - Year 1',
    description: 'Complete Class 11 NCERT + NEET level preparation',
    topics: [
      'Biological Classification',
      'Plant & Animal Kingdom',
      'Cell Biology',
      'Plant Physiology',
    ],
    duration: '6 hours/week',
    fee: '₹48,000-₹98,000/year',
  },
  {
    class: 'Class 12',
    title: 'NEET Biology - Year 2',
    description: 'Complete Class 12 NCERT + Advanced NEET preparation',
    topics: ['Reproduction', 'Genetics & Evolution', 'Human Health', 'Ecology & Biotechnology'],
    duration: '8 hours/week',
    fee: '₹70,000-₹1,56,000/year',
  },
  {
    class: 'Droppers',
    title: 'NEET Repeater Batch',
    description: 'Intensive revision + gap analysis + test series',
    topics: ['Complete Botany', 'Complete Zoology', 'NCERT Line-by-Line', 'Previous Year Analysis'],
    duration: '12 hours/week',
    fee: '₹70,000-₹1,56,000/year',
  },
]

const ghaziabadAreas = [
  { name: 'Indirapuram', students: '350+', highlight: 'Premium Hub' },
  { name: 'Vaishali', students: '180+', highlight: 'Metro Connected' },
  { name: 'Crossing Republik', students: '200+', highlight: 'Mega Township' },
  { name: 'Raj Nagar Extension', students: '150+', highlight: 'NH-58' },
  { name: 'Vasundhara', students: '120+', highlight: 'Growing Area' },
  { name: 'Kaushambi', students: '95+', highlight: 'Blue Line' },
]

const successStats = [
  { label: 'Students Enrolled', value: '1,500+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '1,100+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors trained at AIIMS Delhi with 15+ years teaching experience',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 15-20 students per batch for personalized attention',
  },
  {
    icon: Microscope,
    title: 'Practical Learning',
    description: 'Diagram-based teaching, NCERT focus, and real-life examples',
  },
  {
    icon: Target,
    title: 'Result Oriented',
    description: 'Weekly tests, monthly assessments, and performance tracking',
  },
  {
    icon: Clock,
    title: '24/7 Doubt Support',
    description: 'WhatsApp doubt clearing, recorded lectures, and extra sessions',
  },
  {
    icon: BookOpen,
    title: 'Complete Materials',
    description: 'NCERT notes, chapter tests, mock tests, and previous year papers',
  },
]

const faqs = [
  {
    question: 'Which is the best biology tuition in Ghaziabad?',
    answer:
      'Cerebrum Biology Academy is rated the best biology tuition in Ghaziabad with 98% success rate. We offer specialized biology coaching for Class 9, 10, 11, 12 and NEET droppers. Our AIIMS-trained faculty and small batch sizes ensure personalized attention.',
  },
  {
    question: 'Do you offer biology tuition for Class 9 and 10 in Ghaziabad?',
    answer:
      'Yes! We offer foundation biology tuition for Class 9 and 10 students in Ghaziabad. This builds a strong base for future NEET preparation while ensuring excellent board exam results. Students from Indirapuram, Vaishali, and Crossing Republik join our foundation batches.',
  },
  {
    question: 'What are the fees for biology tuition in Ghaziabad?',
    answer:
      'Our biology tuition fees range from ₹45,000-₹90,000/year for Class 9-10 foundation to ₹70,000-₹1,56,000/year for dropper batches (depending on tier). This includes complete study materials, test series, and doubt sessions.',
  },
  {
    question: 'Do you provide home tuition for biology in Ghaziabad?',
    answer:
      'We offer online live classes which are better than home tuition - same personalized attention but with recorded lectures, 24/7 doubt support, and comprehensive study materials. Students from Indirapuram, Vaishali, Raj Nagar Extension can attend from home.',
  },
  {
    question: 'Is online biology tuition effective?',
    answer:
      'Yes! Our online biology tuition has the same 98% success rate as offline classes. With live interactive sessions, screen sharing for diagrams, instant doubt clearing, and recorded lectures for revision, many students prefer online mode.',
  },
]

export default function BiologyTuitionGhaziabadPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_biology_ghaziabad', {
        event_category: 'conversion',
        event_label: 'biology_tuition_ghaziabad',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-5 h-5 mr-2 text-yellow-300" />
              #1 Biology Tuition in Ghaziabad
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition</span> in Ghaziabad
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Class 9 • Class 10 • Class 11 • Class 12 • Droppers
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Expert biology coaching for all classes in Indirapuram, Vaishali, Crossing Republik
              &amp; all Ghaziabad areas. AIIMS faculty, 98% success rate, personalized attention.
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {successStats.map((stat, index) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 animate-fadeInUp">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Class Programs Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition Programs for All Classes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive biology coaching from foundation to NEET level
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classPrograms.map((program, index) => (
              <div key={program.class} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow animate-fadeInUp">
                <div className="bg-[#4a5d4a] text-white p-4">
                  <div className="text-sm font-medium opacity-90">{program.class}</div>
                  <div className="text-xl font-bold">{program.title}</div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Key Topics:</div>
                    <div className="flex flex-wrap gap-2">
                      {program.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">{program.duration}</div>
                      <div className="text-lg font-bold text-green-600">{program.fee}</div>
                    </div>
                    <Link href="/demo-booking">
                      <Button variant="outline" size="sm">
                        Enquire
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Coverage */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition Across Ghaziabad
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from all major Ghaziabad areas trust us for biology coaching
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ghaziabadAreas.map((area, index) => (
              <div key={area.name} className="bg-green-50 rounded-xl p-4 text-center border border-green-100 animate-fadeInUp">
                <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{area.name}</div>
                <div className="text-green-600 font-semibold text-sm">{area.students}</div>
                <div className="text-xs text-gray-500">{area.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Biology Tuition in Ghaziabad
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature, index) => (
              <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp">
                <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition in Ghaziabad - FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 animate-fadeInUp">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Biology Journey in Ghaziabad Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,500+ students. Book your free demo class now!
            </p>

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

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Droppers'].map((cls) => (
                <span key={cls} className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {cls}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Biology Tuition Ghaziabad',
            description:
              'Best biology tuition in Ghaziabad for Class 9, 10, 11, 12 and NEET droppers. AIIMS faculty, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/biology-tuition-ghaziabad',
            areaServed: {
              '@type': 'City',
              name: 'Ghaziabad',
              containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Biology Tuition Programs',
              itemListElement: [
                { '@type': 'Course', name: 'Class 9 Foundation Biology' },
                { '@type': 'Course', name: 'Class 10 Pre-Foundation Biology' },
                { '@type': 'Course', name: 'Class 11 NEET Biology' },
                { '@type': 'Course', name: 'Class 12 NEET Biology' },
                { '@type': 'Course', name: 'NEET Dropper Biology' },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '38',
              bestRating: '5',
            },
          }),
        }}
      />
    </div>
  )
}
