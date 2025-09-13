'use client'

import { useState } from 'react'
import { CourseProgram } from '@/types/courseSystem'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  Star,
  Trophy,
  TrendingUp,
  Quote,
  Play,
  ChevronLeft,
  ChevronRight,
  Medal,
  Target,
  BookOpen,
  Award
} from 'lucide-react'

interface SuccessStoriesProps {
  course: CourseProgram
}

// Mock success stories data - in real app this would come from API
const mockSuccessStories = [
  {
    id: '1',
    name: 'Arjun Mehta',
    photo: '/images/students/student-placeholder.jpg',
    rank: 'AIR 45',
    year: '2023',
    college: 'AIIMS Delhi',
    course: 'Class 11th NEET Comprehensive',
    tier: 'Pinnacle Series',
    beforeScore: 420,
    afterScore: 680,
    improvement: 260,
    quote: 'The personalized attention and expert faculty at Cerebrum helped me achieve what I thought was impossible. The curriculum was perfectly structured and the regular tests kept me on track.',
    story: 'I joined Cerebrum in Class 11th with average biology scores. The faculty identified my weak areas and created a personalized study plan. Regular doubt sessions and mock tests helped me improve consistently.',
    achievements: ['AIIMS Delhi', 'JIPMER Puducherry', 'NEET AIR 45'],
    videoTestimonial: 'https://youtube.com/watch?v=sample1'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    photo: '/images/students/student-placeholder.jpg',
    rank: 'AIR 156',
    year: '2023',
    college: 'MAMC Delhi',
    course: 'Class 12th NEET Intensive',
    tier: 'Ascent Series',
    beforeScore: 380,
    afterScore: 655,
    improvement: 275,
    quote: 'The faculty at Cerebrum made complex topics so easy to understand. Their teaching methods and continuous support helped me crack NEET in my first attempt.',
    story: 'Starting in Class 12th, I was worried about balancing board exams and NEET. Cerebrum\'s integrated approach helped me excel in both. The mock tests were particularly helpful in improving my speed and accuracy.',
    achievements: ['MAMC Delhi', 'VMMC Delhi', 'NEET AIR 156'],
    videoTestimonial: 'https://youtube.com/watch?v=sample2'
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    photo: '/images/students/student-placeholder.jpg',
    rank: 'AIR 234',
    year: '2022',
    college: 'KGMC Lucknow',
    course: 'Class 11th NEET Comprehensive',
    tier: 'Ascent Series',
    beforeScore: 350,
    afterScore: 645,
    improvement: 295,
    quote: 'From struggling with basic concepts to securing AIR 234, my journey with Cerebrum has been transformational. The systematic approach and excellent study material made all the difference.',
    story: 'I came from a small town with limited resources. Cerebrum\'s comprehensive program and supportive environment helped me compete at the national level. The faculty\'s encouragement kept me motivated throughout.',
    achievements: ['KGMC Lucknow', 'BHU Varanasi', 'NEET AIR 234'],
    videoTestimonial: null
  },
  {
    id: '4',
    name: 'Sneha Patel',
    photo: '/images/students/student-placeholder.jpg',
    rank: 'AIR 342',
    year: '2023',
    college: 'GMC Nagpur',
    course: 'Class 9th Foundation Biology',
    tier: 'Pinnacle Series',
    beforeScore: 280,
    afterScore: 620,
    improvement: 340,
    quote: 'Starting early with Cerebrum\'s foundation course gave me a huge advantage. By the time I reached Class 12th, I was already ahead of my peers in conceptual understanding.',
    story: 'I joined Cerebrum in Class 9th. The foundation course built strong basics which helped me throughout my NEET preparation. The long-term mentoring and guidance were invaluable.',
    achievements: ['GMC Nagpur', 'AIIMS Nagpur', 'NEET AIR 342'],
    videoTestimonial: 'https://youtube.com/watch?v=sample4'
  },
  {
    id: '5',
    name: 'Vikash Singh',
    photo: '/images/students/student-placeholder.jpg',
    rank: 'AIR 567',
    year: '2022',
    college: 'JNMC Belgaum',
    course: 'Class 12th NEET Intensive',
    tier: 'Pursuit Series',
    beforeScore: 320,
    afterScore: 590,
    improvement: 270,
    quote: 'Even with the Pursuit Series, I received excellent guidance and study material. The cost-effective program helped me achieve my dreams without financial stress on my family.',
    story: 'Coming from a middle-class family, I chose the Pursuit Series for its affordability. Despite the lower price, the quality of education was exceptional. The self-study materials were comprehensive.',
    achievements: ['JNMC Belgaum', 'Kasturba Medical College', 'NEET AIR 567'],
    videoTestimonial: null
  }
]

