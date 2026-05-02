import React, { useState, useEffect, useRef } from 'react';
import { useAuth, type BackgroundMusic } from '../AuthContext';
import { useAmbient } from '../AmbientPlayerContext';
import { api } from '../../api/client';
import { Music, Upload, Link as LinkIcon, Volume2, VolumeX, Repeat } from 'lucide-react';

const DEFAULT_TRACKS: BackgroundMusic[] = [
  { type: 'default', name: 'Forest Rain',     url: '/audio/defaults/forest-rain.mp3' },
  { type: 'default', name: 'Ocean Waves',     url: '/audio/defaults/ocean-waves.mp3' },
  { type: 'default', name: 'Gentle Stream',   url: '/audio/defaults/gentle-stream.mp3' },
  { type: 'default', name: 'Night Crickets',  url: '/audio/defaults/night-crickets.mp3' },
  { type: 'default', name: 'Soft Piano',      url: '/audio/defaults/soft-piano.mp3' },
  { type: 'default', name: 'Cozy Fireplace',  url: '/audio/defaults/cozy-fireplace.mp3' },
  { type: 'default', name: 'Distant Thunder', url: '/audio/defaults/distant-thunder.mp3' },
  { type: 'default', name: 'Wind in Trees',   url: '/audio/defaults/wind-in-trees.mp3' },
];

