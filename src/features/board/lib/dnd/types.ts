import type { Active, Over } from "@dnd-kit/core";
import type { CardId, ListId } from "../../model/types";

export type DragKind = "LIST" | "CARD";

export type DragData =
  | { kind: "LIST"; listId: ListId }
  | { kind: "CARD"; cardId: CardId; fromListId: ListId };

export type DndResult =
  | {
      kind: "LIST";
      activeListId: ListId;
      overListId: ListId;
    }
  | {
      kind: "CARD";
      cardId: CardId;
      fromListId: ListId;
      toListId: ListId;
      overCardId?: CardId;
    }
  | null;

export type ActiveOver = { active: Active; over: Over | null };
