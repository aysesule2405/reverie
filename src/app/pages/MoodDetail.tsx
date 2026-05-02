import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useAuth } from '../AuthContext';
import { api } from '../../api/client';

interface MoodSpace {
  _id: string;
  title: string;
  description?: string;
  reflection?: string;
  moodTags: string[];
  emotions: string[];
  category?: string;
  coverImageUrl?: string;
  imageUrls: string[];
  songLinks: string[];
  colorPalette: string[];
  aiPrompt?: string;
  aiResult?: string;
  visibility: 'public' | 'private';
  createdBy: { _id: string; name: string; avatarUrl?: string };
  createdAt: string;
  updatedAt?: string;
}

export default function MoodDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [space, setSpace] = useState<MoodSpace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/atmospheres/${id}`)
      .then(setSpace)
      .catch((e) => setError(e.message || 'Could not load this mood space.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this mood space permanently?')) return;
    setDeleting(true);
    try {
      await api.del(`/atmospheres/${id}`);
      navigate('/dashboard');
    } catch {
      alert('Could not delete. Please try again.');
      setDeleting(false);
    }
  };

  const isOwner = user && space && user.id === space.createdBy?._id?.toString();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full animate-spin"
          style={{ border: '3px solid #e8e8f0', borderTopColor: '#6A7FDB' }} />
      </div>
    );
  }

  if (error || !space) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-sm mb-4" style={{ color: '#c0524e' }}>{error || 'Mood space not found.'}</p>
        <Link to="/dashboard" className="text-sm font-medium" style={{ color: '#6A7FDB' }}>← Back to Dashboard</Link>
      </div>
    );
  }

  const allTags = [...(space.moodTags || []), ...(space.emotions || [])];

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#A9B8FF' }}>
        <Link to="/dashboard" className="hover:underline" style={{ color: '#6A7FDB' }}>My Spaces</Link>
        <span>›</span>
        <span className="truncate max-w-xs" style={{ color: '#8B97B8' }}>{space.title}</span>
      </div>

      {/* Cover image */}
      {space.coverImageUrl && (
        <div className="rounded-3xl overflow-hidden mb-8 relative"
          style={{ height: 280, boxShadow: '0 12px 40px rgba(106,127,219,0.15)' }}>
          <img src={space.coverImageUrl} alt={space.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,44,62,0.5) 0%, transparent 60%)' }} />
          <div className="absolute bottom-6 left-7 right-7 flex items-end justify-between">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {allTags.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs px-2.5 py-0.5 rounded-full capitalize"
                    style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white' }}>
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-white leading-tight">
                {space.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Title (no cover) */}
      {!space.coverImageUrl && (
        <div className="mb-8">
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {allTags.slice(0, 4).map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full capitalize"
                  style={{ background: 'rgba(169,184,255,0.15)', color: '#6A7FDB' }}>{t}</span>
              ))}
            </div>
          )}
          <h1 className="font-heading font-semibold text-3xl" style={{ color: '#2C2C3E' }}>{space.title}</h1>
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-6"
        style={{ borderBottom: '1px solid rgba(169,184,255,0.15)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-medium"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
            {space.createdBy?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm" style={{ color: '#6B7DA8' }}>{space.createdBy?.name}</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full capitalize"
          style={{ background: 'rgba(169,184,255,0.1)', color: '#6A7FDB' }}>
          {space.category || 'uncategorized'}
        </span>
        <span className="text-xs" style={{ color: '#B0BBCC' }}>
          {space.visibility === 'private' ? '🔒 private' : '🌐 public'}
        </span>
        <span className="text-xs ml-auto" style={{ color: '#B0BBCC' }}>
          {new Date(space.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Owner actions */}
      {isOwner && (
        <div className="flex gap-3 mb-8">
          <Link to={`/mood/${space._id}/edit`}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}>
            Edit Space
          </Link>
          <button onClick={handleDelete} disabled={deleting}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-50 disabled:opacity-40"
            style={{ color: '#c07070', border: '1px solid rgba(220,100,100,0.2)' }}>
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      )}

      {/* Content sections */}
      <div className="space-y-6">
        {space.description && (
          <Section icon="◈" title="Description">
            <p className="text-sm leading-relaxed" style={{ color: '#4A5568', lineHeight: 1.8 }}>
              {space.description}
            </p>
          </Section>
        )}

        {space.reflection && (
          <Section icon="✦" title="Personal Reflection">
            <p className="font-atmosphere text-base leading-relaxed" style={{ color: '#4A5568', lineHeight: 1.9, fontStyle: 'italic' }}>
              "{space.reflection}"
            </p>
          </Section>
        )}

        {space.colorPalette?.length > 0 && (
          <Section icon="◉" title="Color Palette">
            <div className="flex flex-wrap gap-3">
              {space.colorPalette.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-2xl shadow-sm"
                    style={{ background: c, border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                  <span className="text-xs font-mono" style={{ color: '#B0BBCC' }}>{c}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {space.songLinks?.length > 0 && (
          <Section icon="♪" title="Soundtrack">
            <ul className="space-y-2.5">
              {space.songLinks.map((s, i) => (
                <li key={i}>
                  <a href={s} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-indigo-50 group"
                    style={{ border: '1px solid rgba(169,184,255,0.18)' }}>
                    <span style={{ color: '#A9B8FF' }}>♪</span>
                    <span className="text-sm truncate flex-1 group-hover:underline" style={{ color: '#6A7FDB' }}>{s}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: '#B0BBCC' }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {space.imageUrls?.length > 0 && (
          <Section icon="⊞" title="Images">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {space.imageUrls.map((url, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square"
                  style={{ border: '1px solid rgba(169,184,255,0.15)' }}>
                  <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </Section>
        )}

        {space.aiPrompt && (
          <Section icon="✧" title="AI Mood Board Prompt">
            <div className="px-5 py-4 rounded-xl"
              style={{ background: 'rgba(169,184,255,0.06)', border: '1px solid rgba(169,184,255,0.18)' }}>
              <p className="text-sm leading-relaxed font-atmosphere" style={{ color: '#5A6B8A', fontStyle: 'italic' }}>
                {space.aiPrompt}
              </p>
            </div>
            {space.aiResult && (
              <div className="mt-3 px-5 py-4 rounded-xl"
                style={{ background: 'rgba(246,214,255,0.08)', border: '1px solid rgba(246,214,255,0.25)' }}>
                <p className="text-xs font-medium mb-2" style={{ color: '#A9B8FF' }}>AI Result</p>
                <p className="text-sm leading-relaxed" style={{ color: '#5A6B8A' }}>{space.aiResult}</p>
              </div>
            )}
          </Section>
        )}
      </div>

      {/* Back link */}
      <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(169,184,255,0.12)' }}>
        <Link to="/dashboard" className="text-sm font-medium hover:underline" style={{ color: '#6A7FDB' }}>
          ← Back to My Spaces
        </Link>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6"
      style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', border: '1px solid rgba(169,184,255,0.12)', boxShadow: '0 2px 12px rgba(106,127,219,0.05)' }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm" style={{ color: '#A9B8FF' }}>{icon}</span>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest" style={{ color: '#A9B8FF' }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
