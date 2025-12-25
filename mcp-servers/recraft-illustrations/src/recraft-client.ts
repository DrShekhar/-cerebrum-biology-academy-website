import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

// Recraft API base URL
const RECRAFT_API_BASE = "https://external.api.recraft.ai/v1";

// Style types
export type IllustrationStyle = "flat_vector" | "line_art" | "hand_drawn" | "geometric" | "corporate";
export type IconStyle = "outline" | "filled" | "duo_tone" | "gradient";

// Style mapping to Recraft API styles
const ILLUSTRATION_STYLE_MAP: Record<IllustrationStyle, string> = {
  flat_vector: "vector_illustration",
  line_art: "vector_illustration/line_art",
  hand_drawn: "digital_illustration/hand_drawn",
  geometric: "vector_illustration/kawaii",
  corporate: "vector_illustration/corporate_memphis",
};

const ICON_STYLE_MAP: Record<IconStyle, string> = {
  outline: "icon/outline",
  filled: "icon/filled",
  duo_tone: "icon/colored_outline",
  gradient: "icon/flat",
};

// Response types
interface GenerationResult {
  success: boolean;
  filePath?: string;
  url?: string;
  style: string;
  prompt: string;
  size: string;
  error?: string;
}

interface StyleInfo {
  category: string;
  name: string;
  description: string;
  outputFormat: string;
}

export class RecraftClient {
  private client: OpenAI;
  private outputDir: string;

  constructor(apiKey: string, outputDir: string = "./generated-illustrations") {
    this.client = new OpenAI({
      baseURL: RECRAFT_API_BASE,
      apiKey: apiKey,
    });
    this.outputDir = outputDir;

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate a flat vector illustration
   */
  async generateIllustration(options: {
    prompt: string;
    style: IllustrationStyle;
    colors?: string[];
    size: string;
    filename?: string;
  }): Promise<GenerationResult> {
    const { prompt, style, colors, size, filename } = options;

    try {
      // Build enhanced prompt
      let enhancedPrompt = prompt;
      if (colors && colors.length > 0) {
        enhancedPrompt += `. Use these colors prominently: ${colors.join(", ")}`;
      }
      enhancedPrompt += ". Clean flat vector style, minimal shadows, modern aesthetic.";

      const recraftStyle = ILLUSTRATION_STYLE_MAP[style];

      // Parse size
      const [width, height] = size.split("x").map(Number);

      const response = await this.client.images.generate({
        model: "recraftv3",
        prompt: enhancedPrompt,
        n: 1,
        size: `${width}x${height}` as any,
        style: recraftStyle as any,
        response_format: "url",
      } as any);

      if (!response.data || response.data.length === 0) {
        throw new Error("No image data in response");
      }
      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL in response");
      }

      // Download and save the SVG
      const outputFilename = filename || this.generateFilename(prompt);
      const filePath = await this.downloadSvg(imageUrl, outputFilename);

      return {
        success: true,
        filePath,
        url: imageUrl,
        style: recraftStyle,
        prompt: enhancedPrompt,
        size,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        error: errorMessage,
        style: ILLUSTRATION_STYLE_MAP[style],
        prompt,
        size,
      };
    }
  }

