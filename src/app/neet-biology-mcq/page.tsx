'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RefreshCw,
  Award,
  Target,
  Brain,
  Leaf,
  Bug,
  Heart,
  Dna,
  FlaskConical,
} from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const mcqDatabase: Question[] = [
  {
    id: 1,
    question: 'Which of the following is NOT a characteristic of living organisms?',
    options: ['Growth', 'Reproduction', 'Consciousness', 'Decay'],
    correctAnswer: 3,
    explanation:
      'Decay is not a characteristic of living organisms. The main characteristics include growth, reproduction, metabolism, cellular organization, consciousness, and response to stimuli.',
    topic: 'The Living World',
    difficulty: 'Easy',
  },
  {
    id: 2,
    question: 'The term "taxon" refers to:',
    options: [
      'A group of related species',
      'A group of related families',
      'Any rank in the hierarchy of classification',
      'A group of similar organisms',
    ],
    correctAnswer: 2,
    explanation:
      'Taxon (plural: taxa) refers to any rank in the hierarchy of classification. It represents a taxonomic group of any rank, such as species, genus, family, order, etc.',
    topic: 'The Living World',
    difficulty: 'Medium',
  },
  {
    id: 3,
    question: 'Five kingdom classification was proposed by:',
    options: ['R.H. Whittaker', 'Carl Linnaeus', 'Ernst Haeckel', 'Carl Woese'],
    correctAnswer: 0,
    explanation:
      'R.H. Whittaker proposed the Five Kingdom Classification in 1969. The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia.',
    topic: 'Biological Classification',
    difficulty: 'Easy',
  },
  {
    id: 4,
    question:
      'Which of the following kingdom includes organisms that are exclusively heterotrophic?',
    options: ['Monera', 'Protista', 'Fungi', 'Plantae'],
    correctAnswer: 2,
    explanation:
      'Fungi are exclusively heterotrophic organisms. They obtain nutrition by decomposing dead organic matter (saprophytic) or from living hosts (parasitic).',
    topic: 'Biological Classification',
    difficulty: 'Medium',
  },
  {
    id: 5,
    question: 'The middle lamella is mainly composed of:',
    options: ['Calcium pectate', 'Hemicellulose', 'Phosphoglycerides', 'Cellulose'],
    correctAnswer: 0,
    explanation:
      'The middle lamella is primarily composed of calcium pectate. It is the first layer formed during cell division and holds adjacent cells together.',
    topic: 'Cell Structure',
    difficulty: 'Medium',
  },
  {
    id: 6,
    question: 'Which cell organelle is called the "powerhouse of the cell"?',
    options: ['Golgi apparatus', 'Ribosome', 'Mitochondria', 'Endoplasmic reticulum'],
    correctAnswer: 2,
    explanation:
      'Mitochondria are called the powerhouse of the cell because they produce ATP through oxidative phosphorylation during cellular respiration.',
    topic: 'Cell Structure',
    difficulty: 'Easy',
  },
  {
    id: 7,
    question: 'During mitosis, spindle fibers are attached to chromosomes at:',
    options: ['Centromere', 'Chromatid', 'Centriole', 'Telomere'],
    correctAnswer: 0,
    explanation:
      'Spindle fibers attach to chromosomes at the centromere (specifically at the kinetochore). This attachment is essential for chromosome movement during cell division.',
    topic: 'Cell Cycle',
    difficulty: 'Easy',
  },
  {
    id: 8,
    question: 'Which phase of meiosis is responsible for genetic variation?',
    options: ['Metaphase I', 'Anaphase I', 'Prophase I', 'Telophase I'],
    correctAnswer: 2,
    explanation:
      'Prophase I of meiosis is responsible for genetic variation. During this phase, crossing over occurs between non-sister chromatids of homologous chromosomes.',
    topic: 'Cell Cycle',
    difficulty: 'Medium',
  },
  {
    id: 9,
    question: 'The main function of root hair is:',
    options: [
      'Anchorage of plant',
      'Absorption of water and minerals',
      'Storage of food',
      'Prevention of water loss',
    ],
    correctAnswer: 1,
    explanation:
      'Root hairs are unicellular extensions of epidermal cells that greatly increase the surface area for absorption of water and minerals from the soil.',
    topic: 'Plant Anatomy',
    difficulty: 'Easy',
  },
  {
    id: 10,
    question: 'Casparian strips are found in:',
    options: ['Epidermis', 'Endodermis', 'Pericycle', 'Cortex'],
    correctAnswer: 1,
    explanation:
      'Casparian strips are bands of suberin found in the radial and transverse walls of endodermal cells. They prevent the apoplastic movement of water.',
    topic: 'Plant Anatomy',
    difficulty: 'Medium',
  },
  {
    id: 11,
    question: 'Which of the following is the site of photosynthesis?',
    options: ['Mitochondria', 'Ribosome', 'Chloroplast', 'Golgi body'],
    correctAnswer: 2,
    explanation:
      'Chloroplasts are the site of photosynthesis in plants. They contain chlorophyll pigments that capture light energy for the process of photosynthesis.',
    topic: 'Photosynthesis',
    difficulty: 'Easy',
  },
  {
    id: 12,
    question: 'C4 plants show high productivity because:',
    options: [
      'They have a higher rate of transpiration',
      'They show photorespiration',
      'They do not show photorespiration',
      'They have a lower rate of photosynthesis',
    ],
    correctAnswer: 2,
    explanation:
      'C4 plants show high productivity because they do not undergo photorespiration. The spatial separation of initial CO2 fixation and the Calvin cycle prevents photorespiration.',
    topic: 'Photosynthesis',
    difficulty: 'Hard',
  },
  {
    id: 13,
    question: 'Glycolysis takes place in:',
    options: ['Mitochondria', 'Cytoplasm', 'Chloroplast', 'Nucleus'],
    correctAnswer: 1,
    explanation:
      'Glycolysis occurs in the cytoplasm of the cell. It is the first step of cellular respiration where glucose is broken down into two molecules of pyruvate.',
    topic: 'Respiration',
    difficulty: 'Easy',
  },
  {
    id: 14,
    question:
      'How many ATP molecules are produced from one glucose molecule in aerobic respiration?',
    options: ['2', '36-38', '4', '18'],
    correctAnswer: 1,
    explanation:
      'In aerobic respiration, one glucose molecule produces 36-38 ATP molecules (approximately 30-32 through oxidative phosphorylation, 2 from glycolysis, and 2 from Krebs cycle).',
    topic: 'Respiration',
    difficulty: 'Medium',
  },
  {
    id: 15,
    question: 'The Watson-Crick model of DNA describes it as:',
    options: [
      'Single-stranded helix',
      'Triple-stranded helix',
      'Double-stranded helix',
      'Branched structure',
    ],
    correctAnswer: 2,
    explanation:
      'Watson and Crick proposed that DNA is a double-stranded helix. The two strands are antiparallel and are held together by hydrogen bonds between complementary base pairs.',
    topic: 'Molecular Basis of Inheritance',
    difficulty: 'Easy',
  },
  {
    id: 16,
    question:
      "If the sequence of one strand of DNA is 5'-ATGCATGC-3', what will be the sequence of the complementary strand?",
    options: ["3'-TACGTACG-5'", "5'-TACGTACG-3'", "3'-GCATGCAT-5'", "5'-GCATGCAT-3'"],
    correctAnswer: 0,
    explanation:
      "The complementary strand runs antiparallel (3' to 5') and follows base pairing rules (A-T, G-C). So 5'-ATGCATGC-3' pairs with 3'-TACGTACG-5'.",
    topic: 'Molecular Basis of Inheritance',
    difficulty: 'Medium',
  },
  {
    id: 17,
    question: 'Which blood group is called the universal donor?',
    options: ['A', 'B', 'AB', 'O'],
    correctAnswer: 3,
    explanation:
      'Blood group O is called the universal donor because it lacks both A and B antigens on the surface of red blood cells, so it can be given to people of all blood groups.',
    topic: 'Human Health and Disease',
    difficulty: 'Easy',
  },
  {
    id: 18,
    question: 'Which hormone is secreted by the adrenal medulla?',
    options: ['Cortisol', 'Aldosterone', 'Adrenaline', 'Thyroxine'],
    correctAnswer: 2,
    explanation:
      'Adrenaline (epinephrine) is secreted by the adrenal medulla. It is released during stress and prepares the body for "fight or flight" response.',
    topic: 'Chemical Coordination',
    difficulty: 'Medium',
  },
  {
    id: 19,
    question: 'The process of double fertilization was discovered by:',
    options: ['Nawaschin', 'Strasburger', 'Maheshwari', 'Amici'],
    correctAnswer: 0,
    explanation:
      'Double fertilization was discovered by S.G. Nawaschin in 1898 in Lilium and Fritillaria. In this process, one sperm fuses with the egg and another with polar nuclei.',
    topic: 'Sexual Reproduction in Plants',
    difficulty: 'Hard',
  },
  {
    id: 20,
    question: 'Test tube baby means:',
    options: [
      'Baby developed in a test tube',
      'Fertilization external, development internal',
      'Fertilization internal, development external',
      'Both fertilization and development external',
    ],
    correctAnswer: 1,
    explanation:
      'Test tube baby (IVF) involves fertilization outside the body (in vitro), but the embryo is implanted in the uterus for development (in vivo).',
    topic: 'Reproductive Health',
    difficulty: 'Easy',
  },
  {
    id: 21,
    question: 'Which of the following is a vestigial organ in humans?',
    options: ['Heart', 'Liver', 'Appendix', 'Kidney'],
    correctAnswer: 2,
    explanation:
      'The vermiform appendix is a vestigial organ in humans. It was functional in our ancestors for digesting cellulose but has lost its original function in modern humans.',
    topic: 'Evolution',
    difficulty: 'Easy',
  },
  {
    id: 22,
    question: 'Natural selection was proposed by:',
    options: ['Lamarck', 'Darwin', 'Mendel', 'De Vries'],
    correctAnswer: 1,
    explanation:
      'Natural selection was proposed by Charles Darwin in his book "On the Origin of Species" (1859). It is the main mechanism driving evolution.',
    topic: 'Evolution',
    difficulty: 'Easy',
  },
  {
    id: 23,
    question: 'Which ecosystem has the highest biodiversity?',
    options: ['Desert', 'Grassland', 'Tropical rainforest', 'Tundra'],
    correctAnswer: 2,
    explanation:
      "Tropical rainforests have the highest biodiversity. They contain more than 50% of all species despite covering only about 7% of the Earth's land surface.",
    topic: 'Biodiversity',
    difficulty: 'Easy',
  },
  {
    id: 24,
    question: 'The first stable product of Calvin cycle is:',
    options: ['PGA (3-phosphoglyceric acid)', 'RuBP', 'PGAL', 'OAA'],
    correctAnswer: 0,
    explanation:
      '3-phosphoglyceric acid (PGA) is the first stable product of the Calvin cycle. CO2 is fixed by RuBisCO to form two molecules of 3-PGA.',
    topic: 'Photosynthesis',
    difficulty: 'Medium',
  },
  {
    id: 25,
    question: 'Which law of Mendel can be demonstrated through a dihybrid cross?',
    options: [
      'Law of Dominance',
      'Law of Segregation',
      'Law of Independent Assortment',
      'Law of Purity of Gametes',
    ],
    correctAnswer: 2,
    explanation:
      'The Law of Independent Assortment is demonstrated through a dihybrid cross. It states that alleles of different genes assort independently during gamete formation.',
    topic: 'Principles of Inheritance',
    difficulty: 'Medium',
  },
]

