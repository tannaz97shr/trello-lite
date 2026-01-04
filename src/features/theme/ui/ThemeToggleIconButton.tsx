"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectThemeMode } from "../model/selectors";
import { themeActions } from "../model/themeSlice";
import styles from "./theme-toggle-icon-button.module.scss";

export function ThemeToggleIconButton() {
  const mode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={styles.btn}
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => dispatch(themeActions.toggleTheme())}
    >
      {mode === "dark" ? "☾" : "☀︎"}
    </button>
  );
}