  /**
   * Generate a vector icon
   */
  async generateIcon(options: {
    concept: string;
    style: IconStyle;
    color: string;
    size: string;
    filename?: string;
  }): Promise<GenerationResult> {
    const { concept, style, color, size, filename } = options;

    try {
      // Build icon prompt
      const prompt = `Simple icon of ${concept}, single color ${color}, clean minimal design, centered composition`;
      const recraftStyle = ICON_STYLE_MAP[style];

      // Parse size
      const [width, height] = size.split("x").map(Number);

      const response = await this.client.images.generate({
        model: "recraftv3",
        prompt,
        n: 1,
        size: `${width}x${height}` as any,
        style: recraftStyle as any,
        response_format: "url",
      } as any);

      if (!response.data || response.data.length === 0) {
        throw new Error("No image data in response");
      }
      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL in response");
      }

      // Download and save the SVG
      const outputFilename = filename || `icon-${this.generateFilename(concept)}`;
      const filePath = await this.downloadSvg(imageUrl, outputFilename);

      return {
        success: true,
        filePath,
        url: imageUrl,
        style: recraftStyle,
        prompt,
        size,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        error: errorMessage,
        style: ICON_STYLE_MAP[style],
        prompt: concept,
        size,
      };
    }
  }

  /**
   * Generate a character illustration
   */
  async generateCharacter(options: {
    description: string;
    pose: string;
    style: IllustrationStyle;
    colors?: string[];
    background: string;
    filename?: string;
  }): Promise<GenerationResult> {
    const { description, pose, style, colors, background, filename } = options;

    try {
      // Build character prompt
      let prompt = `Single character illustration: ${description}, ${pose} pose`;

      if (colors && colors.length > 0) {
        prompt += `, wearing colors: ${colors.join(", ")}`;
      }

      if (background === "transparent") {
        prompt += ", isolated on transparent background";
      } else if (background === "white") {
        prompt += ", on clean white background";
      }

      prompt += ". Flat vector style, friendly appearance, diverse representation.";

      const recraftStyle = ILLUSTRATION_STYLE_MAP[style];

      const response = await this.client.images.generate({
        model: "recraftv3",
        prompt,
        n: 1,
        size: "1024x1024" as any,
        style: recraftStyle as any,
        response_format: "url",
      } as any);

      if (!response.data || response.data.length === 0) {
        throw new Error("No image data in response");
      }
      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL in response");
      }

      // Download and save the SVG
      const outputFilename = filename || `character-${this.generateFilename(description)}`;
      const filePath = await this.downloadSvg(imageUrl, outputFilename);

      return {
        success: true,
        filePath,
        url: imageUrl,
        style: recraftStyle,
        prompt,
        size: "1024x1024",
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        error: errorMessage,
        style: ILLUSTRATION_STYLE_MAP[style],
        prompt: description,
        size: "1024x1024",
      };
    }
  }

  /**
   * Generate a complete scene illustration
   */
  async generateScene(options: {
    scene: string;
    theme: string;
    style: IllustrationStyle;
    colors?: string[];
    size: string;
    filename?: string;
  }): Promise<GenerationResult> {
    const { scene, theme, style, colors, size, filename } = options;

    try {
      // Build scene prompt with theme context
      const themeContexts: Record<string, string> = {
        education: "educational setting, students, books, learning atmosphere",
        technology: "modern tech environment, devices, digital elements",
        business: "professional setting, office, collaboration",
        healthcare: "medical environment, health symbols, care",
        nature: "outdoor setting, natural elements, greenery",
        abstract: "abstract shapes, patterns, conceptual",
      };

      let prompt = `Scene illustration: ${scene}. Theme context: ${themeContexts[theme] || ""}`;

      if (colors && colors.length > 0) {
        prompt += `. Brand colors to incorporate: ${colors.join(", ")}`;
      }

      prompt += ". Flat vector style, cohesive composition, modern aesthetic, diverse characters.";

      const recraftStyle = ILLUSTRATION_STYLE_MAP[style];

      // Parse size
      const [width, height] = size.split("x").map(Number);

      const response = await this.client.images.generate({
        model: "recraftv3",
        prompt,
        n: 1,
        size: `${width}x${height}` as any,
        style: recraftStyle as any,
        response_format: "url",
      } as any);

      if (!response.data || response.data.length === 0) {
        throw new Error("No image data in response");
      }
      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL in response");
      }

      // Download and save the SVG
      const outputFilename = filename || `scene-${this.generateFilename(scene)}`;
      const filePath = await this.downloadSvg(imageUrl, outputFilename);

      return {
        success: true,
        filePath,
        url: imageUrl,
        style: recraftStyle,
        prompt,
        size,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        error: errorMessage,
        style: ILLUSTRATION_STYLE_MAP[style],
        prompt: scene,
        size,
      };
    }
  }

  /**
   * List all available styles
   */
  listStyles(): { illustrations: StyleInfo[]; icons: StyleInfo[] } {
    return {
      illustrations: [
        {
          category: "vector_illustration",
          name: "flat_vector",
          description: "Clean, minimal flat design like Google illustrations. Best for modern websites.",
          outputFormat: "SVG",
        },
        {
          category: "vector_illustration/line_art",
          name: "line_art",
          description: "Simple line-based illustrations. Good for technical or minimalist designs.",
          outputFormat: "SVG",
        },
        {
          category: "digital_illustration/hand_drawn",
          name: "hand_drawn",
          description: "Sketchy, organic feel. Good for friendly, approachable brands.",
          outputFormat: "SVG",
        },
        {
          category: "vector_illustration/kawaii",
          name: "geometric",
          description: "Abstract geometric shapes. Good for tech and modern brands.",
          outputFormat: "SVG",
        },
        {
          category: "vector_illustration/corporate_memphis",
          name: "corporate",
          description: "Professional business style. Good for B2B and enterprise.",
          outputFormat: "SVG",
        },
      ],
      icons: [
        {
          category: "icon/outline",
          name: "outline",
          description: "Single-line outline icons. Clean and minimal.",
          outputFormat: "SVG",
        },
        {
          category: "icon/filled",
          name: "filled",
          description: "Solid filled icons. Bold and prominent.",
          outputFormat: "SVG",
        },
        {
          category: "icon/colored_outline",
          name: "duo_tone",
          description: "Two-tone icons with fill and accent. Balanced visibility.",
          outputFormat: "SVG",
        },
        {
          category: "icon/flat",
          name: "gradient",
          description: "Icons with gradient fills. Modern and vibrant.",
          outputFormat: "SVG",
        },
      ],
    };
  }

  /**
   * Download SVG from URL and save to file
   */
  private async downloadSvg(url: string, filename: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const content = await response.text();

    // Ensure .svg extension
    const outputFilename = filename.endsWith(".svg") ? filename : `${filename}.svg`;
    const filePath = path.join(this.outputDir, outputFilename);

    fs.writeFileSync(filePath, content);

    return filePath;
  }

  /**
   * Generate a clean filename from prompt
   */
  private generateFilename(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50) + `-${Date.now()}`;
  }
}
