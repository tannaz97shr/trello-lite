"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";
import { parseDndResult } from "../lib/dnd/parse";
import type { ActiveOver } from "../lib/dnd/types";
import { useBoardActions } from "./useBoardActions";

export function useDndBoard() {
  const actions = useBoardActions();

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const payload = parseDndResult(event as unknown as ActiveOver);
      if (!payload) return;

      if (payload.kind === "LIST") {
        actions.moveList(payload.activeListId, payload.overListId);
        return;
      }

      // CARD
      actions.moveCard(
        payload.cardId,
        payload.fromListId,
        payload.toListId,
        payload.overCardId
      );
    },
    [actions]
  );

  return { onDragEnd };
}
