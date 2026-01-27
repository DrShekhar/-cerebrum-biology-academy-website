import { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, Calendar, Quote, Award, Users, TrendingUp, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Media Mentions & Press Coverage | Cerebrum Biology Academy',
  description:
    'Cerebrum Biology Academy featured in Education Times, Career360, Hindustan Times. Read press coverage about our NEET coaching excellence and student success stories.',
  keywords: [
    'cerebrum biology academy news',
    'neet coaching press coverage',
    'dr shekhar singh media',
    'best neet coaching gurugram news',
    'cerebrum academy reviews',
  ],
  openGraph: {
    title: 'Media Mentions & Press Coverage | Cerebrum Biology Academy',
    description: 'Featured in leading education publications. Read about our NEET success stories.',
    url: 'https://cerebrumbiologyacademy.com/media-mentions-press-coverage',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/media-mentions-press-coverage',
  },
}

const pressItems = [
  {
    publication: 'Education Times',
    title: 'Small Batch Coaching: The Future of NEET Preparation',
    excerpt: 'Dr. Shekhar Singh of Cerebrum Biology Academy explains why personalized coaching with small batch sizes produces better NEET results than mass coaching centers.',
    date: '2025-12-15',
    type: 'Feature Article',
    logo: '/media/education-times.png',
  },
  {
    publication: 'Career360',
    title: 'Top 10 NEET Coaching Institutes in Gurugram 2026',
    excerpt: 'Cerebrum Biology Academy ranked among top NEET coaching centers in Gurugram for specialized Biology coaching and impressive success rate.',
    date: '2025-11-20',
    type: 'Ranking',
    logo: '/media/career360.png',
  },
  {
    publication: 'Hindustan Times Education',
    title: 'AIIMS Alumni Bringing Medical College Excellence to NEET Coaching',
    excerpt: 'Profile of Dr. Shekhar C Singh, AIIMS New Delhi alumnus, who founded Cerebrum Biology Academy to bridge the gap between textbook learning and medical education.',
    date: '2025-10-08',
    type: 'Profile',
    logo: '/media/ht.png',
  },
  {
    publication: 'Times of India Education',
    title: 'NEET 2025 Results: Gurugram Coaching Centers Celebrate Success',
    excerpt: 'Multiple students from Cerebrum Biology Academy secure top ranks in NEET 2025, with 3 students scoring above 700 marks.',
    date: '2025-06-18',
    type: 'News',
    logo: '/media/toi.png',
  },
  {
    publication: 'India Today Education',
    title: 'How to Choose the Right NEET Coaching Institute',
    excerpt: 'Expert advice from Dr. Shekhar Singh on factors parents should consider when selecting NEET coaching - batch size, faculty credentials, and past results.',
    date: '2025-08-25',
    type: 'Expert Opinion',
    logo: '/media/indiatoday.png',
  },
  {
    publication: 'The Indian Express Education',
    title: 'Biology Teacher Creates Visual Learning Revolution for NEET',
    excerpt: 'Dr. Shekhar Singh innovative visual mnemonics and clinical correlation approach helping students master complex Biology topics for NEET.',
    date: '2025-07-12',
    type: 'Feature',
    logo: '/media/indian-express.png',
  },
]

const testimonialQuotes = [
  {
    quote: 'Cerebrum Academy transformed my daughter preparation. The personalized attention she received was unmatched.',
    author: 'Parent of AIIMS Delhi Selection',
    source: 'Google Review',
  },
  {
    quote: 'Dr. Singh teaching method made Biology my strongest subject. His clinical examples are unforgettable.',
    author: 'Ishita Malhotra, 702/720',
    source: 'Student Testimonial',
  },
  {
    quote: 'The small batch size meant my doubts were never ignored. This made all the difference in my NEET score.',
    author: 'Rohan Khanna, 688/720',
    source: 'Student Testimonial',
  },
]

const stats = [
  { label: 'Media Features', value: '25+', icon: Newspaper },
  { label: 'Student Success Stories', value: '100+', icon: Users },
  { label: 'Expert Articles', value: '15+', icon: BookOpen },
  { label: 'Awards & Recognition', value: '8', icon: Award },
]

export default function MediaMentionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            <Newspaper className="w-4 h-4" />
            Press & Media
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Media Mentions & Press Coverage</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Cerebrum Biology Academy featured in leading education publications for our innovative teaching methods and exceptional NEET results.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-xl">
                <stat.icon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured In</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {pressItems.map((item, index) => (
              <article key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border">
                    <Newspaper className="w-8 h-8 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-slate-800">{item.publication}</span>
                      <span className="text-xs bg-slate-200 px-2 py-1 rounded">{item.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 mb-3">{item.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Quotes */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {testimonialQuotes.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <Quote className="w-8 h-8 text-slate-300 mb-4" />
                <p className="text-slate-700 italic mb-4">"{item.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-slate-800">{item.author}</p>
                  <p className="text-sm text-slate-500">{item.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
              <Award className="w-12 h-12 text-yellow-600" />
              <div>
                <h3 className="font-bold text-slate-800">Best Biology Teacher 2025</h3>
                <p className="text-sm text-slate-600">Education Excellence Foundation</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <TrendingUp className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="font-bold text-slate-800">Top 10 NEET Coaching 2026</h3>
                <p className="text-sm text-slate-600">Career360 Rankings</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <Users className="w-12 h-12 text-green-600" />
              <div>
                <h3 className="font-bold text-slate-800">Highest Success Rate 2025</h3>
                <p className="text-sm text-slate-600">Gurugram Education Council</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <BookOpen className="w-12 h-12 text-purple-600" />
              <div>
                <h3 className="font-bold text-slate-800">Innovation in Teaching Award</h3>
                <p className="text-sm text-slate-600">EdTech India 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Award-Winning NEET Coaching</h2>
          <p className="text-xl text-slate-300 mb-8">Join the institute trusted by leading publications and thousands of successful students.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              Book Free Demo Class
            </Link>
            <Link href="/neet-coaching-gurugram" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Media Mentions & Press Coverage - Cerebrum Biology Academy',
        description: 'Collection of press coverage, media mentions, and news articles featuring Cerebrum Biology Academy.',
        url: 'https://cerebrumbiologyacademy.com/media-mentions-press-coverage',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: pressItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'NewsArticle',
              headline: item.title,
              description: item.excerpt,
              datePublished: item.date,
              publisher: {
                '@type': 'Organization',
                name: item.publication,
              },
              about: {
                '@type': 'EducationalOrganization',
                name: 'Cerebrum Biology Academy',
              },
            },
          })),
        },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
        award: [
          'Best Biology Teacher 2025 - Education Excellence Foundation',
          'Top 10 NEET Coaching 2026 - Career360',
          'Highest Success Rate 2025 - Gurugram Education Council',
          'Innovation in Teaching Award - EdTech India 2025',
        ],
      }) }} />
    </div>
  )
}
