'use client'

export default function TestLearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          🎯 Personalized Learning Path - Test
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* NEET Score Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">NEET Score Prediction</h2>
            <div className="space-y-4">
              <div>
                <div className="text-blue-100">Current Biology Score</div>
                <div className="text-4xl font-bold">485/720</div>
              </div>
              <div>
                <div className="text-blue-100">Target Score</div>
                <div className="text-2xl font-bold">540/720</div>
              </div>
              <div className="w-full bg-blue-400 rounded-full h-3">
                <div className="bg-white h-3 rounded-full" style={{ width: '89.8%' }}></div>
              </div>
              <div className="text-blue-100">89.8% of target achieved</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">24h</div>
                  <div className="text-gray-600">Study Time (Week)</div>
                </div>
                <div className="text-green-600">+2.5h</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">87%</div>
                  <div className="text-gray-600">Average Score</div>
                </div>
                <div className="text-green-600">+5%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-gray-600">Study Streak (days)</div>
                </div>
                <div className="text-purple-600">🔥</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weak Areas */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Priority Areas for Improvement</h3>
          <div className="space-y-4">
            {[
              {
                chapter: 'Genetics',
                topic: 'Molecular Basis of Inheritance',
                difficulty: 'high',
                score: 65,
                target: 85,
              },
              {
                chapter: 'Plant Physiology',
                topic: 'Photosynthesis',
                difficulty: 'medium',
                score: 72,
                target: 88,
              },
              {
                chapter: 'Evolution',
                topic: 'Molecular Evolution',
                difficulty: 'medium',
                score: 78,
                target: 90,
              },
            ].map((area, index) => (
              <div key={index} className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{area.chapter}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      area.difficulty === 'high'
                        ? 'bg-red-100 text-red-600'
                        : area.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {area.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">{area.topic}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Current: {area.score}% → Target: {area.target}%
                  </span>
                  <button className="text-blue-600 text-sm hover:underline">
                    Start Practice →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Timer */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Focus Study Session</h2>
          <div className="text-6xl font-mono font-bold mb-6">00:00:00</div>
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Start
            </button>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Pause
            </button>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Reset
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Enhanced Dashboard
          </a>
          <a
            href="/learning-path"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Full Learning Path
          </a>
        </div>
      </div>
    </div>
  )
}
