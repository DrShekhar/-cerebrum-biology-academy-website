#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { RecraftClient, IllustrationStyle, IconStyle } from "./recraft-client.js";

// Environment configuration
const RECRAFT_API_KEY = process.env.RECRAFT_API_KEY;
const OUTPUT_DIR = process.env.RECRAFT_OUTPUT_DIR || "./generated-illustrations";

if (!RECRAFT_API_KEY) {
  console.error("Error: RECRAFT_API_KEY environment variable is required");
  process.exit(1);
}

// Initialize Recraft client
const recraftClient = new RecraftClient(RECRAFT_API_KEY, OUTPUT_DIR);

// Define available tools
const tools: Tool[] = [
  {
    name: "generate_illustration",
    description: `Generate a flat vector illustration in SVG format using Recraft.ai.
    Best for: Hero sections, feature cards, blog images, marketing materials.
    Output: Native SVG file that can be directly used in websites.

    Style options:
    - flat_vector: Clean, minimal flat design (like Google illustrations)
    - line_art: Simple line-based illustrations
    - hand_drawn: Sketchy, organic feel
    - geometric: Abstract geometric shapes
    - corporate: Professional business style`,
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Detailed description of the illustration. Be specific about scene, characters, actions, and mood. Example: 'Students studying biology together in a modern classroom, one looking at microscope, another reading NCERT book, warm and encouraging atmosphere'",
        },
        style: {
          type: "string",
          enum: ["flat_vector", "line_art", "hand_drawn", "geometric", "corporate"],
          description: "Illustration style. Default: flat_vector",
          default: "flat_vector",
        },
        colors: {
          type: "array",
          items: { type: "string" },
          description: "Primary colors to use (hex codes). Example: ['#6366f1', '#8b5cf6', '#a855f7'] for purple theme. Max 5 colors.",
        },
        size: {
          type: "string",
          enum: ["1024x1024", "1365x1024", "1024x1365", "1536x1024", "1024x1536"],
          description: "Output size. Default: 1365x1024 (landscape)",
          default: "1365x1024",
        },
        filename: {
          type: "string",
          description: "Output filename (without extension). Default: auto-generated from prompt",
        },
      },
      required: ["prompt"],
    },
  },
  {
    name: "generate_icon",
    description: `Generate a vector icon in SVG format using Recraft.ai.
    Best for: UI icons, feature icons, category icons, navigation icons.
    Output: Clean SVG icon optimized for web use.

    Style options:
    - outline: Single-line outline icons
    - filled: Solid filled icons
    - duo_tone: Two-tone icons with fill and accent
    - gradient: Icons with gradient fills`,
    inputSchema: {
      type: "object",
      properties: {
        concept: {
          type: "string",
          description: "Icon concept or object. Example: 'DNA helix', 'microscope', 'graduation cap', 'book with bookmark'",
        },
        style: {
          type: "string",
          enum: ["outline", "filled", "duo_tone", "gradient"],
          description: "Icon style. Default: outline",
          default: "outline",
        },
        color: {
          type: "string",
          description: "Primary color (hex code). Example: '#6366f1' for indigo",
          default: "#6366f1",
        },
        size: {
          type: "string",
          enum: ["512x512", "1024x1024"],
          description: "Output size. Default: 1024x1024",
          default: "1024x1024",
        },
        filename: {
          type: "string",
          description: "Output filename (without extension). Default: auto-generated",
        },
      },
      required: ["concept"],
    },
  },
  {
    name: "generate_character",
    description: `Generate a character illustration in SVG format using Recraft.ai.
    Best for: Mascots, avatar illustrations, team pages, educational characters.
    Output: Character illustration in flat vector style.

    Pose options:
    - standing: Standing pose, front or side view
    - sitting: Seated position
    - walking: In motion
    - pointing: Pointing at something (good for CTAs)
    - celebrating: Happy, arms raised
    - thinking: Thoughtful pose
    - studying: Reading or studying`,
    inputSchema: {
      type: "object",
      properties: {
        description: {
          type: "string",
          description: "Character description. Include: gender, age group, clothing, expression, accessories. Example: 'Young Indian female student wearing salwar kameez, holding biology textbook, confident smile, glasses'",
        },
        pose: {
          type: "string",
          enum: ["standing", "sitting", "walking", "pointing", "celebrating", "thinking", "studying"],
          description: "Character pose. Default: standing",
          default: "standing",
        },
        style: {
          type: "string",
          enum: ["flat_vector", "minimal", "detailed"],
          description: "Illustration detail level. Default: flat_vector",
          default: "flat_vector",
        },
        colors: {
          type: "array",
          items: { type: "string" },
          description: "Color palette for character (skin tone will be realistic). Example: ['#6366f1', '#f97316'] for clothing colors",
        },
        background: {
          type: "string",
          enum: ["transparent", "white", "colored"],
          description: "Background type. Default: transparent",
          default: "transparent",
        },
        filename: {
          type: "string",
          description: "Output filename (without extension). Default: auto-generated",
        },
      },
      required: ["description"],
    },
  },
  {
    name: "generate_scene",
    description: `Generate a complete scene illustration with multiple elements in SVG format.
    Best for: Hero sections, about pages, complex feature illustrations.
    Output: Full scene illustration with background and characters.`,
    inputSchema: {
      type: "object",
      properties: {
        scene: {
          type: "string",
          description: "Complete scene description. Be detailed about setting, characters, objects, and mood. Example: 'Modern online classroom scene with diverse students on video call, teacher explaining DNA structure on whiteboard, laptops and books visible, warm and engaging atmosphere'",
        },
        theme: {
          type: "string",
          enum: ["education", "technology", "business", "healthcare", "nature", "abstract"],
          description: "Scene theme for consistent styling. Default: education",
          default: "education",
        },
        style: {
          type: "string",
          enum: ["flat_vector", "isometric", "minimal"],
          description: "Scene style. Default: flat_vector",
          default: "flat_vector",
        },
        colors: {
          type: "array",
          items: { type: "string" },
          description: "Brand colors to incorporate. Example: ['#6366f1', '#8b5cf6', '#22c55e']",
        },
        size: {
          type: "string",
          enum: ["1024x1024", "1365x1024", "1024x1365", "1536x1024", "1024x1536", "1820x1024"],
          description: "Output size. Default: 1536x1024 for hero sections",
          default: "1536x1024",
        },
        filename: {
          type: "string",
          description: "Output filename (without extension). Default: auto-generated",
        },
      },
      required: ["scene"],
    },
  },
  {
    name: "list_styles",
    description: "List all available illustration styles and substyles supported by Recraft.ai",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

// Create MCP server
const server = new Server(
  {
    name: "recraft-illustrations",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    switch (name) {
      case "generate_illustration": {
        if (!args.prompt) {
          throw new Error("prompt is required");
        }
        const result = await recraftClient.generateIllustration({
          prompt: args.prompt as string,
          style: (args.style as IllustrationStyle) || "flat_vector",
          colors: args.colors as string[] | undefined,
          size: (args.size as string) || "1365x1024",
          filename: args.filename as string | undefined,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "generate_icon": {
        if (!args.concept) {
          throw new Error("concept is required");
        }
        const result = await recraftClient.generateIcon({
          concept: args.concept as string,
          style: (args.style as IconStyle) || "outline",
          color: (args.color as string) || "#6366f1",
          size: (args.size as string) || "1024x1024",
          filename: args.filename as string | undefined,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "generate_character": {
        if (!args.description) {
          throw new Error("description is required");
        }
        const result = await recraftClient.generateCharacter({
          description: args.description as string,
          pose: (args.pose as string) || "standing",
          style: (args.style as IllustrationStyle) || "flat_vector",
          colors: args.colors as string[] | undefined,
          background: (args.background as string) || "transparent",
          filename: args.filename as string | undefined,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "generate_scene": {
        if (!args.scene) {
          throw new Error("scene is required");
        }
        const result = await recraftClient.generateScene({
          scene: args.scene as string,
          theme: (args.theme as string) || "education",
          style: (args.style as IllustrationStyle) || "flat_vector",
          colors: args.colors as string[] | undefined,
          size: (args.size as string) || "1536x1024",
          filename: args.filename as string | undefined,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "list_styles": {
        const styles = recraftClient.listStyles();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(styles, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: errorMessage }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Recraft Illustrations MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
