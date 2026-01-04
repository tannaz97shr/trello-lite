"use client";

import { Button } from "@/shared/components/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectThemeMode } from "../model/selectors";
import { themeActions } from "../model/themeSlice";
import styles from "./theme-toggle.module.scss";

export function ThemeToggle() {
  const mode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  return (
    <Button
      type="button"
      variant="ghost"
      className={styles.btn}
      onClick={() => dispatch(themeActions.toggleTheme())}
    >
      Theme: {mode}
    </Button>
  );
}
