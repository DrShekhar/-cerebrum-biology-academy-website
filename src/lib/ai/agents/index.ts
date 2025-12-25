/**
 * Biology Content Agents
 *
 * Two expert AI agents for NEET Biology question generation and verification:
 *
 * 1. Shekhar Sir - Expert Question Generator
 *    - 15+ years NEET coaching experience simulation
 *    - Trained on NEET PYQ patterns (2010-2025)
 *    - Generates NCERT-aligned questions
 *
 * 2. Archana Ma'am - Quality Assurance Expert
 *    - Meticulous question verification
 *    - NCERT alignment checking
 *    - Scientific accuracy validation
 */

export { ShekharSirAgent, shekharSir, NEET_PATTERN_DATA } from './ShekharSirAgent'
export type { ShekharSirConfig, GenerationRequest, GenerationResult } from './ShekharSirAgent'

export { ArchanaMaamAgent, archanaMaam } from './ArchanaMaamAgent'
export type {
  ArchanaMaamConfig,
  VerificationRequest,
  VerificationResult,
  VerificationIssue,
  BatchVerificationResult,
} from './ArchanaMaamAgent'
