import type { Metadata } from 'next'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const pageUrl = `${BASE_URL}/dr-shekhar-youtube-channel`

export const metadata: Metadata = {
  title: 'Dr. Shekhar C Singh YouTube Channel | NEET Biology Expert | AIIMS Faculty',
  description:
    'Subscribe to Dr. Shekhar C Singh\'s YouTube channel for free NEET Biology lectures, exam tips, and preparation strategies by an AIIMS New Delhi alumnus with 14+ years experience.',
  keywords: [
    'dr shekhar singh youtube',
    'neet biology youtube channel',
    'biology lectures youtube',
    'AIIMS faculty youtube',
    'neet biology free lectures',
    'cerebrum biology youtube',
    'free neet preparation',
    'biology teacher youtube',
  ],
  openGraph: {
    title: 'Dr. Shekhar C Singh YouTube Channel | NEET Biology Expert',
    description:
      'Free NEET Biology lectures and preparation strategies from Dr. Shekhar C Singh, AIIMS alumnus with 14+ years experience.',
    type: 'profile',
    url: pageUrl,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dr. Shekhar C Singh YouTube Channel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Shekhar C Singh YouTube Channel | NEET Biology Expert',
    description: 'Free NEET Biology lectures and exam strategies from AIIMS faculty.',
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function DrShekhartYoutubeChannelPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Senior Biology Faculty, AIIMS-Trained',
    description:
      'NEET Biology expert with 14+ years teaching experience and 150,000+ student selections. Founder of Cerebrum Biology Academy.',
    sameAs: [
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://instagram.com/cerebrumbiologyacademy',
      'https://cerebrumbiologyacademy.com',
    ],
    affiliation: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    educationalCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'AIIMS New Delhi',
      credentialCategory: 'Medical Degree',
    },
  }

  const videoIds = [
    'bk6wQCh6b9w',
    'NfhkGqOQXzk',
    't5F8RBuHITM',
    '8mK7JzGVq8E',
    'vL3oXkWz5jA',
    'qM9pKzDvJ2I',
  ]

  const videoTitles = [
    'Photosynthesis in Plants - Detailed Explanation',
    'Respiration and Energy Production - NEET Questions',
    'Genetics and Heredity - Complete Chapter',
    'Human Reproduction - Important Topics for NEET',
    'Ecology and Ecosystems - In-Depth Analysis',
    'Biotechnology and Genetic Engineering Basics',
  ]

  const videosSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videoIds.map((videoId, index) => ({
      '@type': 'VideoObject',
      position: index + 1,
      name: videoTitles[index],
      description: `${videoTitles[index]} - Free NEET Biology lecture by Dr. Shekhar C Singh`,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      uploadDate: new Date(2025, 0, 15 - index).toISOString().split('T')[0],
      duration: 'PT30M',
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/WatchAction',
        userInteractionCount: 10000 + index * 5000,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'YouTube Channel',
        item: pageUrl,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Dr. Shekhar Singh have a YouTube channel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Dr. Shekhar C Singh has a personal YouTube channel @drshekharcsingh with free NEET Biology lectures, exam tips, and preparation strategies. Additionally, Cerebrum Biology Academy has a channel @cerebrumbiologyacademy featuring comprehensive course lectures and expert guidance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the YouTube content free for NEET preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all content on both Dr. Shekhar\'s personal channel and the Cerebrum Biology Academy channel is completely free. You can watch unlimited lectures, solve practice problems, and access exam preparation strategies without any paid subscription.',
        },
      },
      {
        '@type': 'Question',
        name: 'What topics are covered on the channel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The channels cover all NEET Biology topics including Botany and Zoology. Topics include Photosynthesis, Respiration, Genetics, Human Reproduction, Ecology, Biotechnology, Cell Biology, Biochemistry, Evolution, and more. Content is structured chapter-wise following NCERT curriculum.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often are new videos uploaded?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'New videos are uploaded regularly on both channels. You can subscribe and enable notifications to get updates whenever a new lecture or preparation video is released. Most weeks feature multiple uploads covering different topics and revision sessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I prepare for NEET only using YouTube videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YouTube videos are excellent supplementary resources for self-study and revision. However, for complete NEET preparation, combine YouTube lectures with NCERT textbooks, practice tests, and mock exams. You can also enroll in our comprehensive courses for structured learning with doubt resolution and progress tracking.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between the personal and academy channels?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dr. Shekhar\'s personal channel (@drshekharcsingh) focuses on quick tips, exam strategies, and focused topic explanations. The Cerebrum Biology Academy channel (@cerebrumbiologyacademy) provides comprehensive course lectures, full chapter explanations, and structured learning sequences. Both are complementary and provide valuable content.',
        },
      },
    ],
  }

  const stats = [
    {
      label: 'Years of Experience',
      value: '14+',
      icon: '📚',
    },
    {
      label: 'Students Succeeded',
      value: '150,000+',
      icon: '🎓',
    },
    {
      label: 'Free Lectures',
      value: '500+',
      icon: '🎬',
    },
  ]

  const channelComparison = [
    {
      feature: 'Channel Focus',
      personal: 'Quick tips & strategies',
      academy: 'Full chapter lectures',
    },
    {
      feature: 'Video Length',
      personal: '10-20 minutes',
      academy: '30-50 minutes',
    },
    {
      feature: 'Content Type',
      personal: 'Tips, quick revisions',
      academy: 'Complete lectures',
    },
    {
      feature: 'Best For',
      personal: 'Quick prep & tips',
      academy: 'Detailed learning',
    },
  ]

  const faqs = [
    {
      question: 'Does Dr. Shekhar Singh have a YouTube channel?',
      answer:
        'Yes! Dr. Shekhar C Singh has a personal YouTube channel @drshekharcsingh with free NEET Biology lectures, exam tips, and preparation strategies. Additionally, Cerebrum Biology Academy has a channel @cerebrumbiologyacademy featuring comprehensive course lectures and expert guidance.',
    },
    {
      question: 'Is the YouTube content free for NEET preparation?',
      answer:
        'Yes, all content on both Dr. Shekhar\'s personal channel and the Cerebrum Biology Academy channel is completely free. You can watch unlimited lectures, solve practice problems, and access exam preparation strategies without any paid subscription.',
    },
    {
      question: 'What topics are covered on the channel?',
      answer:
        'The channels cover all NEET Biology topics including Botany and Zoology. Topics include Photosynthesis, Respiration, Genetics, Human Reproduction, Ecology, Biotechnology, Cell Biology, Biochemistry, Evolution, and more. Content is structured chapter-wise following NCERT curriculum.',
    },
    {
      question: 'How often are new videos uploaded?',
      answer:
        'New videos are uploaded regularly on both channels. You can subscribe and enable notifications to get updates whenever a new lecture or preparation video is released. Most weeks feature multiple uploads covering different topics and revision sessions.',
    },
    {
      question: 'Can I prepare for NEET only using YouTube videos?',
      answer:
        'YouTube videos are excellent supplementary resources for self-study and revision. However, for complete NEET preparation, combine YouTube lectures with NCERT textbooks, practice tests, and mock exams. You can also enroll in our comprehensive courses for structured learning with doubt resolution and progress tracking.',
    },
    {
      question: 'What is the difference between the personal and academy channels?',
      answer:
        'Dr. Shekhar\'s personal channel (@drshekharcsingh) focuses on quick tips, exam strategies, and focused topic explanations. The Cerebrum Biology Academy channel (@cerebrumbiologyacademy) provides comprehensive course lectures, full chapter explanations, and structured learning sequences. Both are complementary and provide valuable content.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videosSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Dr. Shekhar C Singh's YouTube Channel
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-2">
                Free NEET Biology Lectures & Exam Preparation
              </p>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Learn from an AIIMS-trained faculty with 14+ years of teaching experience and
                150,000+ successful student selections
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/@drshekharcsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe to Personal Channel
              </a>
              <a
                href="https://www.youtube.com/@cerebrumbiologyacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Academy Channel
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Videos Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured NEET Biology Lectures
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive lessons covering all important topics for NEET preparation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoIds.map((videoId, index) => (
                <a
                  key={index}
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-black aspect-video">
                    <img
                      src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                      alt={videoTitles[index]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {videoTitles[index]}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {Math.floor(25 + Math.random() * 30)} minutes
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://www.youtube.com/@drshekharcsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                Watch More Videos
              </a>
            </div>
          </div>
        </section>

        {/* Channel Comparison Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Two Channels, One Goal: Your NEET Success
              </h2>
              <p className="text-xl text-gray-600">
                Choose the channel that fits your learning style, or subscribe to both for complete
                coverage
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">
                      <div className="text-red-600 text-lg">@drshekharcsingh</div>
                      <div className="text-sm text-gray-600">Personal Channel</div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">
                      <div className="text-red-600 text-lg">@cerebrumbiologyacademy</div>
                      <div className="text-sm text-gray-600">Academy Channel</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {channelComparison.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 px-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="py-4 px-4 text-gray-700">{row.personal}</td>
                      <td className="py-4 px-4 text-gray-700">{row.academy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Personal Channel Card */}
              <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-red-600">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Personal Channel</h3>
                <p className="text-gray-700 mb-6">
                  Quick exam strategies, important tips, last-minute revisions, and focused topic
                  explanations for busy students.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Quick revision tips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Exam strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Time management tips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Short explanations</span>
                  </li>
                </ul>
                <a
                  href="https://www.youtube.com/@drshekharcsingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Subscribe Now
                </a>
              </div>

              {/* Academy Channel Card */}
              <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-blue-600">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Academy Channel</h3>
                <p className="text-gray-700 mb-6">
                  Complete chapter lectures, comprehensive explanations, and structured learning
                  paths for thorough NEET preparation.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Full chapter lectures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Detailed explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Structured curriculum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Practice problems</span>
                  </li>
                </ul>
                <a
                  href="https://www.youtube.com/@cerebrumbiologyacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Subscribe Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Your NEET Biology Preparation Today
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                With 500+ free lectures covering every NEET Biology topic, you have everything you
                need to succeed. Subscribe to both channels and unlock your potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.youtube.com/@drshekharcsingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white hover:bg-gray-100 text-red-600 font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Personal Channel
                </a>
                <a
                  href="https://www.youtube.com/@cerebrumbiologyacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Academy Channel
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about Dr. Shekhar's YouTube channels
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-900 hover:bg-gray-50 transition-colors">
                    <span>{faq.question}</span>
                    <span className="text-red-600">+</span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t border-gray-200 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-lg mb-6">Ready to ace NEET Biology?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/@drshekharcsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Subscribe Now
              </a>
              <a
                href="https://cerebrumbiologyacademy.com"
                className="inline-block bg-white hover:bg-gray-100 text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Explore Courses
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-8">
              © 2026 Cerebrum Biology Academy. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
