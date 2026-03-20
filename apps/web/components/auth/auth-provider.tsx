"use client";

import type { AuthUser, LoginResponse } from "@satelite-guard/types";
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  ready: boolean;
  login: (session: LoginResponse) => void;
  logout: () => void;
}

const STORAGE_KEY = "satelite-guard-session";
const LEGACY_TOKEN_KEY = "sg_token";
const SESSION_EVENT = "satelite-guard-session-change";

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession() {
  if (typeof window === "undefined") {
    return {
      token: null,
      user: null,
      ready: false,
    };
  }

  const rawSession = window.localStorage.getItem(STORAGE_KEY);

  if (!rawSession) {
    const legacyToken = window.localStorage.getItem(LEGACY_TOKEN_KEY);

    return {
      token: legacyToken,
      user: null,
      ready: true,
    };
  }

  try {
    const parsed = JSON.parse(rawSession) as { token: string; user: AuthUser };
    return {
      token: parsed.token,
      user: parsed.user,
      ready: true,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return {
      token: null,
      user: null,
      ready: true,
    };
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SESSION_EVENT, handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SESSION_EVENT, handleStorage);
  };
}

function emitSessionChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SESSION_EVENT));
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSyncExternalStore(subscribe, readSession, readSession);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: session.token,
      user: session.user,
      ready: session.ready,
      login: (session) => {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ token: session.accessToken, user: session.user }),
        );
        window.localStorage.setItem(LEGACY_TOKEN_KEY, session.accessToken);
        emitSessionChange();
      },
      logout: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(LEGACY_TOKEN_KEY);
        emitSessionChange();
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
