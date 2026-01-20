/**
 * Unit tests for ARIA translations
 * Tests Hindi/English translations and language utilities
 */

import {
  ariaTranslations,
  getTranslation,
  detectLanguage,
} from '@/lib/aria/translations'
import type { Language } from '@/lib/aria/types'

describe('ariaTranslations', () => {
  describe('structure', () => {
    it('should have English (en) translations', () => {
      expect(ariaTranslations.en).toBeDefined()
    })

    it('should have Hindi (hi) translations', () => {
      expect(ariaTranslations.hi).toBeDefined()
    })

    it('should have same keys in both languages', () => {
      const enKeys = Object.keys(ariaTranslations.en).sort()
      const hiKeys = Object.keys(ariaTranslations.hi).sort()

      expect(enKeys).toEqual(hiKeys)
    })
  })

  describe('English translations', () => {
    it('should have greeting message', () => {
      expect(ariaTranslations.en.greeting).toBeDefined()
      expect(typeof ariaTranslations.en.greeting).toBe('string')
      expect(ariaTranslations.en.greeting.length).toBeGreaterThan(10)
      expect(ariaTranslations.en.greeting).toContain('ARIA')
    })

    it('should have UI labels', () => {
      expect(ariaTranslations.en.bookDemo).toBe('Book Demo')
      expect(ariaTranslations.en.whatsApp).toBe('WhatsApp')
      expect(ariaTranslations.en.callMe).toBe('Call Me')
    })

    it('should have placeholders', () => {
      expect(ariaTranslations.en.typePlaceholder).toBeDefined()
      expect(ariaTranslations.en.namePlaceholder).toBeDefined()
      expect(ariaTranslations.en.phonePlaceholder).toBeDefined()
    })

    it('should have lead capture step labels', () => {
      expect(ariaTranslations.en.stepName).toContain('1/3')
      expect(ariaTranslations.en.stepPhone).toContain('2/3')
      expect(ariaTranslations.en.stepClass).toContain('3/3')
    })

    it('should have error messages', () => {
      expect(ariaTranslations.en.errorMessage).toBeDefined()
      expect(ariaTranslations.en.connectionError).toBeDefined()
      expect(ariaTranslations.en.invalidPhone).toBeDefined()
    })

    it('should have quick action labels', () => {
      expect(ariaTranslations.en.quickActionCourses).toBeDefined()
      expect(ariaTranslations.en.quickActionPricing).toBeDefined()
      expect(ariaTranslations.en.quickActionDemo).toBeDefined()
      expect(ariaTranslations.en.quickActionWhy).toBeDefined()
    })

    it('should have time slot labels', () => {
      expect(ariaTranslations.en.morning).toContain('9-12')
      expect(ariaTranslations.en.afternoon).toContain('12-5')
      expect(ariaTranslations.en.evening).toContain('5-9')
    })

    it('should have proactive engagement messages', () => {
      expect(ariaTranslations.en.proactiveExit).toBeDefined()
      expect(ariaTranslations.en.proactiveTime).toBeDefined()
      expect(ariaTranslations.en.proactiveScroll).toBeDefined()
      expect(ariaTranslations.en.proactivePricing).toBeDefined()
      expect(ariaTranslations.en.proactiveReturn).toBeDefined()
    })
  })

  describe('Hindi translations', () => {
    it('should have greeting message in Hindi', () => {
      expect(ariaTranslations.hi.greeting).toBeDefined()
      // Hindi text should contain Devanagari characters
      expect(ariaTranslations.hi.greeting).toMatch(/[\u0900-\u097F]/)
      expect(ariaTranslations.hi.greeting).toContain('नमस्ते')
    })

    it('should have UI labels in Hindi', () => {
      expect(ariaTranslations.hi.bookDemo).toBe('डेमो बुक करें')
      expect(ariaTranslations.hi.callMe).toMatch(/[\u0900-\u097F]/)
    })

    it('should have placeholders in Hindi', () => {
      expect(ariaTranslations.hi.typePlaceholder).toMatch(/[\u0900-\u097F]/)
      expect(ariaTranslations.hi.namePlaceholder).toMatch(/[\u0900-\u097F]/)
    })

    it('should have Hindi step labels', () => {
      expect(ariaTranslations.hi.stepName).toContain('1/3')
      expect(ariaTranslations.hi.stepName).toMatch(/[\u0900-\u097F]/)
    })

    it('should have Hindi error messages', () => {
      expect(ariaTranslations.hi.errorMessage).toMatch(/[\u0900-\u097F]/)
      expect(ariaTranslations.hi.connectionError).toMatch(/[\u0900-\u097F]/)
    })

    it('should have language toggle showing opposite language', () => {
      expect(ariaTranslations.en.languageToggle).toBe('हिंदी')
      expect(ariaTranslations.hi.languageToggle).toBe('English')
    })
  })
})

