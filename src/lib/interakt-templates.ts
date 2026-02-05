/**
 * Interakt WhatsApp Message Templates
 *
 * IMPORTANT: These templates must be created and approved on Interakt Dashboard
 * before they can be used via API.
 *
 * Dashboard: https://app.interakt.ai/templates/list
 *
 * Template Naming Convention:
 * - Use snake_case for template names
 * - Keep names descriptive and under 512 characters
 * - Language code must match template creation language
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// ============================================
// TEMPLATE DEFINITIONS
// ============================================

export interface InteraktTemplate {
  name: string
  languageCode: string
  category: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY'
  description: string
  bodyText: string
  headerType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT'
  headerText?: string
  footerText?: string
  buttons?: Array<{
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER'
    text: string
    url?: string
    phoneNumber?: string
  }>
  variables: string[]
}

// ============================================
// AUTHENTICATION TEMPLATES
// ============================================

export const AUTH_TEMPLATES = {
  OTP_VERIFICATION: {
    name: 'otp_verification',
    languageCode: 'en',
    category: 'AUTHENTICATION' as const,
    description: 'OTP for phone number verification',
    bodyText: `Your Cerebrum Biology Academy verification code is: *{{1}}*

This code expires in 10 minutes.

Do not share this code with anyone. Our team will never ask for this code.`,
    footerText: 'Cerebrum Biology Academy',
    variables: ['otp_code'],
  },

  LOGIN_OTP: {
    name: 'login_otp',
    languageCode: 'en',
    category: 'AUTHENTICATION' as const,
    description: 'OTP for login verification',
    bodyText: `Hi {{1}},

Your login OTP for Cerebrum Biology Academy is: *{{2}}*

Valid for 5 minutes. If you didn't request this, please ignore.`,
    variables: ['student_name', 'otp_code'],
  },

  PASSWORD_RESET: {
    name: 'password_reset',
    languageCode: 'en',
    category: 'AUTHENTICATION' as const,
    description: 'Password reset OTP',
    bodyText: `Password Reset Request

Hi {{1}},

Your password reset code is: *{{2}}*

This code expires in 15 minutes. If you didn't request this, your account may be at risk.`,
    variables: ['student_name', 'reset_code'],
  },
}

// ============================================
// MARKETING TEMPLATES
// ============================================

export const MARKETING_TEMPLATES = {
  WELCOME_MESSAGE: {
    name: 'welcome_message',
    languageCode: 'en',
    category: 'MARKETING' as const,
    description: 'Welcome message for new leads/students',
    bodyText: `Hi {{1}}! Welcome to Cerebrum Biology Academy!

We're India's leading NEET Biology coaching with 98% success rate.

What we offer:
- Live interactive classes by AIIMS/JIPMER faculty
- 10,000+ MCQs with detailed solutions
- Personal mentor support
- Study materials & video lectures

Reply with:
DEMO - Book a free demo class
COURSES - View our programs
FEES - Check pricing
HELP - Talk to counselor

Let's make your MBBS dream a reality!`,
    variables: ['student_name'],
    buttons: [
      { type: 'QUICK_REPLY' as const, text: 'DEMO' },
      { type: 'QUICK_REPLY' as const, text: 'COURSES' },
      { type: 'QUICK_REPLY' as const, text: 'FEES' },
    ],
  },

  COURSE_INFO: {
    name: 'course_information',
    languageCode: 'en',
    category: 'MARKETING' as const,
    description: 'Course details and pricing',
    bodyText: `Our NEET Biology Programs:

*1. Pinnacle Batch (Class 12/Dropper)*
- Complete NEET Biology syllabus
- 200+ hours live classes
- Daily practice tests
- Fee: Starting Rs 42,000

*2. Foundation Batch (Class 11)*
- Strong concept building
- NCERT + Advanced topics
- Weekly tests
- Fee: Starting Rs 35,000

*3. Crash Course*
- Last 3 months intensive
- All chapters revision
- Mock tests
- Fee: Rs 15,000

Book a FREE demo: Reply DEMO
Talk to counselor: ${CONTACT_INFO.phone.display.hyphenated.primary}`,
    variables: [],
    buttons: [
      { type: 'QUICK_REPLY' as const, text: 'DEMO' },
      { type: 'PHONE_NUMBER' as const, text: 'Call Us', phoneNumber: CONTACT_INFO.phone.primary },
    ],
  },

  SPECIAL_OFFER: {
    name: 'special_offer',
    languageCode: 'en',
    category: 'MARKETING' as const,
    description: 'Promotional offers and discounts',
    bodyText: `Special Offer for You!

Hi {{1}},

We have an exclusive offer:
*{{2}}*

Valid till: {{3}}

Use code: {{4}}

Enroll now: {{5}}

Limited seats available!`,
    variables: ['student_name', 'offer_details', 'validity_date', 'promo_code', 'enrollment_link'],
  },

  NEET_TIPS: {
    name: 'daily_neet_tips',
    languageCode: 'en',
    category: 'MARKETING' as const,
    description: 'Daily NEET preparation tips',
    bodyText: `NEET Biology Tip of the Day

Hi {{1}},

Today's Topic: *{{2}}*

{{3}}

Quick Quiz:
{{4}}

Reply with your answer!

Need help? Ask our AI tutor anytime.`,
    variables: ['student_name', 'topic', 'tip_content', 'quiz_question'],
  },

  FOLLOW_UP: {
    name: 'lead_follow_up',
    languageCode: 'en',
    category: 'MARKETING' as const,
    description: 'Follow up with leads who showed interest',
    bodyText: `Hi {{1}},

Hope you're doing well!

We noticed you were interested in our {{2}} program.

Have any questions? Our counselor {{3}} is here to help.

Book a free consultation: {{4}}

Or simply reply to this message.

Best regards,
Team Cerebrum Biology Academy`,
    variables: ['student_name', 'course_name', 'counselor_name', 'booking_link'],
  },
}

// ============================================
// UTILITY TEMPLATES
// ============================================

export const UTILITY_TEMPLATES = {
  DEMO_CONFIRMATION: {
    name: 'demo_class_confirmation',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Confirm demo class booking',
    bodyText: `Your Demo Class is Confirmed!

Hi {{1}},

Your NEET Biology demo class is scheduled:

Date: {{2}}
Time: {{3}}
Topic: Cell Biology & NEET Strategy
Faculty: Dr. Priya Sharma (AIIMS Graduate)

Zoom link will be sent 30 minutes before class.

What to prepare:
- Notebook & pen
- Basic biology doubts
- Stable internet connection

For support: ${CONTACT_INFO.phone.display.hyphenated.primary}

See you in class!`,
    variables: ['student_name', 'demo_date', 'demo_time'],
  },

  DEMO_REMINDER: {
    name: 'demo_class_reminder',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Reminder before demo class',
    bodyText: `Demo Class Reminder

Hi {{1}},

Your demo class starts in {{2}}!

Join Link: {{3}}

Topic: {{4}}
Faculty: {{5}}

If you can't attend, please let us know so we can reschedule.

See you soon!`,
    variables: ['student_name', 'time_remaining', 'zoom_link', 'topic', 'faculty_name'],
  },

  ENROLLMENT_CONFIRMATION: {
    name: 'enrollment_confirmation',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Confirm successful enrollment',
    bodyText: `Congratulations! Welcome Aboard!

Hi {{1}},

Your enrollment is confirmed!

Course: {{2}}
Batch: {{3}}
Start Date: {{4}}

Your Login Credentials:
Email: {{5}}
Temporary Password: {{6}}

Login here: https://cerebrumbiologyacademy.com/student/login

What's Next:
1. Download study materials
2. Join your first class
3. Meet your mentor

Student Support: ${CONTACT_INFO.phone.display.hyphenated.primary}

Let's crack NEET together!`,
    variables: [
      'student_name',
      'course_name',
      'batch_name',
      'start_date',
      'login_email',
      'temp_password',
    ],
  },

  PAYMENT_CONFIRMATION: {
    name: 'payment_confirmation',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Confirm payment received',
    bodyText: `Payment Received - Thank You!

Hi {{1}},

We've received your payment:

Amount: Rs {{2}}
Transaction ID: {{3}}
Date: {{4}}
Course: {{5}}

Receipt: {{6}}

If you have any questions about your payment, contact us at ${CONTACT_INFO.phone.display.hyphenated.primary}.

Thank you for choosing Cerebrum Biology Academy!`,
    variables: [
      'student_name',
      'amount',
      'transaction_id',
      'payment_date',
      'course_name',
      'receipt_link',
    ],
  },

  PAYMENT_REMINDER: {
    name: 'payment_reminder',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Remind about pending payment',
    bodyText: `Payment Reminder

Hi {{1}},

This is a reminder about your pending payment:

Amount Due: Rs {{2}}
Due Date: {{3}}
Course: {{4}}

Pay Now: {{5}}

If you've already paid, please ignore this message.

Need help? Call: ${CONTACT_INFO.phone.display.hyphenated.primary}

Don't let anything stop your NEET preparation!`,
    variables: ['student_name', 'amount_due', 'due_date', 'course_name', 'payment_link'],
  },

  CLASS_REMINDER: {
    name: 'class_reminder',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Reminder before scheduled class',
    bodyText: `Class Starting Soon!

Hi {{1}},

Your class starts in {{2}}:

Subject: {{3}}
Topic: {{4}}
Faculty: {{5}}

Join: {{6}}

Don't miss it - attendance matters for your NEET prep!`,
    variables: ['student_name', 'time_remaining', 'subject', 'topic', 'faculty_name', 'join_link'],
  },

  TEST_REMINDER: {
    name: 'test_reminder',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Reminder for scheduled test',
    bodyText: `Test Alert!

Hi {{1}},

Your {{2}} is scheduled:

Date: {{3}}
Time: {{4}}
Duration: {{5}}
Topics: {{6}}

Test Link: {{7}}

Tips:
- Keep your ID ready
- Stable internet
- Quiet environment

All the best!`,
    variables: [
      'student_name',
      'test_name',
      'test_date',
      'test_time',
      'duration',
      'topics',
      'test_link',
    ],
  },

  TEST_RESULT: {
    name: 'test_result_notification',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Notify test results',
    bodyText: `Your Test Results Are Out!

Hi {{1}},

Test: {{2}}

Your Score: {{3}}/{{4}} ({{5}}%)
Rank: {{6}}
Time Taken: {{7}}

Strengths: {{8}}
Areas to Improve: {{9}}

View detailed analysis: {{10}}

Keep working hard!`,
    variables: [
      'student_name',
      'test_name',
      'score',
      'total_marks',
      'percentage',
      'rank',
      'time_taken',
      'strengths',
      'weaknesses',
      'analysis_link',
    ],
  },

  DOUBT_RESOLVED: {
    name: 'doubt_resolved',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Notify when doubt is resolved',
    bodyText: `Your Doubt Has Been Answered!

Hi {{1}},

Your question about "{{2}}" has been answered by {{3}}.

View Answer: {{4}}

Was this helpful? Reply YES or NO

Have more doubts? Ask anytime!`,
    variables: ['student_name', 'question_preview', 'faculty_name', 'answer_link'],
  },

  ASSIGNMENT_DUE: {
    name: 'assignment_due_reminder',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Remind about assignment deadline',
    bodyText: `Assignment Due Soon!

Hi {{1}},

Reminder: Your assignment is due soon.

Assignment: {{2}}
Subject: {{3}}
Due Date: {{4}}

Submit here: {{5}}

Complete on time to stay on track!`,
    variables: ['student_name', 'assignment_name', 'subject', 'due_date', 'submit_link'],
  },

  COUNSELOR_NOTIFICATION: {
    name: 'new_lead_alert',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Alert counselor about new lead',
    bodyText: `New Lead Alert!

Name: {{1}}
Phone: {{2}}
Interest: {{3}}

Initial Message:
"{{4}}"

Source: {{5}}
Time: {{6}}

Please respond within 5 minutes!`,
    variables: [
      'lead_name',
      'lead_phone',
      'course_interest',
      'initial_message',
      'lead_source',
      'timestamp',
    ],
  },

  SEO_CONTENT_APPROVAL: {
    name: 'seo_content_approval',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Send SEO content for owner approval',
    bodyText: `New {{1}} Ready for Review

Title: {{2}}

Preview:
{{3}}

{{4}}

Reply:
YES - Approve & Publish
NO - Reject

Ref: {{5}}`,
    variables: ['content_type', 'title', 'preview', 'stats', 'reference_id'],
  },

  SEO_CONTENT_PUBLISHED: {
    name: 'seo_content_published',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Notify when SEO content is published',
    bodyText: `{{1}} Published!

Title: {{2}}

View: {{3}}

Content is now live on the website.`,
    variables: ['content_type', 'title', 'published_url'],
  },

  SEO_DAILY_SUMMARY: {
    name: 'seo_daily_summary',
    languageCode: 'en',
    category: 'UTILITY' as const,
    description: 'Daily SEO content machine summary',
    bodyText: `SEO Machine Summary

Queue:
Pending: {{1}}
In Review: {{2}}
Published: {{3}}

Budget:
Used: {{4}}
Remaining: {{5}}

Reply STATUS for details`,
    variables: [
      'pending_count',
      'review_count',
      'published_count',
      'budget_used',
      'budget_remaining',
    ],
  },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all templates as a flat object
 */
