# Reverie Figma Organization Guide

## 📐 File Structure Overview

This guide will help you organize your Reverie Figma file to match the code architecture, making it easier to maintain design-development parity.

---

## 🗂️ Page Organization

### Recommended Page Structure

```
📁 Reverie Wellness Interface
│
├── 📄 📍 Cover & Index
├── 📄 🔐 1. Authentication & Setup
├── 📄 👋 2. Onboarding Flow
├── 📄 🏠 3. Dashboard (Home Tab)
├── 📄 🌈 4. Memory Atmospheres
├── 📄 📊 5. Insights & Analytics
├── 📄 ⚙️ 6. Settings & Safety
├── 📄 ✨ 7. Special Screens
├── 📄 🎨 8. Design System Library
├── 📄 🧩 9. Component Specifications
└── 📄 📦 Archive - Do Not Delete
```

---

## 📄 Page 1: Cover & Index

### Purpose
Quick navigation and project overview

### Contents
- **Project Title:** "Reverie - Nostalgic Wellness Interface"
- **Version Number:** v1.0
- **Last Updated:** Date
- **Navigation Links:** Use Figma's "Open Link" action to jump to pages
- **Design Principles:**
  - 8px grid system
  - 24px margins
  - 20px border radius
  - Ghibli-inspired color palette
- **Quick Links Section:**
  - Link to code repository
  - Link to architecture docs
  - Link to prototype

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│         REVERIE                     │
│    Wellness Interface v1.0          │
│                                     │
│  Quick Navigation:                  │
│  → Authentication                   │
│  → Onboarding                       │
│  → Main Screens                     │
│  → Design System                    │
│                                     │
│  Design Principles:                 │
│  • 8px grid                         │
│  • 24px margins                     │
│  • 20px cards                       │
│                                     │
└─────────────────────────────────────┘
```

---

## 📄 Page 2: Authentication & Setup

### Frame Organization

```
Left to Right, Top to Bottom:

Row 1: Login Flow
┌──────────────┬──────────────┬──────────────┐
│ Auth Screen  │ Auth Screen  │ Profile      │
│ (Login)      │ (Sign Up)    │ Setup Step 1 │
└──────────────┴──────────────┴──────────────┘

Row 2: Profile Setup Continuation
┌──────────────┬──────────────┬──────────────┐
│ Profile      │ Profile      │ Success      │
│ Setup Step 2 │ Setup Step 3 │ Checkmark    │
└──────────────┴──────────────┴──────────────┘

Row 3: Error States
┌──────────────┬──────────────┬──────────────┐
│ Login Error  │ Validation   │ Loading      │
│              │ Error        │ Spinner      │
└──────────────┴──────────────┴──────────────┘
```

### Frame Naming Convention
```
✅ Good:
- "Auth Screen - Login"
- "Auth Screen - Sign Up"
- "Profile Setup - Step 1 - Name"
- "Profile Setup - Step 2 - Preferences"
- "Profile Setup - Step 3 - Triggers"

❌ Avoid:
- "Frame 1"
- "Login copy"
- "Screen-2-final"
```

### Prototyping
- Flow: Login → Profile Setup Step 1 → Step 2 → Step 3 → Landing
- Smart Animate between profile steps
- Loading state on button press

---

## 📄 Page 3: Onboarding Flow

### Frame Organization

```
Row 1: Welcome Flow
┌──────────────┬──────────────┬──────────────┐
│ Landing      │ Onboarding   │ Onboarding   │
│ Screen       │ Step 1       │ Step 2       │
└──────────────┴──────────────┴──────────────┘

Row 2: Tutorial Continuation
┌──────────────┬──────────────┬──────────────┐
│ Onboarding   │ Onboarding   │ Completion   │
│ Step 3       │ Step 4       │ Screen       │
└──────────────┴──────────────┴──────────────┘
```

### Key Elements to Include
- [ ] Hero illustration on Landing Screen
- [ ] "Begin" CTA with aurora variant button
- [ ] Onboarding carousel with dot indicators
- [ ] Skip button (ghost variant)
- [ ] Progress indicators
- [ ] Feature highlights with pixel icons

### Prototyping
- Landing → Onboarding Step 1
- Swipe gesture between tutorial steps
- Skip button jumps to Dashboard

---

## 📄 Page 4: Dashboard (Home Tab)

### Frame Organization

```
Row 1: Dashboard States
┌──────────────┬──────────────┬──────────────┐
│ Dashboard    │ Dashboard    │ Dashboard    │
│ Default      │ w/ Active    │ Empty State  │
│              │ Session      │              │
└──────────────┴──────────────┴──────────────┘

