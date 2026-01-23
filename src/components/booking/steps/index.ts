// DemoBookingSystem Step Components - Modular architecture
// Split from original 1,225 line component for better maintainability

export { BookingHeader } from './BookingHeader'
export { BookingSuccess } from './BookingSuccess'
export { ConfirmationStep } from './ConfirmationStep'

// Re-export types from parent
export type { TimeSlot, BookingData, ValidationState, ValidationStates } from '../types'
