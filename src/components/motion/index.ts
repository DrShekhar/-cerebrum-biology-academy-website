/**
 * Optimized Motion Components
 *
 * These components provide performance-optimized animations that:
 * - Respect prefers-reduced-motion accessibility setting
 * - Prevent layout thrashing with layout={false}
 * - Use optimized transition timing
 * - Reduce INP (Interaction to Next Paint) impact
 *
 * Usage:
 * ```tsx
 * import { FadeInUp, ScaleOnHover, OptimizedMotionDiv } from '@/components/motion'
 *
 * // Fade in animation
 * <FadeInUp>Content here</FadeInUp>
 *
 * // Scale on hover
 * <ScaleOnHover>
 *   <button>Click me</button>
 * </ScaleOnHover>
 *
 * // Custom animation with optimization
 * <OptimizedMotionDiv
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 * >
 *   Content
 * </OptimizedMotionDiv>
 * ```
 */

export {
  OptimizedMotionDiv,
  FadeInUp,
  ScaleOnHover,
  StaggerContainer,
  usePrefersReducedMotion,
  optimizedVariants,
} from './OptimizedMotion'
