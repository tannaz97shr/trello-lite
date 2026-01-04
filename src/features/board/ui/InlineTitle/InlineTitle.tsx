"use client";

import { Button } from "@/shared/components/ui/Button/Button";
import { Input } from "@/shared/components/ui/Input/Input";
import { useEffect, useRef } from "react";
import { useInlineEdit } from "../../hooks/useInlineEdit";
import styles from "./inline-title.module.scss";

type Props = {
  value: string;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  onSave: (nextValue: string) => void;
};

export function InlineTitle({
  value,
  placeholder,
  ariaLabel,
  className,
  onSave,
}: Props) {
  const e = useInlineEdit(value, onSave);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (e.isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [e.isEditing]);

  if (!e.isEditing) {
    return (
      <Button
        type="button"
        variant="ghost"
        className={[styles.view, className].filter(Boolean).join(" ")}
        onClick={e.start}
        onDoubleClick={e.start}
        aria-label={ariaLabel ?? "Edit title"}
      >
        <span className={styles.viewText}>
          {value || placeholder || "Untitled"}
        </span>
      </Button>
    );
  }

  return (
    <Input
      ref={inputRef}
      className={[styles.input, className].filter(Boolean).join(" ")}
      value={e.draft}
      placeholder={placeholder}
      aria-label={ariaLabel ?? "Title"}
      onChange={(ev) => e.setDraft(ev.target.value)}
      onBlur={e.commit}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") e.commit();
        if (ev.key === "Escape") e.cancel();
      }}
    />
  );
}
