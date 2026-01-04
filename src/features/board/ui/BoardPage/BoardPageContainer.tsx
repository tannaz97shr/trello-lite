"use client";

import { useAppSelector } from "@/store/hooks";
import { useBoardActions } from "../../hooks/useBoardActions";
import { selectBoardMeta } from "../../model/selectors";
import { BoardCanvasContainer } from "../BoardCanvas/BoardCanvasContainer";
import { CardCommentsModalContainer } from "../CardCommentsModal/CardCommentsModalContainer";
import { BoardPageView } from "./BoardPageView";

export function BoardPageContainer() {
  const board = useAppSelector(selectBoardMeta);
  const actions = useBoardActions();

  return (
    <BoardPageView
      boardTitle={board.title}
      onRenameBoard={actions.updateBoardTitle}
    >
      <BoardCanvasContainer />
      <CardCommentsModalContainer />
    </BoardPageView>
  );
}
