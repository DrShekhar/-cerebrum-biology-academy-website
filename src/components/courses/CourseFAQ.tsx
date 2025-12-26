'use client'

import { useState, useMemo } from 'react'
import { CourseProgram, FAQ } from '@/types/courseSystem'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Filter
} from 'lucide-react'

interface CourseFAQProps {
  course: CourseProgram
}

// Mock FAQ data - in real app this would come from API or be expanded in courseSystemData
const mockFAQs: FAQ[] = [
  // General
  {
    id: 'general-1',
    question: 'What is the eligibility criteria for this course?',
    answer: 'Students who have completed or are currently in the respective class can enroll. For foundation courses, basic science knowledge is recommended. For NEET courses, completion of Class 10th with science subjects is required.',
    category: 'general',
    order: 1
  },
  {
    id: 'general-2',
    question: 'What is the duration of the course?',
    answer: 'The course duration varies by program. Foundation courses are typically 1 year, while NEET comprehensive courses are 2 years. Intensive courses are 1 year. Check the specific course details for exact duration.',
    category: 'general',
    order: 2
  },
  {
    id: 'general-3',
    question: 'Can I switch between online and offline classes?',
    answer: 'Yes, our hybrid learning model allows you to switch between online and offline classes based on availability and your preference. Some tiers offer this flexibility as a standard feature.',
    category: 'general',
    order: 3
  },
  {
    id: 'general-4',
    question: 'What happens if I miss a class?',
    answer: 'All live classes are recorded and made available within 24 hours. Additionally, we provide free makeup classes for valid absences. You can request a makeup class within 48 hours of the missed session.',
    category: 'general',
    order: 4
  },
  {
    id: 'general-5',
    question: 'Is there any entrance test for admission?',
    answer: 'No entrance test is required for admission. However, we conduct a diagnostic test to understand your current level and customize the learning plan accordingly.',
    category: 'general',
    order: 5
  },

  // Admission
  {
    id: 'admission-1',
    question: 'How do I enroll in the course?',
    answer: 'You can enroll online through our website, visit our center, or call our admission counselors. The process includes filling the application form, choosing your tier and batch, and completing the payment.',
    category: 'admission',
    order: 1
  },
  {
    id: 'admission-2',
    question: 'What documents are required for admission?',
    answer: 'You need to provide previous academic records, ID proof, address proof, and passport-size photographs. For online admissions, scanned copies are acceptable initially.',
    category: 'admission',
    order: 2
  },
  {
    id: 'admission-3',
    question: 'Can I get admission mid-session?',
    answer: 'Yes, mid-session admissions are possible. We provide recorded classes for missed content and additional support to help you catch up. A diagnostic test helps us plan your integration.',
    category: 'admission',
    order: 3
  },
  {
    id: 'admission-4',
    question: 'Is there a discount for early admission?',
    answer: 'Yes, we offer early bird discounts and various scholarships. Merit-based scholarships are available based on previous academic performance. Contact our admission counselors for current offers.',
    category: 'admission',
    order: 4
  },

  // Payment
  {
    id: 'payment-1',
    question: 'What are the payment options available?',
    answer: 'We accept one-time payments (with 5% discount) and installment options. Payment methods include bank transfer, online payment, cheque, and EMI through partner banks.',
    category: 'payment',
    order: 1
  },
  {
    id: 'payment-2',
    question: 'Are EMI options available?',
    answer: 'Yes, EMI options are available through our banking partners. You can choose from 3, 6, 9, or 12-month EMI plans with competitive interest rates.',
    category: 'payment',
    order: 2
  },
  {
    id: 'payment-3',
    question: 'What is the refund policy?',
    answer: 'Full refund is available within 15 days of enrollment if not satisfied with the course. After 15 days, refund is calculated on a pro-rata basis minus administrative charges.',
    category: 'payment',
    order: 3
  },
  {
    id: 'payment-4',
    question: 'Are there any additional charges?',
    answer: 'The course fee includes all study materials, online resources, and regular assessments. Lab fees may apply for certain practical sessions. No hidden charges.',
    category: 'payment',
    order: 4
  },

  // Curriculum
  {
    id: 'curriculum-1',
    question: 'Is the curriculum updated according to latest NEET pattern?',
    answer: 'Yes, our curriculum is continuously updated to align with the latest NEET pattern and syllabus changes. We incorporate recent exam trends and question patterns in our teaching methodology.',
    category: 'curriculum',
    order: 1
  },
  {
    id: 'curriculum-2',
    question: 'How many mock tests are included?',
    answer: 'The number of mock tests varies by tier. Pinnacle Series includes unlimited tests, Ascent Series includes comprehensive test series, and Pursuit Series includes essential mock tests.',
    category: 'curriculum',
    order: 2
  },
  {
    id: 'curriculum-3',
    question: 'Are previous year papers covered?',
    answer: 'Yes, all tiers include previous year NEET papers with detailed solutions. We analyze trends from the past 10 years and provide strategic insights for different question types.',
    category: 'curriculum',
    order: 3
  },
  {
    id: 'curriculum-4',
    question: 'How is practical work conducted?',
    answer: 'Practical work is conducted in our well-equipped labs with modern instruments. For online students, virtual lab sessions and home experiment kits are provided.',
    category: 'curriculum',
    order: 4
  },

  // Support
  {
    id: 'support-1',
    question: 'How can I contact faculty for doubt clarification?',
    answer: 'Faculty can be contacted through our doubt resolution portal, dedicated phone lines, email, or during scheduled doubt sessions. Response time varies by tier (immediate for Pinnacle, 24 hours for others).',
    category: 'support',
    order: 1
  },
  {
    id: 'support-2',
    question: 'Is parent counseling available?',
    answer: 'Yes, regular parent-teacher meetings are conducted. Pinnacle Series includes monthly meetings, while Ascent Series has quarterly meetings. Progress reports are shared regularly.',
    category: 'support',
    order: 2
  },
  {
    id: 'support-3',
    question: 'What technical support is available for online classes?',
    answer: 'We provide 24/7 technical support for online classes. This includes platform assistance, device setup help, and troubleshooting. A dedicated helpline is available for technical issues.',
    category: 'support',
    order: 3
  },
  {
    id: 'support-4',
    question: 'Are study materials provided?',
    answer: 'Yes, comprehensive study materials including printed notes, digital resources, worksheets, and reference books are provided. Materials are updated annually and aligned with the curriculum.',
    category: 'support',
    order: 4
  }
]

