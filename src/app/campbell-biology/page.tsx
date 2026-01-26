import Link from 'next/link'
import {
  Book,
  GraduationCap,
  Trophy,
  Clock,
  MessageCircle,
  ChevronRight,
  Star,
  Users,
  Award,
} from 'lucide-react'
import { campbellUnits, CAMPBELL_STATS } from '@/data/campbell-biology'
import { getChaptersByUnitId } from '@/data/campbell-biology'
import { CampbellWhatsAppCTA } from '@/components/campbell/CampbellWhatsAppCTA'
import { CampbellFloatingWhatsApp } from '@/components/campbell/CampbellFloatingWhatsApp'

export default function CampbellBiologyHubPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Book className="w-4 h-4" />
            Complete Campbell Biology Coverage
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Campbell Biology
            <br />
            <span className="text-green-400">Online Coaching</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Master all 56 chapters of Campbell Biology with expert tutoring. Prepare for Biology
            Olympiads, NEET, MCAT, AP & IB Biology.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-400">
                {CAMPBELL_STATS.totalChapters}
              </div>
              <div className="text-slate-300 text-sm">Chapters</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">{CAMPBELL_STATS.totalUnits}</div>
              <div className="text-slate-300 text-sm">Units</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">
                {CAMPBELL_STATS.totalEstimatedHours}+
              </div>
              <div className="text-slate-300 text-sm">Hours Content</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">10</div>
              <div className="text-slate-300 text-sm">Olympiad Countries</div>
            </div>
          </div>

          <CampbellWhatsAppCTA
            variant="hero"
            messageType="general"
            campaign="campbell-hub-hero"
            size="xl"
          >
            Chat on WhatsApp
          </CampbellWhatsAppCTA>

          <p className="mt-4 text-sm text-slate-400">Free demo class • No commitment required</p>
        </div>
      </section>

      {/* Target Exams Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            Prepare for All Major Exams
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Campbell Biology is the gold standard textbook for competitive exams worldwide
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
              <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Biology Olympiad</h3>
              <p className="text-sm text-slate-600">USABO, BBO, IBO, INBO</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
              <GraduationCap className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">NEET</h3>
              <p className="text-sm text-slate-600">India Medical Entrance</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
              <Award className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">MCAT</h3>
              <p className="text-sm text-slate-600">US Medical Schools</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
              <Star className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">AP Biology</h3>
              <p className="text-sm text-slate-600">College Board</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
              <Book className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">IB Biology</h3>
              <p className="text-sm text-slate-600">HL & SL</p>
            </div>
          </div>
        </div>
      </section>

      {/* Units & Chapters Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            All 8 Units Covered
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive coaching across all Campbell Biology units with chapter-by-chapter mastery
          </p>

          <div className="space-y-8">
            {campbellUnits.map((unit) => {
              const unitChapters = getChaptersByUnitId(unit.id)
              return (
                <div
                  key={unit.id}
                  className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg"
                >
                  {/* Unit Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="text-green-400 text-sm font-medium mb-1">
                          Unit {unit.unitNumber}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{unit.title}</h3>
                        <p className="text-slate-300 text-sm mt-1">{unit.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-6 text-slate-300 text-sm">
                        <div className="flex items-center gap-2">
                          <Book className="w-4 h-4" />
                          <span>{unit.chapterCount} Chapters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{unit.estimatedHours} Hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span>Olympiad {unit.olympiadRelevance}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {unitChapters.map((chapter) => (
                        <Link
                          key={chapter.id}
                          href={`/campbell-biology/${chapter.slug}/`}
                          className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-green-500 hover:shadow-md transition-all"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-sm">
                            {chapter.chapterNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors text-sm line-clamp-2">
                              {chapter.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {chapter.estimatedHours}h
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded-full ${
                                  chapter.difficulty === 'foundational'
                                    ? 'bg-green-100 text-green-700'
                                    : chapter.difficulty === 'intermediate'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {chapter.difficulty}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-green-500 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Campbell Biology */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why Study Campbell Biology with Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Olympiad Focus</h3>
              <p className="text-slate-600 text-sm">
                Content mapped to USABO, BBO, IBO requirements. High-yield topics prioritized.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Expert Faculty</h3>
              <p className="text-slate-600 text-sm">
                Taught by Dr. Shekhar Singh with 15+ years of experience in competitive biology
                coaching.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Small Batches</h3>
              <p className="text-slate-600 text-sm">
                Maximum 6 students per batch for personalized attention and doubt clearing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">WhatsApp Support</h3>
              <p className="text-slate-600 text-sm">
                Get your doubts resolved anytime. Average response time under 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            Prepare for Your Exam
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our specialized programs aligned with Campbell Biology
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/biology-olympiad-preparation/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-yellow-400 transition-all"
            >
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Olympiad Hub</h3>
              <p className="text-xs text-slate-600 mt-1">All countries</p>
            </Link>

            <Link
              href="/usabo-coaching/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-blue-400 transition-all"
            >
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">USABO</h3>
              <p className="text-xs text-slate-600 mt-1">USA Olympiad</p>
            </Link>

            <Link
              href="/inbo-coaching/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-orange-400 transition-all"
            >
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">INBO</h3>
              <p className="text-xs text-slate-600 mt-1">India Olympiad</p>
            </Link>

            <Link
              href="/mcat-biology-preparation/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-teal-400 transition-all"
            >
              <GraduationCap className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">MCAT Biology</h3>
              <p className="text-xs text-slate-600 mt-1">Pre-med prep</p>
            </Link>

            <Link
              href="/ap-biology-online-tutor/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-purple-400 transition-all"
            >
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">AP Biology</h3>
              <p className="text-xs text-slate-600 mt-1">College Board</p>
            </Link>

            <Link
              href="/ib-biology-online-classes/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-green-400 transition-all"
            >
              <Book className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">IB Biology</h3>
              <p className="text-xs text-slate-600 mt-1">HL & SL</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Master Campbell Biology?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join students from 10+ countries who are preparing for Biology Olympiads and competitive
            exams with us.
          </p>

          <CampbellWhatsAppCTA
            variant="hero"
            messageType="demo"
            campaign="campbell-hub-cta"
            size="xl"
          >
            Book Free Demo
          </CampbellWhatsAppCTA>

          <p className="mt-4 text-sm text-slate-400">
            No commitment • See if our teaching style suits you
          </p>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <CampbellFloatingWhatsApp
        messageType="general"
        campaign="campbell-hub-floating"
        tooltipTitle="Need help with Campbell Biology?"
        tooltipDescription="Chat with us on WhatsApp for course details and demo scheduling."
      />
    </main>
  )
}
