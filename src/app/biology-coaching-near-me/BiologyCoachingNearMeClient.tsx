'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  Phone,
  Play,
  Users,
  Star,
  Clock,
  Award,
  GraduationCap,
  Target,
  Wifi,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  getOfflineCenters,
  getOnlineRegions,
  generateLocalBusinessSchema,
  getWhatsAppEnquiryUrl,
} from '@/lib/nearMe/nearMeData'

const PAGE_KEYWORD = 'Biology Coaching Near Me'

const centers = [
  {
    name: 'South Delhi Center',
    address: 'South Extension Part 2, Near Metro Station',
    areas: ['Hauz Khas', 'GK-1', 'GK-2', 'Defence Colony', 'Saket', 'Malviya Nagar'],
    students: 450,
    rating: 4.9,
    features: ['Near Pink Line Metro', 'Parking Available', 'AC Classrooms'],
  },
  {
    name: 'Rohini Center',
    address: 'DC Chauk, Sector 9, Rohini',
    areas: ['Rohini', 'Pitampura', 'Shalimar Bagh', 'Model Town', 'Ashok Vihar'],
    students: 380,
    rating: 4.8,
    features: ['Near Rohini East Metro', 'Library Access', 'Doubt Sessions'],
  },
  {
    name: 'Gurgaon Center',
    address: 'Unit 17, M2K Corporate Park, Sector 51 (Mayfield Garden)',
    areas: ['DLF Phase 1-5', 'Sector 14', 'Sohna Road', 'Golf Course Road'],
    students: 320,
    rating: 4.8,
    features: ['Near Rapid Metro', 'Modern Facilities', 'Online + Offline'],
  },
]

const courses = [
  {
    name: 'NEET Foundation',
    classes: 'Class 11',
    duration: '12 Months',
    fee: '₹36,000 - ₹65,000',
    features: ['Complete Biology', 'NCERT Focus', 'Weekly Tests'],
  },
  {
    name: 'NEET Intensive',
    classes: 'Class 12',
    duration: '12 Months',
    fee: '₹42,000 - ₹76,000',
    features: ['Advanced Topics', 'Mock Tests', 'Revision Batches'],
  },
  {
    name: 'NEET Dropper',
    classes: 'Repeater',
    duration: '12 Months',
    fee: '₹70,000 - ₹1,56,000',
    features: ['Crash Course', 'Personal Mentor', '100+ Mock Tests'],
  },
  {
    name: '2-Year Program',
    classes: 'Class 11-12',
    duration: '24 Months',
    fee: '₹85,000 - ₹1,80,000',
    features: ['Complete Preparation', 'School + NEET', 'All-Inclusive'],
  },
]

const comparisons = [
  { feature: 'Faculty', cerebrum: 'AIIMS Doctors', others: 'General Teachers' },
  { feature: 'Batch Size', cerebrum: '10-15 Students', others: '50-100 Students' },
  { feature: 'Success Rate', cerebrum: '98%', others: '60-70%' },
  { feature: 'Personal Attention', cerebrum: 'Individual Mentoring', others: 'Mass Teaching' },
  { feature: 'Study Material', cerebrum: 'NCERT + Previous Year', others: 'Generic Notes' },
  { feature: 'Mock Tests', cerebrum: '100+ NEET Pattern', others: '20-30 Tests' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    score: '680/720',
    college: 'AIIMS Delhi',
    location: 'From Hauz Khas',
    quote:
      'Found the best biology coaching near my home. The faculty really cares about each student.',
  },
  {
    name: 'Rahul Verma',
    score: '650/720',
    college: 'MAMC Delhi',
    location: 'From Rohini',
    quote: 'Small batches made all the difference. Personal attention helped me score 680 in NEET.',
  },
  {
    name: 'Ananya Singh',
    score: '665/720',
    college: 'LHMC Delhi',
    location: 'From Gurgaon',
    quote: 'Worth traveling for quality coaching. The results speak for themselves.',
  },
]

