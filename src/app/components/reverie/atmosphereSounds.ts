/**
 * Reverie Atmosphere Sounds Configuration
 * 
 * HOW TO USE:
 * 1. Add your audio files to the /public/sounds directory
 * 2. Update the paths below to reference your audio files
 * 3. Use the getAtmosphereSounds() function to access sounds in components
 * 
 * RECOMMENDED AUDIO FORMAT:
 * - Format: MP3 or OGG for browser compatibility
 * - Bitrate: 128-192 kbps for ambient sounds
 * - Loop-ready: Ensure ambient tracks loop seamlessly
 * 
 * DIRECTORY STRUCTURE:
 * /public/sounds/
 *   ├── spring-window/
 *   │   ├── Wind Chimes by the Window.mp3
 *   ├── early-internet/
 *   │   ├── TV News Channel in Background.mp3
 *   ├── childhood-bedroom/
 *   │   ├── Birds Chirping.mp3
 *   ├── library-corner/
 *   │   ├── Calmness (library ambience).mp3
 *   └── nature-meadow/
 *       ├── Crickets Sounds.mp3
 */

export interface SoundFile {
  name: string;
  path: string;
  volume: number; // 0-100
  loop: boolean;
  type: 'ambient' | 'effect' | 'background';
}

export interface AtmosphereSounds {
  id: string;
  name: string;
  sounds: SoundFile[];
}

/**
 * Sound configuration for each atmosphere
 * Replace placeholder paths with your actual audio file paths
 */
export const atmosphereSounds: AtmosphereSounds[] = [
  {
    id: 'spring-window',
    name: 'Spring Evening Window',
    sounds: [
      {
        name: 'Wind Chimes',
        path: '/sounds/spring-window/Wind Chimes by the Window.mp3',
        volume: 70,
        loop: true,
        type: 'ambient'
      }
    ]
  },
  {
    id: 'early-internet',
    name: 'Early Internet Room',
    sounds: [
      {
        name: 'TV News Background',
        path: '/sounds/early-internet/TV News Channel in Background.mp3',
        volume: 55,
        loop: true,
        type: 'ambient'
      }
    ]
  },
  {
    id: 'childhood-bedroom',
    name: 'Childhood Bedroom at Sunset',
    sounds: [
      {
        name: 'Birds Chirping',
        path: '/sounds/childhood-bedroom/Birds Chirping.mp3',
        volume: 60,
        loop: true,
        type: 'ambient'
      }
    ]
  },
  {
    id: 'library-corner',
    name: 'Quiet Library Corner',
    sounds: [
      {
        name: 'Library Ambience',
        path: '/sounds/library-corner/Calmness (library ambience).mp3',
        volume: 65,
        loop: true,
        type: 'ambient'
      }
    ]
  },
  {
    id: 'nature-meadow',
    name: 'Nature Meadow Afternoon',
    sounds: [
      {
        name: 'Crickets',
        path: '/sounds/nature-meadow/Crickets Sounds.mp3',
        volume: 70,
        loop: true,
        type: 'ambient'
      }
    ]
  }
];

/**
 * Get all sounds for a specific atmosphere
 */
export function getAtmosphereSounds(atmosphereId: string): SoundFile[] {
  const atmosphere = atmosphereSounds.find(a => a.id === atmosphereId);
  return atmosphere?.sounds || [];
}

/**
 * Get a specific sound by atmosphere ID and sound name
 */
export function getSound(atmosphereId: string, soundName: string): SoundFile | undefined {
  const sounds = getAtmosphereSounds(atmosphereId);
  return sounds.find(s => s.name === soundName);
}

/**
 * Get all ambient sounds for an atmosphere
 */
export function getAmbientSounds(atmosphereId: string): SoundFile[] {
  return getAtmosphereSounds(atmosphereId).filter(s => s.type === 'ambient');
}

/**
 * Get all background sounds for an atmosphere
 */
export function getBackgroundSounds(atmosphereId: string): SoundFile[] {
  return getAtmosphereSounds(atmosphereId).filter(s => s.type === 'background');
}

/**
 * Get all effect sounds for an atmosphere
 */
export function getEffectSounds(atmosphereId: string): SoundFile[] {
  return getAtmosphereSounds(atmosphereId).filter(s => s.type === 'effect');
}

/**
 * FREE SOUND RESOURCES (Royalty-free ambient sounds):
 * 
 * 1. Freesound.org - https://freesound.org/
 *    - Great for ambient textures, nature sounds, room tones
 *    - Filter by: Creative Commons 0 (CC0) for no attribution needed
 * 
 * 2. YouTube Audio Library - https://studio.youtube.com/
 *    - Free background music and sound effects
 *    - Download as MP3
 * 
 * 3. Zapsplat - https://www.zapsplat.com/
 *    - Free sound effects with attribution
 *    - Good for keyboard typing, computer sounds
 * 
 * 4. BBC Sound Effects - https://sound-effects.bbcrewind.co.uk/
 *    - 16,000+ BBC sound effects
 *    - Free for personal, educational, research use
 * 
 * 5. Incompetech - https://incompetech.com/
 *    - Royalty-free ambient music
 *    - Creative Commons attribution
 * 
 * SUGGESTED SEARCH TERMS:
 * - "room tone ambient"
 * - "spring evening birds"
 * - "computer fan hum"
 * - "mechanical keyboard typing"
 * - "wind gentle breeze"
 * - "library quiet ambience"
 * - "meadow nature afternoon"
 * - "childhood suburban evening"
 * 
 * EXAMPLE IMPLEMENTATION:
 * 
 * import { getAtmosphereSounds } from './atmosphereSounds';
 * 
 * const sounds = getAtmosphereSounds('spring-window');
 * sounds.forEach(sound => {
 *   const audio = new Audio(sound.path);
 *   audio.loop = sound.loop;
 *   audio.volume = sound.volume / 100;
 *   audio.play();
 * });
 */