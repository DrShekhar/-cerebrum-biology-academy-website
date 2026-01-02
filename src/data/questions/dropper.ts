import { AuthenticQuestion } from './types'

// ============================================================================
// DROPPER QUESTIONS - COMPREHENSIVE REVIEW
// ============================================================================

export const dropperQuestions: AuthenticQuestion[] = [
  // Human Physiology - Nervous System
  {
    id: 'qd-001',
    topicId: 'topic-dropper-1-1',
    chapterId: 'ch-dropper-1',
    classId: 'dropper',
    question: 'During the depolarization phase of action potential, which ion channels open first?',
    options: ['Potassium channels', 'Sodium channels', 'Calcium channels', 'Chloride channels'],
    correctAnswer: 'Sodium channels',
    explanation:
      'During depolarization, voltage-gated sodium channels open first, allowing Na⁺ influx which makes the membrane potential positive. K⁺ channels open later during repolarization phase.',
    difficulty: 'Hard',
    ncertPageReference: 'Class 11, Chapter 21, Page 315',
    previousYearFrequency: 12,
    conceptualLinks: ['action potential', 'resting potential', 'nerve transmission'],
    timeEstimate: 60,
    bloomsLevel: 'Analyze',
    weightage: 6.0,
  },
  // Genetics - Molecular Genetics
  {
    id: 'qd-002',
    topicId: 'topic-dropper-1-2',
    chapterId: 'ch-dropper-1',
    classId: 'dropper',
    question: 'In prokaryotes, transcription and translation occur:',
    options: [
      'Sequentially in the nucleus',
      'Simultaneously in the cytoplasm',
      'Transcription in nucleus, translation in cytoplasm',
      'Both in the nucleus',
    ],
    correctAnswer: 'Simultaneously in the cytoplasm',
    explanation:
      'In prokaryotes, both transcription and translation occur in the cytoplasm and can happen simultaneously since there is no nuclear membrane. mRNA can be translated while still being transcribed.',
    difficulty: 'Medium',
    ncertPageReference: 'Class 12, Chapter 6, Page 115',
    previousYearFrequency: 15,
    conceptualLinks: ['gene expression', 'mRNA processing', 'ribosomes'],
    timeEstimate: 50,
    bloomsLevel: 'Understand',
    weightage: 7.0,
  },
]
