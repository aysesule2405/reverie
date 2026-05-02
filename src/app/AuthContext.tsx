import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

export interface PlaylistTrack {
  _id?: string;
  name: string;
  type: 'default' | 'upload' | 'external';
  url: string;
  createdAt?: string;
}

// Kept for backward compatibility with AmbientPlayerContext
export type BackgroundMusic = PlaylistTrack;

export interface MusicSettings {
  volume: number;
  loop: boolean;
}

export interface ProfileUpdateData {
  name: string;
  avatarUrl?: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  backgroundMusicPlaylist?: PlaylistTrack[];
  activeBackgroundTrack?: PlaylistTrack | null;
  musicSettings?: MusicSettings;
} | null;

interface AuthContextValue {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  updateProfile: async () => {},
  refreshUser: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then((res) => setUser(res.user))
        .catch(() => { localStorage.removeItem('token'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const refreshUser = async () => {
    const res = await api.get('/auth/me');
    setUser(res.user);
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    const res = await api.put('/profile', data);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
