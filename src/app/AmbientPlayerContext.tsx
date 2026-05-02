import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth, type BackgroundMusic } from './AuthContext';

export type Track = BackgroundMusic;

interface AmbientContextValue {
  track: Track | null;
  playing: boolean;
  volume: number;     // 0–1
  loop: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setTrack: (track: Track) => void;
  clearTrack: () => void;
  setVolume: (v: number) => void;
  toggleLoop: () => void;
}

const AmbientContext = createContext<AmbientContextValue>({
  track: null, playing: false, volume: 0.5, loop: true,
  play: () => {}, pause: () => {}, stop: () => {},
  setTrack: () => {}, clearTrack: () => {}, setVolume: () => {}, toggleLoop: () => {},
});

export const useAmbient = () => useContext(AmbientContext);

// localStorage keys
const LS_TRACK  = 'rv-ambient-track';
const LS_VOL    = 'rv-ambient-vol';
const LS_LOOP   = 'rv-ambient-loop';

export function AmbientPlayerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Restore track from localStorage; fall back to user.backgroundMusic from the server
  const [track, setTrackState] = useState<Track | null>(() => {
    try {
      const saved = localStorage.getItem(LS_TRACK);
      if (saved) return JSON.parse(saved) as Track;
    } catch { /* ignore corrupt localStorage */ }
    return null;
  });

  const [playing, setPlaying] = useState(false);

  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem(LS_VOL);
    return saved !== null ? parseFloat(saved) : 0.5;
  });

  const [loop, setLoopState] = useState<boolean>(() => {
    const saved = localStorage.getItem(LS_LOOP);
    return saved !== null ? saved === 'true' : true;
  });

  // The actual HTML5 Audio element lives here for the component's lifetime
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // Sync volume and loop to the audio element whenever they change
  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.loop   = loop;
  }, [volume, loop]);

  // When the track changes, load the new source into the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (track?.url) {
      audio.src = track.url;
      audio.load();
    } else {
      audio.pause();
      audio.src = '';
      setPlaying(false);
    }
  }, [track]);

  // If no track in localStorage but the user has a saved preference on the server,
  // use that as the initial track (happens after login on a fresh device).
  useEffect(() => {
    if (user?.backgroundMusic && !localStorage.getItem(LS_TRACK)) {
      setTrackState(user.backgroundMusic);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.backgroundMusic?.url]);

  // Clean up audio when this provider unmounts (user logs out → AppShell unmounts)
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, []);

  const play = () => {
    if (!track?.url) return;
    audioRef.current.play()
      .then(() => setPlaying(true))
      .catch(() => { /* browser may block autoplay — user must interact first */ });
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlaying(false);
  };

  const setTrack = (newTrack: Track) => {
    setTrackState(newTrack);
    localStorage.setItem(LS_TRACK, JSON.stringify(newTrack));
  };

  const clearTrack = () => {
    setTrackState(null);
    localStorage.removeItem(LS_TRACK);
    stop();
  };

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    audioRef.current.volume = clamped;
    localStorage.setItem(LS_VOL, String(clamped));
  };

  const toggleLoop = () => {
    const next = !loop;
    setLoopState(next);
    audioRef.current.loop = next;
    localStorage.setItem(LS_LOOP, String(next));
  };

  return (
    <AmbientContext.Provider value={{
      track, playing, volume, loop,
      play, pause, stop, setTrack, clearTrack, setVolume, toggleLoop,
    }}>
      {children}
    </AmbientContext.Provider>
  );
}
