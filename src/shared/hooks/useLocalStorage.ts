"use client";
import { useCallback } from "react";

export function useLocalStorage() {
  const get = useCallback(<T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }, []);

  const set = useCallback((key: string, value: unknown) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, []);

  const remove = useCallback((key: string) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {}
  }, []);

  return { get, set, remove };
}
