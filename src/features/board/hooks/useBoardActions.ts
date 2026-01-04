"use client";

import { useAppDispatch } from "@/store/hooks";
import { useCallback } from "react";
import { boardActions } from "../model/boardSlice";
import type { CardId, ListId } from "../model/types";

export function useBoardActions() {
  const dispatch = useAppDispatch();

  return {
    updateBoardTitle: useCallback(
      (title: string) => dispatch(boardActions.updateBoardTitle({ title })),
      [dispatch]
    ),

    addList: useCallback(() => dispatch(boardActions.addList({})), [dispatch]),
    renameList: useCallback(
      (listId: ListId, title: string) =>
        dispatch(boardActions.renameList({ listId, title })),
      [dispatch]
    ),
    deleteList: useCallback(
      (listId: ListId) => dispatch(boardActions.deleteList({ listId })),
      [dispatch]
    ),

    addCard: useCallback(
      (listId: ListId) => dispatch(boardActions.addCard({ listId })),
      [dispatch]
    ),
    renameCard: useCallback(
      (cardId: CardId, title: string) =>
        dispatch(boardActions.renameCard({ cardId, title })),
      [dispatch]
    ),
    deleteCard: useCallback(
      (cardId: CardId) => dispatch(boardActions.deleteCard({ cardId })),
      [dispatch]
    ),

    openComments: useCallback(
      (cardId: CardId) => dispatch(boardActions.openCommentsModal({ cardId })),
      [dispatch]
    ),
    moveList: useCallback(
      (activeListId: ListId, overListId: ListId) =>
        dispatch(boardActions.moveList({ activeListId, overListId })),
      [dispatch]
    ),

    moveCard: useCallback(
      (
        cardId: CardId,
        fromListId: ListId,
        toListId: ListId,
        overCardId: CardId | undefined
      ) =>
        dispatch(
          boardActions.moveCard({ cardId, fromListId, toListId, overCardId })
        ),
      [dispatch]
    ),
  };
}
