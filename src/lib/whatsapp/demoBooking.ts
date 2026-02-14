/**
 * Demo Booking Service for WhatsApp Bot
 * Automated demo class booking via conversational flow
 *
 * Features:
 * - Multi-step conversation flow
 * - Student details collection
 * - Time slot suggestions
 * - Database integration
 * - Zoom link generation (placeholder)
 * - Confirmation messages
 */

import { SessionManager, WhatsAppSession } from './sessionManager'
import { prisma } from '@/lib/prisma'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

type BookingStep = 'initial' | 'collect_class' | 'collect_time' | 'confirm' | 'completed'

export class DemoBookingService {
  private sessionManager: SessionManager

  constructor() {
    this.sessionManager = new SessionManager()
  }

  /**
   * Start demo booking flow
   */
  async startDemoBooking(
    phoneNumber: string,
    phoneNumberId: string,
    studentName: string
  ): Promise<void> {
    // Set session to demo booking flow
    await this.sessionManager.setCurrentFlow(phoneNumber, 'demo_booking')

    // Initialize booking data
    await this.sessionManager.updateStudentDetails(phoneNumber, {
      name: studentName,
    })

    // Send initial message
    const message = `🎓 *Demo Class Booking*\n\nGreat choice, ${studentName}! Let's book your FREE demo class.\n\nWhich class are you preparing for?\n\n1️⃣ Class 11 (NEET Foundation)\n2️⃣ Class 12 (NEET Preparation)\n3️⃣ Dropper (NEET 2026/2027)\n\nJust type the number or class name!`

    await this.sendMessage(phoneNumber, phoneNumberId, message)
  }

  /**
   * Handle demo booking conversation flow
   */
  async handleDemoBookingFlow(
    phoneNumber: string,
    phoneNumberId: string,
    message: string,
    session: WhatsAppSession
  ): Promise<void> {
    const studentDetails = session.conversationContext.studentDetails || {}
    const currentStep = this.determineBookingStep(studentDetails)

    console.log(`📋 Demo booking step: ${currentStep} for ${phoneNumber}`)

    switch (currentStep) {
      case 'collect_class':
        await this.handleClassSelection(phoneNumber, phoneNumberId, message, studentDetails)
        break

      case 'collect_time':
        await this.handleTimeSelection(phoneNumber, phoneNumberId, message, studentDetails)
        break

      case 'confirm':
        await this.handleConfirmation(phoneNumber, phoneNumberId, message, studentDetails)
        break

      default:
        await this.startDemoBooking(phoneNumber, phoneNumberId, studentDetails.name || 'Student')
    }
  }

  /**
   * Determine current booking step based on collected data
   */
  private determineBookingStep(studentDetails: any): BookingStep {
    if (!studentDetails.class) {
      return 'collect_class'
    }
    if (!studentDetails.preferredTime) {
      return 'collect_time'
    }
    return 'confirm'
  }

  /**
   * Handle class selection
   */
  private async handleClassSelection(
    phoneNumber: string,
    phoneNumberId: string,
    message: string,
    studentDetails: any
  ): Promise<void> {
    // Parse class from message
    const normalizedMessage = message.toLowerCase().trim()
    let selectedClass = ''

    if (normalizedMessage.includes('11') || normalizedMessage === '1') {
      selectedClass = 'CLASS_11'
    } else if (normalizedMessage.includes('12') || normalizedMessage === '2') {
      selectedClass = 'CLASS_12'
    } else if (normalizedMessage.includes('dropper') || normalizedMessage === '3') {
      selectedClass = 'DROPPER'
    } else {
      // Invalid input, ask again
      const retryMessage = `I didn't understand that. Please choose:\n\n1️⃣ Class 11\n2️⃣ Class 12\n3️⃣ Dropper\n\nType the number (1, 2, or 3)`
      await this.sendMessage(phoneNumber, phoneNumberId, retryMessage)
      return
    }

    // Save class
    await this.sessionManager.updateStudentDetails(phoneNumber, {
      ...studentDetails,
      class: selectedClass,
    })

    // Ask for preferred time
    const timeMessage = `Perfect! ${this.formatClassName(selectedClass)} it is! 📚\n\nWhen would you like to attend the demo class?\n\n1️⃣ Today at 5:00 PM\n2️⃣ Tomorrow at 5:00 PM\n3️⃣ This Weekend (Saturday 11:00 AM)\n4️⃣ I'll call to schedule\n\nChoose an option (1-4):`

    await this.sendMessage(phoneNumber, phoneNumberId, timeMessage)
  }

  /**
   * Handle time selection
   */
  private async handleTimeSelection(
    phoneNumber: string,
    phoneNumberId: string,
    message: string,
    studentDetails: any
  ): Promise<void> {
    // Parse time preference
    const normalizedMessage = message.trim()
    let timeSlot = ''
    let timeDisplay = ''

    const now = new Date()
    const today = new Date(now)
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const saturday = new Date(now)
    saturday.setDate(saturday.getDate() + ((6 - saturday.getDay()) % 7 || 7))

    if (normalizedMessage === '1') {
      today.setHours(17, 0, 0, 0)
      timeSlot = today.toISOString()
      timeDisplay = `Today at 5:00 PM`
    } else if (normalizedMessage === '2') {
      tomorrow.setHours(17, 0, 0, 0)
      timeSlot = tomorrow.toISOString()
      timeDisplay = `Tomorrow at 5:00 PM`
    } else if (normalizedMessage === '3') {
      saturday.setHours(11, 0, 0, 0)
      timeSlot = saturday.toISOString()
      timeDisplay = `Saturday at 11:00 AM`
    } else if (normalizedMessage === '4') {
      timeSlot = 'callback'
      timeDisplay = 'I will call you to schedule'
    } else {
      // Invalid input
      const retryMessage = `Please choose a valid option:\n\n1️⃣ Today at 5:00 PM\n2️⃣ Tomorrow at 5:00 PM\n3️⃣ Saturday 11:00 AM\n4️⃣ I'll call to schedule\n\nType 1, 2, 3, or 4:`
      await this.sendMessage(phoneNumber, phoneNumberId, retryMessage)
      return
    }

    // Save time preference
    await this.sessionManager.updateStudentDetails(phoneNumber, {
      ...studentDetails,
      preferredTime: timeSlot,
    })

    // Confirm and create booking
    await this.createDemoBooking(phoneNumber, phoneNumberId, studentDetails, timeSlot, timeDisplay)
  }

