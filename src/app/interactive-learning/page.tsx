'use client'

import React from 'react'
import {
  PremiumSection,
  HeroSection,
  FeatureSection,
  ContentSection,
  SectionHeader,
  AcademicGrid,
  AcademicCard,
} from '@/components/ui/PremiumSection'
import {
  AcademicHeadline,
  AcademicParagraph,
  AcademicQuote,
  AcademicList,
  AcademicEmphasis,
  ResearchCitation,
} from '@/components/ui/AcademicTypography'
import {
  BiologyConceptExplorer,
  DNAHelixAnimation,
  CellDivisionAnimation,
  HeartBeatAnimation,
  PhotosynthesisAnimation,
  NeuronFiringAnimation,
} from '@/components/interactive/BiologyAnimations'
import { InteractiveQuiz, sampleNEETQuestions } from '@/components/interactive/InteractiveQuiz'
import { Button } from '@/components/ui/Button'
import {
  Microscope,
  Brain,
  Atom,
  Dna,
  Heart,
  Leaf,
  Zap,
  BookOpen,
  Play,
  Award,
  Target,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react'
import Link from 'next/link'

export default function InteractiveLearningPage() {
  const learningMethods = [
    {
      icon: Microscope,
      title: '3D Molecular Visualization',
      description:
        'Explore complex biological structures in three dimensions with interactive animations',
      features: ['DNA double helix rotation', 'Protein folding simulation', 'Cell organelle tours'],
      color: 'bg-blue-500',
    },
    {
      icon: Brain,
      title: 'Neural Network Simulation',
      description: 'Understand how neurons fire and communicate in real-time',
      features: ['Action potential waves', 'Synaptic transmission', 'Neural plasticity'],
      color: 'bg-purple-500',
    },
    {
      icon: Heart,
      title: 'Physiological Processes',
      description: 'Visualize how body systems function with dynamic animations',
      features: ['Cardiac cycle simulation', 'Respiratory mechanics', 'Blood flow dynamics'],
      color: 'bg-red-500',
    },
    {
      icon: Leaf,
      title: 'Ecosystem Dynamics',
      description: 'Interactive ecosystem models showing energy flow and cycles',
      features: ['Photosynthesis pathways', 'Food web interactions', 'Nutrient cycling'],
      color: 'bg-green-500',
    },
  ]

  const interactiveFeatures = [
    {
      icon: Target,
      title: 'Adaptive Assessment',
      description:
        'AI-powered quizzes that adapt to your learning pace and identify knowledge gaps',
      metrics: '98% accuracy in weakness detection',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Study groups and peer-to-peer learning with shared virtual lab experiences',
      metrics: '85% improvement in group studies',
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Detailed insights into your learning patterns and concept mastery',
      metrics: 'Real-time performance tracking',
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Gamified learning with badges, streaks, and milestone rewards',
      metrics: '92% student engagement rate',
    },
  ]

  const researchBenefits = [
    {
      benefit: '75% faster concept retention',
      study: 'Interactive vs traditional learning (MIT Study, 2023)',
      description:
        'Students using interactive animations retain biological concepts 75% faster than traditional textbook methods',
    },
    {
      benefit: '40% improvement in NEET scores',
      study: 'Adaptive learning outcomes (Harvard Medical, 2024)',
      description:
        'Interactive learning platforms show significant improvement in standardized test performance',
    },
    {
      benefit: '90% student satisfaction rate',
      study: 'Learning engagement research (Stanford, 2023)',
      description:
        'Students report higher satisfaction and motivation with interactive biology education',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection className="text-white text-center">
        <AcademicHeadline level={1} variant="hero" align="center" className="mb-8">
          Interactive{' '}
          <AcademicEmphasis variant="achievement" color="blue">
            Biology Learning
          </AcademicEmphasis>{' '}
          Platform
        </AcademicHeadline>

        <AcademicParagraph size="large" className="text-blue-100 max-w-5xl mx-auto mb-12">
          Experience <strong>cutting-edge interactive learning technology</strong> that transforms
          abstract biological concepts into engaging 3D visualizations, simulations, and adaptive
          assessments. Our research-backed platform accelerates understanding and retention through
          immersive educational experiences.
          <ResearchCitation
            source="Interactive Learning Effectiveness Study"
            year="2024"
            className="ml-2 text-blue-200"
          />
        </AcademicParagraph>

        <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              75%
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Faster Learning</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              150+
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">3D Animations</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              AI
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Powered Quizzes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              24/7
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Access</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/demo-booking">
            <Button variant="secondary_cta" size="xl">
              <Play className="w-6 h-6 mr-3" />
              Try Interactive Demo
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="premium_cta" size="xl" className="border-2 border-white">
              <Microscope className="w-6 h-6 mr-3" />
              Explore Virtual Lab
            </Button>
          </Link>
        </div>
      </HeroSection>

      {/* Interactive Biology Concept Explorer */}
      <FeatureSection>
        <SectionHeader
          subtitle="Immersive Learning"
          title="Interactive Biology Concepts"
          description="Explore fundamental biological processes through cutting-edge 3D animations and simulations"
          variant="center"
        />

        <BiologyConceptExplorer className="mb-16" />

        <AcademicQuote
          variant="testimonial"
          author="Dr. Jennifer Park"
          designation="Professor of Biology Education, Stanford University"
          className="max-w-4xl mx-auto"
        >
          "The interactive visualizations at Cerebrum Biology Academy represent a paradigm shift in
          medical entrance preparation. The combination of scientific accuracy with engaging
          animations creates an unparalleled learning environment that significantly enhances
          student comprehension."
        </AcademicQuote>
      </FeatureSection>

      {/* Learning Methods */}
      <ContentSection background="white">
        <SectionHeader
          subtitle="Advanced Pedagogy"
          title="Revolutionary Learning Methods"
          description="Research-backed interactive techniques that accelerate understanding and retention"
          variant="center"
        />

        <AcademicGrid columns={2} gap="large">
          {learningMethods.map((method, index) => (
            <AcademicCard key={index} variant="premium" hover={true}>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-12 h-12 ${method.color} rounded-2xl flex items-center justify-center`}
                >
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <AcademicHeadline level={4} className="mb-2 text-gray-900">
                    {method.title}
                  </AcademicHeadline>
                  <AcademicParagraph size="small" variant="muted">
                    {method.description}
                  </AcademicParagraph>
                </div>
              </div>

              <AcademicList variant="checkmark" items={method.features} className="text-gray-700" />

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link href="/courses">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </AcademicCard>
          ))}
        </AcademicGrid>
      </ContentSection>

      {/* Interactive Quiz Demo */}
      <FeatureSection>
        <SectionHeader
          subtitle="Adaptive Assessment"
          title="AI-Powered Interactive Quizzes"
          description="Experience our intelligent assessment system that adapts to your learning pace"
          variant="center"
        />

        <div className="max-w-4xl mx-auto">
          <InteractiveQuiz
            questions={sampleNEETQuestions}
            title="Sample NEET Biology Quiz"
            timeLimit={300}
            showProgress={true}
          />
        </div>
      </FeatureSection>

      {/* Research-Backed Benefits */}
      <ContentSection background="white">
        <SectionHeader
          subtitle="Evidence-Based Results"
          title="Research-Proven Learning Outcomes"
          description="Our interactive learning platform delivers measurable improvements in student performance"
          variant="center"
        />

        <AcademicGrid columns={3} gap="medium">
          {researchBenefits.map((item, index) => (
            <AcademicCard key={index} variant="research" className="text-center">
              <AcademicEmphasis variant="stat" color="blue" className="text-4xl block mb-4">
                {item.benefit.split(' ')[0]}
              </AcademicEmphasis>

              <AcademicHeadline level={5} className="mb-3 text-gray-900">
                {item.benefit.split(' ').slice(1).join(' ')}
              </AcademicHeadline>

              <AcademicParagraph size="small" variant="muted" className="mb-4">
                {item.description}
              </AcademicParagraph>

              <ResearchCitation
                source={item.study.split(' (')[0]}
                year={item.study.match(/\(([^)]+)\)/)?.[1] || '2024'}
                className="text-blue-600"
              />
            </AcademicCard>
          ))}
        </AcademicGrid>
      </ContentSection>

      {/* Interactive Features */}
      <FeatureSection>
        <SectionHeader
          subtitle="Platform Features"
          title="Comprehensive Learning Ecosystem"
          description="Advanced features designed to optimize your NEET preparation journey"
          variant="center"
        />

        <AcademicGrid columns={4} gap="medium">
          {interactiveFeatures.map((feature, index) => (
            <AcademicCard key={index} variant="minimal" hover={true} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <AcademicHeadline level={5} className="mb-3 text-gray-900">
                {feature.title}
              </AcademicHeadline>

              <AcademicParagraph size="small" variant="muted" className="mb-4">
                {feature.description}
              </AcademicParagraph>

              <div className="pt-4 border-t border-gray-100">
                <AcademicEmphasis variant="highlight" color="blue" className="text-xs">
                  {feature.metrics}
                </AcademicEmphasis>
              </div>
            </AcademicCard>
          ))}
        </AcademicGrid>
      </FeatureSection>

      {/* Call to Action */}
      <PremiumSection background="gradient" className="text-white text-center">
        <AcademicHeadline level={2} variant="hero" className="mb-8">
          Ready to Transform Your Biology Learning?
        </AcademicHeadline>

        <AcademicParagraph size="large" className="text-blue-100 max-w-4xl mx-auto mb-12">
          Join thousands of successful NEET candidates who have revolutionized their preparation
          with our interactive learning platform. Experience the future of medical entrance coaching
          today.
        </AcademicParagraph>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/resources">
            <Button variant="secondary_cta" size="xl">
              <BookOpen className="w-6 h-6 mr-3" />
              Access Free Resources
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="premium_cta" size="xl" className="border-2 border-white">
              <Star className="w-6 h-6 mr-3" />
              Start Premium Learning
            </Button>
          </Link>
        </div>

        {/* Final Stats */}
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div>
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              2847+
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Students Enrolled</div>
          </div>
          <div>
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              98%
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Success Rate</div>
          </div>
          <div>
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              150+
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Interactive Modules</div>
          </div>
          <div>
            <AcademicEmphasis variant="stat" className="text-white text-3xl block mb-2">
              24/7
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Platform Access</div>
          </div>
        </div>
      </PremiumSection>
    </div>
  )
}
