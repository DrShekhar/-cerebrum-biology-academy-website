/**
 * Unit tests for ARIA knowledge base
 * Tests course data, pricing, objection handlers, and FAQ data integrity
 */

import {
  COURSE_TIERS,
  PRICING,
  PAYMENT_OPTIONS,
  ADD_ONS,
  BATCH_TIMINGS,
  STUDY_MATERIALS,
  OBJECTION_HANDLERS,
  FAQ_DATA,
  CONTACT_POINTS,
  USP_POINTS,
  SCHOLARSHIP_INFO,
} from '@/lib/aria/knowledgeBase'

describe('COURSE_TIERS', () => {
  it('should have all three tiers defined', () => {
    expect(COURSE_TIERS.pinnacle).toBeDefined()
    expect(COURSE_TIERS.ascent).toBeDefined()
    expect(COURSE_TIERS.pursuit).toBeDefined()
  })

  it('should have required properties for each tier', () => {
    const tiers = Object.values(COURSE_TIERS)

    tiers.forEach(tier => {
      expect(tier.name).toBeDefined()
      expect(tier.tagline).toBeDefined()
      expect(tier.batchSize).toBeDefined()
      expect(tier.hoursPerWeek).toBeDefined()
      expect(tier.features).toBeDefined()
      expect(Array.isArray(tier.features)).toBe(true)
      expect(tier.features.length).toBeGreaterThan(0)
    })
  })

  it('should have Pinnacle as the premium tier with most features', () => {
    expect(COURSE_TIERS.pinnacle.features.length).toBeGreaterThanOrEqual(
      COURSE_TIERS.pursuit.features.length
    )
    expect(COURSE_TIERS.pinnacle.tagline.toLowerCase()).toContain('premium')
  })

  it('should have Ascent as the most popular tier', () => {
    expect(COURSE_TIERS.ascent.tagline.toLowerCase()).toContain('popular')
  })

  it('should have smaller batch sizes for premium tiers', () => {
    // Extract numeric batch size (e.g., "10-12 students" -> 10)
    const getPrimaryBatchSize = (size: string): number => {
      const match = size.match(/\d+/)
      return match ? parseInt(match[0], 10) : 0
    }

    const pinnacleSize = getPrimaryBatchSize(COURSE_TIERS.pinnacle.batchSize)
    const ascentSize = getPrimaryBatchSize(COURSE_TIERS.ascent.batchSize)
    const pursuitSize = getPrimaryBatchSize(COURSE_TIERS.pursuit.batchSize)

    expect(pinnacleSize).toBeLessThan(ascentSize)
    expect(ascentSize).toBeLessThan(pursuitSize)
  })
})

describe('PRICING', () => {
  const expectedCourses = [
    'Class IX Foundation',
    'Class X Foundation',
    'Class XI NEET',
    'Class XII NEET',
    'Dropper/Repeater',
    '2-Year Complete (11+12)',
  ]

  it('should have pricing for all expected courses', () => {
    expectedCourses.forEach(course => {
      expect(PRICING[course]).toBeDefined()
    })
  })

  it('should have all three tiers for each course', () => {
    Object.values(PRICING).forEach(coursePricing => {
      expect(coursePricing.pinnacle).toBeDefined()
      expect(coursePricing.ascent).toBeDefined()
      expect(coursePricing.pursuit).toBeDefined()
    })
  })

  it('should have prices in INR format (₹)', () => {
    Object.values(PRICING).forEach(coursePricing => {
      Object.values(coursePricing).forEach(price => {
        expect(price).toMatch(/^₹[\d,]+$/)
      })
    })
  })

  it('should have Pursuit as the most affordable tier', () => {
    const parsePrice = (price: string): number => {
      return parseInt(price.replace(/[₹,]/g, ''), 10)
    }

    Object.values(PRICING).forEach(coursePricing => {
      const pursuitPrice = parsePrice(coursePricing.pursuit)
      const ascentPrice = parsePrice(coursePricing.ascent)

      // Pursuit should be cheapest or equal (not more expensive)
      expect(pursuitPrice).toBeLessThanOrEqual(ascentPrice)
    })
  })
})

describe('PAYMENT_OPTIONS', () => {
  it('should have lump sum, two, and three installment options', () => {
    expect(PAYMENT_OPTIONS.lumpSum).toBeDefined()
    expect(PAYMENT_OPTIONS.twoInstallments).toBeDefined()
    expect(PAYMENT_OPTIONS.threeInstallments).toBeDefined()
  })

  it('should indicate lump sum is the best price', () => {
    expect(PAYMENT_OPTIONS.lumpSum.toLowerCase()).toContain('best')
  })

  it('should show additional cost for installments', () => {
    expect(PAYMENT_OPTIONS.twoInstallments).toContain('+')
    expect(PAYMENT_OPTIONS.threeInstallments).toContain('+')
  })
})

