import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { createInitialBoardState } from "./initialState";
import type {
  AddCommentPayload,
  BoardState,
  CardId,
  CommentId,
  CreateCardPayload,
  CreateListPayload,
  DeleteCardPayload,
  DeleteCommentPayload,
  DeleteListPayload,
  ISODateString,
  ListId,
  MoveCardPayload,
  MoveListPayload,
  OpenCommentsPayload,
  RenameCardPayload,
  RenameListPayload,
} from "./types";

/** Small helpers to keep reducers readable */
function nowIso(): ISODateString {
  return new Date().toISOString() as ISODateString;
}

function removeOnce<T>(arr: T[], value: T): boolean {
  const idx = arr.indexOf(value);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  return true;
}

function moveInArray<T>(arr: T[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return;
  if (fromIndex < 0 || fromIndex >= arr.length) return;
  if (toIndex < 0 || toIndex >= arr.length) return;

  const [item] = arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, item);
}

function insertAfter<T>(arr: T[], value: T, afterValue?: T) {
  if (!afterValue) {
    arr.push(value);
    return;
  }
  const idx = arr.indexOf(afterValue);
  if (idx === -1) {
    arr.push(value);
    return;
  }
  arr.splice(idx + 1, 0, value);
}

function insertBefore<T>(arr: T[], value: T, beforeValue?: T) {
  if (!beforeValue) {
    arr.push(value);
    return;
  }
  const idx = arr.indexOf(beforeValue);
  if (idx === -1) {
    arr.push(value);
    return;
  }
  arr.splice(idx, 0, value);
}

/**
 * Important: finding list by card by scanning lists is O(n).
 * For small Trello-lite it's fine. If you want, later add cardId->listId index.
 */
function findListIdContainingCard(
  state: BoardState,
  cardId: CardId
): ListId | null {
  for (const listId of state.listOrder) {
    const list = state.listsById[listId];
    if (list?.cardIds.includes(cardId)) return listId;
  }
  return null;
}