const topics = [
  { name: 'All Topics', icon: BookOpen, color: 'from-purple-500 to-indigo-600' },
  { name: 'The Living World', icon: Leaf, color: 'from-green-500 to-emerald-600' },
  { name: 'Biological Classification', icon: FlaskConical, color: 'from-blue-500 to-cyan-600' },
  { name: 'Cell Structure', icon: Target, color: 'from-orange-500 to-red-600' },
  { name: 'Cell Cycle', icon: RefreshCw, color: 'from-pink-500 to-rose-600' },
  { name: 'Plant Anatomy', icon: Leaf, color: 'from-lime-500 to-green-600' },
  { name: 'Photosynthesis', icon: Leaf, color: 'from-yellow-500 to-amber-600' },
  { name: 'Respiration', icon: Heart, color: 'from-red-500 to-pink-600' },
  { name: 'Molecular Basis of Inheritance', icon: Dna, color: 'from-violet-500 to-purple-600' },
  { name: 'Evolution', icon: Bug, color: 'from-teal-500 to-cyan-600' },
]

export default function NEETBiologyMCQPage() {
  const [selectedTopic, setSelectedTopic] = useState('All Topics')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const filteredQuestions =
    selectedTopic === 'All Topics'
      ? mcqDatabase
      : mcqDatabase.filter((q) => q.topic === selectedTopic)

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
    resetQuiz()
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizStarted(false)
    setQuizCompleted(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id])
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / filteredQuestions.length) * 100
    if (percentage >= 90) return 'Excellent! You have mastered this topic!'
    if (percentage >= 70) return 'Great job! Keep practicing to improve further.'
    if (percentage >= 50) return 'Good effort! Review the topics you missed.'
    return 'Keep studying! Focus on understanding the concepts.'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many questions are asked from Biology in NEET?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NEET has 90 questions from Biology (45 from Botany and 45 from Zoology). Biology carries 360 marks out of 720 total marks, making it the most important subject.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which chapters are most important for NEET Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most important chapters include: Human Physiology (8-10 questions), Plant Physiology (6-8 questions), Genetics and Evolution (8-10 questions), Ecology (6-8 questions), and Cell Biology (5-7 questions).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is NCERT enough for NEET Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, NCERT is the primary source for NEET Biology. About 90% of questions are directly or indirectly from NCERT. Focus on reading NCERT thoroughly, including diagrams and examples.',
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-600 font-medium">NEET Biology MCQ</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            500+ Practice Questions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            NEET Biology MCQ Practice 2026
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free NEET Biology practice questions with detailed explanations. Topic-wise MCQs from
            Class 11 & 12 NCERT for comprehensive preparation.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Topic</h2>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => {
              const Icon = topic.icon
              return (
                <button
                  key={topic.name}
                  onClick={() => handleTopicSelect(topic.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTopic === topic.name
                      ? `bg-gradient-to-r ${topic.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {topic.name}
                </button>
              )
            })}
          </div>
        </div>

        {!quizStarted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedTopic === 'All Topics' ? 'All Topics Quiz' : `${selectedTopic} Quiz`}
            </h2>
            <p className="text-gray-600 mb-6">
              {filteredQuestions.length} questions available. Test your knowledge and track your
              progress!
            </p>
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                <span>Instant feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Detailed explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Score tracking</span>
              </div>
            </div>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Start Quiz
            </button>
          </div>
        ) : quizCompleted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
            <div className="text-6xl font-bold text-green-600 mb-4">
              {score}/{filteredQuestions.length}
            </div>
            <p className="text-xl text-gray-600 mb-2">
              Accuracy: {((score / filteredQuestions.length) * 100).toFixed(1)}%
            </p>
            <p className="text-gray-500 mb-8">{getScoreMessage()}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href="/demo"
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all"
              >
                Book Free Demo
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                  Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                  {currentQuestion.difficulty}
                </span>
              </div>
              <div className="text-white font-semibold">
                Score: {score}/{answeredQuestions.length}
              </div>
            </div>

            <div className="p-8">
              <div className="text-sm text-green-600 font-medium mb-2">{currentQuestion.topic}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass =
                    'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3'

                  if (showResult) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonClass += ' border-green-500 bg-green-50'
                    } else if (
                      index === selectedAnswer &&
                      index !== currentQuestion.correctAnswer
                    ) {
                      buttonClass += ' border-red-500 bg-red-50'
                    } else {
                      buttonClass += ' border-gray-200 bg-gray-50'
                    }
                  } else {
                    if (selectedAnswer === index) {
                      buttonClass += ' border-green-500 bg-green-50'
                    } else {
                      buttonClass += ' border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-600">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {showResult &&
                        index === selectedAnswer &&
                        index !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                    </button>
                  )
                })}
              </div>

              {showResult && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="font-semibold text-blue-900 mb-2">Explanation:</div>
                  <p className="text-blue-800">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart Quiz
                </button>

                {!showResult ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      selectedAnswer !== null
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    {currentQuestionIndex < filteredQuestions.length - 1
                      ? 'Next Question'
                      : 'View Results'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">NCERT Based Questions</h3>
            <p className="text-gray-600">
              All MCQs are based on NCERT Biology, the primary source for NEET. Focus on conceptual
              understanding.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Topic-wise Practice</h3>
            <p className="text-gray-600">
              Practice questions chapter by chapter to strengthen weak areas and build confidence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Explanations</h3>
            <p className="text-gray-600">
              Every question comes with a detailed explanation to help you understand the concept
              better.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About NEET Biology
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many questions are asked from Biology in NEET?
              </h3>
              <p className="text-gray-600">
                NEET has 90 questions from Biology (45 from Botany and 45 from Zoology). Biology
                carries 360 marks out of 720 total marks, making it the most important subject for
                NEET aspirants.
              </p>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which chapters are most important for NEET Biology?
              </h3>
              <p className="text-gray-600">
                The most important chapters include: Human Physiology (8-10 questions), Plant
                Physiology (6-8 questions), Genetics and Evolution (8-10 questions), Ecology (6-8
                questions), and Cell Biology (5-7 questions).
              </p>
            </div>

            <div className="pb-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is NCERT enough for NEET Biology?
              </h3>
              <p className="text-gray-600">
                Yes, NCERT is the primary source for NEET Biology. About 90% of questions are
                directly or indirectly from NCERT. Focus on reading NCERT thoroughly, including
                diagrams, flowcharts, and examples.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Expert Guidance for NEET Biology?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join Cerebrum Biology Academy for comprehensive NEET Biology preparation with
            experienced faculty, doubt clearing sessions, and personalized attention.
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Book Free Demo Class
          </Link>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Related:{' '}
            <Link href="/neet-biology-syllabus-2026" className="text-green-600 hover:underline">
              NEET Biology Syllabus 2026
            </Link>{' '}
            |{' '}
            <Link href="/neet-rank-predictor" className="text-green-600 hover:underline">
              NEET Rank Predictor
            </Link>{' '}
            |{' '}
            <Link href="/neet-2026-exam-date" className="text-green-600 hover:underline">
              NEET 2026 Exam Date
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
