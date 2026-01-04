import type { CardId, ListId } from "../../model/types";

export const DND_PREFIX = {
  LIST: "list",
  CARD: "card",
} as const;

export type DndListId = `list:${string}`;
export type DndCardId = `card:${string}`;

export function toDndListId(listId: ListId): DndListId {
  return `list:${String(listId)}`;
}

export function toDndCardId(cardId: CardId): DndCardId {
  return `card:${String(cardId)}`;
}
