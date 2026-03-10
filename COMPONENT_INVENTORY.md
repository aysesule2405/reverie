# Reverie Component Inventory

Complete list of all components in the Reverie design system with their locations, props, and usage guidelines.

---

## 📊 Summary Statistics

- **Total Components:** 27
- **Screen Components:** 12
- **UI Components:** 10
- **Shared Elements:** 5
- **Lines of Code:** ~3,000+

---

## 🖥️ Screen Components (12)

### Authentication & Setup

#### 1. AuthScreen
**Location:** `/src/app/components/reverie/AuthScreen.tsx`

**Purpose:** User login and registration

**Props:**
```typescript
{
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
  onGoogleAuth: () => void;
}
```

**Features:**
- Email/password inputs with validation
- Toggle between login/signup
- Google OAuth button
- Form validation
- Error messages

**Usage:**
```tsx
<AuthScreen
  onLogin={(email, password) => console.log('Login')}
  onSignUp={(email, password) => console.log('Sign up')}
  onGoogleAuth={() => console.log('Google')}
/>
```

---

#### 2. ProfileSetupScreen
**Location:** `/src/app/components/reverie/ProfileSetupScreen.tsx`

**Purpose:** Collect user preferences during onboarding

**Props:**
```typescript
{
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}
```

**Types:**
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

**Features:**
- Multi-step form (3 steps)
- Progress indicator
- Name input
- Preference selection
- Validation

**Usage:**
```tsx
<ProfileSetupScreen
  onComplete={(profile) => setUserProfile(profile)}
  onBack={() => navigate('auth')}
/>
```

---

### Onboarding

#### 3. LandingScreen
**Location:** `/src/app/components/reverie/LandingScreen.tsx`

**Purpose:** Welcome page introducing Reverie

**Props:**
```typescript
{
  onBegin: () => void;
}
```

**Features:**
- Hero section with Ghibli background
- Value proposition
- "Begin Journey" CTA
- Animated entrance

**Usage:**
```tsx
<LandingScreen onBegin={() => navigate('onboarding')} />
```

---

#### 4. OnboardingScreen
**Location:** `/src/app/components/reverie/OnboardingScreen.tsx`

**Purpose:** Tutorial walkthrough of app features

**Props:**
```typescript
{
  onContinue: () => void;
}
```

**Features:**
- Multi-step carousel (4-5 steps)
- Dot indicators
- Skip button
- Feature highlights
- Pixel icon illustrations

**Usage:**
```tsx
<OnboardingScreen onContinue={() => navigate('dashboard')} />
```

---

### Main Application Screens

#### 5. DashboardScreen
**Location:** `/src/app/components/reverie/DashboardScreen.tsx`

**Purpose:** Personal wellness hub (Home tab)

**Props:**
```typescript
{
  userName: string;
}
```

**Features:**
- Personalized greeting with name
- Time-based greeting (morning/afternoon/evening)
- Calm score and focus time metrics
- Quick atmosphere access
- Recent session history
- Breathing exercise shortcuts

**Usage:**
```tsx
<DashboardScreen userName={userProfile?.name || 'Guest'} />
```

**Note:** Uses `userName` prop to display personalized greeting. Previously hardcoded as "Alex".

---

#### 6. InsightsScreen
**Location:** `/src/app/components/reverie/InsightsScreen.tsx`

**Purpose:** Data visualization and wellness trends (Insights tab)

**Props:**
```typescript
{
  onBack: () => void;
}
```

**Features:**
- Weekly/monthly emotion charts
- Atmosphere usage patterns
- Stress trigger analysis
- Progress tracking
- Time range selector
- Export reports button

**Usage:**
```tsx
<InsightsScreen onBack={() => navigate('dashboard')} />
```

---

#### 7. TrustSafetyScreen
**Location:** `/src/app/components/reverie/TrustSafetyScreen.tsx`

**Purpose:** Privacy controls and wellness resources (Settings tab)

**Props:**
```typescript
{
  onBack: () => void;
  onContinue: () => void;
}
```

**Features:**
- Data privacy settings
- Crisis resources with hotlines
- Account management
- Content preferences
- Emergency contacts
- Delete account (danger zone)

**Usage:**
```tsx
<TrustSafetyScreen
  onBack={() => navigate('dashboard')}
  onContinue={() => navigate('dashboard')}
/>
```

---

### Atmosphere Experience

#### 8. MemoryAtmospheresScreen
**Location:** `/src/app/components/reverie/MemoryAtmospheresScreen.tsx`

