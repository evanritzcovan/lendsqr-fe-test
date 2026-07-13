'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { AUTH_SESSION_KEY, TEST_CREDENTIALS } from '@/lib/constants';

const AUTH_CHANGE_EVENT = 'lendsqr-auth-change';

function subscribe(callback: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => window.removeEventListener(AUTH_CHANGE_EVENT, callback);
}

function getAuthSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }

  return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
}

function getServerSnapshot() {
  return false;
}

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    getAuthSnapshot,
    getServerSnapshot,
  );

  const login = useCallback((email: string, password: string) => {
    const isValid =
      email === TEST_CREDENTIALS.email &&
      password === TEST_CREDENTIALS.password;

    if (isValid) {
      setAuthSession(true);
    }

    return isValid;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    notifyAuthChange();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading: false,
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function setAuthSession(authenticated: boolean) {
  if (authenticated) {
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }

  notifyAuthChange();
}
