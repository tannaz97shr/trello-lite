"use client";

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
        <div className={styles.empty}>No active card selected.</div>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.addRow}>
            <input
              className={styles.input}
              value={draft}
              placeholder="Write a comment…"
              onChange={(e) => onChangeDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAdd();
              }}
            />
            <button type="button" className={styles.primary} onClick={onAdd}>
              Add
            </button>
          </div>

          <div className={styles.list}>
            {comments.length === 0 ? (
              <div className={styles.empty}>No comments yet.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className={styles.comment}>
                  <div className={styles.commentText}>{c.text}</div>
                  <button
                    type="button"
                    className={styles.danger}
                    onClick={() => onDelete(c.id)}
                    aria-label="Delete comment"
                    title="Delete comment"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
