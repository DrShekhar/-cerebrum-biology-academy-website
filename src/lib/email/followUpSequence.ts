import { CourseSelectionData } from '@/hooks/useCourseSelectorState'

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  sendDelay: number // in hours
  triggers: EmailTrigger[]
  personalizationTokens: string[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'nurture' | 'conversion' | 'urgency' | 'consultation' | 'support'
}

export interface EmailTrigger {
  type: 'abandoned_selection' | 'incomplete_step' | 'time_based' | 'behavior_based'
  condition: string
  value?: any
}

export interface EmailSequenceData {
  userProfile: CourseSelectionData
  abandonedStep: number
  timeSpentInSelector: number
  lastActiveDate: Date
  emailPreferences?: {
    frequency: 'immediate' | 'daily' | 'weekly'
    unsubscribed: boolean
    preferredTime: string
  }
  recommendedCourse?: {
    id: string
    name: string
    price: number
    matchingScore: number
  }
}

// Email templates for the follow-up sequence
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'immediate-abandon',
    name: 'Immediate Abandonment - Save Your Progress',
    subject: '{{firstName}}, your course selection progress is saved!',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #059669 0%, #1e40af 100%); padding: 30px 20px; text-align: center;">
          <img src="{{logoUrl}}" alt="Cerebrum Biology Academy" style="height: 40px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Your Progress is Saved!</h1>
          <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Continue where you left off</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hi {{firstName}},</h2>

          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
            We noticed you were exploring our NEET Biology courses and got to step {{currentStep}} of {{totalSteps}}.
            Don't worry - all your progress is safely saved!
          </p>

          <!-- Progress Bar -->
          <div style="background-color: #f3f4f6; border-radius: 10px; margin: 30px 0; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #059669, #1e40af); height: 8px; width: {{progressPercentage}}%; border-radius: 10px;"></div>
          </div>
          <p style="text-align: center; color: #6b7280; font-size: 14px; margin: 0 0 30px 0;">{{progressPercentage}}% Complete</p>

          <!-- Continue Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="{{continueUrl}}" style="background: linear-gradient(135deg, #059669 0%, #1e40af 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);">
              Continue My Selection
            </a>
          </div>

          <!-- Benefits Reminder -->
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 30px 0; border-radius: 5px;">
            <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">Why continue with us?</h3>
            <ul style="color: #166534; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">94.2% NEET qualification rate</li>
              <li style="margin-bottom: 8px;">Personalized study plans</li>
              <li style="margin-bottom: 8px;">Expert faculty from AIIMS & IITs</li>
              <li style="margin-bottom: 8px;">Free consultation worth ₹2000</li>
            </ul>
          </div>

          <!-- Social Proof -->
          <div style="text-align: center; background-color: #fef7ff; padding: 20px; border-radius: 10px; margin: 30px 0;">
            <p style="color: #7c3aed; font-weight: bold; margin: 0 0 10px 0;">🎉 Join 10,000+ successful students</p>
            <p style="color: #6b46c1; font-size: 14px; margin: 0;">"The course selection tool helped me choose the perfect plan. Got AIR 156!" - Priya S.</p>
          </div>

          <!-- Quick Help -->
          <div style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Need Help Deciding?</h3>
            <p style="color: #4b5563; margin: 0 0 15px 0;">Our counselors are available to help you choose the right course.</p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="{{whatsappUrl}}" style="background-color: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">💬 WhatsApp Chat</a>
              <a href="tel:+918826444334" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">📞 Call Now</a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 14px;">
            This email was sent because you started our course selection process.
          </p>
          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            <a href="{{unsubscribeUrl}}" style="color: #6b7280;">Unsubscribe</a> |
            <a href="{{preferencesUrl}}" style="color: #6b7280;">Email Preferences</a>
          </p>
        </div>
      </div>
    `,
    textContent: `Hi {{firstName}},

