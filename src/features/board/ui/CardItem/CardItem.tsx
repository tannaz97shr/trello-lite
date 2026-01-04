"use client";

import { useMemo, useState } from "react";

import type { CardEntity, CardId, ListId } from "../../model/types";
import { InlineTitle } from "../InlineTitle/InlineTitle";
import styles from "./card-item.module.scss";

import { ConfirmDialog } from "@/shared/components/feedback/ConfirmDialog/ConfirmDialog";
import { Button, IconButton } from "@/shared/components/ui";
import { Modal } from "@/shared/components/ui/Modal/Modal";

type ListOption = { id: ListId; title: string };

type Props = {
  card: CardEntity;
  commentCount: number;

  currentListId: ListId;

  /** make it tolerant; container might pass undefined during hydration */
  lists?: ListOption[];

  onMove: (cardId: CardId, toListId: ListId) => void;

  onRename: (cardId: CardId, title: string) => void;
  onDelete: (cardId: CardId) => void;
  onOpenComments: (cardId: CardId) => void;
};

export function CardItem({
  card,
  commentCount,
  currentListId,
  lists,
  onMove,
  onRename,
  onDelete,
  onOpenComments,
}: Props) {
  const safeLists = lists ?? [];

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [targetListId, setTargetListId] = useState<ListId>(currentListId);

  const currentTitle = useMemo(() => {
    return (
      safeLists.find((l) => l.id === currentListId)?.title ?? "Current list"
    );
  }, [safeLists, currentListId]);

  const targetTitle = useMemo(() => {
    return safeLists.find((l) => l.id === targetListId)?.title ?? "Target list";
  }, [safeLists, targetListId]);

  // If lists are missing/empty, don't show the move UI (prevents weird UX)
  const canMove = safeLists.length > 0;

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

        {canMove ? (
          <IconButton
            type="button"
            className={styles.moveBtn}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setTargetListId(currentListId);
              setMoveOpen(true);
            }}
            aria-label="Move card"
            title="Move card"
          >
            ⇄
          </IconButton>
        ) : null}

        <IconButton
          type="button"
          className={styles.danger}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setConfirmOpen(true);
          }}
          aria-label="Delete card"
          title="Delete card"
        >
          ✕
        </IconButton>
      </div>

      {canMove ? (
        <Modal
          isOpen={moveOpen}
          title="Move card"
          onClose={() => setMoveOpen(false)}
        >
          <div className={styles.moveWrap}>
            <div className={styles.moveHint}>
              Move from <b>{currentTitle}</b> to:
            </div>

            <select
              className={styles.select}
              value={targetListId}
              onChange={(e) => setTargetListId(e.target.value as ListId)}
            >
              {safeLists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title || "Untitled"}
                </option>
              ))}
            </select>

            <div className={styles.moveActions}>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setMoveOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  onMove(card.id, targetListId);
                  setMoveOpen(false);
                }}
                disabled={targetListId === currentListId}
              >
                Move to {targetTitle}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete card?"
        description="This action can't be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onDelete(card.id)}
      />
    </div>
  );
}
