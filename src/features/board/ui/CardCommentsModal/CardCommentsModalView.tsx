"use client";

import { EmptyState } from "@/shared/components/feedback/EmptyState/EmptyState";
import { Button } from "@/shared/components/ui/Button/Button";
import { IconButton } from "@/shared/components/ui/IconButton/IconButton";
import { Input } from "@/shared/components/ui/Input/Input";
import { Modal } from "@/shared/components/ui/Modal/Modal";

import type { CommentEntity, CommentId } from "../../model/types";
import styles from "./card-comments-modal.module.scss";

type Props = {
  isOpen: boolean;
  title: string;
  hasActiveCard: boolean;

  draft: string;
  onChangeDraft: (v: string) => void;

  comments: CommentEntity[];
  onClose: () => void;
  onAdd: () => void;
  onDelete: (commentId: CommentId) => void;
};

export function CardCommentsModalView({
  isOpen,
  title,
  hasActiveCard,
  draft,
  onChangeDraft,
  comments,
  onClose,
  onAdd,
  onDelete,
}: Props) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      {!hasActiveCard ? (
        <EmptyState
          title="No active card selected"
          description="Open a card to view and add comments."
        />
      ) : (
        <div className={styles.wrap}>
          <div className={styles.addRow}>
            <Input
              className={styles.input}
              value={draft}
              placeholder="Write a comment…"
              onChange={(e) => onChangeDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAdd();
              }}
            />

            <Button
              type="button"
              variant="primary"
              className={styles.primary}
              onClick={onAdd}
              disabled={!draft.trim()}
            >
              Add
            </Button>
          </div>

          <div className={styles.list}>
            {comments.length === 0 ? (
              <EmptyState
                title="No comments yet"
                description="Add the first comment above."
              />
            ) : (
              comments.map((c) => (
                <div key={c.id} className={styles.comment}>
                  <div className={styles.commentText}>{c.text}</div>

                  <IconButton
                    type="button"
                    className={styles.danger}
                    onClick={() => onDelete(c.id)}
                    aria-label="Delete comment"
                    title="Delete comment"
                  >
                    ✕
                  </IconButton>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