We noticed you were exploring our NEET Biology courses and got to step {{currentStep}} of {{totalSteps}}. Don't worry - all your progress is safely saved!

Continue your selection: {{continueUrl}}

Why continue with us?
- 94.2% NEET qualification rate
- Personalized study plans
- Expert faculty from AIIMS & IITs
- Free consultation worth ₹2000

Need help? WhatsApp us at {{whatsappUrl}} or call +91 88264 44334

Best regards,
Cerebrum Biology Academy Team`,
    sendDelay: 0.25, // 15 minutes
    triggers: [
      {
        type: 'abandoned_selection',
        condition: 'user_left_without_completing',
      },
    ],
    personalizationTokens: [
      'firstName',
      'currentStep',
      'totalSteps',
      'progressPercentage',
      'continueUrl',
    ],
    priority: 'high',
    category: 'conversion',
  },

  {
    id: 'day-1-follow-up',
    name: 'Day 1 - Personalized Recommendation',
    subject: '{{firstName}}, we found the perfect NEET course for your {{targetScore}} goal!',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Perfect Match Found! 🎯</h1>
          <p style="color: #fae8ff; margin: 10px 0 0 0; font-size: 16px;">Based on your preferences</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hi {{firstName}},</h2>

          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">
            Based on your goal of scoring {{targetScore}} and budget of ₹{{maxBudget}}, we've identified the
            <strong>{{recommendedCourse}}</strong> as your best match with a {{matchingScore}}% compatibility!
          </p>

          <!-- Course Recommendation Card -->
          <div style="border: 2px solid #7c3aed; border-radius: 15px; padding: 25px; margin: 30px 0; background: linear-gradient(135deg, #f8faff 0%, #fef7ff 100%);">
            <h3 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">{{recommendedCourse}}</h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
              <div>
                <strong style="color: #4b5563;">Perfect for:</strong><br>
                <span style="color: #6b7280;">{{targetScore}}+ scorers</span>
              </div>
              <div>
                <strong style="color: #4b5563;">Investment:</strong><br>
                <span style="color: #7c3aed; font-size: 18px; font-weight: bold;">₹{{coursePrice}}</span>
              </div>
            </div>

            <div style="background-color: white; border-radius: 10px; padding: 15px; margin: 15px 0;">
              <h4 style="color: #1f2937; margin: 0 0 10px 0;">Why this course is perfect for you:</h4>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 5px;">Matches your {{targetScore}} target score goal</li>
                <li style="margin-bottom: 5px;">Fits within your ₹{{maxBudget}} budget</li>
                <li style="margin-bottom: 5px;">{{hoursPerDay}} hours/day study schedule</li>
                <li style="margin-bottom: 5px;">Available in {{preferredLocation}}</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 25px 0 0 0;">
              <a href="{{enrollUrl}}" style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; display: inline-block;">
                Enroll in {{recommendedCourse}}
              </a>
            </div>
          </div>

          <!-- Limited Time Offer -->
          <div style="background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%); border: 2px solid #f87171; border-radius: 10px; padding: 20px; margin: 30px 0; text-align: center;">
            <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 20px;">⏰ Limited Time: 15% OFF</h3>
            <p style="color: #7f1d1d; margin: 0 0 15px 0; font-size: 14px;">Use code <strong>PERFECT15</strong> - Valid for next 48 hours only!</p>
            <p style="color: #dc2626; font-weight: bold; margin: 0; font-size: 16px;">Save ₹{{discountAmount}} on your enrollment</p>
          </div>

          <!-- Success Stories -->
          <div style="background-color: #f0fdf4; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">🏆 Recent Success Stories</h3>
            <div style="font-style: italic; color: #166534; margin-bottom: 10px;">
              "The {{recommendedCourse}} helped me improve from 520 to 680! Perfect choice for my target." - Arjun K. (AIR 234)
            </div>
            <div style="font-style: italic; color: #166534;">
              "Exactly what I needed for my budget and schedule. Highly recommended!" - Sneha R. (AIR 456)
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <div style="margin-bottom: 20px;">
            <a href="{{whatsappUrl}}" style="background-color: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">💬 Get Free Counseling</a>
            <a href="{{alternativeCoursesUrl}}" style="background-color: #3b82f6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">🔍 See Other Options</a>
          </div>
          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            <a href="{{unsubscribeUrl}}" style="color: #6b7280;">Unsubscribe</a> |
            <a href="{{preferencesUrl}}" style="color: #6b7280;">Email Preferences</a>
          </p>
        </div>
      </div>
    `,
    textContent: `Hi {{firstName}},

Based on your goal of scoring {{targetScore}} and budget of ₹{{maxBudget}}, we've identified the {{recommendedCourse}} as your best match with a {{matchingScore}}% compatibility!

Why this course is perfect for you:
- Matches your {{targetScore}} target score goal
- Fits within your ₹{{maxBudget}} budget
- {{hoursPerDay}} hours/day study schedule
- Available in {{preferredLocation}}

LIMITED TIME: 15% OFF with code PERFECT15
Save ₹{{discountAmount}} - Valid for next 48 hours only!

Enroll now: {{enrollUrl}}

Need help deciding? WhatsApp us: {{whatsappUrl}}

Best regards,
Cerebrum Biology Academy Team`,
    sendDelay: 24, // 24 hours
    triggers: [
      {
        type: 'time_based',
        condition: 'no_return_after_24h',
      },
    ],
    personalizationTokens: [
      'firstName',
      'targetScore',
      'maxBudget',
      'recommendedCourse',
      'matchingScore',
    ],
    priority: 'high',
    category: 'conversion',
  },

  {
    id: 'day-3-urgency',
    name: 'Day 3 - Batch Filling Up Urgency',
    subject: 'Only 12 seats left in your preferred batch, {{firstName}}!',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Urgent Header -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); padding: 30px 20px; text-align: center; position: relative;">
          <div style="background-color: #fef2f2; color: #dc2626; padding: 8px 20px; border-radius: 20px; display: inline-block; margin-bottom: 15px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
            ⚠️ Urgent Notice
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Batch Filling Up Fast!</h1>
          <p style="color: #fed7d7; margin: 10px 0 0 0; font-size: 16px;">Secure your seat before it's too late</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hi {{firstName}},</h2>

          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%); border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 20px;">🚨 Important Update</h3>
            <p style="color: #7f1d1d; margin: 0; font-size: 16px; line-height: 1.5;">
              The <strong>{{recommendedCourse}}</strong> batch you were interested in now has only
              <span style="background-color: #dc2626; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;">12 seats remaining</span>
              out of 60 total seats.
            </p>
          </div>

          <!-- Seat Counter -->
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 15px; padding: 25px; border: 2px solid #dc2626;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Batch Availability Status</h3>

              <!-- Visual seat counter -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
                <div style="text-align: center;">
                  <div style="font-size: 32px; font-weight: bold; color: #dc2626;">12</div>
                  <div style="font-size: 14px; color: #6b7280;">Seats Left</div>
                </div>
                <div style="flex: 1; margin: 0 20px;">
                  <div style="background-color: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background-color: #dc2626; height: 100%; width: 80%; border-radius: 4px;"></div>
                  </div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 32px; font-weight: bold; color: #6b7280;">60</div>
                  <div style="font-size: 14px; color: #6b7280;">Total Seats</div>
                </div>
              </div>

              <p style="color: #dc2626; font-weight: bold; margin: 15px 0 0 0; font-size: 14px;">
                📈 23 students enrolled in the last 48 hours
              </p>
            </div>
          </div>

          <!-- What You'll Miss -->
          <div style="background-color: #fffbeb; border: 1px solid #f59e0b; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #d97706; margin: 0 0 15px 0; font-size: 18px;">❌ What you'll miss if this batch fills up:</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Optimal batch timing that matches your schedule</li>
              <li style="margin-bottom: 8px;">Study group with like-minded students</li>
              <li style="margin-bottom: 8px;">Personalized attention from faculty</li>
              <li style="margin-bottom: 8px;">Next batch starts 6 weeks later</li>
            </ul>
          </div>

          <!-- Recent Activity -->
          <div style="background-color: #f0f9ff; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px;">🔥 Recent Activity</h3>
            <div style="space-y: 10px;">
              <div style="color: #075985; font-size: 14px; margin-bottom: 8px;">• Priya from {{userLocation}} enrolled 2 hours ago</div>
              <div style="color: #075985; font-size: 14px; margin-bottom: 8px;">• Arjun from Mumbai enrolled 4 hours ago</div>
              <div style="color: #075985; font-size: 14px; margin-bottom: 8px;">• Sneha from Delhi enrolled yesterday</div>
            </div>
          </div>

          <!-- Secure Seat CTA -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="{{enrollUrl}}" style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 18px 50px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 20px; display: inline-block; box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3); text-transform: uppercase;">
              🔒 Secure My Seat Now
            </a>
            <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 14px;">
              ⚡ Instant confirmation • 💳 Secure payment • 📱 Start immediately
            </p>
          </div>

          <!-- Alternative Options -->
          <div style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px;">Need more time to decide?</h3>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
              <a href="{{consultationUrl}}" style="background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">🗓️ Book Free Consultation</a>
              <span style="color: #6b7280; font-size: 14px;">or</span>
              <a href="{{whatsappUrl}}" style="background-color: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">💬 Quick WhatsApp Chat</a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #dc2626; font-weight: bold; margin: 0 0 15px 0; font-size: 14px;">
            ⏰ This batch fills up in 2-3 days on average
          </p>
          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            <a href="{{unsubscribeUrl}}" style="color: #6b7280;">Unsubscribe</a> |
            <a href="{{preferencesUrl}}" style="color: #6b7280;">Email Preferences</a>
          </p>
        </div>
      </div>
    `,
    textContent: `Hi {{firstName}},

