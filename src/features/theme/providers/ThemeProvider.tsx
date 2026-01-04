"use client";

import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { selectThemeMode } from "../model/selectors";
import { themeActions } from "../model/themeSlice";

const THEME_KEY = "trello_lite_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const ls = useLocalStorage();

  // hydrate once
  useEffect(() => {
    const saved = ls.get<"light" | "dark">(THEME_KEY);
    if (saved) dispatch(themeActions.setTheme(saved));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync to DOM + persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    ls.set(THEME_KEY, mode);
  }, [mode, ls]);

  return <>{children}</>;
}
