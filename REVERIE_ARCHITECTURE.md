export interface AtmosphereSound {
  id: string;
  name: string;
  audioUrl: string;
  category: 'ambient' | 'nature' | 'music';
}

const SOUNDS: AtmosphereSound[] = [
  {
    id: 'childhood-bedroom',
    name: 'Childhood Bedroom at Sunset',
    audioUrl: '/sounds/childhood-bedroom/Childhood Bedroom at Sunset - Birds Chirping.mp3',
    category: 'ambient',
  },
  {
    id: 'early-internet',
    name: 'Early Internet Room (2000s Nostalgia)',
    audioUrl: '/sounds/early-internet/Early Internet Room (2000s Nostalgia) - TV News Channel in Background.mp3',
    category: 'ambient',
  },
  {
    id: 'library-corner',
    name: 'Quiet Library Corner',
    audioUrl: '/sounds/library-corner/Quiet Library Corner - Calmness (library  ambience).mp3',
    category: 'ambient',
  },
  {
    id: 'nature-meadow',
    name: 'Nature Meadow Afternoon',
    audioUrl: '/sounds/nature-meadow/Nature Meadow Afternoon - Crickets Sounds.mp3',
    category: 'nature',
  },
  {
    id: 'spring-window',
    name: 'Spring Evening Window',
    audioUrl: '/sounds/spring-window/Spring Evening Window - Wind Chimes by the Window.mp3',
    category: 'ambient',
  },
];

type AudioEntry = {
  audio: HTMLAudioElement;
  targetVolume: number;
  fadeTimer?: number | null;
};

class AtmosphereAudioManager {
  private sounds = new Map<string, AtmosphereSound>();
  private players = new Map<string, AudioEntry>();

  constructor() {
    SOUNDS.forEach((s) => this.sounds.set(s.id, s));
  }

  list() {
    return [...this.sounds.values()];
  }

  preloadAll() {
    this.list().forEach((s) => this.preparePlayer(s.id));
  }

  private preparePlayer(id: string) {
    if (this.players.has(id)) return this.players.get(id)!;
    const sound = this.sounds.get(id);
    if (!sound) throw new Error(`Sound id "${id}" not found`);
    const audio = new Audio(sound.audioUrl);
    audio.loop = true;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.volume = 0;
    const entry: AudioEntry = { audio, targetVolume: 0, fadeTimer: null };
    this.players.set(id, entry);
    return entry;
  }

