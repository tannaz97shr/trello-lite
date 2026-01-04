"use client";

import { InlineTitle } from "../InlineTitle/InlineTitle";
import styles from "./board-page.module.scss";

export function BoardPageView({
  boardTitle,
  onRenameBoard,
  children,
}: {
  boardTitle: string;
  onRenameBoard: (title: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <InlineTitle
          value={boardTitle}
          onSave={onRenameBoard}
          className={styles.boardTitle}
        />
      </header>
      {children}
    </div>
  );
}
