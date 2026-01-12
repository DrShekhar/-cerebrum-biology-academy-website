/**
 * Study With Me - Constants and Configuration
 */

import type { MotivationalQuote, StudySessionPreferences } from './types'

// Pomodoro Timer Defaults
export const POMODORO_DEFAULTS = {
  studyDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  cyclesBeforeLongBreak: 4,
}

// Memory limits
export const MAX_LAP_TIMES = 10

// Local Storage Keys
export const STORAGE_KEYS = {
  preferences: 'cerebrum-study-preferences',
  stopwatchElapsed: 'cerebrum-study-stopwatch',
  pomodoroState: 'cerebrum-study-pomodoro',
}

// Default Preferences
export const DEFAULT_PREFERENCES: StudySessionPreferences = {
  clockFormat: '12h',
  ambientSound: 'silence',
  volume: 0.5,
  pomodoroStudyDuration: POMODORO_DEFAULTS.studyDuration,
  pomodoroBreakDuration: POMODORO_DEFAULTS.breakDuration,
  pomodoroLongBreakDuration: POMODORO_DEFAULTS.longBreakDuration,
  topicName: 'NEET Biology Focus Session',
}

// Ambient Sound URLs (placeholder - can be replaced with actual URLs)
export const AMBIENT_SOUNDS = {
  lofi: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
  nature: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3',
  silence: null,
}

// Phase Colors
export const PHASE_COLORS = {
  study: {
    primary: '#22c55e',
    bg: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
    light: 'bg-green-50',
  },
  break: {
    primary: '#3b82f6',
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    light: 'bg-blue-50',
  },
  longBreak: {
    primary: '#a855f7',
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    border: 'border-purple-500',
    light: 'bg-purple-50',
  },
  idle: {
    primary: '#6b7280',
    bg: 'bg-gray-500',
    text: 'text-gray-500',
    border: 'border-gray-500',
    light: 'bg-gray-50',
  },
}

// Motivational Quotes for NEET Students
export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    text: 'Biology is the study of life itself. Master it, and master your future.',
    author: 'Cerebrum Biology',
    category: 'biology',
  },
  {
    text: 'Every cell you study today brings you closer to becoming a doctor tomorrow.',
    author: 'NEET Topper',
    category: 'motivation',
  },
  {
    text: 'The mitochondria is the powerhouse of the cell, and YOU are the powerhouse of your dreams.',
    author: 'Cerebrum Biology',
    category: 'biology',
  },
  {
    text: 'Success in NEET is not about being the smartest. It is about being the most consistent.',
    author: 'Dr. Shekhar',
    category: 'persistence',
  },
  {
    text: 'Your brain has 86 billion neurons working for you. Use them wisely today.',
    author: 'Neuroscience Fact',
    category: 'biology',
  },
  {
    text: 'The only way to do great work is to love what you do. Love Biology, ace NEET.',
    author: 'Inspired by Steve Jobs',
    category: 'motivation',
  },
  {
    text: 'DNA never lies, and neither does hard work. Keep studying!',
    author: 'Cerebrum Biology',
    category: 'biology',
  },
  {
    text: 'A journey of 720 marks begins with a single concept mastered.',
    author: 'NEET Wisdom',
    category: 'persistence',
  },
  {
    text: 'Evolution favors the prepared mind. Prepare yours for NEET.',
    author: 'Inspired by Darwin',
    category: 'biology',
  },
  {
    text: 'Your future patients are waiting for you. Do not let them down.',
    author: 'Medical Motivation',
    category: 'motivation',
  },
  {
    text: 'Photosynthesis converts light into life. Convert your study time into success.',
    author: 'Cerebrum Biology',
    category: 'biology',
  },
  {
    text: 'Small daily improvements lead to stunning results. Study consistently.',
    author: 'Robin Sharma',
    category: 'persistence',
  },
  {
    text: 'The human body has 206 bones. Build your career on a strong foundation of knowledge.',
    author: 'Anatomy Wisdom',
    category: 'biology',
  },
  {
    text: 'NEET is not a sprint, it is a marathon. Pace yourself but never stop.',
    author: 'Cerebrum Biology',
    category: 'persistence',
  },
  {
    text: 'Like enzymes, be specific in your goals and efficient in your actions.',
    author: 'Biochemistry Lesson',
    category: 'biology',
  },
  {
    text: 'Today is pain, tomorrow is gain. Your MBBS seat is waiting.',
    author: 'NEET Motivation',
    category: 'motivation',
  },
  {
    text: 'Genetics gave you potential. Hard work will unlock it.',
    author: 'Cerebrum Biology',
    category: 'biology',
  },
  {
    text: 'The best time to plant a tree was 20 years ago. The second best time is NOW. Start studying!',
    author: 'Chinese Proverb',
    category: 'persistence',
  },
  {
    text: 'Your brain forms new synapses with every concept you learn. Grow smarter today.',
    author: 'Neuroplasticity Fact',
    category: 'biology',
  },
  {
    text: 'Believe in yourself. You have survived 100% of your toughest days. NEET is next.',
    author: 'Self-Belief',
    category: 'motivation',
  },
  {
    text: 'Like ATP, be the energy source for your own success.',
    author: 'Cerebrum Biology',
    category: 'biology',
  },
  {
    text: 'Champions are made when nobody is watching. Study hard in silence.',
    author: 'Sports Wisdom',
    category: 'persistence',
  },
  {
    text: 'The immune system protects your body. Let knowledge protect your future.',
    author: 'Immunology Insight',
    category: 'biology',
  },
  {
    text: 'Dreams do not work unless you do. Open your books and start.',
    author: 'John C. Maxwell',
    category: 'motivation',
  },
]

// Quote rotation interval (ms)
export const QUOTE_ROTATION_INTERVAL = 30000

// Live student count mock range
export const MOCK_STUDENT_COUNT = {
  min: 15,
  max: 50,
  updateInterval: 30000,
}
