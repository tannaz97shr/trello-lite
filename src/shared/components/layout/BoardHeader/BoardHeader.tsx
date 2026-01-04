"use client";

import { ThemeToggleIconButton } from "@/features/theme/ui/ThemeToggleIconButton";
import styles from "./board-header.module.scss";

type Props = {
  title: string;
  rightSlot?: React.ReactNode;
};

export function BoardHeader({ title, rightSlot }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.brand} aria-label="Trello Lite">
          <span className={styles.dot} />
          <span className={styles.brandText}>Trello Lite</span>
        </div>

        <div className={styles.divider} />

        <h1 className={styles.title} title={title}>
          {title}
        </h1>
      </div>

      <div className={styles.right}>
        {rightSlot}
        <ThemeToggleIconButton />
      </div>
    </header>
  );
}