export function getAllTemplates(): Record<string, InteraktTemplate> {
  return {
    ...AUTH_TEMPLATES,
    ...MARKETING_TEMPLATES,
    ...UTILITY_TEMPLATES,
  }
}

/**
 * Get template by name
 */
export function getTemplateByName(name: string): InteraktTemplate | undefined {
  const allTemplates = getAllTemplates()
  return Object.values(allTemplates).find((t) => t.name === name)
}

/**
 * Validate template variables
 */
export function validateTemplateVariables(
  templateName: string,
  providedValues: Record<string, string>
): { valid: boolean; missingVariables: string[] } {
  const template = getTemplateByName(templateName)
  if (!template) {
    return { valid: false, missingVariables: ['template_not_found'] }
  }

  const missingVariables = template.variables.filter(
    (v) => !providedValues[v] && providedValues[v] !== ''
  )

  return {
    valid: missingVariables.length === 0,
    missingVariables,
  }
}

/**
 * Format template body values for Interakt API
 * Converts named variables to positional array
 */
export function formatBodyValues(templateName: string, values: Record<string, string>): string[] {
  const template = getTemplateByName(templateName)
  if (!template) return []

  return template.variables.map((varName) => values[varName] || '')
}

// ============================================
// TEMPLATE COPY FOR INTERAKT DASHBOARD
// ============================================

/**
 * Generate template text for copying to Interakt Dashboard
 */
export function generateDashboardTemplate(templateKey: string): string {
  const allTemplates = getAllTemplates()
  const template = allTemplates[templateKey]

  if (!template) return 'Template not found'

  let output = `
===========================================
TEMPLATE: ${template.name}
===========================================
Category: ${template.category}
Language: ${template.languageCode}
Description: ${template.description}

-------------------------------------------
BODY TEXT (Copy this to Interakt):
-------------------------------------------
${template.bodyText}

-------------------------------------------
Variables (in order):
${template.variables.map((v, i) => `{{${i + 1}}} = ${v}`).join('\n')}
-------------------------------------------
`

  if (template.footerText) {
    output += `\nFooter: ${template.footerText}`
  }

  if (template.buttons) {
    output += `\n\nButtons:\n${template.buttons.map((b) => `- ${b.type}: ${b.text}`).join('\n')}`
  }

  return output
}
