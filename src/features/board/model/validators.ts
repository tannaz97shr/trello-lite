import type { BoardState, CardEntity, ListEntity } from "./types";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const isString = (v: unknown): v is string => typeof v === "string";
const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every(isString);

const isCardEntity = (v: unknown): v is CardEntity => {
  if (!isRecord(v)) return false;
  return isString(v.id) && isString(v.title);
};

const isListEntity = (v: unknown): v is ListEntity => {
  if (!isRecord(v)) return false;
  return isString(v.id) && isString(v.title) && isStringArray(v.cardIds);
};

/**
 * Runtime validation for persisted BoardState.
 * Keep it pragmatic: validate only what the UI/logic actually needs.
 */
export function validateBoardState(v: unknown): v is BoardState {
  if (!isRecord(v)) return false;

  // required top-level keys
  if (!isRecord(v.board)) return false;
  if (!isRecord(v.entities)) return false;
  if (!isRecord(v.entities.listsById)) return false;
  if (!isRecord(v.entities.cardsById)) return false;

  if (!isStringArray(v.entities.listIds)) return false;

  // validate lists
  for (const id of Object.keys(v.entities.listsById)) {
    const list = (v.entities.listsById as Record<string, unknown>)[id];
    if (!isListEntity(list)) return false;
  }

  // validate cards
  for (const id of Object.keys(v.entities.cardsById)) {
    const card = (v.entities.cardsById as Record<string, unknown>)[id];
    if (!isCardEntity(card)) return false;
  }

  // optional: comments slice if you have it
  if (v.entities.commentsByCardId !== undefined) {
    if (!isRecord(v.entities.commentsByCardId)) return false;
    // keep it light: just ensure arrays of comment objects with id/text
    for (const key of Object.keys(
      v.entities.commentsByCardId as Record<string, unknown>
    )) {
      const arr = (v.entities.commentsByCardId as Record<string, unknown>)[key];
      if (!Array.isArray(arr)) return false;
      for (const c of arr) {
        if (!isRecord(c)) return false;
        if (!isString(c.id) || !isString(c.text)) return false;
      }
    }
  }

  return true;
}
