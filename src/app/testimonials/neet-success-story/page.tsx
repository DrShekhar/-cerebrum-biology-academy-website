import type { Metadata } from 'next'
import Link from 'next/link'
import { VideoObjectSchema } from '@/components/seo/VideoObjectSchema'

export const metadata: Metadata = {
  title: 'Student Success Story | NEET Biology Coaching at Cerebrum Biology Academy',
  description:
    'Watch how students at Cerebrum Biology Academy achieve outstanding NEET results through focused biology coaching by Dr. Shekhar C Singh with small batch sizes of 15-20 students.',
  openGraph: {
    title: 'Student Success Story | NEET Biology Coaching at Cerebrum Biology Academy',
    description:
      'Watch how students achieve outstanding NEET results through focused biology coaching by Dr. Shekhar C Singh.',
    type: 'video.other',
    videos: [
      {
        url: 'https://www.youtube.com/embed/t5F8RBuHITM',
        width: 900,
        height: 506,
        type: 'text/html',
      },
    ],
    images: ['https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/testimonials/neet-success-story',
  },
}

export default function NEETSuccessStoryPage() {
  return (
    <>
      <VideoObjectSchema
        name="Student Success Story | NEET Biology Coaching at Cerebrum Biology Academy"
        description="Watch how students at Cerebrum Biology Academy achieve outstanding NEET results through focused biology coaching by Dr. Shekhar C Singh. Proven methodology with small batch sizes of 15-20 students."
        thumbnailUrl="https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg"
        uploadDate="2024-01-15"
        duration="PT4M45S"
        contentUrl="https://www.youtube.com/watch?v=t5F8RBuHITM"
        embedUrl="https://www.youtube.com/embed/t5F8RBuHITM"
        interactionStatistic={{ watchCount: 3000 }}
      />

      <section className="max-w-[900px] mx-auto px-5 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Student Success Story — NEET Biology Coaching
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Cerebrum Biology Academy | Dr. Shekhar C Singh
        </p>

        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl mb-10">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/t5F8RBuHITM"
            title="Student Success Story | NEET Biology Coaching at Cerebrum Biology Academy"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="eager"
            className="w-full h-full"
          />
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mb-3">About This Video</h2>
        <p className="text-slate-700 leading-relaxed mb-8">
          Watch how students at Cerebrum Biology Academy achieve outstanding NEET results through
          focused biology coaching by Dr. Shekhar C Singh. Our proven methodology with small batch
          sizes of 15-20 students ensures personalized attention for every aspirant.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mb-3">Why Cerebrum Biology Academy</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-2 mb-8">
          <li>Small batch sizes of 15-20 students for personalized coaching</li>
          <li>Led by Dr. Shekhar C Singh, AIIMS Delhi alumnus</li>
          <li>98% success rate with 67+ AIIMS selections</li>
          <li>Centres across Delhi-NCR: South Extension, Saket, Rohini &amp; more</li>
        </ul>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/testimonials" className="text-blue-600 hover:underline">
            More Success Stories
          </Link>
        </div>
      </section>
    </>
  )
}
