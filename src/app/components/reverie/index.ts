/**
 * Reverie Component Library
 * Barrel export file for clean imports
 */

// ========================================
// SCREENS - Full-page components
// ========================================

// Authentication & Setup
export { AuthScreen } from './AuthScreen';
export { ProfileSetupScreen } from './ProfileSetupScreen';
export type { UserProfile } from './ProfileSetupScreen';

// Onboarding
export { LandingScreen } from './LandingScreen';
export { OnboardingScreen } from './OnboardingScreen';

// Main App Screens (with bottom navigation)
export { DashboardScreen } from './DashboardScreen';
export { InsightsScreen } from './InsightsScreen';
export { TrustSafetyScreen } from './TrustSafetyScreen';

// Atmosphere Experience
export { MemoryAtmospheresScreen } from './MemoryAtmospheresScreen';
export { AtmosphereModeScreen } from './AtmosphereModeScreen';
export { ActiveAtmosphereScreen } from './ActiveAtmosphereScreen';

// Special Context Screens
export { ScenarioScreen } from './ScenarioScreen';
export { StorytellingMomentScreen } from './StorytellingMomentScreen';

// ========================================
// UI COMPONENTS - Reusable building blocks
// ========================================

// Buttons
export { ReverieButton } from './ReverieButton';

// Cards
export { ReverieCard } from './ReverieCard';
export { DataCard } from './DataCard';
export { AtmosphereCard } from './AtmosphereCard';
export { DashboardCard } from './DashboardCard';
export { EnvironmentCard } from './EnvironmentCard';

// Navigation
export { BottomNav } from './BottomNav';

// Inputs
export { ReverieSlider } from './ReverieSlider';

// Feedback
export { LoadingSpinner } from './LoadingSpinner';
export { SuccessCheckmark } from './SuccessCheckmark';

// Tiles
export { AtmosphereTile } from './AtmosphereTile';

// ========================================
// SHARED - Utilities & visual elements
// ========================================

// Icons
export { PixelIcon } from './PixelIcon';

// Illustrations
export { GhibliBackground } from './GhibliBackground';
export {
  BedroomIllustration,
  InternetIllustration,
  LibraryIllustration,
  NatureIllustration,
  AfterSchoolIllustration,
  MusicIllustration,
} from './EnvironmentIllustrations';
export { ComfortOrb } from './ComfortOrb';
export { AtmosphericParticles } from './AtmosphericParticles';
export { SunlightGlow } from './SunlightGlow';

// Audio
export { atmosphereSounds, getAtmosphereSounds, getSound, getAmbientSounds, getBackgroundSounds, getEffectSounds } from './atmosphereSounds';
export type { AtmosphereSounds, SoundFile } from './atmosphereSounds';