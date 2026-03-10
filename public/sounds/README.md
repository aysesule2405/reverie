# Reverie Atmosphere Sounds

This directory contains audio files for the Reverie atmosphere experiences.

## Directory Structure

```
/public/sounds/
├── spring-window/
│   ├── ambient.mp3
│   ├── wind-soft.mp3
│   └── birds-distant.mp3
├── early-internet/
│   ├── ambient.mp3
│   ├── computer-hum.mp3
│   ├── keyboard-typing.mp3
│   └── mouse-clicks.mp3
├── childhood-bedroom/
│   ├── ambient.mp3
│   ├── evening-outside.mp3
│   └── distant-voices.mp3
├── library-corner/
│   ├── ambient.mp3
│   ├── page-turning.mp3
│   ├── footsteps-distant.mp3
│   └── lamp-hum.mp3
└── nature-meadow/
    ├── ambient.mp3
    ├── wind-light.mp3
    ├── grass-rustle.mp3
    └── birds.mp3
```

## Adding Your Sound Files

1. **Create subdirectories** for each atmosphere (e.g., `spring-window/`, `early-internet/`)
2. **Add your audio files** in MP3 or OGG format
3. **Name them** according to the configuration in `/src/app/components/reverie/atmosphereSounds.ts`
4. **Test** by opening the Atmosphere Mode screen

## Audio Specifications

- **Format**: MP3 (128-192 kbps) or OGG Vorbis
- **Duration**: 30 seconds - 5 minutes for looping ambient sounds
- **Loop-ready**: Ensure ambient tracks have seamless loops
- **Volume normalization**: -14 to -18 LUFS for consistency

## Free Sound Resources

### 1. Freesound.org
- URL: https://freesound.org/
- Best for: Ambient textures, nature sounds, room tones
- License: Filter by CC0 (Creative Commons Zero) for no attribution

### 2. YouTube Audio Library
- URL: https://studio.youtube.com/
- Best for: Background music and general sound effects
- License: No attribution required

### 3. Zapsplat
- URL: https://www.zapsplat.com/
- Best for: Keyboard typing, computer sounds, everyday objects
- License: Free with attribution

### 4. BBC Sound Effects
- URL: https://sound-effects.bbcrewind.co.uk/
- Best for: High-quality professional sound effects
- License: Free for personal, educational, research use

### 5. Incompetech
- URL: https://incompetech.com/
- Best for: Royalty-free ambient music
- License: Creative Commons with attribution

## Suggested Search Terms

### Spring Evening Window
- "spring evening birds"
- "gentle breeze wind"
- "suburban evening ambience"
- "distant traffic soft"

### Early Internet Room
- "computer fan hum"
- "mechanical keyboard typing"
- "hard drive spinning"
- "room tone quiet"
- "CRT monitor hum"

### Childhood Bedroom at Sunset
- "bedroom evening ambience"
- "distant children playing"
- "suburban neighborhood dusk"
- "ceiling fan hum"

### Quiet Library Corner
- "library quiet ambience"
- "page turning soft"
- "distant footsteps indoor"
- "fluorescent light hum"
- "book shelf quiet"

### Nature Meadow Afternoon
- "meadow field ambience"
- "grass wind rustle"
- "afternoon birds chirping"
- "light breeze nature"
- "countryside peaceful"

## Tips for Seamless Loops

1. **Use audio editing software** (Audacity is free) to create perfect loops
2. **Fade in/out** at loop points to avoid clicks
3. **Match waveforms** at start and end points
4. **Test in browser** before finalizing

## Example Usage in Code

See `/src/app/components/reverie/atmosphereSounds.ts` for the complete configuration and helper functions.

```typescript
import { getAtmosphereSounds } from './atmosphereSounds';

const sounds = getAtmosphereSounds('spring-window');
sounds.forEach(sound => {
  const audio = new Audio(sound.path);
  audio.loop = sound.loop;
  audio.volume = sound.volume / 100;
  audio.play();
});
```