Row 2: Dashboard Components (Zoom in to 200%)
┌──────────────┬──────────────┬──────────────┐
│ Dashboard    │ Breathing    │ Recent       │
│ Header       │ Exercise     │ Sessions     │
└──────────────┴──────────────┴──────────────┘

Row 3: Bottom Navigation
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ BottomNav    │ BottomNav    │ BottomNav    │ BottomNav    │
│ Home Active  │ Atmos Active │ Insight Act  │ Settings Act │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Critical Details
- **Personalized Greeting:** "Good morning, [Name]"
  - Use variable for name: `{userName}`
  - Time-based greeting illustration
- **Data Cards:**
  - Calm Score with trend indicator
  - Focus Time metric
  - Recent atmosphere usage
- **Quick Actions:**
  - "Start Session" (primary button)
  - "Continue Last Session" (secondary)
  - Quick atmosphere tiles grid

### Prototyping
- BottomNav tabs switch between main screens
- Quick action buttons → Atmospheres screen
- Data cards → Insights screen

---

## 📄 Page 5: Memory Atmospheres

### Frame Organization

```
Row 1: Atmosphere Selection
┌──────────────┬──────────────┬──────────────┐
│ Memory       │ Atmosphere   │ Atmosphere   │
│ Atmospheres  │ Detail       │ Filters      │
│ Grid         │              │              │
└──────────────┴──────────────┴──────────────┘

Row 2: Immersive Mode (LARGER FRAMES)
┌────────────────────────────────────────┐
│ Atmosphere Mode - Spring Meadow        │
│ (Full screen, no bottom nav)           │
└────────────────────────────────────────┘

Row 3: Different Atmospheres
┌──────────────┬──────────────┬──────────────┐
│ Atmos Mode   │ Atmos Mode   │ Atmos Mode   │
│ Rainy Window │ Lo-Fi Cafe   │ Starry Night │
└──────────────┴──────────────┴──────────────┘

Row 4: Atmosphere Tiles (Components at 200% zoom)
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Atmosphere   │ Atmosphere   │ Atmosphere   │ Atmosphere   │
│ Tile 1       │ Tile 2       │ Tile 3       │ Tile 4       │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Atmosphere List
Create individual atmosphere tiles for:
1. **Spring Meadow** - Green, peaceful, flowers
2. **Rainy Window** - Cozy, grey-blue, rain drops
3. **Lo-Fi Study Cafe** - Warm browns, books, coffee
4. **Starry Night** - Deep blue, stars, moon
5. **Childhood Bedroom** - Nostalgic, soft lighting
6. **Beach Sunset** - Orange-pink gradient, waves
7. **Forest Path** - Green canopy, dappled light
8. **Snowy Cabin** - White, warm interior glow

### Atmosphere Mode Details
- **Full screen** - No bottom navigation
- **Exit button** - Top right, subtle
- **Audio controls** - Volume slider
- **Intensity slider** - Adjusts visual effects
- **Timer display** - Session duration
- **Breathing prompts** - Animated overlay

### Prototyping
- Grid tile tap → Detail view
- Detail view CTA → Atmosphere Mode (full screen)
- Exit button → Back to grid
- Bottom nav hidden in Atmosphere Mode

---

## 📄 Page 6: Insights & Analytics

### Frame Organization

```
Row 1: Main Insights
┌──────────────┬──────────────┬──────────────┐
│ Insights     │ Insights     │ Insights     │
│ Weekly       │ Monthly      │ Yearly       │
└──────────────┴──────────────┴──────────────┘

Row 2: Detailed Views
┌──────────────┬──────────────┬──────────────┐
│ Emotion      │ Atmosphere   │ Stress       │
│ Timeline     │ Usage Chart  │ Triggers     │
└──────────────┴──────────────┴──────────────┘

