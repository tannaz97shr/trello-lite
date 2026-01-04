import type { RootState } from "@/store/rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import type { ListId } from "./types";

// -----------------------------
// Base selectors
// -----------------------------
export const selectBoardMeta = (state: RootState) => state.board.board;

export const selectListOrder = (state: RootState) => state.board.listOrder;

export const selectListsById = (state: RootState) => state.board.listsById;

export const selectCardsById = (state: RootState) => state.board.cardsById;

export const selectCommentsById = (state: RootState) =>
  state.board.commentsById;

export const selectUI = (state: RootState) => state.board.ui;

// -----------------------------
// Memoized derived selectors
// -----------------------------

/** Lists sorted by board order */
export const selectListsInOrder = createSelector(
  [selectListOrder, selectListsById],
  (order, byId) => order.map((id) => byId[id]).filter(Boolean)
);

/**
 * Columns ready for rendering: [{ list, cards }]
 * View components can stay "dumb" (no mapping logic).
 */
export const selectBoardColumns = createSelector(
  [selectListsInOrder, selectCardsById],
  (lists, cardsById) =>
    lists.map((list) => ({
      list,
      cards: list.cardIds.map((cid) => cardsById[cid]).filter(Boolean),
    }))
);

/** If you still need cards-for-list somewhere else */
export const selectCardsForList = (listId: ListId) =>
  createSelector([selectListsById, selectCardsById], (listsById, cardsById) => {
    const list = listsById[listId];
    if (!list) return [];
    return list.cardIds.map((cid) => cardsById[cid]).filter(Boolean);
  });

/**
 * Comment count per card (stable reference unless commentsById changes)
 */
export const selectCommentCountByCardId = createSelector(
  [selectCommentsById],
  (commentsById) => {
    const map: Record<string, number> = {};
    for (const c of Object.values(commentsById)) {
      map[c.cardId] = (map[c.cardId] ?? 0) + 1;
    }
    return map;
  }
);

// -----------------------------
// Active card + comments (modal)
// -----------------------------
export const selectActiveCard = createSelector(
  [selectUI, selectCardsById],
  (ui, cardsById) =>
    ui.activeCardId ? cardsById[ui.activeCardId] ?? null : null
);

export const selectActiveCardComments = createSelector(
  [selectUI, selectCardsById, selectCommentsById],
  (ui, cardsById, commentsById) => {
    if (!ui.activeCardId) return [];
    const card = cardsById[ui.activeCardId];
    if (!card) return [];
    return card.commentIds.map((id) => commentsById[id]).filter(Boolean);
  }
);
