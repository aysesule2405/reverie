import React, { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../../api/client';
import { Upload, Link as LinkIcon, Trash2, Pencil, Check, X, Play, Pause, Image as ImageIcon, Music, Film } from 'lucide-react';

interface MediaItem {
  _id: string;
  title: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  source: 'upload' | 'external';
  createdAt: string;
}

type FilterType = 'all' | 'image' | 'video' | 'audio';

const TYPE_ICONS = {
  image: ImageIcon,
  video: Film,
  audio: Music,
};

function formatBytes(bytes?: number) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Library() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadMsg, setUploadMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState<'image' | 'video' | 'audio'>('image');
  const [showLinkForm, setShowLinkForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const flash = (type: 'ok' | 'err', text: string) => {
    setUploadMsg({ type, text });
    setTimeout(() => setUploadMsg(null), 3500);
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const url = filter === 'all' ? '/library' : `/library?type=${filter}`;
      const data = await api.get(url);
      setItems(data);
    } catch {
      setError('Could not load your library.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const item = await api.postForm('/library/upload', form);
      setItems((prev) => [item, ...prev]);
      flash('ok', `"${item.title}" added to library.`);
    } catch (e: any) {
      flash('err', e.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddLink = async () => {
    if (!linkUrl.trim()) return;
    try {
      const item = await api.post('/library/link', {
        title: linkTitle.trim() || linkUrl,
        url: linkUrl.trim(),
        type: linkType,
      });
      setItems((prev) => [item, ...prev]);
      setLinkTitle('');
      setLinkUrl('');
      setShowLinkForm(false);
      flash('ok', `"${item.title}" added to library.`);
    } catch (e: any) {
      flash('err', e.message || 'Could not add link.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this item from your library?')) return;
    try {
      await api.del(`/library/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (e: any) {
      flash('err', e.message || 'Could not delete.');
    }
  };

  const handleRename = async (id: string, newTitle: string) => {
    try {
      const updated = await api.put(`/library/${id}`, { title: newTitle });
      setItems((prev) => prev.map((i) => (i._id === id ? updated : i)));
    } catch (e: any) {
      flash('err', e.message || 'Could not rename.');
    }
  };

  const FILTERS: { value: FilterType; label: string }[] = [
    { value: 'all',   label: 'All' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
  ];

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-semibold text-2xl lg:text-3xl" style={{ color: 'var(--rv-text)' }}>
            Media Library
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>
            Your personal collection of reusable images, videos, and audio.
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <input ref={fileInputRef} type="file" accept="image/*,audio/*,video/mp4,video/webm,video/quicktime" className="hidden" onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}>
            <Upload size={15} />
            {uploading ? 'Uploading…' : 'Upload File'}
          </button>
          <button onClick={() => setShowLinkForm(!showLinkForm)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text-secondary)', background: 'var(--rv-input)' }}>
            <LinkIcon size={15} />
            Add URL
          </button>
        </div>
      </div>

      {/* Add URL form */}
      {showLinkForm && (
        <div className="rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-3 items-end"
          style={{ background: 'var(--rv-card-section)', border: '1px solid var(--rv-border-divider)' }}>
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--rv-text-muted)' }}>Title</label>
            <input type="text" value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)}
              placeholder="Media title (optional)"
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }} />
          </div>
          <div className="flex-[2]">
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--rv-text-muted)' }}>URL</label>
            <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://…"
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
              onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddLink(); }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--rv-text-muted)' }}>Type</label>
            <select value={linkType} onChange={(e) => setLinkType(e.target.value as 'image' | 'video' | 'audio')}
              className="px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          <button onClick={handleAddLink} disabled={!linkUrl.trim()}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
            Add
          </button>
          <button onClick={() => setShowLinkForm(false)}
            className="p-2.5 rounded-xl transition-all hover:opacity-60"
            style={{ color: 'var(--rv-text-muted)', border: '1px solid var(--rv-border-inactive)' }}>
            <X size={15} />
          </button>
        </div>
      )}

      {uploadMsg && (
        <div className="px-4 py-3 rounded-xl text-sm mb-5"
          style={{
            background: uploadMsg.type === 'ok' ? 'var(--rv-success-bg)' : 'var(--rv-error-bg)',
            color:      uploadMsg.type === 'ok' ? 'var(--rv-success)'    : 'var(--rv-error)',
            border: `1px solid ${uploadMsg.type === 'ok' ? 'var(--rv-success-border)' : 'var(--rv-error-border)'}`,
          }}>
          {uploadMsg.text}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={filter === f.value
              ? { background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 3px 10px rgba(106,127,219,0.25)' }
              : { background: 'var(--rv-inactive-btn)', color: 'var(--rv-text-soft)', border: '1px solid var(--rv-border-inactive)' }
            }>
            {f.label}
          </button>
        ))}
        {items.length > 0 && (
          <span className="ml-auto text-xs self-center" style={{ color: 'var(--rv-text-muted)' }}>
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm mb-6"
          style={{ background: 'var(--rv-error-bg)', color: 'var(--rv-error)', border: '1px solid var(--rv-error-border)' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl animate-pulse aspect-square"
              style={{ background: 'var(--rv-card)' }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyLibrary filter={filter} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <MediaCard key={item._id} item={item} onDelete={handleDelete} onRename={handleRename} />
          ))}
        </div>
      )}
    </div>
  );
}

function MediaCard({ item, onDelete, onRename }: {
  item: MediaItem;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const commitRename = () => {
    if (editTitle.trim() && editTitle.trim() !== item.title) {
      onRename(item._id, editTitle.trim());
    }
    setEditing(false);
  };

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(item.url);
      audioRef.current.onended = () => setAudioPlaying(false);
    }
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
  };

  const TypeIcon = TYPE_ICONS[item.type];

  return (
    <div className="rounded-2xl overflow-hidden group flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: 'var(--rv-card)', border: '1px solid var(--rv-border)', boxShadow: '0 2px 12px rgba(106,127,219,0.07)' }}>

      {/* Preview area */}
      <div className="aspect-square relative overflow-hidden flex-shrink-0"
        style={{ background: 'var(--rv-tag)' }}>
        {item.type === 'image' && (
          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
        )}
        {item.type === 'video' && (
          <video src={item.url} className="w-full h-full object-cover"
            muted playsInline onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
            onMouseLeave={(e) => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }} />
        )}
        {item.type === 'audio' && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Music size={32} style={{ color: '#A9B8FF' }} />
            <button onClick={toggleAudio}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
              {audioPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            style={{ background: 'rgba(0,0,0,0.45)', color: 'white', backdropFilter: 'blur(6px)' }}>
            <TypeIcon size={10} /> {item.type}
          </span>
        </div>

        {/* Actions overlay */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.45)', color: 'white', backdropFilter: 'blur(6px)' }}
            title="Rename">
            <Pencil size={12} />
          </button>
          <button onClick={() => onDelete(item._id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(200,80,80,0.7)', color: 'white', backdropFilter: 'blur(6px)' }}
            title="Delete">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="px-3 py-2.5">
        {editing ? (
          <div className="flex items-center gap-1">
            <input
              autoFocus
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setEditing(false); setEditTitle(item.title); } }}
              className="flex-1 text-xs px-2 py-1 rounded-lg outline-none"
              style={{ background: 'var(--rv-input)', border: '1.5px solid #6A7FDB', color: 'var(--rv-text)' }}
            />
            <button onClick={commitRename} style={{ color: '#6A7FDB' }}><Check size={14} /></button>
            <button onClick={() => { setEditing(false); setEditTitle(item.title); }} style={{ color: 'var(--rv-text-muted)' }}><X size={14} /></button>
          </div>
        ) : (
          <p className="text-xs font-medium truncate" style={{ color: 'var(--rv-text)' }} title={item.title}>
            {item.title}
          </p>
        )}
        {item.size && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--rv-text-muted)' }}>{formatBytes(item.size)}</p>
        )}
      </div>
    </div>
  );
}

function EmptyLibrary({ filter }: { filter: FilterType }) {
  const TypeIcon = filter !== 'all' ? TYPE_ICONS[filter] : Upload;
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6" style={{ background: 'var(--rv-tag)' }}>
        <TypeIcon size={32} style={{ color: '#A9B8FF' }} />
      </div>
      <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: 'var(--rv-text)' }}>
        {filter === 'all' ? 'Your library is empty' : `No ${filter}s yet`}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--rv-text-secondary)' }}>
        {filter === 'all'
          ? 'Upload images, videos, or audio to reuse them across your mood spaces.'
          : `Upload ${filter} files or add ${filter} URLs to get started.`
        }
      </p>
    </div>
  );
}