Row 3: Data Components (200% zoom)
┌──────────────┬──────────────┬──────────────┐
│ DataCard     │ DataCard     │ Chart        │
│ Variant 1    │ Variant 2    │ Component    │
└──────────────┴──────────────┴──────────────┘
```

### Data Visualization Elements
- [ ] Line charts (calm score over time)
- [ ] Bar charts (atmosphere usage frequency)
- [ ] Donut charts (emotion distribution)
- [ ] Trend indicators (up/down/neutral arrows)
- [ ] Time range selector (week/month/year tabs)
- [ ] Export button (secondary variant)

### Chart Colors
Use Ghibli palette for data:
- Indigo (#6A7FDB) - Primary data
- Lavender (#A9B8FF) - Secondary data
- Pink (#F6D6FF) - Tertiary data
- Peach (#FFB8A3) - Accent data

---

## 📄 Page 7: Settings & Safety

### Frame Organization

```
Row 1: Settings Screens
┌──────────────┬──────────────┬──────────────┐
│ Trust &      │ Account      │ Privacy      │
│ Safety Main  │ Settings     │ Controls     │
└──────────────┴──────────────┴──────────────┘

Row 2: Crisis Resources
┌──────────────┬──────────────┬──────────────┐
│ Crisis       │ Mental Health│ Emergency    │
│ Resources    │ Hotlines     │ Contacts     │
└──────────────┴──────────────┴──────────────┘

Row 3: Settings Components
┌──────────────┬──────────────┬──────────────┐
│ Toggle       │ Radio        │ Setting      │
│ Switch       │ Buttons      │ List Item    │
└──────────────┴──────────────┴──────────────┘
```

### Key Sections
- **Privacy Settings:**
  - Data collection toggle
  - Analytics opt-in/out
  - Export data button
- **Crisis Resources:**
  - Emergency hotline numbers
  - Text crisis lines
  - Nearby resources
- **Account:**
  - Edit profile
  - Change password
  - Delete account (danger zone)

---

## 📄 Page 8: Special Screens

### Frame Organization

```
Row 1: Contextual Screens
┌──────────────┬──────────────┬──────────────┐
│ Scenario     │ Storytelling │ Active       │
│ Detection    │ Moment       │ Atmosphere   │
└──────────────┴──────────────┴──────────────┘

