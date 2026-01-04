"use client";

import { useAppSelector } from "@/store/hooks";
import { useBoardActions } from "../../hooks/useBoardActions";
import { selectBoardMeta } from "../../model/selectors";
import BoardCanvasClient from "../BoardCanvas/BoardCanvasContainer.client";
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
      <BoardCanvasClient />
      <CardCommentsModalContainer />
    </BoardPageView>
  );
}