export function BiologyCoachingNearMeClient() {
  const [isInDelhiNCR, setIsInDelhiNCR] = useState<boolean | null>(null)

  const offlineCentersData = getOfflineCenters()
  const onlineRegions = getOnlineRegions()
  const localBusinessSchemas = generateLocalBusinessSchema(PAGE_KEYWORD, offlineCentersData)

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation')
    if (savedLocation) {
      const location = JSON.parse(savedLocation)
      const delhiNCRCities = [
        'Delhi',
        'New Delhi',
        'Gurugram',
        'Gurgaon',
        'Faridabad',
        'Noida',
        'Greater Noida',
        'Ghaziabad',
      ]
      setIsInDelhiNCR(delhiNCRCities.includes(location.city))
    } else {
      setIsInDelhiNCR(null)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* LocalBusiness Schemas for each center */}
      {localBusinessSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Target className="w-5 h-5 mr-2 text-yellow-300" />
              #1 NEET Biology Coaching in Delhi NCR
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Biology Coaching <span className="text-yellow-300">Near Me</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-4xl mx-auto">
              Looking for the best biology coaching near you for NEET? Cerebrum Biology Academy
              offers expert coaching with AIIMS faculty at convenient locations across Delhi NCR.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Award className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Users className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">67+</div>
                <div className="text-xs opacity-80">Medical Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <GraduationCap className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">AIIMS</div>
                <div className="text-xs opacity-80">Faculty</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">10+</div>
                <div className="text-xs opacity-80">Years Experience</div>
              </div>
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Coaching Centers in Delhi NCR
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All centers near metro stations for easy accessibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {centers.map((center, index) => (
              <div
                key={center.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
              >
                <div className="bg-[#4a5d4a] text-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{center.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-300 mr-1" />
                      <span>{center.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-80 mt-1">{center.address}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    {center.students}+ students enrolled
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Areas Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {center.areas.map((area) => (
                        <span
                          key={area}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    {center.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-600 mb-1">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Coaching Courses Available
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={course.name}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-colors animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    {course.classes}
                  </span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-green-600 font-bold mb-4">{course.fee}</p>
                <ul className="space-y-2">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Cerebrum vs Other Coaching Centers?
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Cerebrum</th>
                  <th className="p-4 text-center">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={item.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="p-4 text-center text-green-600 font-bold">{item.cerebrum}</td>
                    <td className="p-4 text-center text-gray-500">{item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Students Near You
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    {testimonial.score}
                  </span>
                  <span className="text-green-600 font-medium">{testimonial.college}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Classes Section - For non Delhi NCR users */}
      {isInDelhiNCR === false && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Wifi className="w-4 h-4 mr-2" />
                Online Classes Available
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Not in Delhi NCR? Join Us Online!
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get the same expert biology coaching from anywhere in India through our interactive
                online platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineRegions.map((region, index) => (
                <div
                  key={region.name}
                  className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 animate-fadeInUp"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900">{region.name}</h3>
                      <p className="text-sm text-gray-500">
                        {region.studentCount}+ students enrolled
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(region.states || region.countries || []).slice(0, 4).map((area) => (
                      <span
                        key={area}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {area}
                      </span>
                    ))}
                    {(region.states || region.countries || []).length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{(region.states || region.countries || []).length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="text-center mt-10 animate-fadeInUp"
            >
              <a href={getWhatsAppEnquiryUrl(PAGE_KEYWORD, 'Online')}>
                <Button size="xl" className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enquire About Online Classes
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your NEET Journey Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Find the best biology coaching near you. Book a FREE demo class!
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
                  className="border-white text-white hover:bg-white hover:text-green-700"
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
            description:
              'Best biology coaching near you for NEET preparation. AIIMS faculty, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/biology-coaching-near-me',
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
              ratingValue: '5.0',
              reviewCount: '38',
            },
          }),
        }}
      />
    </div>
  )
}
