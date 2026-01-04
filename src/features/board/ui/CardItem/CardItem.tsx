"use client";

import { useCallback, useState } from "react";

import { ConfirmDialog } from "@/shared/components/feedback/ConfirmDialog/ConfirmDialog";
import { Button } from "@/shared/components/ui/Button/Button";
import { IconButton } from "@/shared/components/ui/IconButton/IconButton";
import type { CardEntity, CardId } from "../../model/types";
import { InlineTitle } from "../InlineTitle/InlineTitle";
import styles from "./card-item.module.scss";

type Props = {
  card: CardEntity;
  commentCount: number;
  onRename: (cardId: CardId, title: string) => void;
  onDelete: (cardId: CardId) => void;
  onOpenComments: (cardId: CardId) => void;
};

export function CardItem({
  card,
  commentCount,
  onRename,
  onDelete,
  onOpenComments,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openConfirm = useCallback(() => setConfirmOpen(true), []);
  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  return (
    <div className={styles.card}>
      <InlineTitle
        value={card.title}
        ariaLabel="Edit card title"
        onSave={(t) => onRename(card.id, t)}
        className={styles.cardTitle}
      />

      <div className={styles.meta}>
        <Button
          type="button"
          variant="ghost"
          className={styles.commentsBtn}
          onClick={() => onOpenComments(card.id)}
        >
          Comments ({commentCount})
        </Button>

        <IconButton
          type="button"
          className={styles.danger}
          onClick={openConfirm}
          aria-label="Delete card"
          title="Delete card"
        >
          ✕
        </IconButton>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete card?"
        description="This action can't be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onClose={closeConfirm}
        onConfirm={() => onDelete(card.id)}
      />
    </div>
  );
}