export function SuccessStories({ course }: SuccessStoriesProps) {
  const [currentStory, setCurrentStory] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState<string | null>(null)

  // Filter stories relevant to the current course
  const relevantStories = mockSuccessStories.filter(story => 
    story.course === course.name || 
    (course.targetClass === '11th' && story.course.includes('Class 11th')) ||
    (course.targetClass === '12th' && story.course.includes('Class 12th')) ||
    (course.targetClass === '9th' && story.course.includes('Class 9th')) ||
    (course.targetClass === '10th' && story.course.includes('Class 10th'))
  )

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % relevantStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + relevantStories.length) % relevantStories.length)
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement >= 300) return 'text-green-600'
    if (improvement >= 200) return 'text-blue-600'
    return 'text-purple-600'
  }

  const story = relevantStories[currentStory]

  if (!story) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real students, real results. See how our comprehensive approach has helped students achieve their NEET dreams
          </p>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">NEET Qualifiers</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <Medal className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Top 100 Ranks</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">280+</div>
            <div className="text-sm text-gray-600">Avg. Improvement</div>
          </Card>
        </div>

        {/* Featured Success Story */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Student Photo & Rank */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <Badge className="absolute -bottom-2 -right-2 bg-yellow-400 text-black font-bold">
                    {story.rank}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    {story.college}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-500" />
                    {story.tier}
                  </div>
                </div>

                {/* Video Testimonial Button */}
                {story.videoTestimonial && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => setShowVideoModal(story.videoTestimonial)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Story
                  </Button>
                )}
              </div>

              {/* Score Improvement */}
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-4">Score Transformation</h4>
                <div className="flex items-center justify-center gap-8">
                  <div>
                    <div className="text-2xl font-bold text-red-500">{story.beforeScore}</div>
                    <div className="text-xs text-gray-500">Before</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <TrendingUp className="h-6 w-6 text-green-500 mb-1" />
                    <div className={`text-xl font-bold ${getImprovementColor(story.improvement)}`}>
                      +{story.improvement}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">{story.afterScore}</div>
                    <div className="text-xs text-gray-500">After</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 bg-gray-200 rounded-full h-3 max-w-xs mx-auto">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${(story.afterScore / 720) * 100}%` }}
                  ></div>
                </div>

                {/* Achievements */}
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Achievements</h5>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {story.achievements.slice(0, 3).map((achievement, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote & Story */}
              <div className="space-y-4">
                <div className="relative">
                  <Quote className="h-8 w-8 text-blue-300 absolute -top-2 -left-2" />
                  <blockquote className="text-gray-700 italic pl-6">
                    "{story.quote}"
                  </blockquote>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {story.story}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>NEET {story.year} • {story.course}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStory}
            disabled={relevantStories.length <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {relevantStories.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStory ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentStory(index)}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextStory}
            disabled={relevantStories.length <= 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {relevantStories.slice(1, 4).map((testimonial) => (
            <Card key={testimonial.id} className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <div className="text-sm font-bold text-blue-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.rank} • {testimonial.college}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">"{testimonial.quote}"</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Badge variant="outline" className="text-xs">
                  {testimonial.tier}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful students who achieved their NEET dreams with our proven methodology and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Your Journey Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Talk to Our Success Coach
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}