# Recraft Illustrations MCP Server

An MCP (Model Context Protocol) server for generating SVG illustrations using Recraft.ai API. Perfect for creating flat vector illustrations, icons, and characters like Google's illustration style.

## Features

- **generate_illustration** - Create flat vector illustrations for hero sections, blog images, marketing materials
- **generate_icon** - Create vector icons for UI/UX
- **generate_character** - Create character illustrations for mascots, avatars, team pages
- **generate_scene** - Create complete scene illustrations with multiple elements
- **list_styles** - View all available illustration styles

## Prerequisites

1. **Recraft.ai API Key**: Sign up at [recraft.ai](https://www.recraft.ai/) and get your API key from your profile settings

2. **Node.js 18+**: Required for running the MCP server

## Installation

```bash
# Navigate to the MCP server directory
cd mcp-servers/recraft-illustrations

# Install dependencies
npm install

# Build the TypeScript
npm run build
```

## Configuration

### For Claude Code

Add to your Claude Code MCP settings (`~/.claude/settings.json` or project `.claude/settings.local.json`):

```json
{
  "mcpServers": {
    "recraft-illustrations": {
      "command": "node",
      "args": ["/path/to/mcp-servers/recraft-illustrations/dist/index.js"],
      "env": {
        "RECRAFT_API_KEY": "your-recraft-api-key-here",
        "RECRAFT_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RECRAFT_API_KEY` | Yes | - | Your Recraft.ai API key |
| `RECRAFT_OUTPUT_DIR` | No | `./generated-illustrations` | Directory to save generated SVGs |

## Usage Examples

### Generate an Illustration

```
Use generate_illustration to create a hero section image showing students studying together with biology books and microscope, using our brand colors #6366f1 and #8b5cf6
```

### Generate an Icon

```
Use generate_icon to create a DNA helix icon in outline style with color #6366f1
```

### Generate a Character

```
Use generate_character to create an illustration of a young Indian female student in salwar kameez, holding a biology textbook, standing pose, looking confident
```

### Generate a Scene

```
Use generate_scene to create an education-themed scene showing an online classroom with diverse students on video call, teacher explaining on whiteboard
```

## Available Styles

### Illustration Styles

| Style | Description | Best For |
|-------|-------------|----------|
| `flat_vector` | Clean, minimal flat design (like Google) | Modern websites, hero sections |
| `line_art` | Simple line-based illustrations | Technical, minimalist designs |
| `hand_drawn` | Sketchy, organic feel | Friendly, approachable brands |
| `geometric` | Abstract geometric shapes | Tech, modern brands |
| `corporate` | Professional business style | B2B, enterprise |

### Icon Styles

| Style | Description | Best For |
|-------|-------------|----------|
| `outline` | Single-line outline icons | Navigation, UI elements |
| `filled` | Solid filled icons | Bold CTAs, prominent features |
| `duo_tone` | Two-tone with fill and accent | Balanced visibility |
| `gradient` | Icons with gradient fills | Modern, vibrant designs |

## Output

All illustrations are generated as **native SVG files**, which means:
- Infinitely scalable without quality loss
- Small file size (typically 10-50KB)
- Editable in vector editors (Figma, Illustrator)
- Can be styled with CSS
- Perfect for web use

## Pricing

Recraft.ai charges approximately **$0.04 per image**. Check [recraft.ai/pricing](https://www.recraft.ai/pricing) for current rates.

## Troubleshooting

### "Authentication Failed"
- Verify your API key is correct
- Ensure you have positive API units balance in Recraft

### "Style not supported"
- Use `list_styles` tool to see available styles
- Some styles may only work with specific models

### Empty SVG
- Try a more detailed prompt
- Ensure the size parameter is valid

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT
