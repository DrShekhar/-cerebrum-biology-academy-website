import { Metadata } from 'next'
import Link from 'next/link'
import { Play, Star, Phone, Users, Trophy, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Biology Video Lectures | Watch Demo Class | NEET & Board Exam | Cerebrum Academy',
  description:
    'Watch free Biology video lectures by Dr. Shekhar C Singh (AIIMS). Demo class, student success stories, and complete NEET Biology lecture library. Hinglish medium. Book FREE demo!',
  keywords: [
    'free biology lectures',
    'neet biology video lectures',
    'biology demo class',
    'free neet biology classes',
    'biology lectures hinglish',
    'dr shekhar biology',
    'cerebrum biology academy videos',
    'neet biology youtube',
  ],
  openGraph: {
    title: 'Free Biology Video Lectures | Demo Class | Cerebrum Academy',
    description:
      'Watch free NEET Biology lectures by AIIMS faculty. Demo class + student testimonials + full lecture library.',
    url: 'https://cerebrumbiologyacademy.com/video-lectures',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/video-lectures',
  },
}

const demoVideo = {
  id: 'ols9A9KD6es',
  title: 'Watch a FREE Demo Class',
  subtitle:
    "Experience Dr. Shekhar's teaching style — AIIMS faculty, Hinglish medium, interactive & concept-driven",
}

const testimonialVideos = [
  {
    id: 'WqcWDy0K4lU',
    title: 'Enjoying My NEET Journey at Cerebrum',
    badge: 'Success Story',
  },
  { id: 'bk6wQCh6b9w', title: 'How Shekhar Sir Helped Me Score 695/720 in NEET — Sadhana Sirin, MBBS at Lady Hardinge Medical College', badge: 'NEET Topper' },
  {
    id: 'Eim_y7yc5Y8',
    title: 'Why I Left Allen & Joined Cerebrum — Honest Review',
    badge: 'Student Review',
  },
  {
    id: 't5F8RBuHITM',
    title: "Parent's Perspective — Best Decision for My Child",
    badge: 'Parent Testimonial',
  },
]

const playlistId = 'PLgA9uRmnW-IOgeAMmeemhIFQvxy_lUVa6'

export default function VideoLecturesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Biology Video Lectures — Cerebrum Biology Academy',
    description:
      'Free NEET Biology video lectures, demo class, and student testimonials by Dr. Shekhar C Singh (AIIMS Delhi).',
    url: 'https://cerebrumbiologyacademy.com/video-lectures',
    provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' },
    mainEntity: {
      '@type': 'VideoObject',
      name: 'FREE Demo Class — NEET Biology by Dr. Shekhar (AIIMS)',
      description: 'Watch a free demo Biology class by Dr. Shekhar C Singh, AIIMS Delhi alumnus.',
      thumbnailUrl: `https://i.ytimg.com/vi/${demoVideo.id}/maxresdefault.jpg`,
      uploadDate: '2025-01-01',
      contentUrl: `https://www.youtube.com/watch?v=${demoVideo.id}`,
      embedUrl: `https://www.youtube.com/embed/${demoVideo.id}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4 text-green-300" />
              Free Video Lectures • Hinglish Medium
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Biology Video Lectures</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Watch Dr. Shekhar (AIIMS) teach Biology. Free demo class, student success stories, and
              complete NEET lecture library.
            </p>
          </div>
        </section>

        {/* Demo Video */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-3">
                <Play className="w-4 h-4" />
                FEATURED
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{demoVideo.title}</h2>
              <p className="text-gray-600 mt-2">{demoVideo.subtitle}</p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-200">
              <iframe
                src={`https://www.youtube.com/embed/${demoVideo.id}?rel=0&modestbranding=1`}
                title={demoVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-700 font-semibold mb-4">
                Liked the teaching? Join our live classes!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="https://wa.me/918826444334?text=Hi!%20I%20watched%20the%20demo%20video%20and%20want%20to%20join%20Biology%20coaching.%20Please%20share%20batch%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp to Join
                </Link>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-yellow-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-900 transition"
                >
                  <Phone className="w-5 h-5" />
                  Call: +91 88264 44334
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-6 bg-gray-100 border-y">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Trophy, value: '98%', label: 'Success Rate' },
                { icon: Users, value: '15,000+', label: 'Students Taught' },
                { icon: Star, value: '5.0/5', label: 'Google Rating' },
                { icon: Clock, value: '15+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <stat.icon className="w-5 h-5 text-teal-600 mb-1" />
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Videos */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Student Success Stories
              </h2>
              <p className="text-gray-600">
                Hear directly from students who cracked NEET with Cerebrum
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {testimonialVideos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                      <Star className="w-3 h-3 inline mr-1" />
                      {video.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Playlist */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Complete Lecture Library
              </h2>
              <p className="text-gray-600">
                Full NEET Biology lectures by Dr. Shekhar — watch anytime, learn at your pace
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`}
                title="Complete NEET Biology Lecture Library — Cerebrum Biology Academy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`https://www.youtube.com/playlist?list=${playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                <Play className="w-5 h-5" />
                Watch full playlist on YouTube
              </Link>
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Join Live Classes After Watching?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Live Doubt Resolution',
                  desc: 'Ask questions in real-time. YouTube is one-way — live classes are interactive.',
                },
                {
                  title: 'Weekly Mock Tests',
                  desc: 'Test yourself every week with NEET-pattern tests and detailed analysis.',
                },
                {
                  title: 'Personal Attention',
                  desc: 'Only 15-20 students per batch. Dr. Shekhar knows every student by name.',
                },
              ].map((f) => (
                <div key={f.title} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <CheckCircle className="w-6 h-6 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
            <p className="text-lg text-slate-300 mb-8">
              Free videos are great — but live coaching with AIIMS faculty is what gets you into
              medical college
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I%20watched%20your%20videos%20and%20want%20to%20join%20live%20coaching.%20Please%20share%20batch%20details%20and%20fees."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition"
              >
                <Phone className="w-6 h-6" />
                WhatsApp to Join
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition"
              >
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
