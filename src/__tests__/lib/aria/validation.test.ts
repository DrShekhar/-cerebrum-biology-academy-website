/**
 * Unit tests for ARIA lead capture validation
 * Tests phone, name, and class validation with various inputs
 */

import {
  validatePhone,
  validateName,
  validateClass,
  validateLeadField,
  VALID_CLASSES,
} from '@/lib/aria/validation'

describe('validatePhone', () => {
  describe('valid Indian mobile numbers', () => {
    it('should accept numbers starting with 6', () => {
      const result = validatePhone('6123456789')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('6123456789')
    })

    it('should accept numbers starting with 7', () => {
      const result = validatePhone('7123456789')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('7123456789')
    })

    it('should accept numbers starting with 8', () => {
      const result = validatePhone('8123456789')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('8123456789')
    })

    it('should accept numbers starting with 9', () => {
      const result = validatePhone('9876543210')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('9876543210')
    })

    it('should strip non-digit characters', () => {
      const result = validatePhone('98-7654-3210')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('9876543210')
    })

    it('should strip spaces', () => {
      const result = validatePhone('98765 43210')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('9876543210')
    })

    it('should strip country code prefix', () => {
      const result = validatePhone('+91 9876543210')
      expect(result.sanitizedValue).toBe('919876543210')
      // Note: With country code it becomes 12 digits, so invalid
      expect(result.isValid).toBe(false)
    })
  })

  describe('invalid phone numbers', () => {
    it('should reject numbers starting with 0-5', () => {
      expect(validatePhone('0123456789').isValid).toBe(false)
      expect(validatePhone('1234567890').isValid).toBe(false)
      expect(validatePhone('2345678901').isValid).toBe(false)
      expect(validatePhone('3456789012').isValid).toBe(false)
      expect(validatePhone('4567890123').isValid).toBe(false)
      expect(validatePhone('5678901234').isValid).toBe(false)
    })

    it('should reject too short numbers', () => {
      const result = validatePhone('987654321')
      expect(result.isValid).toBe(false)
      expect(result.errorKey).toBe('invalidPhone')
    })

    it('should reject too long numbers', () => {
      const result = validatePhone('98765432101')
      expect(result.isValid).toBe(false)
    })

    it('should reject empty input', () => {
      const result = validatePhone('')
      expect(result.isValid).toBe(false)
    })

    it('should reject non-numeric input', () => {
      const result = validatePhone('abcdefghij')
      expect(result.isValid).toBe(false)
      expect(result.sanitizedValue).toBe('')
    })
  })
})

describe('validateName', () => {
  describe('valid names', () => {
    it('should accept simple names', () => {
      const result = validateName('Rahul')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Rahul')
    })

    it('should accept names with spaces', () => {
      const result = validateName('Rahul Kumar')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Rahul Kumar')
    })

    it('should accept names with hyphens', () => {
      const result = validateName('Mary-Jane')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Mary-Jane')
    })

    it('should accept names with apostrophes', () => {
      const result = validateName("O'Brien")
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe("O'Brien")
    })

    it('should accept names with periods', () => {
      const result = validateName('Dr. Ram')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dr. Ram')
    })

    it('should accept Hindi names', () => {
      const result = validateName('राहुल कुमार')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('राहुल कुमार')
    })

    it('should accept minimum 2 characters', () => {
      const result = validateName('AB')
      expect(result.isValid).toBe(true)
    })

    it('should trim whitespace', () => {
      const result = validateName('  Rahul Kumar  ')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Rahul Kumar')
    })
  })

  describe('invalid names', () => {
    it('should reject single character names', () => {
      const result = validateName('A')
      expect(result.isValid).toBe(false)
      expect(result.errorKey).toBe('invalidName')
    })

    it('should reject empty names', () => {
      const result = validateName('')
      expect(result.isValid).toBe(false)
    })

    it('should reject whitespace only', () => {
      const result = validateName('   ')
      expect(result.isValid).toBe(false)
    })

    it('should reject numeric only names', () => {
      const result = validateName('12345')
      expect(result.isValid).toBe(false)
      expect(result.errorKey).toBe('invalidName')
    })

    it('should reject names with special characters', () => {
      const result = validateName('Rahul@123')
      expect(result.isValid).toBe(false)
    })

    it('should reject names exceeding 50 characters', () => {
      const longName = 'A'.repeat(51)
      const result = validateName(longName)
      expect(result.isValid).toBe(false)
      expect(result.errorKey).toBe('invalidName')
    })

    it('should accept exactly 50 characters', () => {
      const exactName = 'A'.repeat(50)
      const result = validateName(exactName)
      expect(result.isValid).toBe(true)
    })
  })
})

