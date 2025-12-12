/**
 * Image Utility Functions
 * Shared utilities for image manipulation (client-compatible)
 */

/**
 * Get Unsplash image URL with custom dimensions
 */
export function getResizedUnsplashUrl(
  imageUrl: string,
  width: number,
  height?: number,
  quality: number = 80
): string {
  const url = new URL(imageUrl)
  url.searchParams.set('w', width.toString())
  if (height) url.searchParams.set('h', height.toString())
  url.searchParams.set('q', quality.toString())
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('auto', 'format')
  return url.toString()
}

/**
 * Get placeholder image for a biology topic
 */
export function getBiologyPlaceholderUrl(
  topic: string,
  width: number = 1200,
  height: number = 630
): string {
  return `https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

/**
 * Topic-specific prompt templates for common biology subjects
 */
export const BIOLOGY_PROMPT_TEMPLATES = {
  cellBiology: (topic: string) =>
    `Detailed cross-section illustration of ${topic} showing cellular structures, organelles, and processes at microscopic level`,

  genetics: (topic: string) =>
    `Scientific illustration of ${topic} showing DNA, chromosomes, genes, or genetic processes with molecular detail`,

  humanAnatomy: (topic: string) =>
    `Anatomical illustration of ${topic} showing human body systems, organs, or physiological processes`,

  botany: (topic: string) =>
    `Botanical illustration of ${topic} showing plant structures, processes, or adaptations`,

  ecology: (topic: string) =>
    `Ecological illustration of ${topic} showing ecosystems, food webs, or environmental interactions`,

  evolution: (topic: string) =>
    `Educational illustration depicting ${topic} showing evolutionary concepts, phylogeny, or adaptation`,

  microbiology: (topic: string) =>
    `Microbiological illustration of ${topic} showing bacteria, viruses, or microscopic organisms`,

  biochemistry: (topic: string) =>
    `Biochemical diagram of ${topic} showing molecular structures, reactions, or metabolic pathways`,
}

export type BiologyPromptTemplate = keyof typeof BIOLOGY_PROMPT_TEMPLATES

/**
 * Generate a placeholder avatar URL using UI Avatars service
 * Falls back gracefully and works without external dependencies
 */
export function getPlaceholderAvatar(
  name: string,
  size: number = 100,
  background: string = '0D8ABC',
  color: string = 'fff'
): string {
  const encodedName = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=${background}&color=${color}&bold=true`
}

/**
 * Generate a placeholder image URL using a reliable service
 */
export function getPlaceholderImage(width: number, height: number, text?: string): string {
  // Use placeholder.com for generic placeholders
  const textParam = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://via.placeholder.com/${width}x${height}/e2e8f0/64748b${textParam}`
}
