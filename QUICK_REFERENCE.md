# Reverie - Quick Reference Guide

## 🚀 Getting Started

### Project Structure
```
/src
  /app
    App.tsx                      # Main app with routing logic
    /components
      /reverie                   # All Reverie components
        index.ts                 # Barrel export file
        [Component files...]
      /figma                     # Figma-specific utilities
      /ui                        # Generic UI components
  /styles
    theme.css                    # Design tokens
    fonts.css                    # Font imports
```

---

## 📦 Import Patterns

### ✅ Clean Import (Recommended)
```typescript
import { 
  DashboardScreen, 
  ReverieButton, 
  PixelIcon,
  type UserProfile 
} from './components/reverie';
```

### ❌ Avoid Direct Imports
```typescript
// Don't do this:
import { DashboardScreen } from './components/reverie/DashboardScreen';
```

---

## 🎯 Component Categories

### 📱 Screens
**Full-page components with their own layout**

| Component | Purpose | Props |
|-----------|---------|-------|
| `AuthScreen` | Login/signup | `onLogin`, `onSignUp`, `onGoogleAuth` |
| `ProfileSetupScreen` | User preferences | `onComplete`, `onBack` |
| `LandingScreen` | Welcome page | `onBegin` |
| `OnboardingScreen` | Tutorial | `onContinue` |
| `DashboardScreen` | Home hub | `userName` |
| `MemoryAtmospheresScreen` | Atmosphere grid | `onSelect`, `onBack` |
| `AtmosphereModeScreen` | Immersive view | `atmosphereId`, `onExit` |
| `InsightsScreen` | Data analytics | `onBack` |
| `TrustSafetyScreen` | Settings | `onBack`, `onContinue` |

---

### 🎨 UI Components
**Reusable building blocks**

#### Buttons
```typescript
<ReverieButton 
  variant="primary" | "secondary" | "ghost" | "aurora"
  size="sm" | "md" | "lg"
  onClick={() => {}}
>
  Button Text
</ReverieButton>
```

#### Cards
```typescript
// Base card
<ReverieCard variant="glass" | "solid" | "glow">
  Content
</ReverieCard>

// Data metric card
<DataCard
  label="Calm Score"
  value={87}
  unit="%"
  icon={<PixelIcon type="heart" size={20} />}
  trend="up" | "down" | "neutral"
  trendValue="+12%"
  color="#6A7FDB"
/>

// Atmosphere selector tile
<AtmosphereTile
  title="Lo-Fi Study"
  icon={<PixelIcon type="music" size={32} />}
  gradient="linear-gradient(...)"
  isActive={true}
  onClick={() => {}}
/>
```

#### Navigation
```typescript
<BottomNav 
  activeTab="home" | "atmospheres" | "insights" | "settings"
  onTabChange={(tab) => {}}
/>
```

#### Inputs
```typescript
<ReverieSlider
  label="Intensity"
  value={65}
  onChange={setValue}
  min={0}
  max={100}
  unit="%"
  color="#6A7FDB"
/>
```

#### Feedback
```typescript
<LoadingSpinner />
<SuccessCheckmark />
```

---

### ✨ Shared Elements

#### Icons
```typescript
<PixelIcon 
  type="heart" | "star" | "cloud" | "moon" | "sun" | 
       "sparkle" | "music" | "book"
  size={24}
  color="#6A7FDB"
/>
```

#### Illustrations
```typescript
<GhibliBackground />
<EnvironmentIllustrations type="meadow" | "rain" | "cafe" />
<ComfortOrb />
```

---

## 🎨 Design Tokens

### Colors
```typescript
// Primary Palette
'#6A7FDB'  // Indigo - primary actions, trust
'#A9B8FF'  // Lavender - secondary, calm
'#F6D6FF'  // Pink - warmth, comfort
'#FFB8A3'  // Peach - energy, sunrise

// Backgrounds
'#F7FFF7'  // Light mode background
'#0F1224'  // Dark mode background

// Text
'#F6D6FF'  // Primary text (on dark)
'#A9B8FF'  // Secondary text
rgba(169, 184, 255, 0.6)  // Tertiary text
```

### Spacing (8px grid)
```typescript
4px   // xs - tight spacing
8px   // sm - base unit
16px  // md - comfortable spacing
24px  // lg - standard margins
32px  // xl - section spacing
48px  // 2xl - major divisions
64px  // 3xl - page spacing
```

### Border Radius
```typescript
8px   // sm - small elements
12px  // md - buttons
20px  // lg - cards (standard)
28px  // xl - large cards
9999px // full - pills, circles
```

---

## 🔄 State Management

### App-Level State
Located in `/src/app/App.tsx`:

```typescript
// Screen navigation
const [currentScreen, setCurrentScreen] = useState<
  'auth' | 'profile-setup' | 'landing' | 'onboarding' | 
  'dashboard' | 'atmospheres' | 'insights' | 'trust' | ...
>('auth');

// Tab navigation
const [activeTab, setActiveTab] = useState<
  'home' | 'atmospheres' | 'insights' | 'settings'
>('home');

// User profile
const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

// Atmosphere state
const [selectedAtmosphereId, setSelectedAtmosphereId] = useState('spring-window');
const [intensity, setIntensity] = useState(65);
const [ambience, setAmbience] = useState(40);
```

