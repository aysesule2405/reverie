# Reverie Project Structure

Visual guide to the complete project file structure.

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # 🎯 Main app entry point with routing
│   │   │                                    # Contains all screen navigation logic
│   │   │                                    # Manages global state (user, atmosphere, etc.)
│   │   │
│   │   └── components/
│   │       │
│   │       ├── figma/                       # 🎨 Figma-specific utilities
│   │       │   └── ImageWithFallback.tsx    # Protected - image component
│   │       │
│   │       ├── ui/                          # 🧩 Generic reusable UI components
│   │       │   └── [Generic components]     # (checkbox, button, etc.)
│   │       │
│   │       └── reverie/                     # 🌟 MAIN COMPONENT LIBRARY
│   │           │
│   │           ├── index.ts                 # 📦 Barrel export file (USE THIS FOR IMPORTS)
│   │           │                            # Import everything from here!
│   │           │
│   │           ├── ─────────────────────────────────
│   │           │  SCREENS (12 components)
│   │           ├── ─────────────────────────────────
│   │           │
│   │           ├── 🔐 Authentication & Setup
│   │           │   ├── AuthScreen.tsx       # Login/Sign up page
│   │           │   └── ProfileSetupScreen.tsx # User preferences setup
│   │           │
│   │           ├── 👋 Onboarding
│   │           │   ├── LandingScreen.tsx    # Welcome page
│   │           │   └── OnboardingScreen.tsx # Tutorial walkthrough
│   │           │
│   │           ├── 🏠 Main App Screens
│   │           │   ├── DashboardScreen.tsx  # Home tab (uses userName prop)
│   │           │   ├── InsightsScreen.tsx   # Insights tab
│   │           │   └── TrustSafetyScreen.tsx # Settings tab
│   │           │
│   │           ├── 🌈 Atmosphere Experience
│   │           │   ├── MemoryAtmospheresScreen.tsx # Atmosphere grid
│   │           │   ├── AtmosphereModeScreen.tsx    # Immersive full-screen
│   │           │   └── ActiveAtmosphereScreen.tsx  # Active session
│   │           │
│   │           ├── ✨ Special Screens
│   │           │   ├── ScenarioScreen.tsx          # Stress detection
│   │           │   └── StorytellingMomentScreen.tsx # Cinematic transition
│   │           │
│   │           ├── ─────────────────────────────────
│   │           │  UI COMPONENTS (10 components)
│   │           ├── ─────────────────────────────────
│   │           │
│   │           ├── 🎨 Buttons
│   │           │   └── ReverieButton.tsx    # 4 variants, 3 sizes
│   │           │
│   │           ├── 📦 Cards
│   │           │   ├── ReverieCard.tsx      # Base card (3 variants)
│   │           │   ├── DataCard.tsx         # Metric display
│   │           │   ├── AtmosphereCard.tsx   # Atmosphere preview
│   │           │   ├── DashboardCard.tsx    # Quick action cards
│   │           │   └── EnvironmentCard.tsx  # Detailed atmosphere info
│   │           │
│   │           ├── 🧭 Navigation
│   │           │   └── BottomNav.tsx        # 4-tab bottom navigation
│   │           │
│   │           ├── 🎚️ Inputs
│   │           │   └── ReverieSlider.tsx    # Custom range slider
│   │           │
│   │           ├── 💬 Feedback
│   │           │   ├── LoadingSpinner.tsx   # Loading animation
│   │           │   └── SuccessCheckmark.tsx # Success animation
│   │           │
│   │           ├── 🧱 Tiles
│   │           │   └── AtmosphereTile.tsx   # Compact atmosphere selector
│   │           │
│   │           ├── ─────────────────────────────────
│   │           │  SHARED ELEMENTS (5 items)
│   │           ├── ─────────────────────────────────
│   │           │
│   │           ├── 🎭 Icons
│   │           │   └── PixelIcon.tsx        # 8 pixel-art icons
│   │           │
│   │           ├── 🖼️ Illustrations
│   │           │   ├── GhibliBackground.tsx      # Animated background
│   │           │   ├── EnvironmentIllustrations.tsx # Scene illustrations
│   │           │   └── ComfortOrb.tsx           # Floating orb
│   │           │
│   │           └── 🎵 Audio
│   │               └── atmosphereSounds.ts  # Audio file management
│   │
│   ├── styles/
│   │   ├── theme.css                        # 🎨 Design system tokens
│   │   │                                    # - Color palette
│   │   │                                    # - Spacing scale (8px grid)
│   │   │                                    # - Typography
│   │   │                                    # - Border radius
│   │   │                                    # - Shadows & effects
│   │   │                                    # - 43 animation utility classes
│   │   │
│   │   ├── fonts.css                        # 📝 Font imports (Inter/SF Pro)
│   │   └── global.css                       # 🌍 Global styles & resets
│   │
│   └── imports/                             # 🖼️ Figma imported assets
│       └── [SVG files, images, etc.]
│
├── public/                                   # 📁 Static assets
│   └── [Audio files, images, etc.]
│
├── 📚 DOCUMENTATION FILES
│   │
│   ├── REVERIE_ARCHITECTURE.md              # 🏛️ Complete architecture guide
│   │   └── Full system documentation with:
│   │       - Screen flow maps
│   │       - Component organization
│   │       - Design system tokens
│   │       - Animation system
│   │       - State management
│   │       - Testing checklist
│   │       - Future enhancements
│   │       - Figma organization structure
│   │
│   ├── QUICK_REFERENCE.md                   # ⚡ Developer quick start
│   │   └── Fast lookup guide with:
│   │       - Import patterns
│   │       - Component props
│   │       - Design tokens
│   │       - Common code patterns
│   │       - Debugging tips
│   │
│   ├── FIGMA_ORGANIZATION_GUIDE.md          # 🎨 Figma file organization
│   │   └── Step-by-step guide with:
│   │       - Page structure
│   │       - Frame organization
│   │       - Component conversion
│   │       - Naming conventions
│   │       - Prototyping connections
│   │       - Maintenance best practices
│   │
│   ├── COMPONENT_INVENTORY.md               # 📊 Complete component list
│   │   └── Detailed catalog with:
│   │       - All 27 components documented
│   │       - Props and types
│   │       - Usage examples
│   │       - Dependency tree
│   │       - Quick finder
│   │
│   └── PROJECT_STRUCTURE.md                 # 📂 This file!
│       └── Visual file tree overview
│
├── package.json                             # 📦 Dependencies & scripts
├── tsconfig.json                            # ⚙️ TypeScript configuration
└── README.md                                # 📖 Project overview