**Purpose:** Browse and select nostalgic environments (Atmospheres tab)

**Props:**
```typescript
{
  onSelect: (atmosphereId: string) => void;
  onBack: () => void;
}
```

**Features:**
- Grid of atmosphere cards
- Categories (rainy, lo-fi, nature, etc.)
- Preview animations
- Recently used section
- Filter/search functionality

**Usage:**
```tsx
<MemoryAtmospheresScreen
  onSelect={(id) => navigate('atmosphere-mode', { id })}
  onBack={() => navigate('dashboard')}
/>
```

---

#### 9. AtmosphereModeScreen
**Location:** `/src/app/components/reverie/AtmosphereModeScreen.tsx`

**Purpose:** Immersive full-screen atmosphere experience

**Props:**
```typescript
{
  atmosphereId: string;
  onExit: () => void;
}
```

**Features:**
- Full-screen visuals (no bottom nav)
- Animated environment elements
- Audio playback system
- Breathing prompts
- Intensity/volume controls
- Session timer
- Exit button

**Usage:**
```tsx
<AtmosphereModeScreen
  atmosphereId="spring-window"
  onExit={() => navigate('atmospheres')}
/>
```

**Note:** This is the ONLY screen without bottom navigation for full immersion.

---

#### 10. ActiveAtmosphereScreen
**Location:** `/src/app/components/reverie/ActiveAtmosphereScreen.tsx`

**Purpose:** Atmosphere session with active metrics

**Props:**
```typescript
{
  onActivate: () => void;
}
```

**Features:**
- Session timer
- Real-time metrics (HRV, breathing)
- Pause/resume controls
- Session notes
- End session button

**Usage:**
```tsx
<ActiveAtmosphereScreen onActivate={() => {}} />
```

---

### Special Context Screens

#### 11. ScenarioScreen
**Location:** `/src/app/components/reverie/ScenarioScreen.tsx`

**Purpose:** Detect stressful situations and suggest interventions

**Props:**
```typescript
{
  onActivate: () => void;
}
```

**Features:**
- Contextual awareness UI
- Calendar integration mock
- Stress level detection
- Atmosphere recommendations
- Quick activation CTA

**Usage:**
```tsx
<ScenarioScreen onActivate={() => navigate('active')} />
```

---

#### 12. StorytellingMomentScreen
**Location:** `/src/app/components/reverie/StorytellingMomentScreen.tsx`

**Purpose:** Cinematic transition into atmosphere

**Props:**
```typescript
{
  detectedPressure: string;
  atmosphereName: string;
  onEnter: () => void;
}
```

**Features:**
- Full-screen cinematic view
- Animated storytelling sequence
- Emotional context setting
- Auto-advance or manual CTA
- Gentle narrative text

**Usage:**
```tsx
<StorytellingMomentScreen
  detectedPressure="rising"
  atmosphereName="Spring Meadow"
  onEnter={() => navigate('active')}
/>
```

---

## 🎨 UI Components (10)

### Buttons

#### 13. ReverieButton
**Location:** `/src/app/components/reverie/ReverieButton.tsx`

**Purpose:** Styled button with multiple variants

**Props:**
```typescript
{
  variant?: 'primary' | 'secondary' | 'ghost' | 'aurora';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

**Variants:**
- **Primary:** Solid indigo (#6A7FDB), white text, for main actions
- **Secondary:** Outlined lavender border, transparent bg, for secondary actions
- **Ghost:** No border, subtle hover, for tertiary actions
- **Aurora:** Animated gradient, for special moments

**Sizes:**
- **sm:** 32px height, 12px padding, 14px text
- **md:** 40px height, 16px padding, 16px text
- **lg:** 48px height, 20px padding, 18px text

**Usage:**
```tsx
<ReverieButton variant="primary" size="lg" onClick={() => {}}>
  Begin Journey
