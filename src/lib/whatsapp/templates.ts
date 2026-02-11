/**
 * WhatsApp Message Templates
 * Pre-formatted messages for common bot responses
 *
 * Features:
 * - Welcome messages
 * - Help/Menu
 * - Error messages
 * - Rate limit warnings
 * - Support information
 * - Enrollment status messages
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export class WhatsAppTemplates {
  /**
   * Welcome/Help Message
   */
  getWelcomeMessage(studentName: string): string {
    return `👋 *Hi ${studentName}!*

Welcome to *Cerebrum Biology Academy* - Your 24/7 NEET Biology Tutor! 🎓

*I can help you with:*

📚 *Biology Questions*
Just ask any NEET Biology doubt and get instant answers with NCERT references!

🎯 *Quick Commands:*
• *DEMO* - Book a FREE demo class
• *TEST* - Get practice test link
• *STATUS* - Check your enrollment
• *SUPPORT* - Talk to our team

*Why Choose Us?*
✓ 98% NEET qualification rate
✓ AIIMS/JIPMER faculty
✓ 10,000+ successful students
✓ Complete Biology coverage

*Ready to start?*
Ask me any Biology question or send a command!

Example: "What is photosynthesis?" 🌱`
  }

  /**
   * Test/Practice Message
   */
  getTestMessage(): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'
    return `📝 *Practice Test Generator*

Generate personalized NEET Biology tests based on your level!

*Features:*
✓ Topic-wise tests
✓ Difficulty levels (Easy/Medium/Hard)
✓ Previous year questions
✓ Instant results & analysis
✓ Detailed explanations

*Access Practice Tests:*
🔗 ${siteUrl}/student/practice-test

*Quick Tips:*
• Start with topic-wise tests
• Practice 50 MCQs daily
• Review wrong answers thoroughly
• Track your progress weekly

Need help with specific topics? Just ask! 💪`
  }

  /**
   * Support Message
   */
  getSupportMessage(): string {
    return `📞 *Human Support Available*

Our expert team is here to help you!

*Contact Information:*
📱 Phone: ${CONTACT_INFO.phone.display.primary}
📧 Email: info@cerebrumbiologyacademy.com
🌐 Website: cerebrumbiologyacademy.com

*Support Hours:*
Monday - Saturday: 9 AM - 8 PM
Sunday: 10 AM - 6 PM

*Average Response Time:*
• Phone: Immediate
• WhatsApp: Within 2 hours
• Email: Within 4 hours

*What We Can Help With:*
✓ Course enrollment queries
✓ Payment assistance
✓ Technical issues
✓ Study planning
✓ Demo class scheduling

For Biology doubts, just ask me directly! I'm available 24/7! 🤖`
  }

  /**
   * Not Enrolled Message
   */
  getNotEnrolledMessage(): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'
    return `📚 *Not Enrolled Yet?*

You're not enrolled in any course currently, but I can still help!

*What I Can Do:*
✓ Answer Biology questions
✓ Provide NCERT references
✓ Share study tips
✓ Book a FREE demo class

*Want to Join?*

*Our Popular Courses:*
1️⃣ Class 11 - NEET Foundation
2️⃣ Class 12 - NEET Preparation
3️⃣ Dropper Batch - NEET 2026/2027

*Benefits:*
✓ Live classes with AIIMS faculty
✓ Recorded lectures (lifetime access)
✓ 10,000+ practice questions
✓ Weekly tests & analysis
✓ Personal mentor support

*Next Steps:*
📱 Book FREE Demo: Send *DEMO*
🌐 Explore Courses: ${siteUrl}/courses
📞 Call Us: ${CONTACT_INFO.phone.display.primary}

Ready to crack NEET? Let's start! 🚀`
  }

  /**
   * Rate Limit Message
   */
  getRateLimitMessage(): string {
    return `⚠️ *Slow Down, Future Doctor!*

You're sending messages too quickly!

To ensure quality responses for all students, please wait a minute before sending your next message.

*Message Limits:*
• Max 10 messages per minute
• Resets every 60 seconds

*Tips While Waiting:*
📝 Prepare your questions clearly
📚 Review previous answers
🤔 Think about related concepts

Your limit will reset in 60 seconds! ⏰

For urgent help, call: ${CONTACT_INFO.phone.display.primary}`
  }

  /**
   * Error Message
   */
  getErrorMessage(): string {
    return `❌ *Oops! Something went wrong*

I encountered an error while processing your request.

*What to do:*
1️⃣ Wait a moment and try again
2️⃣ Rephrase your question
3️⃣ Check your internet connection

*Still not working?*
📞 Call us: ${CONTACT_INFO.phone.display.primary}
📧 Email: info@cerebrumbiologyacademy.com

Our team has been notified and will fix this soon!

Thanks for your patience! 🙏`
  }

  /**
   * Unsupported Message Type
   */
  getUnsupportedMessageType(): string {
    return `🤖 *Message Type Not Supported*

I can currently help with:

✅ *Text Messages*
Type your Biology questions

✅ *Commands*
HELP, DEMO, TEST, STATUS, SUPPORT

*Coming Soon:*
🎤 Voice notes
📸 Image questions (diagrams)
📹 Video explanations

For now, please send text messages!

Example: "Explain DNA replication" 🧬`
  }

  /**
   * Daily Study Tip
   */
  getDailyStudyTip(): string {
    const tips = [
      `💡 *Study Tip of the Day*

*Spaced Repetition Works!*

Review topics at these intervals:
• 1 day after learning
• 3 days later
• 1 week later
• 2 weeks later
• 1 month later

This increases retention by 80%! 📈`,

      `💡 *Study Tip of the Day*

*Make Visual Diagrams!*

Biology is visual. Draw:
• Cell structures
• Life cycles
• Metabolic pathways
• Body systems

Visual memory lasts 3x longer! 🎨`,

      `💡 *Study Tip of the Day*

*Practice MCQs Daily!*

Solve at least 50 MCQs every day:
• 20 new questions
• 30 revision questions

This builds speed AND accuracy! ⚡`,

      `💡 *Study Tip of the Day*

*Teach Someone Else!*

Explaining concepts to others:
• Identifies your weak areas
• Strengthens understanding
• Improves recall by 90%

Find a study buddy today! 👥`,

      `💡 *Study Tip of the Day*

*NCERT is Your Bible!*

NEET Biology = 80% NCERT

Read NCERT:
• Line by line
• Make notes
• Solve in-text questions
• Review diagrams

Master NCERT = 300+ marks! 📖`,
    ]

    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    return randomTip + "\n\n_Ask me any doubt! I'm here 24/7!_ 🌟"
  }

  /**
   * Motivational Message
   */
  getMotivationalMessage(studentName: string): string {
    const messages = [
      `🌟 *Hey ${studentName}!*

Every AIIMS doctor started where you are today.

Your dedication + Our guidance = Medical College! 🩺

Keep going, future doctor! 💪`,

      `🚀 *${studentName}, Remember:*

Success in NEET = Consistency, not intensity

Study 6 hours daily > Study 14 hours once a week

Small steps, big dreams! 🎯`,

      `⭐ *You've Got This, ${studentName}!*

Our students have:
• 98% NEET qualification rate
• 540+ average Biology score
• Multiple AIIMS selections

You'll be next! Believe it! 💫`,

      `💪 *Keep Pushing, ${studentName}!*

NEET Preparation Formula:
• 40% Hard Work
• 30% Smart Strategy
• 20% Consistent Practice
• 10% Staying Motivated

You're on the right path! 🛤️`,

      `🎯 *${studentName}, Focus!*

Biology = 50% of NEET marks!

Master Biology = Half the battle won!

Let's do this together! 🙌`,
    ]

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    return randomMessage + '\n\n_Need help? Just ask!_ 📚'
  }

  /**
   * Exam Reminder
   */
  getExamReminderMessage(examName: string, daysLeft: number): string {
    return `⏰ *${examName} Alert!*

Only *${daysLeft} days* left for ${examName}!

*Revision Checklist:*
✅ Complete NCERT revision
✅ Solve previous year papers
✅ Practice weak topics
✅ Take mock tests weekly
✅ Review notes daily

*Final Sprint Tips:*
• Focus on high-weightage topics
• Solve 100 MCQs daily
• Time yourself
• Stay calm & confident

*Need Revision Help?*
Ask me any topic for quick revision!

You're going to ace this! 🏆`
  }

  /**
   * Payment Reminder (for enrolled students)
   */
  getPaymentReminderMessage(studentName: string, amount: number, dueDate: string): string {
    return `💳 *Payment Reminder*

Hi ${studentName}! 👋

Your course installment is due soon.

*Payment Details:*
💰 Amount: ₹${amount.toLocaleString()}
📅 Due Date: ${dueDate}
🎯 Course: NEET Biology Complete

*Pay Now:*
🔗 [Payment Link]
📞 Call: ${CONTACT_INFO.phone.display.primary}

*Why Pay On Time?*
✓ Uninterrupted access
✓ All study materials
✓ Live class access
✓ Mentor support

Don't let payment stop your medical dream! 🩺

Questions? Reply here or call us! 📞`
  }

  /**
   * Success Story Sharing
   */
  getSuccessStoryMessage(): string {
    return `🏆 *Student Success Story*

*Meet Priya Sharma* 🎓
AIIMS Delhi 2024

*Her Journey:*
• Started: 450 in mock tests
• Joined: Cerebrum Class 12 Batch
• Final Score: 680/720 (NEET 2024)
• Biology: 358/360 ⭐

*Her Secret:*
"I asked doubts daily on WhatsApp, practiced 100 MCQs every day, and never skipped NCERT!"

*You Can Do This Too!*

Start your journey today:
📱 Send DEMO for free class
📚 Ask any Biology doubt
🎯 Practice daily

Your success story is next! 💫`
  }

  /**
   * Weekend Study Plan
   */
  getWeekendStudyPlan(): string {
    return `📅 *Weekend Study Plan*

Make your weekend count! 💪

*Saturday:*
🌅 Morning (9 AM - 12 PM)
• Revise weak topics
• Make concept notes

🌞 Afternoon (2 PM - 5 PM)
• Solve 100 MCQs
• Analyze mistakes

🌙 Evening (6 PM - 8 PM)
• Watch recorded lectures
• Clear doubts (ask me!)

*Sunday:*
🌅 Morning (9 AM - 1 PM)
• Full mock test (3 hours)
• Detailed analysis

🌞 Afternoon (3 PM - 6 PM)
• Review previous topics
• Update revision notes

🌙 Evening (7 PM - 8 PM)
• Plan next week
• Relax & recharge

*Pro Tip:*
Take breaks every 90 minutes! 🧘

Questions? Ask me anytime! 🤖`
  }
}
