import Link from 'next/link'
import { Metadata } from 'next'
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
  ArrowRight,
  Phone,
  MessageCircle,
  BookOpen,
  CheckCircle,
  Sparkles,
  Quote,
} from 'lucide-react'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'

export const metadata: Metadata = {
  title: 'NEET Results 2024-25 | 98% Success Rate | 67 AIIMS Selections | Cerebrum Biology Academy',
  description:
    'Cerebrum Biology Academy NEET results: 98% success rate, 67 AIIMS selections, AIR 127 best rank. Watch video testimonials. Board exam avg 92/100. 2,500+ students. See proof.',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/results',
  },
  openGraph: {
    title: 'NEET Results | 98% Success Rate | Cerebrum Biology Academy',
    description: '98% success rate, 67 AIIMS selections, 2,500+ students. Watch video testimonials from our toppers.',
    url: 'https://cerebrumbiologyacademy.com/results',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    { '@type': 'ListItem', position: 2, name: 'Results', item: 'https://cerebrumbiologyacademy.com/results' },
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

const scoreTransformations = [
  { name: 'Arjun Sharma', school: 'DPS Gurgaon', before: 332, after: 685, rank: 'AIR 127', college: 'AIIMS Delhi', improvement: 353 },
  { name: 'Sadhna Sirin', school: 'Delhi NCR', before: 495, after: 695, rank: '100 %ile', college: 'LHMC Delhi', improvement: 200 },
  { name: 'Priya Sharma', school: 'Modern School', before: 505, after: 685, rank: 'Top 500', college: 'AIIMS Delhi', improvement: 180 },
  { name: 'Rahul Verma', school: 'KV Delhi', before: 498, after: 670, rank: 'Top 800', college: 'MAMC Delhi', improvement: 172 },
  { name: 'Ishita Verma', school: 'DPS Noida', before: 420, after: 632, rank: 'Top 2000', college: 'AIIMS Rishikesh', improvement: 212 },
]

const yearWiseResults = [
  { year: '2024', qualified: '450+', topRank: 'AIR 127', aiims: 18, boardAvg: '93/100', improvement: '+18%' },
  { year: '2023', qualified: '380+', topRank: 'AIR 234', aiims: 15, boardAvg: '91/100', improvement: '+15%' },
  { year: '2022', qualified: '320+', topRank: 'AIR 312', aiims: 12, boardAvg: '89/100', improvement: '+12%' },
  { year: '2021', qualified: '280+', topRank: 'AIR 489', aiims: 10, boardAvg: '87/100', improvement: '+10%' },
]

const topColleges = [
  { name: 'AIIMS Delhi', students: 12, icon: '🏥' },
  { name: 'AIIMS (Other Campuses)', students: 55, icon: '🏥' },
  { name: 'Maulana Azad Medical', students: 18, icon: '🎓' },
  { name: 'Lady Hardinge Medical', students: 15, icon: '🎓' },
  { name: 'JIPMER Puducherry', students: 8, icon: '🏛️' },
  { name: 'AFMC Pune', students: 6, icon: '⭐' },
  { name: 'KGMU Lucknow', students: 12, icon: '🎓' },
  { name: 'BHU Varanasi', students: 10, icon: '🏛️' },
  { name: 'GMC Chandigarh', students: 8, icon: '🎓' },
  { name: 'Other Govt Medical Colleges', students: 300, icon: '🏥' },
]

const testimonials = [
  {
    quote: "Cerebrum's biology faculty made NEET preparation feel manageable. My score improved by 180 marks!",
    name: 'Priya Sharma',
    score: 685,
    college: 'AIIMS Delhi',
    school: 'Modern School, Delhi',
    improvement: '+180 marks',
  },
  {
    quote: 'The small batch size meant I could ask doubts anytime. Best decision I made for NEET prep.',
    name: 'Rahul Verma',
    score: 670,
    college: 'Maulana Azad Medical College',
    school: 'KV, Delhi',
    improvement: '+172 marks',
  },
  {
    quote: "As an NRI student, online classes were perfect. Dr. Shekhar's teaching is truly world-class.",
    name: 'Aisha Khan',
    score: 645,
    college: 'JIPMER Puducherry',
    school: 'International School, UAE',
    improvement: '+165 marks',
  },
]

export default function ResultsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <div className="min-h-screen bg-white">

        {/* SECTION 1: Hero — Emotional Impact */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-sm font-medium">NEET 2024 Results — 450+ Students Qualified</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Our Students Don&apos;t Just Pass —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  They Top
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto mb-10">
                From 332 to 685. From &ldquo;will I even qualify?&rdquo; to AIR 127 at AIIMS Delhi.
                Real transformations, real students, real results — verified and documented.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {[
                  { icon: Trophy, value: '98%', label: 'Success Rate', accent: 'text-yellow-400' },
                  { icon: Award, value: '67+', label: 'AIIMS Selections', accent: 'text-green-400' },
                  { icon: Users, value: '2,500+', label: 'Students Coached', accent: 'text-blue-400' },
                  { icon: Target, value: 'AIR 127', label: 'Best Rank', accent: 'text-purple-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
                    <stat.icon className={`w-7 h-7 mx-auto mb-3 ${stat.accent}`} />
                    <div className={`text-2xl sm:text-3xl font-bold ${stat.accent}`}>{stat.value}</div>
                    <div className="text-xs sm:text-sm text-blue-200 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105 min-h-[52px]"
                >
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#video-testimonials"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all min-h-[52px]"
                >
                  <Play className="w-5 h-5" />
                  Watch Success Stories
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Video Testimonials */}
        <section id="video-testimonials" className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Watch Our Toppers Speak
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Don&apos;t take our word for it — hear directly from students who cracked NEET with Cerebrum
              </p>
            </div>
            <VideoTestimonialsSection />
          </div>
        </section>

        {/* SECTION 3: Before → After Score Transformations */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Score Transformations — Before &amp; After
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                These aren&apos;t just numbers — each one represents a student whose life changed
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scoreTransformations.map((student) => (
                <div key={student.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-white text-center">
                    <span className="font-bold text-lg">+{student.improvement} Marks</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">Before</div>
                        <div className="text-2xl font-bold text-red-500">{student.before}</div>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowRight className="w-8 h-8 text-green-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">After</div>
                        <div className="text-2xl font-bold text-green-600">{student.after}</div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="font-bold text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.school}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">{student.rank}</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">{student.college}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Key Achievements */}
        <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Milestones That Define Us
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: 'AIR 127', label: 'Highest Rank', detail: 'Arjun Sharma — AIIMS Delhi', icon: Trophy, bg: 'from-yellow-400 to-amber-500' },
                { value: '+212', label: 'Highest Improvement', detail: 'Ishita Verma — 420 to 632', icon: TrendingUp, bg: 'from-green-400 to-emerald-500' },
                { value: '178/180', label: 'Biology Top Score', detail: 'Near-perfect Biology score', icon: Star, bg: 'from-blue-400 to-indigo-500' },
                { value: '67', label: 'AIIMS Selections', detail: 'Across all AIIMS campuses', icon: GraduationCap, bg: 'from-purple-400 to-violet-500' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="font-semibold text-gray-700 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Year-wise Results */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Consistent Excellence — Year After Year
              </h2>
              <p className="text-gray-600 text-lg">Every year better than the last</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Year</th>
                    <th className="px-6 py-4 text-center font-bold">Students Qualified</th>
                    <th className="px-6 py-4 text-center font-bold">Best Rank</th>
                    <th className="px-6 py-4 text-center font-bold">AIIMS Selections</th>
                    <th className="px-6 py-4 text-center font-bold">Board Avg</th>
                    <th className="px-6 py-4 text-center font-bold">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {yearWiseResults.map((result, i) => (
                    <tr key={result.year} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                      <td className="px-6 py-4 font-bold text-2xl text-blue-600">{result.year}</td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">{result.qualified}</td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">{result.topRank}</td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">{result.aiims}</td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">{result.boardAvg}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {result.improvement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 6: Board Exam Results */}
        <section className="py-14 sm:py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Not Just NEET — Board Toppers Too
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our integrated Board + NEET approach means students excel at both without separate tuition
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '92/100', label: 'Average Board Score', detail: 'CBSE Biology 2024', icon: BookOpen },
                { value: '25%', label: 'Score 95+', detail: 'In CBSE Biology Board', icon: Star },
                { value: '96/100', label: 'Highest Board Score', detail: 'Multiple students', icon: Trophy },
                { value: '85%', label: 'Smooth Class 11→12', detail: 'Transition success rate', icon: TrendingUp },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-md border border-green-100">
                  <stat.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="font-semibold text-gray-700">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Where Our Students Go — College Placements */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Where Our Students Study Medicine
              </h2>
              <p className="text-gray-600 text-lg">Top medical colleges across India</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {topColleges.map((college) => (
                <div key={college.name} className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="text-2xl mb-2">{college.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{college.name}</div>
                  <div className="text-blue-600 font-bold">{college.students}+ students</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: Text Testimonials with Stars */}
        <section className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                In Their Own Words
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative">
                  <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.school}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{testimonial.score}/720</div>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{testimonial.improvement}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-purple-600 font-medium">{testimonial.college}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Explore More */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore More
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/success-stories" className="group block">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-green-500 h-full">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Play className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Video Success Stories</h3>
                  <p className="text-gray-600 mb-4">Watch detailed testimonials from toppers</p>
                  <span className="inline-flex items-center text-blue-600 font-semibold text-sm">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
              <Link href="/student/wall-of-achievers" className="group block">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-blue-500 h-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Wall of Achievers</h3>
                  <p className="text-gray-600 mb-4">1000+ achievers with ranks and colleges</p>
                  <span className="inline-flex items-center text-blue-600 font-semibold text-sm">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
              <Link href="/neet-biology-mcq" className="group block">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-purple-500 h-full">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Free MCQ Practice</h3>
                  <p className="text-gray-600 mb-4">19,000+ NEET Biology questions</p>
                  <span className="inline-flex items-center text-blue-600 font-semibold text-sm">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 10: CTA — Start Your Success Story */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Your Success Story Starts{' '}
              <span className="text-yellow-400">Today</span>
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
              Join 2,500+ students who transformed their Biology scores and got into top medical colleges.
              Next batch starting this week — limited seats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105 min-h-[52px]"
              >
                Book Free Demo Class
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20saw%20your%20results%20page%20and%20want%20to%20know%20more%20about%20joining%20Cerebrum%20Biology%20Academy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-all min-h-[52px]"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Now
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all min-h-[52px]"
              >
                <Phone className="w-5 h-5" />
                Call: 88264 44334
              </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-blue-300">
              {['98% Success Rate', 'AIIMS Faculty', '15 Students/Batch', 'Board + NEET'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