</ReverieButton>
```

---

### Cards

#### 14. ReverieCard
**Location:** `/src/app/components/reverie/ReverieCard.tsx`

**Purpose:** Container card with visual variants

**Props:**
```typescript
{
  variant?: 'glass' | 'solid' | 'glow';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

**Variants:**
- **Glass:** Frosted glass effect, semi-transparent, backdrop blur
- **Solid:** Opaque dark background, subtle shadow
- **Glow:** Outer glow effect for emphasis

**Usage:**
```tsx
<ReverieCard variant="glass" className="p-6">
  <h3>Card Title</h3>
  <p>Card content...</p>
</ReverieCard>
```

---

#### 15. DataCard
**Location:** `/src/app/components/reverie/DataCard.tsx`

**Purpose:** Display metrics with trends

**Props:**
```typescript
{
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  color: string;
}
```

**Features:**
- Large number display
- Icon with custom color
- Trend indicator (↑↓→)
- Percentage/unit label
- Subtle animation on mount

**Usage:**
```tsx
<DataCard
  label="Calm Score"
  value={87}
  unit="%"
  icon={<PixelIcon type="heart" size={20} color="#6A7FDB" />}
  trend="up"
  trendValue="+12%"
  color="#6A7FDB"
/>
```

---

#### 16. AtmosphereCard
**Location:** `/src/app/components/reverie/AtmosphereCard.tsx`

**Purpose:** Preview card for atmosphere selection

**Props:**
```typescript
{
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  onSelect: () => void;
}
```

**Features:**
- Thumbnail image
- Title and description
- Category badge
- Duration estimate
- Hover lift animation

**Usage:**
```tsx
<AtmosphereCard
  title="Spring Meadow"
  description="Gentle breeze, blooming flowers"
  thumbnail="/images/spring.jpg"
  duration="15-30 min"
  category="Nature"
  onSelect={() => {}}
/>
```

---

#### 17. DashboardCard
**Location:** `/src/app/components/reverie/DashboardCard.tsx`

**Purpose:** Quick action cards on dashboard

**Props:**
```typescript
{
  icon: React.ReactNode;
  title: string;
  description: string;
  onAction: () => void;
  actionLabel?: string;
}
```

**Features:**
- Large icon
- Title and description
- Action button
- Gradient background option

**Usage:**
```tsx
<DashboardCard
  icon={<PixelIcon type="music" size={32} />}
  title="Start Session"
  description="Begin your wellness journey"
  actionLabel="Start"
  onAction={() => {}}
/>
```

---

#### 18. EnvironmentCard
**Location:** `/src/app/components/reverie/EnvironmentCard.tsx`

**Purpose:** Detailed atmosphere information

**Props:**
```typescript
{
  environment: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    soundscape: string[];
    benefits: string[];
  };
  onActivate: () => void;
}
```

**Features:**
- Full card with image
- Benefits list
- Soundscape tags
- "Activate" CTA

**Usage:**
```tsx
<EnvironmentCard
  environment={{
    id: 'spring',
    name: 'Spring Meadow',
    description: '...',
    imageUrl: '...',
    soundscape: ['birds', 'breeze'],
    benefits: ['Reduce stress', 'Improve focus']
  }}
  onActivate={() => {}}
/>
```

---

### Navigation

#### 19. BottomNav
**Location:** `/src/app/components/reverie/BottomNav.tsx`

**Purpose:** Bottom tab navigation bar

**Props:**
```typescript
{
  activeTab: 'home' | 'atmospheres' | 'insights' | 'settings';
  onTabChange: (tab: 'home' | 'atmospheres' | 'insights' | 'settings') => void;
}
```

**Features:**
- 4 tabs with icons and labels
- Active state highlighting
- Smooth transitions
- Fixed to bottom of screen
- Pixel icon indicators

**Tabs:**
1. **Home** (house icon) → Dashboard
2. **Atmospheres** (cloud icon) → Memory Atmospheres
3. **Insights** (chart icon) → Insights
4. **Settings** (gear icon) → Trust & Safety

**Usage:**
```tsx
<BottomNav
  activeTab="home"
  onTabChange={(tab) => setActiveTab(tab)}
/>
```

---

### Inputs

#### 20. ReverieSlider
**Location:** `/src/app/components/reverie/ReverieSlider.tsx`

**Purpose:** Custom styled range slider

**Props:**
```typescript
{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  color: string;
}
```

**Features:**
- Gradient track fill
- Custom thumb styling
- Value display with unit
- Label above slider
- Smooth transitions

**Usage:**
```tsx
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

---

### Feedback Components

#### 21. LoadingSpinner
**Location:** `/src/app/components/reverie/LoadingSpinner.tsx`

**Purpose:** Animated loading indicator

**Props:**
```typescript
{
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}
```

**Features:**
- Circular spinner animation
- Pulsing glow effect
- Multiple sizes
- Custom color support

**Usage:**
```tsx
<LoadingSpinner size="md" color="#6A7FDB" />
```

---

#### 22. SuccessCheckmark
**Location:** `/src/app/components/reverie/SuccessCheckmark.tsx`

**Purpose:** Animated success confirmation

**Props:**
```typescript
{
  size?: number;
  color?: string;
}
```

**Features:**
- Checkmark draw animation
- Scale and fade-in
- Success state indicator

**Usage:**
```tsx
<SuccessCheckmark size={64} color="#8FD6A3" />
```

---

### Tiles

#### 23. AtmosphereTile
**Location:** `/src/app/components/reverie/AtmosphereTile.tsx`

**Purpose:** Compact atmosphere selector

**Props:**
```typescript
{
  title: string;
  icon: React.ReactNode;
  gradient: string;
  isActive: boolean;
  onClick: () => void;
}
```

**Features:**
- Square tile with gradient
- Icon + title
- Active state styling
- Hover animation
- Glow effect when active

**Usage:**
```tsx
<AtmosphereTile
  title="Lo-Fi Study"
  icon={<PixelIcon type="music" size={32} />}
  gradient="linear-gradient(135deg, #6A7FDB, #A9B8FF)"
  isActive={true}
  onClick={() => {}}
/>
```

---

## ✨ Shared Elements (5)

### Icons

#### 24. PixelIcon
**Location:** `/src/app/components/reverie/PixelIcon.tsx`

**Purpose:** Pixel-art style icons for nostalgic aesthetic

**Props:**
```typescript
{
  type: 'heart' | 'star' | 'cloud' | 'moon' | 'sun' | 
        'sparkle' | 'music' | 'book';
  size: number;
  color: string;
}
```

**Icon Types:**
- **heart:** Love, wellness, care
- **star:** Achievement, favorites
- **cloud:** Weather, atmosphere, dreams
- **moon:** Night, sleep, calm
- **sun:** Day, energy, warmth
- **sparkle:** Magic, special moments
- **music:** Audio, lo-fi, ambience
- **book:** Learning, journaling

**Usage:**
```tsx
<PixelIcon type="heart" size={24} color="#6A7FDB" />
```

---

### Illustrations

#### 25. GhibliBackground
**Location:** `/src/app/components/reverie/GhibliBackground.tsx`

**Purpose:** Atmospheric background with animated layers

**Props:**
```typescript
{
  variant?: 'sky' | 'meadow' | 'night' | 'sunrise';
  animated?: boolean;
}
```

**Features:**
- Layered sky gradients
- Animated clouds
- Parallax effects
- Paper texture overlay
- Time-of-day variants

**Usage:**
```tsx
<GhibliBackground variant="sky" animated={true} />
```

---

#### 26. EnvironmentIllustrations
**Location:** `/src/app/components/reverie/EnvironmentIllustrations.tsx`

**Purpose:** Scene-specific illustrations for atmospheres

**Props:**
```typescript
{
  type: 'meadow' | 'rain' | 'cafe' | 'night' | 'beach';
  animated?: boolean;
}
```

**Features:**
- Layered vector illustrations
- Animated elements (rain drops, steam, etc.)
- Ghibli-inspired art style
- Depth with parallax

**Available Illustrations:**
- **BedroomIllustration** - Childhood bedroom with window and bed
- **InternetIllustration** - Computer monitor with screen glow
- **LibraryIllustration** - Books on shelf with open book
- **NatureIllustration** - Mountains and sunset/sunrise
- **AfterSchoolIllustration** - Door with welcome mat
- **MusicIllustration** - Headphones with music notes

**Usage:**
```tsx
import { BedroomIllustration, NatureIllustration } from './components/reverie';

<BedroomIllustration />
<NatureIllustration />
```

---

#### 27. ComfortOrb
**Location:** `/src/app/components/reverie/ComfortOrb.tsx`

**Purpose:** Floating animated orb for meditative screens

**Props:**
```typescript
{
  size?: number;
  color?: string;
  pulseSpeed?: number;
}
```

**Features:**
- Pulsing glow animation
- Floating movement
- Gradient fill
- Calming visual anchor

**Usage:**
```tsx
<ComfortOrb size={200} color="#6A7FDB" pulseSpeed={3000} />
```

---

### Audio System

#### atmosphereSounds.ts
**Location:** `/src/app/components/reverie/atmosphereSounds.ts`

**Purpose:** Audio file management and configuration

**Export:**
```typescript
export const atmosphereSounds: AtmosphereSound[] = [...]

export interface AtmosphereSound {
  id: string;
  name: string;
  audioUrl: string;
  category: 'ambient' | 'nature' | 'music';
  duration?: number;
  loopable: boolean;
}
```

**Example Data:**
```typescript
{
  id: 'spring-birds',
  name: 'Spring Birds Chirping',
  audioUrl: '/audio/spring-birds.mp3',
  category: 'nature',
  loopable: true
}
```

**Usage:**
```typescript
import { atmosphereSounds } from './components/reverie';

const sound = atmosphereSounds.find(s => s.id === 'spring-birds');
const audio = new Audio(sound.audioUrl);
audio.loop = sound.loopable;
audio.play();
```

---

## 📊 Component Dependencies

### Dependency Tree

```
App.tsx
├── AuthScreen
├── ProfileSetupScreen
│   └── (exports UserProfile type)
├── LandingScreen
│   └── GhibliBackground
│   └── PixelIcon
├── OnboardingScreen
│   └── PixelIcon
│   └── ReverieButton
├── DashboardScreen
│   ├── DashboardCard
│   ├── DataCard
│   │   └── PixelIcon
│   ├── AtmosphereTile
│   │   └── PixelIcon
│   └── ReverieButton
├── MemoryAtmospheresScreen
│   ├── AtmosphereCard
│   └── EnvironmentCard
├── AtmosphereModeScreen
│   ├── EnvironmentIllustrations
│   ├── ComfortOrb
│   ├── ReverieSlider
│   ├── atmosphereSounds
│   └── ReverieButton
├── InsightsScreen
│   ├── DataCard
│   │   └── PixelIcon
│   └── ReverieCard
├── TrustSafetyScreen
│   ├── ReverieCard
│   └── ReverieButton
├── ScenarioScreen
│   ├── PixelIcon
│   └── ReverieButton
├── StorytellingMomentScreen
│   ├── GhibliBackground
│   └── ReverieButton
├── ActiveAtmosphereScreen
│   ├── ReverieSlider
│   └── ReverieButton
└── BottomNav
    └── PixelIcon
```

---

## 🔄 Component Lifecycle

### Initialization Order

1. **App.tsx** mounts
2. **AuthScreen** renders (initial state)
3. User authenticates → **ProfileSetupScreen**
4. Profile completed → **LandingScreen**
5. User begins → **OnboardingScreen**
6. Onboarding complete → **DashboardScreen** + **BottomNav**
7. Navigation available to all main screens

### State Flow

```
App.tsx State:
├── currentScreen → Controls which screen renders
├── activeTab → Controls bottom nav highlight
├── userProfile → Shared user data
├── selectedAtmosphereId → Current atmosphere
└── intensity/ambience → Atmosphere settings

Passed Down As Props:
├── userName → DashboardScreen
├── atmosphereId → AtmosphereModeScreen
├── onSelect/onBack → Navigation callbacks
└── onComplete → Profile setup callback
```

---

## 🎯 Component Usage Patterns

### Most Used Components
1. **PixelIcon** - Used in 8+ components
2. **ReverieButton** - Used in 10+ components
3. **ReverieCard** - Used in 6+ components
4. **DataCard** - Used in dashboard and insights

### Least Used Components
1. **ComfortOrb** - Only in atmosphere mode
2. **StorytellingMomentScreen** - Special context only
3. **SuccessCheckmark** - Confirmation states only

### Component Combinations

**Dashboard Quick Actions:**
```tsx
<DashboardCard>
  <PixelIcon />
  <ReverieButton />
</DashboardCard>
```

**Atmosphere Selection:**
```tsx
<ReverieCard variant="glass">
  <AtmosphereTile>
    <PixelIcon />
  </AtmosphereTile>
</ReverieCard>
```

**Insights Metrics:**
```tsx
<ReverieCard variant="solid">
  <DataCard>
    <PixelIcon />
  </DataCard>
</ReverieCard>
```

---

## 📚 Quick Component Finder

**Need a button?** → ReverieButton
**Need a container?** → ReverieCard
**Need a metric display?** → DataCard
**Need an icon?** → PixelIcon
**Need a slider?** → ReverieSlider
**Need navigation?** → BottomNav
**Need a loading state?** → LoadingSpinner
**Need atmosphere selection?** → AtmosphereTile or AtmosphereCard
**Need a background?** → GhibliBackground
**Need an illustration?** → EnvironmentIllustrations

---

**Component Inventory Last Updated:** March 9, 2026  
**Total Components Documented:** 27