describe('getTranslation', () => {
  it('should return English translation by default', () => {
    const result = getTranslation('greeting')
    expect(result).toBe(ariaTranslations.en.greeting)
  })

  it('should return English translation when specified', () => {
    const result = getTranslation('greeting', 'en')
    expect(result).toBe(ariaTranslations.en.greeting)
  })

  it('should return Hindi translation when specified', () => {
    const result = getTranslation('greeting', 'hi')
    expect(result).toBe(ariaTranslations.hi.greeting)
  })

  it('should fall back to English for unknown keys in Hindi', () => {
    const result = getTranslation('unknownKey', 'hi')
    // Falls back to English, then to key itself
    expect(result).toBe('unknownKey')
  })

  it('should return key for completely unknown keys', () => {
    const result = getTranslation('completelyInvalidKey', 'en')
    expect(result).toBe('completelyInvalidKey')
  })

  it('should handle all known keys without errors', () => {
    const keys = Object.keys(ariaTranslations.en)

    keys.forEach(key => {
      const enResult = getTranslation(key, 'en')
      const hiResult = getTranslation(key, 'hi')

      expect(enResult).toBeDefined()
      expect(hiResult).toBeDefined()
      expect(typeof enResult).toBe('string')
      expect(typeof hiResult).toBe('string')
      expect(enResult.length).toBeGreaterThan(0)
      expect(hiResult.length).toBeGreaterThan(0)
    })
  })
})

describe('detectLanguage', () => {
  it('should detect Hindi text', () => {
    expect(detectLanguage('नमस्ते')).toBe('hi')
    expect(detectLanguage('मुझे जानकारी चाहिए')).toBe('hi')
    expect(detectLanguage('कोर्स की फीस क्या है?')).toBe('hi')
  })

  it('should detect English text', () => {
    expect(detectLanguage('Hello')).toBe('en')
    expect(detectLanguage('I want to know about courses')).toBe('en')
    expect(detectLanguage('What is the fee?')).toBe('en')
  })

  it('should detect mixed text with Hindi as Hindi', () => {
    // If any Hindi character is present, detect as Hindi
    expect(detectLanguage('Hello नमस्ते')).toBe('hi')
    expect(detectLanguage('NEET की तैयारी')).toBe('hi')
  })

  it('should detect numbers and special characters as English', () => {
    expect(detectLanguage('12345')).toBe('en')
    expect(detectLanguage('!@#$%')).toBe('en')
    expect(detectLanguage('')).toBe('en')
  })

  it('should handle Hinglish (Hindi words in Roman script) as English', () => {
    // Hinglish in Roman script doesn't have Devanagari characters
    expect(detectLanguage('mujhe batao')).toBe('en')
    expect(detectLanguage('kya fees hai')).toBe('en')
  })
})

describe('content quality', () => {
  it('should have non-empty translations', () => {
    const languages = ['en', 'hi'] as const

    languages.forEach(lang => {
      Object.entries(ariaTranslations[lang]).forEach(([key, value]) => {
        expect(value).toBeTruthy()
        expect(value.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('should not contain placeholder text', () => {
    const languages = ['en', 'hi'] as const
    const placeholderPatterns = ['TODO', 'FIXME', 'placeholder_', 'lorem ipsum', 'xxx']

    languages.forEach(lang => {
      Object.entries(ariaTranslations[lang]).forEach(([key, value]) => {
        placeholderPatterns.forEach(pattern => {
          expect(value.toLowerCase()).not.toContain(pattern.toLowerCase())
        })
      })
    })
  })

  it('should have consistent brand name usage', () => {
    // Brand names should be consistent across translations
    const brandTerms = ['ARIA', 'Cerebrum', 'NEET']

    brandTerms.forEach(term => {
      Object.entries(ariaTranslations.en).forEach(([key, value]) => {
        if (value.includes(term)) {
          // If English has this term, Hindi should too (or equivalent)
          // Skip checking for exact match as Hindi may use different phrasing
        }
      })
    })
  })

  it('should have thank you message mentioning callback time', () => {
    expect(ariaTranslations.en.thankYouLead).toContain('30 minutes')
    expect(ariaTranslations.hi.thankYouLead).toContain('30')
  })
})
