// src/features/board/hooks/useCardCommentsModal.ts
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { boardActions } from "../model/boardSlice";
import {
  selectActiveCard,
  selectActiveCardComments,
  selectUI,
} from "../model/selectors";
import type { CardId, CommentId } from "../model/types";

/**
 * Modal state + comment CRUD (feature hook)
 * - Keeps UI draft state locally
 * - Uses Redux for source of truth
 * - Exposes a clean API for container/presentational split
 */
export function useCardCommentsModal() {
  const dispatch = useAppDispatch();

  const ui = useAppSelector(selectUI);
  const activeCard = useAppSelector(selectActiveCard);
  const comments = useAppSelector(selectActiveCardComments);

  const [draft, setDraft] = useState("");

  const isOpen = ui.isCommentsModalOpen;

  const title = useMemo(() => {
    if (!activeCard) return "Comments";
    return `Comments: ${activeCard.title}`;
  }, [activeCard]);

  const open = useCallback(
    (cardId: CardId) => {
      dispatch(boardActions.openCommentsModal({ cardId }));
    },
    [dispatch]
  );

  const close = useCallback(() => {
    setDraft("");
    dispatch(boardActions.closeCommentsModal());
  }, [dispatch]);

  const setText = useCallback((value: string) => {
    setDraft(value);
  }, []);

  const add = useCallback(() => {
    if (!activeCard) return;

    const text = draft.trim();
    if (!text) return;

    dispatch(boardActions.addComment({ cardId: activeCard.id, text }));
    setDraft("");
  }, [dispatch, activeCard, draft]);

  const remove = useCallback(
    (commentId: CommentId) => {
      dispatch(boardActions.deleteComment({ commentId }));
    },
    [dispatch]
  );

  return {
    // state
    isOpen,
    title,
    activeCard,
    comments,
    draft,

    // actions
    open,
    close,
    setText,
    add,
    remove,
  };
}