  /**
   * Create demo booking in database
   */
  private async createDemoBooking(
    phoneNumber: string,
    phoneNumberId: string,
    studentDetails: any,
    timeSlot: string,
    timeDisplay: string
  ): Promise<void> {
    try {
      // Get or create user
      let user = await prisma.users.findUnique({
        where: { phone: phoneNumber },
      })

      if (!user) {
        // Create new user
        user = await prisma.users.create({
          data: {
            phone: phoneNumber,
            name: studentDetails.name || 'WhatsApp Student',
            role: 'STUDENT',
          },
        })
      }

      // Create demo booking
      const demoBooking = await prisma.demo_bookings.create({
        data: {
          userId: user.id,
          studentName: studentDetails.name || user.name,
          phone: phoneNumber,
          studentClass: studentDetails.class,
          preferredDate:
            timeSlot === 'callback'
              ? 'To be scheduled'
              : new Date(timeSlot).toLocaleDateString('en-IN'),
          preferredTime:
            timeSlot === 'callback'
              ? 'Will call'
              : new Date(timeSlot).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
          status: 'CONFIRMED',
          source: 'whatsapp_bot',
          message: 'Booked via WhatsApp AI Bot',
        },
      })

      console.log(`✅ Demo booking created: ${demoBooking.id}`)

      // Send confirmation message
      let confirmMessage = ''

      if (timeSlot === 'callback') {
        confirmMessage = `✅ *Demo Booking Confirmed!*\n\nHi ${studentDetails.name}! 🎉\n\nOur team will call you within 2 hours to schedule your demo class.\n\n📚 *Class:* ${this.formatClassName(studentDetails.class)}\n📞 *We'll call:* ${phoneNumber}\n\n*What to expect:*\n✓ Expert NEET Biology faculty\n✓ Live interactive session\n✓ Doubt clearing\n✓ NEET strategy tips\n\n*Contact Us:*\n📞 ${CONTACT_INFO.phone.display.primary}\n🌐 cerebrumbiologyacademy.com\n\nExcited to meet you! 🌟`
      } else {
        confirmMessage = `✅ *Demo Class Confirmed!*\n\nCongratulations ${studentDetails.name}! 🎉\n\n*Demo Details:*\n📅 ${timeDisplay}\n📚 Class: ${this.formatClassName(studentDetails.class)}\n👨‍🏫 Faculty: Dr. Priya Sharma (AIIMS Graduate)\n\n*Zoom Link:*\nWill be sent 30 minutes before class\n\n*What to Bring:*\n✓ Notebook and pen\n✓ Your NEET doubts\n✓ Curious mind!\n\n*Topics Covered:*\n• Cell Biology basics\n• NEET exam strategy\n• How to score 330+ in Biology\n\n*Contact:*\n📞 +91 88264 44334\n🌐 cerebrumbiologyacademy.com\n\nSee you in class! Can't wait! 🚀`
      }

      await this.sendMessage(phoneNumber, phoneNumberId, confirmMessage)

      // Clear demo booking flow
      await this.sessionManager.clearCurrentFlow(phoneNumber)

      // Log to communication log
      await prisma.communication_logs.create({
        data: {
          userId: user.id,
          demoBookingId: demoBooking.id,
          type: 'DEMO_CONFIRMATION',
          channel: 'WHATSAPP',
          content: confirmMessage,
          status: 'SENT',
        },
      })
    } catch (error) {
      console.error('❌ Error creating demo booking:', error)

      const errorMessage = `Sorry, there was an error booking your demo class. Please call us directly at ${CONTACT_INFO.phone.display.primary} or visit cerebrumbiologyacademy.com\n\nOur team is ready to help! 🙏`
      await this.sendMessage(phoneNumber, phoneNumberId, errorMessage)

      // Clear flow on error
      await this.sessionManager.clearCurrentFlow(phoneNumber)
    }
  }

  /**
   * Handle booking confirmation (if needed)
   */
  private async handleConfirmation(
    phoneNumber: string,
    phoneNumberId: string,
    message: string,
    studentDetails: any
  ): Promise<void> {
    // This step is combined with createDemoBooking
    // Kept for future enhancement
  }

  /**
   * Format class name for display
   */
  private formatClassName(classCode: string): string {
    const classNames: { [key: string]: string } = {
      CLASS_11: 'Class 11 (NEET Foundation)',
      CLASS_12: 'Class 12 (NEET Preparation)',
      DROPPER: 'Dropper Batch (NEET 2026/2027)',
    }
    return classNames[classCode] || classCode
  }

  /**
   * Send WhatsApp message
   */
  private async sendMessage(
    phoneNumber: string,
    phoneNumberId: string,
    message: string
  ): Promise<void> {
    try {
      const apiUrl = `${process.env.WHATSAPP_API_URL}/${phoneNumberId}/messages`
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: phoneNumber,
          type: 'text',
          text: {
            preview_url: true,
            body: message,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`WhatsApp API error: ${response.status}`)
      }
    } catch (error) {
      console.error('❌ Error sending message:', error)
      throw error
    }
  }
}
