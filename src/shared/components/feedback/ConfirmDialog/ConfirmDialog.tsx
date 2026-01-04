"use client";

import { useRef } from "react";
import styles from "./confirm-dialog.module.scss";

import { Button } from "@/shared/components/ui/Button/Button";
import { useEventListener } from "@/shared/hooks/useEventListener";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  danger = true,
  onConfirm,
  onClose,
}: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useOutsideClick(panelRef, onClose, open);

  // close on Escape
  useEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") onClose();
  });

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.title}>{title}</div>

        {description ? <div className={styles.desc}>{description}</div> : null}

        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
