import React, { useState, KeyboardEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { api } from '../../api/client';

const CATEGORIES = ['cozy', 'dreamy', 'melancholic', 'joyful', 'nostalgic', 'energetic', 'calm', 'other'];
const PRESET_COLORS = ['#6A7FDB', '#A9B8FF', '#F6D6FF', '#FFB8A3', '#D4E8F7', '#B5E3B8', '#FFEEAD', '#FFD6D6', '#C8F0E8', '#E8D6FF'];

export default function CreateMoodSpace() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reflection, setReflection] = useState('');
  const [category, setCategory] = useState('cozy');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [songInput, setSongInput] = useState('');
  const [songLinks, setSongLinks] = useState<string[]>([]);
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !moodTags.includes(t)) setMoodTags((prev) => [...prev, t]);
    setTagInput('');
  };
  const removeTag = (t: string) => setMoodTags((prev) => prev.filter((x) => x !== t));
  const onTagKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
  };

  const addSong = () => {
    const s = songInput.trim();
    if (s && !songLinks.includes(s)) setSongLinks((prev) => [...prev, s]);
    setSongInput('');
  };
  const removeSong = (s: string) => setSongLinks((prev) => prev.filter((x) => x !== s));
  const onSongKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); addSong(); }
  };

  const toggleColor = (c: string) => {
    setColorPalette((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : prev.length < 6 ? [...prev, c] : prev
    );
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('A title is required'); return; }
    setError('');
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        reflection: reflection.trim(),
        category,
        visibility,
        coverImageUrl: coverImageUrl.trim(),
        moodTags,
        songLinks,
        colorPalette,
        aiPrompt: aiPrompt.trim(),
      };
      await api.post('/atmospheres', payload);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Could not create mood space. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#A9B8FF' }}>
        <Link to="/dashboard" className="hover:underline" style={{ color: '#6A7FDB' }}>My Spaces</Link>
        <span>›</span>
        <span style={{ color: '#8B97B8' }}>Create New</span>
      </div>

      <h1 className="font-heading font-semibold text-2xl mb-1" style={{ color: '#2C2C3E' }}>
        Create a Mood Space
      </h1>
      <p className="text-sm mb-8" style={{ color: '#8B97B8' }}>
        Craft a private sanctuary for this feeling.
      </p>

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm mb-6"
          style={{ background: 'rgba(255,100,100,0.08)', color: '#c0524e', border: '1px solid rgba(255,100,100,0.15)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title + Category row */}
        <FormSection title="Identity">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <FieldLabel>Title *</FieldLabel>
              <StyledInput value={title} onChange={setTitle} placeholder="Give this mood space a name…" />
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none capitalize"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '1.5px solid rgba(169,184,255,0.3)',
                  color: '#2C2C3E',
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="capitalize">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Visibility</FieldLabel>
              <div className="flex gap-3">
                {(['private', 'public'] as const).map((v) => (
                  <button
                    key={v} type="button"
                    onClick={() => setVisibility(v)}
                    className="flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all"
                    style={visibility === v
                      ? { background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 3px 10px rgba(106,127,219,0.25)' }
                      : { background: 'rgba(255,255,255,0.7)', color: '#6B7DA8', border: '1px solid rgba(169,184,255,0.25)' }
                    }
                  >
                    {v === 'private' ? '🔒 ' : '🌐 '}{v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* Description + Reflection */}
        <FormSection title="Words">
          <div className="space-y-5">
            <div>
              <FieldLabel>Description</FieldLabel>
              <StyledTextarea value={description} onChange={setDescription}
                placeholder="Describe the feeling, scene, or memory this space captures…" rows={3} />
            </div>
            <div>
              <FieldLabel>Personal Reflection</FieldLabel>
              <StyledTextarea value={reflection} onChange={setReflection}
                placeholder="A private note — only you see this. What does this mood mean to you?" rows={3} />
            </div>
          </div>
        </FormSection>

        {/* Mood Tags */}
        <FormSection title="Emotions &amp; Tags">
          <FieldLabel>Add tags <span style={{ color: '#B0BBCC' }}>(press Enter or comma)</span></FieldLabel>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={onTagKey}
              placeholder="e.g. longing, amber, sunday…"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1.5px solid rgba(169,184,255,0.3)',
                color: '#2C2C3E',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(169,184,255,0.3)'; }}
            />
            <button type="button" onClick={addTag}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(169,184,255,0.15)', color: '#6A7FDB' }}>
              Add
            </button>
          </div>
          {moodTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {moodTags.map((t) => (
                <span key={t}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(169,184,255,0.15)', color: '#6A7FDB' }}>
                  {t}
                  <button type="button" onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors">×</button>
                </span>
              ))}
            </div>
          )}
        </FormSection>

        {/* Visual */}
        <FormSection title="Visuals">
          <div className="space-y-5">
            <div>
              <FieldLabel>Cover Image URL</FieldLabel>
              <StyledInput value={coverImageUrl} onChange={setCoverImageUrl}
                placeholder="https://images.unsplash.com/…" />
              {coverImageUrl && (
                <div className="mt-3 h-32 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(169,184,255,0.2)' }}>
                  <img src={coverImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <FieldLabel>Color Palette <span style={{ color: '#B0BBCC' }}>(pick up to 6)</span></FieldLabel>
              <div className="flex flex-wrap gap-3 mt-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c} type="button"
                    onClick={() => toggleColor(c)}
                    className="w-8 h-8 rounded-full transition-all hover:scale-110"
                    style={{
                      background: c,
                      border: colorPalette.includes(c) ? '3px solid #6A7FDB' : '2px solid rgba(255,255,255,0.8)',
                      boxShadow: colorPalette.includes(c) ? '0 0 0 2px rgba(106,127,219,0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                    title={c}
                  />
                ))}
              </div>
              {colorPalette.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs" style={{ color: '#8B97B8' }}>Selected:</span>
                  {colorPalette.map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full" style={{ background: c, border: '1.5px solid white' }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </FormSection>

        {/* Soundtracks */}
        <FormSection title="Soundtrack">
          <FieldLabel>Song / playlist links <span style={{ color: '#B0BBCC' }}>(press Enter)</span></FieldLabel>
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={songInput}
              onChange={(e) => setSongInput(e.target.value)}
              onKeyDown={onSongKey}
              placeholder="https://open.spotify.com/…"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1.5px solid rgba(169,184,255,0.3)',
                color: '#2C2C3E',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(169,184,255,0.3)'; }}
            />
            <button type="button" onClick={addSong}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(169,184,255,0.15)', color: '#6A7FDB' }}>
              Add
            </button>
          </div>
          {songLinks.length > 0 && (
            <ul className="space-y-2">
              {songLinks.map((s, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                  style={{ background: 'rgba(169,184,255,0.08)', border: '1px solid rgba(169,184,255,0.15)' }}>
                  <span style={{ color: '#A9B8FF' }}>♪</span>
                  <a href={s} target="_blank" rel="noreferrer"
                    className="flex-1 truncate hover:underline" style={{ color: '#6A7FDB' }}>{s}</a>
                  <button type="button" onClick={() => removeSong(s)}
                    className="text-xs hover:text-red-400 flex-shrink-0" style={{ color: '#B0BBCC' }}>×</button>
                </li>
              ))}
            </ul>
          )}
        </FormSection>

        {/* AI Mood Board */}
        <FormSection title="AI Mood Board">
          <FieldLabel>Describe your mood for an AI image prompt</FieldLabel>
          <StyledTextarea value={aiPrompt} onChange={setAiPrompt}
            placeholder="e.g. Soft autumn morning, amber light through linen curtains, a half-read book…"
            rows={3} />
          <p className="text-xs mt-2" style={{ color: '#B0BBCC' }}>
            Save your prompt and use it with an AI image generator like Midjourney or DALL·E.
          </p>
        </FormSection>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 16px rgba(106,127,219,0.28)' }}>
            {saving ? 'Saving…' : 'Create Mood Space'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')}
            className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-gray-50"
            style={{ color: '#8B97B8', border: '1px solid rgba(169,184,255,0.25)' }}>
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
      style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(169,184,255,0.12)', boxShadow: '0 2px 12px rgba(106,127,219,0.05)' }}>
      <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#A9B8FF' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium mb-1.5" style={{ color: '#5A6B8A' }}>{children}</label>;
}

function StyledInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(169,184,255,0.3)', color: '#2C2C3E' }}
      onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(169,184,255,0.3)'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

function StyledTextarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder: string; rows?: number }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
      style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(169,184,255,0.3)', color: '#2C2C3E', lineHeight: '1.6' }}
      onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(169,184,255,0.3)'; e.target.style.boxShadow = 'none'; }}
    />
  );
}
