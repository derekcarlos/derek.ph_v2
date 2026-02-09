# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Derek's Digital Garden" - a personal wiki/knowledge base built with Astro and Starlight. The site is deployed at https://derek.ph and contains patterns, notes, and guides on various technical topics (Oracle, macOS, Windows, Linux) as well as personal reflections.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:4321)
npm run dev
# or
npm start

# Build for production (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro ...
# Example: npm run astro check
```

## Architecture

### Content Structure

This is a Starlight-based documentation site. The architecture follows Astro's content collections pattern:

- **Content Location**: All documentation lives in `src/content/docs/` as `.md` or `.mdx` files
- **Routing**: Files are automatically exposed as routes based on their file path
  - Example: `src/content/docs/patterns/macOS/start.mdx` → `/patterns/macos/start`
- **Content Schema**: Defined in `src/content.config.ts` using Starlight's `docsLoader()` and `docsSchema()`

### Site Configuration

The primary configuration is in `astro.config.mjs`:

- **Site URL**: `https://derek.ph`
- **Sidebar Navigation**: Manually configured with nested structure:
  - Start Here (intro pages, now page, colophon)
  - Patterns (Oracle, macOS, Windows, Linux)
  - Notes (personal reflections and guides)
- **Custom Styling**: Two CSS files in `src/styles/`:
  - `custom.css` - Custom color scheme (green accent theme with light/dark modes)
  - `layout.css` - Layout customizations
- **Social Links**: BlueSky, Threads, Instagram configured in sidebar
- **Favicons**: SVG favicon with ICO fallback for Safari in `public/images/`

### Content Categories

1. **Start Here** (`src/content/docs/start/`): Introductory content about the site and author
2. **Patterns** (`src/content/docs/patterns/`): Technical how-to guides organized by platform/technology
3. **Notes** (`src/content/docs/notes/`): Personal reflections, life observations, and miscellaneous content
4. **Guides** (`src/content/docs/guides/`): General guidance documentation
5. **Homelab** (`src/content/docs/homelab/`): Infrastructure and self-hosted projects

### Assets

- **Images/Icons**: Store in `src/assets/` for processing and optimization
- **Static Files**: Place in `public/` (favicons, CNAME, etc.)
- **Homepage Hero**: Uses `src/assets/icon.png` as the hero image

## Key Technologies

- **Astro 5.3.0**: Static site generator and framework
- **Starlight 0.32.0**: Astro documentation theme
- **TypeScript**: Strict mode enabled (`tsconfig.json` extends `astro/tsconfigs/strict`)
- **Sharp**: Image processing dependency

## Content Workflow Commands

Two slash commands are available to streamline content creation:

### `/new-post` - Create New Content

Interactive command that guides you through creating a new post:
- Prompts for category (patterns, notes, guides, homelab, start)
- Generates URL-friendly slug from title
- Creates file with proper frontmatter
- Offers content drafting assistance
- Optionally updates sidebar navigation in `astro.config.mjs`

### `/update-now` - Add Monthly Update to Now Page

Adds a new monthly update to `src/content/docs/start/now.mdx`:
- Prompts for month/year (defaults to current date)
- Inserts new update at the top of the page (after description, before previous updates)
- Maintains chronological order (newest first)
- Preserves all existing content and formatting

## Adding New Content Manually

When adding new documentation pages manually:

1. Create `.md` or `.mdx` files in `src/content/docs/` under the appropriate category
2. Update the `sidebar` configuration in `astro.config.mjs` if the page should appear in navigation
3. Use frontmatter to set page metadata (title, description, etc.)
4. Reference images from `src/assets/` using relative paths

## Styling Customization

The site uses a custom green color scheme defined in `src/styles/custom.css`:

- Accent color: Green (#247f00 in dark mode, #237b00 in light mode)
- Both light and dark modes are fully themed
- Color variables use Starlight's CSS custom property system (`--sl-color-*`)
