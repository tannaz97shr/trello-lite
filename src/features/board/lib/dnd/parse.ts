import type { CardId, ListId } from "../../model/types";
import type { ActiveOver, DndResult, DragData } from "./types";

function isDragData(x: unknown): x is DragData {
  return typeof x === "object" && x !== null && "kind" in x;
}

export function parseDndResult({ active, over }: ActiveOver): DndResult {
  if (!over) return null;

  const a = active.data.current;
  const o = over.data.current;

  if (!isDragData(a) || !isDragData(o)) return null;

  // LIST -> LIST
  if (a.kind === "LIST" && o.kind === "LIST") {
    if (a.listId === o.listId) return null;
    return { kind: "LIST", activeListId: a.listId, overListId: o.listId };
  }

  // CARD cases
  if (a.kind === "CARD") {
    const cardId = a.cardId;
    const fromListId = a.fromListId;

    // Dropped over a CARD
    if (o.kind === "CARD") {
      const toListId = o.fromListId;
      const overCardId = o.cardId as CardId;
      return { kind: "CARD", cardId, fromListId, toListId, overCardId };
    }

    // Dropped over a LIST container (empty area)
    if (o.kind === "LIST") {
      const toListId = o.listId as ListId;
      return { kind: "CARD", cardId, fromListId, toListId };
    }
  }

  return null;
}
