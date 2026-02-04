/**
 * Image Services Index
 * Centralizes all image-related functionality
 * Named exports enable better tree-shaking than star exports
 */

// Unsplash service - explicit named exports
export {
  searchUnsplashImages,
  getRandomUnsplashImage,
  getBiologyImages,
  trackUnsplashDownload,
} from './unsplashService'
export type { UnsplashImage, UnsplashSearchOptions } from './unsplashService'

// DALL-E service - explicit named exports
export {
  generateDalleImage,
  generateBiologyTopicImage,
  generateNeetTopicImage,
  generateBlogFeaturedImage,
  generateFromTemplate,
} from './dalleService'
export type { DalleImage, DalleGenerationOptions } from './dalleService'

// Blog image service - explicit named exports
export {
  getBlogFeaturedImage,
  getBlogImages,
  getBlogImagesForPosts,
} from './blogImageService'
export type { ImageSource, BlogImage, BlogImageRequest } from './blogImageService'

// Image utilities - explicit named exports
export {
  getResizedUnsplashUrl,
  getBiologyPlaceholderUrl,
  BIOLOGY_PROMPT_TEMPLATES,
  getPlaceholderAvatar,
  getPlaceholderImage,
} from './imageUtils'
export type { BiologyPromptTemplate } from './imageUtils'
