import React, { useState, useEffect, useRef } from 'react';
import { useAuth, type PlaylistTrack } from '../AuthContext';
import { useAmbient } from '../AmbientPlayerContext';
import { api } from '../../api/client';
import {
  Music, Upload, Link as LinkIcon, Volume2, VolumeX,
  Repeat, Play, Pause, Trash2, CheckCircle2,
} from 'lucide-react';

const DEFAULT_TRACKS: Omit<PlaylistTrack, '_id'>[] = [
  { name: 'Soft Rain',      type: 'default', url: '/audio/defaults/soft-rain.mp3' },
  { name: 'Ocean Waves',    type: 'default', url: '/audio/defaults/ocean-waves.mp3' },
  { name: 'Forest Morning', type: 'default', url: '/audio/defaults/forest-morning.mp3' },
  { name: 'Gentle Piano',   type: 'default', url: '/audio/defaults/gentle-piano.mp3' },
  { name: 'Night Ambience', type: 'default', url: '/audio/defaults/night-ambience.mp3' },
  { name: 'Lo-fi Calm',     type: 'default', url: '/audio/defaults/lofi-calm.mp3' },
  { name: 'White Noise',    type: 'default', url: '/audio/defaults/white-noise.mp3' },
  { name: 'Fireplace Glow', type: 'default', url: '/audio/defaults/fireplace-glow.mp3' },
];

