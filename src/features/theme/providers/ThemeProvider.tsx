"use client";

import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { selectThemeMode } from "../model/selectors";

/**
 * ThemeProvider
 * - Syncs Redux theme state with DOM
 * - Only side-effect: documentElement attribute
 * - No local state, no cascading renders
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return <>{children}</>;
}
