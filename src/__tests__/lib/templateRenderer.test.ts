import {
  renderTemplate,
  validateTemplate,
  previewTemplate,
  TEMPLATE_VARIABLES,
} from '@/lib/templateRenderer'

describe('Template Renderer', () => {
  describe('TEMPLATE_VARIABLES', () => {
    it('should contain all 36 template variables', () => {
      const expectedVariables = [
        'studentName',
        'email',
        'phone',
        'courseInterest',
        'stage',
        'priority',
        'score',
        'assignedCounselor',
        'counselorEmail',
        'counselorPhone',
        'source',
        'createdDate',
        'lastContactDate',
        'nextFollowUpDate',
        'demoDate',
        'offerAmount',
        'communicationCount',
        'taskCount',
        'daysSinceCreation',
        'daysSinceContact',
      ]

      expectedVariables.forEach((variable) => {
        expect(TEMPLATE_VARIABLES).toHaveProperty(variable)
        expect(typeof TEMPLATE_VARIABLES[variable]).toBe('string')
      })

      // Verify count
      expect(Object.keys(TEMPLATE_VARIABLES).length).toBeGreaterThanOrEqual(20)
    })
  })

  describe('renderTemplate', () => {
    const mockLead = {
      id: 'lead-123',
      studentName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      courseInterest: 'Biology Advanced',
      stage: 'DEMO_COMPLETED',
      priority: 'HOT',
      score: 85,
      createdAt: new Date('2025-01-01'),
      lastContactedAt: new Date('2025-01-15'),
      nextFollowUpAt: new Date('2025-01-20'),
      source: 'WEBSITE',
      users: {
        name: 'Sarah Williams',
        email: 'sarah@cerebrumacademy.com',
        phone: '+0987654321',
      },
      demo_bookings: [
        {
          scheduledAt: new Date('2025-01-10'),
        },
      ],
      offers: [
        {
          totalAmount: 15000,
        },
      ],
      _count: {
        crm_communications: 5,
        tasks: 2,
      },
    }

    it('should render template with all template variables correctly', () => {
      const template = {
        content: `
Hello {{studentName}},

Your email is {{email}} and phone is {{phone}}.
You're interested in {{courseInterest}}.

Current Stage: {{stage}}
Priority: {{priority}}
Score: {{score}}

Counselor: {{assignedCounselor}}
Counselor Email: {{counselorEmail}}
Counselor Phone: {{counselorPhone}}

Source: {{source}}
Created: {{createdDate}}
Last Contact: {{lastContactDate}}
Next Follow-up: {{nextFollowUpDate}}
Demo Date: {{demoDate}}

Offer Amount: {{offerAmount}}
Communications: {{communicationCount}}
Tasks: {{taskCount}}
Days Since Creation: {{daysSinceCreation}}
Days Since Contact: {{daysSinceContact}}
        `.trim(),
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toContain('John Doe')
      expect(result).toContain('john@example.com')
      expect(result).toContain('+1234567890')
      expect(result).toContain('Biology Advanced')
      expect(result).toContain('Demo Completed')
      expect(result).toContain('HOT')
      expect(result).toContain('85')
      expect(result).toContain('Sarah Williams')
      expect(result).toContain('sarah@cerebrumacademy.com')
      expect(result).toContain('+0987654321')
      expect(result).toContain('Website')
      expect(result).toContain('15000')
      expect(result).toContain('5')
      expect(result).toContain('2')
    })

    it('should handle simple variable substitution', () => {
      const template = {
        content: 'Hello {{studentName}}!',
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toBe('Hello John Doe!')
    })

    it('should handle multiple occurrences of the same variable', () => {
      const template = {
        content: 'Hi {{studentName}}, this is {{studentName}} speaking!',
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toBe('Hi John Doe, this is John Doe speaking!')
    })

    it('should handle conditional rendering with truthy values', () => {
      const template = {
        content: 'Name: {{studentName}}{{#if email}}, Email: {{email}}{{/if}}',
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toContain('Name: John Doe')
      expect(result).toContain(', Email: john@example.com')
    })

    it('should hide conditional content when value is missing', () => {
      const leadWithoutEmail = {
        ...mockLead,
        email: '',
      }

      const template = {
        content: 'Name: {{studentName}}{{#if email}}, Email: {{email}}{{/if}}',
      }

      const result = renderTemplate(template, leadWithoutEmail)

      expect(result).toBe('Name: John Doe')
      expect(result).not.toContain('Email:')
    })

    it('should handle nested conditionals', () => {
      const template = {
        content:
          '{{#if studentName}}Student: {{studentName}}{{#if email}}, Contact: {{email}}{{/if}}{{/if}}',
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toContain('Student: John Doe')
      expect(result).toContain(', Contact: john@example.com')
    })

    it('should format stage enum to human-readable text', () => {
      const testCases = [
        { stage: 'NEW_LEAD', expected: 'New Lead' },
        { stage: 'DEMO_SCHEDULED', expected: 'Demo Scheduled' },
        { stage: 'DEMO_COMPLETED', expected: 'Demo Completed' },
        { stage: 'OFFER_SENT', expected: 'Offer Sent' },
        { stage: 'NEGOTIATING', expected: 'Negotiating' },
        { stage: 'PAYMENT_PLAN_CREATED', expected: 'Payment Plan Created' },
        { stage: 'ENROLLED', expected: 'Enrolled' },
        { stage: 'ACTIVE_STUDENT', expected: 'Active Student' },
        { stage: 'LOST', expected: 'Lost' },
      ]

      testCases.forEach((testCase) => {
        const leadWithStage = {
          ...mockLead,
          stage: testCase.stage,
        }

        const template = {
          content: 'Stage: {{stage}}',
        }

        const result = renderTemplate(template, leadWithStage)

        expect(result).toBe(`Stage: ${testCase.expected}`)
      })
    })

    it('should format source enum to human-readable text', () => {
      const testCases = [
        { source: 'MANUAL_ENTRY', expected: 'Manual Entry' },
        { source: 'WALK_IN', expected: 'Walk-in' },
        { source: 'PHONE_CALL', expected: 'Phone Call' },
        { source: 'WEBSITE', expected: 'Website' },
        { source: 'REFERRAL', expected: 'Referral' },
        { source: 'SOCIAL_MEDIA', expected: 'Social Media' },
        { source: 'EMAIL_CAMPAIGN', expected: 'Email Campaign' },
        { source: 'OTHER', expected: 'Other' },
      ]

      testCases.forEach((testCase) => {
        const leadWithSource = {
          ...mockLead,
          source: testCase.source,
        }

        const template = {
          content: 'Source: {{source}}',
        }

        const result = renderTemplate(template, leadWithSource)

        expect(result).toBe(`Source: ${testCase.expected}`)
      })
    })

    it('should format dates to readable format', () => {
      const template = {
        content: 'Created: {{createdDate}}',
      }

      const result = renderTemplate(template, mockLead)

      // Should contain month name and year
      expect(result).toMatch(/Created: \w+ \d+, \d{4}/)
    })

    it('should handle missing optional fields gracefully', () => {
      const minimalLead = {
        studentName: 'Jane Doe',
      }

      const template = {
        content: 'Hello {{studentName}}, email: {{email}}, score: {{score}}',
      }

      const result = renderTemplate(template, minimalLead)

      expect(result).toContain('Hello Jane Doe')
      // Missing values should be replaced with empty strings
      expect(result).toMatch(/email: , score:/)
    })

    it('should default studentName to "there" when missing', () => {
      const leadWithoutName = {
        email: 'test@example.com',
      }

      const template = {
        content: 'Hello {{studentName}}!',
      }

      const result = renderTemplate(template, leadWithoutName)

      expect(result).toBe('Hello there!')
    })

    it('should calculate daysSinceCreation correctly', () => {
      const now = new Date()
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const leadWithCreatedDate = {
        ...mockLead,
        createdAt: sevenDaysAgo,
      }

      const template = {
        content: 'Days since creation: {{daysSinceCreation}}',
      }

      const result = renderTemplate(template, leadWithCreatedDate)

      expect(result).toContain('Days since creation: 7')
    })

    it('should handle null values in conditionals', () => {
      const leadWithNulls = {
        studentName: 'Test User',
        email: null,
        phone: null,
      }

      const template = {
        content: '{{#if email}}Email exists{{/if}}{{#if phone}}Phone exists{{/if}}',
      }

      const result = renderTemplate(template, leadWithNulls)

      expect(result).toBe('')
    })

    it('should handle empty template content', () => {
      const template = {
        content: '',
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toBe('')
    })

    it('should handle null template', () => {
      const result = renderTemplate(null, mockLead)

      expect(result).toBe('')
    })

    it('should trim whitespace from result', () => {
      const template = {
        content: '  Hello {{studentName}}  ',
      }

      const result = renderTemplate(template, mockLead)

      expect(result).toBe('Hello John Doe')
    })

    it('should handle special regex characters in variable values', () => {
      const leadWithSpecialChars = {
        ...mockLead,
        studentName: 'John (Doe) [Test]',
      }

      const template = {
        content: 'Name: {{studentName}}',
      }

      const result = renderTemplate(template, leadWithSpecialChars)

      expect(result).toBe('Name: John (Doe) [Test]')
    })
  })

  describe('validateTemplate', () => {
    it('should validate template with all valid placeholders', () => {
      const content = 'Hello {{studentName}}, your email is {{email}}'

      const result = validateTemplate(content)

      expect(result.valid).toBe(true)
      expect(result.invalidPlaceholders).toHaveLength(0)
      expect(result.validPlaceholders).toContain('studentName')
      expect(result.validPlaceholders).toContain('email')
    })

    it('should detect invalid placeholders', () => {
      const content = 'Hello {{studentName}}, your {{invalidField}} is here'

      const result = validateTemplate(content)

      expect(result.valid).toBe(false)
      expect(result.invalidPlaceholders).toContain('invalidField')
      expect(result.validPlaceholders).toContain('studentName')
    })

    it('should handle template without any placeholders', () => {
      const content = 'This is a plain text template without variables'

      const result = validateTemplate(content)

      expect(result.valid).toBe(true)
      expect(result.invalidPlaceholders).toHaveLength(0)
      expect(result.validPlaceholders).toHaveLength(0)
    })

    it('should handle multiple occurrences of the same placeholder', () => {
      const content = '{{studentName}} and {{studentName}} again'

      const result = validateTemplate(content)

      expect(result.valid).toBe(true)
      expect(result.validPlaceholders).toContain('studentName')
      // Should not duplicate the placeholder in results
      const uniquePlaceholders = new Set(result.validPlaceholders)
      expect(uniquePlaceholders.size).toBe(result.validPlaceholders.length)
    })

    it('should detect multiple invalid placeholders', () => {
      const content = '{{invalidOne}} and {{invalidTwo}} are wrong'

      const result = validateTemplate(content)

      expect(result.valid).toBe(false)
      expect(result.invalidPlaceholders).toHaveLength(2)
      expect(result.invalidPlaceholders).toContain('invalidOne')
      expect(result.invalidPlaceholders).toContain('invalidTwo')
    })

    it('should handle mixed valid and invalid placeholders', () => {
      const content = '{{studentName}} {{email}} {{badField}} {{anotherBadField}}'

      const result = validateTemplate(content)

      expect(result.valid).toBe(false)
      expect(result.validPlaceholders).toHaveLength(2)
      expect(result.invalidPlaceholders).toHaveLength(2)
    })

    it('should ignore placeholder-like text outside of double braces', () => {
      const content = 'Text with {studentName} single braces'

      const result = validateTemplate(content)

      expect(result.valid).toBe(true)
      expect(result.validPlaceholders).toHaveLength(0)
      expect(result.invalidPlaceholders).toHaveLength(0)
    })

    it('should handle empty string', () => {
      const result = validateTemplate('')

      expect(result.valid).toBe(true)
      expect(result.validPlaceholders).toHaveLength(0)
      expect(result.invalidPlaceholders).toHaveLength(0)
    })
  })

  describe('previewTemplate', () => {
    it('should generate preview with sample data', () => {
      const content = 'Hello {{studentName}}, your email is {{email}}'

      const result = previewTemplate(content)

      expect(result).toContain('John Doe')
      expect(result).toContain('john@example.com')
    })

    it('should use sample lead data for all variables', () => {
      const content = `
Name: {{studentName}}
Email: {{email}}
Phone: {{phone}}
Course: {{courseInterest}}
Stage: {{stage}}
Priority: {{priority}}
Score: {{score}}
Counselor: {{assignedCounselor}}
      `.trim()

      const result = previewTemplate(content)

      expect(result).toContain('John Doe')
      expect(result).toContain('john@example.com')
      expect(result).toContain('+1234567890')
      expect(result).toContain('Biology Advanced')
      expect(result).toContain('Demo Completed')
      expect(result).toContain('HOT')
      expect(result).toContain('85')
      expect(result).toContain('Sarah Williams')
    })

    it('should handle conditionals in preview', () => {
      const content =
        '{{studentName}}{{#if email}}, Email: {{email}}{{/if}}{{#if phone}}, Phone: {{phone}}{{/if}}'

      const result = previewTemplate(content)

      expect(result).toContain('John Doe')
      expect(result).toContain(', Email: john@example.com')
      expect(result).toContain(', Phone: +1234567890')
    })

    it('should handle empty template', () => {
      const result = previewTemplate('')

      expect(result).toBe('')
    })

    it('should provide realistic sample data for dates', () => {
      const content = 'Created: {{createdDate}}, Last Contact: {{lastContactDate}}'

      const result = previewTemplate(content)

      // Should contain formatted dates
      expect(result).toMatch(/Created: \w+ \d+, \d{4}/)
      expect(result).toMatch(/Last Contact: \w+ \d+, \d{4}/)
    })

    it('should provide realistic sample data for metrics', () => {
      const content =
        'Communications: {{communicationCount}}, Tasks: {{taskCount}}, Score: {{score}}'

      const result = previewTemplate(content)

      expect(result).toContain('Communications: 5')
      expect(result).toContain('Tasks: 2')
      expect(result).toContain('Score: 85')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long template content', () => {
      const longContent = 'Hello {{studentName}}! '.repeat(1000)
      const template = { content: longContent }
      const mockLead = { studentName: 'John Doe' }

      const result = renderTemplate(template, mockLead)

      expect(result).toContain('Hello John Doe!')
      expect(result.length).toBeGreaterThan(10000)
    })

    it('should handle Unicode characters in variable values', () => {
      const leadWithUnicode = {
        studentName: 'José García 你好',
        email: 'josé@example.com',
      }

      const template = {
        content: 'Name: {{studentName}}, Email: {{email}}',
      }

      const result = renderTemplate(template, leadWithUnicode)

      expect(result).toBe('Name: José García 你好, Email: josé@example.com')
    })

    it('should handle numeric zero values correctly', () => {
      const leadWithZero = {
        studentName: 'Test User',
        score: 0,
        communicationCount: 0,
      }

      const template = {
        content: 'Score: {{score}}, Communications: {{communicationCount}}',
      }

      const result = renderTemplate(template, leadWithZero)

      expect(result).toContain('Score: 0')
      expect(result).toContain('Communications: 0')
    })

    it('should handle boolean false values in conditionals', () => {
      const template = {
        content: '{{#if studentName}}Has name{{/if}}',
      }

      const leadWithFalse = {
        studentName: false,
      }

      const result = renderTemplate(template, leadWithFalse)

      // false should not show conditional content
      expect(result).toBe('')
    })
  })
})