🚨 URGENT: The {{recommendedCourse}} batch you were interested in now has only 12 seats remaining out of 60 total seats.

What you'll miss if this batch fills up:
- Optimal batch timing that matches your schedule
- Study group with like-minded students
- Personalized attention from faculty
- Next batch starts 6 weeks later

Recent Activity:
- 23 students enrolled in the last 48 hours
- Priya from {{userLocation}} enrolled 2 hours ago

Secure your seat now: {{enrollUrl}}

Need help deciding?
- Book free consultation: {{consultationUrl}}
- WhatsApp chat: {{whatsappUrl}}

Best regards,
Cerebrum Biology Academy Team`,
    sendDelay: 72, // 72 hours
    triggers: [
      {
        type: 'time_based',
        condition: 'no_enrollment_after_72h',
      },
    ],
    personalizationTokens: ['firstName', 'recommendedCourse', 'userLocation'],
    priority: 'urgent',
    category: 'urgency',
  },

  {
    id: 'day-7-final-offer',
    name: 'Day 7 - Final Offer & Alternative Solutions',
    subject: 'Final call: Special scholarship opportunity, {{firstName}}',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎓 Special Scholarship Opportunity</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">One final opportunity to join us</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hi {{firstName}},</h2>

          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">
            We understand that choosing the right NEET coaching is a big decision. Since you showed interest in our
            {{recommendedCourse}} but haven't enrolled yet, we'd like to offer you something special.
          </p>

          <!-- Scholarship Offer -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 15px; padding: 25px; margin: 30px 0; text-align: center;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 24px; font-weight: bold;">🏆 Merit Scholarship</h3>
            <div style="font-size: 36px; font-weight: bold; color: #d97706; margin: 15px 0;">30% OFF</div>
            <p style="color: #92400e; margin: 0 0 20px 0; font-size: 16px;">
              Based on your target score of {{targetScore}}, you qualify for our merit scholarship
            </p>
            <div style="background-color: white; border-radius: 10px; padding: 15px; margin: 20px 0;">
              <div style="font-size: 18px; color: #1f2937;">
                <span style="text-decoration: line-through; color: #6b7280;">₹{{originalPrice}}</span>
                <span style="font-weight: bold; color: #059669; margin-left: 10px;">₹{{discountedPrice}}</span>
              </div>
              <p style="color: #059669; font-weight: bold; margin: 5px 0 0 0; font-size: 14px;">
                Save ₹{{savingsAmount}} with scholarship code: MERIT30
              </p>
            </div>
          </div>

          <!-- Why This Opportunity -->
          <div style="background-color: #f0f9ff; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px;">Why we're offering this scholarship:</h3>
            <ul style="color: #075985; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Your {{targetScore}} target shows serious commitment</li>
              <li style="margin-bottom: 8px;">We believe in making quality education accessible</li>
              <li style="margin-bottom: 8px;">You've shown genuine interest in our program</li>
              <li style="margin-bottom: 8px;">We want to be part of your success story</li>
            </ul>
          </div>

          <!-- Alternative Solutions -->
          <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Not ready to commit? We understand.</h3>
            <p style="color: #475569; margin: 0 0 15px 0;">Here are some alternatives to help you get started:</p>

            <div style="display: grid; gap: 15px;">
              <div style="background-color: white; border-radius: 8px; padding: 15px; border-left: 4px solid #06b6d4;">
                <h4 style="color: #0891b2; margin: 0 0 8px 0; font-size: 16px;">📚 Free Study Materials</h4>
                <p style="color: #475569; margin: 0; font-size: 14px;">Get our NEET Biology chapter summaries and practice questions</p>
                <a href="{{freeResourcesUrl}}" style="color: #0891b2; font-weight: bold; text-decoration: none; font-size: 14px;">Download Now →</a>
              </div>

              <div style="background-color: white; border-radius: 8px; padding: 15px; border-left: 4px solid #8b5cf6;">
                <h4 style="color: #7c3aed; margin: 0 0 8px 0; font-size: 16px;">🧪 Free Mock Test</h4>
                <p style="color: #475569; margin: 0; font-size: 14px;">Take our NEET practice test and get detailed analysis</p>
                <a href="{{mockTestUrl}}" style="color: #7c3aed; font-weight: bold; text-decoration: none; font-size: 14px;">Take Test →</a>
              </div>

              <div style="background-color: white; border-radius: 8px; padding: 15px; border-left: 4px solid #059669;">
                <h4 style="color: #047857; margin: 0 0 8px 0; font-size: 16px;">💬 Free Consultation</h4>
                <p style="color: #475569; margin: 0; font-size: 14px;">Get personalized guidance from our NEET experts</p>
                <a href="{{consultationUrl}}" style="color: #047857; font-weight: bold; text-decoration: none; font-size: 14px;">Book Now →</a>
              </div>
            </div>
          </div>

          <!-- Final CTA -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="{{scholarshipEnrollUrl}}" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 18px 45px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; display: inline-block; margin-bottom: 15px;">
              🎓 Claim Scholarship (30% OFF)
            </a>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              ⏰ Scholarship valid until {{scholarshipExpiry}} • Limited to first 50 students
            </p>
          </div>

          <!-- Success Stories -->
          <div style="background-color: #f0fdf4; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">💬 What Our Scholarship Students Say</h3>
            <blockquote style="border-left: 3px solid #22c55e; padding-left: 15px; margin: 0 0 15px 0; font-style: italic; color: #166534;">
              "The scholarship made it possible for me to join. Best decision ever! Got AIR 89." - Rohit M.
            </blockquote>
            <blockquote style="border-left: 3px solid #22c55e; padding-left: 15px; margin: 0; font-style: italic; color: #166534;">
              "Quality education shouldn't be expensive. Grateful for the opportunity!" - Ananya P.
            </blockquote>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #4b5563; margin: 0 0 20px 0; font-size: 16px; font-weight: 500;">
            This is our final outreach. We hope to see you succeed in your NEET journey! 💪
          </p>

          <div style="margin-bottom: 20px;">
            <a href="{{whatsappUrl}}" style="background-color: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px; font-size: 14px;">💬 Last Minute Questions?</a>
          </div>

          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            <a href="{{unsubscribeUrl}}" style="color: #6b7280;">Unsubscribe</a> |
            <a href="{{preferencesUrl}}" style="color: #6b7280;">Email Preferences</a>
          </p>
        </div>
      </div>
    `,
    textContent: `Hi {{firstName}},

We understand that choosing the right NEET coaching is a big decision. Since you showed interest in our {{recommendedCourse}} but haven't enrolled yet, we'd like to offer you something special.

🏆 MERIT SCHOLARSHIP: 30% OFF
Based on your target score of {{targetScore}}, you qualify for our merit scholarship.

Original Price: ₹{{originalPrice}}
With Scholarship: ₹{{discountedPrice}}
You Save: ₹{{savingsAmount}}
Code: MERIT30

Why we're offering this:
- Your {{targetScore}} target shows serious commitment
- We believe in making quality education accessible
- You've shown genuine interest in our program
- We want to be part of your success story

Not ready to commit? Here are free alternatives:
- Free Study Materials: {{freeResourcesUrl}}
- Free Mock Test: {{mockTestUrl}}
- Free Consultation: {{consultationUrl}}

Claim scholarship: {{scholarshipEnrollUrl}}
Valid until {{scholarshipExpiry}}

This is our final outreach. We hope to see you succeed! 💪

Best regards,
Cerebrum Biology Academy Team`,
    sendDelay: 168, // 7 days
    triggers: [
      {
        type: 'time_based',
        condition: 'final_outreach_after_7_days',
      },
    ],
    personalizationTokens: [
      'firstName',
      'targetScore',
      'recommendedCourse',
      'originalPrice',
      'discountedPrice',
    ],
    priority: 'medium',
    category: 'nurture',
  },
]

