import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Sun, Moon, Bookmark, Clock } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { useTheme } from '../../ThemeContext';
import { getLogoByTheme } from '../../../assets/logos';
import { AmbientPlayerProvider } from '../../AmbientPlayerContext';
import AmbientPlayer from './AmbientPlayer';

export default function AppShell() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AmbientPlayerProvider>
    <div className="min-h-screen flex" style={{ background: 'var(--rv-bg)' }}>
      {/* Decorative ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #A9B8FF, transparent 70%)' }} />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #F6D6FF, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #FFB8A3, transparent 70%)' }} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(44,44,62,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'var(--rv-sidebar)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid var(--rv-border-sidebar)',
          boxShadow: '4px 0 32px rgba(106, 127, 219, 0.07)',
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6" style={{ borderBottom: '1px solid var(--rv-border-divider)' }}>
          <div className="flex items-center gap-3">
            <img
              src={getLogoByTheme(isDark, 'icon')}
              alt="Reverie"
              className="w-10 h-10 object-contain flex-shrink-0"
            />
            <div>
              <h1 className="font-heading font-semibold text-xl leading-none" style={{ color: 'var(--rv-text)' }}>
                Reverie
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--rv-text-muted)' }}>Mood Space</p>
            </div>
          </div>
        </div>

        {/* User card */}
        <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--rv-border-divider)' }}>
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
            style={{ background: 'var(--rv-user-card)' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6A7FDB, #F6D6FF)' }}
            >
              {user?.avatarUrl
                ? <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                : user?.name?.charAt(0).toUpperCase()
              }
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--rv-text)' }}>{user?.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--rv-text-muted)' }}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-3 px-3" style={{ color: 'var(--rv-text-pale)' }}>
            Navigation
          </p>
          <SidebarLink to="/dashboard"  icon="◈"                      label="My Spaces"  onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/community" icon="✧"                      label="Community"  onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/saved"     icon={<Bookmark size={15} />} label="Saved"      onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/timeline"  icon={<Clock size={15} />}    label="Timeline"   onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/create"    icon="✦"                      label="Create New" onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/profile"   icon="◉"                      label="Profile"    onClick={() => setMobileOpen(false)} />
        </nav>

        {/* Ambient player */}
        <div className="px-4 pb-3">
          <AmbientPlayer />
        </div>

        {/* Bottom actions: theme toggle + sign out */}
        <div className="px-4 py-4 space-y-1" style={{ borderTop: '1px solid var(--rv-border-divider)' }}>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: 'var(--rv-text-soft)', background: 'var(--rv-user-card)' }}
            aria-label="Toggle theme"
          >
            <span className="w-5 flex items-center justify-center flex-shrink-0">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </span>
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-50"
            style={{ color: 'var(--rv-danger)' }}
          >
            <span className="text-base w-5 text-center">⎋</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Mobile top bar */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-10"
          style={{
            background: 'var(--rv-topbar)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--rv-border-divider)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl transition-colors hover:bg-indigo-50"
              aria-label="Open menu"
            >
              <svg width="20" height="20" fill="none" stroke="#6A7FDB" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="12" x2="17" y2="12" />
                <line x1="3" y1="18" x2="17" y2="18" />
              </svg>
            </button>
            <img src={getLogoByTheme(isDark, 'icon')} alt="Reverie" className="w-7 h-7 object-contain" />
            <span className="font-heading font-semibold" style={{ color: 'var(--rv-text)' }}>Reverie</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-colors"
            style={{ color: 'var(--rv-text-soft)', background: 'var(--rv-user-card)' }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
    </AmbientPlayerProvider>
  );
}

function SidebarLink({
  to, icon, label, onClick,
}: { to: string; icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
      style={({ isActive }) =>
        isActive
          ? {
              background: 'linear-gradient(135deg, #6A7FDB 0%, #A9B8FF 100%)',
              color: 'white',
              boxShadow: '0 4px 16px rgba(106,127,219,0.28)',
            }
          : { color: 'var(--rv-text-soft)' }
      }
    >
      {({ isActive }) => (
        <>
          <span className="text-base w-5 text-center" style={{ opacity: isActive ? 1 : 0.7 }}>
            {icon}
          </span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
