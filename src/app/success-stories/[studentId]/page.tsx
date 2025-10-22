import { notFound } from 'next/navigation'
import { StudentJourney } from '@/components/testimonials/StudentJourney'
import { ScoreComparison } from '@/components/testimonials/ScoreComparison'
import { getStoryById } from '@/data/successStories'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Share2, Download, Heart } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { studentId: string }
}

export async function generateMetadata({ params }: Props) {
  const story = getStoryById(params.studentId)

  if (!story) {
    return {
      title: 'Student Not Found',
    }
  }

  return {
    title: `${story.studentName}'s NEET Success Journey | Cerebrum Biology Academy`,
    description: `${story.quote.substring(0, 150)}... Read the complete success story of ${story.studentName} who scored ${story.neetScore} in NEET and got admission to ${story.college}.`,
    keywords: `${story.studentName}, NEET success story, ${story.college}, biology coaching, NEET rank ${story.rank}, score improvement`,
    openGraph: {
      title: `${story.studentName}'s NEET Success Story`,
      description: story.quote,
      images: [story.thumbnailUrl || `/og-images/${story.id}.jpg`],
    },
  }
}

export default function StudentStoryPage({ params }: Props) {
  const story = getStoryById(params.studentId)

  if (!story || !story.detailedJourney) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/success-stories">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Stories
              </Button>
            </Link>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like Story
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Score Comparison Section */}
          {story.beforeScore && story.afterScore && (
            <div className="mb-12">
              <ScoreComparison
                studentName={story.studentName}
                beforeScore={story.beforeScore}
                afterScore={story.afterScore}
                timeframe="12 months"
                rank={{ after: story.rank }}
                percentile={Math.round((1 - story.rank / 1600000) * 100)}
                studyHours={8}
                mockTests={150}
              />
            </div>
          )}

          {/* Detailed Journey */}
          <StudentJourney student={story.detailedJourney} />

          {/* Related Stories */}
          <div className="mt-16 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">More Success Stories</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* This would be populated with related stories */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-gray-900 mb-2">Priya Agarwal</h4>
                <p className="text-gray-600 text-sm mb-3">Lady Hardinge Medical College</p>
                <p className="text-green-600 font-semibold">+198 marks improvement</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-gray-900 mb-2">Rahul Kumar</h4>
                <p className="text-gray-600 text-sm mb-3">MAMC Delhi</p>
                <p className="text-green-600 font-semibold">Dropper Success</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-gray-900 mb-2">Sneha Malhotra</h4>
                <p className="text-gray-600 text-sm mb-3">MAMC Delhi</p>
                <p className="text-green-600 font-semibold">AIR 189</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Inspired by {story.studentName}&apos;s Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your own NEET success story with our expert guidance and proven methodology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Explore Our Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
