'use client'

import Link from 'next/link'
import {
  MapPin,
  Phone,
  Play,
  Users,
  Star,
  Clock,
  Trophy,
  GraduationCap,
  Target,
  Zap,
  BookOpen,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const rankings = [
  { rank: 1, name: 'Cerebrum Biology Academy', rating: 4.9, successRate: '98%', highlight: true },
  { rank: 2, name: 'Allen Career Institute', rating: 4.5, successRate: '75%', highlight: false },
  { rank: 3, name: 'Aakash Institute', rating: 4.4, successRate: '72%', highlight: false },
  { rank: 4, name: 'FIITJEE', rating: 4.3, successRate: '68%', highlight: false },
  { rank: 5, name: 'Resonance', rating: 4.2, successRate: '65%', highlight: false },
]

const achievements = [
  { icon: Trophy, value: '500+', label: 'Medical Selections', color: 'text-yellow-500' },
  { icon: Target, value: '98%', label: 'Success Rate', color: 'text-green-600' },
  { icon: Users, value: '5,000+', label: 'Students Taught', color: 'text-blue-500' },
  { icon: Star, value: '4.9/5', label: 'Google Rating', color: 'text-orange-500' },
  { icon: GraduationCap, value: 'AIIMS', label: 'Expert Faculty', color: 'text-purple-500' },
  { icon: Clock, value: '10+', label: 'Years Experience', color: 'text-green-600' },
]

const cityData = [
  {
    city: 'Delhi',
    areas: ['South Delhi', 'Rohini', 'Dwarka', 'Laxmi Nagar', 'Pitampura'],
    students: 1500,
    centers: 2,
  },
  {
    city: 'Noida',
    areas: ['Sector 18', 'Sector 62', 'Sector 137', 'Greater Noida'],
    students: 800,
    centers: 1,
  },
  {
    city: 'Gurgaon',
    areas: ['DLF Phase 3', 'Sector 14', 'Sohna Road', 'Golf Course Road'],
    students: 600,
    centers: 1,
  },
  {
    city: 'Ghaziabad',
    areas: ['Indirapuram', 'Vaishali', 'Raj Nagar', 'Vasundhara'],
    students: 400,
    centers: 1,
  },
]

const whyBest = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors who scored 680+ in NEET and studied at AIIMS/JIPMER',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personal attention unlike 100+ student batches at other coaching centers',
  },
  {
    icon: Brain,
    title: 'Concept-Based Learning',
    description: 'Deep understanding of biology concepts, not just rote memorization',
  },
  {
    icon: Target,
    title: 'NCERT + NEET Focus',
    description: 'Complete NCERT mastery plus previous year NEET question practice',
  },
  {
    icon: BookOpen,
    title: '100+ Mock Tests',
    description: 'Regular NEET pattern tests with detailed analysis and improvement tracking',
  },
  {
    icon: Zap,
    title: 'Doubt Clearing Sessions',
    description: 'Daily doubt sessions with faculty - no doubt goes unanswered',
  },
]

const testimonials = [
  {
    name: 'Aarav Gupta',
    score: '695/720',
    rank: 'AIR 234',
    college: 'AIIMS Delhi',
    quote:
      'The best decision I made was joining Cerebrum. Small batches and AIIMS faculty made all the difference.',
    image: '/testimonials/student1.jpg',
  },
  {
    name: 'Priya Sharma',
    score: '680/720',
    rank: 'AIR 450',
    college: 'MAMC Delhi',
    quote:
      'After dropping from Kota coaching, I found Cerebrum. Personal attention helped me crack NEET.',
    image: '/testimonials/student2.jpg',
  },
  {
    name: 'Rohan Verma',
    score: '665/720',
    rank: 'AIR 890',
    college: 'LHMC Delhi',
    quote: 'Best NEET coaching in Delhi NCR. The mock tests and doubt sessions were game changers.',
    image: '/testimonials/student3.jpg',
  },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Delhi NCR?',
    answer:
      'Cerebrum Biology Academy is rated as the #1 NEET Biology coaching in Delhi NCR with a 98% success rate, 67+ AIIMS selections, and AIIMS faculty. Unlike large coaching chains, we maintain small batch sizes of 10-15 students for personalized attention.',
  },
  {
    question: 'What makes Cerebrum different from Kota coaching?',
    answer:
      'Unlike Kota coaching with 100+ students per batch, Cerebrum offers small batches (10-15 students), AIIMS faculty who scored 680+ in NEET, daily doubt clearing sessions, and a 98% success rate. Plus, you can stay with your family in Delhi NCR.',
  },
  {
    question: 'What is the fee structure for NEET coaching?',
    answer:
      'Our fees range from ₹36,000 (Pursuit tier) to ₹1,56,000 (Pinnacle tier) per year. We offer 3 tiers: Pursuit (budget-friendly, 30-40 students), Ascent (popular, 16-18 students), and Pinnacle (premium, 10-12 students). EMI options available.',
  },
  {
    question: 'Do you have centers in Noida and Gurgaon?',
    answer:
      'Yes! We have 4 centers - South Delhi (South Extension), Rohini (DC Chauk), Gurgaon (M2K Corporate Park, Sector 51), and Faridabad. All centers are near metro stations. We also offer online classes for students from Noida and Ghaziabad.',
  },
  {
    question: 'Is there a free demo class available?',
    answer:
      'Yes! We offer a completely FREE demo class so you can experience our teaching methodology. Book at cerebrumbiologyacademy.com/demo-booking or call +91-88264-44334. No commitment required.',
  },
]

export function BestNEETCoachingDelhiNCRClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Trophy className="w-5 h-5 mr-2" />
              #1 Rated NEET Coaching in Delhi NCR
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best NEET Coaching in <span className="text-yellow-300">Delhi NCR</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-4xl mx-auto">
              Join the highest-rated NEET Biology coaching with 98% success rate, 500+ medical
              selections, and AIIMS faculty. Centers in Delhi, Noida, Gurgaon.
            </p>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto mb-10">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 animate-fadeInUp"
                >
                  <achievement.icon className={`w-5 h-5 mx-auto mb-1 ${achievement.color}`} />
                  <div className="text-lg font-bold">{achievement.value}</div>
                  <div className="text-xs opacity-80">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
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
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top 5 NEET Coaching in Delhi NCR (2025)
            </h2>
            <p className="text-lg text-gray-600">
              Based on success rate, faculty quality, and student reviews
            </p>
          </div>

          <div className="space-y-4">
            {rankings.map((item, index) => (
              <div
                key={item.name}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  item.highlight
                    ? 'bg-gradient-to-r from-yellow-50 to-green-50 border-2 border-green-600'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${
                      item.highlight ? 'bg-yellow-500 text-black' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    #{item.rank}
                  </div>
                  <div>
                    <h3
                      className={`font-bold ${item.highlight ? 'text-green-700' : 'text-gray-700'}`}
                    >
                      {item.name}
                      {item.highlight && (
                        <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                          RECOMMENDED
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {item.rating}/5
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${item.highlight ? 'text-green-600' : 'text-gray-600'}`}
                  >
                    {item.successRate}
                  </div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Best Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Cerebrum is the Best NEET Coaching?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyBest.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Coverage */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Across Delhi NCR
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityData.map((city, index) => (
              <div
                key={city.city}
                className="bg-indigo-50 rounded-xl p-6 animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{city.city}</h3>
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4 mr-1" />
                  {city.students}+ students | {city.centers} center(s)
                </div>
                <div className="flex flex-wrap gap-1">
                  {city.areas.map((area) => (
                    <span
                      key={area}
                      className="bg-white text-gray-600 text-xs px-2 py-1 rounded border"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Toppers from Delhi NCR
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-6 shadow-md animate-fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-purple-600">{testimonial.rank}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    {testimonial.score}
                  </span>
                  <span className="text-green-600 font-medium text-sm">{testimonial.college}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Best NEET Coaching?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a FREE demo class and see why we're #1 rated in Delhi NCR!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
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
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
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
            name: 'Cerebrum Biology Academy',
            description: 'Best NEET coaching in Delhi NCR with 98% success rate and AIIMS faculty.',
            url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-delhi-ncr',
            telephone: '+918826444334',
            areaServed: [
              { '@type': 'City', name: 'Delhi' },
              { '@type': 'City', name: 'Noida' },
              { '@type': 'City', name: 'Gurgaon' },
              { '@type': 'City', name: 'Ghaziabad' },
              { '@type': 'City', name: 'Faridabad' },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '500',
              bestRating: '5',
            },
            award: [
              '#1 NEET Biology Coaching in Delhi NCR',
              '98% Success Rate',
              '67+ AIIMS Selections',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
