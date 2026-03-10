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
export default audioManager;