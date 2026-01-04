"use client";

import { useAppSelector } from "@/store/hooks";
import { useBoardActions } from "../../hooks/useBoardActions";
import { useDndBoard } from "../../hooks/useDndBoard";
import {
  selectBoardColumns,
  selectCommentCountByCardId,
} from "../../model/selectors";
import { BoardCanvasView } from "./BoardCanvasView";

export function BoardCanvasContainer() {
  const columns = useAppSelector(selectBoardColumns);
  const commentCountByCardId = useAppSelector(selectCommentCountByCardId);

  const actions = useBoardActions();
  const dnd = useDndBoard();

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
    />
  );
}
