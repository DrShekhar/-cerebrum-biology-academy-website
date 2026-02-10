import { Metadata } from 'next'
import { BookOpen, Target, FileText } from 'lucide-react'
import Link from 'next/link'
import PageContent from './PageContent'

export const metadata: Metadata = {
  title:
    'Free NEET Biology Resources & Study Materials | Cerebrum Biology Academy',
  description:
    'Download free NEET biology resources including quick revision guides, study planners, and mock tests. 100% free, no login required.',
  keywords:
    'NEET biology resources free, NEET study materials, NEET biology notes, free biology PDF',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/free-resources',
  },
  openGraph: {
    title: 'Free NEET Biology Resources & Study Materials',
    description: 'Download 10 premium PDFs for NEET biology preparation',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/free-resources',
  },
}

export default function FreeResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Free Study Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Resources Hub</h1>
              <p className="text-lg text-green-100 mb-8">
                Access free NEET biology study materials, sample papers, timetables, and expert
                guidance. No login required!
              </p>

              {/* Quick Access Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/neet-biology-mcq"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-semibold hover:bg-green-50 hover:scale-[1.02] transition-all shadow-lg"
                >
                  <Target className="w-5 h-5" />
                  Free MCQ Tool
                </Link>
                <Link
                  href="/neet-biology-mcq?isNcertBased=true"
                  className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-600/30 hover:scale-[1.02] transition-all border border-white/20"
                >
                  <BookOpen className="w-5 h-5" />
                  NCERT Based MCQs
                </Link>
                <Link
                  href="/neet-biology-mcq?isPYQOnly=true"
                  className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-600/30 hover:scale-[1.02] transition-all border border-white/20"
                >
                  <FileText className="w-5 h-5" />
                  NEET PYQs
                </Link>
              </div>
            </div>
          </div>
        </div>

        <PageContent />
      </main>
    </div>
  )
}
