/**
 * ARIA Sales Agent - Translations
 * Hindi and English translations for UI elements
 */

import type { Language } from './types'

export const ariaTranslations: Record<Language, Record<string, string>> = {
  en: {
    greeting:
      "Hi! I'm ARIA, your personal guide to Cerebrum Biology Academy. How can I help you today?",
    bookDemo: 'Book Demo',
    whatsApp: 'WhatsApp',
    callMe: 'Call Me',
    continueOnWhatsApp: 'Continue on WhatsApp',
    typePlaceholder: 'Type your message...',
    namePlaceholder: 'Enter your name...',
    phonePlaceholder: 'Enter 10-digit mobile number...',
    classPlaceholder: '11th, 12th, or Dropper...',
    stepName: 'Step 1/3: Your name',
    stepPhone: 'Step 2/3: Phone number',
    stepClass: 'Step 3/3: Student class',
    sending: 'Sending...',
    thinking: 'ARIA is thinking...',
    errorMessage: "Sorry, I couldn't process that. Please try again.",
    connectionError: 'Connection error. Please check your internet.',
    headerTitle: 'ARIA',
    headerSubtitle: 'Your NEET Biology Guide',
    quickActionCourses: 'Tell me about courses',
    quickActionPricing: 'Pricing details',
    quickActionDemo: 'Book a demo',
    quickActionWhy: 'Why Cerebrum?',
    closedMessage: 'Chat ended. Click to start a new conversation.',
    offlineNotice: 'Our counselors are available 9 AM - 9 PM. Leave a message!',
    thankYouLead: 'Thank you! Our counselor will call you within 30 minutes.',
    invalidPhone: 'Please enter a valid 10-digit Indian mobile number.',
    invalidName: 'Please enter a valid name (2-50 characters, letters only).',
    invalidClass: 'Please enter a valid class: 9, 10, 11, 12, or Dropper.',
    selectTime: 'Select a convenient time:',
    morning: 'Morning (9-12)',
    afternoon: 'Afternoon (12-5)',
    evening: 'Evening (5-9)',
    confirmBooking: 'Confirm booking?',
    bookingConfirmed: 'Demo booked! Check your WhatsApp for details.',
    languageToggle: 'हिंदी',
    proactiveExit: 'Wait! Let me help you find the right NEET Biology program. Quick question?',
    proactiveTime: "👋 Hi! I noticed you're exploring our courses. Can I help with any questions?",
    proactiveScroll:
      'Interested in our NEET Biology coaching? I can help you find the perfect fit!',
    proactivePricing: 'Looking at pricing? Let me help you find the best value option!',
    proactiveReturn: 'Welcome back! Ready to take the next step toward NEET success?',
    dontShowAgain: "Don't show again",
  },
  hi: {
    greeting:
      'नमस्ते! मैं ARIA हूं, Cerebrum Biology Academy की आपकी personal guide। आज मैं आपकी कैसे मदद कर सकती हूं?',
    bookDemo: 'डेमो बुक करें',
    whatsApp: 'WhatsApp',
    callMe: 'कॉल करें',
    continueOnWhatsApp: 'WhatsApp पर बात करें',
    typePlaceholder: 'अपना संदेश लिखें...',
    namePlaceholder: 'अपना नाम लिखें...',
    phonePlaceholder: '10 अंकों का मोबाइल नंबर...',
    classPlaceholder: '11वीं, 12वीं, या ड्रॉपर...',
    stepName: 'स्टेप 1/3: आपका नाम',
    stepPhone: 'स्टेप 2/3: फ़ोन नंबर',
    stepClass: 'स्टेप 3/3: छात्र की क्लास',
    sending: 'भेज रहे हैं...',
    thinking: 'ARIA सोच रही है...',
    errorMessage: 'माफ़ कीजिए, कुछ गड़बड़ हुई। कृपया फिर से कोशिश करें।',
    connectionError: 'कनेक्शन एरर। कृपया इंटरनेट चेक करें।',
    headerTitle: 'ARIA',
    headerSubtitle: 'आपकी NEET Biology गाइड',
    quickActionCourses: 'कोर्स के बारे में बताएं',
    quickActionPricing: 'फीस की जानकारी',
    quickActionDemo: 'डेमो बुक करें',
    quickActionWhy: 'Cerebrum क्यों?',
    closedMessage: 'चैट समाप्त। नई बातचीत शुरू करने के लिए क्लिक करें।',
    offlineNotice: 'हमारे काउंसलर 9 AM - 9 PM उपलब्ध हैं। संदेश छोड़ें!',
    thankYouLead: 'धन्यवाद! हमारे काउंसलर 30 मिनट में आपको कॉल करेंगे।',
    invalidPhone: 'कृपया सही 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।',
    invalidName: 'कृपया सही नाम दर्ज करें (2-50 अक्षर, केवल अक्षर)।',
    invalidClass: 'कृपया सही क्लास दर्ज करें: 9, 10, 11, 12, या ड्रॉपर।',
    selectTime: 'सुविधाजनक समय चुनें:',
    morning: 'सुबह (9-12)',
    afternoon: 'दोपहर (12-5)',
    evening: 'शाम (5-9)',
    confirmBooking: 'बुकिंग कंफर्म करें?',
    bookingConfirmed: 'डेमो बुक हो गया! WhatsApp पर डिटेल्स देखें।',
    languageToggle: 'English',
    proactiveExit: 'रुकिए! सही NEET Biology प्रोग्राम खोजने में मदद करूं। एक छोटा सा सवाल?',
    proactiveTime: '👋 नमस्ते! मैंने देखा आप हमारे courses देख रहे हैं। कोई सवाल है?',
    proactiveScroll: 'NEET Biology coaching में interested हैं? सही program खोजने में मदद करूं!',
    proactivePricing: 'Pricing देख रहे हैं? Best value option खोजने में मदद करूं!',
    proactiveReturn: 'वापस आने पर स्वागत है! NEET success की तरफ अगला कदम बढ़ाने के लिए तैयार?',
    dontShowAgain: 'फिर मत दिखाना',
  },
}

export const getTranslation = (key: string, language: Language = 'en'): string => {
  return ariaTranslations[language][key] || ariaTranslations['en'][key] || key
}

export const detectLanguage = (text: string): Language => {
  const hindiPattern = /[\u0900-\u097F]/
  return hindiPattern.test(text) ? 'hi' : 'en'
}
