"use client";

import { IconButton } from "@/shared/components/ui/IconButton/IconButton";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

type Props = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, title, onClose, children }: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close modal"
        onClick={onClose}
      />

      <div className={styles.panel}>
        <div className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : <div />}

          <IconButton
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            ✕
          </IconButton>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
