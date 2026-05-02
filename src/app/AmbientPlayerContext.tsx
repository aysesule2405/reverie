import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth, type PlaylistTrack } from './AuthContext';

export type Track = PlaylistTrack;

interface AmbientContextValue {
  track: Track | null;
  playing: boolean;
  volume: number;
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

const LS_TRACK = 'rv-ambient-track';
const LS_VOL   = 'rv-ambient-vol';
const LS_LOOP  = 'rv-ambient-loop';

export function AmbientPlayerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [track, setTrackState] = useState<Track | null>(() => {
    try {
      const saved = localStorage.getItem(LS_TRACK);
      if (saved) return JSON.parse(saved) as Track;
    } catch { /* ignore */ }
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

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.loop   = loop;
  }, [volume, loop]);

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

  // Fall back to server's activeBackgroundTrack on fresh login (no localStorage track)
  useEffect(() => {
    if (user?.activeBackgroundTrack?.url && !localStorage.getItem(LS_TRACK)) {
      setTrackState(user.activeBackgroundTrack);
    }
    // Sync volume/loop from server when no local preference exists
    if (user?.musicSettings) {
      if (!localStorage.getItem(LS_VOL)) {
        setVolumeState(user.musicSettings.volume);
        audioRef.current.volume = user.musicSettings.volume;
      }
      if (!localStorage.getItem(LS_LOOP)) {
        setLoopState(user.musicSettings.loop);
        audioRef.current.loop = user.musicSettings.loop;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.activeBackgroundTrack?.url]);

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
      .catch(() => { /* autoplay blocked — user must interact first */ });
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
