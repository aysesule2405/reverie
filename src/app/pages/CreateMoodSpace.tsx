import React, { useState, useRef, KeyboardEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { api } from '../../api/client';

const MOODS = [
  { value: 'peaceful',    label: '🌿 Peaceful' },
  { value: 'joyful',      label: '☀️ Joyful' },
  { value: 'melancholic', label: '🌧️ Melancholic' },
  { value: 'nostalgic',   label: '🍂 Nostalgic' },
  { value: 'energetic',   label: '⚡ Energetic' },
  { value: 'dreamy',      label: '🌙 Dreamy' },
  { value: 'cozy',        label: '🕯️ Cozy' },
  { value: 'anxious',     label: '🌀 Anxious' },
  { value: 'grateful',    label: '✨ Grateful' },
  { value: 'other',       label: '◈ Other' },
];

const CATEGORIES = ['cozy', 'dreamy', 'melancholic', 'joyful', 'nostalgic', 'energetic', 'calm', 'other'];
const PRESET_COLORS = ['#6A7FDB', '#A9B8FF', '#F6D6FF', '#FFB8A3', '#D4E8F7', '#B5E3B8', '#FFEEAD', '#FFD6D6', '#C8F0E8', '#E8D6FF'];
const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';
const AUDIO_ACCEPT = 'audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/aac';

export default function CreateMoodSpace() {
  const navigate = useNavigate();

  const [title, setTitle]             = useState('');
  const [mood, setMood]               = useState('');
  const [description, setDescription] = useState('');
  const [reflection, setReflection]   = useState('');
  const [category, setCategory]       = useState('cozy');
  const [visibility, setVisibility]   = useState<'private' | 'public'>('private');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [tagInput, setTagInput]       = useState('');
  const [moodTags, setMoodTags]       = useState<string[]>([]);
  const [songInput, setSongInput]     = useState('');
  const [songLinks, setSongLinks]     = useState<string[]>([]);
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt]       = useState('');
  const [imageFiles, setImageFiles]   = useState<File[]>([]);
  const [audioFiles, setAudioFiles]   = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [error, setSError]   = useState('');
  const [saving, setSaving] = useState(false);

  const addTag = () => { const t = tagInput.trim().toLowerCase(); if (t && !moodTags.includes(t)) setMoodTags((p) => [...p, t]); setTagInput(''); };
  const removeTag = (t: string) => setMoodTags((p) => p.filter((x) => x !== t));
  const onTagKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } };

  const addSong = () => { const s = songInput.trim(); if (s && !songLinks.includes(s)) setSongLinks((p) => [...p, s]); setSongInput(''); };
  const removeSong = (s: string) => setSongLinks((p) => p.filter((x) => x !== s));
  const onSongKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); addSong(); } };

  const toggleColor = (c: string) =>
    setColorPalette((p) => p.includes(c) ? p.filter((x) => x !== c) : p.length < 6 ? [...p, c] : p);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageFiles((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 5));
  };
  const removeImage = (index: number) => setImageFiles((p) => p.filter((_, i) => i !== index));

  const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAudioFiles((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 3));
  };
  const removeAudio = (index: number) => setAudioFiles((p) => p.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!title.trim()) { setSError('A title is required'); return; }
    if (!mood)         { setSError('Please select a mood'); return; }
    setSError('');
    setSaving(true);
    try {
      const form = new FormData();
      form.append('title', title.trim());
      form.append('mood', mood);
      form.append('description', description.trim());
      form.append('reflection', reflection.trim());
      form.append('category', category);
      form.append('visibility', visibility);
      form.append('coverImageUrl', coverImageUrl.trim());
      form.append('aiPrompt', aiPrompt.trim());
      form.append('moodTags',    JSON.stringify(moodTags));
      form.append('songLinks',   JSON.stringify(songLinks));
      form.append('colorPalette', JSON.stringify(colorPalette));
      imageFiles.forEach((f) => form.append('images', f));
      audioFiles.forEach((f) => form.append('audios', f));
      await api.postForm('/atmospheres', form);
      navigate('/dashboard');
    } catch (e: any) {
      setSError(e.message || 'Could not create mood space. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#A9B8FF' }}>
        <Link to="/dashboard" className="hover:underline" style={{ color: '#6A7FDB' }}>My Spaces</Link>
        <span>›</span>
        <span style={{ color: 'var(--rv-text-secondary)' }}>Create New</span>
      </div>

      <h1 className="font-heading font-semibold text-2xl mb-1" style={{ color: 'var(--rv-text)' }}>
        Create a Mood Space
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--rv-text-secondary)' }}>
        Craft a private sanctuary for this feeling.
      </p>

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
            <div className="sm:col-span-2">
              <FieldLabel>Mood * <span style={{ color: 'var(--rv-text-tertiary)' }}>(how are you feeling?)</span></FieldLabel>
              <div className="flex flex-wrap gap-2 mt-1">
                {MOODS.map((m) => (
                  <button key={m.value} type="button" onClick={() => setMood(m.value)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                    style={mood === m.value
                      ? { background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 3px 10px rgba(106,127,219,0.3)' }
                      : { background: 'var(--rv-inactive-btn)', color: 'var(--rv-text-soft)', border: '1px solid var(--rv-border-inactive)' }
                    }>
                    {m.label}
                  </button>
                ))}
              </div>
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
            <div><FieldLabel>Description / Journal</FieldLabel><StyledTextarea value={description} onChange={setDescription} placeholder="Describe the feeling, scene, or memory this space captures…" rows={3} /></div>
            <div><FieldLabel>Personal Reflection <span style={{ color: 'var(--rv-text-tertiary)' }}>(private note)</span></FieldLabel><StyledTextarea value={reflection} onChange={setReflection} placeholder="Only you see this. What does this mood mean to you?" rows={3} /></div>
          </div>
        </FormSection>

        <FormSection title="Emotions &amp; Tags">
          <FieldLabel>Add tags <span style={{ color: 'var(--rv-text-tertiary)' }}>(Enter or comma)</span></FieldLabel>
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

        <FormSection title="Images">
          <div className="mb-5">
            <FieldLabel>Upload images from your device <span style={{ color: 'var(--rv-text-tertiary)' }}>(max 5 · jpg/png/webp)</span></FieldLabel>
            <input ref={imageInputRef} type="file" accept={IMAGE_ACCEPT} multiple className="hidden" onChange={onImageChange} />
            <button type="button" onClick={() => imageInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'var(--rv-tag)', color: '#6A7FDB', border: '1.5px dashed rgba(169,184,255,0.4)' }}>
              <span>⊞</span> Choose Images
            </button>
            {imageFiles.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {imageFiles.map((f, i) => (
                  <div key={i} className="relative group">
                    <img src={URL.createObjectURL(f)} alt={f.name} className="w-20 h-20 object-cover rounded-xl"
                      style={{ border: '2px solid var(--rv-border)' }} />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                      style={{ background: '#c07070' }}>×</button>
                    <p className="text-xs mt-1 truncate w-20" style={{ color: 'var(--rv-text-tertiary)' }}>{f.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <FieldLabel>Or paste a remote cover image URL</FieldLabel>
            <StyledInput value={coverImageUrl} onChange={setCoverImageUrl} placeholder="https://images.unsplash.com/…" />
            {coverImageUrl && (
              <div className="mt-3 h-28 rounded-xl overflow-hidden" style={{ border: '1px solid var(--rv-border)' }}>
                <img src={coverImageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection title="Audio">
          <div className="mb-5">
            <FieldLabel>Upload audio files from your device <span style={{ color: 'var(--rv-text-tertiary)' }}>(max 3 · mp3/wav/ogg)</span></FieldLabel>
            <input ref={audioInputRef} type="file" accept={AUDIO_ACCEPT} multiple className="hidden" onChange={onAudioChange} />
            <button type="button" onClick={() => audioInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'var(--rv-tag)', color: '#6A7FDB', border: '1.5px dashed rgba(169,184,255,0.4)' }}>
              <span>♪</span> Choose Audio Files
            </button>
            {audioFiles.length > 0 && (
              <ul className="mt-3 space-y-2">
                {audioFiles.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                    style={{ background: 'var(--rv-user-card)', border: '1px solid var(--rv-border)' }}>
                    <span style={{ color: '#A9B8FF' }}>♪</span>
                    <span className="text-sm flex-1 truncate" style={{ color: 'var(--rv-text-label)' }}>{f.name}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--rv-text-tertiary)' }}>{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                    <button type="button" onClick={() => removeAudio(i)} className="text-xs hover:text-red-400" style={{ color: 'var(--rv-text-tertiary)' }}>×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <FieldLabel>Or add external song / playlist links <span style={{ color: 'var(--rv-text-tertiary)' }}>(Enter)</span></FieldLabel>
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
                    <a href={s} target="_blank" rel="noreferrer" className="flex-1 truncate hover:underline" style={{ color: '#6A7FDB' }}>{s}</a>
                    <button type="button" onClick={() => removeSong(s)} className="text-xs hover:text-red-400" style={{ color: 'var(--rv-text-tertiary)' }}>×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormSection>

        <FormSection title="Color Palette">
          <FieldLabel>Pick up to 6 colors that capture this mood</FieldLabel>
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
        </FormSection>

        <FormSection title="AI Mood Board">
          <FieldLabel>Describe your mood for an AI image prompt</FieldLabel>
          <StyledTextarea value={aiPrompt} onChange={setAiPrompt}
            placeholder="e.g. Soft autumn morning, amber light through linen curtains, a half-read book…" rows={3} />
          <p className="text-xs mt-2" style={{ color: 'var(--rv-text-tertiary)' }}>
            Save your prompt and use it with Midjourney, DALL·E, or any AI image generator.
          </p>
        </FormSection>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 16px rgba(106,127,219,0.28)' }}>
            {saving ? 'Saving…' : 'Create Mood Space'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')}
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
