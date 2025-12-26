'use client'

import { useState } from 'react'
import { CourseProgram, CurriculumModule } from '@/types/courseSystem'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Target,
  FlaskConical,
  FileText,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react'

interface CourseCurriculumProps {
  course: CourseProgram
}

export function CourseCurriculum({ course }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [showAllModules, setShowAllModules] = useState(false)

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const toggleAllModules = () => {
    if (expandedModules.length === course.curriculum.modules.length) {
      setExpandedModules([])
    } else {
      setExpandedModules(course.curriculum.modules.map(m => m.id))
    }
  }

  const displayedModules = showAllModules 
    ? course.curriculum.modules 
    : course.curriculum.modules.slice(0, 6)

  const ModuleCard = ({ module, index }: { module: CurriculumModule; index: number }) => {
    const isExpanded = expandedModules.includes(module.id)

    return (
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        {/* Module Header */}
        <div 
          className="p-4 cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-colors"
          onClick={() => toggleModule(module.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{module.title}</h3>
                <p className="text-sm text-blue-700">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                <Clock className="h-3 w-3 mr-1" />
                {module.duration}h
              </Badge>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-blue-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-600" />
              )}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 border-t bg-white">
            <div className="space-y-4">
              {/* Topics */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-green-600" />
                  Topics Covered
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {module.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  Learning Objectives
                </h4>
                <ul className="space-y-1">
                  {module.learningObjectives.map((objective, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Work */}
              {module.practicalWork && module.practicalWork.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-orange-600" />
                    Practical Work
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {module.practicalWork.map((practical, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="h-2 w-2 bg-orange-500 rounded-full flex-shrink-0" />
                        {practical}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {module.assignments && module.assignments.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Assignments
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {module.assignments.map((assignment, idx) => (
                      <div key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        {assignment}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Detailed Curriculum
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive module-wise breakdown designed to build strong fundamentals and ensure NEET success
          </p>

          {/* Course Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{course.curriculum.totalModules}</div>
              <div className="text-sm text-gray-600">Total Modules</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{course.curriculum.totalHours}</div>
              <div className="text-sm text-gray-600">Teaching Hours</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <FlaskConical className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{course.curriculum.practicalHours}</div>
              <div className="text-sm text-gray-600">Practical Hours</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{course.curriculum.testCount}</div>
              <div className="text-sm text-gray-600">Tests & Assessments</div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <Button 
            onClick={toggleAllModules}
            variant="outline"
            className="flex items-center gap-2"
          >
            {expandedModules.length === course.curriculum.modules.length ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Expand All
              </>
            )}
          </Button>
          <Button className="flex items-center gap-2" variant="secondary">
            <Download className="h-4 w-4" />
            Download Complete Curriculum
          </Button>
        </div>

        {/* Module Cards */}
        <div className="space-y-4">
          {displayedModules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {course.curriculum.modules.length > 6 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowAllModules(!showAllModules)}
              variant="outline"
              size="lg"
            >
              {showAllModules 
                ? `Show Less (${course.curriculum.modules.length - 6} modules hidden)`
                : `Show All ${course.curriculum.modules.length} Modules`
              }
            </Button>
          </div>
        )}

        {/* Additional Information */}
        <Card className="mt-12 bg-indigo-500 text-white">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Course Structure
                </h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Progressive difficulty levels</li>
                  <li>• Regular revision sessions</li>
                  <li>• Continuous assessment</li>
                  <li>• Practical laboratory work</li>
                  <li>• Mock tests and evaluations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Approach
                </h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Conceptual clarity focus</li>
                  <li>• Problem-solving techniques</li>
                  <li>• Memory techniques and mnemonics</li>
                  <li>• Visual learning aids</li>
                  <li>• Interactive discussions</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}