const initialState: BoardState = createInitialBoardState();

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    /** For localStorage hydration (validated outside preferably) */
    hydrateBoard(state, action: PayloadAction<BoardState>) {
      return action.payload;
    },

    resetBoard() {
      return createInitialBoardState();
    },

    updateBoardTitle(state, action: PayloadAction<{ title: string }>) {
      state.board.title = action.payload.title;
    },

    // -----------------------------
    // Lists
    // -----------------------------
    addList(state, action: PayloadAction<CreateListPayload>) {
      const id = `list_${nanoid(10)}` as unknown as ListId;
      const t = nowIso();

      const title = (action.payload.title ?? "New list").trim() || "New list";

      state.listsById[id] = {
        id,
        title,
        cardIds: [],
        createdAt: t,
        updatedAt: t,
      };

      insertAfter(state.listOrder, id, action.payload.afterListId);
    },

    renameList(state, action: PayloadAction<RenameListPayload>) {
      const { listId, title } = action.payload;
      const list = state.listsById[listId];
      if (!list) return;

      const next = title.trim();
      if (!next) return;

      list.title = next;
      list.updatedAt = nowIso();
    },

    deleteList(state, action: PayloadAction<DeleteListPayload>) {
      const { listId } = action.payload;
      const list = state.listsById[listId];
      if (!list) return;

      // Delete cards + their comments to avoid orphaned entities
      for (const cardId of list.cardIds) {
        const card = state.cardsById[cardId];
        if (card) {
          for (const commentId of card.commentIds) {
            delete state.commentsById[commentId];
          }
        }
        delete state.cardsById[cardId];
      }

      delete state.listsById[listId];
      removeOnce(state.listOrder, listId);

      // If UI modal is open for a card that got deleted, close it
      if (state.ui.activeCardId && !state.cardsById[state.ui.activeCardId]) {
        state.ui.activeCardId = null;
        state.ui.isCommentsModalOpen = false;
      }
    },

    moveList(state, action: PayloadAction<MoveListPayload>) {
      const { activeListId, overListId } = action.payload;
      const from = state.listOrder.indexOf(activeListId);
      const to = state.listOrder.indexOf(overListId);

      // If ids are invalid or same, no-op
      if (from === -1 || to === -1) return;

      moveInArray(state.listOrder, from, to);
    },

    // -----------------------------
    // Cards
    // -----------------------------
    addCard(state, action: PayloadAction<CreateCardPayload>) {
      const { listId, title, afterCardId } = action.payload;
      const list = state.listsById[listId];
      if (!list) return;

      const id = `card_${nanoid(10)}` as unknown as CardId;
      const t = nowIso();
      const nextTitle = (title ?? "New card").trim() || "New card";

      state.cardsById[id] = {
        id,
        title: nextTitle,
        commentIds: [],
        createdAt: t,
        updatedAt: t,
      };

      insertAfter(list.cardIds, id, afterCardId);
      list.updatedAt = t;
    },

    renameCard(state, action: PayloadAction<RenameCardPayload>) {
      const { cardId, title } = action.payload;
      const card = state.cardsById[cardId];
      if (!card) return;

      const next = title.trim();
      if (!next) return;

      card.title = next;
      card.updatedAt = nowIso();
    },

    deleteCard(state, action: PayloadAction<DeleteCardPayload>) {
      const { cardId } = action.payload;
      const card = state.cardsById[cardId];
      if (!card) return;

      // Remove from its list
      const listId = findListIdContainingCard(state, cardId);
      if (listId) {
        const list = state.listsById[listId];
        removeOnce(list.cardIds, cardId);
        list.updatedAt = nowIso();
      }

      // Delete comments
      for (const commentId of card.commentIds) {
        delete state.commentsById[commentId];
      }

      delete state.cardsById[cardId];

      // Close modal if this card was active
      if (state.ui.activeCardId === cardId) {
        state.ui.activeCardId = null;
        state.ui.isCommentsModalOpen = false;
      }
    },

    /**
     * Move card between lists (or within same list).
     * DnD layer should provide fromListId/toListId confidently.
     */
    moveCard(state, action: PayloadAction<MoveCardPayload>) {
      const { cardId, fromListId, toListId, overCardId } = action.payload;

      const fromList = state.listsById[fromListId];
      const toList = state.listsById[toListId];
      if (!fromList || !toList) return;

      // Card must exist
      const card = state.cardsById[cardId];
      if (!card) return;

      // Remove from source list
      const removed = removeOnce(fromList.cardIds, cardId);
      if (!removed) return;

      // Insert into destination list
      // If moving within same list and overCardId points to itself, just append at end.
      if (toListId === fromListId && overCardId === cardId) {
        toList.cardIds.push(cardId);
      } else {
        insertBefore(toList.cardIds, cardId, overCardId);
      }

      const t = nowIso();
      fromList.updatedAt = t;
      toList.updatedAt = t;
      card.updatedAt = t;
    },

    // -----------------------------
    // Comments + Modal UI
    // -----------------------------
    openCommentsModal(state, action: PayloadAction<OpenCommentsPayload>) {
      const { cardId } = action.payload;
      if (!state.cardsById[cardId]) return;

      state.ui.activeCardId = cardId;
      state.ui.isCommentsModalOpen = true;
    },

    closeCommentsModal(state) {
      state.ui.isCommentsModalOpen = false;
      state.ui.activeCardId = null;
    },

    addComment(state, action: PayloadAction<AddCommentPayload>) {
      const { cardId, text } = action.payload;
      const card = state.cardsById[cardId];
      if (!card) return;

      const content = text.trim();
      if (!content) return;

      const id = `cmt_${nanoid(10)}` as unknown as CommentId;
      const t = nowIso();

      state.commentsById[id] = {
        id,
        cardId,
        text: content,
        createdAt: t,
      };

      card.commentIds.push(id);
      card.updatedAt = t;
    },

    deleteComment(state, action: PayloadAction<DeleteCommentPayload>) {
      const { commentId } = action.payload;
      const comment = state.commentsById[commentId];
      if (!comment) return;

      const card = state.cardsById[comment.cardId];
      if (card) {
        removeOnce(card.commentIds, commentId);
        card.updatedAt = nowIso();
      }

      delete state.commentsById[commentId];
    },
  },
});

export const boardActions = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