```

---

## 🎯 Key File Locations

### Main Entry Points

| File | Purpose | Priority |
|------|---------|----------|
| `/src/app/App.tsx` | Main application & routing logic | 🔴 CRITICAL |
| `/src/app/components/reverie/index.ts` | Component library exports | 🔴 CRITICAL |
| `/src/styles/theme.css` | Design system tokens | 🟠 HIGH |

### Import Paths

```typescript
// ✅ Correct - Use barrel export
import { DashboardScreen, ReverieButton, PixelIcon } from './components/reverie';

// ❌ Incorrect - Don't use direct imports
import { DashboardScreen } from './components/reverie/DashboardScreen';
```

---

## 🗺️ Screen Flow Map

```
Authentication Flow:
AuthScreen → ProfileSetupScreen → LandingScreen → OnboardingScreen

Main Navigation (Bottom Nav):
├── Home Tab → DashboardScreen
├── Atmospheres Tab → MemoryAtmospheresScreen → AtmosphereModeScreen
├── Insights Tab → InsightsScreen
└── Settings Tab → TrustSafetyScreen

Special Flows:
└── ScenarioScreen → StorytellingMomentScreen → ActiveAtmosphereScreen
```

---

## 📊 Component Organization by Type

### Full-Screen Components (12)
```
├── Auth Flow (2)
│   ├── AuthScreen
│   └── ProfileSetupScreen
│
├── Onboarding Flow (2)
│   ├── LandingScreen
│   └── OnboardingScreen
│
├── Main App (3)
│   ├── DashboardScreen ⭐ (uses userName prop)
│   ├── InsightsScreen
│   └── TrustSafetyScreen
│
├── Atmospheres (3)
│   ├── MemoryAtmospheresScreen
│   ├── AtmosphereModeScreen
│   └── ActiveAtmosphereScreen
│
└── Special (2)
    ├── ScenarioScreen
    └── StorytellingMomentScreen
```

### Reusable UI Components (10)
```
├── Buttons (1)
│   └── ReverieButton
│
├── Cards (5)
│   ├── ReverieCard
│   ├── DataCard
│   ├── AtmosphereCard
│   ├── DashboardCard
│   └── EnvironmentCard
│
├── Navigation (1)
│   └── BottomNav
│
├── Inputs (1)
│   └── ReverieSlider
│
├── Feedback (2)
│   ├── LoadingSpinner
│   └── SuccessCheckmark
│
└── Tiles (1)
    └── AtmosphereTile
```

### Shared Elements (5)
```
├── Icons (1)
│   └── PixelIcon (8 types)
│
├── Illustrations (3)
│   ├── GhibliBackground
│   ├── EnvironmentIllustrations
│   └── ComfortOrb
│
└── Audio (1)
    └── atmosphereSounds.ts
