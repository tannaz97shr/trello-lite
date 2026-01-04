"use client";

import { BoardHeader } from "@/shared/components/layout/BoardHeader/BoardHeader";
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
      <BoardHeader
        title={boardTitle}
        rightSlot={
          <div className={styles.inlineTitleWrap}>
            <InlineTitle value={boardTitle} onSave={onRenameBoard} />
          </div>
        }
      />
      {children}
    </div>
  );
}
