"use client";

import { useCardCommentsModal } from "../../hooks/useCardCommentsModal";
import { CardCommentsModalView } from "./CardCommentsModalView";

export function CardCommentsModalContainer() {
  const m = useCardCommentsModal();

  return (
    <CardCommentsModalView
      isOpen={m.isOpen}
      title={m.title}
      hasActiveCard={!!m.activeCard}
      draft={m.draft}
      onChangeDraft={m.setText}
      comments={m.comments}
      onClose={m.close}
      onAdd={m.add}
      onDelete={m.remove}
    />
  );
}
