import { Metadata } from 'next'
import Link from 'next/link'
import { Trophy, Star, ArrowRight, Medal, Target, TrendingUp, Crown, Zap } from 'lucide-react'
import Script from 'next/script'
import { ResultsPageWebPageSchema } from '@/components/seo'

export const metadata: Metadata = {
  title: 'Student Results & Success Stories | NEET Biology Achievements | Cerebrum Biology Academy',
  description:
    'Outstanding NEET Biology results from our students. See AIIMS, JIPMER selections, rank improvements, and success stories from across India.',
  keywords:
    'NEET results, AIIMS selection, JIPMER admission, NEET Biology scores, medical college admission, student success stories',
}

export default function ResultsPage() {
  const topPerformers2024 = [
    {
      name: 'Arjun Mehta',
      location: 'Mumbai, Maharashtra',
      neetScore: 685,
      biologyScore: 358,
      rank: 'AIR 247',
      college: 'AIIMS Delhi',
      improvement: '+195 marks from previous attempt',
      course: 'NEET Dropper Program',
      image: '/students/arjun-mehta.jpg',
    },
    {
      name: 'Priya Singh',
      location: 'Delhi',
      neetScore: 672,
      biologyScore: 352,
      rank: 'AIR 418',
      college: 'MAMC Delhi',
      improvement: 'First attempt success',
      course: 'Class 12th Biology',
      image: '/students/priya-singh.jpg',
    },
    {
      name: 'Rahul Sharma',
      location: 'Bangalore, Karnataka',
      neetScore: 658,
      biologyScore: 345,
      rank: 'AIR 892',
      college: 'JIPMER Puducherry',
      improvement: '+168 marks improvement',
      course: 'Online Classes',
      image: '/students/rahul-sharma.jpg',
    },
    {
      name: 'Ananya Reddy',
      location: 'Hyderabad, Telangana',
      neetScore: 645,
      biologyScore: 340,
      rank: 'AIR 1,247',
      college: 'KIMS Hyderabad',
      improvement: 'First attempt success',
      course: 'Classroom Coaching',
      image: '/students/ananya-reddy.jpg',
    },
  ]

  const yearlyStats = [
    {
      year: '2024',
      totalStudents: 2847,
      neetQualified: 2683,
      qualificationRate: '98%',
      aiims: 23,
      jipmer: 31,
      govt: 1247,
      private: 1382,
      avgBiology: 335,
    },
    {
      year: '2023',
      totalStudents: 2456,
      neetQualified: 2298,
      qualificationRate: '93.6%',
      aiims: 18,
      jipmer: 27,
      govt: 1089,
      private: 1164,
      avgBiology: 332,
    },
    {
      year: '2022',
      totalStudents: 2134,
      neetQualified: 1987,
      qualificationRate: '93.1%',
      aiims: 15,
      jipmer: 22,
      govt: 945,
      private: 1005,
      avgBiology: 328,
    },
  ]

  const collegeAdmissions = [
    { college: 'AIIMS (All India)', count: 56, type: 'Premier' },
    { college: 'JIPMER', count: 80, type: 'Premier' },
    { college: 'MAMC Delhi', count: 45, type: 'Government' },
    { college: 'KGMC Lucknow', count: 38, type: 'Government' },
    { college: 'GMERS Gujarat', count: 62, type: 'Government' },
    { college: 'KIMS Hyderabad', count: 71, type: 'Government' },
    { college: 'Kasturba Medical College', count: 89, type: 'Private' },
    { college: 'JSS Medical College', count: 76, type: 'Private' },
  ]

  const categoryWiseResults = [
    {
      category: 'Biology Toppers (350+ marks)',
      count: 234,
      percentage: '8.2%',
      description: 'Students scoring 350+ out of 360 in Biology',
      color: 'green',
    },
    {
      category: 'NEET Qualifiers (600+ marks)',
      count: 2683,
      percentage: '98%',
      description: 'Students qualifying NEET with 600+ total marks',
      color: 'blue',
    },
    {
      category: 'Rank Improvement (100+ ranks)',
      count: 1456,
      percentage: '78.6%',
      description: 'Dropper students improving by 100+ ranks',
      color: 'purple',
    },
    {
      category: 'First Attempt Success',
      count: 1789,
      percentage: '89.4%',
      description: 'Class 12 students qualifying in first attempt',
      color: 'orange',
    },
  ]

  const remarkableStories = [
    {
      student: 'Vikash Kumar',
      location: 'Patna, Bihar',
      story: 'Rural Background Success',
      achievement: 'AIR 1,847 → Government Medical College',
      details:
        'From a small village with limited resources, Vikash used our online classes to overcome geographical barriers and achieve his medical dream.',
      biologyScore: 342,
      improvement: '+189 marks',
    },
    {
      student: 'Sneha Patel',
      location: 'Ahmedabad, Gujarat',
      story: 'Third Attempt Triumph',
      achievement: 'AIR 2,156 → NHL Medical College',
      details:
        'After two unsuccessful attempts, Sneha joined our dropper program and finally secured admission with dedicated coaching and psychological support.',
      biologyScore: 338,
      improvement: '+156 marks',
    },
    {
      student: 'Mohammed Ali',
      location: 'Hyderabad, Telangana',
      story: 'Working Class Hero',
      achievement: 'AIR 3,247 → Government Medical College',
      details:
        'Balancing part-time work with studies, Ali used our flexible online classes and doubt resolution to achieve his goal despite financial constraints.',
      biologyScore: 335,
      improvement: '+167 marks',
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800 border-green-600',
      blue: 'bg-blue-100 text-blue-800 border-blue-600',
      purple: 'bg-purple-100 text-purple-800 border-purple-600',
      orange: 'bg-orange-100 text-orange-800 border-orange-600',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  // ItemList Schema for Student Achievements
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Outstanding Student Results and NEET Achievements',
    description: 'Featured student achievements with AIIMS and JIPMER selections',
    numberOfItems: topPerformers2024.length,
    itemListElement: topPerformers2024.map((student, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: student.name,
      description: `${student.name} from ${student.location} achieved AIR ${student.rank} with ${student.neetScore} total NEET score and ${student.biologyScore} in Biology. Selected for ${student.college}.`,
      item: {
        '@type': 'Person',
        name: student.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: student.location.split(',')[0],
        },
        award: `${student.rank} in NEET`,
        knowsAbout: student.course,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ItemList Schema for Voice Search and Featured Snippets */}
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* WebPage Schema with internal linking */}
      <ResultsPageWebPageSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Trophy className="w-16 h-16 text-yellow-200" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Outstanding Student Results</h1>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Celebrating the success of our students who achieved their medical dreams. From AIIMS
              selections to remarkable rank improvements - these are stories of determination and
              excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center"
              >
                Join Our Success Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Get Guidance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2024 Top Performers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">NEET 2024 Top Performers</h2>
            <p className="text-gray-600">
              Our star students who achieved exceptional ranks and secured top medical colleges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {topPerformers2024.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                      <p className="text-gray-600 text-sm">{student.location}</p>
                      <div className="flex items-center mt-2">
                        <Medal className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-yellow-600 font-semibold text-sm">
                          {student.rank}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">{student.neetScore}</div>
                      <div className="text-xs text-green-700">NEET Score</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">{student.biologyScore}</div>
                      <div className="text-xs text-blue-700">Biology Score</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium">{student.college}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{student.improvement}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-700">{student.course}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yearly Performance Statistics */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Year-wise Performance Analysis
            </h2>
            <p className="text-gray-600">
              Consistent excellence in NEET Biology coaching over the years
            </p>
          </div>

          <div className="space-y-6">
            {yearlyStats.map((year, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">NEET {year.year} Results</h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      {year.qualificationRate}
                    </div>
                    <div className="text-sm text-gray-600">Qualification Rate</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{year.totalStudents}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{year.neetQualified}</div>
                    <div className="text-sm text-gray-600">NEET Qualified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{year.govt}</div>
                    <div className="text-sm text-gray-600">Govt Colleges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{year.avgBiology}</div>
                    <div className="text-sm text-gray-600">Avg Biology Score</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-yellow-700">{year.aiims}</div>
                    <div className="text-sm text-yellow-600">AIIMS Selections</div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-indigo-700">{year.jipmer}</div>
                    <div className="text-sm text-indigo-600">JIPMER Selections</div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-pink-700">{year.private}</div>
                    <div className="text-sm text-indigo-600">Private Colleges</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Admissions Breakdown */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Medical College Admissions 2024
            </h2>
            <p className="text-gray-600">
              Our students secured admissions in top medical colleges across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collegeAdmissions.map((college, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{college.count}</div>
                  <div className="text-sm text-gray-600 mb-2">{college.type} College</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{college.college}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category-wise Success Analysis */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Category Analysis</h2>
            <p className="text-gray-600">
              Detailed breakdown of student achievements across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {categoryWiseResults.map((category, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${getColorClasses(category.color)} hover:shadow-xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                    <div className="text-sm font-semibold text-green-600">
                      {category.percentage}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remarkable Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Remarkable Success Stories</h2>
            <p className="text-gray-600">
              Inspiring journeys of students who overcame challenges to achieve their dreams
            </p>
          </div>

          <div className="space-y-8">
            {remarkableStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.student}</h3>
                    <p className="text-gray-600 mb-2">{story.location}</p>
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="font-semibold text-gray-900">{story.story}</span>
                    </div>
                    <div className="text-lg font-semibold text-green-600">{story.achievement}</div>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-gray-700 mb-4 italic">"{story.details}"</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-600">{story.biologyScore}</div>
                        <div className="text-sm text-blue-700">Biology Score</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-600">{story.improvement}</div>
                        <div className="text-sm text-green-700">Improvement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Success Story?</h2>
          <p className="text-xl text-blue-100 mb-8">
            These results speak for themselves. Join thousands of successful students who achieved
            their medical dreams with us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
            >
              Start Your Journey
              <Zap className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/admissions"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
