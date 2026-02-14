import type { Metadata } from 'next'
import Link from 'next/link'
import { VideoObjectSchema } from '@/components/seo/VideoObjectSchema'

export const metadata: Metadata = {
  title: 'Sadhna Sirin - Delhi NCR NEET 2023 Topper | Cerebrum Biology Academy',
  description:
    'Watch Sadhna Sirin share her NEET 2023 journey, scoring 695/720 with Cerebrum Biology Academy. Delhi-NCR\'s top NEET scorer reveals her preparation strategy.',
  openGraph: {
    title: 'Sadhna Sirin - Delhi NCR NEET 2023 Topper | Cerebrum Biology Academy',
    description:
      'Sadhna Sirin scored 695/720 in NEET 2023 with guidance from Dr. Shekhar C Singh at Cerebrum Biology Academy.',
    type: 'video.other',
    videos: [
      {
        url: 'https://www.youtube.com/embed/bk6wQCh6b9w',
        width: 900,
        height: 506,
        type: 'text/html',
      },
    ],
    images: ['https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/testimonials/sadhna-sirin-neet-2023-topper',
  },
}

export default function SadhnaSirinPage() {
  return (
    <>
      <VideoObjectSchema
        name="Sadhna Sirin - Delhi NCR Topper NEET 2023 | Cerebrum Biology Academy"
        description="Sadhna Sirin shares her NEET 2023 success story, scoring 695 out of 720 marks with guidance from Dr. Shekhar C Singh at Cerebrum Biology Academy."
        thumbnailUrl="https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg"
        uploadDate="2023-07-15"
        duration="PT5M30S"
        contentUrl="https://www.youtube.com/watch?v=bk6wQCh6b9w"
        embedUrl="https://www.youtube.com/embed/bk6wQCh6b9w"
        interactionStatistic={{ watchCount: 5000 }}
      />

      <section className="max-w-[900px] mx-auto px-5 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Sadhna Sirin — Delhi NCR NEET 2023 Topper
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Score: 695/720 | 100 Percentile | Cerebrum Biology Academy
        </p>

        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl mb-10">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/bk6wQCh6b9w"
            title="Sadhna Sirin - Delhi NCR Topper NEET 2023"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="eager"
            className="w-full h-full"
          />
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mb-3">About This Video</h2>
        <p className="text-slate-700 leading-relaxed mb-8">
          In this video, Sadhna Sirin shares her complete NEET 2023 preparation journey with
          Cerebrum Biology Academy. She discusses her study strategy, how Dr. Shekhar C Singh&apos;s
          biology coaching helped her master difficult topics, and tips for future NEET aspirants.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mb-3">Key Highlights</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-2 mb-8">
          <li>Scored 695 out of 720 in NEET 2023</li>
          <li>Delhi-NCR region topper with 100 percentile</li>
          <li>Studied at Cerebrum Biology Academy under Dr. Shekhar C Singh</li>
          <li>Focused biology preparation with small batch coaching</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mb-3">
          About Cerebrum Biology Academy
        </h2>
        <p className="text-slate-700 leading-relaxed mb-8">
          Cerebrum Biology Academy is a specialized NEET biology coaching institute led by Dr.
          Shekhar C Singh. With centres in South Extension, Saket, and other locations across
          Delhi-NCR, we focus exclusively on biology with small batch sizes of 15-20 students for
          personalized attention.
        </p>

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
