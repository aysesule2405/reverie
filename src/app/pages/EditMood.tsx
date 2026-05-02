import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { api } from '../../api/client';

const CATEGORIES = ['cozy', 'dreamy', 'melancholic', 'joyful', 'nostalgic', 'energetic', 'calm', 'other'];
const PRESET_COLORS = ['#6A7FDB', '#A9B8FF', '#F6D6FF', '#FFB8A3', '#D4E8F7', '#B5E3B8', '#FFEEAD', '#FFD6D6', '#C8F0E8', '#E8D6FF'];

export default function EditMood() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reflection, setReflection] = useState('');
  const [category, setCategory] = useState('cozy');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [songLinks, setSongLinks] = useState<string[]>([]);
  const [songInput, setSongInput] = useState('');
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/atmospheres/${id}`)
      .then((data) => {
        setTitle(data.title || '');
        setDescription(data.description || '');
        setReflection(data.reflection || '');
        setCategory(data.category || 'cozy');
        setVisibility(data.visibility || 'private');
        setCoverImageUrl(data.coverImageUrl || '');
        setMoodTags([...(data.moodTags || []), ...(data.emotions || [])]);
        setSongLinks(data.songLinks || []);
        setColorPalette(data.colorPalette || []);
        setAiPrompt(data.aiPrompt || '');
      })
      .catch(() => setError('Could not load this mood space.'))
      .finally(() => setLoading(false));
  }, [id]);

  const addTag = () => { const t = tagInput.trim().toLowerCase(); if (t && !moodTags.includes(t)) setMoodTags((p) => [...p, t]); setTagInput(''); };
  const removeTag = (t: string) => setMoodTags((p) => p.filter((x) => x !== t));
  const onTagKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } };

  const addSong = () => { const s = songInput.trim(); if (s && !songLinks.includes(s)) setSongLinks((p) => [...p, s]); setSongInput(''); };
  const removeSong = (s: string) => setSongLinks((p) => p.filter((x) => x !== s));
  const onSongKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); addSong(); } };

  const toggleColor = (c: string) =>
    setColorPalette((p) => p.includes(c) ? p.filter((x) => x !== c) : p.length < 6 ? [...p, c] : p);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('A title is required'); return; }
    setError('');
    setSaving(true);
    try {
      await api.put(`/atmospheres/${id}`, { title: title.trim(), description: description.trim(), reflection: reflection.trim(), category, visibility, coverImageUrl: coverImageUrl.trim(), moodTags, songLinks, colorPalette, aiPrompt: aiPrompt.trim() });
      navigate(`/mood/${id}`);
    } catch (e: any) {
      setError(e.message || 'Could not save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full animate-spin"
          style={{ border: '3px solid var(--rv-border)', borderTopColor: '#6A7FDB' }} />
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12 text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--rv-error)' }}>{error}</p>
        <Link to="/dashboard" className="text-sm font-medium" style={{ color: '#6A7FDB' }}>← Back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#A9B8FF' }}>
        <Link to="/dashboard" className="hover:underline" style={{ color: '#6A7FDB' }}>My Spaces</Link>
        <span>›</span>
        <Link to={`/mood/${id}`} className="hover:underline truncate max-w-xs" style={{ color: '#6A7FDB' }}>{title}</Link>
        <span>›</span>
        <span style={{ color: 'var(--rv-text-secondary)' }}>Edit</span>
      </div>

      <h1 className="font-heading font-semibold text-2xl mb-1" style={{ color: 'var(--rv-text)' }}>Edit Mood Space</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--rv-text-secondary)' }}>Update your sanctuary.</p>

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm mb-6"
          style={{ background: 'var(--rv-error-bg)', color: 'var(--rv-error)', border: '1px solid var(--rv-error-border)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection title="Identity">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <FieldLabel>Title *</FieldLabel>
              <StyledInput value={title} onChange={setTitle} placeholder="Give this mood space a name…" />
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none capitalize"
                style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel>Visibility</FieldLabel>
              <div className="flex gap-3">
                {(['private', 'public'] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setVisibility(v)}
                    className="flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all"
                    style={visibility === v
                      ? { background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 3px 10px rgba(106,127,219,0.25)' }
                      : { background: 'var(--rv-inactive-btn)', color: 'var(--rv-text-soft)', border: '1px solid var(--rv-border-inactive)' }
                    }>
                    {v === 'private' ? '🔒 ' : '🌐 '}{v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Words">
          <div className="space-y-5">
            <div><FieldLabel>Description</FieldLabel><StyledTextarea value={description} onChange={setDescription} placeholder="Describe the feeling, scene, or memory…" rows={3} /></div>
            <div><FieldLabel>Personal Reflection</FieldLabel><StyledTextarea value={reflection} onChange={setReflection} placeholder="A private note about what this mood means to you…" rows={3} /></div>
          </div>
        </FormSection>

        <FormSection title="Emotions &amp; Tags">
          <FieldLabel>Tags <span style={{ color: 'var(--rv-text-tertiary)' }}>(press Enter or comma)</span></FieldLabel>
          <div className="flex gap-2 mb-3">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={onTagKey}
              placeholder="e.g. longing, amber, sunday…" className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }} />
            <button type="button" onClick={addTag} className="px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>Add</button>
          </div>
          {moodTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {moodTags.map((t) => (
                <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>
                  {t}<button type="button" onClick={() => removeTag(t)} className="hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          )}
        </FormSection>

        <FormSection title="Visuals">
          <div className="space-y-5">
            <div>
              <FieldLabel>Cover Image URL</FieldLabel>
              <StyledInput value={coverImageUrl} onChange={setCoverImageUrl} placeholder="https://images.unsplash.com/…" />
              {coverImageUrl && (
                <div className="mt-3 h-32 rounded-xl overflow-hidden" style={{ border: '1px solid var(--rv-border)' }}>
                  <img src={coverImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <FieldLabel>Color Palette <span style={{ color: 'var(--rv-text-tertiary)' }}>(up to 6)</span></FieldLabel>
              <div className="flex flex-wrap gap-3 mt-2">
                {PRESET_COLORS.map((c) => (
                  <button key={c} type="button" onClick={() => toggleColor(c)}
                    className="w-8 h-8 rounded-full transition-all hover:scale-110"
                    style={{ background: c, border: colorPalette.includes(c) ? '3px solid #6A7FDB' : '2px solid rgba(255,255,255,0.8)', boxShadow: colorPalette.includes(c) ? '0 0 0 2px rgba(106,127,219,0.3)' : '0 2px 6px rgba(0,0,0,0.1)' }} />
                ))}
              </div>
              {colorPalette.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs" style={{ color: 'var(--rv-text-secondary)' }}>Selected:</span>
                  {colorPalette.map((c, i) => <div key={i} className="w-5 h-5 rounded-full" style={{ background: c, border: '1.5px solid white' }} />)}
                </div>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection title="Soundtrack">
          <FieldLabel>Song / playlist links <span style={{ color: 'var(--rv-text-tertiary)' }}>(press Enter)</span></FieldLabel>
          <div className="flex gap-2 mb-3">
            <input type="url" value={songInput} onChange={(e) => setSongInput(e.target.value)} onKeyDown={onSongKey}
              placeholder="https://open.spotify.com/…" className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }} />
            <button type="button" onClick={addSong} className="px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>Add</button>
          </div>
          {songLinks.length > 0 && (
            <ul className="space-y-2">
              {songLinks.map((s, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                  style={{ background: 'var(--rv-user-card)', border: '1px solid var(--rv-border)' }}>
                  <span style={{ color: '#A9B8FF' }}>♪</span>
                  <span className="flex-1 truncate" style={{ color: '#6A7FDB' }}>{s}</span>
                  <button type="button" onClick={() => removeSong(s)} className="text-xs hover:text-red-400" style={{ color: 'var(--rv-text-tertiary)' }}>×</button>
                </li>
              ))}
            </ul>
          )}
        </FormSection>

        <FormSection title="AI Mood Board">
          <FieldLabel>AI image prompt</FieldLabel>
          <StyledTextarea value={aiPrompt} onChange={setAiPrompt} placeholder="e.g. Soft autumn morning, amber light through linen curtains…" rows={3} />
        </FormSection>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 16px rgba(106,127,219,0.28)' }}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate(`/mood/${id}`)}
            className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: 'var(--rv-text-secondary)', border: '1px solid var(--rv-border-inactive)' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6"
      style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 12px rgba(106,127,219,0.05)' }}>
      <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#A9B8FF' }}>{title}</h3>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>{children}</label>;
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

function StyledTextarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder: string; rows?: number }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
      style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)', lineHeight: '1.6' }}
      onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }} />
  );
}