// Follow-up sequence orchestrator
export class FollowUpSequence {
  private emailQueue: Array<{
    template: EmailTemplate
    scheduledFor: Date
    personalizedData: any
  }> = []

  constructor(private sequenceData: EmailSequenceData) {}

  // Initialize the email sequence based on user behavior
  initializeSequence(): void {
    const { userProfile, abandonedStep, timeSpentInSelector } = this.sequenceData

    // Trigger immediate abandonment email if user spent enough time
    if (timeSpentInSelector > 60000) {
      // More than 1 minute
      this.scheduleEmail('immediate-abandon', 0.25) // 15 minutes
    }

    // Schedule follow-up emails
    this.scheduleEmail('day-1-follow-up', 24) // 1 day
    this.scheduleEmail('day-3-urgency', 72) // 3 days
    this.scheduleEmail('day-7-final-offer', 168) // 7 days
  }

  // Schedule an email to be sent
  private scheduleEmail(templateId: string, delayHours: number): void {
    const template = EMAIL_TEMPLATES.find((t) => t.id === templateId)
    if (!template) return

    const scheduledFor = new Date(Date.now() + delayHours * 60 * 60 * 1000)
    const personalizedData = this.generatePersonalizedData(template)

    this.emailQueue.push({
      template,
      scheduledFor,
      personalizedData,
    })
  }

