'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Brain,
  Clock,
  MapPin,
  GraduationCap,
  Microscope,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Star,
  Zap,
  Award,
  BookOpen,
  Users,
  Calendar,
} from 'lucide-react'
import {
  StudentProfile,
  CourseRecommendation,
  PersonalizationEngine,
  analyzeStudentProfile,
  generateQuickProfile,
} from '@/lib/personalization/PersonalizationEngine'

interface PersonalizationInterfaceProps {
  onRecommendationGenerated?: (recommendations: CourseRecommendation[]) => void
  className?: string
}

// Student Profile Form Components
function AcademicPerformanceSection({
  profile,
  updateProfile,
}: {
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Academic Performance</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Percentage (Current/Previous Class)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={profile.academicPerformance.overallPercentage || ''}
            onChange={(e) =>
              updateProfile({
                academicPerformance: {
                  ...profile.academicPerformance,
                  overallPercentage: parseFloat(e.target.value) || undefined,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="85"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biology Score (0-100)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={profile.academicPerformance.biologyScore || ''}
            onChange={(e) =>
              updateProfile({
                academicPerformance: {
                  ...profile.academicPerformance,
                  biologyScore: parseFloat(e.target.value) || undefined,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="78"
          />
        </div>

        {profile.currentClass === 'Dropper' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous NEET Score
            </label>
            <input
              type="number"
              min="0"
              max="720"
              value={profile.academicPerformance.previousNEETScore || ''}
              onChange={(e) =>
                updateProfile({
                  academicPerformance: {
                    ...profile.academicPerformance,
                    previousNEETScore: parseFloat(e.target.value) || undefined,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="450"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Performance Trend</label>
          <select
            value={profile.academicPerformance.improvementTrend}
            onChange={(e) =>
              updateProfile({
                academicPerformance: {
                  ...profile.academicPerformance,
                  improvementTrend: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="improving">Improving</option>
            <option value="stable">Stable</option>
            <option value="declining">Declining</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.academicPerformance.consistentPerformer}
              onChange={(e) =>
                updateProfile({
                  academicPerformance: {
                    ...profile.academicPerformance,
                    consistentPerformer: e.target.checked,
                  },
                })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Consistent performer (stable scores across subjects)
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

function LearningStyleSection({
  profile,
  updateProfile,
}: {
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Brain className="w-5 h-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Learning Style Assessment</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Learning Style
          </label>
          <select
            value={profile.learningStyle.primary}
            onChange={(e) =>
              updateProfile({
                learningStyle: {
                  ...profile.learningStyle,
                  primary: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="visual">Visual (diagrams, charts, images)</option>
            <option value="auditory">Auditory (lectures, discussions)</option>
            <option value="kinesthetic">Kinesthetic (hands-on, practical)</option>
            <option value="reading">Reading/Writing (text-based)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Learning Pace
          </label>
          <select
            value={profile.learningStyle.preferredPace}
            onChange={(e) =>
              updateProfile({
                learningStyle: {
                  ...profile.learningStyle,
                  preferredPace: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="fast">Fast (quick concepts, rapid progression)</option>
            <option value="moderate">Moderate (balanced speed)</option>
            <option value="slow">Slow (detailed explanation, gradual build-up)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attention Span</label>
          <select
            value={profile.learningStyle.attentionSpan}
            onChange={(e) =>
              updateProfile({
                learningStyle: {
                  ...profile.learningStyle,
                  attentionSpan: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="short">Short (&lt;30 minutes)</option>
            <option value="medium">Medium (30-60 minutes)</option>
            <option value="long">Long (&gt;60 minutes)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interaction Preference
          </label>
          <select
            value={profile.learningStyle.interactionPreference}
            onChange={(e) =>
              updateProfile({
                learningStyle: {
                  ...profile.learningStyle,
                  interactionPreference: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="independent">Independent study</option>
            <option value="collaborative">Group discussions</option>
            <option value="guided">Teacher-guided learning</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function TimeAvailabilitySection({
  profile,
  updateProfile,
}: {
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Time Availability</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weekly Study Hours Available
          </label>
          <input
            type="number"
            min="1"
            max="70"
            value={profile.timeAvailability.weeklyStudyHours}
            onChange={(e) =>
              updateProfile({
                timeAvailability: {
                  ...profile.timeAvailability,
                  weeklyStudyHours: parseInt(e.target.value) || 0,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Daily Session Length (hours)
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={profile.timeAvailability.dailySessionPreference}
            onChange={(e) =>
              updateProfile({
                timeAvailability: {
                  ...profile.timeAvailability,
                  dailySessionPreference: parseInt(e.target.value) || 0,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peak Performance Time
          </label>
          <select
            value={profile.timeAvailability.peakPerformanceTime}
            onChange={(e) =>
              updateProfile({
                timeAvailability: {
                  ...profile.timeAvailability,
                  peakPerformanceTime: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="morning">Morning (6 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
            <option value="evening">Evening (6 PM - 10 PM)</option>
            <option value="night">Night (10 PM - 2 AM)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Months Until Target Exam
          </label>
          <input
            type="number"
            min="1"
            max="36"
            value={profile.timeAvailability.examTimeline}
            onChange={(e) =>
              updateProfile({
                timeAvailability: {
                  ...profile.timeAvailability,
                  examTimeline: parseInt(e.target.value) || 12,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="12"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.timeAvailability.weekendAvailability}
              onChange={(e) =>
                updateProfile({
                  timeAvailability: {
                    ...profile.timeAvailability,
                    weekendAvailability: e.target.checked,
                  },
                })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Available on weekends</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.timeAvailability.flexibleSchedule}
              onChange={(e) =>
                updateProfile({
                  timeAvailability: {
                    ...profile.timeAvailability,
                    flexibleSchedule: e.target.checked,
                  },
                })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Flexible schedule</span>
          </label>
        </div>
      </div>
    </div>
  )
}

function BiologyWeakAreasSection({
  profile,
  updateProfile,
}: {
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
}) {
  const updateWeakArea = (category: string, subcategory: string, level: string) => {
    updateProfile({
      biologyWeakAreas: {
        ...profile.biologyWeakAreas,
        [category]: {
          ...profile.biologyWeakAreas[category as keyof typeof profile.biologyWeakAreas],
          [subcategory]: level,
        },
      },
    })
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'weak':
        return 'bg-red-100 text-red-800'
      case 'average':
        return 'bg-yellow-100 text-yellow-800'
      case 'strong':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Microscope className="w-5 h-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Biology Weak Areas Assessment</h3>
      </div>

      <div className="space-y-6">
        {/* Botany */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">🌿 Botany</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(profile.biologyWeakAreas.botany).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="flex space-x-2">
                  {['weak', 'average', 'strong'].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateWeakArea('botany', key, level)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        value === level
                          ? getLevelColor(level)
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zoology */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">🦎 Zoology</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(profile.biologyWeakAreas.zoology).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="flex space-x-2">
                  {['weak', 'average', 'strong'].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateWeakArea('zoology', key, level)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        value === level
                          ? getLevelColor(level)
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cell Biology */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">🧬 Cell Biology & Genetics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(profile.biologyWeakAreas.cellBiology).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="flex space-x-2">
                  {['weak', 'average', 'strong'].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateWeakArea('cellBiology', key, level)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        value === level
                          ? getLevelColor(level)
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Recommendation Display Component
function RecommendationDisplay({ recommendation }: { recommendation: CourseRecommendation }) {
  const getSeriesTheme = (seriesId: string) => {
    const themes = {
      pinnacle: {
        color: 'purple',
        bg: 'bg-purple-50',
        text: 'text-purple-900',
        border: 'border-purple-200',
      },
      ascent: { color: 'blue', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
      pursuit: {
        color: 'green',
        bg: 'bg-green-50',
        text: 'text-green-900',
        border: 'border-green-200',
      },
    }
    return themes[seriesId as keyof typeof themes] || themes.ascent
  }

  const theme = getSeriesTheme(recommendation.seriesId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${theme.bg} ${theme.border} border-2 rounded-xl p-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-xl font-bold ${theme.text} capitalize`}>
            {recommendation.seriesId} Series - Plan {recommendation.planId}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{recommendation.recommendations.primary}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{recommendation.matchPercentage}%</div>
          <div
            className={`text-sm font-medium ${
              recommendation.confidenceLevel === 'high'
                ? 'text-green-600'
                : recommendation.confidenceLevel === 'medium'
                  ? 'text-blue-600'
                  : 'text-orange-600'
            }`}
          >
            {recommendation.confidenceLevel.toUpperCase()} MATCH
          </div>
        </div>
      </div>

      {/* Match Factors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {Object.entries(recommendation.matchFactors).map(([factor, score]) => (
          <div key={factor} className="text-center">
            <div className="text-lg font-bold text-gray-900">{score}%</div>
            <div className="text-xs text-gray-600 capitalize">
              {factor.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      {/* Strengths */}
      {recommendation.recommendations.strengths.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            Why This Works for You
          </h4>
          <ul className="space-y-1">
            {recommendation.recommendations.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Considerations */}
      {recommendation.recommendations.considerations.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
            Things to Consider
          </h4>
          <ul className="space-y-1">
            {recommendation.recommendations.considerations.map((consideration, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-orange-600 mr-2">!</span>
                {consideration}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Predicted Outcomes */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Target className="w-4 h-4 text-blue-600 mr-2" />
          Predicted Outcomes
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {recommendation.predictedOutcomes.successProbability}%
            </div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              +{recommendation.predictedOutcomes.expectedImprovement}
            </div>
            <div className="text-xs text-gray-600">Score Improvement</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {recommendation.predictedOutcomes.timeToTarget}mo
            </div>
            <div className="text-xs text-gray-600">Time to Target</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          className={`w-full bg-gradient-to-r ${
            theme.color === 'purple'
              ? 'from-purple-600 to-indigo-600'
              : theme.color === 'blue'
                ? 'from-blue-600 to-blue-600'
                : 'bg-green-600'
          } text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
        >
          Select This Course
        </button>
      </div>
    </motion.div>
  )
}

// Main Personalization Interface
export default function PersonalizationInterface({
  onRecommendationGenerated,
  className = '',
}: PersonalizationInterfaceProps) {
  const [profile, setProfile] = useState<StudentProfile>({
    currentClass: '11th',
    targetExam: 'NEET',
    academicPerformance: {
      consistentPerformer: true,
      improvementTrend: 'stable',
    },
    learningStyle: {
      primary: 'visual',
      preferredPace: 'moderate',
      attentionSpan: 'medium',
      interactionPreference: 'collaborative',
    },
    timeAvailability: {
      weeklyStudyHours: 12,
      dailySessionPreference: 2,
      weekendAvailability: true,
      flexibleSchedule: true,
      peakPerformanceTime: 'evening',
      examTimeline: 12,
    },
    location: {
      city: '',
      state: '',
      isMetroCity: false,
      internetQuality: 'good',
      deliveryPreference: 'hybrid',
    },
    coachingHistory: {
      hasPreviousExperience: false,
      preferredTeachingStyle: 'mixed',
      batchSizePreference: 'medium',
    },
    biologyWeakAreas: {
      botany: {
        morphology: 'average',
        anatomy: 'average',
        physiology: 'average',
        reproduction: 'average',
        ecology: 'average',
      },
      zoology: {
        humanPhysiology: 'average',
        animalKingdom: 'average',
        evolution: 'average',
        animalBehavior: 'average',
      },
      cellBiology: {
        cellStructure: 'average',
        biomolecules: 'average',
        genetics: 'average',
        molecularBiology: 'average',
      },
      generalTopics: {
        biotechnology: 'average',
        environmentalBiology: 'average',
        practicalBiology: 'average',
      },
    },
    preferences: {
      budget: {
        range: 'standard',
      },
      supportNeeds: {
        parentalInvolvement: true,
        doubtClearingImportance: 'medium',
        mentorshipNeeds: 'medium',
        careerGuidance: true,
      },
      motivationFactors: ['Career goals'],
    },
  })

  const [activeSection, setActiveSection] = useState<'profile' | 'recommendations'>('profile')
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([])
  const [profileAnalysis, setProfileAnalysis] = useState<any>(null)

  const sections = [
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
  ]

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const generateRecommendations = () => {
    const engine = new PersonalizationEngine(profile)
    const newRecommendations = engine.generateRecommendations()
    const analysis = analyzeStudentProfile(profile)

    setRecommendations(newRecommendations)
    setProfileAnalysis(analysis)
    setActiveSection('recommendations')
    onRecommendationGenerated?.(newRecommendations)
  }

  useEffect(() => {
    const analysis = analyzeStudentProfile(profile)
    setProfileAnalysis(analysis)
  }, [profile])

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">AI-Powered Course Personalization</h2>
            <p className="text-blue-100">
              Get personalized course recommendations based on your unique profile
            </p>
          </div>
          {profileAnalysis && (
            <div className="text-right">
              <div className="text-3xl font-bold">{profileAnalysis.profileCompleteness}%</div>
              <div className="text-sm text-blue-200">Profile Complete</div>
            </div>
          )}
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mt-6">
          <div className="flex bg-white/20 rounded-lg p-1">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeSection === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Class
                    </label>
                    <select
                      value={profile.currentClass}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, currentClass: e.target.value as any }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="9th">Class 9th</option>
                      <option value="10th">Class 10th</option>
                      <option value="11th">Class 11th</option>
                      <option value="12th">Class 12th</option>
                      <option value="Dropper">Dropper/Repeater</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Exam
                    </label>
                    <select
                      value={profile.targetExam}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, targetExam: e.target.value as any }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="NEET">NEET</option>
                      <option value="AIIMS">AIIMS</option>
                      <option value="JIPMER">JIPMER</option>
                      <option value="StateNEET">State NEET</option>
                      <option value="Multiple">Multiple Exams</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={profile.preferences.budget.range}
                      onChange={(e) =>
                        updateProfile({
                          preferences: {
                            ...profile.preferences,
                            budget: { ...profile.preferences.budget, range: e.target.value as any },
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="budget">Budget (₹40K-60K)</option>
                      <option value="standard">Standard (₹60K-1L)</option>
                      <option value="premium">Premium (₹1L+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Preference
                    </label>
                    <select
                      value={profile.location.deliveryPreference}
                      onChange={(e) =>
                        updateProfile({
                          location: {
                            ...profile.location,
                            deliveryPreference: e.target.value as any,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="online">Online Only</option>
                      <option value="offline">Offline Only</option>
                      <option value="hybrid">Hybrid (Online + Offline)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              <AcademicPerformanceSection profile={profile} updateProfile={updateProfile} />
              <LearningStyleSection profile={profile} updateProfile={updateProfile} />
              <TimeAvailabilitySection profile={profile} updateProfile={updateProfile} />
              <BiologyWeakAreasSection profile={profile} updateProfile={updateProfile} />

              {/* Generate Recommendations Button */}
              <div className="text-center">
                <button
                  onClick={generateRecommendations}
                  disabled={
                    !profileAnalysis || profileAnalysis.recommendationReadiness === 'insufficient'
                  }
                  className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {profileAnalysis?.recommendationReadiness === 'insufficient'
                    ? 'Complete Profile to Get Recommendations'
                    : '🎯 Generate Personalized Recommendations'}
                </button>
                {profileAnalysis && profileAnalysis.profileCompleteness < 80 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {profileAnalysis.profileCompleteness}% complete - Add more details for better
                    recommendations
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {activeSection === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {recommendations.length > 0 ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Your Personalized Course Recommendations
                    </h3>
                    <p className="text-gray-600">
                      Based on your profile analysis, here are the best matches for you
                    </p>
                  </div>

                  {recommendations.map((recommendation, index) => (
                    <RecommendationDisplay
                      key={recommendation.courseId}
                      recommendation={recommendation}
                    />
                  ))}

                  <div className="text-center">
                    <button
                      onClick={() => setActiveSection('profile')}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                      ← Update Profile for Better Recommendations
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Recommendations Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Complete your profile to get personalized course recommendations
                  </p>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Complete Your Profile
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
