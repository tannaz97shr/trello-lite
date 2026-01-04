// src/features/board/ui/BoardCanvas/BoardCanvasContainer.tsx
"use client";

import { useCallback, useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { useBoardActions } from "../../hooks/useBoardActions";
import { useDndBoard } from "../../hooks/useDndBoard";
import {
  selectBoardColumns,
  selectCommentCountByCardId,
} from "../../model/selectors";
import type { CardId, ListId } from "../../model/types";
import { BoardCanvasView } from "./BoardCanvasView";

export function BoardCanvasContainer() {
  const columns = useAppSelector(selectBoardColumns);
  const commentCountByCardId = useAppSelector(selectCommentCountByCardId);

  const actions = useBoardActions();
  const dnd = useDndBoard();

  const allLists = useMemo(
    () => columns.map((c) => ({ id: c.list.id, title: c.list.title })),
    [columns]
  );

  // ✅ adapter for mobile "Move" button (cardId -> target list)
  const onMoveCard = useCallback(
    (cardId: CardId, toListId: ListId) => {
      const fromColumn = columns.find((c) =>
        c.cards.some((x) => x.id === cardId)
      );
      const fromListId = fromColumn?.list.id;

      // If not found, do nothing (or you can throw AppError if you prefer)
      if (!fromListId) return;

      // Move to end of target list (overCardId undefined)
      actions.moveCard(cardId, fromListId, toListId, undefined);
    },
    [columns, actions]
  );

  return (
    <BoardCanvasView
      columns={columns}
      commentCountByCardId={commentCountByCardId}
      onDragEnd={dnd.onDragEnd}
      onAddList={actions.addList}
      onRenameList={actions.renameList}
      onDeleteList={actions.deleteList}
      onAddCard={actions.addCard}
      onRenameCard={actions.renameCard}
      onDeleteCard={actions.deleteCard}
      onOpenComments={actions.openComments}
      allLists={allLists}
      onMoveCard={onMoveCard}
    />
  );
}
