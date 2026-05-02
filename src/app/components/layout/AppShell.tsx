import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../AuthContext';

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #F0F7FC 0%, #FFFEFB 50%, #FFF5FB 100%)' }}>
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
          background: 'rgba(255, 254, 251, 0.88)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(169, 184, 255, 0.18)',
          boxShadow: '4px 0 32px rgba(106, 127, 219, 0.07)',
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(169,184,255,0.12)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6A7FDB 0%, #A9B8FF 100%)', boxShadow: '0 4px 15px rgba(106,127,219,0.35)' }}
            >
              <span className="text-white text-base select-none">✦</span>
            </div>
            <div>
              <h1 className="font-heading font-semibold text-xl leading-none" style={{ color: '#2C2C3E' }}>
                Reverie
              </h1>
              <p className="text-xs mt-0.5" style={{ color: '#A9B8FF' }}>Mood Space</p>
            </div>
          </div>
        </div>

        {/* User card */}
        <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(169,184,255,0.12)' }}>
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
            style={{ background: 'rgba(169,184,255,0.08)' }}
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
              <p className="text-sm font-medium truncate" style={{ color: '#2C2C3E' }}>{user?.name}</p>
              <p className="text-xs truncate" style={{ color: '#A9B8FF' }}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-3 px-3" style={{ color: '#C4CFFF' }}>
            Navigation
          </p>
          <SidebarLink to="/dashboard" icon="◈" label="My Spaces" onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/create"    icon="✦" label="Create New" onClick={() => setMobileOpen(false)} />
          <SidebarLink to="/profile"   icon="◉" label="Profile" onClick={() => setMobileOpen(false)} />
        </nav>

        {/* Logout */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(169,184,255,0.12)' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-50"
            style={{ color: '#c77d7d' }}
          >
            <span className="text-base">⎋</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Mobile top bar */}
        <header
          className="lg:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-10"
          style={{
            background: 'rgba(255,254,251,0.92)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(169,184,255,0.15)',
          }}
        >
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
          <div className="flex items-center gap-2">
            <span style={{ color: '#6A7FDB' }}>✦</span>
            <span className="font-heading font-semibold" style={{ color: '#2C2C3E' }}>Reverie</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  to, icon, label, onClick,
}: { to: string; icon: string; label: string; onClick?: () => void }) {
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
          : { color: '#6B7DA8' }
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
