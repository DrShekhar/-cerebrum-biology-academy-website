// DemoBookingSystem Types

export interface TimeSlot {
  id: string
  time: string
  available: boolean
  instructor?: string
  spotsLeft?: number
}

export interface BookingData {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  courseInterest: string[]
  currentClass: string
  previousScore?: string
  specificTopics: string
  hearAboutUs: string
  zoomMeetingId?: string
  zoomJoinUrl?: string
  zoomPassword?: string
}

export interface ValidationState {
  isValid?: boolean
  error?: string
  suggestion?: string
}

export interface ValidationStates {
  studentName?: ValidationState
  email?: ValidationState
  phone?: ValidationState
  [key: string]: ValidationState | undefined
}