const categoryLabels = {
  general: 'General',
  admission: 'Admission',
  payment: 'Payment',
  curriculum: 'Curriculum',
  support: 'Support'
}

const categoryColors = {
  general: 'bg-blue-100 text-blue-800',
  admission: 'bg-green-100 text-green-800',
  payment: 'bg-purple-100 text-purple-800',
  curriculum: 'bg-orange-100 text-orange-800',
  support: 'bg-red-100 text-red-800'
}

export function CourseFAQ({ course }: CourseFAQProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([])

  // Combine course-specific FAQs with general FAQs
  const allFAQs = [...course.faq, ...mockFAQs].sort((a, b) => {
    if (a.category === b.category) {
      return a.order - b.order
    }
    return a.category.localeCompare(b.category)
  })

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return allFAQs.filter(faq => {
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [allFAQs, searchQuery, selectedCategory])

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQs(prev => 
      prev.includes(faqId)
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    )
  }

  const categories = Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about {course.name} and our teaching methodology
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-2"
            >
              <Filter className="h-3 w-3" />
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Results Count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length === 0 ? (
            <Card className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? "Try adjusting your search terms or browse different categories."
                  : "No FAQs available for the selected category."
                }
              </p>
            </Card>
          ) : (
            filteredFAQs.map((faq) => {
              const isExpanded = expandedFAQs.includes(faq.id)
              
              return (
                <Card key={faq.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div
                    className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Badge
                          variant="secondary"
                          className={`${categoryColors[faq.category]} text-xs flex-shrink-0 mt-1`}
                        >
                          {categoryLabels[faq.category]}
                        </Badge>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          {faq.question}
                        </h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-4 border-t bg-white">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              )
            })
          )}
        </div>

        {/* Contact Section */}
        <Card className="bg-indigo-500 text-white p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6">
              Our counselors are here to help you with any additional questions about the course or enrollment process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="h-4 w-4 mr-2" />
                Call Counselor
              </Button>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-blue-100">
              <p>Available 9 AM - 8 PM (Mon-Sat) | Response within 2 hours</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Request Course Brochure
            </Button>
            <Button size="lg" variant="outline">
              Schedule Campus Visit
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}