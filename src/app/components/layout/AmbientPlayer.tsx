import { Play, Pause, Volume2, VolumeX, Repeat, Music } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAmbient } from '../../AmbientPlayerContext';

export default function AmbientPlayer() {
  const { track, playing, volume, loop, play, pause, setVolume, toggleLoop } = useAmbient();
  const navigate = useNavigate();

  if (!track) {
    return (
      <div
        style={{
          background: 'var(--rv-bg-card)',
          border: '1px solid var(--rv-border)',
          borderRadius: '1rem',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onClick={() => navigate('/profile')}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--rv-bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--rv-bg-card)')}
      >
        <Music size={14} style={{ color: 'var(--rv-text-muted)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--rv-text-muted)', lineHeight: 1.3 }}>
          Choose a calming track →
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--rv-bg-card)',
        border: '1px solid var(--rv-border)',
        borderRadius: '1rem',
        padding: '0.75rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {/* Track name + play/pause */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={playing ? pause : play}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: playing ? '#6A7FDB' : 'var(--rv-bg-hover)',
            color: playing ? '#fff' : 'var(--rv-text-muted)',
            transition: 'background 0.15s, color 0.15s',
          }}
          title={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
        </button>

        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--rv-text-secondary)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            flex: 1,
          }}
          title={track.name}
        >
          {track.name}
        </span>

        <button
          onClick={toggleLoop}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            color: loop ? '#6A7FDB' : 'var(--rv-text-muted)',
            transition: 'color 0.15s',
          }}
          title={loop ? 'Loop on' : 'Loop off'}
        >
          <Repeat size={12} />
        </button>
      </div>

      {/* Volume row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'var(--rv-text-muted)' }}
          title={volume === 0 ? 'Unmute' : 'Mute'}
        >
          {volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{
            flex: 1,
            height: 3,
            accentColor: '#6A7FDB',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
