export type IllustrationStyle =
  | 'flat_vector'
  | 'line_art'
  | 'hand_drawn'
  | 'geometric'
  | 'corporate'
export type IconStyle = 'outline' | 'filled' | 'duo_tone' | 'gradient'
interface GenerationResult {
  success: boolean
  filePath?: string
  url?: string
  style: string
  prompt: string
  size: string
  error?: string
}
interface StyleInfo {
  category: string
  name: string
  description: string
  outputFormat: string
}
export declare class RecraftClient {
  private client
  private outputDir
  constructor(apiKey: string, outputDir?: string)
  /**
   * Generate a flat vector illustration
   */
  generateIllustration(options: {
    prompt: string
    style: IllustrationStyle
    colors?: string[]
    size: string
    filename?: string
  }): Promise<GenerationResult>
  /**
   * Generate a vector icon
   */
  generateIcon(options: {
    concept: string
    style: IconStyle
    color: string
    size: string
    filename?: string
  }): Promise<GenerationResult>
  /**
   * Generate a character illustration
   */
  generateCharacter(options: {
    description: string
    pose: string
    style: IllustrationStyle
    colors?: string[]
    background: string
    filename?: string
  }): Promise<GenerationResult>
  /**
   * Generate a complete scene illustration
   */
  generateScene(options: {
    scene: string
    theme: string
    style: IllustrationStyle
    colors?: string[]
    size: string
    filename?: string
  }): Promise<GenerationResult>
  /**
   * List all available styles
   */
  listStyles(): {
    illustrations: StyleInfo[]
    icons: StyleInfo[]
  }
  /**
   * Download SVG from URL and save to file
   */
  private downloadSvg
  /**
   * Generate a clean filename from prompt
   */
  private generateFilename
}
export {}
