import Link from 'next/link'
import {
  Trophy,
  Award,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  GraduationCap,
  Target,
  Play,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

const breadcrumbSchema = {
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
      name: 'Results',
      item: 'https://cerebrumbiologyacademy.com/results',
    },
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1200',
    bestRating: '5',
    worstRating: '1',
  },
}

const achievements = [
  {
    value: 'AIR 127',
    label: 'Highest Rank Achieved',
    detail: 'Arjun Sharma - AIIMS Delhi',
    icon: Trophy,
    bgColor: 'bg-yellow-50',
    iconBg: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    detailColor: 'text-yellow-700',
  },
  {
    value: '+212 Marks',
    label: 'Highest Improvement',
    detail: 'Repeater Success Story',
    icon: TrendingUp,
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-500',
    textColor: 'text-green-900',
    detailColor: 'text-green-700',
  },
  {
    value: '178/180',
    label: 'Biology Top Score',
    detail: 'Ishita Verma - AIIMS Rishikesh',
    icon: Star,
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-500',
    textColor: 'text-blue-900',
    detailColor: 'text-blue-700',
  },
  {
    value: '67 Students',
    label: 'AIIMS Selections',
    detail: 'Across all campuses',
    icon: GraduationCap,
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-500',
    textColor: 'text-purple-900',
    detailColor: 'text-purple-700',
  },
]

const hubLinks = [
  {
    title: 'Student Success Stories',
    description: 'Watch video testimonials and read detailed success stories from our NEET toppers',
    href: '/success-stories',
    icon: Play,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-t-green-500',
    badge: 'Video Testimonials',
  },
  {
    title: 'Wall of Achievers',
    description:
      'Browse our complete list of top achievers, their ranks, and the colleges they joined',
    href: '/student/wall-of-achievers',
    icon: Award,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-t-blue-500',
    badge: '1000+ Achievers',
  },
  {
    title: 'NEET Result Analysis',
    description: 'Detailed analysis of NEET results, trends, and cutoff predictions',
    href: '/neet-result-analysis',
    icon: BarChart3,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-t-purple-500',
    badge: 'Data & Insights',
  },
]

const yearWiseResults = [
  { year: '2024', qualified: '450+', topRank: 'AIR 127', aiims: 18 },
  { year: '2023', qualified: '380+', topRank: 'AIR 234', aiims: 15 },
  { year: '2022', qualified: '320+', topRank: 'AIR 312', aiims: 12 },
  { year: '2021', qualified: '280+', topRank: 'AIR 489', aiims: 10 },
]

const testimonials = [
  {
    quote:
      "Cerebrum's biology faculty made NEET preparation feel manageable. My score improved by 180 marks!",
    name: 'Priya Sharma',
    score: 685,
    college: 'AIIMS Delhi',
  },
  {
    quote:
      'The small batch size meant I could ask doubts anytime. Best decision I made for NEET prep.',
    name: 'Rahul Verma',
    score: 670,
    college: 'Maulana Azad Medical College',
  },
  {
    quote:
      "As an NRI student, online classes were perfect. Dr. Shekhar's teaching is truly world-class.",
    name: 'Aisha Khan',
    score: 645,
    college: 'JIPMER Puducherry',
  },
]

export default function ResultsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-white">
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Results & Success Stories
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-8 sm:mb-12">
                A proven track record of transforming aspirants into doctors. Our students
                consistently achieve top ranks in NEET, securing seats in India&apos;s most
                prestigious medical colleges.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">98%</div>
                  <div className="text-xs sm:text-sm text-green-100">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">67+</div>
                  <div className="text-xs sm:text-sm text-green-100">AIIMS Selections</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">15,000+</div>
                  <div className="text-xs sm:text-sm text-green-100">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">AIR 127</div>
                  <div className="text-xs sm:text-sm text-green-100">Best Rank</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Key Achievements
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Milestones that define our commitment to student success
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((item) => (
                <div key={item.label} className={`${item.bgColor} rounded-3xl p-8 text-center`}>
                  <div
                    className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold ${item.textColor} mb-2`}>
                    {item.value}
                  </div>
                  <div className={`font-semibold ${item.textColor} mb-1`}>{item.label}</div>
                  <div className={`text-sm ${item.detailColor}`}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Our Results
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Dive deeper into our results with detailed stories, achiever profiles, and data
                analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {hubLinks.map((link) => (
                <Link key={link.title} href={link.href} className="group block">
                  <div
                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 ${link.borderColor} h-full`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${link.iconBg} rounded-full flex items-center justify-center`}
                      >
                        <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 border-0">{link.badge}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{link.description}</p>
                    <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Year-wise Results
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Consistent excellence across years, with improving outcomes every session
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {yearWiseResults.map((result) => (
                <Card
                  key={result.year}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
                      {result.year}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Students Qualified</span>
                        <span className="font-bold text-gray-900">{result.qualified}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Top Rank</span>
                        <span className="font-bold text-gray-900">{result.topRank}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">AIIMS Selections</span>
                        <span className="font-bold text-gray-900">{result.aiims}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Students Say
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Hear directly from students who achieved their medical dreams with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-blue-600 font-semibold">
                      NEET Score: {testimonial.score}
                    </div>
                    <div className="text-sm text-gray-500">{testimonial.college}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Success Story
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of students who turned their NEET aspirations into reality with
              Cerebrum Biology Academy. Your journey to a top medical college starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  size="lg"
                  variant="primary"
                  className="bg-green-500 hover:bg-green-600 text-white min-h-[44px] w-full sm:w-auto"
                >
                  Book a Free Demo Class
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 min-h-[44px] w-full sm:w-auto"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
              <Link
                href="/all-locations"
                className="text-gray-400 hover:text-white underline underline-offset-4"
              >
                Find a Center Near You &rarr;
              </Link>
              <Link
                href="/board-exam-preparation"
                className="text-gray-400 hover:text-white underline underline-offset-4"
              >
                Board Exam Preparation &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