### UserProfile Type
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

## 🎬 Animation Classes

### Available Utilities (from theme.css)
```css
/* Transitions */
.transition-gentle    /* 300ms ease-in-out */
.transition-smooth    /* 500ms cubic-bezier */

/* Hover Effects */
.hover-lift          /* translateY(-2px) */
.hover-glow          /* brightness(1.1) */
.hover-scale         /* scale(1.02) */

/* Entrance */
.fade-in             /* opacity animation */
.slide-up            /* translateY animation */
.scale-in            /* scale animation */

/* Attention */
.pulse-slow          /* 3s infinite pulse */
.float               /* floating animation */
```

### Custom Animations
```typescript
// In component styles
animation: 'float 20s ease-in-out infinite'

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
```

---

## 🧭 Navigation Flow

### Screen Flow Logic
```typescript
// Tab changes update both activeTab and currentScreen
const handleTabChange = (tab) => {
  setActiveTab(tab);
  switch (tab) {
    case 'home': setCurrentScreen('dashboard'); break;
    case 'atmospheres': setCurrentScreen('atmospheres'); break;
    case 'insights': setCurrentScreen('insights'); break;
    case 'settings': setCurrentScreen('trust'); break;
  }
};
```

### Bottom Nav Visibility
```typescript
// Screens WITH bottom nav:
✅ Dashboard
✅ Memory Atmospheres
✅ Insights
✅ Trust & Safety

// Screens WITHOUT bottom nav (full immersion):
❌ Auth
❌ Profile Setup
❌ Landing
❌ Onboarding
❌ Atmosphere Mode (immersive)
❌ Storytelling Moment
```

---

## 🎵 Audio System

### Atmosphere Sounds
```typescript
import { atmosphereSounds } from './components/reverie';

// Structure
interface AtmosphereSound {
  id: string;
  name: string;
  audioUrl: string;
  category: 'ambient' | 'nature' | 'music';
}

// Usage in components
const sound = atmosphereSounds.find(s => s.id === atmosphereId);
const audio = new Audio(sound.audioUrl);
audio.loop = true;
audio.volume = intensity / 100;
audio.play();
```

---

## 📱 Responsive Design

### Mobile-First Approach
```typescript
// Default: Mobile (375px - 428px)
className="w-full max-w-md mx-auto px-6"

// Margins: 24px (lg)
className="px-6 py-6"  // 24px = 6 * 4px

// Grid system: 8px base
className="gap-2"  // 8px
className="gap-4"  // 16px
className="gap-6"  // 24px
```

### Card Sizing
```typescript
// Standard mobile card
<ReverieCard className="rounded-[20px] p-6">
  {/* 20px radius, 24px padding */}
</ReverieCard>
```

---

## 🧪 Common Patterns

### Adding a New Screen

1. **Create component file**
```typescript
// /src/app/components/reverie/NewScreen.tsx
export function NewScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-[#F7FFF7] p-6">
      {/* Screen content */}
    </div>
  );
}
```

2. **Export from barrel file**
```typescript
// /src/app/components/reverie/index.ts
export { NewScreen } from './NewScreen';
```

3. **Add to App.tsx routing**
```typescript
// Add to screen type union
const [currentScreen, setCurrentScreen] = useState<
  '...' | 'new-screen'
>('auth');

// Add conditional render
if (currentScreen === 'new-screen') {
  return <NewScreen onNext={() => setCurrentScreen('next')} />;
}
```

4. **Update navigation logic if needed**

---

### Creating a Reusable Component

1. **Define props interface**
```typescript
interface NewComponentProps {
  title: string;
  onClick?: () => void;
  variant?: 'default' | 'highlighted';
}
```

2. **Create component with variants**
```typescript
export function NewComponent({ 
  title, 
  onClick, 
  variant = 'default' 
}: NewComponentProps) {
  const variantClasses = {
    default: 'bg-[#6A7FDB]',
    highlighted: 'bg-gradient-to-r from-[#6A7FDB] to-[#A9B8FF]'
  };
  
  return (
    <div className={variantClasses[variant]}>
      {title}
    </div>
  );
}
```

3. **Export from appropriate subfolder**

4. **Document in architecture file**

---

## 🐛 Debugging Tips

### Common Issues

**Component not found**
- Check if exported from `index.ts`
- Verify import path uses barrel export

**Style not applying**
- Confirm Tailwind class exists in v4
- Check for CSS specificity conflicts
- Verify theme tokens in `/src/styles/theme.css`

**State not persisting**
- UserProfile saved in App.tsx state
- No persistence layer yet (add Supabase for this)

**Animation glitches**
- Check for conflicting animations
- Reduce animation complexity on low-end devices
- Test with `prefers-reduced-motion`

---

## 📚 Additional Resources

- **Full Architecture:** See `/REVERIE_ARCHITECTURE.md`
- **Design System:** Check `/src/styles/theme.css`
- **Component Library:** Browse `/src/app/components/reverie/`

---

**Last Updated:** March 9, 2026  
**Quick Reference v1.0**
