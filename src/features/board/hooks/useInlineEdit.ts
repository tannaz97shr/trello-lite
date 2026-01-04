"use client";

import { useCallback, useState } from "react";

export function useInlineEdit(value: string, onSave: (v: string) => void) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const start = useCallback(() => {
    setDraft(value);
    setIsEditing(true);
  }, [value]);

  const cancel = useCallback(() => {
    setDraft(value);
    setIsEditing(false);
  }, [value]);

  const commit = useCallback(() => {
    const next = draft.trim();
    if (next && next !== value) onSave(next);
    setIsEditing(false);
  }, [draft, value, onSave]);

  return {
    isEditing,
    draft,
    setDraft,
    start,
    cancel,
    commit,
  };
}
