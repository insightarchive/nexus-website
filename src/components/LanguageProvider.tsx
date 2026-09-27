"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "en" | "bn";

const STORAGE_KEY = "nexus-lang";
const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

// Server-rendered HTML is always English; a mismatched client value is
// applied right after hydration by useSyncExternalStore, no effect needed.
function getServerSnapshot(): Lang {
  return "en";
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeStoredLang(next: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable (private browsing, blocked cookies, etc.) — the
    // listener notification below still updates this tab's UI in-memory.
  }
  listeners.forEach((listener) => listener());
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, getServerSnapshot);
  const setLang = useCallback((next: Lang) => writeStoredLang(next), []);
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}

/** Picks the string for the current language out of a {en, bn} pair. */
export function pick<T>(lang: Lang, dict: { en: T; bn: T }): T {
  return dict[lang];
}