  // Generate personalized data for email template
  private generatePersonalizedData(template: EmailTemplate): any {
    const { userProfile, recommendedCourse } = this.sequenceData

    return {
      firstName: userProfile.personalInfo?.name?.split(' ')[0] || 'Student',
      targetScore: userProfile.goals?.targetScore || 650,
      maxBudget: userProfile.budget?.maxAmount || 75000,
      currentStep: userProfile.personalInfo?.currentClass || 'Goal Setting',
      totalSteps: 8,
      progressPercentage: Math.round((3 / 8) * 100), // Assuming abandoned at step 3
      recommendedCourse: recommendedCourse?.name || 'Pinnacle Series',
      coursePrice: recommendedCourse?.price || 75000,
      matchingScore: recommendedCourse?.matchingScore || 85,
      userLocation: userProfile.location?.city || 'your city',
      hoursPerDay: userProfile.timeAvailability?.hoursPerDay || 6,
      preferredLocation:
        userProfile.location?.preferredMode === 'online'
          ? 'Online Mode'
          : userProfile.location?.city,

      // URLs (these would be dynamically generated in real implementation)
      continueUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/course-selector?resume=true`,
      enrollUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/enroll?course=${recommendedCourse?.id}&source=email`,
      whatsappUrl: `https://wa.me/918826444334?text=${encodeURIComponent('Hi! I got your email about course selection.')}`,
      scholarshipEnrollUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/enroll?scholarship=MERIT30`,
      consultationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/consultation`,
      freeResourcesUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/free-resources`,
      mockTestUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/mock-test`,
      unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe`,
      preferencesUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/email-preferences`,

      // Calculated values
      discountAmount: Math.floor((recommendedCourse?.price || 75000) * 0.15),
      originalPrice: (recommendedCourse?.price || 75000).toLocaleString(),
      discountedPrice: Math.floor((recommendedCourse?.price || 75000) * 0.7).toLocaleString(),
      savingsAmount: Math.floor((recommendedCourse?.price || 75000) * 0.3).toLocaleString(),
      scholarshipExpiry: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString(),
    }
  }