Row 2: Animations & Transitions
┌──────────────┬──────────────┬──────────────┐
│ Loading      │ Success      │ Error        │
│ Spinner      │ Checkmark    │ Message      │
└──────────────┴──────────────┴──────────────┘
```

### Scenario Detection Screen
- Contextual awareness UI
- Calendar integration mock
- Stress detection indicator
- Quick activation CTA

### Storytelling Moment Screen
- Cinematic full-screen
- Animated transitions (use Smart Animate)
- Gentle narrative text
- Auto-advance timer or manual CTA

### Active Atmosphere Screen
- Session timer (countdown)
- Real-time metrics
- Pause/resume controls
- Session notes input

---

## 📄 Page 9: Design System Library

### Section 1: Color Palette

```
┌────────────────────────────────────────────────┐
│  Color Palette - Ghibli Inspired               │
├────────────────────────────────────────────────┤
│                                                 │
│  Primary Colors:                                │
│  [#6A7FDB] [#A9B8FF] [#F6D6FF] [#FFB8A3]      │
│  Indigo    Lavender  Pink      Peach           │
│                                                 │
│  Background Colors:                             │
│  [#F7FFF7] [#0F1224] [#1A1C2C]                 │
│  Light     Dark      Card                       │
│                                                 │
│  Semantic Colors:                               │
│  [#8FD6A3] [#FFD4A3] [#FFB8C1] [#A9B8FF]      │
│  Success   Warning   Error     Info             │
│                                                 │
└────────────────────────────────────────────────┘
```

**Create as Figma Styles:**
- Select color swatch → Right panel → Style → +
- Name: "Reverie/Primary/Indigo"
- Description: "Deep sky, twilight, primary actions"

### Section 2: Typography Scale

```
┌────────────────────────────────────────────────┐
│  Typography - Inter / SF Pro                    │
├────────────────────────────────────────────────┤
│                                                 │
│  Display 3XL - 40px / Semi-bold / 1.2          │
│  Display 2XL - 32px / Semi-bold / 1.2          │
│  Display XL - 24px / Semi-bold / 1.2           │
│                                                 │
│  Body LG - 18px / Regular / 1.5                │
│  Body Base - 16px / Regular / 1.5              │
│  Body SM - 14px / Regular / 1.5                │
│  Body XS - 12px / Regular / 1.5                │
│                                                 │
│  Accent Medium - 16px / Medium / 1.5           │
│  Accent Semibold - 16px / Semi-bold / 1.2      │
│                                                 │
└────────────────────────────────────────────────┘
```

**Create as Figma Text Styles:**
- Text → Right panel → Type settings → Style → +
- Name: "Reverie/Display/3XL"

### Section 3: Spacing Scale (8px Grid)

```
┌────────────────────────────────────────────────┐
│  Spacing Scale - 8px Base Grid                  │
├────────────────────────────────────────────────┤
│                                                 │
│  4px   [▪]     XS - Tight spacing               │
│  8px   [▪▪]    SM - Base unit                   │
│  16px  [▪▪▪▪]  MD - Comfortable                 │
│  24px  [▪▪▪▪▪▪] LG - Standard margins           │
│  32px  [▪▪▪▪▪▪▪▪] XL - Section spacing          │
│  48px  [▪▪▪▪▪▪▪▪▪▪▪▪] 2XL - Major divisions     │
│  64px  [▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪] 3XL - Page spacing    │
│                                                 │
└────────────────────────────────────────────────┘
```

**Create Layout Grid:**
- Frame → Right panel → Layout Grid → +
- Type: Grid
- Size: 8
- Color: Pink (#F6D6FF) at 10% opacity

### Section 4: Border Radius

```
┌────────────────────────────────────────────────┐
│  Border Radius Scale                            │
├────────────────────────────────────────────────┤
│                                                 │
│  8px   ╭──╮  Small - Tags, small buttons       │
│  12px  ╭───╮ Medium - Buttons                   │
│  20px  ╭────╮ Large - Cards (standard)          │
│  28px  ╭─────╮ XL - Large cards                 │
│  Full  (●)   Pills, avatars, circular           │
│                                                 │
└────────────────────────────────────────────────┘
```

### Section 5: Shadows & Effects

```
┌────────────────────────────────────────────────┐
│  Effects - Glass, Glows, Shadows                │
├────────────────────────────────────────────────┤
│                                                 │
│  Glass Morphism:                                │
│  • Background: rgba(26, 28, 44, 0.6)           │
│  • Border: 1px rgba(169, 184, 255, 0.2)        │
│  • Backdrop Blur: 20px                          │
│                                                 │
│  Glows:                                         │
│  • Indigo: 0 0 20px rgba(106, 127, 219, 0.5)  │
│  • Lavender: 0 0 20px rgba(169, 184, 255, 0.5)│
│  • Pink: 0 0 20px rgba(246, 214, 255, 0.5)    │
│                                                 │
│  Shadows:                                       │
│  • SM: 0 2px 8px rgba(15, 18, 36, 0.1)        │
│  • MD: 0 4px 16px rgba(15, 18, 36, 0.15)      │
│  • LG: 0 8px 32px rgba(15, 18, 36, 0.2)       │
│                                                 │
└────────────────────────────────────────────────┘
```

**Create as Figma Effect Styles:**
- Select shape → Effects → + → Drop Shadow
- Adjust values → Right panel → Style → +
- Name: "Reverie/Shadow/MD"

---

## 📄 Page 10: Component Specifications

### Component Library Organization

```
Section 1: Buttons
┌──────────┬──────────┬──────────┬──────────┐
│ Primary  │Secondary │  Ghost   │ Aurora   │
│   SM     │   SM     │   SM     │   SM     │
├──────────┼──────────┼──────────┼──────────┤
│ Primary  │Secondary │  Ghost   │ Aurora   │
│   MD     │   MD     │   MD     │   MD     │
├──────────┼──────────┼──────────┼──────────┤
│ Primary  │Secondary │  Ghost   │ Aurora   │
│   LG     │   LG     │   LG     │   LG     │
└──────────┴──────────┴──────────┴──────────┘

Section 2: Cards
┌──────────┬──────────┬──────────┐
│  Glass   │  Solid   │   Glow   │
│  Card    │  Card    │   Card   │
└──────────┴──────────┴──────────┘

Section 3: Data Cards
┌──────────┬──────────┬──────────┐
│ DataCard │ DataCard │ DataCard │
│ Trend Up │Trend Down│ Neutral  │
└──────────┴──────────┴──────────┘

Section 4: Navigation
┌─────────────────────────────────┐
│  Bottom Navigation              │
│  [4 states: Home, Atmos,        │
│   Insights, Settings active]    │
└─────────────────────────────────┘

Section 5: Inputs
┌──────────┬──────────┬──────────┐
│  Slider  │ Text     │ Toggle   │
│  Input   │ Input    │ Switch   │
└──────────┴──────────┴──────────┘

Section 6: Icons
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ ♥  │ ★  │ ☁  │ ☽  │ ☀  │ ✦  │ ♫  │ 📖 │
│Heart│Star│Cloud│Moon│Sun │Spark│Music│Book│
└────┴────┴────┴────┴────┴────┴────┴────┘
```

### Converting to Components

**Step-by-step for each reusable element:**

1. **Select the frame/group**
2. **Create Component:** 
   - Right-click → Create Component
   - Or: Cmd/Ctrl + Alt + K
3. **Name clearly:**
   - "Reverie/Button/Primary/Medium"
   - "Reverie/Card/Glass"
   - "Reverie/Icon/Heart"
4. **Add Component Properties:**
   - Variant properties (size, state, type)
   - Text properties (label, value)
   - Boolean properties (isActive, hasIcon)
5. **Organize in Assets Panel:**
   - Use "/" to create hierarchy
   - Group related components

### Component Naming Convention

```
✅ Good:
Reverie/Button/Primary/Medium
Reverie/Card/Glass
Reverie/Icon/Heart/24
Reverie/Navigation/BottomNav/HomeActive

❌ Avoid:
Button1
CardCopy
icon-heart
Nav bar final
```

---

## 📄 Page 11: Archive - Do Not Delete

### Purpose
Safe storage for experimental work, old iterations, and reference materials **without cluttering main pages**.

### Organization

```
Section 1: Old Iterations
┌──────────────┬──────────────┬──────────────┐
│ Dashboard v1 │ Dashboard v2 │ Dashboard v3 │
│ (archived)   │ (archived)   │ (archived)   │
└──────────────┴──────────────┴──────────────┘

Section 2: Experimental Designs
┌──────────────┬──────────────┬──────────────┐
│ Experiment:  │ Experiment:  │ Experiment:  │
│ Dark Mode    │ 3D Effects   │ AR Feature   │
└──────────────┴──────────────┴──────────────┘

Section 3: Reference Materials
┌──────────────┬──────────────┬──────────────┐
│ Mood Board   │ Inspiration  │ Competitor   │
│              │ Screenshots  │ Analysis     │
└──────────────┴──────────────┴──────────────┘

Section 4: Unused Components
┌──────────────┬──────────────┬──────────────┐
│ Old Button   │ Deprecated   │ Test Card    │
│ Style        │ Icon Set     │              │
└──────────────┴──────────────┴──────────────┘
```

### Archive Naming
- Prefix with date: "2026-03-09 - Old Dashboard"
- Add status: "[ARCHIVED]" or "[REFERENCE]"
- Keep organized by category

---

## 🔄 Prototyping Connections

### Main User Flow

```
Auth (Login)
    ↓ [Login Button - On Click]
Profile Setup Step 1
    ↓ [Continue Button - On Click]
Profile Setup Step 2
    ↓ [Continue Button - On Click]
Profile Setup Step 3
    ↓ [Complete Button - On Click]
Landing Screen
    ↓ [Begin Button - On Click]
Onboarding Step 1
    ↓ [Next / Swipe Right]
Onboarding Step 2-4
    ↓ [Continue Button - On Click]
Dashboard
    ↓ [Bottom Nav Tabs]
Main App Screens
    ↓ [Atmosphere Tile - On Click]
Atmosphere Mode (Immersive)
    ↓ [Exit Button - On Click]
Back to Atmospheres
```

### Interaction Details

**Smart Animate:** Use between similar screens
- Profile setup steps (sliding transitions)
- Onboarding carousel
- Bottom nav tab switches

**Dissolve:** Use for mode changes
- Dashboard → Insights
- Any screen → Atmosphere Mode (immersive)

**Move In:** Use for overlays
- Settings panel
- Modal dialogs

**On Click:** Most buttons and tiles

**On Drag:** For sliders and carousels

**After Delay:** For auto-advancing screens
- Storytelling Moment (3-5 seconds)
- Loading screens (1-2 seconds)

---

## ✅ Pre-Organization Checklist

Before you start reorganizing:

- [ ] **Duplicate the file** - Create "Reverie [BACKUP]"
- [ ] **Audit existing frames** - Count and categorize
- [ ] **Note prototype connections** - Screenshot flow
- [ ] **Export important assets** - Backup illustrations/icons
- [ ] **Communicate with team** - Let them know you're reorganizing

---

## 🔧 Organization Process

### Step 1: Create New Pages (10 min)
1. Create all pages listed at top of this document
2. Add cover page with navigation
3. Set up 8px grid on all pages

### Step 2: Move Screens to Correct Pages (20 min)
1. Copy frames from original location
2. Paste into appropriate page
3. Rename using convention: "ScreenName - State"
4. Align frames in grid (400px horizontal spacing)

### Step 3: Create Archive Page (10 min)
1. Move old iterations to Archive page
2. Move experimental work to Archive
3. Add "[ARCHIVED]" prefix to frame names
4. Keep organized by date

### Step 4: Build Component Library (30 min)
1. Identify repeated elements
2. Create components with variants
3. Name using slash convention
4. Organize in assets panel
5. Replace instances across file

### Step 5: Apply Design System (20 min)
1. Create color styles
2. Create text styles
3. Create effect styles
4. Apply to all frames
5. Update components to use styles

### Step 6: Rebuild Prototype Connections (20 min)
1. Start from Auth screen
2. Connect main user flow
3. Connect bottom nav tabs
4. Add special flows (scenario detection, etc.)
5. Test prototype thoroughly

### Step 7: Document & Share (10 min)
1. Add annotations to complex interactions
2. Add page descriptions
3. Update cover page
4. Share with team
5. Collect feedback

**Total Time: ~2 hours**

---

## 🎯 Quality Checklist

After organizing, verify:

### Design System
- [ ] All colors use Figma color styles
- [ ] All text uses Figma text styles
- [ ] All effects use Figma effect styles
- [ ] 8px grid visible on all pages
- [ ] All spacing follows 8px grid

### Components
- [ ] Buttons converted to components (4 variants, 3 sizes)
- [ ] Cards converted to components (3 variants)
- [ ] Icons converted to components (8 types)
- [ ] Bottom nav converted to component (4 states)
- [ ] Data cards converted to component
- [ ] All components use variants (not separate components)

### Frames
- [ ] All frames renamed clearly
- [ ] Frames aligned in grid
- [ ] Consistent spacing between frames (400px horizontal)
- [ ] Frames grouped by state/variation
- [ ] Auto-layout used where appropriate

### Prototype
- [ ] Main flow works end-to-end
- [ ] Bottom nav tabs all connected
- [ ] Back buttons return to correct screen
- [ ] Smart Animate used for smooth transitions
- [ ] No broken connections
- [ ] Starting frame set correctly (Auth screen)

### Organization
- [ ] All pages created and labeled
- [ ] Cover page has navigation
- [ ] Archive page contains old work
- [ ] No duplicate frames on wrong pages
- [ ] Component library page complete

---

## 📝 Maintenance Best Practices

### Going Forward

**When adding new screens:**
1. Place on correct page
2. Name using convention
3. Align with existing frames
4. Connect to prototype
5. Update cover page

**When modifying components:**
1. Edit main component (not instance)
2. Test changes across all instances
3. Update component description
4. Document breaking changes

**When exploring new ideas:**
1. Work in Archive page first
2. Move to main pages when finalized
3. Convert to components if reusable

**Weekly cleanup:**
1. Review Archive page
2. Delete truly unused frames
3. Update component library
4. Check prototype connections
5. Update version number on cover

---

## 🚀 Advanced Tips

### Performance Optimization
- Use component instances (not duplicates)
- Flatten complex vectors
- Optimize image sizes
- Use auto-layout for responsive components
- Minimize prototype connections

### Collaboration
- Add comments for unclear decisions
- Use branching for major experiments
- Document component usage
- Create shared libraries for cross-file use
- Set up style guides in Figma

### Version Control
- Save major versions as separate files
- Use Figma's version history
- Export designs before major changes
- Keep changelog on cover page

---

## 📚 Resources

**Figma Best Practices:**
- [Figma Component Best Practices](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma)
- [Organizing Files](https://help.figma.com/hc/en-us/articles/360041539473-Organize-your-files)
- [Prototyping Guide](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma)

**Design Systems:**
- [Material Design 3](https://m3.material.io/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)

**Reverie Code:**
- Code Repository: `/src/app/components/reverie/`
- Architecture Docs: `/REVERIE_ARCHITECTURE.md`
- Quick Reference: `/QUICK_REFERENCE.md`

---

**Happy Organizing! 🎨**

This structure will make your Reverie Figma file much easier to navigate, maintain, and hand off to developers. The key is consistency in naming, spacing, and organization.

**Last Updated:** March 9, 2026  
**Figma Organization Guide v1.0**
