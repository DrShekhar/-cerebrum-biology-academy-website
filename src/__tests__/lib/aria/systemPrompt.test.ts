/**
 * Unit tests for ARIA system prompt
 * Tests prompt generation, content accuracy, and language support
 */

import { ARIA_SYSTEM_PROMPT, ARIA_SYSTEM_PROMPT_HINDI, getSystemPrompt } from '@/lib/aria/systemPrompt'
import {
  COURSE_TIERS,
  PRICING,
  CONTACT_POINTS,
  USP_POINTS,
  BATCH_TIMINGS,
} from '@/lib/aria/knowledgeBase'

describe('ARIA_SYSTEM_PROMPT', () => {
  it('should be defined and non-empty', () => {
    expect(ARIA_SYSTEM_PROMPT).toBeDefined()
    expect(typeof ARIA_SYSTEM_PROMPT).toBe('string')
    expect(ARIA_SYSTEM_PROMPT.length).toBeGreaterThan(1000) // Substantial prompt
  })

  it('should identify as ARIA', () => {
    expect(ARIA_SYSTEM_PROMPT).toContain('ARIA')
    expect(ARIA_SYSTEM_PROMPT).toContain('friendly educational counselor')
  })

  it('should mention Cerebrum Biology Academy', () => {
    expect(ARIA_SYSTEM_PROMPT).toContain('Cerebrum Biology Academy')
  })

  describe('personality section', () => {
    it('should define warm, friendly personality', () => {
      const lowerPrompt = ARIA_SYSTEM_PROMPT.toLowerCase()
      expect(lowerPrompt).toContain('friendly')
      expect(lowerPrompt).toContain('caring')
      expect(lowerPrompt).toContain('helpful senior')
    })

    it('should mention Hinglish usage', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('Hinglish')
      // Should include example Hindi words
      expect(ARIA_SYSTEM_PROMPT).toMatch(/beta|zaroor|bilkul|achha/i)
    })

    it('should emphasize patience', () => {
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('one thing at a time')
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('listen first')
    })
  })

  describe('approach section', () => {
    it('should have clear helping approach', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('Answer their actual question first')
      expect(ARIA_SYSTEM_PROMPT).toContain('Understand their situation')
      expect(ARIA_SYSTEM_PROMPT).toContain('Show value naturally')
      expect(ARIA_SYSTEM_PROMPT).toContain('Respect their pace')
    })

    it('should naturally collect student information', () => {
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('name')
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('phone')
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('class')
    })
  })

  describe('pricing information', () => {
    it('should include pricing data', () => {
      // Check that pricing is embedded in prompt
      Object.keys(PRICING).forEach(course => {
        expect(ARIA_SYSTEM_PROMPT).toContain(course)
      })
    })

    it('should include all tier names', () => {
      Object.values(COURSE_TIERS).forEach(tier => {
        expect(ARIA_SYSTEM_PROMPT).toContain(tier.name)
      })
    })

    it('should warn about exact pricing', () => {
      expect(ARIA_SYSTEM_PROMPT.toUpperCase()).toContain('EXACT')
      expect(ARIA_SYSTEM_PROMPT).toMatch(/do not modify|don't modify|exact/i)
    })
  })

  describe('contact information', () => {
    it('should include phone number', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain(CONTACT_POINTS.phone)
    })

    it('should include WhatsApp number', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain(CONTACT_POINTS.whatsapp)
    })

    it('should include email', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain(CONTACT_POINTS.email)
    })

    it('should include center locations', () => {
      CONTACT_POINTS.centers.forEach(center => {
        expect(ARIA_SYSTEM_PROMPT).toContain(center)
      })
    })
  })

  describe('batch timings', () => {
    it('should include all batch schedules', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.batch1.schedule)
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.batch2.schedule)
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.batch3.schedule)
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.batch4.schedule)
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.batch5.schedule)
    })

    it('should include additional class timings', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.neetClass.schedule)
      expect(ARIA_SYSTEM_PROMPT).toContain(BATCH_TIMINGS.weeklyTest.schedule)
    })
  })

  describe('USP points', () => {
    it('should include all unique selling points', () => {
      USP_POINTS.forEach(point => {
        expect(ARIA_SYSTEM_PROMPT).toContain(point)
      })
    })
  })

  describe('objection handling', () => {
    it('should handle common concerns naturally', () => {
      const concernKeywords = [
        'expensive',
        'already in',
        'online',
        'think about',
        'parents',
      ]

      concernKeywords.forEach(keyword => {
        expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain(keyword)
      })
    })

    it('should mention Pursuit tier and installments for price objection', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('Pursuit')
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('installments')
    })

    it('should mention offline centers for online concerns', () => {
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('offline')
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('free demo')
    })
  })

  describe('natural conversation', () => {
    it('should prioritize helping over sales', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('HELP first')
      expect(ARIA_SYSTEM_PROMPT).toContain('Not every conversation needs to end in enrollment')
      expect(ARIA_SYSTEM_PROMPT).toContain('Build genuine trust')
    })

    it('should include demo booking call-to-action', () => {
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('demo')
    })
  })

  describe('constraints section', () => {
    it('should have rules about what not to do', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('NEVER DO')
    })

    it('should prohibit competitor mentions', () => {
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('trash talk other coaching')
    })

    it('should prohibit aggressive tactics', () => {
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('pressure')
      expect(ARIA_SYSTEM_PROMPT.toLowerCase()).toContain('fake urgency')
    })
  })

  describe('biology expertise', () => {
    it('should mention biology question capability', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('Biology')
      expect(ARIA_SYSTEM_PROMPT).toContain('NCERT')
    })

    it('should mention NEET patterns', () => {
      expect(ARIA_SYSTEM_PROMPT).toContain('NEET')
    })
  })
})

