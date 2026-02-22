'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  GraduationCap,
  Clock,
  UserIcon,
  CheckCircle2,
  Play,
  FileText,
  FlaskConical,
  BarChart2,
  Star,
  Users,
  Trophy,
} from 'lucide-react'
import { BookFreeDemoCard } from '@/components/courses/BookFreeDemoCard'

const NEETCompletePage = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'curriculum' | 'faculty' | 'testimonials' | 'pricing'
  >('overview')

  // Harvard-level curriculum structure
  const curriculum = {
    'Class 11 Biology': {
      duration: '6 months',
      modules: [
        {
          title: 'Diversity of Living Organisms',
          chapters: [
            {
              name: 'The Living World',
              topics: [
                'Classification systems',
                'Taxonomic hierarchies',
                'Nomenclature principles',
              ],
              learningObjectives: [
                'Analyze systematic classification methods',
                'Apply binomial nomenclature principles',
                'Evaluate biodiversity conservation strategies',
              ],
              researchConnections: [
                'Latest phylogenetic studies (Nature, 2023)',
                'DNA barcoding in species identification',
                'Climate change impact on biodiversity',
              ],
              assessments: ['Conceptual quizzes', 'Classification projects', 'Research analysis'],
            },
            {
              name: 'Biological Classification',
              topics: [
                'Five kingdom classification',
                'Prokaryotes vs Eukaryotes',
                'Virus classification',
              ],
              learningObjectives: [
                'Compare and contrast classification systems',
                'Analyze evolutionary relationships',
                'Evaluate modern molecular classification',
              ],
              researchConnections: [
                'Archaea discovery and classification updates',
                'Molecular phylogeny advances',
                'Horizontal gene transfer implications',
              ],
            },
            {
              name: 'Plant Kingdom',
              topics: ['Algae', 'Bryophytes', 'Pteridophytes', 'Gymnosperms', 'Angiosperms'],
              learningObjectives: [
                'Trace evolutionary progression in plants',
                'Analyze adaptive strategies',
                'Evaluate ecological significance',
              ],
              researchConnections: [
                'Plant genome sequencing projects',
                'Climate adaptation mechanisms',
                'Conservation genetics applications',
              ],
            },
            {
              name: 'Animal Kingdom',
              topics: ['Non-chordates', 'Chordates', 'Evolutionary relationships'],
              learningObjectives: [
                'Analyze phylogenetic relationships',
                'Compare body plan organizations',
                'Evaluate developmental patterns',
              ],
              researchConnections: [
                'Evo-devo research findings',
                'Comparative genomics insights',
                'Extinction and conservation biology',
              ],
            },
          ],
        },
        {
          title: 'Structural Organization in Animals and Plants',
          chapters: [
            {
              name: 'Morphology of Flowering Plants',
              topics: ['Root systems', 'Shoot systems', 'Inflorescence types', 'Flower structure'],
              learningObjectives: [
                'Analyze plant architectural adaptations',
                'Correlate structure with function',
                'Evaluate evolutionary modifications',
              ],
              researchConnections: [
                'Plant architecture and yield optimization',
                'Climate-responsive morphological changes',
                'Genetic basis of morphological variation',
              ],
            },
            {
              name: 'Anatomy of Flowering Plants',
              topics: ['Tissue systems', 'Secondary growth', 'Adaptive anatomy'],
              learningObjectives: [
                'Integrate tissue organization with function',
                'Analyze developmental processes',
                'Evaluate environmental adaptations',
              ],
              researchConnections: [
                'Stem cell research in plants',
                'Tissue engineering applications',
                'Stress response anatomy',
              ],
            },
            {
              name: 'Animal Tissues',
              topics: ['Epithelial', 'Connective', 'Muscular', 'Nervous tissues'],
              learningObjectives: [
                'Correlate tissue structure with function',
                'Analyze developmental origins',
                'Evaluate regenerative capacity',
              ],
              researchConnections: [
                'Regenerative medicine advances',
                'Tissue engineering breakthroughs',
                'Cancer biology and tissue organization',
              ],
            },
          ],
        },
        {
          title: 'Cell Structure and Function',
          chapters: [
            {
              name: 'Cell: The Unit of Life',
              topics: ['Cell theory', 'Prokaryotic vs Eukaryotic cells', 'Cell organelles'],
              learningObjectives: [
                'Evaluate cell theory significance',
                'Compare cellular organizations',
                'Analyze organelle interdependence',
              ],
              researchConnections: [
                'Single-cell genomics revolution',
                'Organelle evolution theories',
                'Cellular aging mechanisms',
              ],
            },
            {
              name: 'Biomolecules',
              topics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic acids', 'Enzymes'],
              learningObjectives: [
                'Integrate molecular structure with function',
                'Analyze biochemical pathways',
                'Evaluate regulatory mechanisms',
              ],
              researchConnections: [
                'Protein folding and disease',
                'Metabolomics in health and disease',
                'Enzyme engineering applications',
              ],
            },
            {
              name: 'Cell Cycle and Cell Division',
              topics: ['Mitosis', 'Meiosis', 'Cell cycle regulation'],
              learningObjectives: [
                'Analyze cell division mechanisms',
                'Evaluate regulatory checkpoints',
                'Connect to cancer biology',
              ],
              researchConnections: [
                'Cell cycle checkpoint discoveries',
                'Cancer therapy targets',
                'Stem cell division patterns',
              ],
            },
          ],
        },
      ],
    },
    'Class 12 Biology': {
      duration: '6 months',
      modules: [
        {
          title: 'Reproduction',
          chapters: [
            {
              name: 'Sexual Reproduction in Flowering Plants',
              topics: ['Pollination', 'Fertilization', 'Seed development'],
              learningObjectives: [
                'Analyze reproductive strategies',
                'Evaluate pollination mechanisms',
                'Connect to evolutionary success',
              ],
              researchConnections: [
                'Pollinator decline and plant reproduction',
                'Genetic engineering of crops',
                'Climate change impacts on flowering',
              ],
            },
            {
              name: 'Human Reproduction',
              topics: ['Male reproductive system', 'Female reproductive system', 'Menstrual cycle'],
              learningObjectives: [
                'Integrate anatomy with physiology',
                'Analyze hormonal regulations',
                'Evaluate reproductive health',
              ],
              researchConnections: [
                'Reproductive medicine advances',
                'Hormonal contraception mechanisms',
                'Fertility preservation techniques',
              ],
            },
          ],
        },
        {
          title: 'Genetics and Evolution',
          chapters: [
            {
              name: 'Heredity and Variation',
              topics: ["Mendel's laws", 'Chromosomal inheritance', 'Genetic disorders'],
              learningObjectives: [
                'Apply genetic principles',
                'Analyze inheritance patterns',
                'Evaluate genetic counseling',
              ],
              researchConnections: [
                'CRISPR gene editing applications',
                'Precision medicine developments',
                'Population genetics studies',
              ],
            },
            {
              name: 'Molecular Basis of Inheritance',
              topics: ['DNA structure', 'Replication', 'Transcription', 'Translation'],
              learningObjectives: [
                'Trace information flow in cells',
                'Analyze molecular mechanisms',
                'Evaluate biotechnology applications',
              ],
              researchConnections: [
                'Epigenetics revolution',
                'RNA therapeutics',
                'Synthetic biology advances',
              ],
            },
            {
              name: 'Evolution',
              topics: ['Origin of life', 'Natural selection', 'Speciation'],
              learningObjectives: [
                'Evaluate evolutionary theories',
                'Analyze evidence for evolution',
                'Connect to modern biology',
              ],
              researchConnections: [
                'Evolutionary developmental biology',
                'Molecular evolution studies',
                'Conservation genetics',
              ],
            },
          ],
        },
      ],
    },
  }

  const facultyHighlights = [
    {
      name: 'Dr. Priya Sharma',
      credentials: 'Ph.D. Cell Biology, AIIMS • M.Sc. Biochemistry, JNU',
      specialization: 'Molecular Biology & Genetics',
      experience: '15 years NEET coaching',
      research: [
        'Published 25+ papers in Nature, Cell, PNAS',
        'NIH postdoctoral fellow, Harvard Medical School',
        'Expert in CRISPR-Cas9 gene editing',
      ],
      achievements: [
        '500+ students scored 350+ in NEET Biology',
        'Developed innovative 3D molecular visualization',
        'Guest lecturer at IISc Bangalore',
      ],
    },
    {
      name: 'Dr. Rajesh Kumar',
      credentials: 'Ph.D. Plant Physiology, IISc • M.Sc. Botany, DU',
      specialization: 'Plant Biology & Ecology',
      experience: '15+ years academic excellence',
      research: [
        'Leading expert in plant stress biology',
        '30+ publications in Plant Cell, Plant Journal',
        'Climate change impact on plant reproduction',
      ],
      achievements: [
        'Authored NCERT revision committee',
        '400+ students achieved All India Rank <1000',
        'UNESCO consultant on biodiversity',
      ],
    },
  ]

  const learningOutcomes = [
    {
      category: 'Conceptual Mastery',
      outcomes: [
        'Deep understanding of biological principles',
        'Ability to integrate concepts across topics',
        'Critical analysis of scientific information',
      ],
    },
    {
      category: 'Problem-Solving Skills',
      outcomes: [
        'Application of concepts to novel situations',
        'Multi-step problem solving strategies',
        'Quantitative analysis of biological data',
      ],
    },
    {
      category: 'Scientific Thinking',
      outcomes: [
        'Hypothesis formulation and testing',
        'Experimental design principles',
        'Data interpretation and analysis',
      ],
    },
    {
      category: 'NEET Excellence',
      outcomes: [
        'Consistent 350+ Biology score achievement',
        'Time management in exam conditions',
        'Strategic question selection techniques',
      ],
    },
  ]

  const testimonials = [
    {
      student: 'Aarav Sharma',
      score: '358/360 in NEET Biology',
      college: 'AIIMS Delhi',
      quote:
        'The depth of content and research connections helped me understand Biology at a level that made NEET questions seem straightforward.',
      video: '/testimonials/aarav-sharma.mp4',
    },
    {
      student: 'Priya Patel',
      score: '352/360 in NEET Biology',
      college: 'JIPMER Puducherry',
      quote:
        "Dr. Sharma's molecular biology insights and real research examples made complex concepts crystal clear.",
      video: '/testimonials/priya-patel.mp4',
    },
  ]

  const courseFeatures = [
    {
      icon: GraduationCap,
      title: 'Harvard-Level Academic Rigor',
      description:
        'Research-backed curriculum with latest scientific discoveries and evidence-based teaching',
    },
    {
      icon: FlaskConical,
      title: 'Interactive Laboratory Simulations',
      description: '3D molecular visualizations and virtual experiments for hands-on learning',
    },
    {
      icon: BarChart2,
      title: 'AI-Powered Analytics',
      description: 'Personalized learning paths with weakness identification and progress tracking',
    },
    {
      icon: Users,
      title: 'Expert Faculty Mentorship',
      description: 'PhD-qualified faculty with active research backgrounds and proven NEET success',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NEET Complete Biology Course',
            description:
              'Comprehensive 2-year NEET Biology program covering both Class 11 and Class 12 with Harvard-level academic rigor, research-backed curriculum, and PhD-qualified faculty.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              jobTitle: 'Founder & Head Faculty',
              alumniOf: 'AIIMS New Delhi',
            },
            courseCode: 'NEET-COMPLETE',
            educationalLevel: 'Intermediate to Advanced',
            teaches: 'Complete NEET Biology - Class 11 and 12',
            numberOfCredits: '12 months',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
              courseWorkload: 'PT4H',
              instructor: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
              },
            },
            offers: {
              '@type': 'Offer',
              category: 'NEET Biology Coaching',
              priceCurrency: 'INR',
              price: '144400',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '38',
              bestRating: '5',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                  #1 NEET Biology Course
                </div>
                <div className="bg-green-600 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                  98% Success Rate
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NEET Complete Biology
                <span className="block text-2xl md:text-3xl mt-2 text-blue-200">
                  Harvard-Level Academic Excellence
                </span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed">
                Master Biology with research-backed curriculum, PhD-qualified faculty, and proven
                track record of 350+ average scores in NEET Biology.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">358</div>
                  <div className="text-sm text-blue-200">Highest Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">98%</div>
                  <div className="text-sm text-blue-200">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1,50,000+</div>
                  <div className="text-sm text-blue-200">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">15+</div>
                  <div className="text-sm text-blue-200">PhD Faculty</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 text-yellow-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg">
                  Enroll Now - ₹75,000
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
                  Book Free Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Course Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <span>12 months comprehensive program</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-yellow-400" />
                    <span>38 chapters with research connections</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-yellow-400" />
                    <span>1:20 student-faculty ratio</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <span>Guaranteed 300+ score improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
              { id: 'faculty', label: 'Faculty', icon: UserIcon },
              { id: 'testimonials', label: 'Success Stories', icon: Star },
              { id: 'pricing', label: 'Pricing', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-all',
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Book Free Demo — Inline Form */}
      <section className="py-8 bg-gradient-to-b from-green-800 to-green-900">
        <div className="max-w-md mx-auto px-4">
          <BookFreeDemoCard courseName="NEET Complete Biology" source="neet-complete-hero-form" />
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Course Features */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Why Choose Our NEET Biology Program?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {courseFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Outcomes */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Learning Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {learningOutcomes.map((category, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-800">{category.category}</h3>
                    <ul className="space-y-3">
                      {category.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Research Integration */}
            <section className="bg-gray-50 border border-purple-200 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Research-Backed Excellence</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">250+</div>
                  <div className="text-gray-700">Research Papers Integrated</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-700">Latest Discoveries (2023-24)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-gray-700">Evidence-Based Content</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Curriculum</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Research-backed curriculum with latest scientific discoveries, structured for
                progressive learning and NEET excellence
              </p>
            </div>

            {Object.entries(curriculum).map(([className, classData]) => (
              <div key={className} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-green-700 text-white p-6">
                  <h3 className="text-2xl font-bold">{className}</h3>
                  <p className="text-blue-100">Duration: {classData.duration}</p>
                </div>

                <div className="p-6">
                  {classData.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="mb-8">
                      <h4 className="text-xl font-bold mb-4 text-blue-800">{module.title}</h4>

                      <div className="space-y-6">
                        {module.chapters.map((chapter, chapterIndex) => (
                          <div key={chapterIndex} className="border border-gray-200 rounded-lg p-6">
                            <h5 className="text-lg font-bold mb-3">{chapter.name}</h5>

                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <h6 className="font-medium text-gray-700 mb-2">Topics Covered</h6>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {chapter.topics.map((topic, topicIndex) => (
                                    <li key={topicIndex} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h6 className="font-medium text-gray-700 mb-2">
                                  Learning Objectives
                                </h6>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {chapter.learningObjectives.map((objective, objIndex) => (
                                    <li key={objIndex} className="flex items-start gap-2">
                                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      {objective}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h6 className="font-medium text-gray-700 mb-2">
                                  Research Connections
                                </h6>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {chapter.researchConnections.map((research, resIndex) => (
                                    <li key={resIndex} className="flex items-start gap-2">
                                      <FlaskConical className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                      {research}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {'assessments' in chapter && chapter.assessments && (
                              <div className="mt-4 pt-4 border-t">
                                <h6 className="font-medium text-gray-700 mb-2">
                                  Assessment Methods
                                </h6>
                                <div className="flex flex-wrap gap-2">
                                  {chapter.assessments.map(
                                    (assessment: string, assIndex: number) => (
                                      <span
                                        key={assIndex}
                                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                                      >
                                        {assessment}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">World-Class Faculty</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from PhD-qualified researchers and educators with proven NEET success records
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {facultyHighlights.map((faculty, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-indigo-500 text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{faculty.name}</h3>
                    <p className="text-blue-100 mb-2">{faculty.credentials}</p>
                    <p className="text-blue-200">
                      {faculty.specialization} • {faculty.experience}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-purple-800">Research Excellence</h4>
                      <ul className="space-y-2">
                        {faculty.research.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <FlaskConical className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3 text-green-800">Teaching Achievements</h4>
                      <ul className="space-y-2">
                        {faculty.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Trophy className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Student Success Stories</h2>
              <p className="text-xl text-gray-600">
                Hear from our top performers who achieved their NEET dreams
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.student
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{testimonial.student}</h3>
                      <p className="text-green-600 font-bold">{testimonial.score}</p>
                      <p className="text-gray-600">{testimonial.college}</p>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                    <Play className="h-4 w-4" />
                    Watch Video Testimonial
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Investment in Your Future</h2>
              <p className="text-xl text-gray-600">
                Premium education at accessible pricing with flexible payment options
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">NEET Complete Biology</h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course Duration</span>
                      <span className="font-medium">12 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Classes</span>
                      <span className="font-medium">240+ hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Material</span>
                      <span className="font-medium">Research-backed content</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Faculty Access</span>
                      <span className="font-medium">PhD mentorship</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Guarantee</span>
                      <span className="font-medium text-green-600">300+ score improvement</span>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-blue-600">₹75,000</div>
                      <div className="text-gray-500 line-through">₹1,50,000</div>
                      <div className="text-green-600 font-medium">50% Launch Discount</div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all">
                        Enroll Now - Full Payment
                      </button>
                      <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all">
                        EMI Option - ₹8,334/month
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold mb-4 text-center">What's Included</h4>
                  <ul className="space-y-3">
                    {[
                      'Live interactive classes with PhD faculty',
                      'Recording access for lifetime revision',
                      'Research-backed study materials',
                      '3D molecular visualization tools',
                      'Personalized doubt resolution',
                      'Weekly assessment and feedback',
                      'NEET mock test series',
                      'Career counseling sessions',
                      'Alumni network access',
                      'Success guarantee program',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                    <div className="font-bold text-yellow-800 mb-2">🎯 Money-Back Guarantee</div>
                    <p className="text-sm text-yellow-700">
                      If you don't improve by 300+ points in Biology, get full refund within 6
                      months.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in NEET Biology?</h2>
          <p className="text-xl mb-8">
            Join 1,50,000+ successful students and achieve your medical college dream
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-yellow-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg">
              Enroll Now - Limited Seats
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
              Book Free Demo Class
            </button>
          </div>

          <p className="text-sm text-blue-200 mt-4">
            Next batch starts January 15th, 2025 • Limited to 100 students
          </p>
        </div>
      </div>
    </div>
  )
}

export default NEETCompletePage
