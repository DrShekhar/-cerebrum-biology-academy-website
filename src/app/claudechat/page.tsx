'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Send } from 'lucide-react'

interface Message {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
}

export default function ClaudeChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        'Hello! I am Ceri AI, your Biology Assistant. What Biology topic would you like to study today?',
      type: 'ai',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [language, setLanguage] = useState<'english' | 'hindi' | 'hinglish'>('english')

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    const responses = {
      english: {
        cell: 'Cell division is a fundamental biological process where one parent cell divides to form two identical daughter cells. The main types are mitosis (for growth and repair) and meiosis (for gamete formation). Key phases of mitosis include prophase, metaphase, anaphase, and telophase. The cell cycle is regulated by checkpoints to ensure proper division.',
        photosynthesis:
          'Photosynthesis converts light energy into chemical energy in plants. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. It occurs in two stages: light reactions (in thylakoids) produce ATP and NADPH, while dark reactions (Calvin cycle in stroma) fix CO₂ into glucose. Chlorophyll captures light energy.',
        dna: "DNA (Deoxyribonucleic acid) has a double helix structure discovered by Watson and Crick in 1953. It contains four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). Base pairing follows Chargaff's rules: A pairs with T, G pairs with C. DNA stores and transmits genetic information through its sequence of bases.",
        neet: 'NEET Biology syllabus covers 360 marks (50% of total). Major topics: Diversity in Living World, Structural Organization, Cell Structure, Plant Physiology, Human Physiology, Reproduction, Genetics, Evolution, Biology and Human Welfare, Biotechnology, and Ecology. Focus on NCERT textbooks and practice previous year questions.',
        default:
          'Biology is the study of living organisms and their interactions. Core branches include Botany (plant biology), Zoology (animal biology), Genetics (heredity), Ecology (environmental interactions), Evolution (species development), Cell Biology (cellular processes), and Molecular Biology (biomolecules). Each field interconnects to explain life processes.',
      },
      hindi: {
        cell: 'कोशिका विभाजन एक मौलिक जैविक प्रक्रिया है जहाँ एक मूल कोशिका दो समान संतति कोशिकाओं में विभाजित होती है। मुख्य प्रकार हैं माइटोसिस (वृद्धि और मरम्मत के लिए) और मियोसिस (युग्मक निर्माण के लिए)। माइटोसिस के मुख्य चरण हैं: प्रोफेज, मेटाफेज, एनाफेज, और टेलोफेज।',
        photosynthesis:
          'प्रकाश संश्लेषण पौधों में प्रकाश ऊर्जा को रासायनिक ऊर्जा में परिवर्तित करने की प्रक्रिया है। समीकरण: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂। यह दो चरणों में होता है: प्रकाश अभिक्रिया (थाइलाकॉइड में) और अंधकार अभिक्रिया (कैल्विन चक्र)।',
        dna: 'डीएनए (डिऑक्सीराइबोन्यूक्लिक एसिड) की डबल हेलिक्स संरचना है। इसमें चार नाइट्रोजनस बेस हैं: एडेनिन (A), थाइमिन (T), ग्वानिन (G), और साइटोसिन (C)। बेस युग्मन नियम: A-T और G-C। डीएनए आनुवंशिक जानकारी संग्रहीत करता है।',
        neet: 'नीट जीव विज्ञान में 360 अंक हैं (कुल का 50%)। मुख्य विषय: जीवन की विविधता, संरचनात्मक संगठन, कोशिका संरचना, पादप शरीरक्रिया, मानव शरीरक्रिया, प्रजनन, आनुवंशिकता, विकास, जैव प्रौद्योगिकी और पारिस्थितिकी।',
        default:
          'जीव विज्ञान जीवित जीवों और उनकी अंतर्क्रियाओं का अध्ययन है। मुख्य शाखाएं हैं: वनस्पति विज्ञान, जंतु विज्ञान, आनुवंशिकता, पारिस्थितिकी, विकास, कोशिका जीव विज्ञान और आणविक जीव विज्ञान।',
      },
      hinglish: {
        cell: 'Cell division एक fundamental biological process है जहाँ एक parent cell दो identical daughter cells में divide होती है। Main types हैं mitosis (growth और repair के लिए) और meiosis (gamete formation के लिए)। Mitosis के key phases हैं: prophase, metaphase, anaphase, और telophase।',
        photosynthesis:
          'Photosynthesis plants में light energy को chemical energy में convert करने का process है। Equation है: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂। यह two stages में होता है: light reactions (thylakoids में) और dark reactions (Calvin cycle)।',
        dna: 'DNA (Deoxyribonucleic acid) की double helix structure है जो Watson और Crick ने 1953 में discover की थी। इसमें four nitrogenous bases हैं: A, T, G, C। Base pairing rules: A-T और G-C। DNA genetic information store और transmit करता है।',
        neet: 'NEET Biology में 360 marks हैं total 720 में से (50%)। Major topics include: Diversity in Living World, Cell Structure, Plant Physiology, Human Physiology, Reproduction, Genetics, Evolution, Biotechnology, और Ecology। NCERT textbooks पर focus करें।',
        default:
          'Biology living organisms और unki interactions का study है। Core branches include: Botany (plant biology), Zoology (animal biology), Genetics (heredity), Ecology (environment), Evolution (species development), Cell Biology, और Molecular Biology। हर field interconnected है।',
      },
    }

    const currentResponses = responses[language]

    // Biology topic responses
    if (
      input.includes('cell') ||
      input.includes('कोशिका') ||
      input.includes('mitosis') ||
      input.includes('meiosis')
    ) {
      return currentResponses.cell
    }

    if (
      input.includes('photosynthesis') ||
      input.includes('प्रकाश संश्लेषण') ||
      input.includes('chlorophyll') ||
      input.includes('calvin cycle')
    ) {
      return currentResponses.photosynthesis
    }

    if (
      input.includes('dna') ||
      input.includes('डीएनए') ||
      input.includes('gene') ||
      input.includes('chromosome')
    ) {
      return currentResponses.dna
    }

    if (
      input.includes('neet') ||
      input.includes('नीट') ||
      input.includes('exam') ||
      input.includes('syllabus')
    ) {
      return currentResponses.neet
    }

    // Additional specific topics
    if (input.includes('respiration') || input.includes('breathing')) {
      return language === 'english'
        ? 'Cellular respiration is the process of breaking down glucose to produce ATP energy. It occurs in three stages: Glycolysis (in cytoplasm), Krebs cycle (in mitochondrial matrix), and Electron transport chain (in inner mitochondrial membrane). The overall equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.'
        : 'श्वसन एक महत्वपूर्ण प्रक्रिया है जिसमें ग्लूकोज टूटकर ATP ऊर्जा बनाता है।'
    }

    if (input.includes('ecosystem') || input.includes('ecology')) {
      return language === 'english'
        ? 'An ecosystem consists of biotic (living) and abiotic (non-living) components. Energy flow is unidirectional through trophic levels: Producers → Primary consumers → Secondary consumers → Tertiary consumers. Nutrient cycling occurs through biogeochemical cycles like carbon, nitrogen, and phosphorus cycles.'
        : 'पारिस्थितिकी तंत्र जैविक और अजैविक घटकों से मिलकर बना होता है।'
    }

    if (input.includes('evolution') || input.includes('darwin')) {
      return language === 'english'
        ? "Evolution is the change in species over time through natural selection. Darwin's theory proposes that organisms with favorable traits survive and reproduce more successfully. Evidence includes fossil records, comparative anatomy, embryology, and molecular biology. Modern synthesis combines Darwin's theory with genetics."
        : 'विकास प्राकृतिक चयन के माध्यम से समय के साथ प्रजातियों में परिवर्तन है।'
    }

    return currentResponses.default
  }

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return

    const currentInput = inputMessage
    const userMessageId = `user-${Date.now()}-${Math.random()}`
    const userMessage: Message = {
      id: userMessageId,
      content: currentInput,
      type: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsThinking(true)

    try {
      // Call the real AI API instead of using hardcoded responses
      const response = await fetch('/api/ai/unified-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          context: {
            subject: 'Biology',
            studentLevel: 'class-12',
            language: language,
            conversationHistory: messages.slice(-5).map((m) => ({
              role: m.type === 'user' ? 'user' : 'assistant',
              content: m.content,
            })),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      const aiMessageId = `ai-${Date.now()}-${Math.random()}`
      const aiMessage: Message = {
        id: aiMessageId,
        content: data.response || data.message || 'Sorry, I could not process your request.',
        type: 'ai',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Chat Error:', error)

      // Fallback to hardcoded response on error
      const fallbackResponse = generateAIResponse(currentInput)
      const aiMessageId = `ai-${Date.now()}-${Math.random()}`
      const aiMessage: Message = {
        id: aiMessageId,
        content: `⚠️ AI service temporarily unavailable. Using offline mode:\n\n${fallbackResponse}`,
        type: 'ai',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsThinking(false)
    }
  }, [inputMessage, language, messages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Ceri AI - Biology Assistant</h1>
              <p className="text-sm text-gray-600">AI-Powered Biology Learning with Shekhar Sir</p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'english' | 'hindi' | 'hinglish')}
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-green-400 to-teal-500 text-white'
                      : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                  }`}
                >
                  {message.type === 'user' ? '👨‍🎓' : '🤖'}
                </div>

                {/* Message */}
                <div
                  className={`p-4 rounded-2xl shadow-md ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-xs">🤖</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-md flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Ceri AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="flex-1 bg-gray-100 rounded-xl p-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about Biology in Hindi, English, or Hinglish..."
              className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
            />
          </div>

          <button
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              inputMessage.trim()
                ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white hover:shadow-lg'
                : 'bg-gray-100 text-gray-400'
            }`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