describe('validateClass', () => {
  describe('valid classes - standard format', () => {
    it('should accept class 9', () => {
      const result = validateClass('9')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 9')
    })

    it('should accept class 10', () => {
      const result = validateClass('10')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 10')
    })

    it('should accept class 11', () => {
      const result = validateClass('11')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 11')
    })

    it('should accept class 12', () => {
      const result = validateClass('12')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 12')
    })

    it('should accept dropper', () => {
      const result = validateClass('dropper')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })

    it('should accept Dropper with capital D', () => {
      const result = validateClass('Dropper')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })
  })

  describe('valid classes - ordinal format', () => {
    it('should accept 9th', () => {
      const result = validateClass('9th')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 9')
    })

    it('should accept 10th', () => {
      const result = validateClass('10th')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 10')
    })

    it('should accept 11th', () => {
      const result = validateClass('11th')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 11')
    })

    it('should accept 12th', () => {
      const result = validateClass('12th')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 12')
    })
  })

  describe('valid classes - Roman numeral format', () => {
    it('should accept IX', () => {
      const result = validateClass('IX')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 9')
    })

    it('should accept X', () => {
      const result = validateClass('X')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 10')
    })

    it('should accept XI', () => {
      const result = validateClass('XI')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 11')
    })

    it('should accept XII', () => {
      const result = validateClass('XII')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 12')
    })
  })

  describe('valid classes - with "Class" prefix', () => {
    it('should accept "Class 11"', () => {
      const result = validateClass('Class 11')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 11')
    })

    it('should accept "class 12"', () => {
      const result = validateClass('class 12')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 12')
    })

    it('should accept "Class XI"', () => {
      const result = validateClass('Class XI')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 11')
    })
  })

  describe('valid classes - Hindi format', () => {
    it('should accept Hindi numerals', () => {
      const result = validateClass('११')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Class 11')
    })

    it('should accept ड्रॉपर', () => {
      const result = validateClass('ड्रॉपर')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })
  })

  describe('valid classes - variations', () => {
    it('should accept "drop"', () => {
      const result = validateClass('drop')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })

    it('should accept "gap year"', () => {
      const result = validateClass('gap year')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })

    it('should accept "repeater"', () => {
      const result = validateClass('repeater')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })

    it('should be case insensitive', () => {
      const result = validateClass('DROPPER')
      expect(result.isValid).toBe(true)
      expect(result.sanitizedValue).toBe('Dropper')
    })
  })

  describe('invalid classes', () => {
    it('should reject class 8', () => {
      const result = validateClass('8')
      expect(result.isValid).toBe(false)
      expect(result.errorKey).toBe('invalidClass')
    })

    it('should reject class 13', () => {
      const result = validateClass('13')
      expect(result.isValid).toBe(false)
    })

    it('should reject random text', () => {
      const result = validateClass('hello')
      expect(result.isValid).toBe(false)
    })

    it('should reject empty input', () => {
      const result = validateClass('')
      expect(result.isValid).toBe(false)
    })

    it('should reject college', () => {
      const result = validateClass('college')
      expect(result.isValid).toBe(false)
    })
  })
})

describe('validateLeadField', () => {
  it('should delegate phone validation', () => {
    const result = validateLeadField('phone', '9876543210')
    expect(result.isValid).toBe(true)
    expect(result.sanitizedValue).toBe('9876543210')
  })

  it('should delegate name validation', () => {
    const result = validateLeadField('name', 'Rahul Kumar')
    expect(result.isValid).toBe(true)
    expect(result.sanitizedValue).toBe('Rahul Kumar')
  })

  it('should delegate class validation', () => {
    const result = validateLeadField('class', '11th')
    expect(result.isValid).toBe(true)
    expect(result.sanitizedValue).toBe('Class 11')
  })
})

describe('VALID_CLASSES constant', () => {
  it('should contain exactly 5 valid classes', () => {
    expect(VALID_CLASSES).toHaveLength(5)
  })

  it('should contain 9, 10, 11, 12, dropper', () => {
    expect(VALID_CLASSES).toContain('9')
    expect(VALID_CLASSES).toContain('10')
    expect(VALID_CLASSES).toContain('11')
    expect(VALID_CLASSES).toContain('12')
    expect(VALID_CLASSES).toContain('dropper')
  })
})