export default function Profile() {
  const { user, updateProfile, refreshUser } = useAuth();
  const { setTrack, clearTrack, setVolume: setAmbientVolume, volume: ambientVolume, loop: ambientLoop, toggleLoop } = useAmbient();

  // ── Profile state ──
  const [name, setName] = useState(user?.name || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // ── Photo upload state ──
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const photoInputRef = useRef<HTMLInputElement>(null);

  // ── Music state ──
  const [selectedTrack, setSelectedTrack] = useState<BackgroundMusic | null>(user?.backgroundMusic || null);
  const [musicVolume, setMusicVolume] = useState<number>(user?.musicSettings?.volume ?? ambientVolume);
  const [musicLoop, setMusicLoop] = useState<boolean>(user?.musicSettings?.loop ?? ambientLoop);
  const [externalUrl, setExternalUrl] = useState('');
  const [externalName, setExternalName] = useState('');
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicUploading, setMusicUploading] = useState(false);
  const [musicSaving, setMusicSaving] = useState(false);
  const [musicSuccess, setMusicSuccess] = useState('');
  const [musicError, setMusicError] = useState('');
  const musicInputRef = useRef<HTMLInputElement>(null);

  const [spaceCount, setSpaceCount] = useState<number | null>(null);

  useEffect(() => {
    setName(user?.name || '');
    if (user?.backgroundMusic) setSelectedTrack(user.backgroundMusic);
    if (user?.musicSettings?.volume !== undefined) setMusicVolume(user.musicSettings.volume);
    if (user?.musicSettings?.loop !== undefined) setMusicLoop(user.musicSettings.loop);
  }, [user]);

  useEffect(() => {
    api.get('/atmospheres?mine=true')
      .then((data: unknown[]) => setSpaceCount(data.length))
      .catch(() => {});
  }, []);

  // ── Photo file picker ──
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoError('');
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    setPhotoUploading(true);
    setPhotoError('');
    try {
      const form = new FormData();
      form.append('photo', photoFile);
      await api.postForm('/profile/photo', form);
      await refreshUser();
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (e: any) {
      setPhotoError(e.message || 'Photo upload failed.');
    } finally {
      setPhotoUploading(false);
    }
  };

  // ── Profile save ──
  const handleProfileSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) { setProfileError('Name is required'); return; }
    setProfileError('');
    setProfileSaving(true);
    try {
      await updateProfile({ name: name.trim() });
      setProfileSuccess('Profile updated successfully.');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (e: any) {
      setProfileError(e.message || 'Could not update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  // ── Music file upload ──
  const handleMusicFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMusicFile(file);
    setMusicError('');
  };

  const handleMusicFileUpload = async () => {
    if (!musicFile) return;
    setMusicUploading(true);
    setMusicError('');
    try {
      const form = new FormData();
      form.append('music', musicFile);
      const res = await api.postForm('/profile/music', form);
      setSelectedTrack(res.backgroundMusic);
      setMusicFile(null);
    } catch (e: any) {
      setMusicError(e.message || 'Music upload failed.');
    } finally {
      setMusicUploading(false);
    }
  };

  // ── External URL ──
  const handleAddExternalUrl = () => {
    if (!externalUrl.trim()) return;
    const trackName = externalName.trim() || new URL(externalUrl).hostname;
    setSelectedTrack({ type: 'external', name: trackName, url: externalUrl.trim() });
    setExternalUrl('');
    setExternalName('');
  };

  // ── Save ambience settings ──
  const handleMusicSave = async () => {
    setMusicSaving(true);
    setMusicError('');
    try {
      await updateProfile({
        name: user?.name || name,
        backgroundMusic: selectedTrack ?? undefined,
        musicSettings: { volume: musicVolume, loop: musicLoop },
      });
      // Sync ambient player immediately
      if (selectedTrack) {
        setTrack(selectedTrack);
      } else {
        clearTrack();
      }
      setAmbientVolume(musicVolume);
      if (ambientLoop !== musicLoop) toggleLoop();
      setMusicSuccess('Ambience settings saved.');
      setTimeout(() => setMusicSuccess(''), 3000);
    } catch (e: any) {
      setMusicError(e.message || 'Could not save ambience settings.');
    } finally {
      setMusicSaving(false);
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
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}
          >
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
          <Stat label="Account" value="Active" />
          <Stat label="Plan" value="Free" />
        </div>
      </div>

      {/* ── Edit Profile ── */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#A9B8FF' }}>
          Edit Profile
        </h3>

        {profileSuccess && <Alert type="success" msg={profileSuccess} />}
        {profileError && <Alert type="error" msg={profileError} />}

        <form onSubmit={handleProfileSave} className="space-y-5">
          <Field label="Display Name">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }} />
          </Field>

          <Field label="Email Address">
            <input type="email" value={user?.email || ''} disabled
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={{ background: 'var(--rv-disabled-bg)', border: '1.5px solid var(--rv-border)', color: 'var(--rv-disabled-text)', cursor: 'not-allowed' }} />
            <p className="text-xs mt-1.5" style={{ color: 'var(--rv-text-tertiary)' }}>Email cannot be changed.</p>
          </Field>

          <button type="submit" disabled={profileSaving}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}>
            {profileSaving ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </div>

      {/* ── Photo Upload ── */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#A9B8FF' }}>
          Profile Photo
        </h3>

        {photoError && <Alert type="error" msg={photoError} />}

        <div className="flex items-center gap-5">
          {/* Current / preview avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-semibold flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}
          >
            {avatarSrc
              ? <img src={avatarSrc} alt="Photo preview" className="w-full h-full object-cover" />
              : (name || user?.name || 'U').charAt(0).toUpperCase()
            }
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 self-start"
              style={{ border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text-secondary)', background: 'var(--rv-input)' }}
            >
              <Upload size={14} />
              {photoFile ? photoFile.name : 'Choose a photo…'}
            </button>

            {photoFile && (
              <button
                type="button"
                onClick={handlePhotoUpload}
                disabled={photoUploading}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 self-start"
                style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}
              >
                {photoUploading ? 'Uploading…' : 'Upload Photo'}
              </button>
            )}

            <p className="text-xs" style={{ color: 'var(--rv-text-tertiary)' }}>
              JPG, PNG or WebP · max 5 MB
            </p>
          </div>
        </div>
      </div>

      {/* ── Background Ambience ── */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-1" style={{ color: '#A9B8FF' }}>
          Background Ambience
        </h3>
        <p className="text-xs mb-5" style={{ color: 'var(--rv-text-tertiary)' }}>
          A calming track that plays while you explore Reverie.
        </p>

        {musicSuccess && <Alert type="success" msg={musicSuccess} />}
        {musicError && <Alert type="error" msg={musicError} />}

        {/* Default tracks grid */}
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--rv-text-muted)' }}>Default tracks</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {DEFAULT_TRACKS.map((t) => {
            const active = selectedTrack?.url === t.url;
            return (
              <button
                key={t.url}
                onClick={() => setSelectedTrack(active ? null : t)}
                className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left leading-snug"
                style={active
                  ? { background: 'linear-gradient(135deg, #6A7FDB22, #A9B8FF22)', border: '1.5px solid #6A7FDB', color: '#6A7FDB' }
                  : { background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text-secondary)' }
                }
              >
                <Music size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                {t.name}
              </button>
            );
          })}
        </div>

        {/* Upload a file */}
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--rv-text-muted)' }}>Upload a file</p>
        <div className="flex items-center gap-3 mb-5">
          <input ref={musicInputRef} type="file" accept="audio/*" className="hidden" onChange={handleMusicFileSelect} />
          <button
            type="button"
            onClick={() => musicInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text-secondary)', background: 'var(--rv-input)' }}
          >
            <Upload size={14} />
            {musicFile ? musicFile.name : 'Choose audio…'}
          </button>
          {musicFile && (
            <button
              type="button"
              onClick={handleMusicFileUpload}
              disabled={musicUploading}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}
            >
              {musicUploading ? 'Uploading…' : 'Upload'}
            </button>
          )}
        </div>

        {/* External URL */}
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--rv-text-muted)' }}>Paste an external URL</p>
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={externalName}
            onChange={(e) => setExternalName(e.target.value)}
            placeholder="Track name (optional)"
            className="px-3 py-2.5 rounded-xl text-sm outline-none transition-all flex-1"
            style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
            onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }}
          />
          <input
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="https://…"
            className="px-3 py-2.5 rounded-xl text-sm outline-none transition-all flex-[2]"
            style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
            onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddExternalUrl(); } }}
          />
          <button
            type="button"
            onClick={handleAddExternalUrl}
            disabled={!externalUrl.trim()}
            className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-40 flex items-center gap-1.5 flex-shrink-0"
            style={{ border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text-secondary)', background: 'var(--rv-input)' }}
          >
            <LinkIcon size={13} /> Use
          </button>
        </div>

        {/* Selected track indicator */}
        {selectedTrack && (
          <div className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl"
            style={{ background: 'rgba(106,127,219,0.08)', border: '1px solid rgba(106,127,219,0.2)' }}>
            <Music size={13} style={{ color: '#6A7FDB', flexShrink: 0 }} />
            <span className="text-xs flex-1 truncate" style={{ color: '#6A7FDB' }}>{selectedTrack.name}</span>
            <button
              onClick={() => setSelectedTrack(null)}
              className="text-xs hover:opacity-60 transition-opacity"
              style={{ color: 'var(--rv-text-muted)' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Volume + loop */}
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setMusicVolume(musicVolume === 0 ? 0.5 : 0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rv-text-muted)', padding: 0 }}
          >
            {musicVolume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={musicVolume}
            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
            className="flex-1"
            style={{ accentColor: '#6A7FDB', height: 4, cursor: 'pointer' }}
          />
          <span className="text-xs w-8 text-right" style={{ color: 'var(--rv-text-muted)' }}>
            {Math.round(musicVolume * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setMusicLoop(!musicLoop)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={musicLoop
              ? { background: 'rgba(106,127,219,0.15)', color: '#6A7FDB', border: '1px solid rgba(106,127,219,0.3)' }
              : { background: 'var(--rv-input)', color: 'var(--rv-text-muted)', border: '1.5px solid var(--rv-border-input)' }
            }
          >
            <Repeat size={12} /> Loop
          </button>
        </div>

        <button
          type="button"
          onClick={handleMusicSave}
          disabled={musicSaving}
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}
        >
          {musicSaving ? 'Saving…' : 'Save Ambience'}
        </button>
      </div>

      {/* ── About ── */}
      <div className="rounded-2xl p-6"
        style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#A9B8FF' }}>
          About Reverie
        </h3>
        <div className="space-y-3 text-sm">
          <InfoRow label="Version" value="1.0.0" />
          <InfoRow label="Data storage" value="MongoDB Atlas (encrypted)" />
          <InfoRow label="Authentication" value="JWT — expires in 7 days" />
          <InfoRow label="Visibility default" value="Private — only you see your spaces" />
        </div>
      </div>
    </div>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>{label}</label>
      {children}
    </div>
  );
}

function Alert({ type, msg }: { type: 'success' | 'error'; msg: string }) {
  const isSuccess = type === 'success';
  return (
    <div className="px-4 py-3 rounded-xl text-sm mb-5"
      style={{
        background: isSuccess ? 'var(--rv-success-bg)' : 'var(--rv-error-bg)',
        color: isSuccess ? 'var(--rv-success)' : 'var(--rv-error)',
        border: `1px solid ${isSuccess ? 'var(--rv-success-border)' : 'var(--rv-error-border)'}`,
      }}>
      {msg}
    </div>
  );
}