```

---

## 🎨 Design System Files

### CSS Architecture

```
/src/styles/
│
├── theme.css                    # 🎨 Main design system
│   ├── CSS Variables
│   │   ├── --color-*           # Color palette
│   │   ├── --spacing-*         # 8px grid
│   │   ├── --radius-*          # Border radius
│   │   ├── --text-*            # Typography
│   │   ├── --font-*            # Font weights
│   │   └── --leading-*         # Line heights
│   │
│   ├── Utility Classes (43)
│   │   ├── .transition-*       # Transitions
│   │   ├── .hover-*            # Hover effects
│   │   ├── .fade-in            # Entrance animations
│   │   ├── .slide-up           # Movement
│   │   ├── .scale-in           # Scale animations
│   │   ├── .pulse-slow         # Attention
│   │   └── .float              # Floating animation
│   │
│   └── Component Styles
│       ├── Glass morphism
│       ├── Glow effects
│       └── Shadow styles
│
├── fonts.css                    # 📝 Font imports only
│   └── @import statements for Inter/SF Pro
│
└── global.css                   # 🌍 Global styles
    ├── CSS resets
    ├── Base element styles
    └── Tailwind imports
```

---

## 🔗 Component Dependencies

### Most Dependent Components
1. **DashboardScreen** - Uses 6+ components
2. **AtmosphereModeScreen** - Uses 5+ components
3. **InsightsScreen** - Uses 4+ components

### Most Reused Components
1. **PixelIcon** - Used in 10+ places
2. **ReverieButton** - Used in 8+ places
3. **ReverieCard** - Used in 6+ places

---

## 📦 Package Structure

### Key Dependencies
```json
{
  "dependencies": {
    "react": "Latest",
    "react-dom": "Latest",
    "tailwindcss": "v4",
    "typescript": "Latest"
  }
}
```

### Protected Files
- `/src/app/components/figma/ImageWithFallback.tsx` ⚠️ DO NOT MODIFY
- `/pnpm-lock.yaml` ⚠️ DO NOT MODIFY

---

## 🚀 Quick Navigation

### Want to...

**Add a new screen?**
→ Create in `/src/app/components/reverie/`
→ Export from `index.ts`
→ Add to `App.tsx` routing

**Modify a component?**
→ Find in `/src/app/components/reverie/`
→ Update component file
→ Check for breaking changes

**Update styles?**
→ Edit `/src/styles/theme.css`
→ Add new CSS variables or utility classes

**Import components?**
→ Always use: `import { ... } from './components/reverie'`

**Find documentation?**
→ See 4 markdown files in root directory

**Organize Figma?**
→ Follow `/FIGMA_ORGANIZATION_GUIDE.md`

---

## 📝 File Naming Conventions

### Component Files
```
✅ Good:
- DashboardScreen.tsx
- ReverieButton.tsx
- PixelIcon.tsx
- atmosphereSounds.ts

❌ Bad:
- dashboard.tsx
- button.tsx
- icon-pixel.tsx
- sounds.ts
```

### CSS Files
```
✅ Good:
- theme.css
- fonts.css
- global.css

❌ Bad:
- styles.css
- custom.css
- app.css
```

---

## 🎯 Priority Levels

### Critical Files (🔴)
- `/src/app/App.tsx` - Main app logic
- `/src/app/components/reverie/index.ts` - Export barrel
- `/src/styles/theme.css` - Design system

### High Priority (🟠)
- All screen components
- Core UI components (buttons, cards, nav)
- Design documentation

### Medium Priority (🟡)
- Shared illustrations
- Audio configuration
- Utility components

### Low Priority (🟢)
- Archive files
- Experimental features
- Future enhancements

---

## 📊 Project Statistics

- **Total Files:** ~40+
- **Total Components:** 27
- **Total Screens:** 12
- **Total UI Components:** 10
- **Total Shared Elements:** 5
- **Lines of Code:** ~3,500+
- **Documentation Files:** 5
- **CSS Files:** 3

---

## 🔍 Quick File Finder

Need to find...

| What | Where |
|------|-------|
| Main app logic | `/src/app/App.tsx` |
| Component exports | `/src/app/components/reverie/index.ts` |
| Dashboard screen | `/src/app/components/reverie/DashboardScreen.tsx` |
| Button component | `/src/app/components/reverie/ReverieButton.tsx` |
| Design tokens | `/src/styles/theme.css` |
| Color palette | `/src/styles/theme.css` (CSS variables) |
| Animation classes | `/src/styles/theme.css` (utility classes) |
| Typography scale | `/src/styles/theme.css` + `/REVERIE_ARCHITECTURE.md` |
| Component props | `/COMPONENT_INVENTORY.md` |
| Screen flow | `/REVERIE_ARCHITECTURE.md` |
| Import examples | `/QUICK_REFERENCE.md` |
| Figma guide | `/FIGMA_ORGANIZATION_GUIDE.md` |

---

**Last Updated:** March 9, 2026  
**Project Structure v1.0**
