import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { api } from '../../api/client';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  const [spaceCount, setSpaceCount] = useState<number | null>(null);

  useEffect(() => {
    setName(user?.name || '');
    setAvatarUrl(user?.avatarUrl || '');
  }, [user]);

  useEffect(() => {
    api.get('/atmospheres?mine=true')
      .then((data: unknown[]) => setSpaceCount(data.length))
      .catch(() => {});
  }, []);

  const handleProfileSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) { setProfileError('Name is required'); return; }
    setProfileError('');
    setProfileSaving(true);
    try {
      await updateProfile(name.trim(), avatarUrl.trim());
      setProfileSuccess('Profile updated successfully.');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (e: any) {
      setProfileError(e.message || 'Could not update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-10 py-8">
      <h1 className="font-heading font-semibold text-2xl mb-1" style={{ color: '#2C2C3E' }}>
        Profile &amp; Settings
      </h1>
      <p className="text-sm mb-8" style={{ color: '#8B97B8' }}>
        Manage your Reverie account.
      </p>

      {/* Account card */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(169,184,255,0.12)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}
          >
            {avatarUrl
              ? <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              : name?.charAt(0).toUpperCase() || 'U'
            }
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl" style={{ color: '#2C2C3E' }}>{user?.name}</h2>
            <p className="text-sm" style={{ color: '#8B97B8' }}>{user?.email}</p>
            <p className="text-xs mt-1" style={{ color: '#B0BBCC' }}>
              {spaceCount !== null ? `${spaceCount} mood space${spaceCount !== 1 ? 's' : ''}` : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-5" style={{ borderTop: '1px solid rgba(169,184,255,0.12)', borderBottom: '1px solid rgba(169,184,255,0.12)' }}>
          <Stat label="Mood Spaces" value={spaceCount !== null ? String(spaceCount) : '–'} />
          <Stat label="Account" value="Active" />
          <Stat label="Plan" value="Free" />
        </div>
      </div>

      {/* Edit profile form */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(169,184,255,0.12)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#A9B8FF' }}>
          Edit Profile
        </h3>

        {profileSuccess && (
          <div className="px-4 py-3 rounded-xl text-sm mb-5"
            style={{ background: 'rgba(100,200,120,0.08)', color: '#4a8a5a', border: '1px solid rgba(100,200,120,0.2)' }}>
            {profileSuccess}
          </div>
        )}
        {profileError && (
          <div className="px-4 py-3 rounded-xl text-sm mb-5"
            style={{ background: 'rgba(255,100,100,0.08)', color: '#c0524e', border: '1px solid rgba(255,100,100,0.15)' }}>
            {profileError}
          </div>
        )}

        <form onSubmit={handleProfileSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#5A6B8A' }}>Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(169,184,255,0.3)', color: '#2C2C3E' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(169,184,255,0.3)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#5A6B8A' }}>Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(240,240,248,0.6)', border: '1.5px solid rgba(169,184,255,0.15)', color: '#9BA5B8', cursor: 'not-allowed' }}
            />
            <p className="text-xs mt-1.5" style={{ color: '#B0BBCC' }}>Email cannot be changed.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#5A6B8A' }}>Avatar URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://…"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(169,184,255,0.3)', color: '#2C2C3E' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(169,184,255,0.3)'; e.target.style.boxShadow = 'none'; }}
            />
            {avatarUrl && (
              <div className="mt-3 flex items-center gap-3">
                <img src={avatarUrl} alt="Avatar preview" className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="text-xs" style={{ color: '#8B97B8' }}>Preview</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={profileSaving}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}
          >
            {profileSaving ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </div>

      {/* Account info */}
      <div className="rounded-2xl p-6"
        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(169,184,255,0.12)', boxShadow: '0 2px 16px rgba(106,127,219,0.06)' }}>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#A9B8FF' }}>
          About Reverie
        </h3>
        <div className="space-y-3 text-sm" style={{ color: '#6B7DA8' }}>
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
      <p className="font-heading font-semibold text-xl" style={{ color: '#2C2C3E' }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: '#B0BBCC' }}>{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span style={{ color: '#B0BBCC', flexShrink: 0 }}>{label}</span>
      <span className="text-right" style={{ color: '#6B7DA8' }}>{value}</span>
    </div>
  );
}