  play(id: string, volume = 1, fadeMs = 300) {
    const entry = this.preparePlayer(id);
    entry.targetVolume = this.clamp(volume);
    const audio = entry.audio;
    if (audio.paused) {
      // ensure play resolves (user gesture needed in some browsers)
      audio.currentTime = 0;
      const p = audio.play();
      // ignore promise rejections (callers can handle if needed)
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
    this.fadeTo(id, entry.targetVolume, fadeMs);
  }

  setVolume(id: string, volume: number, fadeMs = 0) {
    const entry = this.preparePlayer(id);
    entry.targetVolume = this.clamp(volume);
    if (fadeMs > 0) this.fadeTo(id, entry.targetVolume, fadeMs);
    else entry.audio.volume = entry.targetVolume;
  }

  stop(id: string, fadeMs = 300) {
    const entry = this.players.get(id);
    if (!entry) return;
    this.fadeTo(id, 0, fadeMs, () => {
      try {
        entry.audio.pause();
        entry.audio.currentTime = 0;
      } catch {}
    });
  }

  private fadeTo(id: string, target: number, ms: number, onComplete?: () => void) {
    const entry = this.preparePlayer(id);
    const audio = entry.audio;
    if (entry.fadeTimer) {
      window.clearInterval(entry.fadeTimer);
      entry.fadeTimer = null;
    }
    if (ms <= 0) {
      audio.volume = this.clamp(target);
      if (onComplete) onComplete();
      return;
    }
    const steps = Math.max(6, Math.round(ms / 50));
    const start = audio.volume;
    const delta = target - start;
    let step = 0;
    const interval = window.setInterval(() => {
      step++;
      const t = step / steps;
      audio.volume = this.clamp(start + delta * t);
      if (step >= steps) {
        window.clearInterval(interval);
        entry.fadeTimer = null;
        audio.volume = this.clamp(target);
        if (onComplete) onComplete();
      }
    }, Math.max(10, Math.round(ms / steps)));
    entry.fadeTimer = interval;
  }

  private clamp(v: number) {
    return Math.max(0, Math.min(1, v));
  }
}

const audioManager = new AtmosphereAudioManager();
export { audioManager, SOUNDS, AtmosphereSound };
export default audioManager;# Reverie - Wellness Interface Architecture Documentation

## 📱 Project Overview

**Reverie** is a mobile wellness interface that helps users regulate emotional stress by recreating nostalgic sensory environments inspired by early 2000s internet aesthetics and childhood comfort spaces.

### Design System Foundation
- **Grid System:** 8px base grid
- **Margins:** 24px consistent margins
- **Border Radius:** 20px for rounded cards
- **Typography:** Inter / SF Pro, minimal and clean
- **Color Palette:** Ghibli-inspired nostalgic colors with atmospheric effects

---

## 🗺️ Screen Flow & Navigation

### User Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    1. Auth Screen (Login/Sign Up)
                              ↓
                    2. Profile Setup Screen
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         ONBOARDING FLOW                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    3. Landing Screen (Welcome)
                              ↓
                    4. Onboarding Screen (Tutorial)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      MAIN APPLICATION TABS                       │
└─────────────────────────────────────────────────────────────────┘
        ┌─────────┬──────────────┬──────────────┬──────────┐
        │         │              │              │          │
    HOME TAB  ATMOSPHERES   INSIGHTS TAB   SETTINGS TAB
        │         │              │              │
        ↓         ↓              ↓              ↓
   Dashboard   Memory       Insights      Trust &
    Screen   Atmospheres     Screen       Safety
               Screen           │          Screen
                  │             │
                  ↓             │
            Atmosphere          │
            Mode Screen         │
               (Immersive       │
              Full-Screen)      │
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      SPECIAL FLOW SCREENS                        │
└─────────────────────────────────────────────────────────────────┘
                  │
                  ↓
        Scenario Detection Screen
                  ↓
        Storytelling Moment Screen
                  ↓
        Active Atmosphere Screen
```

---

## 📂 Component Organization

### `/src/app/components/reverie/` Structure

```
reverie/
│
├── screens/                    # 🖥️ Full-page screen components
│   ├── auth/                   # Authentication & Setup
│   │   ├── AuthScreen.tsx
│   │   ├── ProfileSetupScreen.tsx
│   │   └── index.ts
│   │
│   ├── onboarding/            # First-time user experience
│   │   ├── LandingScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   └── index.ts
│   │
│   ├── main/                  # Core app screens (with bottom nav)
│   │   ├── DashboardScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   ├── TrustSafetyScreen.tsx
│   │   └── index.ts
│   │
│   ├── atmospheres/           # Atmosphere experience screens
│   │   ├── MemoryAtmospheresScreen.tsx
│   │   ├── AtmosphereModeScreen.tsx
│   │   ├── ActiveAtmosphereScreen.tsx
│   │   └── index.ts
│   │
│   └── special/               # Context-specific screens
│       ├── ScenarioScreen.tsx
│       ├── StorytellingMomentScreen.tsx
│       └── index.ts
│
├── ui/                        # 🎨 Reusable UI components
│   ├── buttons/
│   │   ├── ReverieButton.tsx
│   │   └── index.ts
│   │
│   ├── cards/
│   │   ├── ReverieCard.tsx
│   │   ├── DataCard.tsx
│   │   ├── AtmosphereCard.tsx
│   │   ├── DashboardCard.tsx
│   │   ├── EnvironmentCard.tsx
│   │   └── index.ts
│   │
│   ├── navigation/
│   │   ├── BottomNav.tsx
│   │   └── index.ts
│   │
│   ├── inputs/
│   │   ├── ReverieSlider.tsx
│   │   └── index.ts
│   │
│   ├── feedback/
│   │   ├── LoadingSpinner.tsx
│   │   ├── SuccessCheckmark.tsx
│   │   └── index.ts
│   │
│   └── tiles/
│       ├── AtmosphereTile.tsx
│       └── index.ts
│
├── shared/                    # 🔧 Shared utilities & assets
│   ├── icons/
│   │   ├── PixelIcon.tsx
│   │   └── index.ts
│   │
│   ├── illustrations/
│   │   ├── GhibliBackground.tsx
│   │   ├── EnvironmentIllustrations.tsx
│   │   ├── ComfortOrb.tsx
│   │   └── index.ts
│   │
│   └── audio/
│       ├── atmosphereSounds.ts
│       └── index.ts
│
└── index.ts                   # Main export barrel file
```

---

## 🖼️ Screen Descriptions

### 1️⃣ Authentication Flow

#### **AuthScreen**
- **Purpose:** User login and registration
- **Features:**
  - Email/password authentication
  - Google OAuth integration
  - Form validation
  - Smooth transitions between login/signup
- **Navigation:** → Profile Setup Screen

#### **ProfileSetupScreen**
- **Purpose:** Collect user preferences and comfort settings
- **Features:**
  - Name input
  - Comfort preference selection (nostalgia triggers, sensory preferences)
  - Multi-step form with progress indicator
- **Data Collected:** UserProfile object (name, preferences)
- **Navigation:** → Landing Screen

---

### 2️⃣ Onboarding Flow

#### **LandingScreen**
- **Purpose:** Welcome users and introduce Reverie
- **Features:**
  - Hero imagery with Ghibli-inspired aesthetics
  - App value proposition
  - "Begin" CTA
- **Navigation:** → Onboarding Screen

#### **OnboardingScreen**
- **Purpose:** Tutorial walkthrough of app features
- **Features:**
  - Multi-step carousel/tutorial
  - Feature highlights (atmospheres, insights, safety)
  - Skip and continue options
- **Navigation:** → Dashboard Screen (Home Tab)

---

### 3️⃣ Main Application Screens (With Bottom Navigation)

#### **DashboardScreen** (Home Tab)
- **Purpose:** Personal wellness hub and quick actions
- **Features:**
  - Personalized greeting with user's name
  - Calm score and focus time metrics
  - Quick access to atmospheres
  - Recent session history
  - Breathing exercises
- **Props:** `userName: string`
- **Navigation:** Bottom Nav to other tabs

#### **InsightsScreen** (Insights Tab)
- **Purpose:** Data visualization and wellness trends
- **Features:**
  - Weekly/monthly emotion charts
  - Atmosphere usage patterns
  - Stress trigger identification
  - Progress tracking
  - Exportable reports
- **Navigation:** Bottom Nav, Back button

#### **TrustSafetyScreen** (Settings Tab)
- **Purpose:** Privacy controls and wellness resources
- **Features:**
  - Data privacy settings
  - Crisis resources (mental health hotlines)
  - Account management
  - Content preferences
  - Emergency contacts
- **Navigation:** Bottom Nav, Back button, Continue CTA

---

### 4️⃣ Atmosphere Experience Screens

#### **MemoryAtmospheresScreen** (Atmospheres Tab)
- **Purpose:** Browse and select nostalgic environments
- **Features:**
  - Grid of atmosphere cards
  - Categories: Rainy Window, Lo-fi Study, Childhood Bedroom, etc.
  - Preview animations
  - Recently used section
- **Interaction:** `onSelect(id: string)` → Atmosphere Mode
- **Navigation:** Bottom Nav, Back button

#### **AtmosphereModeScreen**
- **Purpose:** Immersive full-screen atmosphere experience
- **Features:**
  - Full-screen visuals with animated elements
  - Audio playback system (ambient sounds)
  - Breathing prompts
  - Intensity controls
  - Timer functionality
  - Exit button (no bottom nav for immersion)
- **Props:** `atmosphereId: string`, `onExit: () => void`
- **Audio Integration:** Uses `atmosphereSounds.ts`
- **Navigation:** Exit → Memory Atmospheres Screen

#### **ActiveAtmosphereScreen**
- **Purpose:** Atmosphere session in progress with stats
- **Features:**
  - Session timer
  - Real-time metrics (heart rate variability, breathing)
  - Pause/resume controls
  - Session notes
- **Navigation:** Can navigate to other screens while session runs

---

### 5️⃣ Special Context Screens

#### **ScenarioScreen**
- **Purpose:** Detect stressful situations and suggest interventions
- **Features:**
  - Contextual awareness (time, calendar events)
  - Stress level detection
  - Atmosphere recommendations
  - Quick activation button
- **Navigation:** → Active Atmosphere / Storytelling Moment

#### **StorytellingMomentScreen**
- **Purpose:** Cinematic transition into atmosphere
- **Features:**
  - Animated storytelling sequence
  - Emotional context setting
  - Gentle intro to atmosphere
  - Auto-advance or manual trigger
- **Props:** `detectedPressure`, `atmosphereName`, `onEnter`
- **Navigation:** → Active Atmosphere Screen

---

## 🎨 UI Component Library

### Buttons

#### **ReverieButton**
```typescript
variants: 'primary' | 'secondary' | 'ghost' | 'aurora'
sizes: 'sm' | 'md' | 'lg'
```
- **Primary:** Solid indigo background, white text
- **Secondary:** Outlined lavender border, transparent background
- **Ghost:** No border, subtle hover effect
- **Aurora:** Animated gradient background (special actions)

---

### Cards

#### **ReverieCard**
```typescript
variants: 'glass' | 'solid' | 'glow'
```
- **Glass:** Frosted glass effect, semi-transparent
- **Solid:** Opaque background with subtle shadow
- **Glow:** Outer glow/aura effect for emphasis

#### **DataCard**
- Displays metric with icon, value, unit, and trend
- Props: `label`, `value`, `unit`, `icon`, `trend`, `color`

#### **AtmosphereCard**
- Preview card for atmosphere selection
- Shows title, description, thumbnail
- Hover/press animation

#### **DashboardCard**
- Quick action cards on dashboard
- Icon, title, description, CTA

#### **EnvironmentCard**
- Detailed atmosphere information
- Full image, metadata, duration estimates

---

### Navigation

#### **BottomNav**
- 4 tabs: Home, Atmospheres, Insights, Settings
- Active state highlighting
- Pixel icon indicators
- Smooth transitions

---

### Inputs

#### **ReverieSlider**
- Custom-styled range slider
- Props: `label`, `value`, `onChange`, `min`, `max`, `unit`, `color`
- Visual feedback with gradient track

---

### Feedback Components

#### **LoadingSpinner**
- Animated circular spinner with Ghibli aesthetic
- Pulsing glow effect

#### **SuccessCheckmark**
- Animated checkmark for confirmations
- Scale and fade-in animation

---

### Tiles

#### **AtmosphereTile**
- Compact atmosphere selector
- Gradient background
- Icon + title
- Active state styling

---

## 🎭 Shared Visual Elements

### Icons

#### **PixelIcon**
```typescript
types: 'heart' | 'star' | 'cloud' | 'moon' | 'sun' | 
       'sparkle' | 'music' | 'book'
```
- Pixel-art style icons
- Customizable size and color
- Nostalgic aesthetic

---

### Illustrations

#### **GhibliBackground**
- Atmospheric background with animated layers
- Parallax effects
- Sky gradients with clouds

#### **EnvironmentIllustrations**
- Scene-specific illustrations for each atmosphere
- Layered elements for depth

#### **ComfortOrb**
- Floating orb with pulsing animation
- Used in meditative screens

---

### Audio System

#### **atmosphereSounds.ts**
```typescript
interface AtmosphereSound {
  id: string;
  name: string;
  audioUrl: string;
  category: 'ambient' | 'nature' | 'music';
}
```
- Audio file management
- Preload and cache
- Volume controls
- Fade in/out transitions

---

## 🎨 Design System Tokens

### Color Palette (Ghibli-Inspired)

```css
/* Primary Colors */
--color-indigo: #6A7FDB;        /* Deep sky, twilight */
--color-lavender: #A9B8FF;      /* Soft clouds, dreams */
--color-pink: #F6D6FF;          /* Cherry blossoms, warmth */
--color-peach: #FFB8A3;         /* Sunset glow, comfort */

/* Background Colors */
--color-bg-light: #F7FFF7;      /* Soft cream, paper texture */
--color-bg-dark: #0F1224;       /* Night sky, depth */
--color-bg-card: rgba(26, 28, 44, 0.6);  /* Frosted glass */

/* Semantic Colors */
--color-success: #8FD6A3;       /* Gentle green */
--color-warning: #FFD4A3;       /* Warm amber */
--color-error: #FFB8C1;         /* Soft pink red */
--color-info: #A9B8FF;          /* Information lavender */

/* Text Colors */
--color-text-primary: #F6D6FF;  /* High contrast on dark */
--color-text-secondary: #A9B8FF; /* Medium contrast */
--color-text-tertiary: rgba(169, 184, 255, 0.6); /* Low contrast */
```

### Spacing Scale (8px Grid)

```css
--spacing-xs: 4px;    /* 0.5 units */
--spacing-sm: 8px;    /* 1 unit */
--spacing-md: 16px;   /* 2 units */
--spacing-lg: 24px;   /* 3 units - standard margins */
--spacing-xl: 32px;   /* 4 units */
--spacing-2xl: 48px;  /* 6 units */
--spacing-3xl: 64px;  /* 8 units */
```

### Border Radius

```css
--radius-sm: 8px;     /* Small elements */
--radius-md: 12px;    /* Buttons */
--radius-lg: 20px;    /* Cards (standard) */
--radius-xl: 28px;    /* Large cards */
--radius-full: 9999px; /* Pills, avatars */
```

### Typography

```css
/* Font Family */
--font-primary: 'Inter', 'SF Pro Display', -apple-system, sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 24px;
--text-2xl: 32px;
--text-3xl: 40px;

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;

/* Line Heights */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Shadows & Effects

```css
/* Glass Morphism */
--glass-blur: blur(20px);
--glass-bg: rgba(26, 28, 44, 0.6);
--glass-border: rgba(169, 184, 255, 0.2);

/* Glows */
--glow-indigo: 0 0 20px rgba(106, 127, 219, 0.5);
--glow-lavender: 0 0 20px rgba(169, 184, 255, 0.5);
--glow-pink: 0 0 20px rgba(246, 214, 255, 0.5);

/* Shadows */
--shadow-sm: 0 2px 8px rgba(15, 18, 36, 0.1);
--shadow-md: 0 4px 16px rgba(15, 18, 36, 0.15);
--shadow-lg: 0 8px 32px rgba(15, 18, 36, 0.2);
```

---

## 🎬 Animation System

### Gentle Micro-Animations (43 Utility Classes)

```css
/* Transitions */
.transition-gentle: 0.3s ease-in-out;
.transition-smooth: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover Effects */
.hover-lift: translateY(-2px);
.hover-glow: brightness(1.1);
.hover-scale: scale(1.02);

/* Entrance Animations */
.fade-in: opacity 0 → 1;
.slide-up: translateY(20px) → 0;
.scale-in: scale(0.95) → 1;

/* Attention */
.pulse-slow: 3s infinite;
.float: vertical movement 20s;
.shimmer: gradient shift animation;
```

---

## 🔐 State Management

### App State (App.tsx)

```typescript
// Screen navigation
currentScreen: 'auth' | 'profile-setup' | 'landing' | 
               'onboarding' | 'dashboard' | 'atmospheres' | 
               'storytelling' | 'active' | 'atmosphere-mode' | 
               'scenario' | 'insights' | 'trust' | 'library'

// Tab navigation
activeTab: 'home' | 'atmospheres' | 'insights' | 'settings'

// User data
userProfile: UserProfile | null

// Atmosphere state
activeAtmosphere: string
selectedAtmosphereId: string
intensity: number (0-100)
ambience: number (0-100)
```

### User Profile Interface

```typescript
interface UserProfile {
  name: string;
  comfortPreferences: {
    nostalgiaEra: '90s' | '2000s' | '2010s';
    sensoryPreference: 'visual' | 'audio' | 'both';
    stressTriggers: string[];
  };
}
```

---

## 🧪 Testing Checklist

### Authentication Flow
- [ ] Login with valid credentials
- [ ] Sign up new account
- [ ] Google OAuth integration
- [ ] Form validation errors
- [ ] Profile setup completion
- [ ] Name persists to dashboard

### Navigation
- [ ] Bottom nav switches screens correctly
- [ ] Active tab highlights properly
- [ ] Back buttons return to correct screen
- [ ] Deep linking to specific tabs

### Atmosphere Experience
- [ ] Atmosphere grid displays all options
- [ ] Tapping tile opens immersive mode
- [ ] Audio plays correctly
- [ ] Intensity/ambience sliders work
- [ ] Exit returns to selection screen
- [ ] Session timer functions

### Data & Insights
- [ ] Metrics update in real-time
- [ ] Charts render properly
- [ ] Data persists across sessions

### Responsive Design
- [ ] 8px grid alignment
- [ ] 24px margins consistent
- [ ] Cards use 20px border radius
- [ ] Text scales properly on different screens

---

## 🚀 Future Enhancements

### Planned Features
1. **Backend Integration** (Supabase)
   - User authentication
   - Profile data persistence
   - Session history storage
   - Analytics tracking

2. **Advanced Atmospheres**
   - Custom atmosphere creation
   - Community-shared environments
   - AR/VR compatibility

3. **Social Features**
   - Share wellness achievements
   - Group meditation sessions
   - Accountability partners

4. **Wearable Integration**
   - Heart rate monitoring
   - Sleep quality tracking
   - Activity correlation

5. **AI Features**
   - Personalized recommendations
   - Mood prediction
   - Adaptive atmosphere adjustment

---

## 📝 Component Conversion Checklist

### Reusable Components to Create in Figma
- [ ] **ReverieButton** (4 variants, 3 sizes)
- [ ] **ReverieCard** (3 variants)
- [ ] **DataCard** with all states
- [ ] **AtmosphereTile** (active/inactive)
- [ ] **BottomNav** (4 tab states)
- [ ] **ReverieSlider** component
- [ ] **PixelIcon** library (8 icons)
- [ ] **Input fields** (text, email, password)
- [ ] **LoadingSpinner** animation
- [ ] **SuccessCheckmark** animation

### Design System in Figma
- [ ] Color styles for all tokens
- [ ] Text styles (all sizes + weights)
- [ ] Effect styles (shadows, glows, glass)
- [ ] 8px grid overlay
- [ ] Component library page
- [ ] Prototype connections preserved

---

## 🗂️ Figma Organization Structure

```
📁 Reverie Design System
│
├── 📄 Cover Page
│
├── 📄 1. Authentication
│   ├── Auth Screen (Login)
│   ├── Auth Screen (Sign Up)
│   └── Profile Setup (Steps 1-3)
│
├── 📄 2. Onboarding
│   ├── Landing Screen
│   └── Onboarding Screen (Tutorial Steps)
│
├── 📄 3. Dashboard (Home Tab)
│   ├── Dashboard - Default State
│   ├── Dashboard - Active Session
│   └── Dashboard - Empty State
│
├── 📄 4. Memory Atmospheres
│   ├── Atmospheres Selection Grid
│   ├── Atmosphere Detail View
│   └── Atmosphere Mode (Immersive)
│
├── 📄 5. Insights
│   ├── Insights Overview
│   ├── Weekly Report
│   └── Monthly Report
│
├── 📄 6. Settings
│   ├── Trust & Safety
│   ├── Account Settings
│   └── Privacy Controls
│
├── 📄 7. Special Screens
│   ├── Scenario Detection
│   ├── Storytelling Moment
│   └── Active Atmosphere Session
│
├── 📄 8. Design System
│   ├── Color Palette
│   ├── Typography Scale
│   ├── Spacing & Grid
│   ├── Icons Library
│   ├── Component Library
│   └── Animation Guidelines
│
└── 📄 Archive - Do Not Delete
    ├── Experimental Designs
    ├── Old Iterations
    └── Reference Materials
```

---

## 📋 Maintenance Notes

### When Adding New Screens
1. Create component in appropriate `/screens/` subfolder
2. Export from subfolder `index.ts`
3. Add to main `/reverie/index.ts` barrel export
4. Update `App.tsx` routing logic
5. Update this documentation

### When Adding UI Components
1. Create in appropriate `/ui/` subfolder
2. Ensure variant system is extensible
3. Add TypeScript props interface
4. Document usage in component file
5. Update component library documentation

### Code Style Guidelines
- Use functional components with hooks
- TypeScript for all props interfaces
- Tailwind CSS for styling (v4)
- 2-space indentation
- Descriptive component and variable names
- Comments for complex logic only

---

**Last Updated:** March 9, 2026  
**Version:** 1.0  
**Maintained By:** Reverie Development Team