describe('ARIA_SYSTEM_PROMPT_HINDI', () => {
  it('should be defined and non-empty', () => {
    expect(ARIA_SYSTEM_PROMPT_HINDI).toBeDefined()
    expect(typeof ARIA_SYSTEM_PROMPT_HINDI).toBe('string')
    expect(ARIA_SYSTEM_PROMPT_HINDI.length).toBeGreaterThan(500)
  })

  it('should contain Devanagari characters (Hindi)', () => {
    const hindiPattern = /[\u0900-\u097F]/
    expect(ARIA_SYSTEM_PROMPT_HINDI).toMatch(hindiPattern)
  })

  it('should identify as ARIA', () => {
    expect(ARIA_SYSTEM_PROMPT_HINDI).toContain('ARIA')
  })

  it('should include pricing information', () => {
    // Pricing should be in same format even in Hindi prompt
    Object.values(PRICING).forEach(coursePricing => {
      const hasAtLeastOneTierPrice =
        ARIA_SYSTEM_PROMPT_HINDI.includes(coursePricing.pinnacle) ||
        ARIA_SYSTEM_PROMPT_HINDI.includes(coursePricing.ascent) ||
        ARIA_SYSTEM_PROMPT_HINDI.includes(coursePricing.pursuit)

      expect(hasAtLeastOneTierPrice).toBe(true)
    })
  })

  it('should include contact information', () => {
    expect(ARIA_SYSTEM_PROMPT_HINDI).toContain(CONTACT_POINTS.phone)
    expect(ARIA_SYSTEM_PROMPT_HINDI).toContain(CONTACT_POINTS.whatsapp)
  })

  it('should include USP points', () => {
    // USPs should be present (they're in English even in Hindi prompt)
    USP_POINTS.forEach(point => {
      expect(ARIA_SYSTEM_PROMPT_HINDI).toContain(point)
    })
  })

  it('should be more concise than English prompt', () => {
    // Hindi prompt is a condensed version
    expect(ARIA_SYSTEM_PROMPT_HINDI.length).toBeLessThan(ARIA_SYSTEM_PROMPT.length)
  })
})

describe('getSystemPrompt', () => {
  it('should return English prompt by default', () => {
    const result = getSystemPrompt()
    expect(result).toBe(ARIA_SYSTEM_PROMPT)
  })

  it('should return English prompt when en is specified', () => {
    const result = getSystemPrompt('en')
    expect(result).toBe(ARIA_SYSTEM_PROMPT)
  })

  it('should return Hindi prompt when hi is specified', () => {
    const result = getSystemPrompt('hi')
    expect(result).toBe(ARIA_SYSTEM_PROMPT_HINDI)
  })

  it('should return different prompts for different languages', () => {
    const english = getSystemPrompt('en')
    const hindi = getSystemPrompt('hi')

    expect(english).not.toBe(hindi)
  })
})

describe('prompt quality', () => {
  it('should not have placeholder text', () => {
    const placeholders = ['TODO', 'FIXME', 'XXX', 'TBD', 'placeholder', '[INSERT']

    placeholders.forEach(placeholder => {
      expect(ARIA_SYSTEM_PROMPT.toUpperCase()).not.toContain(placeholder.toUpperCase())
      expect(ARIA_SYSTEM_PROMPT_HINDI.toUpperCase()).not.toContain(placeholder.toUpperCase())
    })
  })

  it('should not have broken template literals', () => {
    // Check for common template literal issues
    expect(ARIA_SYSTEM_PROMPT).not.toContain('${undefined}')
    expect(ARIA_SYSTEM_PROMPT).not.toContain('${null}')
    expect(ARIA_SYSTEM_PROMPT).not.toContain('[object Object]')
  })

  it('should have consistent markdown formatting', () => {
    // Should use proper markdown headers
    expect(ARIA_SYSTEM_PROMPT).toMatch(/^##?\s/m) // Has headers
    expect(ARIA_SYSTEM_PROMPT).toMatch(/\*\*[^*]+\*\*/) // Has bold text
  })

  it('should be reasonably sized for API context', () => {
    // Prompt should be substantial but not too large
    // Typical max is around 4000-8000 tokens for system prompt
    const estimatedTokens = ARIA_SYSTEM_PROMPT.length / 4 // Rough estimate

    expect(estimatedTokens).toBeGreaterThan(500)
    expect(estimatedTokens).toBeLessThan(10000)
  })
})
