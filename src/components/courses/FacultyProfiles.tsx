'use client'

import { CourseProgram, FacultyInfo } from '@/types/courseSystem'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  GraduationCap, 
  Star, 
  Award, 
  Clock,
  Users,
  BookOpen,
  Trophy,
  MessageCircle,
  Calendar,
  Target
} from 'lucide-react'
import Image from 'next/image'

interface FacultyProfilesProps {
  course: CourseProgram
}

// Mock student feedback data - in real app, this would come from API
const mockStudentFeedback = [
  {
    id: '1',
    studentName: 'Arjun M.',
    rating: 5,
    comment: 'Exceptional teaching methodology. Made complex topics very easy to understand.',
    batch: 'NEET 2023',
    rank: 'AIR 156'
  },
  {
    id: '2', 
    studentName: 'Priya S.',
    rating: 5,
    comment: 'Amazing support throughout the course. Always available for doubt clearance.',
    batch: 'NEET 2023',
    rank: 'AIR 289'
  },
  {
    id: '3',
    studentName: 'Rahul K.',
    rating: 5,
    comment: 'The practical sessions were incredibly helpful for conceptual clarity.',
    batch: 'NEET 2022', 
    rank: 'AIR 432'
  }
]

export function FacultyProfiles({ course }: FacultyProfilesProps) {
  const FacultyCard = ({ faculty, index }: { faculty: FacultyInfo; index: number }) => {
    // Get feedback for this faculty (mock implementation)
    const facultyFeedback = mockStudentFeedback.slice(0, 2) // Limit to 2 per faculty

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          {/* Faculty Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Faculty Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 mx-auto md:mx-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {faculty.rating}
                </div>
              </div>
            </div>

            {/* Faculty Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
              <div className="space-y-2 mb-4">
                {faculty.qualification.map((qual, idx) => (
                  <Badge key={idx} variant="secondary" className="mr-2">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {qual}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  {faculty.experience}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-green-500" />
                  {faculty.teachingExperience}
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-500" />
              Teaching Specializations
            </h4>
            <div className="flex flex-wrap gap-2">
              {faculty.specialization.map((spec, idx) => (
                <Badge key={idx} variant="outline" className="border-purple-200 text-purple-700">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievement Highlights */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Achievement Highlights
            </h4>
            <ul className="space-y-2">
              {faculty.achievementHighlights.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <Award className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Student Feedback */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-500" />
              Student Feedback
            </h4>
            <div className="space-y-3">
              {facultyFeedback.map((feedback) => (
                <div key={feedback.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm text-gray-900">
                      {feedback.studentName}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feedback.rank}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">"{feedback.comment}"</p>
                  <div className="text-xs text-gray-500">{feedback.batch}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">98%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">500+</div>
              <div className="text-xs text-gray-600">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{faculty.rating}/5</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const AdditionalFacultyCard = () => (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="font-semibold text-gray-700 mb-2">Expert Faculty Team</h3>
        <p className="text-sm text-gray-600 mb-4">
          Our comprehensive faculty team includes specialists in all biology domains
        </p>
        <ul className="text-xs text-gray-600 space-y-1 mb-4">
          <li>• Botany & Zoology Experts</li>
          <li>• Medical College Professors</li>
          <li>• Research Scientists</li>
          <li>• Former NEET Toppers</li>
        </ul>
        <Button size="sm" variant="outline">
          View All Faculty
        </Button>
      </div>
    </Card>
  )

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Your Expert Faculty
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn from experienced educators who have guided thousands of students to NEET success
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {course.faculty.map((faculty, index) => (
            <FacultyCard key={faculty.id} faculty={faculty} index={index} />
          ))}
          
          {/* Additional Faculty Card if only one faculty shown */}
          {course.faculty.length === 1 && <AdditionalFacultyCard />}
        </div>

        {/* Faculty Features */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Our Faculty Makes the Difference</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">Expert Qualifications</h4>
                <p className="text-sm text-white/90">
                  Advanced degrees from premier institutions with proven academic excellence
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">Proven Track Record</h4>
                <p className="text-sm text-white/90">
                  Years of experience producing top NEET ranks and medical college admissions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">Personal Mentorship</h4>
                <p className="text-sm text-white/90">
                  Individual attention and guidance to help each student reach their potential
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to Learn from the Best?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="h-5 w-5 mr-2" />
              Book Faculty Interaction Session
            </Button>
            <Button size="lg" variant="outline">
              <MessageCircle className="h-5 w-5 mr-2" />
              Ask Faculty Questions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}