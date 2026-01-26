# Biology Diagrams Guide for Cerebrum Biology Academy

## Overview

This guide documents the diagram system built for creating NCERT-style interactive biology diagrams for NEET preparation, along with research on external tools and resources.

## Current Implementation

### Built-in Diagram System

We've implemented a custom D3.js-based diagram system located at `src/components/diagrams/`:

```
src/components/diagrams/
├── shared/
│   ├── DiagramContainer.tsx    # Wrapper with title/subtitle
│   ├── DiagramLabel.tsx        # Labels with animated leader lines
│   └── BiologyElements.tsx     # Reusable cells, tissues, bundles
├── biology/
│   ├── RootMeristem.tsx        # Root apical meristem L.S.
│   ├── PlantTissues.tsx        # Collenchyma/Sclerenchyma comparison
│   └── StemCrossSection.tsx    # Dicot vs Monocot stem T.S.
├── hooks/
│   └── useDiagram.ts           # D3 setup + biology color palette
└── index.ts                    # Central exports
```

### Demo Page

Visit `/diagrams` to see all diagrams in action with interactive features.

### Key Features

- **Interactive labels**: Click any part to see educational info
- **NCERT-aligned colors**: Matches textbook conventions
- **Animated transitions**: Smooth Framer Motion animations
- **Responsive SVGs**: Scale properly on all devices
- **TypeScript**: Full type safety

### Usage Example

```tsx
import { RootMeristem, PlantTissues, StemCrossSection } from '@/components/diagrams'

// Root meristem with all features
<RootMeristem width={500} height={600} interactive showLabels />

// Plant tissues comparison
<PlantTissues width={800} height={450} interactive showLabels />

// Stem cross-section (options: 'dicot', 'monocot', 'both')
<StemCrossSection width={900} height={500} stemType="both" interactive showLabels />
```

---

## BioRender Integration Research

### Official BioRender Status

**BioRender does NOT provide a public API** for embedding or integration into web applications as of 2025. Key findings:

- BioRender is a proprietary web-based diagram tool
- No developer API or SDK is available
- Enterprise/institutional licensing available but no programmatic access
- Their GitHub presence shows internal tools only (forks of PptxGenJS, three.js, fabric.js)

### Recommended Alternatives

#### 1. Bioicons (Best for NEET Diagrams)

**URL**: https://bioicons.com/

- **2,804 free SVG icons** across 40+ categories
- **License**: CC0 (public domain), CC BY-SA, MIT
- **Categories relevant to NEET**:
  - Cell structures (89+ icons)
  - Intracellular components (120+ icons)
  - Genetics (85+ icons)
  - Human physiology (460+ icons)
  - Animals (384 icons)
  - Plants (numerous icons)

**Integration**:

```tsx
// Download SVGs and use directly
import CellIcon from '@/assets/icons/cell.svg'

// Or embed inline
;<svg>{/* Paste bioicons SVG content */}</svg>
```

#### 2. SwissBioPics (Interactive Cell Images)

**URL**: https://swissbiopics.org/

- High-resolution, interactive cell images
- All drawings in SVG format
- Each organelle tagged with UniProt identifiers
- Covers all kingdoms of life (animals, plants, prokaryotes)
- Free for academic and commercial use

**Integration**:

```tsx
// SwissBioPics provides embeddable SVG files
// Each organelle has metadata for interactivity
<SwissBioPicsViewer cellType="eukaryotic" highlightedOrganelle="mitochondria" />
```

#### 3. SciDraw (Open Repository)

**URL**: https://scidraw.io/

- Open repository of science drawings
- Community-contributed illustrations
- Various license types (check per illustration)

#### 4. Servier Medical Art

**URL**: https://smart.servier.com/

- 3000+ free medical illustrations
- Professional quality for publications
- CC BY license (attribution required)

#### 5. Open Source thejmazz/biorender

**URL**: https://github.com/thejmazz/biorender

- WebGL-based 3D cell visualization
- JavaScript + Blender workflow
- **Note**: Minimally maintained, last major updates 2016
- Good for 3D cellular exploration if needed

---

## Recommended Approach for NEET Diagrams

### For New Diagrams

1. **Use our built-in system** for NCERT-style diagrams
   - Full control over styling and interactivity
   - Matches NCERT textbook conventions
   - Already integrated with site design

2. **Supplement with Bioicons SVGs** for specific elements
   - Download relevant icons (mitochondria, chloroplast, etc.)
   - Combine with our label system
   - Maintain consistent styling

### Workflow for Creating New Diagrams

```
1. Identify diagram type (L.S., T.S., comparison, process)
2. Find reference in NCERT textbook
3. Create React component in src/components/diagrams/biology/
4. Use biologyColors palette for consistency
5. Add interactive zones with hover/click handlers
6. Include educational info panel
7. Add to diagrams demo page
8. Export from index.ts
```

### Color Reference

From `useDiagram.ts`:

```typescript
export const biologyColors = {
  // Cell structures
  cellWall: '#8B7355',
  cellMembrane: '#DEB887',
  cytoplasm: '#FFF8DC',
  nucleus: '#4169E1',
  vacuole: '#E6E6FA',

  // Plant tissues
  epidermis: '#F5DEB3',
  cortex: '#90EE90',
  xylem: '#CD5C5C',
  phloem: '#98FB98',

  // And 20+ more...
}
```

---

## Future Enhancements

### Priority Additions

1. **Cell Division Diagrams**
   - Mitosis stages
   - Meiosis stages
   - Cell cycle representation

2. **Animal Tissue Diagrams**
   - Epithelial tissue types
   - Connective tissue types
   - Muscle tissue types
   - Nervous tissue

3. **Flower & Reproduction**
   - Flower L.S.
   - Embryo sac
   - Pollen grain

4. **Human Anatomy**
   - Heart structure
   - Nephron
   - Neuron

### AI-Assisted Diagram Generation

Consider using:

- **Claude** for SVG path generation from descriptions
- **Stable Diffusion** for reference sketches (then trace to SVG)
- **ChatGPT** for generating coordinate calculations

---

## Resources

- [Bioicons GitHub](https://github.com/duerrsimon/bioicons)
- [SwissBioPics Database](https://academic.oup.com/database/article/doi/10.1093/database/baac026/6566804)
- [D3.js Documentation](https://d3js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [NCERT Biology Textbooks](https://ncert.nic.in/textbook.php)

---

_Last updated: January 2025_