export default function Profile() {
  const { user, updateProfile, refreshUser } = useAuth();
  const { setTrack, clearTrack, setVolume: setAmbientVolume, toggleLoop, track: ambientTrack, volume: ambientVolume, loop: ambientLoop } = useAmbient();

  // ── Profile state ──
  const [name, setName] = useState(user?.name || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // ── Photo state ──
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoMsg, setPhotoMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // ── Music playlist state ──
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>(user?.backgroundMusicPlaylist || []);
  const [activeTrackId, setActiveTrackId] = useState<string | null | undefined>(
    user?.activeBackgroundTrack?._id ?? null
  );
  const [musicVolume, setMusicVolume] = useState(user?.musicSettings?.volume ?? ambientVolume);
  const [musicLoop, setMusicLoop] = useState(user?.musicSettings?.loop ?? ambientLoop);
  const [musicUploading, setMusicUploading] = useState(false);
  const [musicLinkName, setMusicLinkName] = useState('');
  const [musicLinkUrl, setMusicLinkUrl] = useState('');
  const [musicMsg, setMusicMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);

  const [spaceCount, setSpaceCount] = useState<number | null>(null);

  useEffect(() => {
    setName(user?.name || '');
    if (user?.backgroundMusicPlaylist) setPlaylist(user.backgroundMusicPlaylist);
    if (user?.activeBackgroundTrack?._id) setActiveTrackId(user.activeBackgroundTrack._id);
    if (user?.musicSettings?.volume !== undefined) setMusicVolume(user.musicSettings.volume);
    if (user?.musicSettings?.loop !== undefined) setMusicLoop(user.musicSettings.loop);
  }, [user]);

  useEffect(() => {
    api.get('/atmospheres?mine=true')
      .then((d: unknown[]) => setSpaceCount(d.length))
      .catch(() => {});
  }, []);

  const flash = (setter: React.Dispatch<React.SetStateAction<{type:'ok'|'err';text:string}|null>>, type: 'ok'|'err', text: string) => {
    setter({ type, text });
    setTimeout(() => setter(null), 3500);
  };

  // ── Profile save ──
  const handleProfileSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) return flash(setProfileMsg, 'err', 'Name is required.');
    setProfileSaving(true);
    try {
      await updateProfile({ name: name.trim() });
      flash(setProfileMsg, 'ok', 'Profile updated.');
    } catch (e: any) {
      flash(setProfileMsg, 'err', e.message || 'Could not save.');
    } finally { setProfileSaving(false); }
  };

  // ── Photo upload ──
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    setPhotoUploading(true);
    try {
      const form = new FormData();
      form.append('photo', photoFile);
      await api.postForm('/profile/photo', form);
      await refreshUser();
      setPhotoFile(null);
      setPhotoPreview(null);
      flash(setPhotoMsg, 'ok', 'Photo updated.');
    } catch (e: any) {
      flash(setPhotoMsg, 'err', e.message || 'Upload failed.');
    } finally { setPhotoUploading(false); }
  };

  // ── Add default track to playlist ──
  const handleAddDefault = async (t: Omit<PlaylistTrack, '_id'>) => {
    if (playlist.some((p) => p.url === t.url)) return; // already in playlist
    try {
      const res = await api.post('/profile/music/link', { name: t.name, url: t.url, type: 'default' });
      setPlaylist(res.playlist);
    } catch (e: any) {
      flash(setMusicMsg, 'err', e.message || 'Could not add track.');
    }
  };

  // ── Upload audio file ──
  const handleMusicFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMusicUploading(true);
    try {
      const form = new FormData();
      form.append('music', file);
      const res = await api.postForm('/profile/music/upload', form);
      setPlaylist(res.playlist);
      flash(setMusicMsg, 'ok', `"${res.track.name}" added to playlist.`);
    } catch (e: any) {
      flash(setMusicMsg, 'err', e.message || 'Upload failed.');
    } finally {
      setMusicUploading(false);
      if (musicInputRef.current) musicInputRef.current.value = '';
    }
  };

  // ── Add external link ──
  const handleAddLink = async () => {
    if (!musicLinkUrl.trim()) return;
    try {
      const res = await api.post('/profile/music/link', {
        name: musicLinkName.trim() || musicLinkUrl,
        url:  musicLinkUrl.trim(),
        type: 'external',
      });
      setPlaylist(res.playlist);
      setMusicLinkName('');
      setMusicLinkUrl('');
      flash(setMusicMsg, 'ok', 'Track added to playlist.');
    } catch (e: any) {
      flash(setMusicMsg, 'err', e.message || 'Could not add track.');
    }
  };

  // ── Set active track ──
  const handleSetActive = async (trackId: string) => {
    const newId = activeTrackId === trackId ? null : trackId;
    try {
      const res = await api.put('/profile/music/active', { trackId: newId });
      const newActive = res.activeTrack;
      setActiveTrackId(newActive?._id ?? null);
      if (newActive?.url) {
        setTrack(newActive);
      } else {
        clearTrack();
      }
    } catch (e: any) {
      flash(setMusicMsg, 'err', e.message || 'Could not update active track.');
    }
  };

  // ── Delete playlist track ──
  const handleDeleteTrack = async (trackId: string) => {
    try {
      const res = await api.del(`/profile/music/${trackId}`);
      setPlaylist(res.playlist);
      if (activeTrackId === trackId) {
        setActiveTrackId(null);
        clearTrack();
      }
    } catch (e: any) {
      flash(setMusicMsg, 'err', e.message || 'Could not delete track.');
    }
  };

  // ── Save settings ──
  const handleSaveSettings = async () => {
    try {
      await api.put('/profile/music/settings', { volume: musicVolume, loop: musicLoop });
      setAmbientVolume(musicVolume);
      if (ambientLoop !== musicLoop) toggleLoop();
      flash(setMusicMsg, 'ok', 'Playback settings saved.');
    } catch (e: any) {
      flash(setMusicMsg, 'err', e.message || 'Could not save settings.');
    }
  };

  const avatarSrc = photoPreview || user?.avatarUrl || null;

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-10 py-8">
      <h1 className="font-heading font-semibold text-2xl mb-1" style={{ color: 'var(--rv-text)' }}>
        Profile &amp; Settings
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--rv-text-secondary)' }}>
        Manage your Reverie account.
      </p>

      {/* ── Account overview ── */}
      <Card className="mb-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}>
            {avatarSrc
              ? <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
              : (name || user?.name || 'U').charAt(0).toUpperCase()
            }
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl" style={{ color: 'var(--rv-text)' }}>{user?.name}</h2>
            <p className="text-sm" style={{ color: 'var(--rv-text-secondary)' }}>{user?.email}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--rv-text-tertiary)' }}>
              {spaceCount !== null ? `${spaceCount} mood space${spaceCount !== 1 ? 's' : ''}` : ''}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 py-5"
          style={{ borderTop: '1px solid var(--rv-border-divider)', borderBottom: '1px solid var(--rv-border-divider)' }}>
          <Stat label="Mood Spaces" value={spaceCount !== null ? String(spaceCount) : '–'} />
          <Stat label="Playlist" value={String(playlist.length)} />
          <Stat label="Plan" value="Free" />
        </div>
      </Card>

      {/* ── Edit Profile ── */}
      <Card className="mb-6">
        <SectionTitle>Edit Profile</SectionTitle>
        {profileMsg && <MsgBanner type={profileMsg.type} text={profileMsg.text} />}
        <form onSubmit={handleProfileSave} className="space-y-5">
          <Field label="Display Name">
            <StyledInput value={name} onChange={(v) => setName(v)} placeholder="Your name" />
          </Field>
          <Field label="Email Address">
            <input type="email" value={user?.email || ''} disabled
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={{ background: 'var(--rv-disabled-bg)', border: '1.5px solid var(--rv-border)', color: 'var(--rv-disabled-text)', cursor: 'not-allowed' }} />
          </Field>
          <PrimaryBtn type="submit" disabled={profileSaving}>
            {profileSaving ? 'Saving…' : 'Save Profile'}
          </PrimaryBtn>
        </form>
      </Card>

      {/* ── Profile Photo ── */}
      <Card className="mb-6">
        <SectionTitle>Profile Photo</SectionTitle>
        {photoMsg && <MsgBanner type={photoMsg.type} text={photoMsg.text} />}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-semibold flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}>
            {avatarSrc
              ? <img src={avatarSrc} alt="Preview" className="w-full h-full object-cover" />
              : (name || user?.name || 'U').charAt(0).toUpperCase()
            }
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
            <GhostBtn onClick={() => photoInputRef.current?.click()}>
              <Upload size={14} /> {photoFile ? photoFile.name : 'Choose a photo…'}
            </GhostBtn>
            {photoFile && (
              <PrimaryBtn onClick={handlePhotoUpload} disabled={photoUploading}>
                {photoUploading ? 'Uploading…' : 'Upload Photo'}
              </PrimaryBtn>
            )}
            <p className="text-xs" style={{ color: 'var(--rv-text-tertiary)' }}>JPG, PNG or WebP · max 5 MB</p>
          </div>
        </div>
      </Card>

      {/* ── Background Music Playlist ── */}
      <Card className="mb-6">
        <SectionTitle>Background Music Playlist</SectionTitle>
        <p className="text-xs mb-5" style={{ color: 'var(--rv-text-tertiary)' }}>
          Build a personal playlist of calming tracks. Click a track to set it as the active background ambience.
        </p>

        {musicMsg && <MsgBanner type={musicMsg.type} text={musicMsg.text} />}

        {/* Default tracks */}
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--rv-text-muted)' }}>Default tracks</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {DEFAULT_TRACKS.map((t) => {
            const inPlaylist = playlist.some((p) => p.url === t.url);
            return (
              <button key={t.url} onClick={() => handleAddDefault(t)}
                disabled={inPlaylist}
                className="px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex items-center gap-1.5"
                style={inPlaylist
                  ? { background: 'var(--rv-tag)', color: '#6A7FDB', border: '1.5px solid rgba(106,127,219,0.3)', cursor: 'default', opacity: 0.7 }
                  : { background: 'var(--rv-input)', color: 'var(--rv-text-secondary)', border: '1.5px solid var(--rv-border-input)' }
                }
                title={inPlaylist ? 'Already in playlist' : 'Add to playlist'}
              >
                <Music size={11} />
                <span className="truncate">{t.name}</span>
                {inPlaylist && <CheckCircle2 size={10} style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>

        {/* Upload file */}
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--rv-text-muted)' }}>Upload audio file</p>
        <div className="mb-5">
          <input ref={musicInputRef} type="file" accept="audio/*" className="hidden" onChange={handleMusicFileSelect} />
          <GhostBtn onClick={() => musicInputRef.current?.click()} disabled={musicUploading}>
            <Upload size={14} /> {musicUploading ? 'Uploading…' : 'Choose audio file…'}
          </GhostBtn>
          <p className="text-xs mt-1.5" style={{ color: 'var(--rv-text-tertiary)' }}>MP3, WAV, OGG, M4A · max 20 MB</p>
        </div>

        {/* External link */}
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--rv-text-muted)' }}>Add external URL</p>
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <StyledInput value={musicLinkName} onChange={setMusicLinkName} placeholder="Track name (optional)" />
          <input type="url" value={musicLinkUrl} onChange={(e) => setMusicLinkUrl(e.target.value)}
            placeholder="https://…" className="flex-[2] px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
            onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddLink(); } }}
          />
          <GhostBtn onClick={handleAddLink} disabled={!musicLinkUrl.trim()}>
            <LinkIcon size={13} /> Add
          </GhostBtn>
        </div>

        {/* Playlist items */}
        {playlist.length > 0 ? (
          <>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--rv-text-muted)' }}>
              Your playlist · {playlist.length} track{playlist.length !== 1 ? 's' : ''}
            </p>
            <ul className="space-y-2 mb-6">
              {playlist.map((t) => {
                const isActive = activeTrackId === t._id;
                const isPlaying = ambientTrack?.url === t.url;
                return (
                  <li key={t._id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? 'rgba(106,127,219,0.1)' : 'var(--rv-user-card)',
                      border: isActive ? '1.5px solid rgba(106,127,219,0.4)' : '1px solid var(--rv-border)',
                    }}>
                    {/* Set active button */}
                    <button onClick={() => handleSetActive(t._id!)}
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: isActive ? '#6A7FDB' : 'var(--rv-bg-hover)', color: isActive ? '#fff' : 'var(--rv-text-muted)' }}
                      title={isActive ? 'Active track — click to deactivate' : 'Set as active track'}
                    >
                      {isPlaying
                        ? <Pause size={12} fill="currentColor" />
                        : <Play size={12} fill="currentColor" />
                      }
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate font-medium" style={{ color: isActive ? '#6A7FDB' : 'var(--rv-text)' }}>
                        {t.name}
                      </p>
                      <p className="text-xs capitalize" style={{ color: 'var(--rv-text-muted)' }}>{t.type}</p>
                    </div>

                    {isActive && (
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(106,127,219,0.2)', color: '#6A7FDB' }}>
                        Active
                      </span>
                    )}

                    <button onClick={() => handleDeleteTrack(t._id!)}
                      className="flex-shrink-0 p-1.5 rounded-lg transition-all hover:opacity-60"
                      style={{ color: 'var(--rv-danger)' }}
                      title="Remove from playlist">
                      <Trash2 size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="py-6 text-center rounded-xl mb-6"
            style={{ background: 'var(--rv-tag)', border: '1px dashed rgba(169,184,255,0.4)' }}>
            <Music size={24} style={{ color: '#A9B8FF', margin: '0 auto 8px' }} />
            <p className="text-sm" style={{ color: 'var(--rv-text-muted)' }}>
              No tracks yet — add some above.
            </p>
          </div>
        )}

        {/* Volume & loop */}
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--rv-text-muted)' }}>Playback settings</p>
        <div className="flex items-center gap-4 mb-4">
          <button type="button" onClick={() => setMusicVolume(musicVolume === 0 ? 0.5 : 0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rv-text-muted)', padding: 0, flexShrink: 0 }}>
            {musicVolume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input type="range" min={0} max={1} step={0.01} value={musicVolume}
            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
            className="flex-1" style={{ accentColor: '#6A7FDB', height: 4, cursor: 'pointer' }} />
          <span className="text-xs w-8 text-right" style={{ color: 'var(--rv-text-muted)' }}>
            {Math.round(musicVolume * 100)}%
          </span>
          <button type="button" onClick={() => setMusicLoop(!musicLoop)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
            style={musicLoop
              ? { background: 'rgba(106,127,219,0.15)', color: '#6A7FDB', border: '1px solid rgba(106,127,219,0.3)' }
              : { background: 'var(--rv-input)', color: 'var(--rv-text-muted)', border: '1.5px solid var(--rv-border-input)' }
            }>
            <Repeat size={12} /> Loop
          </button>
        </div>
        <PrimaryBtn onClick={handleSaveSettings}>Save Settings</PrimaryBtn>
      </Card>

      {/* ── About ── */}
      <Card>
        <SectionTitle>About Reverie</SectionTitle>
        <div className="space-y-3 text-sm">
          <InfoRow label="Version" value="1.0.0" />
          <InfoRow label="Data storage" value="MongoDB Atlas (encrypted)" />
          <InfoRow label="Authentication" value="JWT — expires in 7 days" />
          <InfoRow label="Visibility default" value="Private — only you see your spaces" />
        </div>
      </Card>
    </div>
  );
}

// ── Shared UI components ──────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-6 ${className}`}
      style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#A9B8FF' }}>
      {children}
    </h3>
  );
}

function MsgBanner({ type, text }: { type: 'ok' | 'err'; text: string }) {
  return (
    <div className="px-4 py-3 rounded-xl text-sm mb-5"
      style={{
        background: type === 'ok' ? 'var(--rv-success-bg)' : 'var(--rv-error-bg)',
        color:      type === 'ok' ? 'var(--rv-success)'    : 'var(--rv-error)',
        border: `1px solid ${type === 'ok' ? 'var(--rv-success-border)' : 'var(--rv-error-border)'}`,
      }}>
      {text}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>{label}</label>
      {children}
    </div>
  );
}

function StyledInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
      onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }} />
  );
}

function PrimaryBtn({ children, onClick, type = 'button', disabled = false }:
  { children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
      style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, disabled = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
      style={{ border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text-secondary)', background: 'var(--rv-input)' }}>
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-heading font-semibold text-xl" style={{ color: 'var(--rv-text)' }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--rv-text-tertiary)' }}>{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span style={{ color: 'var(--rv-text-tertiary)', flexShrink: 0 }}>{label}</span>
      <span className="text-right" style={{ color: 'var(--rv-text-soft)' }}>{value}</span>
    </div>
  );
}
