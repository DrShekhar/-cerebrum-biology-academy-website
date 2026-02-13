import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const revalidate = 3600

async function getTestsFromDatabase() {
  try {
    const tests = await prisma.test_templates.findMany({
      where: {
        isActive: true,
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        type: true,
        category: true,
        difficulty: true,
        timeLimit: true,
        totalQuestions: true,
        totalMarks: true,
        subject: true,
        topics: true,
        _count: {
          select: {
            testSessions: true,
          },
        },
      },
    })

    return tests.map((test) => ({
      id: test.id,
      title: test.title,
      description: test.description,
      slug: test.slug,
      type: test.type,
      category: test.category,
      difficulty: test.difficulty.toLowerCase(),
      duration: test.timeLimit,
      totalQuestions: test.totalQuestions,
      totalMarks: test.totalMarks,
      subject: test.subject,
      topics: test.topics ? JSON.parse(test.topics as string) : [],
      attemptsCount: test._count.testSessions,
    }))
  } catch (error) {
    console.error('Error fetching tests:', error)
    return []
  }
}

export default async function MockTestsPage() {
  const publishedTests = await getTestsFromDatabase()
  const totalQuestions = publishedTests.reduce((total, test) => total + test.totalQuestions, 0)
  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      {/* Hero Section */}
      <section className="bg-indigo-500 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            NEET Mock Tests
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8">
            Practice with our comprehensive collection of NEET Biology mock tests. Get instant
            results, detailed analysis, and improve your preparation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">{totalQuestions}</div>
              <div className="text-sm sm:text-base text-blue-100">Questions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">{publishedTests.length}</div>
              <div className="text-sm sm:text-base text-blue-100">Mock Tests</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">Free</div>
              <div className="text-sm sm:text-base text-blue-100">Access</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">Live</div>
              <div className="text-sm sm:text-base text-blue-100">Tests Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Test Series
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Select tests based on your class and preparation level. All tests are designed
              according to latest NEET patterns and difficulty levels.
            </p>
          </div>

          {/* Test Categories */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            id="test-categories"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto flex-shrink-0">
                <span className="text-blue-600 text-xl sm:text-2xl">📚</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                Full Length Tests
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                Complete NEET pattern tests with 180 questions covering all Biology topics
              </p>
              <div className="text-center">
                <a
                  href="#available-tests"
                  className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors min-h-[44px] text-sm sm:text-base"
                >
                  Start Test
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto flex-shrink-0">
                <span className="text-green-600 text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                Topic Tests
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                Focus on specific topics like Cell Biology, Genetics, Plant Physiology
              </p>
              <div className="text-center">
                <a
                  href="#available-tests"
                  className="inline-block bg-green-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors min-h-[44px] text-sm sm:text-base"
                >
                  Browse Topics
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto flex-shrink-0">
                <span className="text-purple-600 text-xl sm:text-2xl">📋</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                Previous Years
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                Practice with actual NEET questions from previous years with solutions
              </p>
              <div className="text-center">
                <a
                  href="#available-tests"
                  className="inline-block bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors min-h-[44px] text-sm sm:text-base"
                >
                  Practice Now
                </a>
              </div>
            </div>
          </div>

          {/* Available Tests */}
          <div className="mt-10 sm:mt-12 md:mt-16 scroll-mt-8" id="available-tests">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Available Tests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {publishedTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        test.difficulty === 'easy'
                          ? 'bg-green-100 text-green-800'
                          : test.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {test.difficulty.toUpperCase()}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {test.totalQuestions} Questions
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{test.title}</h4>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm">{test.description}</p>

                  <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
                    <span>⏱️ {test.duration} min</span>
                    <span>📚 {test.subject}</span>
                  </div>

                  <Link href={`/test/${test.id}`} className="block">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors min-h-[44px] text-sm sm:text-base">
                      Start Test
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-10 sm:mt-12 md:mt-16 text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-3 sm:mb-4">
                🎉 Interactive Tests Now Live!
              </h3>
              <p className="text-sm sm:text-base text-green-800 mb-0">
                Click &quot;Start Test&quot; above to experience our interactive test engine with
                real-time scoring and detailed analytics. More tests are being added regularly!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
