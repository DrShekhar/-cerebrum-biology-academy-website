export interface QuizChapter {
  id: string
  name: string
  classId: 'class-11' | 'class-12'
  questionCount: number
}

export const quizChapters: QuizChapter[] = [
  // Class 11 Chapters
  {
    id: 'ch-11-1',
    name: 'The Living World',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-2',
    name: 'Biological Classification',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-3',
    name: 'Plant Kingdom',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-4',
    name: 'Animal Kingdom',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-5',
    name: 'Morphology of Flowering Plants',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-6',
    name: 'Anatomy of Flowering Plants',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-7',
    name: 'Structural Organisation in Animals',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-12',
    name: 'Mineral Nutrition',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-20',
    name: 'Locomotion and Movement',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-21',
    name: 'Neural Control and Coordination',
    classId: 'class-11',
    questionCount: 100,
  },
  {
    id: 'ch-11-22',
    name: 'Chemical Coordination and Integration',
    classId: 'class-11',
    questionCount: 100,
  },
  // Class 12 Chapters
  {
    id: 'ch-12-1',
    name: 'Reproduction in Organisms',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-2',
    name: 'Sexual Reproduction in Flowering Plants',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-3',
    name: 'Human Reproduction',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-4',
    name: 'Reproductive Health',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-5',
    name: 'Principles of Inheritance and Variation',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-6',
    name: 'Molecular Basis of Inheritance',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-7',
    name: 'Evolution',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-8',
    name: 'Human Health and Disease',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-9',
    name: 'Strategies for Enhancement in Food Production',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-10',
    name: 'Microbes in Human Welfare',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-11',
    name: 'Biotechnology: Principles and Processes',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-12',
    name: 'Biotechnology and its Applications',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-13',
    name: 'Organisms and Populations',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-14',
    name: 'Ecosystem',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-15',
    name: 'Biodiversity and Conservation',
    classId: 'class-12',
    questionCount: 100,
  },
  {
    id: 'ch-12-16',
    name: 'Environmental Issues',
    classId: 'class-12',
    questionCount: 100,
  },
]

export const getChaptersByClass = (classId: 'class-11' | 'class-12') => {
  return quizChapters.filter((ch) => ch.classId === classId)
}