describe('ADD_ONS', () => {
  it('should have test series add-on', () => {
    expect(ADD_ONS.testSeries).toBeDefined()
    expect(ADD_ONS.testSeries.name).toBe('NEET Test Series')
    expect(ADD_ONS.testSeries.price).toBeDefined()
    expect(ADD_ONS.testSeries.description).toBeDefined()
  })

  it('should have mentor plus add-on', () => {
    expect(ADD_ONS.mentorPlus).toBeDefined()
    expect(ADD_ONS.mentorPlus.name).toBe('Mentor Plus')
  })

  it('should have intensive program add-on', () => {
    expect(ADD_ONS.intensive).toBeDefined()
    expect(ADD_ONS.intensive.description).toContain('Pinnacle')
  })
})

describe('BATCH_TIMINGS', () => {
  it('should have weekday and weekend timings', () => {
    expect(BATCH_TIMINGS.weekday).toBeDefined()
    expect(BATCH_TIMINGS.weekend).toBeDefined()
  })

  it('should have morning, afternoon, evening for weekdays', () => {
    expect(BATCH_TIMINGS.weekday.morning).toBeDefined()
    expect(BATCH_TIMINGS.weekday.afternoon).toBeDefined()
    expect(BATCH_TIMINGS.weekday.evening).toBeDefined()
  })

  it('should have morning and afternoon for weekends', () => {
    expect(BATCH_TIMINGS.weekend.morning).toBeDefined()
    expect(BATCH_TIMINGS.weekend.afternoon).toBeDefined()
  })

  it('should have valid time formats', () => {
    const timeFormatRegex = /\d{1,2}:\d{2}\s*(AM|PM)\s*-\s*\d{1,2}:\d{2}\s*(AM|PM)/

    Object.values(BATCH_TIMINGS.weekday).forEach(time => {
      expect(time).toMatch(timeFormatRegex)
    })

    Object.values(BATCH_TIMINGS.weekend).forEach(time => {
      expect(time).toMatch(timeFormatRegex)
    })
  })
})

describe('STUDY_MATERIALS', () => {
  it('should have included and optional materials', () => {
    expect(STUDY_MATERIALS.included).toBeDefined()
    expect(STUDY_MATERIALS.optional).toBeDefined()
    expect(Array.isArray(STUDY_MATERIALS.included)).toBe(true)
    expect(Array.isArray(STUDY_MATERIALS.optional)).toBe(true)
  })

  it('should have NCERT-based content', () => {
    const includesNCERT = STUDY_MATERIALS.included.some(material =>
      material.toLowerCase().includes('ncert')
    )
    expect(includesNCERT).toBe(true)
  })

  it('should have previous year questions', () => {
    const includesPYQ = STUDY_MATERIALS.included.some(
      material =>
        material.toLowerCase().includes('previous year') ||
        material.toLowerCase().includes('pyq')
    )
    expect(includesPYQ).toBe(true)
  })
})

describe('OBJECTION_HANDLERS', () => {
  const expectedObjections = [
    'tooExpensive',
    'alreadyInCoaching',
    'notSureAboutOnline',
    'willJoinLater',
    'needToAskParents',
    'comparingWithOthers',
  ]

  it('should have handlers for all common objections', () => {
    expectedObjections.forEach(objection => {
      expect(OBJECTION_HANDLERS[objection]).toBeDefined()
    })
  })

  it('should have response and followUp for each objection', () => {
    Object.values(OBJECTION_HANDLERS).forEach(handler => {
      expect(handler.response).toBeDefined()
      expect(typeof handler.response).toBe('string')
      expect(handler.response.length).toBeGreaterThan(50) // Substantive response

      expect(handler.followUp).toBeDefined()
      expect(Array.isArray(handler.followUp)).toBe(true)
      expect(handler.followUp.length).toBeGreaterThan(0)
    })
  })

  it('should address budget concern with alternatives', () => {
    const response = OBJECTION_HANDLERS.tooExpensive.response.toLowerCase()
    expect(response).toMatch(/pursuit|emi|scholarship|installment/i)
  })

  it('should address online concerns with demo offer', () => {
    const response = OBJECTION_HANDLERS.notSureAboutOnline.response.toLowerCase()
    expect(response).toMatch(/demo|free|offline|center/i)
  })

  it('should address urgency concerns with scarcity', () => {
    const response = OBJECTION_HANDLERS.willJoinLater.response.toLowerCase()
    expect(response).toMatch(/seat|batch|discount|limited|closing/i)
  })
})

