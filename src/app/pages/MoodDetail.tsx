import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router';
import { Heart, Bookmark, Trash2 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { api } from '../../api/client';

interface Comment {
  _id: string;
  text: string;
  user: { _id: string; name: string; avatarUrl?: string };
  createdAt: string;
}

interface MoodSpace {
  _id: string;
  title: string;
  mood?: string;
  description?: string;
  reflection?: string;
  moodTags: string[];
  emotions: string[];
  category?: string;
  coverImageUrl?: string;
  images: string[];
  imageUrls: string[];
  audios: string[];
  songLinks: string[];
  colorPalette: string[];
  aiPrompt?: string;
  aiResult?: string;
  visibility: 'public' | 'private';
  user: { _id: string; name: string; avatarUrl?: string };
  createdAt: string;
  updatedAt?: string;
  likeCount?: number;
  saveCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

const MOOD_LABELS: Record<string, string> = {
  peaceful: '🌿 Peaceful', joyful: '☀️ Joyful', melancholic: '🌧️ Melancholic',
  nostalgic: '🍂 Nostalgic', energetic: '⚡ Energetic', dreamy: '🌙 Dreamy',
  cozy: '🕯️ Cozy', anxious: '🌀 Anxious', grateful: '✨ Grateful', other: '◈ Other',
};

export default function MoodDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromCommunity = (location.state as { from?: string } | null)?.from === 'community';

  const [space, setSpace] = useState<MoodSpace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Like / Save
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [liking, setLiking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/atmospheres/${id}`)
      .then((data) => {
        setSpace(data);
        setLikeCount(data.likeCount ?? 0);
        setIsLiked(data.isLiked ?? false);
        setSaveCount(data.saveCount ?? 0);
        setIsSaved(data.isSaved ?? false);
      })
      .catch((e) => setError(e.message || 'Could not load this mood space.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    api.get(`/comments/${id}`).then(setComments).catch(() => {});
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

  const handleLike = async () => {
    if (!user) return;
    setLiking(true);
    setActionError('');
    try {
      const res = await api.post(`/community/spaces/${id}/like`);
      setLikeCount(res.likeCount);
      setIsLiked(res.isLiked);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Could not like this space.');
    } finally {
      setLiking(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setActionError('');
    try {
      const res = await api.post(`/community/spaces/${id}/save`);
      setSaveCount(res.saveCount);
      setIsSaved(res.isSaved);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Could not save this space.');
    } finally {
      setSaving(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    setCommentError('');
    try {
      const newComment = await api.post(`/comments/${id}`, { text: commentText.trim() });
      setComments((prev) => [newComment, ...prev]);
      setCommentText('');
    } catch (err: unknown) {
      setCommentError(err instanceof Error ? err.message : 'Could not post comment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Delete this comment?')) return;
    setDeletingCommentId(commentId);
    try {
      await api.del(`/community/spaces/${id}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch {
      // keep the comment in the list — deletion failed silently
    } finally {
      setDeletingCommentId(null);
    }
  };

  const ownerId = space?.user?._id?.toString();
  const isOwner = !!(user && ownerId && user.id === ownerId);
  const allImages = [...(space?.images || []), ...(space?.imageUrls || [])];
  const coverSrc = space?.coverImageUrl || (space?.images?.[0] ?? null);
  const isPublic = space?.visibility === 'public';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full animate-spin"
          style={{ border: '3px solid var(--rv-border)', borderTopColor: '#6A7FDB' }} />
      </div>
    );
  }

  if (error || !space) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--rv-error)' }}>{error || 'Mood space not found.'}</p>
        <Link to="/dashboard" className="text-sm font-medium" style={{ color: '#6A7FDB' }}>← Back to Dashboard</Link>
      </div>
    );
  }

  const allTags = [...(space.moodTags || []), ...(space.emotions || [])];

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Full view" className="max-w-full max-h-full rounded-2xl object-contain" />
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onClick={() => setLightbox(null)}>×</button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#A9B8FF' }}>
        <Link to={fromCommunity ? '/community' : '/dashboard'} className="hover:underline" style={{ color: '#6A7FDB' }}>
          {fromCommunity ? 'Community' : 'My Spaces'}
        </Link>
        <span>›</span>
        <span className="truncate max-w-xs" style={{ color: 'var(--rv-text-secondary)' }}>{space.title}</span>
      </div>

      {/* Hero cover */}
      {coverSrc ? (
        <div className="rounded-3xl overflow-hidden mb-8 relative cursor-pointer"
          style={{ height: 300, boxShadow: '0 12px 40px rgba(106,127,219,0.15)' }}
          onClick={() => setLightbox(coverSrc)}>
          <img src={coverSrc} alt={space.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,44,62,0.6) 0%, transparent 55%)' }} />
          {space.mood && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', color: 'white' }}>
                {MOOD_LABELS[space.mood] ?? space.mood}
              </span>
            </div>
          )}
          <div className="absolute bottom-6 left-7 right-7">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {allTags.slice(0, 3).map((t) => (
                <span key={t} className="text-xs px-2.5 py-0.5 rounded-full capitalize"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white' }}>{t}</span>
              ))}
            </div>
            <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-white leading-tight">{space.title}</h1>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          {space.mood && (
            <span className="inline-block mb-3 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>
              {MOOD_LABELS[space.mood] ?? space.mood}
            </span>
          )}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {allTags.slice(0, 4).map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full capitalize"
                  style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>{t}</span>
              ))}
            </div>
          )}
          <h1 className="font-heading font-semibold text-3xl" style={{ color: 'var(--rv-text)' }}>{space.title}</h1>
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 mb-4 pb-5" style={{ borderBottom: '1px solid var(--rv-border-divider)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
            {space.user?.avatarUrl
              ? <img src={space.user.avatarUrl} alt={space.user.name} className="w-7 h-7 rounded-full object-cover" />
              : space.user?.name?.charAt(0).toUpperCase()
            }
          </div>
          <span className="text-sm" style={{ color: 'var(--rv-text-soft)' }}>{space.user?.name}</span>
        </div>
        {space.category && (
          <span className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>
            {space.category}
          </span>
        )}
        <span className="text-xs" style={{ color: 'var(--rv-text-tertiary)' }}>
          {space.visibility === 'private' ? '🔒 private' : '🌐 public'}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'var(--rv-text-tertiary)' }}>
          {new Date(space.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Like / Save bar — only for public spaces */}
      {isPublic && (
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleLike}
            disabled={!user || liking}
            title={user ? (isLiked ? 'Unlike' : 'Like this space') : 'Sign in to like'}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50"
            style={isLiked
              ? { background: 'rgba(230, 80, 100, 0.10)', color: '#d05070', border: '1.5px solid rgba(230,80,100,0.25)' }
              : { background: 'var(--rv-tag)', color: 'var(--rv-text-soft)', border: '1.5px solid var(--rv-border)' }
            }
          >
            <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likeCount > 0 ? likeCount : ''} {isLiked ? 'Liked' : 'Like'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={!user || saving}
            title={user ? (isSaved ? 'Remove from saved' : 'Save to inspirations') : 'Sign in to save'}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50"
            style={isSaved
              ? { background: 'rgba(106, 127, 219, 0.12)', color: '#6A7FDB', border: '1.5px solid rgba(106,127,219,0.28)' }
              : { background: 'var(--rv-tag)', color: 'var(--rv-text-soft)', border: '1.5px solid var(--rv-border)' }
            }
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
            {saveCount > 0 && <span className="text-xs opacity-60">· {saveCount}</span>}
          </button>

          {!user && (
            <Link to="/login" className="text-xs ml-auto hover:underline" style={{ color: '#6A7FDB' }}>
              Sign in to like or save
            </Link>
          )}
          {actionError && (
            <span className="text-xs ml-auto" style={{ color: 'var(--rv-error)' }}>{actionError}</span>
          )}
        </div>
      )}

      {/* Owner actions */}
      {isOwner && (
        <div className="flex gap-3 mb-8">
          <Link to={`/mood/${space._id}/edit`}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}>
            Edit Space
          </Link>
          <button onClick={handleDelete} disabled={deleting}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-40"
            style={{ color: 'var(--rv-danger)', border: '1px solid var(--rv-danger-border)' }}>
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      )}

      {/* Content sections */}
      <div className="space-y-6">
        {space.description && (
          <Section icon="◈" title="Description">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--rv-text-body)', lineHeight: 1.85 }}>{space.description}</p>
          </Section>
        )}

        {space.reflection && (
          <Section icon="✦" title="Personal Reflection">
            <p className="font-atmosphere text-base leading-relaxed"
              style={{ color: 'var(--rv-text-body)', lineHeight: 1.9, fontStyle: 'italic' }}>
              "{space.reflection}"
            </p>
          </Section>
        )}

        {allImages.length > 0 && (
          <Section icon="⊞" title={`Images (${allImages.length})`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allImages.map((src, i) => (
                <button key={i} type="button" onClick={() => setLightbox(src)}
                  className="rounded-xl overflow-hidden aspect-square group relative transition-all hover:scale-[1.02]"
                  style={{ border: '1px solid var(--rv-border)' }}>
                  <img src={src} alt={`Image ${i + 1}`} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background: 'rgba(106,127,219,0.25)' }}>
                    <span className="text-white text-2xl">⊕</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--rv-text-tertiary)' }}>Click an image to enlarge</p>
          </Section>
        )}

        {space.audios?.length > 0 && (
          <Section icon="♫" title={`Audio (${space.audios.length})`}>
            <ul className="space-y-4">
              {space.audios.map((src, i) => {
                const filename = src.split('/').pop()?.replace(/^\d+-\d+-/, '') ?? `Track ${i + 1}`;
                return (
                  <li key={i} className="rounded-2xl p-4"
                    style={{ background: 'var(--rv-section-bg)', border: '1px solid var(--rv-border)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
                        <span className="text-white text-xs">♫</span>
                      </div>
                      <span className="text-sm font-medium truncate" style={{ color: 'var(--rv-text-label)' }}>{filename}</span>
                    </div>
                    <audio controls src={src} className="w-full" style={{ borderRadius: '10px', height: '36px' }}>
                      Your browser does not support audio playback.
                    </audio>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {space.songLinks?.length > 0 && (
          <Section icon="♪" title="External Links">
            <ul className="space-y-2.5">
              {space.songLinks.map((s, i) => (
                <li key={i}>
                  <a href={s} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:opacity-80 group"
                    style={{ border: '1px solid var(--rv-border)' }}>
                    <span style={{ color: '#A9B8FF' }}>♪</span>
                    <span className="text-sm truncate flex-1 group-hover:underline" style={{ color: '#6A7FDB' }}>{s}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--rv-text-tertiary)' }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {space.colorPalette?.length > 0 && (
          <Section icon="◉" title="Color Palette">
            <div className="flex flex-wrap gap-4">
              {space.colorPalette.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-2xl"
                    style={{ background: c, border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--rv-text-tertiary)' }}>{c}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {space.aiPrompt && (
          <Section icon="✧" title="AI Mood Board Prompt">
            <div className="px-5 py-4 rounded-xl" style={{ background: 'var(--rv-section-bg)', border: '1px solid var(--rv-border)' }}>
              <p className="text-sm leading-relaxed font-atmosphere" style={{ color: 'var(--rv-text-label)', fontStyle: 'italic' }}>
                {space.aiPrompt}
              </p>
            </div>
            {space.aiResult && (
              <div className="mt-3 px-5 py-4 rounded-xl" style={{ background: 'rgba(246,214,255,0.08)', border: '1px solid rgba(246,214,255,0.25)' }}>
                <p className="text-xs font-medium mb-2" style={{ color: '#A9B8FF' }}>AI Result</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--rv-text-label)' }}>{space.aiResult}</p>
              </div>
            )}
          </Section>
        )}
      </div>

      {/* Comments */}
      <div className="mt-8">
        <div className="rounded-2xl p-6"
          style={{ background: 'var(--rv-card-subtle)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 12px rgba(106,127,219,0.05)' }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm" style={{ color: '#A9B8FF' }}>◎</span>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-widest" style={{ color: '#A9B8FF' }}>
              Comments {comments.length > 0 && `(${comments.length})`}
            </h3>
          </div>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <textarea ref={textareaRef} value={commentText} onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts…" rows={3} maxLength={500}
                    className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ background: 'var(--rv-input)', border: '1.5px solid var(--rv-border-input)', color: 'var(--rv-text)' }}
                    onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.08)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }} />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs" style={{ color: 'var(--rv-text-pale)' }}>{commentText.length}/500</span>
                    <div className="flex items-center gap-3">
                      {commentError && <span className="text-xs" style={{ color: 'var(--rv-error)' }}>{commentError}</span>}
                      <button type="submit" disabled={submitting || !commentText.trim()}
                        className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
                        {submitting ? '…' : 'Post'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center"
              style={{ background: 'var(--rv-tag)', border: '1px solid var(--rv-border)', color: 'var(--rv-text-secondary)' }}>
              <Link to="/login" className="font-medium hover:underline" style={{ color: '#6A7FDB' }}>Sign in</Link>
              {' '}to leave a comment
            </div>
          )}

          {comments.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: 'var(--rv-text-pale)' }}>
              No comments yet. Be the first to share your thoughts.
            </p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c) => {
                const canDelete = !!(user && (user.id === c.user?._id || isOwner));
                return (
                  <li key={c._id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}>
                      {c.user?.avatarUrl
                        ? <img src={c.user.avatarUrl} alt={c.user.name} className="w-8 h-8 rounded-full object-cover" />
                        : c.user?.name?.charAt(0).toUpperCase()
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--rv-text)' }}>{c.user?.name}</span>
                          <span className="text-xs" style={{ color: 'var(--rv-text-pale)' }}>
                            {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteComment(c._id)}
                            disabled={deletingCommentId === c._id}
                            title="Delete comment"
                            className="p-1 rounded-lg opacity-40 hover:opacity-100 transition-opacity disabled:opacity-20 flex-shrink-0"
                            style={{ color: 'var(--rv-danger)' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--rv-text-label)' }}>{c.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Back */}
      <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--rv-border-divider)' }}>
        <Link to={fromCommunity ? '/community' : '/dashboard'} className="text-sm font-medium hover:underline" style={{ color: '#6A7FDB' }}>
          ← Back to {fromCommunity ? 'Community' : 'My Spaces'}
        </Link>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6"
      style={{ background: 'var(--rv-card-subtle)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border-divider)', boxShadow: '0 2px 12px rgba(106,127,219,0.05)' }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm" style={{ color: '#A9B8FF' }}>{icon}</span>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest" style={{ color: '#A9B8FF' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