  // Get emails ready to be sent
  getEmailsToSend(currentTime: Date = new Date()): Array<{ template: EmailTemplate; data: any }> {
    return this.emailQueue
      .filter((item) => item.scheduledFor <= currentTime)
      .map((item) => ({
        template: item.template,
        data: item.personalizedData,
      }))
  }

  // Mark emails as sent (remove from queue)
  markEmailsAsSent(templateIds: string[]): void {
    this.emailQueue = this.emailQueue.filter((item) => !templateIds.includes(item.template.id))
  }

  // Get queue status
  getQueueStatus(): {
    pending: number
    nextEmail: { template: string; scheduledFor: Date } | null
  } {
    const nextItem = this.emailQueue.sort(
      (a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime()
    )[0]

    return {
      pending: this.emailQueue.length,
      nextEmail: nextItem
        ? {
            template: nextItem.template.name,
            scheduledFor: nextItem.scheduledFor,
          }
        : null,
    }
  }
}

// Email personalization utility
export function personalizeEmailContent(
  template: EmailTemplate,
  data: any
): { subject: string; htmlContent: string; textContent: string } {
  let subject = template.subject
  let htmlContent = template.htmlContent
  let textContent = template.textContent

  // Replace all personalization tokens
  template.personalizationTokens.forEach((token) => {
    const value = data[token] || ''
    const regex = new RegExp(`{{${token}}}`, 'g')

    subject = subject.replace(regex, value)
    htmlContent = htmlContent.replace(regex, value)
    textContent = textContent.replace(regex, value)
  })

  return { subject, htmlContent, textContent }
}

// Email sending utility (mock implementation)
export async function sendEmail(
  to: string,
  template: EmailTemplate,
  personalizedData: any
): Promise<boolean> {
  try {
    const { subject, htmlContent, textContent } = personalizeEmailContent(
      template,
      personalizedData
    )

    // In real implementation, this would integrate with email service
    // (SendGrid, AWS SES, Mailgun, etc.)
    console.log('Sending email:', {
      to,
      subject,
      template: template.name,
      category: template.category,
      priority: template.priority,
    })

    // Mock successful send
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}