describe('FAQ_DATA', () => {
  it('should have question and answer for each FAQ', () => {
    Object.values(FAQ_DATA).forEach(faq => {
      expect(faq.question).toBeDefined()
      expect(faq.answer).toBeDefined()
      expect(faq.question.endsWith('?')).toBe(true)
      expect(faq.answer.length).toBeGreaterThan(50) // Substantive answer
    })
  })

  it('should cover key topics', () => {
    const topics = Object.keys(FAQ_DATA)

    expect(topics).toContain('about')
    expect(topics).toContain('faculty')
    expect(topics).toContain('results')
    expect(topics).toContain('demoClass')
  })

  it('should mention AIIMS faculty', () => {
    const facultyAnswer = FAQ_DATA.faculty.answer.toLowerCase()
    expect(facultyAnswer).toContain('aiims')
  })

  it('should mention success rate in results', () => {
    const resultsAnswer = FAQ_DATA.results.answer.toLowerCase()
    expect(resultsAnswer).toMatch(/\d+%|selection|success/i)
  })
})

describe('CONTACT_POINTS', () => {
  it('should have all contact methods', () => {
    expect(CONTACT_POINTS.phone).toBeDefined()
    expect(CONTACT_POINTS.whatsapp).toBeDefined()
    expect(CONTACT_POINTS.email).toBeDefined()
    expect(CONTACT_POINTS.website).toBeDefined()
    expect(CONTACT_POINTS.centers).toBeDefined()
  })

  it('should have valid phone format', () => {
    expect(CONTACT_POINTS.phone).toMatch(/^\+91\s?\d{5}\s?\d{5}$/)
  })

  it('should have valid email format', () => {
    expect(CONTACT_POINTS.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('should have multiple center locations', () => {
    expect(Array.isArray(CONTACT_POINTS.centers)).toBe(true)
    expect(CONTACT_POINTS.centers.length).toBeGreaterThan(0)
  })

  it('should have valid website URL', () => {
    expect(CONTACT_POINTS.website).toMatch(/^https?:\/\//)
  })
})

describe('USP_POINTS', () => {
  it('should have multiple unique selling points', () => {
    expect(Array.isArray(USP_POINTS)).toBe(true)
    expect(USP_POINTS.length).toBeGreaterThanOrEqual(5)
  })

  it('should not have empty or very short points', () => {
    USP_POINTS.forEach(point => {
      expect(point.length).toBeGreaterThan(10)
    })
  })

  it('should highlight key differentiators', () => {
    const allUSPs = USP_POINTS.join(' ').toLowerCase()

    // Should mention key differentiators
    expect(allUSPs).toMatch(/success|aiims|batch|doubt|faculty|guarantee/i)
  })
})

describe('SCHOLARSHIP_INFO', () => {
  it('should have criteria and how to apply', () => {
    expect(SCHOLARSHIP_INFO.criteria).toBeDefined()
    expect(SCHOLARSHIP_INFO.howToApply).toBeDefined()
  })

  it('should have multiple criteria', () => {
    expect(Array.isArray(SCHOLARSHIP_INFO.criteria)).toBe(true)
    expect(SCHOLARSHIP_INFO.criteria.length).toBeGreaterThan(1)
  })

  it('should mention entrance test for scholarship', () => {
    const allCriteria = SCHOLARSHIP_INFO.criteria.join(' ').toLowerCase()
    expect(allCriteria).toMatch(/test|entrance|performance/i)
  })
})

describe('data consistency', () => {
  it('should have consistent tier names across pricing and course tiers', () => {
    const tierKeys = Object.keys(COURSE_TIERS)

    Object.values(PRICING).forEach(coursePricing => {
      tierKeys.forEach(tier => {
        expect(coursePricing[tier]).toBeDefined()
      })
    })
  })

  it('should have consistent contact info', () => {
    // Phone and WhatsApp should use same number
    expect(CONTACT_POINTS.phone).toBe(CONTACT_POINTS.whatsapp)
  })

  it('should not have placeholder text', () => {
    const checkForPlaceholders = (obj: unknown): void => {
      const placeholders = ['TODO', 'FIXME', 'XXX', 'TBD', 'placeholder', 'lorem']

      if (typeof obj === 'string') {
        placeholders.forEach(placeholder => {
          expect(obj.toLowerCase()).not.toContain(placeholder.toLowerCase())
        })
      } else if (Array.isArray(obj)) {
        obj.forEach(item => checkForPlaceholders(item))
      } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(value => checkForPlaceholders(value))
      }
    }

    checkForPlaceholders(COURSE_TIERS)
    checkForPlaceholders(PRICING)
    checkForPlaceholders(OBJECTION_HANDLERS)
    checkForPlaceholders(FAQ_DATA)
  })
})
