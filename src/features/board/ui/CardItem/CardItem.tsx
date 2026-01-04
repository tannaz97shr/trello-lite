"use client";

import type { CardEntity, CardId } from "../../model/types";
import { InlineTitle } from "../InlineTitle/InlineTitle";
import styles from "./card-item.module.scss";

type Props = {
  card: CardEntity;
  commentCount: number;
  onRename: (cardId: CardId, title: string) => void;
  onDelete: (cardId: CardId) => void;
  onOpenComments: (cardId: CardId) => void; // later: opens modal
};

export function CardItem({
  card,
  commentCount,
  onRename,
  onDelete,
  onOpenComments,
}: Props) {
  return (
    <div className={styles.card}>
      <InlineTitle
        value={card.title}
        ariaLabel="Edit card title"
        onSave={(t) => onRename(card.id, t)}
        className={styles.cardTitle}
      />

      <div className={styles.meta}>
        <button
          type="button"
          className={styles.commentsBtn}
          onClick={() => onOpenComments(card.id)}
        >
          Comments ({commentCount})
        </button>

        <button
          type="button"
          className={styles.danger}
          onClick={() => onDelete(card.id)}
          aria-label="Delete card"
          title="Delete card"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
